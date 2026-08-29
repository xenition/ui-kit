/** @jest-environment jsdom */
import { fireEvent, render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { RAIL_MIN_ROWS, StepListV4, type StepListV4Item } from './StepListV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

/** The paywall case §8 is written for: parallel promises, no step state. */
const FEATURES: StepListV4Item[] = [
  { icon: 'bolt', title: 'Instant sync', description: 'Every device, every second.' },
  { icon: 'lock', title: 'Private by default', description: 'Nothing leaves your account.' },
  { icon: 'star', title: 'Unlimited history', description: 'Nothing is ever trimmed.' },
];

function renderThemed(ui: ReactElement) {
  return render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
}

function rails(container: HTMLElement): Element[] {
  return Array.from(container.querySelectorAll('[data-xen-v4-steprail]'));
}

function badges(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll('[data-xen-v4-icon][data-badge]'));
}

describe('StepListV4 (web)', () => {
  it('builds §8 anatomy: a circular tinted badge, a bold title, a muted line', () => {
    const { container, getByText } = renderThemed(<StepListV4 steps={FEATURES} />);

    const discs = badges(container);
    expect(discs).toHaveLength(FEATURES.length);
    discs.forEach((disc) => {
      // A circle, not a rounded square — the escape from §8's "icon in a
      // coloured box on every row" tell.
      expect(disc.getAttribute('data-shape')).toBe('circle');
      // Nothing is done, so every disc is the soft wash.
      expect(disc.getAttribute('data-badge')).toBe('soft');
    });

    const title = getByText('Instant sync');
    expect(title.getAttribute('data-xen-v4-text')).toBe('base');
    expect(title.className).toContain('font-semibold');
    expect(title.className).toContain('text-on-surface');

    const description = getByText('Every device, every second.');
    expect(description.getAttribute('data-xen-v4-text')).toBe('sm');
    expect(description.className).toContain('text-muted');
    // The description is genuinely smaller, not just paler.
    expect(description.className).toContain('text-sm');
  });

  it('composes the V4 children rather than the base ones (§10.5)', () => {
    const { container } = renderThemed(<StepListV4 steps={FEATURES} />);
    // `data-xen-v4-text` and `data-xen-v4-icon` are marks only the V4 twins
    // stamp; a base `Text`/`Icon` would leave the DOM without them.
    expect(container.querySelectorAll('[data-xen-v4-text]').length).toBe(FEATURES.length * 2);
    expect(container.querySelectorAll('[data-xen-v4-icon]').length).toBe(FEATURES.length);
  });

  it('keeps the rows one `md` apart, and does not pad the last one', () => {
    const { container } = renderThemed(<StepListV4 steps={FEATURES} />);
    const rows = Array.from(container.querySelectorAll('li > div'));
    expect(rows).toHaveLength(3);
    expect(rows[0]?.className).toContain('pb-md');
    expect(rows[1]?.className).toContain('pb-md');
    expect(rows[2]?.className).toContain('pb-0');
    // The gap between badge and copy is the same `md`.
    rows.forEach((row) => expect(row.className).toContain('gap-md'));
  });

  describe('the rail — §8, on by default at three rows', () => {
    it('draws none for zero rows', () => {
      const { container } = renderThemed(<StepListV4 steps={[]} />);
      expect(rails(container)).toHaveLength(0);
    });

    it('draws none for one row — a single badge connects to nothing', () => {
      const { container } = renderThemed(<StepListV4 steps={FEATURES.slice(0, 1)} />);
      expect(badges(container)).toHaveLength(1);
      expect(rails(container)).toHaveLength(0);
    });

    it('still draws none for two rows — a pair needs no help', () => {
      const { container } = renderThemed(<StepListV4 steps={FEATURES.slice(0, 2)} />);
      expect(rails(container)).toHaveLength(0);
    });

    it('turns itself on at three, and stops at the last badge', () => {
      const { container } = renderThemed(<StepListV4 steps={FEATURES} />);
      expect(FEATURES).toHaveLength(RAIL_MIN_ROWS);
      // n − 1 segments: three fragments become one list.
      expect(rails(container)).toHaveLength(FEATURES.length - 1);
      rails(container).forEach((rail) => {
        expect(rail.className).toContain('bg-border');
        // A hairline, and it fills the space between the discs.
        expect(rail.className).toContain('w-px');
        expect(rail.className).toContain('flex-1');
      });
    });

    it('lets `connector` overrule the count in both directions', () => {
      const off = renderThemed(<StepListV4 steps={FEATURES} connector={false} />);
      expect(rails(off.container)).toHaveLength(0);

      const on = renderThemed(<StepListV4 steps={FEATURES.slice(0, 2)} connector />);
      expect(rails(on.container)).toHaveLength(1);
    });
  });

  describe('the empty state — §12', () => {
    it('renders nothing at all for zero rows, and keeps the caller’s className', () => {
      const { container } = renderThemed(<StepListV4 steps={[]} className="empty-box" />);
      expect(container.querySelectorAll('li')).toHaveLength(0);
      expect(container.querySelector('ol')).toBeNull();
      expect(badges(container)).toHaveLength(0);
      // No list chrome left behind apologising for itself — and the className
      // survives, so the region still participates in the screen's layout.
      const box = container.querySelector('.empty-box') as HTMLElement;
      expect(box).not.toBeNull();
      expect(box.childNodes).toHaveLength(0);
    });

    it('renders `empty` when the caller owns the region', () => {
      const { getByText, container } = renderThemed(
        <StepListV4 steps={[]} empty={<p>Nothing to set up yet</p>} />
      );
      expect(getByText('Nothing to set up yet')).toBeTruthy();
      expect(container.querySelectorAll('li')).toHaveLength(0);
    });
  });

  describe('the badge contents', () => {
    it('carries the row’s glyph when it has one, and no ordinal', () => {
      const { container } = renderThemed(<StepListV4 steps={FEATURES} />);
      // `bolt`, `lock` and `star` resolve through the kit's named set, and no
      // disc falls back to an ordinal.
      expect(badges(container).map((b) => b.textContent)).toEqual(['⚡', '🔒', '★']);
    });

    it('falls back to the step number when the row has no glyph', () => {
      const { container } = renderThemed(
        <StepListV4 steps={[{ title: 'Sear the onions' }, { title: 'Deglaze' }]} />
      );
      expect(badges(container).map((b) => b.textContent)).toEqual(['1', '2']);
    });
  });

  describe('the state ladder', () => {
    it('is flat with no `current` — the paywall case', () => {
      const { container } = renderThemed(<StepListV4 steps={FEATURES} />);
      expect(badges(container).map((b) => b.getAttribute('data-badge'))).toEqual([
        'soft',
        'soft',
        'soft',
      ]);
      expect(container.querySelectorAll('.border-primary')).toHaveLength(0);
    });

    it('fills what is done, rings what is current, washes what is ahead', () => {
      const { container } = renderThemed(<StepListV4 steps={FEATURES} current={1} />);
      const discs = badges(container);
      expect(discs.map((b) => b.getAttribute('data-badge'))).toEqual(['solid', 'soft', 'soft']);
      // Only the current badge gains the hairline ring; the others reserve the
      // same 1px in `transparent` so nothing shifts when the step advances.
      expect(discs.map((b) => b.className.includes('border-primary'))).toEqual([
        false,
        true,
        false,
      ]);
      discs.forEach((disc) => expect(disc.className).toContain('border'));
    });

    it('honours a per-row `done` outside any linear order', () => {
      const { container } = renderThemed(
        <StepListV4 steps={[{ title: 'A' }, { title: 'B', done: true }, { title: 'C' }]} />
      );
      expect(badges(container).map((b) => b.getAttribute('data-badge'))).toEqual([
        'soft',
        'solid',
        'soft',
      ]);
    });

    it('never mutes a title, whatever the step state', () => {
      const { getByText } = renderThemed(<StepListV4 steps={FEATURES} current={0} />);
      FEATURES.forEach((f) => {
        expect(getByText(f.title as string).className).toContain('text-on-surface');
      });
    });
  });

  describe('interaction', () => {
    it('is inert without a handler', () => {
      const { container } = renderThemed(<StepListV4 steps={FEATURES} />);
      expect(container.querySelectorAll('button')).toHaveLength(0);
    });

    it('makes every row a button on the shared V4 state layer, and fires it', () => {
      const seen: number[] = [];
      const { container, getByText } = renderThemed(
        <StepListV4 steps={FEATURES} current={1} onStepClick={(i) => seen.push(i)} />
      );
      const rows = Array.from(container.querySelectorAll('[data-xen-v4-steprow]'));
      expect(rows).toHaveLength(3);
      rows.forEach((row) => {
        expect(row.tagName).toBe('BUTTON');
        // M3's layer, not a local `hover:opacity-70` that would dim the row's
        // own content and so make a hovered row look disabled.
        expect(row.hasAttribute('data-xen-v4-state')).toBe(true);
      });
      // Completion is announced, not only painted.
      expect(rows.map((r) => r.getAttribute('aria-pressed'))).toEqual(['true', 'false', 'false']);

      fireEvent.click(getByText('Unlimited history'));
      expect(seen).toEqual([2]);
    });

    it('draws the focus ring from the one `--xen-ring` slot', () => {
      renderThemed(<StepListV4 steps={FEATURES} onStepClick={() => {}} />);
      const css = document.getElementById('xen-v4-steplist-styles')?.textContent ?? '';
      expect(css).toContain('[data-xen-v4-steprow]:focus-visible');
      expect(css).toContain('var(--xen-ring)');
      expect(css).toContain('prefers-reduced-motion');
    });
  });

  it('names no literal colour, spacing or radius of its own', () => {
    const { container } = renderThemed(<StepListV4 steps={FEATURES} current={1} />);
    const ol = container.querySelector('ol') as HTMLElement;
    // The list, the rows and the rail are this component's own markup. (The
    // badges are `IconV4`'s, and it hands its composited ground down as an
    // element-scoped custom property, which is its own tested contract.)
    expect(ol.className).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    rails(container).forEach((rail) => {
      expect(rail.outerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
      expect(rail.outerHTML).not.toMatch(/\b\d+px\b/);
    });
    const css = document.getElementById('xen-v4-steplist-styles')?.textContent ?? '';
    expect(css).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    // …and no ramp step, which carries the light orientation in both schemes.
    expect(css).not.toContain('--xen-primary-');
  });

  it('survives with no provider above it', () => {
    const { container } = render(<StepListV4 steps={FEATURES} />);
    expect(badges(container)).toHaveLength(3);
    expect(rails(container)).toHaveLength(2);
  });
});

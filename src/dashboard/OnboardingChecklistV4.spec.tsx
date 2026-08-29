/** @jest-environment jsdom */
import { fireEvent, render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import { RAIL_MIN_ROWS } from '../primitives/StepListV4';
import type { ThemeSeed } from '../theme/types';
import { OnboardingChecklistV4, type OnboardingStepV4 } from './OnboardingChecklistV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

const STEPS: OnboardingStepV4[] = [
  { label: 'Create your account', description: 'Name and email.', done: true },
  { label: 'Add a payment method', description: 'So payouts can land.', done: false },
  { label: 'Invite your team', done: false, icon: 'star' },
];

function renderThemed(ui: ReactElement) {
  return render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
}

function badges(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll('[data-xen-v4-checkbadge]'));
}

function rails(container: HTMLElement): Element[] {
  return Array.from(container.querySelectorAll('[data-xen-v4-checkrail]'));
}

function meter(container: HTMLElement): HTMLElement | null {
  return container.querySelector('[role="progressbar"]');
}

describe('OnboardingChecklistV4 (web)', () => {
  describe('the header and the meter — progress is reported, not implied', () => {
    it('defaults the heading and counts what is done', () => {
      const { container, getByText } = renderThemed(
        <OnboardingChecklistV4 steps={STEPS} />
      );
      expect(getByText('Get started')).toBeTruthy();
      const count = getByText('1 of 3');
      expect(count.getAttribute('data-xen-v4-text')).toBe('sm');
      expect(count.className).toContain('text-muted-text');
      // Tabular figures, so the count does not reflow as it climbs.
      expect(count.className).toContain('tabular-nums');
    });

    it('reports the same numbers to assistive tech through ProgressV4', () => {
      const { container } = renderThemed(<OnboardingChecklistV4 steps={STEPS} />);
      const bar = meter(container);
      expect(bar).not.toBeNull();
      expect(bar?.getAttribute('aria-valuenow')).toBe('1');
      expect(bar?.getAttribute('aria-valuemin')).toBe('0');
      expect(bar?.getAttribute('aria-valuemax')).toBe('3');
      // It is the V4 meter, not a hand-rolled bar with a `%` width.
      expect(bar?.getAttribute('data-xen-v4-progress')).toBe('primary');
    });

    it('turns the meter to success once every step is done', () => {
      const { container } = renderThemed(
        <OnboardingChecklistV4 steps={STEPS.map((s) => ({ ...s, done: true }))} />
      );
      expect(meter(container)?.getAttribute('data-xen-v4-progress')).toBe('success');
    });

    it('takes a custom title and an optional subtitle', () => {
      const { getByText } = renderThemed(
        <OnboardingChecklistV4 steps={STEPS} title="Set up payouts" subtitle="Three quick things." />
      );
      expect(getByText('Set up payouts')).toBeTruthy();
      const sub = getByText('Three quick things.');
      expect(sub.className).toContain('text-muted-text');
    });
  });

  describe('the step row — StepListV4 s anatomy, with a completion state', () => {
    it('gives every step a 44 circular IconV4 badge, never the 22px marker', () => {
      const { container } = renderThemed(<OnboardingChecklistV4 steps={STEPS} />);
      const discs = badges(container);
      expect(discs).toHaveLength(STEPS.length);
      discs.forEach((disc) => {
        // It is IconV4's badge, not a local one — §10.5.
        expect(disc.getAttribute('data-xen-v4-icon')).toBe('');
        expect(disc.getAttribute('data-shape')).toBe('circle');
      });
      expect(container.innerHTML).not.toContain('22px');
    });

    it('falls back to the step number, and takes a glyph when given one', () => {
      const { container } = renderThemed(<OnboardingChecklistV4 steps={STEPS} />);
      const discs = badges(container);
      // Step 2 has no icon: the ordinal holds the slot.
      expect(discs[1]?.textContent).toBe('2');
      // Step 3 named one, so the glyph replaces the number.
      expect(discs[2]?.textContent).not.toBe('3');
      expect(discs[2]?.textContent?.length).toBeGreaterThan(0);
    });

    it('sets the title base/semibold and the supporting line sm/mutedText', () => {
      const { getByText } = renderThemed(<OnboardingChecklistV4 steps={STEPS} />);
      const title = getByText('Add a payment method');
      expect(title.getAttribute('data-xen-v4-text')).toBe('base');
      expect(title.className).toContain('font-semibold');
      expect(title.className).toContain('text-on-card');

      const line = getByText('So payouts can land.');
      expect(line.getAttribute('data-xen-v4-text')).toBe('sm');
      // `muted-text`, never the `muted` FILL.
      expect(line.className).toContain('text-muted-text');
      expect(line.className).not.toMatch(/\btext-muted(?![-\w])/);
    });

    it('composes V4 children rather than the base ones (§10.5)', () => {
      const { container } = renderThemed(<OnboardingChecklistV4 steps={STEPS} />);
      // `data-xen-v4-text` / `data-xen-v4-icon` are marks only the V4 twins
      // stamp; a base `Text`/`Icon` would leave the DOM without them.
      expect(container.querySelectorAll('[data-xen-v4-text]').length).toBeGreaterThan(0);
      expect(container.querySelectorAll('[data-xen-v4-icon]').length).toBe(STEPS.length);
      expect(container.querySelector('[data-xen-v4-card]')).not.toBeNull();
    });
  });

  describe('completion is never signalled by colour alone', () => {
    it('adds a check glyph and fills the badge, and says so in the label', () => {
      const { container } = renderThemed(<OnboardingChecklistV4 steps={STEPS} />);
      const [first, second] = badges(container);

      // 1. A glyph the colour-blind reader can see: the check.
      expect(first?.textContent).toBe('✓');
      expect(second?.textContent).not.toBe('✓');
      // 2. A fill change, not just a hue change.
      expect(first?.getAttribute('data-badge')).toBe('solid');
      expect(second?.getAttribute('data-badge')).toBe('soft');
      expect(first?.getAttribute('data-xen-v4-checkbadge')).toBe('done');
      // 3. The accessible name states it outright.
      const row = container.querySelector('[aria-label="Create your account, completed"]');
      expect(row).not.toBeNull();
      expect(
        container.querySelector('[aria-label="Add a payment method, not completed"]')
      ).not.toBeNull();
    });

    it('drops the strike-through — struck text reads as deleted, not done', () => {
      const { getByText, container } = renderThemed(<OnboardingChecklistV4 steps={STEPS} />);
      expect(getByText('Create your account').className).not.toContain('line-through');
      expect(container.innerHTML).not.toContain('line-through');
      // The done label mutes instead.
      expect(getByText('Create your account').className).toContain('text-muted-text');
    });

    it('replaces the literal check character with a named IconV4 glyph', () => {
      const { container } = renderThemed(<OnboardingChecklistV4 steps={STEPS} />);
      // The mark is still ✓, but it now comes from `name="check"` inside the
      // badge rather than from a bare character in the markup.
      const done = badges(container)[0];
      expect(done?.getAttribute('data-badge')).toBe('solid');
      expect(done?.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('the rail — the same threshold StepListV4 uses', () => {
    it('joins the badges once there are three or more rows', () => {
      const { container } = renderThemed(<OnboardingChecklistV4 steps={STEPS} />);
      expect(STEPS.length).toBeGreaterThanOrEqual(RAIL_MIN_ROWS);
      expect(rails(container)).toHaveLength(STEPS.length - 1);
    });

    it('stays off below the threshold, and takes an explicit override', () => {
      const two = STEPS.slice(0, 2);
      const { container } = renderThemed(<OnboardingChecklistV4 steps={two} />);
      expect(rails(container)).toHaveLength(0);

      const forced = renderThemed(<OnboardingChecklistV4 steps={two} connector />);
      expect(rails(forced.container)).toHaveLength(1);

      const off = renderThemed(<OnboardingChecklistV4 steps={STEPS} connector={false} />);
      expect(rails(off.container)).toHaveLength(0);
    });
  });

  describe('press feedback is the state layer, and nothing else', () => {
    it('fires the step s own handler and carries no opacity dip', () => {
      const onClick = jest.fn();
      const { container } = renderThemed(
        <OnboardingChecklistV4 steps={[{ label: 'Invite', done: false, onClick }]} />
      );
      const button = container.querySelector('button[data-xen-v4-checkstep]') as HTMLElement;
      expect(button.getAttribute('data-xen-v4-state')).toBe('');
      expect(button.getAttribute('aria-pressed')).toBe('false');
      // The layer is opaque against the pair the card actually wears.
      expect(button.style.getPropertyValue('--xen-v4-state-ground')).toBe('var(--xen-card)');
      expect(button.style.getPropertyValue('--xen-v4-state-ink')).toBe('var(--xen-on-card)');
      expect(button.className).not.toContain('hover:opacity');
      expect(button.className).not.toContain('bg-neutral');

      fireEvent.click(button);
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('renders a plain row, not a button, for a step with no handler', () => {
      const { container } = renderThemed(
        <OnboardingChecklistV4 steps={[{ label: 'Invite', done: false }]} />
      );
      expect(container.querySelectorAll('button')).toHaveLength(0);
      expect(container.querySelector('[data-xen-v4-checkstep]')?.tagName).toBe('DIV');
    });
  });

  describe('§4.2 — the card is `card`, not `surface`', () => {
    it('paints the card ground and ink, raised, on the lg radius', () => {
      const { container } = renderThemed(<OnboardingChecklistV4 steps={STEPS} />);
      const card = container.querySelector('[data-xen-v4-card]') as HTMLElement;
      expect(card.className).toContain('bg-card');
      expect(card.className).toContain('text-on-card');
      expect(card.className).toContain('rounded-[var(--xen-radius-lg)]');
      expect(card.className).toContain('p-[var(--xen-space-lg)]');
      // A hairline plus a soft shadow — never a heavy border and a shadow.
      expect(card.className).toContain('border-border');
      expect(card.getAttribute('data-raised')).toBe('true');
    });
  });

  describe('the empty case — `steps: []`', () => {
    it('survives it: 0 of 0, no meter, no divide-by-zero, an empty state', () => {
      const { container, getByText } = renderThemed(<OnboardingChecklistV4 steps={[]} />);
      expect(getByText('0 of 0')).toBeTruthy();
      // A progressbar with `max` 0 reports nothing, so there is none.
      expect(meter(container)).toBeNull();
      expect(container.innerHTML).not.toContain('NaN');
      // Never a blank bordered box — §4.5 routes it through EmptyStateV4.
      expect(container.querySelector('[data-xen-v4-checklist-empty]')).not.toBeNull();
      expect(container.querySelector('[data-xen-empty-state]')).not.toBeNull();
      expect(badges(container)).toHaveLength(0);
    });

    it('lets the caller own the empty body', () => {
      const { container, getByTestId } = renderThemed(
        <OnboardingChecklistV4 steps={[]} empty={<span data-testid="mine" />} />
      );
      expect(getByTestId('mine')).toBeTruthy();
      expect(container.querySelector('[data-xen-empty-state]')).toBeNull();
    });

    it('still renders its heading, so the card is never anonymous', () => {
      const { getByText } = renderThemed(
        <OnboardingChecklistV4 steps={[]} title="Set up payouts" />
      );
      expect(getByText('Set up payouts')).toBeTruthy();
    });
  });

  it('forwards ref, className and rest to the card', () => {
    const ref = { current: null as HTMLDivElement | null };
    const { getByTestId } = renderThemed(
      <OnboardingChecklistV4 ref={ref} data-testid="list" className="mt-md" steps={STEPS} />
    );
    const el = getByTestId('list');
    expect(ref.current).toBe(el);
    expect(el.className).toContain('mt-md');
  });

  it('names no literal colour, spacing or radius — every value is a token', () => {
    const { container } = renderThemed(
      <OnboardingChecklistV4 steps={STEPS} subtitle="Three quick things." />
    );
    Array.from(container.querySelectorAll<HTMLElement>('[class]')).forEach((el) => {
      expect(el.className).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
      expect(el.className).not.toMatch(/\[\d+(px|rem)\]/);
      expect(el.className).not.toMatch(/\bgap-0\.5\b/);
      expect(el.className).not.toMatch(/\bh-1\.5\b/);
      expect(el.className).not.toContain('bg-neutral-1');
    });
  });
});

/** @jest-environment jsdom */
import { fireEvent, render } from '@testing-library/react';
import { createRef, type ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { FilterChips } from './FilterChips';
import { FilterChipsV4 } from './FilterChipsV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function renderThemed(ui: ReactElement) {
  return render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
}

/** Every chip button in the render, in source order. */
function chips(container: HTMLElement): HTMLButtonElement[] {
  return Array.from(container.querySelectorAll<HTMLButtonElement>('[data-xen-v4-chip]'));
}

/**
 * What the component actually rendered.
 *
 * `XenitionUIProvider` emits its own `<style>` block of compiled tokens into
 * the same container, so `container.innerHTML` is never a statement about the
 * component. The provider's content wrapper is.
 */
function painted(container: HTMLElement): HTMLElement {
  const node = container.querySelector<HTMLElement>('[data-theme]');
  expect(node).not.toBeNull();
  return node as HTMLElement;
}

/** The strip itself — the `role="group"` the base also carried. */
function strip(container: HTMLElement): HTMLElement {
  const node = container.querySelector<HTMLElement>('[role="group"]');
  expect(node).not.toBeNull();
  return node as HTMLElement;
}

const OPTIONS = ['All', 'Open', 'Closed'];

describe('FilterChipsV4 (web)', () => {
  // ---------------------------------------------------------------- props --

  it('takes options as bare strings or as {value,label} objects', () => {
    const { container } = renderThemed(
      <FilterChipsV4
        options={['solo', { value: 'pair', label: 'A pair' }]}
        selected=""
        onChange={() => {}}
      />
    );
    expect(chips(container).map((c) => c.textContent)).toEqual(['solo', 'A pair']);
  });

  it('marks the selected option with aria-pressed, single or multi', () => {
    const single = renderThemed(
      <FilterChipsV4 options={OPTIONS} selected="Open" onChange={() => {}} />
    );
    expect(chips(single.container).map((c) => c.getAttribute('aria-pressed'))).toEqual([
      'false',
      'true',
      'false',
    ]);

    const many = renderThemed(
      <FilterChipsV4 options={OPTIONS} selected={['All', 'Closed']} onChange={() => {}} multi />
    );
    expect(chips(many.container).map((c) => c.getAttribute('aria-pressed'))).toEqual([
      'true',
      'false',
      'true',
    ]);
  });

  it('keeps the base contract: a selected chip deselects, and single-select clears to ""', () => {
    const seen: Array<string | string[]> = [];
    const { container } = renderThemed(
      <FilterChipsV4 options={OPTIONS} selected="Open" onChange={(next) => seen.push(next)} />
    );
    fireEvent.click(chips(container)[2] as HTMLButtonElement);
    fireEvent.click(chips(container)[1] as HTMLButtonElement);
    // Picking another value selects it; picking the active one clears the row.
    expect(seen).toEqual(['Closed', '']);
  });

  it('multi adds and removes without disturbing the rest of the selection', () => {
    const seen: Array<string | string[]> = [];
    const { container } = renderThemed(
      <FilterChipsV4
        options={OPTIONS}
        selected={['All']}
        multi
        onChange={(next) => seen.push(next)}
      />
    );
    fireEvent.click(chips(container)[1] as HTMLButtonElement);
    fireEvent.click(chips(container)[0] as HTMLButtonElement);
    expect(seen).toEqual([['All', 'Open'], []]);
  });

  // ----------------------------------------------------- chips WRAP (§7) --

  it('WRAPS by default — the strip never scrolls, so no option can be clipped', () => {
    const { container } = renderThemed(
      <FilterChipsV4 options={OPTIONS} selected="" onChange={() => {}} />
    );
    const row = strip(container);
    // §7: "Chips wrap. Never a horizontal scroll that clips the last option —
    // a user cannot choose what they cannot see."
    expect(row.className).toContain('flex-wrap');
    expect(row.className).not.toContain('flex-nowrap');
    expect(row.className).not.toContain('overflow-x-auto');
    // §4.1's chip gap, and it comes from ClusterV4 rather than a hand-rolled flex.
    expect(row.className).toContain('gap-[var(--xen-space-sm)]');
    expect(row.hasAttribute('data-xen-v4-cluster')).toBe(true);
  });

  it('every option is rendered — wrapping means the count is the option count', () => {
    const many = Array.from({ length: 12 }, (_, i) => `Filter ${i}`);
    const { container } = renderThemed(
      <FilterChipsV4 options={many} selected="" onChange={() => {}} />
    );
    expect(chips(container)).toHaveLength(12);
    expect(chips(container)[11]?.textContent).toBe('Filter 11');
  });

  it('scroll is opt-in, and even then it pays a trailing pad so the tail is reachable', () => {
    const { container } = renderThemed(
      <FilterChipsV4 options={OPTIONS} selected="" onChange={() => {}} scroll />
    );
    const row = strip(container);
    expect(row.className).toContain('overflow-x-auto');
    expect(row.className).toContain('flex-nowrap');
    expect(row.className).toContain('pe-[var(--xen-space-md)]');
  });

  it('bleed pairs the scroller with BleedV4 edge="end" — one edge, and no vertical pull', () => {
    const { container } = renderThemed(
      <FilterChipsV4 options={OPTIONS} selected="" onChange={() => {}} scroll bleed="lg" />
    );
    const bleed = container.querySelector<HTMLElement>('[data-xen-v4-chips-bleed]');
    expect(bleed).not.toBeNull();
    // The trailing edge only: the first chip stays on the page gutter.
    expect(bleed?.className).toContain('-me-[var(--xen-space-lg)]');
    expect(bleed?.className).not.toContain('-mx-');
    expect(bleed?.className).not.toContain('-ms-');
    // A chip strip escapes one HORIZONTAL edge; the vertical bleed is zeroed.
    expect(bleed?.style.marginTop).toBe('0px');
    expect(bleed?.style.marginBottom).toBe('0px');
    // The pad inside now matches the gutter being escaped.
    expect(strip(container).className).toContain('pe-[var(--xen-space-lg)]');
  });

  it('bleed is ignored without scroll — a wrapping strip has no edge to escape', () => {
    const { container } = renderThemed(
      <FilterChipsV4 options={OPTIONS} selected="" onChange={() => {}} bleed="lg" />
    );
    expect(container.querySelector('[data-xen-v4-chips-bleed]')).toBeNull();
    expect(strip(container).className).toContain('flex-wrap');
  });

  // ------------------------------------------------------------ the floor --

  it('every chip clears the 44 tap floor, composed from the scale and never typed', () => {
    const { container } = renderThemed(
      <FilterChipsV4 options={OPTIONS} selected="Open" onChange={() => {}} />
    );
    chips(container).forEach((chip) => {
      // 2xl (48) - xs (4) = 44, said in tokens.
      expect(chip.className).toContain(
        'min-h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]'
      );
      expect(chip.className).not.toMatch(/min-h-\[\d+px\]/);
    });
  });

  it('drops the base py-xs squeeze — height is the floor plus centring, not padding', () => {
    const { container } = renderThemed(
      <FilterChipsV4 options={OPTIONS} selected="" onChange={() => {}} />
    );
    const chip = chips(container)[0] as HTMLElement;
    expect(chip.className).toContain('items-center');
    expect(chip.className).toContain('justify-center');
    expect(chip.className).not.toContain('py-xs');
  });

  // --------------------------------------------- selected vs. unselected --

  it('selected = primary fill + onPrimary label at semibold', () => {
    const { container } = renderThemed(
      <FilterChipsV4 options={OPTIONS} selected="Open" onChange={() => {}} />
    );
    const active = chips(container)[1] as HTMLElement;
    expect(active.className).toContain('bg-primary');
    expect(active.className).toContain('border-primary');
    const label = active.querySelector('span') as HTMLElement;
    expect(label.className).toContain('text-on-primary');
    expect(label.className).toContain('font-semibold');
  });

  it('unselected = the card ground under a border hairline, never the muted FILL', () => {
    const { container } = renderThemed(
      <FilterChipsV4 options={OPTIONS} selected="Open" onChange={() => {}} />
    );
    const idle = chips(container)[0] as HTMLElement;
    // §4.2 — the card slot, not the page ground the base painted.
    expect(idle.className).toContain('bg-card');
    expect(idle.className).toContain('border-border');
    expect(idle.className).not.toContain('bg-surface');
    const label = idle.querySelector('span') as HTMLElement;
    expect(label.className).toContain('text-on-card');
    // `muted` is a FILL; text never takes it (`text-muted-text` would be fine).
    expect(label.className.split(/\s+/)).not.toContain('text-muted');
  });

  it('both states are the same pill: radius.full from the token, in every chip', () => {
    const { container } = renderThemed(
      <FilterChipsV4 options={OPTIONS} selected="All" onChange={() => {}} />
    );
    chips(container).forEach((chip) => {
      expect(chip.className).toContain('rounded-[var(--xen-radius-full)]');
    });
  });

  // -------------------------------------------------------- state, not opacity --

  it('press and hover are the STATE LAYER — no bg-neutral-100, no opacity dim', () => {
    const { container } = renderThemed(
      <FilterChipsV4 options={OPTIONS} selected="Open" onChange={() => {}} />
    );
    chips(container).forEach((chip) => {
      expect(chip.hasAttribute('data-xen-v4-state')).toBe(true);
      expect(chip.className).not.toContain('bg-neutral-100');
      expect(chip.className).not.toContain('hover:');
      expect(chip.className).not.toMatch(/opacity-/);
    });
    // The base is what this replaced — proof the class was really there.
    const base = render(
      <FilterChips options={OPTIONS} selected="Open" onChange={() => {}} />
    );
    expect(base.container.innerHTML).toContain('hover:bg-neutral-100');
  });

  it('each chip declares its OWN opaque ground/ink pair, so the layer suits its fill', () => {
    const { container } = renderThemed(
      <FilterChipsV4 options={OPTIONS} selected="Open" onChange={() => {}} />
    );
    const idle = chips(container)[0] as HTMLElement;
    const active = chips(container)[1] as HTMLElement;
    expect(idle.style.getPropertyValue('--xen-v4-state-ground')).toBe('var(--xen-card)');
    expect(idle.style.getPropertyValue('--xen-v4-state-ink')).toBe('var(--xen-on-card)');
    expect(active.style.getPropertyValue('--xen-v4-state-ground')).toBe('var(--xen-primary)');
    expect(active.style.getPropertyValue('--xen-v4-state-ink')).toBe('var(--xen-on-primary)');
  });

  it('injects the shared state sheet once, whatever the chip count', () => {
    renderThemed(<FilterChipsV4 options={OPTIONS} selected="" onChange={() => {}} />);
    renderThemed(<FilterChipsV4 options={OPTIONS} selected="" onChange={() => {}} />);
    expect(document.querySelectorAll('#xen-v4-state-styles')).toHaveLength(1);
  });

  // ------------------------------------------------------------- purity --

  it('§1.1 — no literal colours, spacings, radii or font sizes anywhere on a chip', () => {
    const { container } = renderThemed(
      <FilterChipsV4 options={OPTIONS} selected="Open" onChange={() => {}} scroll bleed="lg" />
    );
    [...chips(container), strip(container)].forEach((node) => {
      (node.className.match(/\[[^\]]+\]/g) ?? []).forEach((value) => {
        expect(value).toContain('var(--xen-');
      });
    });
    // Colours are custom properties, so no hex and no measured px reach the
    // markup. `0px` is allowed — it is the zeroed vertical bleed, an absence.
    expect(painted(container).innerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(painted(container).innerHTML).not.toMatch(/[1-9]\d*px/);
  });

  // -------------------------------------------------------- empty state --

  it('EMPTY STATE — options: [] renders nothing at all, not a blank bordered box', () => {
    const { container } = renderThemed(
      <FilterChipsV4 options={[]} selected="" onChange={() => {}} />
    );
    expect(container.querySelector('[role="group"]')).toBeNull();
    expect(chips(container)).toHaveLength(0);
    expect(painted(container).innerHTML).toBe('');
  });

  it('EMPTY STATE — an empty multi selection still renders every option, none pressed', () => {
    const { container } = renderThemed(
      <FilterChipsV4 options={OPTIONS} selected={[]} multi onChange={() => {}} />
    );
    expect(chips(container)).toHaveLength(3);
    chips(container).forEach((chip) => expect(chip.getAttribute('aria-pressed')).toBe('false'));
  });

  it('EMPTY STATE — an empty scroll strip draws neither a scroller nor a bleed', () => {
    const { container } = renderThemed(
      <FilterChipsV4 options={[]} selected="" onChange={() => {}} scroll bleed="lg" />
    );
    expect(painted(container).innerHTML).toBe('');
  });

  // ---------------------------------------------------------- plumbing --

  it('forwards the ref to the strip and merges className and the rest of the div props', () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = renderThemed(
      <FilterChipsV4
        ref={ref}
        options={OPTIONS}
        selected=""
        onChange={() => {}}
        className="mt-lg"
        aria-label="Status"
      />
    );
    const row = strip(container);
    expect(ref.current).toBe(row);
    expect(row.className).toContain('mt-lg');
    expect(row.getAttribute('aria-label')).toBe('Status');
  });

  it('is additive — the base still exists and is untouched by this file', () => {
    const { container } = render(
      <FilterChips options={OPTIONS} selected="All" onChange={() => {}} />
    );
    expect(container.querySelectorAll('button')).toHaveLength(3);
    expect(container.querySelector('[data-xen-v4-chip]')).toBeNull();
  });
});

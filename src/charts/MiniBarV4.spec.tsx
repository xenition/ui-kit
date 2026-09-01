/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import { V4_MOTION } from '../primitives/internal/v4-motion';
import { CHART_V4_STYLE_ID } from './internal-v4';
import type { ThemeSeed } from '../theme/types';
import { MINI_BAR_V4_STYLE_ID, MiniBarV4 } from './MiniBarV4';

const SEED: ThemeSeed = {
  primary: '#0D9488',
  neutral: 'pure',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function mount(ui: ReactElement): HTMLElement {
  const { container } = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return container;
}

/** The one sheet the whole V4 charts line injects — where its motion lives. */
const chartSheet = (): string => document.getElementById(CHART_V4_STYLE_ID)?.textContent ?? '';

function track(container: HTMLElement): HTMLElement {
  return container.querySelector('[data-xen-v4-minibar]') as HTMLElement;
}

function fill(container: HTMLElement): HTMLElement {
  return container.querySelector('[data-xen-v4-minibar-fill]') as HTMLElement;
}

/** The sheet this component injects — where the track and the fill are painted. */
function sheet(): string {
  return document.getElementById(MINI_BAR_V4_STYLE_ID)?.textContent ?? '';
}

describe('MiniBarV4 (web)', () => {
  // ── §6: the web twin of a native-only component ─────────────────────

  it('renders a track with a fill inside it', () => {
    const c = mount(<MiniBarV4 value={40} />);
    expect(track(c)).not.toBeNull();
    expect(fill(c)).not.toBeNull();
    expect(fill(c).style.width).toBe('40%');
  });

  // ── §5 Group A: a mark, no chrome ───────────────────────────────────

  it('carries no figure frame at all — no title, no legend, no axis', () => {
    const c = mount(<MiniBarV4 value={40} />);
    expect(track(c).textContent).toBe('');
    expect(c.querySelector('[data-xen-v4-chart-legend]')).toBeNull();
  });

  // ── §1 rules 1–2, §3.3: the palette and the chrome ──────────────────

  it('paints the track from the chart chrome var, not from `border`', () => {
    mount(<MiniBarV4 value={40} />);
    expect(sheet()).toContain('[data-xen-v4-minibar] { background-color: var(--xen-chart-grid); }');
    expect(sheet()).not.toContain('var(--xen-border)');
  });

  it('paints the fill from slot 1 by default, never `var(--xen-primary)`', () => {
    const c = mount(<MiniBarV4 value={40} />);
    expect(fill(c).getAttribute('data-slot')).toBe('0');
    expect(sheet()).toContain('[data-xen-v4-minibar-fill][data-slot="0"]');
    expect(sheet()).toContain('var(--xen-chart-1)');
    expect(sheet()).not.toContain('var(--xen-primary)');
  });

  it('takes another slot when told to', () => {
    const c = mount(<MiniBarV4 value={40} slot={3} />);
    expect(fill(c).getAttribute('data-slot')).toBe('3');
    expect(sheet()).toContain('[data-xen-v4-minibar-fill][data-slot="3"] { background-color: var(--xen-chart-4); }');
  });

  it('reaches a status hue only through `tone`, and then not through a slot', () => {
    const c = mount(<MiniBarV4 value={90} max={80} tone="danger" />);
    expect(fill(c).getAttribute('data-tone')).toBe('danger');
    expect(fill(c).getAttribute('data-slot')).toBeNull();
    expect(sheet()).toContain('[data-xen-v4-minibar-fill][data-tone="danger"]');
  });

  it('throws past the fifth slot rather than cycling (§1 rule 4)', () => {
    expect(() => mount(<MiniBarV4 value={1} slot={5} />)).toThrow(/never cycled/);
  });

  it('takes its height from the spacing scale, and still accepts an override', () => {
    const auto = mount(<MiniBarV4 value={40} />);
    expect(track(auto).className).toContain('h-sm');
    expect(track(auto).style.height).toBe('');

    const explicit = mount(<MiniBarV4 value={40} height={6} />);
    expect(explicit.querySelector('[data-xen-v4-minibar]')?.className).not.toContain('h-sm');
    expect((explicit.querySelector('[data-xen-v4-minibar]') as HTMLElement).style.height).toBe(
      '6px'
    );
  });

  it('is a pill at both ends — a meter, not a bar on an axis (§4.4)', () => {
    const c = mount(<MiniBarV4 value={40} />);
    expect(track(c).className).toContain('rounded-[var(--xen-radius-full)]');
    expect(fill(c).className).toContain('rounded-[var(--xen-radius-full)]');
  });

  // ── §4.5: the degenerate inputs ─────────────────────────────────────

  it('renders the empty track at full footprint when the value is zero', () => {
    const c = mount(<MiniBarV4 value={0} />);
    expect(track(c)).not.toBeNull();
    expect(fill(c).style.width).toBe('0%');
  });

  it('does not divide by zero when `max` is zero, negative or not a number', () => {
    for (const max of [0, -10, Number.NaN, Number.POSITIVE_INFINITY]) {
      const c = mount(<MiniBarV4 value={5} max={max} />);
      expect(fill(c).style.width).not.toMatch(/NaN|Infinity/);
    }
  });

  it('clamps a non-finite or out-of-range value rather than emitting `NaN%`', () => {
    expect(fill(mount(<MiniBarV4 value={Number.NaN} />)).style.width).toBe('0%');
    expect(fill(mount(<MiniBarV4 value={-5} />)).style.width).toBe('0%');
    expect(fill(mount(<MiniBarV4 value={500} />)).style.width).toBe('100%');
  });

  it('renders the single-datum case — one value at its ceiling — as a full bar', () => {
    const c = mount(<MiniBarV4 value={7} max={7} />);
    expect(fill(c).style.width).toBe('100%');
  });

  it('shows the skeleton at the mark’s own footprint while loading', () => {
    const c = mount(<MiniBarV4 value={40} loading />);
    expect(c.querySelector('[data-xen-v4-skeleton]')).not.toBeNull();
    expect(c.querySelector('[data-xen-v4-minibar]')).toBeNull();
  });

  // ── §1 rule 6: it says its value in words ───────────────────────────

  it('derives a sentence, formats it, and takes an override', () => {
    expect(track(mount(<MiniBarV4 value={40} max={80} />)).getAttribute('aria-label')).toBe(
      '40 of 80'
    );
    expect(
      track(
        mount(<MiniBarV4 value={40} max={80} formatValue={(v) => `£${v}`} />)
      ).getAttribute('aria-label')
    ).toBe('£40 of £80');
    expect(
      track(mount(<MiniBarV4 value={40} aria-label="Storage, 40 of 100 GB" />)).getAttribute(
        'aria-label'
      )
    ).toBe('Storage, 40 of 100 GB');
  });

  // ── §4.7: the reveal ────────────────────────────────────────────────

  it('opts into the shared reveal, and can be told not to', () => {
    expect(track(mount(<MiniBarV4 value={40} />)).getAttribute('data-animate')).toBe('true');
    expect(track(mount(<MiniBarV4 value={40} animate={false} />)).getAttribute('data-animate')).toBeNull();
  });

  // ── §36.6: a value that CHANGES has to move ────────────────────────

  it('eases the fill when the value changes after mount', () => {
    const { container, rerender } = render(
      <XenitionUIProvider theme={SEED}>
        <MiniBarV4 value={20} max={100} />
      </XenitionUIProvider>
    );
    const before = container.querySelector('[data-xen-v4-minibar-fill]') as HTMLElement;
    expect(before.style.width).toBe('20%');

    rerender(
      <XenitionUIProvider theme={SEED}>
        <MiniBarV4 value={80} max={100} />
      </XenitionUIProvider>
    );
    const after = container.querySelector('[data-xen-v4-minibar-fill]') as HTMLElement;

    expect(after).toBe(before);
    expect(after.style.width).toBe('80%');
    expect(after.getAttribute('data-xen-v4-chart-fill')).toBe('');
    expect(chartSheet()).toContain(`width ${V4_MOTION.standard}ms`);
  });
});

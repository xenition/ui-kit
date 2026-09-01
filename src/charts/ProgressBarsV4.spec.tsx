/** @jest-environment jsdom */
import { fireEvent, render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { CHART_MARK } from '../primitives/internal/v4-chart';
import { rowHeightClass } from '../dashboard/internal/row-v4';
import { transitionCss, V4_MOTION } from '../primitives/internal/v4-motion';
import { CHART_V4_STYLE_ID } from './internal-v4';
import {
  PROGRESS_BARS_V4_CSS,
  PROGRESS_BARS_V4_STYLE_ID,
  ProgressBarsV4,
} from './ProgressBarsV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'warm',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function mount(ui: ReactElement): HTMLElement {
  const { container } = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return container as HTMLElement;
}

const ITEMS = [
  { label: 'Organic', value: 40 },
  { label: 'Referral', value: 20 },
  { label: 'Direct', value: 10 },
];

/** The one sheet the whole V4 charts line injects — where its motion lives. */
const chartSheet = (): string => document.getElementById(CHART_V4_STYLE_ID)?.textContent ?? '';

const fills = (root: HTMLElement): NodeListOf<HTMLElement> =>
  root.querySelectorAll<HTMLElement>('[data-xen-v4-progress-fill]');

describe('ProgressBarsV4 (web)', () => {
  // ── it is a list, not a plot ───────────────────────────────────────

  it('is a list of rows, not one opaque `img`', () => {
    const root = mount(<ProgressBarsV4 items={ITEMS} />);

    expect(root.querySelector('[role="list"]')).not.toBeNull();
    expect(root.querySelectorAll('[role="listitem"]')).toHaveLength(3);
    expect(root.querySelectorAll('svg')).toHaveLength(0);
  });

  it('takes the row family’s two-line height, imported rather than restated', () => {
    const root = mount(<ProgressBarsV4 items={ITEMS} />);
    const row = root.querySelector<HTMLElement>('[data-xen-v4-progress-row] > *');

    expect(row?.className).toContain(rowHeightClass(true));
    // §4.3's row gutter, not a plot inset.
    expect(row?.className).toContain('px-md');
  });

  // ── colour ─────────────────────────────────────────────────────────

  it('paints every row slot 1 — bar length already carries the magnitude', () => {
    const root = mount(<ProgressBarsV4 items={ITEMS} />);

    fills(root).forEach((fill) =>
      expect(fill.style.getPropertyValue('--xen-progress-fill')).toBe('var(--xen-chart-1)')
    );
  });

  it('paints a status hue only for a row that opted in with `tone`', () => {
    const root = mount(<ProgressBarsV4 items={[{ label: 'Overspend', value: 4, tone: 'danger' }]} />);

    expect(fills(root)[0]?.style.getPropertyValue('--xen-progress-fill')).toBe(
      'var(--xen-danger)'
    );
  });

  it('paints from a sheet, because jsdom drops an inline `var()`', () => {
    mount(<ProgressBarsV4 items={ITEMS} />);
    const css = document.getElementById(PROGRESS_BARS_V4_STYLE_ID)?.textContent ?? '';

    expect(css).toBe(PROGRESS_BARS_V4_CSS);
    expect(css).toContain('background-color: var(--xen-chart-grid)');
    expect(css).toContain('background-color: var(--xen-progress-fill)');
  });

  // ── marks ──────────────────────────────────────────────────────────

  it('gives every row a track so the rows stay comparable', () => {
    const root = mount(<ProgressBarsV4 items={ITEMS} />);
    const tracks = root.querySelectorAll<HTMLElement>('[data-xen-v4-progress-track]');

    expect(tracks).toHaveLength(3);
    tracks.forEach((track) => expect(track.style.height).toBe(`${CHART_MARK.dotSize}px`));
  });

  it('rounds the data end only — the trailing edge, never the baseline', () => {
    const root = mount(<ProgressBarsV4 items={ITEMS} />);
    const fill = fills(root)[0] as HTMLElement;

    expect(fill.style.borderTopRightRadius).toBe(`${CHART_MARK.endRadius}px`);
    expect(fill.style.borderBottomRightRadius).toBe(`${CHART_MARK.endRadius}px`);
    expect(fill.style.borderTopLeftRadius).toBe('');
  });

  it('scales each fill against the ceiling', () => {
    const root = mount(<ProgressBarsV4 items={ITEMS} />);
    const all = fills(root);

    expect(all[0]?.style.width).toBe('100%');
    expect(all[1]?.style.width).toBe('50%');
    expect(all[2]?.style.width).toBe('25%');
  });

  it('renders an empty fill rather than dividing by a zero ceiling', () => {
    const root = mount(<ProgressBarsV4 items={[{ label: 'Nothing', value: 0 }]} />);

    expect(fills(root)[0]?.style.width).toBe('0%');
  });

  // ── new props ──────────────────────────────────────────────────────

  it('shows values by default and hides them on request', () => {
    // Read the list, not the container: the provider injects a stylesheet whose
    // text is full of ramp steps like `--xen-primary-400`.
    const list = (root: HTMLElement): string =>
      root.querySelector('[role="list"]')?.textContent ?? '';

    expect(list(mount(<ProgressBarsV4 items={ITEMS} />))).toContain('40');
    expect(list(mount(<ProgressBarsV4 items={ITEMS} showValues={false} />))).not.toContain('40');
  });

  it('formats values through `valueFormat`', () => {
    const root = mount(<ProgressBarsV4 items={ITEMS} valueFormat={(v) => `${v}%`} />);
    expect(root.textContent).toContain('40%');
  });

  it('renders a per-row caption, the row family’s supporting line', () => {
    const root = mount(
      <ProgressBarsV4 items={[{ label: 'Organic', value: 40, caption: 'up 4 this week' }]} />
    );
    expect(root.textContent).toContain('up 4 this week');
  });

  it('measures against an explicit `max` when one is given', () => {
    const root = mount(<ProgressBarsV4 items={ITEMS} max={80} />);
    expect(fills(root)[0]?.style.width).toBe('50%');
  });

  it('makes each row a button when it is selectable', () => {
    const onItemSelect = jest.fn();
    const root = mount(<ProgressBarsV4 items={ITEMS} onItemSelect={onItemSelect} />);
    const buttons = root.querySelectorAll<HTMLButtonElement>('button');

    expect(buttons).toHaveLength(3);
    fireEvent.click(buttons[1] as HTMLButtonElement);
    expect(onItemSelect).toHaveBeenCalledWith(ITEMS[1], 1);
  });

  it('renders the header and the caption', () => {
    const root = mount(<ProgressBarsV4 items={ITEMS} title="Top channels" caption="Last 30 days" />);

    expect(root.textContent).toContain('Top channels');
    expect(root.textContent).toContain('Last 30 days');
  });

  it('shows the loading placeholder instead of the rows', () => {
    const root = mount(<ProgressBarsV4 items={ITEMS} loading />);

    expect(root.querySelectorAll('[role="listitem"]')).toHaveLength(0);
    expect(root.querySelector('[data-xen-v4-skeleton]')).not.toBeNull();
  });

  // ── empty and single-datum ─────────────────────────────────────────

  it('renders the empty state rather than nothing', () => {
    const root = mount(<ProgressBarsV4 items={[]} emptyLabel="No channels" />);

    expect(root.querySelectorAll('[role="listitem"]')).toHaveLength(0);
    expect(root.textContent).toContain('No channels');
  });

  it('renders a single row at a full bar', () => {
    const root = mount(<ProgressBarsV4 items={[{ label: 'Organic', value: 7 }]} />);

    expect(root.querySelectorAll('[role="listitem"]')).toHaveLength(1);
    expect(fills(root)[0]?.style.width).toBe('100%');
  });

  // ── the accessible label ───────────────────────────────────────────

  it('derives a sentence and still leaves every row readable', () => {
    const root = mount(<ProgressBarsV4 items={ITEMS} title="Top channels" />);

    expect(root.querySelector('[role="list"]')?.getAttribute('aria-label')).toBe(
      'Top channels, 3 rows, Organic 40, Referral 20, Direct 10.'
    );
    expect(root.querySelectorAll('[role="listitem"]')).toHaveLength(3);
  });

  it('lets a caller override the derived sentence', () => {
    const root = mount(<ProgressBarsV4 items={ITEMS} aria-label="Acquisition mix" />);

    expect(root.querySelector('[role="list"]')?.getAttribute('aria-label')).toBe(
      'Acquisition mix'
    );
  });

  // ── §36.6: a value that CHANGES has to move ────────────────────────

  /*
    `useChartV4(animate)` is a mount-time entrance and nothing else, so the
    defect this covers is not "does the bar appear" — it is what happens when
    the number changes while the reader is looking at it. A KPI row going 40 to
    75 used to arrive at 75 with no movement in between.
  */
  it('eases the fill when the value changes after mount, at the scale’s `standard`', () => {
    const { container, rerender } = render(
      <XenitionUIProvider theme={SEED}>
        <ProgressBarsV4 items={[{ label: 'Organic', value: 40 }]} max={100} />
      </XenitionUIProvider>
    );
    const before = container.querySelector('[data-xen-v4-progress-fill]') as HTMLElement;
    expect(before.style.width).toBe('40%');

    rerender(
      <XenitionUIProvider theme={SEED}>
        <ProgressBarsV4 items={[{ label: 'Organic', value: 75 }]} max={100} />
      </XenitionUIProvider>
    );
    const after = container.querySelector('[data-xen-v4-progress-fill]') as HTMLElement;

    // The SAME node, re-measured. A remount would restart the entrance and no
    // transition could run across it, so identity is half the fix.
    expect(after).toBe(before);
    expect(after.style.width).toBe('75%');
    expect(after.getAttribute('data-xen-v4-chart-fill')).toBe('');
    expect(chartSheet()).toContain(
      `[data-xen-v4-chart-fill] {
  transition: ${transitionCss(['width', 'left', 'stroke-dashoffset'])};`
    );
    // A control changing state, not something crossing the screen.
    expect(chartSheet()).toContain(`width ${V4_MOTION.standard}ms`);
  });

  it('snaps the fill instead of easing it under reduced motion — §36.10', () => {
    mount(<ProgressBarsV4 items={ITEMS} />);
    expect(chartSheet()).toContain('[data-xen-v4-chart-fill] { transition: none; }');
  });
});

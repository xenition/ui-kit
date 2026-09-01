/** @jest-environment jsdom */
import { fireEvent, render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import {
  CHART_MARK,
  CHART_OVERFLOW_LABEL,
  CHART_SERIES_COUNT,
} from '../primitives/internal/v4-chart';
import {
  COMPARISON_BARS_V4_CSS,
  COMPARISON_BARS_V4_STYLE_ID,
  ComparisonBarsV4,
} from './ComparisonBarsV4';

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

const DATA = [
  { label: 'Jan', values: [4, 8] },
  { label: 'Feb', values: [6, 3] },
];

const SERIES = [
  { key: 'a', label: 'This year' },
  { key: 'b', label: 'Last year' },
];

const bars = (root: HTMLElement): NodeListOf<HTMLElement> =>
  root.querySelectorAll<HTMLElement>('[data-xen-v4-bar]');

describe('ComparisonBarsV4 (web)', () => {
  // ── the palette, not the opacity ladder ────────────────────────────

  it('paints a slot per series, in assignment order, at full strength', () => {
    const root = mount(<ComparisonBarsV4 data={DATA} series={SERIES} />);
    const all = bars(root);

    expect(all).toHaveLength(4);
    expect(all[0]?.style.getPropertyValue('--xen-bar-fill')).toBe('var(--xen-chart-1)');
    expect(all[1]?.style.getPropertyValue('--xen-bar-fill')).toBe('var(--xen-chart-2)');
    // The retired `OPACITY_STEPS = [1, 0.6, 0.35, 0.2]`.
    all.forEach((bar) => expect(bar.style.opacity).toBe(''));
  });

  it('paints from a sheet, because jsdom drops an inline `var()`', () => {
    mount(<ComparisonBarsV4 data={DATA} series={SERIES} />);
    const css = document.getElementById(COMPARISON_BARS_V4_STYLE_ID)?.textContent ?? '';

    expect(css).toBe(COMPARISON_BARS_V4_CSS);
    expect(css).toContain('background-color: var(--xen-bar-fill)');
    expect(css).toContain('background-color: var(--xen-chart-axis)');
  });

  it('folds past the five-slot palette rather than cycling OR throwing', () => {
    // The palette still throws; the COMPONENT folds, because a grouped bar
    // chart's series count arrives with the data (`foldChartSeries`).
    const six = Array.from({ length: 6 }, (_, i) => ({ key: `s${i}`, label: `S${i}` }));
    const root = mount(
      <ComparisonBarsV4 data={[{ label: 'One', values: [1, 2, 3, 4, 5, 6] }]} series={six} />
    );

    // Every bar still drawn — folding shares a slot, it does not drop data.
    const all = bars(root);
    expect(all).toHaveLength(6);
    // The sixth shares the fifth's slot rather than reaching for a sixth.
    expect(all[CHART_SERIES_COUNT]?.style.getPropertyValue('--xen-bar-fill')).toBe(
      all[CHART_SERIES_COUNT - 1]?.style.getPropertyValue('--xen-bar-fill')
    );
    // ...and the legend carries five rows, the last named "Other".
    const rows = root.querySelectorAll('[data-xen-v4-legend-item]');
    expect(rows).toHaveLength(CHART_SERIES_COUNT);
    expect(rows[CHART_SERIES_COUNT - 1]?.textContent).toContain(CHART_OVERFLOW_LABEL);
  });

  it('paints a status hue only for a series that opted in with `tone`', () => {
    const root = mount(
      <ComparisonBarsV4
        data={[{ label: 'Jan', values: [4] }]}
        series={[{ key: 'e', label: 'Errors', tone: 'warn' }]}
      />
    );
    expect(bars(root)[0]?.style.getPropertyValue('--xen-bar-fill')).toBe('var(--xen-warn)');
  });

  // ── marks and gaps ─────────────────────────────────────────────────

  it('rounds the data end only, so the bar sits on its baseline', () => {
    const root = mount(<ComparisonBarsV4 data={DATA} series={SERIES} />);
    const bar = bars(root)[0] as HTMLElement;

    expect(bar.style.borderTopLeftRadius).toBe(`${CHART_MARK.endRadius}px`);
    expect(bar.style.borderTopRightRadius).toBe(`${CHART_MARK.endRadius}px`);
    expect(bar.style.borderBottomLeftRadius).toBe('');
    expect(bar.style.borderBottomRightRadius).toBe('');
  });

  it('scales bars against the ceiling and floors a zero at a hairline', () => {
    const root = mount(
      <ComparisonBarsV4
        data={[{ label: 'Jan', values: [8, 0] }]}
        series={SERIES}
        max={8}
        height={100}
      />
    );
    const all = bars(root);

    expect(all[0]?.style.height).toBe('100px');
    expect(all[1]?.style.height).toBe('1px');
  });

  it('separates bars in a group by CHART_MARK.gap and groups by a spacing step', () => {
    const root = mount(<ComparisonBarsV4 data={DATA} series={SERIES} />);
    const group = bars(root)[0]?.parentElement?.parentElement as HTMLElement;

    expect(group.style.gap).toBe(`${CHART_MARK.gap}px`);
    expect(group.parentElement?.className).toContain('gap-md');
  });

  it('paints the baseline from the axis token, never from `muted`', () => {
    const root = mount(<ComparisonBarsV4 data={DATA} series={SERIES} />);
    const axis = root.querySelector<HTMLElement>('[data-xen-v4-comparison-axis]');

    expect(axis?.style.height).toBe(`${CHART_MARK.stroke}px`);
    expect(root.innerHTML).not.toContain('var(--xen-muted)');
  });

  // ── new props ──────────────────────────────────────────────────────

  it('direct-labels the values at four groups or fewer, and stops above', () => {
    const labelled = mount(<ComparisonBarsV4 data={DATA} series={SERIES} />);
    expect(labelled.textContent).toContain('8');

    const many = Array.from({ length: 5 }, (_, i) => ({ label: `G${i}`, values: [i] }));
    const bare = mount(<ComparisonBarsV4 data={many} series={[SERIES[0]!]} />);
    expect(bare.querySelectorAll('[aria-hidden="true"]').length).toBeLessThan(
      labelled.querySelectorAll('[aria-hidden="true"]').length
    );
  });

  it('ships a legend at two or more series and none at one', () => {
    expect(
      mount(<ComparisonBarsV4 data={DATA} series={SERIES} />).querySelector('[data-xen-v4-legend]')
    ).not.toBeNull();
    expect(
      mount(
        <ComparisonBarsV4 data={[{ label: 'Jan', values: [1] }]} series={[SERIES[0]!]} />
      ).querySelector('[data-xen-v4-legend]')
    ).toBeNull();
  });

  it('reports a pressed bar with its group and series', () => {
    const onBarSelect = jest.fn();
    const root = mount(
      <ComparisonBarsV4 data={DATA} series={SERIES} onBarSelect={onBarSelect} />
    );

    fireEvent.click(bars(root)[1] as HTMLElement);
    expect(onBarSelect).toHaveBeenCalledWith(0, 1, 8);
  });

  it('renders the header, summary and caption', () => {
    const root = mount(
      <ComparisonBarsV4
        data={DATA}
        series={SERIES}
        title="Revenue by month"
        summary="£48,210"
        caption="vs last year"
      />
    );

    expect(root.textContent).toContain('Revenue by month');
    expect(root.textContent).toContain('£48,210');
    expect(root.textContent).toContain('vs last year');
  });

  it('shows the loading placeholder at the plot’s footprint', () => {
    const root = mount(<ComparisonBarsV4 data={DATA} series={SERIES} loading />);

    expect(bars(root)).toHaveLength(0);
    expect(root.querySelector('[data-xen-v4-skeleton]')).not.toBeNull();
  });

  // ── empty and single-datum ─────────────────────────────────────────

  it('renders the empty state, keeping the footprint', () => {
    const root = mount(<ComparisonBarsV4 data={[]} height={140} emptyLabel="No months" />);

    expect(bars(root)).toHaveLength(0);
    expect(root.textContent).toContain('No months');
    expect(root.querySelector<HTMLElement>('[role="img"]')?.style.height).toBe('140px');
  });

  it('renders one group with one bar', () => {
    const root = mount(
      <ComparisonBarsV4 data={[{ label: 'Jan', values: [4] }]} series={[SERIES[0]!]} />
    );

    expect(bars(root)).toHaveLength(1);
    expect(root.textContent).toContain('Jan');
  });

  // ── the accessible label ───────────────────────────────────────────

  it('derives a sentence naming the counts and the range', () => {
    const root = mount(<ComparisonBarsV4 data={DATA} series={SERIES} title="Revenue" />);

    expect(root.querySelector('[role="img"]')?.getAttribute('aria-label')).toBe(
      'Grouped bar chart, Revenue, 2 groups, 2 series, 3 to 8.'
    );
  });

  it('lets a caller override the derived sentence', () => {
    const root = mount(<ComparisonBarsV4 data={DATA} series={SERIES} aria-label="Year on year" />);

    expect(root.querySelector('[role="img"]')?.getAttribute('aria-label')).toBe('Year on year');
  });
});

/** @jest-environment jsdom */
import { fireEvent, render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import {
  CHART_MARK,
  CHART_OVERFLOW_LABEL,
  CHART_SCATTER_SERIES_CAP,
} from '../primitives/internal/v4-chart';
import { ScatterChartV4, type ScatterSeriesV4 } from './ScatterChartV4';

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

const POINTS = [
  { x: 0, y: 1 },
  { x: 2, y: 5 },
  { x: 4, y: 3 },
];

const marks = (root: HTMLElement): NodeListOf<SVGCircleElement> =>
  root.querySelectorAll<SVGCircleElement>('[data-xen-v4-mark-ring]');

const seriesOf = (count: number): ScatterSeriesV4[] =>
  Array.from({ length: count }, (_, i) => ({
    key: `s${i}`,
    label: `Series ${i + 1}`,
    points: POINTS,
  }));

describe('ScatterChartV4 (web)', () => {
  // ── the cap ────────────────────────────────────────────────────────

  it('renders up to the scatter cap', () => {
    const root = mount(<ScatterChartV4 series={seriesOf(CHART_SCATTER_SERIES_CAP)} />);

    expect(marks(root)).toHaveLength(CHART_SCATTER_SERIES_CAP * POINTS.length);
  });

  it('folds past CHART_SCATTER_SERIES_CAP rather than reaching for a fourth slot', () => {
    // The palette still throws past its last slot; the COMPONENT folds, because
    // a scatter's series count arrives with the data and a `RangeError` out of
    // render would take the page down (`foldChartSeries`).
    const root = mount(<ScatterChartV4 series={seriesOf(CHART_SCATTER_SERIES_CAP + 1)} />);

    // Every point still drawn — folding is a union, not a drop.
    expect(marks(root)).toHaveLength((CHART_SCATTER_SERIES_CAP + 1) * POINTS.length);
    // ...but only `cap` legend rows, the last of which is the folded tail.
    const rows = root.querySelectorAll('[data-xen-v4-legend-item]');
    expect(rows).toHaveLength(CHART_SCATTER_SERIES_CAP);
    expect(rows[CHART_SCATTER_SERIES_CAP - 1]?.textContent).toContain(CHART_OVERFLOW_LABEL);
  });

  // ── marks ──────────────────────────────────────────────────────────

  it('paints each series from its slot and rings every point with surface', () => {
    const root = mount(<ScatterChartV4 series={seriesOf(2)} />);
    const dots = marks(root);

    expect(dots[0]?.getAttribute('fill')).toBe('var(--xen-chart-1)');
    expect(dots[POINTS.length]?.getAttribute('fill')).toBe('var(--xen-chart-2)');
    dots.forEach((dot) => {
      expect(dot.getAttribute('r')).toBe(String(CHART_MARK.dotSize / 2));
      expect(dot.getAttribute('stroke-width')).toBe(String(CHART_MARK.ring));
      // The retired `fillOpacity={0.75}`: two overlapping translucent dots make
      // a third colour that is in neither series' key.
      expect(dot.getAttribute('fill-opacity')).toBeNull();
    });
  });

  it('paints a status hue only for a series that opted in with `tone`', () => {
    const root = mount(
      <ScatterChartV4
        series={[{ key: 'e', label: 'Errors', points: POINTS, tone: 'danger' }]}
      />
    );
    expect(marks(root)[0]?.getAttribute('fill')).toBe('var(--xen-danger)');
  });

  it('draws the axis from the axis token and the grid from the grid token', () => {
    const root = mount(<ScatterChartV4 data={POINTS} />);
    const axes = root.querySelectorAll('[data-xen-v4-axis]');
    const grid = root.querySelectorAll('[data-xen-v4-grid]');

    expect(axes).toHaveLength(2);
    axes.forEach((axis) => {
      expect(axis.getAttribute('stroke')).toBe('var(--xen-chart-axis)');
      expect(axis.getAttribute('stroke-width')).toBe(String(CHART_MARK.stroke));
    });
    grid.forEach((line) => expect(line.getAttribute('stroke')).toBe('var(--xen-chart-grid)'));
    // Never `var(--xen-border)` — a hairline token doing an axis's job.
    expect(root.innerHTML).not.toContain('var(--xen-border)');
  });

  // ── new props ──────────────────────────────────────────────────────

  it('takes the `data` short form on both twins', () => {
    const root = mount(<ScatterChartV4 data={POINTS} />);
    expect(marks(root)).toHaveLength(POINTS.length);
  });

  it('ships a legend at two or more series and none at one', () => {
    expect(mount(<ScatterChartV4 series={seriesOf(2)} />).querySelector('[data-xen-v4-legend]')).not
      .toBeNull();
    expect(
      mount(<ScatterChartV4 data={POINTS} />).querySelector('[data-xen-v4-legend]')
    ).toBeNull();
  });

  it('carries a per-mark tooltip and drops it when asked', () => {
    const root = mount(<ScatterChartV4 data={[{ x: 1, y: 2, label: 'Tue' }]} />);
    expect(root.querySelector('title')?.textContent).toBe('Series 1 · Tue: 1, 2');

    const bare = mount(<ScatterChartV4 data={[{ x: 1, y: 2 }]} tooltip={false} />);
    expect(bare.querySelector('svg title')).toBeNull();
  });

  it('gives every point a 44 hit area once it is selectable (rule 10)', () => {
    const onPointSelect = jest.fn();
    const root = mount(<ScatterChartV4 data={POINTS} onPointSelect={onPointSelect} />);
    const hits = root.querySelectorAll<SVGCircleElement>('[data-xen-v4-hit]');

    expect(hits).toHaveLength(POINTS.length);
    hits.forEach((hit) => expect(hit.getAttribute('r')).toBe('22'));
    fireEvent.click(hits[1] as SVGCircleElement);
    expect(onPointSelect).toHaveBeenCalledWith(POINTS[1], 0, 1);
  });

  it('renders the header, summary and caption', () => {
    const root = mount(
      <ScatterChartV4 data={POINTS} title="Spend vs revenue" summary="£48,210" caption="Q3" />
    );

    expect(root.textContent).toContain('Spend vs revenue');
    expect(root.textContent).toContain('£48,210');
    expect(root.textContent).toContain('Q3');
  });

  it('shows the loading placeholder at the plot’s footprint', () => {
    const root = mount(<ScatterChartV4 data={POINTS} loading />);

    expect(marks(root)).toHaveLength(0);
    expect(root.querySelector('[data-xen-v4-skeleton]')).not.toBeNull();
  });

  // ── empty and single-datum ─────────────────────────────────────────

  it('renders the empty state, keeping the footprint', () => {
    const root = mount(<ScatterChartV4 data={[]} height={180} emptyLabel="No sessions" />);

    expect(marks(root)).toHaveLength(0);
    expect(root.textContent).toContain('No sessions');
    expect(root.querySelector<HTMLElement>('[role="img"]')?.style.height).toBe('180px');
  });

  it('centres a single point instead of dividing by a zero span', () => {
    const root = mount(<ScatterChartV4 data={[{ x: 5, y: 5 }]} width={320} height={200} />);
    const dot = marks(root)[0] as SVGCircleElement;

    const cx = Number(dot.getAttribute('cx'));
    const cy = Number(dot.getAttribute('cy'));
    expect(Number.isFinite(cx)).toBe(true);
    expect(Number.isFinite(cy)).toBe(true);
    expect(cx).toBeCloseTo(320 / 2, 5);
    expect(cy).toBeCloseTo(200 / 2, 5);
  });

  // ── the accessible label ───────────────────────────────────────────

  it('derives a sentence naming the form, the counts and both ranges', () => {
    const root = mount(<ScatterChartV4 data={POINTS} title="Spend vs revenue" />);

    expect(root.querySelector('svg')?.getAttribute('aria-label')).toBe(
      'Scatter plot, Spend vs revenue, 1 series, 3 points, x 0 to 4, y 1 to 5.'
    );
  });

  it('lets a caller override the derived sentence', () => {
    const root = mount(<ScatterChartV4 data={POINTS} aria-label="Cost per acquisition" />);

    expect(root.querySelector('svg')?.getAttribute('aria-label')).toBe('Cost per acquisition');
  });
});

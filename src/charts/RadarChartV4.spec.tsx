/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { CHART_MARK, CHART_OVERFLOW_LABEL } from '../primitives/internal/v4-chart';
import { CHART_AREA_FILL_ALPHA, RADAR_SERIES_CAP, RadarChartV4 } from './RadarChartV4';

const SEED: ThemeSeed = {
  primary: '#0D9488',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function draw(ui: ReactElement): HTMLElement {
  const { container } = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return container as unknown as HTMLElement;
}

const AXES = ['Speed', 'Power', 'Range', 'Comfort', 'Price'];
const ONE = [4, 7, 5, 9, 6];
const TWO = [
  [4, 7, 5, 9, 6],
  [8, 3, 6, 2, 7],
];

/** The series polygons — the rings come first and are `fill="none"`. */
function seriesPolys(root: HTMLElement): SVGPolygonElement[] {
  return Array.from(root.querySelectorAll('polygon')).filter(
    (p) => p.getAttribute('fill') !== 'none'
  );
}

function ringPolys(root: HTMLElement): SVGPolygonElement[] {
  return Array.from(root.querySelectorAll('polygon')).filter(
    (p) => p.getAttribute('fill') === 'none'
  );
}

describe('RadarChartV4 (web)', () => {
  // ── §5: rings are grid, spokes are axes ────────────────────────────

  it('draws its rings at the grid var and its spokes at the axis var, never `--xen-border`', () => {
    const root = draw(<RadarChartV4 data={TWO} axes={AXES} />);
    for (const ring of ringPolys(root)) {
      expect(ring.getAttribute('stroke')).toBe('var(--xen-chart-grid)');
      // A grid line is the one bare number §1 rule 1 allows: a hairline.
      expect(ring.getAttribute('stroke-width')).toBe('1');
    }
    const spokes = Array.from(root.querySelectorAll('line'));
    expect(spokes.length).toBe(AXES.length);
    for (const spoke of spokes) {
      expect(spoke.getAttribute('stroke')).toBe('var(--xen-chart-axis)');
      expect(spoke.getAttribute('stroke-width')).toBe('1');
    }
    expect(root.innerHTML).not.toContain('var(--xen-border)');
  });

  it('draws the caller’s ring count, and at least one', () => {
    expect(ringPolys(draw(<RadarChartV4 data={TWO} axes={AXES} rings={6} />)).length).toBe(6);
    expect(ringPolys(draw(<RadarChartV4 data={TWO} axes={AXES} rings={0} />)).length).toBe(1);
  });

  // ── §4.4: fill under stroke ────────────────────────────────────────

  it('fills each polygon at the named alpha under a full-strength stroke', () => {
    const root = draw(<RadarChartV4 data={TWO} axes={AXES} />);
    const [first, second] = seriesPolys(root);
    expect(first?.getAttribute('fill')).toBe('var(--xen-chart-1)');
    expect(first?.getAttribute('fill-opacity')).toBe(String(CHART_AREA_FILL_ALPHA));
    expect(first?.getAttribute('stroke')).toBe('var(--xen-chart-1)');
    expect(first?.getAttribute('stroke-width')).toBe(String(CHART_MARK.stroke));
    // Slots in assignment order; the base cycled into `accent` then `success`.
    expect(second?.getAttribute('stroke')).toBe('var(--xen-chart-2)');
  });

  it('reaches a status hue only through the series config’s `tone`', () => {
    const root = draw(
      <RadarChartV4
        data={TWO}
        axes={AXES}
        series={[
          { key: 'target', label: 'Target' },
          { key: 'risk', label: 'Risk', tone: 'danger' },
        ]}
      />
    );
    const [first, second] = seriesPolys(root);
    expect(first?.getAttribute('stroke')).toBe('var(--xen-chart-1)');
    expect(second?.getAttribute('stroke')).toBe('var(--xen-danger)');
  });

  // ── §5: the cap ────────────────────────────────────────────────────

  it(`carries ${RADAR_SERIES_CAP} series and folds at the fifth rather than cycling`, () => {
    const four = [
      [1, 2, 3],
      [3, 2, 1],
      [2, 2, 2],
      [1, 1, 3],
    ];
    expect(seriesPolys(draw(<RadarChartV4 data={four} />)).length).toBe(RADAR_SERIES_CAP);

    // The cap is unmoved; what changed is the failure mode. A radar's series
    // count arrives with the data, so a fifth row folds into the last slot
    // instead of taking the page down with a `RangeError` (`foldChartSeries`).
    const five = draw(<RadarChartV4 data={[...four, [3, 3, 3]]} />);
    const polys = seriesPolys(five);
    // Every polygon still drawn — folding shares a slot, it does not drop data.
    expect(polys).toHaveLength(RADAR_SERIES_CAP + 1);
    expect(polys[RADAR_SERIES_CAP]?.getAttribute('stroke')).toBe(
      polys[RADAR_SERIES_CAP - 1]?.getAttribute('stroke')
    );
    // ...and the legend carries `cap` rows, the last named "Other".
    const rows = five.querySelectorAll('[data-xen-v4-legend-item]');
    expect(rows).toHaveLength(RADAR_SERIES_CAP);
    expect(rows[RADAR_SERIES_CAP - 1]?.textContent).toContain(CHART_OVERFLOW_LABEL);
  });

  // ── §4.3: the config/data split ────────────────────────────────────

  it('takes one series as a flat row and many as rows', () => {
    expect(seriesPolys(draw(<RadarChartV4 data={ONE} axes={AXES} />)).length).toBe(1);
    expect(seriesPolys(draw(<RadarChartV4 data={TWO} axes={AXES} />)).length).toBe(2);
  });

  it('names series from the config, and falls back to a positional name', () => {
    const named = draw(
      <RadarChartV4
        data={TWO}
        axes={AXES}
        series={[
          { key: 'a', label: 'This year' },
          { key: 'b', label: 'Last year' },
        ]}
      />
    );
    expect(named.textContent).toContain('This year');
    expect(named.textContent).toContain('Last year');
    const unnamed = draw(<RadarChartV4 data={TWO} axes={AXES} />);
    expect(unnamed.textContent).toContain('Series 1');
    expect(unnamed.textContent).toContain('Series 2');
  });

  // ── §4.2: the figure frame ─────────────────────────────────────────

  it('renders title, summary, caption, axis labels and a legend', () => {
    const root = draw(
      <RadarChartV4
        data={TWO}
        axes={AXES}
        title="How the two trims compare"
        summary="8.2"
        caption="dealer scores"
      />
    );
    expect(root.textContent).toContain('How the two trims compare');
    expect(root.textContent).toContain('8.2');
    expect(root.textContent).toContain('dealer scores');
    expect(root.textContent).toContain('Comfort');
  });

  it('sets axis labels at the xs step in mutedText, never a fontSize literal', () => {
    const root = draw(<RadarChartV4 data={TWO} axes={AXES} />);
    const label = root.querySelector('text') as SVGTextElement;
    expect(label.getAttribute('class')).toContain('text-xs');
    expect(label.getAttribute('class')).toContain('text-muted-text');
    expect(label.getAttribute('font-size')).toBeNull();
  });

  it('drops the legend at one series and keeps it at two — the §4.2 default', () => {
    expect(
      draw(<RadarChartV4 data={ONE} axes={AXES} />).querySelector('[data-xen-v4-chart-legend]')
    ).toBeNull();
    expect(
      draw(<RadarChartV4 data={TWO} axes={AXES} />).querySelector('[data-xen-v4-chart-legend]')
    ).not.toBeNull();
  });

  // ── §4.5: empty, single datum, loading ─────────────────────────────

  it('renders the empty state at the plot’s footprint with no data at all', () => {
    const root = draw(<RadarChartV4 size={220} />);
    const empty = root.querySelector('[role="img"]') as HTMLElement;
    expect(empty.getAttribute('aria-label')).toBe('No data');
    expect(empty.style.height).toBe('220px');
    expect(root.querySelector('svg')).toBeNull();
  });

  it('renders the empty state for rows with no axes in them', () => {
    const root = draw(<RadarChartV4 data={[[]]} emptyLabel="Nothing scored" />);
    expect(root.textContent).toContain('Nothing scored');
  });

  it('draws a single series with no NaN in its points', () => {
    const root = draw(<RadarChartV4 data={ONE} axes={AXES} />);
    const poly = seriesPolys(root)[0] as SVGPolygonElement;
    expect(poly.getAttribute('points')).not.toContain('NaN');
    expect(poly.getAttribute('points')?.split(' ').length).toBe(AXES.length);
    expect(root.innerHTML).not.toContain('NaN');
  });

  it('survives an all-zero series — a collapsed polygon, not a divide by zero', () => {
    const root = draw(<RadarChartV4 data={[0, 0, 0]} />);
    const poly = seriesPolys(root)[0] as SVGPolygonElement;
    expect(poly.getAttribute('points')).not.toContain('NaN');
    expect(root.innerHTML).not.toContain('NaN');
  });

  it('pads short rows and reads a non-finite value as zero', () => {
    const root = draw(
      <RadarChartV4 data={[[5, Number.NaN]]} axes={['A', 'B', 'C']} />
    );
    const poly = seriesPolys(root)[0] as SVGPolygonElement;
    expect(poly.getAttribute('points')?.split(' ').length).toBe(3);
    expect(root.innerHTML).not.toContain('NaN');
  });

  it('swaps the plot for a skeleton when loading, keeping the title', () => {
    const root = draw(<RadarChartV4 data={TWO} axes={AXES} loading title="Trims" />);
    expect(root.querySelector('svg')).toBeNull();
    expect(root.textContent).toContain('Trims');
  });

  // ── §1 rule 6 ──────────────────────────────────────────────────────

  it('states the form, the series count, the axis count and the range', () => {
    const svg = draw(<RadarChartV4 data={TWO} axes={AXES} />).querySelector(
      'svg'
    ) as SVGSVGElement;
    expect(svg.getAttribute('role')).toBe('img');
    expect(svg.getAttribute('aria-label')).toBe('Radar chart, 2 series, 5 axes, 0 to 9');
  });

  it('honours an explicit `max` in the spoken range', () => {
    const svg = draw(<RadarChartV4 data={TWO} axes={AXES} max={10} />).querySelector(
      'svg'
    ) as SVGSVGElement;
    expect(svg.getAttribute('aria-label')).toContain('0 to 10');
  });
});

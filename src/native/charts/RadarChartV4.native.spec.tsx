import * as React from 'react';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { toNativeTokens } from '../../theme/outputs';
import {
  CHART_AXIS_MIX,
  CHART_GRID_MIX,
  CHART_MARK,
  CHART_OVERFLOW_LABEL,
  chartSeries,
} from '../../primitives/internal/v4-chart';
import { withAlpha } from '../primitives/internal/color';
import { CHART_AREA_FILL_ALPHA, RADAR_SERIES_CAP, RadarChartV4 } from './RadarChartV4';

const theme = compileTheme(SEED_LIGHT);
const SLOTS = chartSeries(toNativeTokens(theme).ramps.primary[500], 'light');
const GRID = withAlpha(theme.light.onSurface, CHART_GRID_MIX);
const AXIS = withAlpha(theme.light.onSurface, CHART_AXIS_MIX);

const AXES = ['Speed', 'Power', 'Range', 'Comfort', 'Price'];
const ONE = [4, 7, 5, 9, 6];
const TWO = [
  [4, 7, 5, 9, 6],
  [8, 3, 6, 2, 7],
];

/** Host nodes only — the svg mock renders through `View`, itself a composite. */
function byTestId(root: ReactTestInstance, id: string): ReactTestInstance[] {
  return root.findAll((n) => typeof n.type === 'string' && n.props?.testID === id);
}

/** The series polygons — the rings come first and are `fill="none"`. */
function seriesPolys(root: ReactTestInstance): ReactTestInstance[] {
  return byTestId(root, 'svg-polygon').filter((p) => p.props.fill !== 'none');
}

function ringPolys(root: ReactTestInstance): ReactTestInstance[] {
  return byTestId(root, 'svg-polygon').filter((p) => p.props.fill === 'none');
}

function spoken(root: ReactTestInstance): string {
  const node = root.findAll(
    (n) => typeof n.type === 'string' && typeof n.props?.accessibilityLabel === 'string'
  )[0];
  return (node?.props.accessibilityLabel as string) ?? '';
}

describe('RadarChartV4 (native)', () => {
  // ── §5: rings are grid, spokes are axes ────────────────────────────

  it('draws its rings at `palette.grid` and its spokes at `palette.axis`, never `border`', () => {
    const { root } = renderThemed(<RadarChartV4 data={TWO} axes={AXES} />, SEED_LIGHT);
    for (const ring of ringPolys(root)) {
      expect(ring.props.stroke).toBe(GRID);
      // A grid line is the one bare number §1 rule 1 allows: a hairline.
      expect(ring.props.strokeWidth).toBe(1);
    }
    const spokes = byTestId(root, 'svg-line');
    expect(spokes.length).toBe(AXES.length);
    for (const spoke of spokes) {
      expect(spoke.props.stroke).toBe(AXIS);
      expect(spoke.props.strokeWidth).toBe(1);
      expect(spoke.props.stroke).not.toBe(theme.light.border);
    }
    // The axis really is one step more present than the grid behind it.
    expect(AXIS).not.toBe(GRID);
  });

  it('draws the caller’s ring count, and at least one', () => {
    expect(
      ringPolys(renderThemed(<RadarChartV4 data={TWO} axes={AXES} rings={6} />, SEED_LIGHT).root)
        .length
    ).toBe(6);
    expect(
      ringPolys(renderThemed(<RadarChartV4 data={TWO} axes={AXES} rings={0} />, SEED_LIGHT).root)
        .length
    ).toBe(1);
  });

  // ── §4.4: fill under stroke ────────────────────────────────────────

  it('fills each polygon at the named alpha under a full-strength stroke', () => {
    const { root } = renderThemed(<RadarChartV4 data={TWO} axes={AXES} />, SEED_LIGHT);
    const [first, second] = seriesPolys(root);
    expect(first?.props.fill).toBe(SLOTS[0]);
    expect(first?.props.fillOpacity).toBe(CHART_AREA_FILL_ALPHA);
    expect(first?.props.stroke).toBe(SLOTS[0]);
    expect(first?.props.strokeWidth).toBe(CHART_MARK.stroke);
    // Slots in assignment order; the base cycled into `accent` then `success`.
    expect(second?.props.stroke).toBe(SLOTS[1]);
  });

  it('reaches a status hue only through the series config’s `tone`', () => {
    const { root } = renderThemed(
      <RadarChartV4
        data={TWO}
        axes={AXES}
        series={[
          { key: 'target', label: 'Target' },
          { key: 'risk', label: 'Risk', tone: 'danger' },
        ]}
      />,
      SEED_LIGHT
    );
    const [first, second] = seriesPolys(root);
    expect(first?.props.stroke).toBe(SLOTS[0]);
    expect(second?.props.stroke).toBe(theme.light.danger);
  });

  // ── §5: the cap ────────────────────────────────────────────────────

  it(`carries ${RADAR_SERIES_CAP} series and folds at the fifth rather than cycling`, () => {
    const four = [
      [1, 2, 3],
      [3, 2, 1],
      [2, 2, 2],
      [1, 1, 3],
    ];
    expect(seriesPolys(renderThemed(<RadarChartV4 data={four} />, SEED_LIGHT).root).length).toBe(
      RADAR_SERIES_CAP
    );

    // The cap is unmoved; what changed is the failure mode. A radar's series
    // count arrives with the data, so a fifth row folds into the last slot
    // instead of taking the screen down with a `RangeError` (`foldChartSeries`).
    const five = renderThemed(<RadarChartV4 data={[...four, [3, 3, 3]]} />, SEED_LIGHT);
    const polys = seriesPolys(five.root);
    // Every polygon still drawn — folding shares a slot, it does not drop data.
    expect(polys).toHaveLength(RADAR_SERIES_CAP + 1);
    expect(polys[RADAR_SERIES_CAP]?.props.stroke).toBe(polys[RADAR_SERIES_CAP - 1]?.props.stroke);
    // ...and the legend carries `cap` rows, the last named "Other".
    expect(five.getAllByTestId('legend-item')).toHaveLength(RADAR_SERIES_CAP);
    expect(five.getByText(new RegExp(CHART_OVERFLOW_LABEL))).toBeTruthy();
  });

  // ── §4.3: the config/data split ────────────────────────────────────

  it('takes one series as a flat row and many as rows', () => {
    expect(
      seriesPolys(renderThemed(<RadarChartV4 data={ONE} axes={AXES} />, SEED_LIGHT).root).length
    ).toBe(1);
    expect(
      seriesPolys(renderThemed(<RadarChartV4 data={TWO} axes={AXES} />, SEED_LIGHT).root).length
    ).toBe(2);
  });

  it('names series from the config, and falls back to a positional name', () => {
    const named = renderThemed(
      <RadarChartV4
        data={TWO}
        axes={AXES}
        series={[
          { key: 'a', label: 'This year' },
          { key: 'b', label: 'Last year' },
        ]}
      />,
      SEED_LIGHT
    );
    expect(named.getByText('This year')).toBeTruthy();
    expect(named.getByText('Last year')).toBeTruthy();
    const unnamed = renderThemed(<RadarChartV4 data={TWO} axes={AXES} />, SEED_LIGHT);
    expect(unnamed.getByText('Series 1')).toBeTruthy();
    expect(unnamed.getByText('Series 2')).toBeTruthy();
  });

  // ── §4.2: the figure frame ─────────────────────────────────────────

  it('renders title, summary, caption, axis labels and a legend', () => {
    const { getByText } = renderThemed(
      <RadarChartV4
        data={TWO}
        axes={AXES}
        title="How the two trims compare"
        summary="8.2"
        caption="dealer scores"
      />,
      SEED_LIGHT
    );
    expect(getByText('How the two trims compare')).toBeTruthy();
    expect(getByText('8.2')).toBeTruthy();
    expect(getByText('dealer scores')).toBeTruthy();
    expect(getByText('Comfort')).toBeTruthy();
  });

  it('sets axis labels at the xs step in mutedText, never a fontSize literal', () => {
    const { root } = renderThemed(<RadarChartV4 data={TWO} axes={AXES} />, SEED_LIGHT);
    const label = byTestId(root, 'svg-text')[0] as ReactTestInstance;
    expect(label.props.fill).toBe(theme.light.mutedText);
    expect(label.props.fontSize).toBe(toNativeTokens(theme).typography.scale.xs);
    // The base wrote `fontSize={9}`, which is on no scale in this kit.
    expect(label.props.fontSize).not.toBe(9);
  });

  it('drops the legend at one series and keeps it at two', () => {
    expect(
      renderThemed(<RadarChartV4 data={ONE} axes={AXES} />, SEED_LIGHT).queryByText('Series 1')
    ).toBeNull();
    expect(
      renderThemed(<RadarChartV4 data={TWO} axes={AXES} />, SEED_LIGHT).getByText('Series 1')
    ).toBeTruthy();
  });

  // ── §4.5: empty, single datum, loading ─────────────────────────────

  it('renders the empty state at the plot’s footprint with no data at all', () => {
    const { root, getByText } = renderThemed(<RadarChartV4 size={220} />, SEED_LIGHT);
    expect(getByText('No data')).toBeTruthy();
    const box = root.findAll(
      (n) => typeof n.type === 'string' && n.props?.accessibilityLabel === 'No data'
    )[0] as ReactTestInstance;
    expect((box.props.style as { height: number }).height).toBe(220);
    expect(seriesPolys(root).length).toBe(0);
  });

  it('renders the empty state for rows with no axes in them', () => {
    expect(
      renderThemed(
        <RadarChartV4 data={[[]]} emptyLabel="Nothing scored" />,
        SEED_LIGHT
      ).getByText('Nothing scored')
    ).toBeTruthy();
  });

  it('draws a single series with no NaN in its points', () => {
    const { root } = renderThemed(<RadarChartV4 data={ONE} axes={AXES} />, SEED_LIGHT);
    const poly = seriesPolys(root)[0] as ReactTestInstance;
    expect(poly.props.points as string).not.toContain('NaN');
    expect((poly.props.points as string).split(' ').length).toBe(AXES.length);
  });

  it('survives an all-zero series — a collapsed polygon, not a divide by zero', () => {
    const { root } = renderThemed(<RadarChartV4 data={[0, 0, 0]} />, SEED_LIGHT);
    expect((seriesPolys(root)[0] as ReactTestInstance).props.points as string).not.toContain('NaN');
  });

  it('pads short rows and reads a non-finite value as zero', () => {
    const { root } = renderThemed(
      <RadarChartV4 data={[[5, Number.NaN]]} axes={['A', 'B', 'C']} />,
      SEED_LIGHT
    );
    const poly = seriesPolys(root)[0] as ReactTestInstance;
    expect((poly.props.points as string).split(' ').length).toBe(3);
    expect(poly.props.points as string).not.toContain('NaN');
  });

  it('swaps the plot for a skeleton when loading, keeping the title', () => {
    const { root, getByText } = renderThemed(
      <RadarChartV4 data={TWO} axes={AXES} loading title="Trims" />,
      SEED_LIGHT
    );
    expect(seriesPolys(root).length).toBe(0);
    expect(getByText('Trims')).toBeTruthy();
  });

  // ── §1 rule 6 ──────────────────────────────────────────────────────

  it('states the form, the series count, the axis count and the range', () => {
    expect(spoken(renderThemed(<RadarChartV4 data={TWO} axes={AXES} />, SEED_LIGHT).root)).toBe(
      'Radar chart, 2 series, 5 axes, 0 to 9'
    );
    expect(
      spoken(renderThemed(<RadarChartV4 data={TWO} axes={AXES} max={10} />, SEED_LIGHT).root)
    ).toContain('0 to 10');
    expect(
      spoken(
        renderThemed(
          <RadarChartV4 data={TWO} axes={AXES} accessibilityLabel="Trim comparison" />,
          SEED_LIGHT
        ).root
      )
    ).toBe('Trim comparison');
  });
});

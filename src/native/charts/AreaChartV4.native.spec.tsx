import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { toNativeTokens } from '../../theme/outputs';
import {
  CHART_MARK,
  CHART_OVERFLOW_LABEL,
  CHART_SERIES_COUNT,
  chartSeries,
} from '../../primitives/internal/v4-chart';
import { AreaChartV4, CHART_AREA_FILL_ALPHA } from './AreaChartV4';

/** Every node carrying an `accessibilityLabel`, in tree order. */
function labels(root: ReactTestInstance): string[] {
  return root
    .findAll((n) => typeof n.props?.accessibilityLabel === 'string')
    .map((n) => n.props.accessibilityLabel as string);
}

/** The five derived slots for the light seed. */
function slots(): string[] {
  const tokens = toNativeTokens(compileTheme(SEED_LIGHT));
  return chartSeries(tokens.ramps.primary[500] as string, 'light');
}

describe('AreaChartV4 (native)', () => {
  const light = compileTheme(SEED_LIGHT).light;

  // ── §4.4: the fill is context, the line is the data ─────────────────

  it('fills under the line at one named alpha, and strokes at full strength', () => {
    const { getAllByTestId } = renderThemed(<AreaChartV4 data={[1, 5, 3]} />, SEED_LIGHT);
    const fill = getAllByTestId('chart-area')[0] as ReactTestInstance;
    const line = getAllByTestId('chart-line')[0] as ReactTestInstance;
    expect(fill.props.fill).toBe(slots()[0]);
    expect(fill.props.fillOpacity).toBe(CHART_AREA_FILL_ALPHA);
    expect(line.props.stroke).toBe(slots()[0]);
    expect(line.props.strokeWidth).toBe(CHART_MARK.stroke);
    expect(line.props.fillOpacity).toBeUndefined();
    expect(fill.props.fill).not.toBe(light.primary);
  });

  it('holds the same fill alpha as its web twin — one mark, one number', () => {
    // The defect this replaces was 0.18 on web and 0.2 on native for the same
    // mark. The two constants must not drift again while they live in two
    // files, so both twins' specs pin the same literal until the coordinator
    // promotes the constant into `primitives/internal/v4-chart.ts` — the web
    // spec asserts the fill attribute against its own export, and this pins
    // the number the two agree on.
    expect(CHART_AREA_FILL_ALPHA).toBe(0.18);
  });

  it('takes several series, each on its own slot', () => {
    const { getAllByTestId } = renderThemed(
      <AreaChartV4
        data={[
          [1, 2],
          [3, 4],
        ]}
      />,
      SEED_LIGHT
    );
    const fills = getAllByTestId('chart-area');
    expect(fills.map((f) => f.props.fill)).toEqual([slots()[0], slots()[1]]);
  });

  // ── §5 Group A: stacked bands get CHART_MARK.gap between them ───────

  it('separates stacked bands with a gap of surface — the CVD relief (§1 rule 5)', () => {
    const { getAllByTestId } = renderThemed(
      <AreaChartV4
        stacked
        data={[
          [1, 2],
          [3, 4],
          [5, 6],
        ]}
      />,
      SEED_LIGHT
    );
    const gaps = getAllByTestId('chart-band-gap');
    // One boundary between each adjacent pair, and none above the top band.
    expect(gaps.length).toBe(2);
    expect(gaps[0]?.props.stroke).toBe(light.surface);
    expect(gaps[0]?.props.strokeWidth).toBe(CHART_MARK.gap);
  });

  it('draws no band gaps when the areas are overlaid rather than stacked', () => {
    const { queryAllByTestId } = renderThemed(
      <AreaChartV4
        data={[
          [1, 2],
          [3, 4],
        ]}
      />,
      SEED_LIGHT
    );
    expect(queryAllByTestId('chart-band-gap').length).toBe(0);
  });

  it('stacks cumulatively and reads a stack against zero', () => {
    const { getAllByTestId } = renderThemed(
      <AreaChartV4
        stacked
        data={[
          [2, 2],
          [2, 2],
        ]}
        width={100}
        height={100}
      />,
      SEED_LIGHT
    );
    const lines = getAllByTestId('chart-line');
    expect(lines[0]?.props.points).toBe('0.00,50.00 100.00,50.00');
    expect(lines[1]?.props.points).toBe('0.00,0.00 100.00,0.00');
  });

  it('closes the band path onto the band beneath rather than crossing itself', () => {
    const { getAllByTestId } = renderThemed(
      <AreaChartV4
        stacked
        data={[
          [1, 1],
          [1, 1],
        ]}
      />,
      SEED_LIGHT
    );
    const d = getAllByTestId('chart-area')[1]?.props.d as string;
    expect(d.endsWith('Z')).toBe(true);
    expect(d.split('L').length).toBeGreaterThan(3);
  });

  // ── §4.3: `tone` is the only route to a status hue ──────────────────

  it('paints a toned series from the status token', () => {
    const { getAllByTestId } = renderThemed(
      <AreaChartV4
        data={[[1], [2]]}
        series={[
          { key: 'a', label: 'Under' },
          { key: 'b', label: 'Over budget', tone: 'warn' },
        ]}
      />,
      SEED_LIGHT
    );
    expect(getAllByTestId('chart-area')[1]?.props.fill).toBe(light.warn);
  });

  // ── §4.5: empty, single datum, loading ──────────────────────────────

  it('keeps the footprint when there is no data', () => {
    const { getByText, queryAllByTestId } = renderThemed(
      <AreaChartV4 data={[]} height={180} />,
      SEED_LIGHT
    );
    expect(getByText('No data')).toBeTruthy();
    expect(queryAllByTestId('chart-area').length).toBe(0);
  });

  it('shows the skeleton at the plot’s footprint while loading', () => {
    const { queryAllByTestId, toJSON } = renderThemed(
      <AreaChartV4 data={[1, 2]} loading />,
      SEED_LIGHT
    );
    expect(queryAllByTestId('chart-area').length).toBe(0);
    expect(toJSON()).toBeTruthy();
  });

  it('draws ONE datum with no divide-by-zero anywhere in the path', () => {
    const { getAllByTestId } = renderThemed(
      <AreaChartV4 data={[7]} width={200} height={100} />,
      SEED_LIGHT
    );
    const d = getAllByTestId('chart-area')[0]?.props.d as string;
    expect(d).not.toMatch(/NaN|Infinity/);
    expect(d).toContain('M100.00');
    // The one point still shows as a dot rather than as an invisible polyline.
    expect(getAllByTestId('chart-dot').length).toBe(1);
  });

  it('draws a FLAT series level rather than dividing by zero', () => {
    const { getAllByTestId } = renderThemed(
      <AreaChartV4 data={[3, 3, 3]} width={300} height={100} />,
      SEED_LIGHT
    );
    const points = getAllByTestId('chart-line')[0]?.props.points as string;
    expect(points).not.toMatch(/NaN|Infinity/);
    expect(new Set(points.split(' ').map((p) => p.split(',')[1])).size).toBe(1);
  });

  // ── §1 rule 6 / §4.8 ────────────────────────────────────────────────

  it('derives a sentence, and names the stacked form as stacked', () => {
    const overlaid = renderThemed(<AreaChartV4 title="Traffic" data={[10, 40]} />, SEED_LIGHT);
    expect(labels(overlaid.root)).toContain('Area chart, Traffic, 2 points, 10 to 40');

    const stacked = renderThemed(
      <AreaChartV4
        stacked
        data={[
          [1, 2],
          [3, 4],
        ]}
      />,
      SEED_LIGHT
    );
    expect(labels(stacked.root)).toContain('Stacked area chart, 2 series, 2 points, 1 to 4');
  });

  it('lets the caller override the sentence', () => {
    const { root } = renderThemed(
      <AreaChartV4 data={[1, 2]} accessibilityLabel="Storage used this quarter" />,
      SEED_LIGHT
    );
    expect(labels(root)).toContain('Storage used this quarter');
  });

  // ── §4.6 + rule 10 ──────────────────────────────────────────────────

  it('presses a point to reveal the readout carrying the precise value', () => {
    const { getByTestId, queryByTestId, getByText, getAllByText } = renderThemed(
      <AreaChartV4
        data={[11, 22]}
        labels={['Q1', 'Q2']}
        series={[{ key: 'u', label: 'Users' }]}
        formatValue={(v) => `${v}k`}
      />,
      SEED_LIGHT
    );
    expect(queryByTestId('chart-readout')).toBeNull();
    fireEvent.press(getByTestId('chart-hit-0'));
    expect(getByTestId('chart-readout')).toBeTruthy();
    expect(getByText('11k')).toBeTruthy();
    // Twice: the axis tick under the plot, and the readout's own row header.
    expect(getAllByText('Q1').length).toBe(2);
  });

  it('slops every hit slice out to the 44 floor', () => {
    const { getByTestId } = renderThemed(
      <AreaChartV4 data={[1, 2, 3, 4, 5, 6, 7, 8]} width={320} height={32} />,
      SEED_LIGHT
    );
    const slop = getByTestId('chart-hit-0').props.hitSlop as Record<string, number>;
    expect(slop.top + 32 + slop.bottom).toBeGreaterThanOrEqual(44);
    expect(slop.left + 320 / 8 + slop.right).toBeGreaterThanOrEqual(44);
  });

  it('legends two or more series and stays quiet for one', () => {
    const two = renderThemed(
      <AreaChartV4
        data={[
          [1, 2],
          [3, 4],
        ]}
        series={[
          { key: 'a', label: 'Alpha' },
          { key: 'b', label: 'Beta' },
        ]}
        directLabels={false}
      />,
      SEED_LIGHT
    );
    expect(two.getByText('Alpha')).toBeTruthy();

    const one = renderThemed(
      <AreaChartV4 data={[1, 2]} series={[{ key: 'a', label: 'Alpha' }]} />,
      SEED_LIGHT
    );
    expect(one.queryByText('Alpha')).toBeNull();
  });

  it('paints chrome from the derived neutral, never from `border`', () => {
    const { getAllByTestId } = renderThemed(<AreaChartV4 data={[1, 2, 3]} />, SEED_LIGHT);
    const grid = getAllByTestId('chart-grid')[0] as ReactTestInstance;
    expect(grid.props.stroke).not.toBe(light.border);
    expect(String(grid.props.stroke)).toMatch(/^rgba\(/);
  });

  it('folds past the fifth slot rather than cycling OR throwing (§1 rule 4)', () => {
    // The palette still throws — `chartSlotColor` past slot 5 is a mistake in
    // the caller's own code — but an area chart's series count arrives with the
    // data, so the COMPONENT folds instead of taking the screen down
    // (`foldChartSeries`).
    const six = [[1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7]];
    const { getAllByTestId, getByText } = renderThemed(<AreaChartV4 data={six} />, SEED_LIGHT);

    // Every band still drawn — folding shares a slot, it does not drop data.
    const lines = getAllByTestId('chart-line');
    expect(lines).toHaveLength(six.length);
    // The last two share the last slot rather than reaching for a sixth.
    expect(lines[CHART_SERIES_COUNT]?.props.stroke).toBe(
      lines[CHART_SERIES_COUNT - 1]?.props.stroke
    );
    // ...and the legend carries five rows, the last named "Other".
    expect(getAllByTestId('legend-item')).toHaveLength(CHART_SERIES_COUNT);
    expect(getByText(new RegExp(CHART_OVERFLOW_LABEL))).toBeTruthy();
  });
});

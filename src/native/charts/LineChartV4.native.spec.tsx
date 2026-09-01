import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, SEED_DARK, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { toNativeTokens } from '../../theme/outputs';
import {
  CHART_MARK,
  CHART_OVERFLOW_LABEL,
  CHART_SERIES_COUNT,
} from '../../primitives/internal/v4-chart';
import { chartSeries } from '../../primitives/internal/v4-chart';
import { LineChartV4, thinAxisIndicesV4, toSeriesRowsV4 } from './LineChartV4';

/** Flatten a possibly-nested RN `style` into one object. */
function flat(style: unknown): Record<string, unknown> {
  const merged: Record<string, unknown> = {};
  const walk = (s: unknown): void => {
    if (!s) return;
    if (Array.isArray(s)) {
      s.forEach(walk);
      return;
    }
    if (typeof s === 'object') Object.assign(merged, s as Record<string, unknown>);
  };
  walk(style);
  return merged;
}

/** The figure's root — the node carrying the derived sentence. */
function figure(root: ReactTestInstance, label: string): ReactTestInstance {
  return root.findAll(
    (n) => typeof n.type === 'string' && n.props?.accessibilityLabel === label
  )[0] as ReactTestInstance;
}

/** Every node carrying an `accessibilityLabel`, in tree order. */
function labels(root: ReactTestInstance): string[] {
  return root
    .findAll((n) => typeof n.props?.accessibilityLabel === 'string')
    .map((n) => n.props.accessibilityLabel as string);
}

/** The five derived slots for a seed, in the seed's own scheme. */
function slots(seed: typeof SEED_LIGHT): string[] {
  const tokens = toNativeTokens(compileTheme(seed));
  return chartSeries(tokens.ramps.primary[500] as string, seed.mode === 'dark' ? 'dark' : 'light');
}

describe('LineChartV4 (native)', () => {
  const light = compileTheme(SEED_LIGHT).light;

  // ── §5 Group A: the reason this component exists ────────────────────

  it('takes several series, which the base could not', () => {
    const { getAllByTestId } = renderThemed(
      <LineChartV4
        data={[
          [1, 4, 2],
          [3, 2, 5],
          [2, 6, 1],
        ]}
        series={[
          { key: 'direct', label: 'Direct' },
          { key: 'referral', label: 'Referral' },
          { key: 'organic', label: 'Organic' },
        ]}
      />,
      SEED_LIGHT
    );
    const lines = getAllByTestId('chart-line');
    expect(lines.length).toBe(3);
    // Slots in assignment order, from the derived palette — never `colors[color]`,
    // never a status token standing in for "series 3".
    const expected = slots(SEED_LIGHT);
    expect(lines.map((l) => l.props.stroke)).toEqual([expected[0], expected[1], expected[2]]);
    expect(lines.map((l) => l.props.stroke)).not.toContain(light.primary);
  });

  it('still accepts the base’s single-series shape (§1 rule 8, additive only)', () => {
    expect(toSeriesRowsV4([1, 2, 3])).toEqual([[1, 2, 3]]);
    expect(toSeriesRowsV4([[1, 2], [3, 4]])).toEqual([[1, 2], [3, 4]]);
    expect(toSeriesRowsV4([])).toEqual([]);
    const { getAllByTestId } = renderThemed(<LineChartV4 data={[3, 7, 4]} />, SEED_LIGHT);
    expect(getAllByTestId('chart-line').length).toBe(1);
  });

  it('folds past the fifth slot rather than cycling OR throwing (§1 rule 4)', () => {
    // The palette still throws — `chartSlotColor` past slot 5 is a bug in the
    // caller's code — but a line chart's series count arrives with the data, so
    // the COMPONENT folds instead of taking the screen down (`foldChartSeries`).
    const six = [[1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7]];
    const { getAllByTestId, getByText } = renderThemed(
      <LineChartV4 data={six} />,
      SEED_LIGHT
    );

    // Every line still drawn — folding shares a slot, it does not drop data.
    const lines = getAllByTestId('chart-line');
    expect(lines).toHaveLength(six.length);
    // The last two share the last slot rather than reaching for a sixth.
    expect(lines[CHART_SERIES_COUNT]?.props.stroke).toBe(lines[CHART_SERIES_COUNT - 1]?.props.stroke);
    // ...and the legend carries CHART_SERIES_COUNT rows, the last named "Other".
    expect(getAllByTestId('legend-item')).toHaveLength(CHART_SERIES_COUNT);
    expect(getByText(new RegExp(CHART_OVERFLOW_LABEL))).toBeTruthy();
  });

  // ── §1 rule 1: no literal marks ─────────────────────────────────────

  it('takes its stroke, its dot and its ring from CHART_MARK', () => {
    const { getAllByTestId } = renderThemed(
      <LineChartV4 data={[1, 5, 3]} showDots />,
      SEED_LIGHT
    );
    expect(getAllByTestId('chart-line')[0]?.props.strokeWidth).toBe(CHART_MARK.stroke);
    const dot = getAllByTestId('chart-dot')[0] as ReactTestInstance;
    expect(dot.props.r).toBe(CHART_MARK.dotSize / 2);
    // The ring of surface, so two points on top of each other read as two.
    expect(dot.props.strokeWidth).toBe(CHART_MARK.ring);
    expect(dot.props.stroke).toBe(light.surface);
  });

  it('paints chrome from the derived neutral, never from `muted` or `border`', () => {
    const { getAllByTestId } = renderThemed(<LineChartV4 data={[1, 2, 3]} />, SEED_LIGHT);
    const grid = getAllByTestId('chart-grid')[0] as ReactTestInstance;
    expect(grid.props.strokeWidth).toBe(1);
    expect(grid.props.stroke).not.toBe(light.muted);
    expect(grid.props.stroke).not.toBe(light.border);
    // A mix of onSurface into the page, so it follows the theme with no rule.
    expect(String(grid.props.stroke)).toMatch(/^rgba\(/);
  });

  // ── §5: showDots becomes automatic ──────────────────────────────────

  it('turns dots on below the auto threshold and off above it', () => {
    const few = renderThemed(<LineChartV4 data={[1, 2, 3, 4]} />, SEED_LIGHT);
    expect(few.getAllByTestId('chart-dot').length).toBe(4);

    const many = renderThemed(
      <LineChartV4 data={Array.from({ length: 40 }, (_, i) => i)} />,
      SEED_LIGHT
    );
    expect(many.queryAllByTestId('chart-dot').length).toBe(0);

    const forced = renderThemed(
      <LineChartV4 data={Array.from({ length: 40 }, (_, i) => i)} showDots />,
      SEED_LIGHT
    );
    expect(forced.getAllByTestId('chart-dot').length).toBe(40);
  });

  // ── §4.3: `tone` is the only route to a status hue ──────────────────

  it('paints a toned series from the status token, and only that series', () => {
    const { getAllByTestId } = renderThemed(
      <LineChartV4
        data={[
          [1, 2],
          [3, 4],
        ]}
        series={[
          { key: 'ok', label: 'Delivered' },
          { key: 'bad', label: 'Failed', tone: 'danger' },
        ]}
      />,
      SEED_LIGHT
    );
    const lines = getAllByTestId('chart-line');
    expect(lines[0]?.props.stroke).toBe(slots(SEED_LIGHT)[0]);
    expect(lines[1]?.props.stroke).toBe(light.danger);
  });

  // ── §4.2 / §1 rule 5: the frame and the legend ──────────────────────

  it('renders the figure frame and legends two or more series', () => {
    const { getByText, getAllByText, queryByText } = renderThemed(
      <LineChartV4
        title="Revenue"
        summary="£48,210"
        caption="vs last month"
        data={[
          [1, 2],
          [3, 4],
        ]}
        series={[
          { key: 'a', label: 'Direct' },
          { key: 'b', label: 'Referral' },
        ]}
      />,
      SEED_LIGHT
    );
    expect(getByText('Revenue')).toBeTruthy();
    expect(getByText('£48,210')).toBeTruthy();
    expect(getByText('vs last month')).toBeTruthy();
    // Twice over: the legend row AND the direct label, which is the double
    // secondary encoding §1 rule 5 asks for at four or fewer series.
    expect(getAllByText('Direct').length).toBe(2);
    expect(queryByText('Nothing')).toBeNull();
  });

  it('does not legend a single series, and obeys `legend={false}`', () => {
    const one = renderThemed(
      <LineChartV4 data={[1, 2, 3]} series={[{ key: 'a', label: 'Alpha' }]} />,
      SEED_LIGHT
    );
    expect(one.queryByText('Alpha')).toBeNull();

    const off = renderThemed(
      <LineChartV4
        data={[
          [1, 2],
          [3, 4],
        ]}
        series={[
          { key: 'a', label: 'Alpha' },
          { key: 'b', label: 'Beta' },
        ]}
        legend={false}
        directLabels={false}
      />,
      SEED_LIGHT
    );
    expect(off.queryByText('Alpha')).toBeNull();
  });

  it('direct-labels at four or fewer series and stops above (§4.4)', () => {
    const four = renderThemed(
      <LineChartV4
        data={[[1], [2], [3], [4]]}
        legend={false}
        series={[
          { key: 'a', label: 'Aye' },
          { key: 'b', label: 'Bee' },
          { key: 'c', label: 'Cee' },
          { key: 'd', label: 'Dee' },
        ]}
      />,
      SEED_LIGHT
    );
    expect(four.getByText('Aye')).toBeTruthy();

    const five = renderThemed(
      <LineChartV4
        data={[[1], [2], [3], [4], [5]]}
        legend={false}
        series={[
          { key: 'a', label: 'Aye' },
          { key: 'b', label: 'Bee' },
          { key: 'c', label: 'Cee' },
          { key: 'd', label: 'Dee' },
          { key: 'e', label: 'Eee' },
        ]}
      />,
      SEED_LIGHT
    );
    expect(five.queryByText('Aye')).toBeNull();
  });

  // ── §4.5: empty, single datum, loading ──────────────────────────────

  it('keeps the footprint when there is no data, and never renders null', () => {
    const { root, getByText } = renderThemed(
      <LineChartV4 data={[]} height={200} />,
      SEED_LIGHT
    );
    expect(getByText('No data')).toBeTruthy();
    const empty = figure(root, 'No data');
    expect(flat(empty.props.style).height).toBe(200);
  });

  it('renders a custom empty label', () => {
    const { getByText } = renderThemed(
      <LineChartV4 data={[]} emptyLabel="Nothing yet" />,
      SEED_LIGHT
    );
    expect(getByText('Nothing yet')).toBeTruthy();
  });

  it('shows the skeleton at the plot’s footprint while loading', () => {
    const { queryAllByTestId, toJSON } = renderThemed(
      <LineChartV4 data={[1, 2, 3]} loading height={140} />,
      SEED_LIGHT
    );
    expect(queryAllByTestId('chart-line').length).toBe(0);
    expect(toJSON()).toBeTruthy();
  });

  it('draws ONE datum as a dot at the centre, with no divide-by-zero', () => {
    const { getAllByTestId } = renderThemed(
      <LineChartV4 data={[42]} width={320} height={160} />,
      SEED_LIGHT
    );
    // A one-point polyline paints nothing, so the dot is what carries it.
    const dots = getAllByTestId('chart-dot');
    expect(dots.length).toBe(1);
    expect(dots[0]?.props.cx).toBe(160);
    expect(Number.isFinite(dots[0]?.props.cx)).toBe(true);
    expect(Number.isFinite(dots[0]?.props.cy)).toBe(true);
    expect(getAllByTestId('chart-line')[0]?.props.points).not.toMatch(/NaN|Infinity/);
  });

  it('draws a FLAT series as a level line rather than dividing by zero', () => {
    const { getAllByTestId } = renderThemed(
      <LineChartV4 data={[5, 5, 5]} width={300} height={100} />,
      SEED_LIGHT
    );
    const points = getAllByTestId('chart-line')[0]?.props.points as string;
    expect(points).not.toMatch(/NaN|Infinity/);
    expect(new Set(points.split(' ').map((p) => p.split(',')[1])).size).toBe(1);
  });

  // ── §1 rule 6 / §4.8 ────────────────────────────────────────────────

  it('derives a sentence naming the form, the title, the count and the range', () => {
    const { root } = renderThemed(
      <LineChartV4
        title="Revenue"
        data={[
          [10, 20],
          [5, 40],
        ]}
        formatValue={(v) => `£${v}`}
      />,
      SEED_LIGHT
    );
    expect(labels(root)).toContain('Line chart, Revenue, 2 series, 2 points, £5 to £40');
  });

  it('lets the caller override the sentence, and says “1 point” singular', () => {
    const custom = renderThemed(
      <LineChartV4 data={[1, 2]} accessibilityLabel="Weekly signups, trending up" />,
      SEED_LIGHT
    );
    expect(labels(custom.root)).toContain('Weekly signups, trending up');

    const one = renderThemed(<LineChartV4 data={[7]} />, SEED_LIGHT);
    expect(labels(one.root)).toContain('Line chart, 1 point, 7 to 7');
  });

  // ── §4.6 + rule 10: press, and a 44 hit area over an 8 mark ─────────

  it('presses a point to reveal the readout, and reports it', () => {
    const onPointPress = jest.fn();
    const { getByTestId, queryByTestId, getByText } = renderThemed(
      <LineChartV4
        data={[11, 22, 33]}
        labels={['Jan', 'Feb', 'Mar']}
        series={[{ key: 'r', label: 'Revenue' }]}
        onPointPress={onPointPress}
      />,
      SEED_LIGHT
    );
    expect(queryByTestId('chart-readout')).toBeNull();
    fireEvent.press(getByTestId('chart-hit-1'));
    expect(onPointPress).toHaveBeenCalledWith(1);
    expect(getByTestId('chart-readout')).toBeTruthy();
    expect(getByText('22')).toBeTruthy();
    expect(getByTestId('chart-crosshair')).toBeTruthy();
  });

  it('slops every hit slice out to the 44 floor even in a short plot', () => {
    const { getByTestId } = renderThemed(
      <LineChartV4 data={[1, 2, 3, 4, 5, 6, 7, 8]} width={320} height={32} />,
      SEED_LIGHT
    );
    const slop = getByTestId('chart-hit-0').props.hitSlop as Record<string, number>;
    // 44 - 32 = 12, halved on each edge; 44 - 40 (320/8) = 4, halved.
    expect(slop.top + 32 + slop.bottom).toBeGreaterThanOrEqual(44);
    expect(slop.left + 320 / 8 + slop.right).toBeGreaterThanOrEqual(44);
  });

  it('gives every hit slice a spoken label of its own', () => {
    const { getByTestId } = renderThemed(
      <LineChartV4
        data={[11, 22]}
        labels={['Jan', 'Feb']}
        series={[{ key: 'r', label: 'Revenue' }]}
      />,
      SEED_LIGHT
    );
    expect(getByTestId('chart-hit-0').props.accessibilityLabel).toBe('Jan, Revenue 11');
  });

  it('draws no scrubber at all when `tooltip={false}` and nothing listens', () => {
    const { queryByTestId } = renderThemed(
      <LineChartV4 data={[1, 2, 3]} tooltip={false} />,
      SEED_LIGHT
    );
    expect(queryByTestId('chart-hit-0')).toBeNull();
  });

  // ── the axis, and the dark scheme ───────────────────────────────────

  it('thins axis labels instead of rotating them', () => {
    expect(thinAxisIndicesV4(4)).toEqual([0, 1, 2, 3]);
    expect(thinAxisIndicesV4(11)).toEqual([0, 2, 4, 6, 8, 10]);
    const { queryByText } = renderThemed(
      <LineChartV4
        data={Array.from({ length: 11 }, (_, i) => i)}
        labels={Array.from({ length: 11 }, (_, i) => `M${i}`)}
      />,
      SEED_LIGHT
    );
    expect(queryByText('M0')).toBeTruthy();
    expect(queryByText('M1')).toBeNull();
  });

  it('retunes the palette in dark rather than dimming it', () => {
    const { getAllByTestId } = renderThemed(
      <LineChartV4 data={[[1, 2], [3, 4]]} />,
      SEED_DARK
    );
    const strokes = getAllByTestId('chart-line').map((l) => l.props.stroke);
    expect(strokes).toEqual([slots(SEED_DARK)[0], slots(SEED_DARK)[1]]);
    // The two schemes really do resolve to different values.
    expect(slots(SEED_DARK)[0]).not.toBe(slots(SEED_LIGHT)[0]);
  });
});

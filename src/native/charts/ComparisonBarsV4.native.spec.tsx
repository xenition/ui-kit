import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import {
  CHART_MARK,
  CHART_OVERFLOW_LABEL,
  CHART_SERIES_COUNT,
  chartSeries,
} from '../../primitives/internal/v4-chart';
import { ComparisonBarsV4 } from './ComparisonBarsV4';

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

const theme = compileTheme(SEED_LIGHT);
const SLOTS = chartSeries(theme.ramps.primary[500] as string, 'light');

const DATA = [
  { label: 'Jan', values: [4, 8] },
  { label: 'Feb', values: [6, 3] },
];

const SERIES = [
  { key: 'a', label: 'This year' },
  { key: 'b', label: 'Last year' },
];

describe('ComparisonBarsV4 (native)', () => {
  // ── the palette, not the opacity ladder ────────────────────────────

  it('paints a slot per series, in assignment order, at full strength', () => {
    const { getAllByTestId } = renderThemed(
      <ComparisonBarsV4 data={DATA} series={SERIES} />,
      SEED_LIGHT
    );
    const bars = getAllByTestId('comparison-bar');

    expect(bars).toHaveLength(4);
    expect(flat(bars[0]?.props.style).backgroundColor).toBe(SLOTS[0]);
    expect(flat(bars[1]?.props.style).backgroundColor).toBe(SLOTS[1]);
    // The retired `OPACITY_STEPS = [1, 0.6, 0.35, 0.2]`.
    bars.forEach((bar) => expect(flat(bar.props.style).opacity).toBeUndefined());
  });

  it('folds past the five-slot palette rather than cycling OR throwing', () => {
    // The palette still throws; the COMPONENT folds, because a grouped bar
    // chart's series count arrives with the data (`foldChartSeries`).
    const six = Array.from({ length: 6 }, (_, i) => ({ key: `s${i}`, label: `S${i}` }));
    const { getAllByTestId, getByText } = renderThemed(
      <ComparisonBarsV4 data={[{ label: 'One', values: [1, 2, 3, 4, 5, 6] }]} series={six} />,
      SEED_LIGHT
    );

    // Every bar still drawn — folding shares a slot, it does not drop data.
    const all = getAllByTestId('comparison-bar');
    expect(all).toHaveLength(6);
    // The sixth shares the fifth's slot rather than reaching for a sixth.
    expect(flat(all[CHART_SERIES_COUNT]?.props.style).backgroundColor).toBe(
      flat(all[CHART_SERIES_COUNT - 1]?.props.style).backgroundColor
    );
    // ...and the legend carries five rows, the last named "Other".
    expect(getAllByTestId('legend-item')).toHaveLength(CHART_SERIES_COUNT);
    expect(getByText(new RegExp(CHART_OVERFLOW_LABEL))).toBeTruthy();
  });

  it('paints a status hue only for a series that opted in with `tone`', () => {
    const { getAllByTestId } = renderThemed(
      <ComparisonBarsV4
        data={[{ label: 'Jan', values: [4] }]}
        series={[{ key: 'e', label: 'Errors', tone: 'warn' }]}
      />,
      SEED_LIGHT
    );

    expect(flat(getAllByTestId('comparison-bar')[0]?.props.style).backgroundColor).toBe(
      theme.light.warn
    );
  });

  // ── marks and gaps ─────────────────────────────────────────────────

  it('rounds the data end only, so the bar sits on its baseline', () => {
    const { getAllByTestId } = renderThemed(
      <ComparisonBarsV4 data={DATA} series={SERIES} />,
      SEED_LIGHT
    );
    const bar = flat(getAllByTestId('comparison-bar')[0]?.props.style);

    expect(bar.borderTopLeftRadius).toBe(CHART_MARK.endRadius);
    expect(bar.borderTopRightRadius).toBe(CHART_MARK.endRadius);
    expect(bar.borderBottomLeftRadius).toBeUndefined();
    expect(bar.borderBottomRightRadius).toBeUndefined();
  });

  it('scales bars against the ceiling and floors a zero at a hairline', () => {
    const { getAllByTestId } = renderThemed(
      <ComparisonBarsV4
        data={[{ label: 'Jan', values: [8, 0] }]}
        series={SERIES}
        max={8}
        height={100}
      />,
      SEED_LIGHT
    );
    const bars = getAllByTestId('comparison-bar');

    expect(flat(bars[0]?.props.style).height).toBe(100);
    expect(flat(bars[1]?.props.style).height).toBe(1);
  });

  it('separates bars in a group by CHART_MARK.gap and groups by a spacing step', () => {
    const { UNSAFE_root } = renderThemed(
      <ComparisonBarsV4 data={DATA} series={SERIES} />,
      SEED_LIGHT
    );
    const inGroup = UNSAFE_root.findAll(
      (n) => typeof n.type === 'string' && flat(n.props.style).gap === CHART_MARK.gap
    );
    const betweenGroups = UNSAFE_root.findAll(
      (n) => typeof n.type === 'string' && flat(n.props.style).gap === theme.spacing.md
    );

    expect(inGroup.length).toBeGreaterThanOrEqual(DATA.length);
    expect(betweenGroups.length).toBeGreaterThanOrEqual(1);
  });

  it('paints the baseline from the axis colour, never from `muted`', () => {
    const { getByTestId } = renderThemed(
      <ComparisonBarsV4 data={DATA} series={SERIES} />,
      SEED_LIGHT
    );
    const baseline = flat(getByTestId('comparison-baseline').props.style);

    expect(baseline.height).toBe(CHART_MARK.stroke);
    expect(baseline.backgroundColor).not.toBe(theme.light.muted);
  });

  // ── new props ──────────────────────────────────────────────────────

  it('direct-labels the values at four groups or fewer', () => {
    const { getByText } = renderThemed(
      <ComparisonBarsV4 data={DATA} series={SERIES} />,
      SEED_LIGHT
    );
    expect(getByText('8')).toBeTruthy();
  });

  it('ships a legend at two or more series and none at one', () => {
    expect(
      renderThemed(<ComparisonBarsV4 data={DATA} series={SERIES} />, SEED_LIGHT).queryByTestId(
        'legend'
      )
    ).not.toBeNull();
    expect(
      renderThemed(
        <ComparisonBarsV4 data={[{ label: 'Jan', values: [1] }]} series={[SERIES[0]!]} />,
        SEED_LIGHT
      ).queryByTestId('legend')
    ).toBeNull();
  });

  it('reports a pressed bar with its group and series', () => {
    const onBarSelect = jest.fn();
    const { getAllByTestId } = renderThemed(
      <ComparisonBarsV4 data={DATA} series={SERIES} onBarSelect={onBarSelect} />,
      SEED_LIGHT
    );

    fireEvent.press(getAllByTestId('comparison-bar')[1] as ReactTestInstance);
    expect(onBarSelect).toHaveBeenCalledWith(0, 1, 8);
  });

  it('renders the header, summary and caption', () => {
    const { getByText } = renderThemed(
      <ComparisonBarsV4
        data={DATA}
        series={SERIES}
        title="Revenue by month"
        summary="£48,210"
        caption="vs last year"
      />,
      SEED_LIGHT
    );

    expect(getByText('Revenue by month')).toBeTruthy();
    expect(getByText('£48,210')).toBeTruthy();
    expect(getByText('vs last year')).toBeTruthy();
  });

  it('shows the loading placeholder instead of the bars', () => {
    const { queryAllByTestId } = renderThemed(
      <ComparisonBarsV4 data={DATA} series={SERIES} loading />,
      SEED_LIGHT
    );
    expect(queryAllByTestId('comparison-bar')).toHaveLength(0);
  });

  // ── empty and single-datum ─────────────────────────────────────────

  it('renders the empty state rather than nothing', () => {
    const { queryAllByTestId, getByText } = renderThemed(
      <ComparisonBarsV4 data={[]} emptyLabel="No months" />,
      SEED_LIGHT
    );

    expect(queryAllByTestId('comparison-bar')).toHaveLength(0);
    expect(getByText('No months')).toBeTruthy();
  });

  it('renders one group with one bar', () => {
    const { getAllByTestId, getByText } = renderThemed(
      <ComparisonBarsV4 data={[{ label: 'Jan', values: [4] }]} series={[SERIES[0]!]} />,
      SEED_LIGHT
    );

    expect(getAllByTestId('comparison-bar')).toHaveLength(1);
    expect(getByText('Jan')).toBeTruthy();
  });

  // ── the accessible label ───────────────────────────────────────────

  it('derives a sentence naming the counts and the range', () => {
    const { getByLabelText } = renderThemed(
      <ComparisonBarsV4 data={DATA} series={SERIES} title="Revenue" />,
      SEED_LIGHT
    );

    expect(getByLabelText('Grouped bar chart, Revenue, 2 groups, 2 series, 3 to 8.')).toBeTruthy();
  });

  it('lets a caller override the derived sentence', () => {
    const { getByLabelText } = renderThemed(
      <ComparisonBarsV4 data={DATA} series={SERIES} accessibilityLabel="Year on year" />,
      SEED_LIGHT
    );
    expect(getByLabelText('Year on year')).toBeTruthy();
  });
});

import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import {
  CHART_MARK,
  CHART_OVERFLOW_LABEL,
  CHART_SCATTER_SERIES_CAP,
  chartSeries,
} from '../../primitives/internal/v4-chart';
import { ScatterChartV4, type ScatterSeriesV4 } from './ScatterChartV4';

const theme = compileTheme(SEED_LIGHT);
const SLOTS = chartSeries(theme.ramps.primary[500] as string, 'light');

const POINTS = [
  { x: 0, y: 1 },
  { x: 2, y: 5 },
  { x: 4, y: 3 },
];

const seriesOf = (count: number): ScatterSeriesV4[] =>
  Array.from({ length: count }, (_, i) => ({
    key: `s${i}`,
    label: `Series ${i + 1}`,
    points: POINTS,
  }));

describe('ScatterChartV4 (native)', () => {
  // ── the cap ────────────────────────────────────────────────────────

  it('renders up to the scatter cap', () => {
    const { getAllByTestId } = renderThemed(
      <ScatterChartV4 series={seriesOf(CHART_SCATTER_SERIES_CAP)} />,
      SEED_LIGHT
    );

    expect(getAllByTestId('scatter-point')).toHaveLength(
      CHART_SCATTER_SERIES_CAP * POINTS.length
    );
  });

  it('folds past CHART_SCATTER_SERIES_CAP rather than reaching for a fourth slot', () => {
    // The palette still throws past its last slot; the COMPONENT folds, because
    // a scatter's series count arrives with the data and a `RangeError` out of
    // render would take the screen down (`foldChartSeries`).
    const { getAllByTestId, getByText } = renderThemed(
      <ScatterChartV4 series={seriesOf(CHART_SCATTER_SERIES_CAP + 1)} />,
      SEED_LIGHT
    );

    // Every point still drawn — folding is a union, not a drop.
    expect(getAllByTestId('scatter-point')).toHaveLength(
      (CHART_SCATTER_SERIES_CAP + 1) * POINTS.length
    );
    // ...but only `cap` legend rows, the last of which is the folded tail.
    expect(getAllByTestId('legend-item')).toHaveLength(CHART_SCATTER_SERIES_CAP);
    expect(getByText(CHART_OVERFLOW_LABEL)).toBeTruthy();
  });

  // ── marks ──────────────────────────────────────────────────────────

  it('paints each series from its slot and rings every point with surface', () => {
    const { getAllByTestId } = renderThemed(<ScatterChartV4 series={seriesOf(2)} />, SEED_LIGHT);
    const dots = getAllByTestId('scatter-point');

    expect(dots[0]?.props.fill).toBe(SLOTS[0]);
    expect(dots[POINTS.length]?.props.fill).toBe(SLOTS[1]);
    dots.forEach((dot) => {
      expect(dot.props.r).toBe(CHART_MARK.dotSize / 2);
      expect(dot.props.stroke).toBe(theme.light.surface);
      expect(dot.props.strokeWidth).toBe(CHART_MARK.ring);
      // The retired `fillOpacity={0.85}`: two overlapping translucent dots make
      // a third colour that is in neither series' key.
      expect(dot.props.fillOpacity).toBeUndefined();
    });
  });

  it('paints a status hue only for a series that opted in with `tone`', () => {
    const { getAllByTestId } = renderThemed(
      <ScatterChartV4 series={[{ key: 'e', label: 'Errors', points: POINTS, tone: 'danger' }]} />,
      SEED_LIGHT
    );

    expect(getAllByTestId('scatter-point')[0]?.props.fill).toBe(theme.light.danger);
  });

  it('never paints an axis with the `border` hairline token', () => {
    const { UNSAFE_root } = renderThemed(<ScatterChartV4 data={POINTS} />, SEED_LIGHT);
    const strokes = UNSAFE_root
      .findAll((n) => typeof n.type === 'string' && typeof n.props?.stroke === 'string')
      .map((n) => n.props.stroke as string);

    expect(strokes).not.toContain(theme.light.border);
    // The axis is one step more present than the grid behind it.
    expect(new Set(strokes).size).toBeGreaterThanOrEqual(2);
  });

  // ── new props ──────────────────────────────────────────────────────

  it('takes the `data` short form on both twins', () => {
    const { getAllByTestId } = renderThemed(<ScatterChartV4 data={POINTS} />, SEED_LIGHT);
    expect(getAllByTestId('scatter-point')).toHaveLength(POINTS.length);
  });

  it('ships a legend at two or more series and none at one', () => {
    expect(
      renderThemed(<ScatterChartV4 series={seriesOf(2)} />, SEED_LIGHT).queryByTestId('legend')
    ).not.toBeNull();
    expect(
      renderThemed(<ScatterChartV4 data={POINTS} />, SEED_LIGHT).queryByTestId('legend')
    ).toBeNull();
  });

  it('gives every point 44 of hit area once it is selectable (rule 10)', () => {
    const onPointSelect = jest.fn();
    const { getAllByTestId } = renderThemed(
      <ScatterChartV4 data={POINTS} onPointSelect={onPointSelect} />,
      SEED_LIGHT
    );
    const dots = getAllByTestId('scatter-point');
    // 8 painted + 18 of slop on each side = 44, the kit's one composed 44.
    const slop = (theme.spacing['2xl'] - theme.spacing.xs - CHART_MARK.dotSize) / 2;

    dots.forEach((dot) => {
      expect(dot.props.hitSlop).toEqual({ top: slop, bottom: slop, left: slop, right: slop });
      expect(CHART_MARK.dotSize + slop * 2).toBe(44);
    });
    fireEvent.press(dots[1] as ReactTestInstance);
    expect(onPointSelect).toHaveBeenCalledWith(POINTS[1], 0, 1);
  });

  it('renders the header, summary and caption', () => {
    const { getByText } = renderThemed(
      <ScatterChartV4 data={POINTS} title="Spend vs revenue" summary="£48,210" caption="Q3" />,
      SEED_LIGHT
    );

    expect(getByText('Spend vs revenue')).toBeTruthy();
    expect(getByText('£48,210')).toBeTruthy();
    expect(getByText('Q3')).toBeTruthy();
  });

  it('shows the loading placeholder instead of the marks', () => {
    const { queryAllByTestId } = renderThemed(
      <ScatterChartV4 data={POINTS} loading />,
      SEED_LIGHT
    );
    expect(queryAllByTestId('scatter-point')).toHaveLength(0);
  });

  // ── empty and single-datum ─────────────────────────────────────────

  it('renders the empty state, keeping the footprint', () => {
    const { queryAllByTestId, getByText } = renderThemed(
      <ScatterChartV4 data={[]} emptyLabel="No sessions" />,
      SEED_LIGHT
    );

    expect(queryAllByTestId('scatter-point')).toHaveLength(0);
    expect(getByText('No sessions')).toBeTruthy();
  });

  it('centres a single point instead of dividing by a zero span', () => {
    const { getAllByTestId } = renderThemed(
      <ScatterChartV4 data={[{ x: 5, y: 5 }]} width={300} height={200} />,
      SEED_LIGHT
    );
    const dot = getAllByTestId('scatter-point')[0] as ReactTestInstance;

    expect(Number.isFinite(dot.props.cx)).toBe(true);
    expect(Number.isFinite(dot.props.cy)).toBe(true);
    expect(dot.props.cx).toBeCloseTo(150, 5);
    expect(dot.props.cy).toBeCloseTo(100, 5);
  });

  // ── the accessible label ───────────────────────────────────────────

  it('derives a sentence naming the form, the counts and both ranges', () => {
    const { getByLabelText } = renderThemed(
      <ScatterChartV4 data={POINTS} title="Spend vs revenue" />,
      SEED_LIGHT
    );

    expect(
      getByLabelText('Scatter plot, Spend vs revenue, 1 series, 3 points, x 0 to 4, y 1 to 5.')
    ).toBeTruthy();
  });

  it('lets a caller override the derived sentence', () => {
    const { getByLabelText } = renderThemed(
      <ScatterChartV4 data={POINTS} accessibilityLabel="Cost per acquisition" />,
      SEED_LIGHT
    );
    expect(getByLabelText('Cost per acquisition')).toBeTruthy();
  });
});

import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_DARK, SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { CHART_MARK, chartSequential } from '../../primitives/internal/v4-chart';
import { HEATMAP_V4_TAP_MIN, HeatmapV4 } from './HeatmapV4';

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

const light = compileTheme(SEED_LIGHT);
const dark = compileTheme(SEED_DARK);

const GRID = [
  [0, 1, 2],
  [3, 4, 5],
];

const fillsOf = (cells: ReactTestInstance[]): string[] =>
  cells.map((c) => flat(c.props.style).backgroundColor as string);

describe('HeatmapV4 (native)', () => {
  // ── the sequential ramp replaces the opacity ramp ──────────────────

  it('paints every cell from the sequential ramp, never from `opacity`', () => {
    const { getAllByTestId } = renderThemed(<HeatmapV4 data={GRID} />, SEED_LIGHT);
    const cells = getAllByTestId('heatmap-cell');

    expect(cells).toHaveLength(6);
    cells.forEach((cell) => {
      // The retired `opacity: 0.08 + intensity * 0.92`.
      expect(flat(cell.props.style).opacity).toBeUndefined();
      expect(String(flat(cell.props.style).backgroundColor)).toMatch(/^#[0-9a-f]{6}$/i);
    });
  });

  it('maps the floor and the ceiling onto the ramp’s two ends', () => {
    const brand = light.ramps.primary[500] as string;
    const { getAllByTestId } = renderThemed(<HeatmapV4 data={[[0, 5]]} />, SEED_LIGHT);

    expect(fillsOf(getAllByTestId('heatmap-cell'))).toEqual([
      chartSequential(brand, 0, 'light'),
      chartSequential(brand, 1, 'light'),
    ]);
  });

  it('quantises into nine buckets so both twins band identically', () => {
    const brand = light.ramps.primary[500] as string;
    // 3 of 8 is 0.375, which lands on bucket 3 of 8 -> t = 0.375 exactly.
    const { getAllByTestId } = renderThemed(<HeatmapV4 data={[[3]]} max={8} />, SEED_LIGHT);

    expect(fillsOf(getAllByTestId('heatmap-cell'))[0]).toBe(
      chartSequential(brand, 3 / 8, 'light')
    );
  });

  it('flips direction with the scheme, as Carbon requires', () => {
    const brandDark = dark.ramps.primary[500] as string;
    const { getAllByTestId } = renderThemed(<HeatmapV4 data={[[0, 5]]} />, SEED_DARK);

    expect(fillsOf(getAllByTestId('heatmap-cell'))).toEqual([
      chartSequential(brandDark, 0, 'dark'),
      chartSequential(brandDark, 1, 'dark'),
    ]);
  });

  it('takes the top bucket rather than dividing by zero on a flat grid', () => {
    const brand = light.ramps.primary[500] as string;
    const { getAllByTestId } = renderThemed(
      <HeatmapV4 data={[[4, 4]]} min={4} max={4} />,
      SEED_LIGHT
    );

    fillsOf(getAllByTestId('heatmap-cell')).forEach((fill) =>
      expect(fill).toBe(chartSequential(brand, 1, 'light'))
    );
  });

  it('rounds the cell from `radius.sm`, never from an `rx` literal', () => {
    const { getAllByTestId } = renderThemed(<HeatmapV4 data={GRID} />, SEED_LIGHT);

    expect(flat(getAllByTestId('heatmap-cell')[0]?.props.style).borderRadius).toBe(
      light.radius.sm
    );
  });

  // ── new props ──────────────────────────────────────────────────────

  it('ships the ramp key by default and drops it on request', () => {
    const { queryByTestId } = renderThemed(<HeatmapV4 data={GRID} />, SEED_LIGHT);
    expect(queryByTestId('heatmap-key')).not.toBeNull();

    const bare = renderThemed(<HeatmapV4 data={GRID} legend={false} />, SEED_LIGHT);
    expect(bare.queryByTestId('heatmap-key')).toBeNull();
  });

  it('draws row and column labels — the direct-label channel', () => {
    const { getByText } = renderThemed(
      <HeatmapV4 data={GRID} rowLabels={['Mon', 'Tue']} columnLabels={['A', 'B', 'C']} />,
      SEED_LIGHT
    );

    expect(getByText('Mon')).toBeTruthy();
    expect(getByText('C')).toBeTruthy();
  });

  it('renders the header and the caption', () => {
    const { getByText } = renderThemed(
      <HeatmapV4 data={GRID} title="Busiest hours" caption="Last 4 weeks" />,
      SEED_LIGHT
    );

    expect(getByText('Busiest hours')).toBeTruthy();
    expect(getByText('Last 4 weeks')).toBeTruthy();
  });

  it('shows the loading placeholder instead of the grid', () => {
    const { queryAllByTestId } = renderThemed(<HeatmapV4 data={GRID} loading />, SEED_LIGHT);
    expect(queryAllByTestId('heatmap-cell')).toHaveLength(0);
  });

  // ── the tap floor and the exception ────────────────────────────────

  it('leaves a non-interactive cell at its given size — no target, no floor', () => {
    const { getAllByTestId } = renderThemed(<HeatmapV4 data={GRID} cellSize={12} />, SEED_LIGHT);

    expect(flat(getAllByTestId('heatmap-cell')[0]?.props.style).width).toBe(12);
  });

  it('floors an interactive cell at HIG’s absolute 28, the documented exception', () => {
    const onCellSelect = jest.fn();
    const { getAllByTestId } = renderThemed(
      <HeatmapV4
        data={GRID}
        cellSize={12}
        rowLabels={['Mon', 'Tue']}
        columnLabels={['A', 'B', 'C']}
        onCellSelect={onCellSelect}
      />,
      SEED_LIGHT
    );
    const cells = getAllByTestId('heatmap-cell');

    expect(flat(cells[0]?.props.style).width).toBe(HEATMAP_V4_TAP_MIN);
    // The cell speaks its own value, so the fill never has to carry it.
    expect(cells[1]?.props.accessibilityLabel).toBe('Mon · B: 1');
    fireEvent.press(cells[1] as ReactTestInstance);
    expect(onCellSelect).toHaveBeenCalledWith(
      expect.objectContaining({ row: 0, column: 1, value: 1 })
    );
  });

  it('separates cells by CHART_MARK.gap, not by a bare number', () => {
    const { UNSAFE_root } = renderThemed(<HeatmapV4 data={GRID} />, SEED_LIGHT);
    const rows = UNSAFE_root.findAll(
      (n) =>
        typeof n.type === 'string' &&
        flat(n.props.style).flexDirection === 'row' &&
        flat(n.props.style).gap === CHART_MARK.gap
    );

    // One per grid row, and never the bare `gap: 2` the base carried.
    expect(rows.length).toBeGreaterThanOrEqual(GRID.length);
  });

  // ── empty and single-datum ─────────────────────────────────────────

  it('renders the empty state rather than nothing, for no rows', () => {
    const { queryAllByTestId, getByText } = renderThemed(<HeatmapV4 data={[]} />, SEED_LIGHT);

    expect(queryAllByTestId('heatmap-cell')).toHaveLength(0);
    expect(getByText('No data')).toBeTruthy();
  });

  it('renders the empty state for a grid of empty rows', () => {
    const { getByText } = renderThemed(
      <HeatmapV4 data={[[], []]} emptyLabel="Nothing yet" />,
      SEED_LIGHT
    );
    expect(getByText('Nothing yet')).toBeTruthy();
  });

  it('renders a single cell', () => {
    const { getAllByTestId } = renderThemed(<HeatmapV4 data={[[3]]} />, SEED_LIGHT);
    expect(getAllByTestId('heatmap-cell')).toHaveLength(1);
  });

  // ── the accessible label ───────────────────────────────────────────

  it('derives a sentence naming the shape and the range', () => {
    const { getByLabelText } = renderThemed(<HeatmapV4 data={GRID} />, SEED_LIGHT);
    expect(getByLabelText('Heatmap, 2 by 3 grid, 0 to 5.')).toBeTruthy();
  });

  it('lets a caller override the derived sentence', () => {
    const { getByLabelText } = renderThemed(
      <HeatmapV4 data={GRID} accessibilityLabel="Sign-ins per hour" />,
      SEED_LIGHT
    );
    expect(getByLabelText('Sign-ins per hour')).toBeTruthy();
  });
});

import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { compileTheme } from '../../theme/compile';
import {
  CHART_AXIS_MIX,
  CHART_GRID_MIX,
  CHART_MARK,
  chartSeries,
} from '../../primitives/internal/v4-chart';
import { withAlpha } from '../primitives/internal/color';
import { minTap } from '../primitives/internal/nav-v4';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { ColumnChartV4 } from './ColumnChartV4';

const theme = compileTheme(SEED_LIGHT);
const SLOTS = chartSeries(theme.ramps.primary[500], 'light');

const DATA = [
  { label: 'Alpha', value: 12 },
  { label: 'Beta', value: 30 },
];

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

/**
 * Every node carrying a `testID`, found through the tree.
 *
 * `getAllByTestId` skips anything marked `accessibilityElementsHidden`, and
 * every mark here is exactly that — decorative to a screen reader, because the
 * figure states its value in one sentence on the root (rule 6).
 */
function marks(root: ReactTestInstance, id: string): ReactTestInstance[] {
  return root.findAll((n) => typeof n.type === 'string' && n.props?.testID === id);
}

/** The rendered string of a `Text` node found by testID. */
function textOf(node: ReactTestInstance): string {
  return String(node.props.children);
}

/** Every style value in the tree, as strings — the divide-by-zero net. */
function styleValues(root: ReactTestInstance): string[] {
  const out: string[] = [];
  root.findAll(() => true).forEach((node) => {
    Object.values(flat(node.props?.style)).forEach((v) => {
      if (typeof v === 'string' || typeof v === 'number') out.push(String(v));
    });
  });
  return out;
}

function figureLabel(root: ReactTestInstance): string {
  const figure = root.findAll(
    (n) => typeof n.type === 'string' && n.props?.accessibilityRole === 'image'
  )[0] as ReactTestInstance;
  return figure.props.accessibilityLabel as string;
}

describe('ColumnChartV4 (native)', () => {
  // ── §4.1: one colour, never by value ───────────────────────────────

  it('paints every bar slot 1 — a single series is one colour', () => {
    const { root } = renderThemed(<ColumnChartV4 data={DATA} />, SEED_LIGHT);
    const bars = marks(root, 'xen-v4-bar');
    expect(bars).toHaveLength(2);
    bars.forEach((bar) => expect(flat(bar.props.style).backgroundColor).toBe(SLOTS[0]));
  });

  it('`tone` is the only route to a status hue, and it replaces the slot', () => {
    const { root } = renderThemed(<ColumnChartV4 data={DATA} tone="warn" />, SEED_LIGHT);
    marks(root, 'xen-v4-bar').forEach((bar) =>
      expect(flat(bar.props.style).backgroundColor).toBe(theme.light.warn)
    );
  });

  // ── §3.3: three chrome roles, kept apart ───────────────────────────

  it('takes the track from the grid neutral and the baseline from the axis neutral', () => {
    const { root } = renderThemed(<ColumnChartV4 data={DATA} />, SEED_LIGHT);
    const track = flat((marks(root, 'xen-v4-chart-track')[0] as ReactTestInstance).props.style);
    const axis = flat((marks(root, 'xen-v4-chart-axis')[0] as ReactTestInstance).props.style);

    expect(track.backgroundColor).toBe(withAlpha(theme.light.onSurface, CHART_GRID_MIX));
    expect(axis.backgroundColor).toBe(withAlpha(theme.light.onSurface, CHART_AXIS_MIX));
    // The base painted the track `colors.border` and drew no axis at all.
    expect(track.backgroundColor).not.toBe(theme.light.border);
    expect(axis.width).toBe(1);
  });

  // ── §4.4: mark geometry ────────────────────────────────────────────

  it('rounds the data end only — the baseline end stays square', () => {
    const { root } = renderThemed(<ColumnChartV4 data={DATA} />, SEED_LIGHT);
    const bar = flat((marks(root, 'xen-v4-bar')[0] as ReactTestInstance).props.style);
    expect(bar.borderTopRightRadius).toBe(CHART_MARK.endRadius);
    expect(bar.borderBottomRightRadius).toBe(CHART_MARK.endRadius);
    expect(bar.borderTopLeftRadius).toBeUndefined();
    expect(bar.borderBottomLeftRadius).toBeUndefined();
    // And not `radius.full`, which the base used and which a `sharp` seed
    // compiles to 0.
    expect(bar.borderTopRightRadius).not.toBe(theme.radius.full);
  });

  it('sizes the track from `barHeight`', () => {
    const { root } = renderThemed(<ColumnChartV4 data={DATA} barHeight={20} />, SEED_LIGHT);
    expect(flat((marks(root, 'xen-v4-chart-track')[0] as ReactTestInstance).props.style).height).toBe(
      20
    );
  });

  // ── rule 10: a row is a real target ────────────────────────────────

  it('gives every row the 44 tap floor', () => {
    const { root } = renderThemed(<ColumnChartV4 data={DATA} />, SEED_LIGHT);
    marks(root, 'xen-v4-bar-hit').forEach((row) =>
      expect(flat(row.props.style).minHeight).toBe(minTap(theme.spacing))
    );
  });

  // ── §4.2: the figure frame ─────────────────────────────────────────

  it('renders the title, summary and caption slots', () => {
    const { getByText } = renderThemed(
      <ColumnChartV4 data={DATA} title="Channels" summary="42" caption="last 30 days" />,
      SEED_LIGHT
    );
    expect(getByText('Channels')).toBeTruthy();
    expect(getByText('42')).toBeTruthy();
    expect(getByText('last 30 days')).toBeTruthy();
  });

  // ── §4.4: direct labels default ON, unlike the base ────────────────

  it('direct-labels at four rows or fewer, and stops above that', () => {
    const rows = (n: number): { label: string; value: number }[] =>
      Array.from({ length: n }, (_, i) => ({ label: `r${i}`, value: i + 1 }));

    const four = renderThemed(<ColumnChartV4 data={rows(4)} />, SEED_LIGHT);
    expect(marks(four.root, 'xen-v4-chart-value').map(textOf)).toEqual(['1', '2', '3', '4']);

    const five = renderThemed(<ColumnChartV4 data={rows(5)} />, SEED_LIGHT);
    expect(marks(five.root, 'xen-v4-chart-value')).toHaveLength(0);
  });

  it('`showValues` and `format` steer the label', () => {
    const { root } = renderThemed(
      <ColumnChartV4 data={DATA} showValues format={(v) => `£${v}`} />,
      SEED_LIGHT
    );
    expect(marks(root, 'xen-v4-chart-value').map(textOf)).toEqual(['£12', '£30']);
  });

  // ── §4.5: empty, single datum, loading ─────────────────────────────

  it('renders the empty state at the footprint, never nothing', () => {
    const { root, getByText } = renderThemed(
      <ColumnChartV4 data={[]} height={160} />,
      SEED_LIGHT
    );
    expect(marks(root, 'xen-v4-bar')).toHaveLength(0);
    expect(getByText('No data')).toBeTruthy();
    const heights = root
      .findAll((n) => typeof n.type === 'string')
      .map((n) => flat(n.props?.style).height);
    expect(heights).toContain(160);
  });

  it('renders one row for one datum and never divides by zero', () => {
    const { root } = renderThemed(
      <ColumnChartV4 data={[{ label: 'Only', value: 9 }]} />,
      SEED_LIGHT
    );
    const bars = marks(root, 'xen-v4-bar');
    expect(bars).toHaveLength(1);
    expect(flat((bars[0] as ReactTestInstance).props.style).width).toBe('100%');
    styleValues(root).forEach((v) => {
      expect(v).not.toContain('NaN');
      expect(v).not.toContain('Infinity');
    });
  });

  it('survives an all-zero series and keeps every bar visible', () => {
    const { root } = renderThemed(
      <ColumnChartV4
        data={[
          { label: 'a', value: 0 },
          { label: 'b', value: 0 },
        ]}
      />,
      SEED_LIGHT
    );
    styleValues(root).forEach((v) => expect(v).not.toContain('NaN'));
    marks(root, 'xen-v4-bar').forEach((bar) => {
      expect(flat(bar.props.style).width).toBe('0%');
      expect(flat(bar.props.style).minWidth).toBe(1);
    });
  });

  it('holds the footprint with a skeleton while loading', () => {
    const { root } = renderThemed(<ColumnChartV4 data={DATA} loading />, SEED_LIGHT);
    expect(marks(root, 'xen-v4-bar')).toHaveLength(0);
  });

  // ── §4.8: the accessible sentence ──────────────────────────────────

  it('derives a sentence naming the form, the headline, the count and the range', () => {
    const { root } = renderThemed(<ColumnChartV4 data={DATA} title="Channels" />, SEED_LIGHT);
    expect(figureLabel(root)).toBe('Bar chart, Channels, 2 bars, 12 to 30');
  });

  it('singularises at one datum', () => {
    const { root } = renderThemed(
      <ColumnChartV4 data={[{ label: 'Only', value: 9 }]} />,
      SEED_LIGHT
    );
    expect(figureLabel(root)).toBe('Bar chart, 1 bar, 9');
  });

  it('lets the caller override the sentence', () => {
    const { root } = renderThemed(
      <ColumnChartV4 data={DATA} accessibilityLabel="Beta leads" />,
      SEED_LIGHT
    );
    expect(figureLabel(root)).toBe('Beta leads');
  });

  // ── §4.6: press is native's hover ──────────────────────────────────

  it('reveals a pressed row’s value even when the labels are off', () => {
    const onSelect = jest.fn();
    const { root } = renderThemed(
      <ColumnChartV4 data={DATA} showValues={false} onSelect={onSelect} />,
      SEED_LIGHT
    );
    expect(marks(root, 'xen-v4-chart-value')).toHaveLength(0);

    fireEvent.press(marks(root, 'xen-v4-bar-hit')[1] as ReactTestInstance);
    expect(onSelect).toHaveBeenCalledWith(1, 30);
    expect(marks(root, 'xen-v4-chart-value').map(textOf)).toEqual(['30']);
  });

  // ── §4.7: motion ───────────────────────────────────────────────────

  it('resolves the reveal to fully visible when it is turned off', () => {
    const { root } = renderThemed(<ColumnChartV4 data={DATA} animate={false} />, SEED_LIGHT);
    const plot = marks(root, 'xen-v4-chart-plot')[0] as ReactTestInstance;
    const opacity = flat(plot.props.style).opacity as number | { __getValue?: () => number };
    expect(typeof opacity === 'number' ? opacity : opacity?.__getValue?.()).toBe(1);
  });
});

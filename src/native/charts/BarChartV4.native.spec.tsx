import '../spec-support/real-animations';
import * as React from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { compileTheme } from '../../theme/compile';
import { CHART_AXIS_MIX, CHART_MARK, chartSeries } from '../../primitives/internal/v4-chart';
import { withAlpha } from '../primitives/internal/color';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { BarChartV4 } from './BarChartV4';

const theme = compileTheme(SEED_LIGHT);
const SLOTS = chartSeries(theme.ramps.primary[500], 'light');

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
 * An opacity read off a rendered style, whether the platform resolved the
 * `Animated.Value` to a number or handed the node the value itself.
 */
function opacityOf(style: unknown): number {
  const value = flat(style).opacity as number | { __getValue?: () => number };
  return typeof value === 'number' ? value : (value?.__getValue?.() ?? Number.NaN);
}

/**
 * Every node carrying a `testID`, found through the tree.
 *
 * `getAllByTestId` skips anything marked `accessibilityElementsHidden`, and
 * every mark in this chart is exactly that — decorative to a screen reader,
 * because the figure states its value in one sentence on the root (rule 6).
 * So the marks are located structurally instead.
 */
function marks(root: ReactTestInstance, id: string): ReactTestInstance[] {
  return root.findAll((n) => typeof n.type === 'string' && n.props?.testID === id);
}

/**
 * Every style value in the tree, as strings — the divide-by-zero net.
 *
 * The single-datum and all-zero cases are where the base sources put `NaN%`
 * into a height, so the assertion is on the rendered geometry rather than on a
 * derived number.
 */
function styleValues(root: ReactTestInstance): string[] {
  const out: string[] = [];
  root.findAll(() => true).forEach((node) => {
    Object.values(flat(node.props?.style)).forEach((v) => {
      if (typeof v === 'string' || typeof v === 'number') out.push(String(v));
    });
  });
  return out;
}

describe('BarChartV4 (native)', () => {
  // ── §4.1: one colour, never by value ───────────────────────────────

  it('paints every bar slot 1 — a single series is one colour', () => {
    const { root } = renderThemed(<BarChartV4 data={[3, 7, 4, 9]} />, SEED_LIGHT);
    const bars = marks(root, 'xen-v4-bar');
    expect(bars).toHaveLength(4);
    bars.forEach((bar) => expect(flat(bar.props.style).backgroundColor).toBe(SLOTS[0]));
    // Never the semantic slots the base cycled.
    expect(SLOTS[0]).not.toBe(theme.light.success);
  });

  it('`tone` is the only route to a status hue, and it replaces the slot', () => {
    const { root } = renderThemed(
      <BarChartV4 data={[3, 7]} tone="danger" />,
      SEED_LIGHT
    );
    marks(root, 'xen-v4-bar').forEach((bar) =>
      expect(flat(bar.props.style).backgroundColor).toBe(theme.light.danger)
    );
  });

  // ── §3.3 / §4.4: chrome and mark geometry ──────────────────────────

  it('draws the axis with the derived chrome neutral, not `colors.muted`', () => {
    const { root } = renderThemed(<BarChartV4 data={[3, 7]} />, SEED_LIGHT);
    const axis = flat((marks(root, 'xen-v4-chart-axis')[0] as ReactTestInstance).props.style);
    expect(axis.backgroundColor).toBe(withAlpha(theme.light.onSurface, CHART_AXIS_MIX));
    expect(axis.backgroundColor).not.toBe(theme.light.muted);
    expect(axis.height).toBe(1);
  });

  it('rounds the data end only — a bar rounded at the baseline floats off it', () => {
    const { root } = renderThemed(<BarChartV4 data={[3, 7]} />, SEED_LIGHT);
    const bar = flat((marks(root, 'xen-v4-bar')[0] as ReactTestInstance).props.style);
    expect(bar.borderTopLeftRadius).toBe(CHART_MARK.endRadius);
    expect(bar.borderTopRightRadius).toBe(CHART_MARK.endRadius);
    expect(bar.borderBottomLeftRadius).toBeUndefined();
    expect(bar.borderBottomRightRadius).toBeUndefined();
  });

  it('separates adjacent bars by `CHART_MARK.gap`, not a spacing token', () => {
    const { root } = renderThemed(<BarChartV4 data={[3, 7, 4]} />, SEED_LIGHT);
    const row = marks(root, 'xen-v4-bar-row')[0] as ReactTestInstance;
    expect(flat(row.props.style).gap).toBe(CHART_MARK.gap);
    // The base spent `spacing.xs` here — a layout token doing a mark's job.
    expect(flat(row.props.style).gap).not.toBe(theme.spacing.xs);
  });

  // ── §4.2: the figure frame ─────────────────────────────────────────

  it('renders the title, summary and caption slots', () => {
    const { getByText } = renderThemed(
      <BarChartV4 data={[3, 7]} title="Revenue" summary="£48,210" caption="vs last month" />,
      SEED_LIGHT
    );
    expect(getByText('Revenue')).toBeTruthy();
    expect(getByText('£48,210')).toBeTruthy();
    expect(getByText('vs last month')).toBeTruthy();
  });

  // ── §4.4: direct labels are the secondary encoding ─────────────────

  it('direct-labels at four bars or fewer, and stops above that', () => {
    const four = renderThemed(<BarChartV4 data={[1, 2, 3, 4]} />, SEED_LIGHT);
    expect(four.queryAllByText('3')).toHaveLength(1);

    const five = renderThemed(<BarChartV4 data={[1, 2, 3, 4, 5]} />, SEED_LIGHT);
    expect(five.queryAllByText('3')).toHaveLength(0);
  });

  it('`showValues` overrides the automatic answer, and `format` spells it', () => {
    const { getByText } = renderThemed(
      <BarChartV4 data={[1, 2, 3, 4, 5]} showValues format={(v) => `£${v}`} />,
      SEED_LIGHT
    );
    expect(getByText('£5')).toBeTruthy();
  });

  // ── §4.5: empty, single datum, loading ─────────────────────────────

  it('renders the empty state at the footprint, never nothing', () => {
    const { getByText, root } = renderThemed(
      <BarChartV4 data={[]} height={160} />,
      SEED_LIGHT
    );
    expect(marks(root, 'xen-v4-bar')).toHaveLength(0);
    expect(getByText('No data')).toBeTruthy();
    const boxes = root
      .findAll((n) => typeof n.type === 'string')
      .map((n) => flat(n.props?.style).height);
    expect(boxes).toContain(160);
  });

  it('takes a custom empty label', () => {
    const { getByText } = renderThemed(
      <BarChartV4 data={[]} emptyLabel="Nothing this week" />,
      SEED_LIGHT
    );
    expect(getByText('Nothing this week')).toBeTruthy();
  });

  it('renders one bar for one datum and never divides by zero', () => {
    const { root } = renderThemed(<BarChartV4 data={[7]} />, SEED_LIGHT);
    const bars = marks(root, 'xen-v4-bar');
    expect(bars).toHaveLength(1);
    expect(flat((bars[0] as ReactTestInstance).props.style).height).toBe('100%');
    styleValues(root).forEach((v) => {
      expect(v).not.toContain('NaN');
      expect(v).not.toContain('Infinity');
    });
  });

  it('survives an all-zero series and keeps every bar visible', () => {
    const { root } = renderThemed(<BarChartV4 data={[0, 0]} />, SEED_LIGHT);
    styleValues(root).forEach((v) => expect(v).not.toContain('NaN'));
    marks(root, 'xen-v4-bar').forEach((bar) => {
      expect(flat(bar.props.style).height).toBe('0%');
      // `1` is the hairline exception: a datum that exists is still visible.
      expect(flat(bar.props.style).minHeight).toBe(1);
    });
  });

  it('holds the footprint with a skeleton while loading', () => {
    const { root } = renderThemed(
      <BarChartV4 data={[3, 7]} loading />,
      SEED_LIGHT
    );
    expect(marks(root, 'xen-v4-bar')).toHaveLength(0);
  });

  // ── §4.8: the accessible sentence ──────────────────────────────────

  it('derives a sentence naming the form, the headline, the count and the range', () => {
    const { root } = renderThemed(<BarChartV4 data={[3, 7, 4]} title="Revenue" />, SEED_LIGHT);
    const figure = root.findAll(
      (n) => typeof n.type === 'string' && n.props?.accessibilityRole === 'image'
    )[0] as ReactTestInstance;
    expect(figure.props.accessibilityLabel).toBe('Bar chart, Revenue, 3 bars, 3 to 7');
  });

  it('singularises at one datum and collapses a one-value range', () => {
    const { root } = renderThemed(<BarChartV4 data={[7]} />, SEED_LIGHT);
    const figure = root.findAll(
      (n) => typeof n.type === 'string' && n.props?.accessibilityRole === 'image'
    )[0] as ReactTestInstance;
    expect(figure.props.accessibilityLabel).toBe('Bar chart, 1 bar, 7');
  });

  it('lets the caller override the sentence', () => {
    const { root } = renderThemed(
      <BarChartV4 data={[3, 7]} accessibilityLabel="Revenue is up" />,
      SEED_LIGHT
    );
    const figure = root.findAll(
      (n) => typeof n.type === 'string' && n.props?.accessibilityRole === 'image'
    )[0] as ReactTestInstance;
    expect(figure.props.accessibilityLabel).toBe('Revenue is up');
  });

  // ── §4.6 / rule 10: press is native's hover ────────────────────────

  it('reveals the precise value on press and reports it to `onSelect`', () => {
    const onSelect = jest.fn();
    const { root, queryByText, getByText } = renderThemed(
      <BarChartV4 data={[1, 2, 3, 4, 5]} labels={['a', 'b', 'c', 'd', 'e']} onSelect={onSelect} />,
      SEED_LIGHT
    );
    expect(queryByText('b: 2')).toBeNull();

    fireEvent.press(marks(root, 'xen-v4-bar-hit')[1] as ReactTestInstance);
    expect(onSelect).toHaveBeenCalledWith(1, 2);
    expect(getByText('b: 2')).toBeTruthy();
  });

  it('does not open a bubble when `tooltip` is false', () => {
    const { root, queryByText } = renderThemed(
      <BarChartV4 data={[1, 2, 3, 4, 5]} tooltip={false} />,
      SEED_LIGHT
    );
    fireEvent.press(marks(root, 'xen-v4-bar-hit')[1] as ReactTestInstance);
    expect(queryByText('2')).toBeNull();
  });

  it('carries every bar out to the tap floor vertically, never into its neighbour', () => {
    const { root } = renderThemed(<BarChartV4 data={[1, 2]} height={20} />, SEED_LIGHT);
    const slop = (marks(root, 'xen-v4-bar-hit')[0] as ReactTestInstance).props.hitSlop;
    // (44 - 20) / 2 on the kit's scale.
    expect(slop).toEqual({ top: 12, bottom: 12 });
    expect(slop.left).toBeUndefined();
    expect(slop.right).toBeUndefined();
  });

  // ── §4.7: motion ───────────────────────────────────────────────────

  it('resolves the reveal to fully visible when it is turned off', () => {
    const { root } = renderThemed(
      <BarChartV4 data={[1, 2]} animate={false} />,
      SEED_LIGHT
    );
    const plot = marks(root, 'xen-v4-chart-plot')[0] as ReactTestInstance;
    expect(opacityOf(plot.props.style)).toBe(1);
  });

  // ── §36: the readout arrives, it does not blink ────────────────────

  /*
    The bubble mounts and unmounts with the press, so without a fade it blinks
    into existence beside the finger. `ChartTipV4` is the module's one answer
    — `quick`, because it is feedback tied to a touch that is still happening,
    not a panel arriving from somewhere.
  */
  it('fades its press readout in, from the module’s one shared tip', async () => {
    const { root } = renderThemed(
      <BarChartV4 data={[1, 2, 3]} labels={['a', 'b', 'c']} />,
      SEED_LIGHT
    );
    fireEvent.press(marks(root, 'xen-v4-bar-hit')[1] as ReactTestInstance);

    /** Every rendered style wearing the popover ground — the bubble's. */
    const bubbleStyles = (): Record<string, unknown>[] =>
      root
        .findAll(() => true)
        .map((n) => flat(n.props?.style))
        .filter((st) => st.backgroundColor === theme.light.popover);

    // Frame zero of a fade, not a bubble that is simply there.
    expect(bubbleStyles().some((st) => st.opacity === 0)).toBe(true);
    await waitFor(() => {
      expect(bubbleStyles().some((st) => st.opacity === 1)).toBe(true);
    });
  });
});
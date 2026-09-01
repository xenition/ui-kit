import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { compileTheme } from '../../theme/compile';
import {
  CHART_AXIS_MIX,
  CHART_DIRECT_LABEL_MAX,
  CHART_MARK,
  chartSeries,
} from '../../primitives/internal/v4-chart';
import { withAlpha } from '../primitives/internal/color';
import { minTap } from '../primitives/internal/nav-v4';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { HistogramV4 } from './HistogramV4';

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

/** Every node carrying a `testID` — the marks are accessibility-hidden. */
function marks(root: ReactTestInstance, id: string): ReactTestInstance[] {
  return root.findAll((n) => typeof n.type === 'string' && n.props?.testID === id);
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

describe('HistogramV4 (native)', () => {
  // ── §4.1: bins are one series by definition ────────────────────────

  it('paints every bin one colour — a distribution has one identity', () => {
    const { root } = renderThemed(<HistogramV4 bins={[1, 5, 9, 4, 2]} />, SEED_LIGHT);
    const bins = marks(root, 'xen-v4-bin');
    expect(bins).toHaveLength(5);
    bins.forEach((bin) => expect(flat(bin.props.style).backgroundColor).toBe(SLOTS[0]));
  });

  it('`tone` changes which colour, never how many', () => {
    const { root } = renderThemed(<HistogramV4 bins={[1, 5, 9]} tone="danger" />, SEED_LIGHT);
    const fills = new Set(
      marks(root, 'xen-v4-bin').map((bin) => flat(bin.props.style).backgroundColor)
    );
    expect(fills.size).toBe(1);
    expect([...fills][0]).toBe(theme.light.danger);
  });

  // ── §3.3 / §4.4: chrome and mark geometry ──────────────────────────

  it('draws the axis with the derived chrome neutral, not `colors.muted`', () => {
    const { root } = renderThemed(<HistogramV4 bins={[1, 5]} />, SEED_LIGHT);
    const axis = flat((marks(root, 'xen-v4-chart-axis')[0] as ReactTestInstance).props.style);
    expect(axis.backgroundColor).toBe(withAlpha(theme.light.onSurface, CHART_AXIS_MIX));
    expect(axis.backgroundColor).not.toBe(theme.light.muted);
  });

  it('sits its bins flush — a distribution is one continuous axis', () => {
    // The ruling on §4.4's gap rule: the gap says "these are separate things",
    // which is true of categorical bars and false of histogram bins. Bin 3's
    // right edge IS bin 4's left edge, and page between them claims a range of
    // the variable fell in neither bucket. See `BIN_GAP` in the source.
    const { root } = renderThemed(<HistogramV4 bins={[1, 5, 9]} />, SEED_LIGHT);
    const row = marks(root, 'xen-v4-bin-row')[0] as ReactTestInstance;
    expect(flat(row.props.style).gap).toBe(0);
    expect(flat(row.props.style).gap).not.toBe(CHART_MARK.gap);
    // The base gave every bin but the first a `borderLeftWidth`, which made the
    // first bin a pixel wider than the rest.
    marks(root, 'xen-v4-bin').forEach((bin) =>
      expect(flat(bin.props.style).borderLeftWidth).toBeUndefined()
    );
  });

  it('rounds the data end only', () => {
    const { root } = renderThemed(<HistogramV4 bins={[1, 5]} />, SEED_LIGHT);
    const bin = flat((marks(root, 'xen-v4-bin')[0] as ReactTestInstance).props.style);
    expect(bin.borderTopLeftRadius).toBe(CHART_MARK.endRadius);
    expect(bin.borderBottomLeftRadius).toBeUndefined();
  });

  // ── §5: bin labels thin, they do not rotate ────────────────────────

  it('thins bin labels rather than rotating them', () => {
    const labels = Array.from({ length: 12 }, (_, i) => `b${i}`);
    const { root, queryByText, getByText } = renderThemed(
      <HistogramV4 bins={labels.map((_, i) => i)} labels={labels} />,
      SEED_LIGHT
    );
    // Stride is ceil(12 / CHART_DIRECT_LABEL_MAX) = 3.
    ['b0', 'b3', 'b6', 'b9'].forEach((text) => expect(getByText(text)).toBeTruthy());
    ['b1', 'b2', 'b4'].forEach((text) => expect(queryByText(text)).toBeNull());
    expect(CHART_DIRECT_LABEL_MAX).toBe(4);
    // Nothing is rotated to make room.
    styleValues(root).forEach((v) => expect(v).not.toContain('rotate'));
  });

  it('labels every bin when there are few enough to fit', () => {
    const { getByText } = renderThemed(
      <HistogramV4 bins={[1, 2, 3]} labels={['x', 'y', 'z']} />,
      SEED_LIGHT
    );
    ['x', 'y', 'z'].forEach((text) => expect(getByText(text)).toBeTruthy());
  });

  // ── §4.2: the figure frame ─────────────────────────────────────────

  it('renders the title, summary and caption slots and honours `height`', () => {
    const { root, getByText } = renderThemed(
      <HistogramV4
        bins={[1, 5]}
        title="Latency"
        summary="p95 240ms"
        caption="last hour"
        height={180}
      />,
      SEED_LIGHT
    );
    expect(getByText('Latency')).toBeTruthy();
    expect(getByText('p95 240ms')).toBeTruthy();
    expect(getByText('last hour')).toBeTruthy();
    const plot = marks(root, 'xen-v4-chart-plot')[0] as ReactTestInstance;
    expect(flat(plot.props.style).height).toBe(180);
  });

  // ── §4.5: empty, single datum, loading ─────────────────────────────

  it('renders the empty state at the footprint, never nothing', () => {
    const { root, getByText } = renderThemed(<HistogramV4 bins={[]} height={150} />, SEED_LIGHT);
    expect(marks(root, 'xen-v4-bin')).toHaveLength(0);
    expect(getByText('No data')).toBeTruthy();
    const heights = root
      .findAll((n) => typeof n.type === 'string')
      .map((n) => flat(n.props?.style).height);
    expect(heights).toContain(150);
  });

  it('takes a custom empty label', () => {
    const { getByText } = renderThemed(
      <HistogramV4 bins={[]} emptyLabel="No samples" />,
      SEED_LIGHT
    );
    expect(getByText('No samples')).toBeTruthy();
  });

  it('renders one bin for one bin and never divides by zero', () => {
    const { root } = renderThemed(<HistogramV4 bins={[4]} />, SEED_LIGHT);
    const bins = marks(root, 'xen-v4-bin');
    expect(bins).toHaveLength(1);
    expect(flat((bins[0] as ReactTestInstance).props.style).height).toBe('100%');
    styleValues(root).forEach((v) => {
      expect(v).not.toContain('NaN');
      expect(v).not.toContain('Infinity');
    });
  });

  it('keeps an empty bin visible — a gap in a distribution is information', () => {
    const { root } = renderThemed(<HistogramV4 bins={[0, 0, 0]} />, SEED_LIGHT);
    styleValues(root).forEach((v) => expect(v).not.toContain('NaN'));
    marks(root, 'xen-v4-bin').forEach((bin) =>
      expect(flat(bin.props.style).minHeight).toBe(1)
    );
  });

  it('holds the footprint with a skeleton while loading', () => {
    const { root } = renderThemed(<HistogramV4 bins={[1, 5]} loading />, SEED_LIGHT);
    expect(marks(root, 'xen-v4-bin')).toHaveLength(0);
  });

  // ── §4.8: the accessible sentence ──────────────────────────────────

  it('derives a sentence naming the form, the headline, the count and the range', () => {
    const { root } = renderThemed(<HistogramV4 bins={[1, 5, 9]} title="Latency" />, SEED_LIGHT);
    expect(figureLabel(root)).toBe('Histogram, Latency, 3 bins, 1 to 9');
  });

  it('singularises at one bin', () => {
    const { root } = renderThemed(<HistogramV4 bins={[4]} />, SEED_LIGHT);
    expect(figureLabel(root)).toBe('Histogram, 1 bin, 4');
  });

  it('lets the caller override the sentence', () => {
    const { root } = renderThemed(
      <HistogramV4 bins={[1, 5]} accessibilityLabel="Mostly fast" />,
      SEED_LIGHT
    );
    expect(figureLabel(root)).toBe('Mostly fast');
  });

  // ── §4.6 / rule 10: press, and the documented 28 exception ─────────

  it('carries the precise count in the press bubble and reports it to `onSelect`', () => {
    const onSelect = jest.fn();
    const { root, getByText } = renderThemed(
      <HistogramV4 bins={[1, 5, 9]} labels={['lo', 'mid', 'hi']} onSelect={onSelect} />,
      SEED_LIGHT
    );
    fireEvent.press(marks(root, 'xen-v4-bin-hit')[2] as ReactTestInstance);
    expect(onSelect).toHaveBeenCalledWith(2, 9);
    expect(getByText('hi: 9')).toBeTruthy();
  });

  it('grows a bin’s target vertically to the tap floor and never sideways', () => {
    const { root } = renderThemed(<HistogramV4 bins={[1, 5]} height={20} />, SEED_LIGHT);
    const slop = (marks(root, 'xen-v4-bin-hit')[0] as ReactTestInstance).props.hitSlop;
    expect(slop).toEqual({ top: (minTap(theme.spacing) - 20) / 2, bottom: (minTap(theme.spacing) - 20) / 2 });
    // Sideways it would overlap the neighbouring bin and answer the wrong one.
    expect(slop.left).toBeUndefined();
    expect(slop.right).toBeUndefined();
  });

  // ── §4.7: motion ───────────────────────────────────────────────────

  it('resolves the reveal to fully visible when it is turned off', () => {
    const { root } = renderThemed(<HistogramV4 bins={[1, 5]} animate={false} />, SEED_LIGHT);
    const plot = marks(root, 'xen-v4-chart-plot')[0] as ReactTestInstance;
    const opacity = flat(plot.props.style).opacity as number | { __getValue?: () => number };
    expect(typeof opacity === 'number' ? opacity : opacity?.__getValue?.()).toBe(1);
  });
});

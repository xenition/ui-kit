import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { compileTheme } from '../../theme/compile';
import {
  CHART_MARK,
  CHART_OVERFLOW_LABEL,
  CHART_SERIES_COUNT,
  chartSeries,
} from '../../primitives/internal/v4-chart';
import { minTap } from '../primitives/internal/nav-v4';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { StackedBarV4 } from './StackedBarV4';

const theme = compileTheme(SEED_LIGHT);
const SLOTS = chartSeries(theme.ramps.primary[500], 'light');

const SEGMENTS = [
  { value: 52, label: 'Direct' },
  { value: 30, label: 'Referral' },
  { value: 18, label: 'Organic' },
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

describe('StackedBarV4 (native)', () => {
  // ── §4.1 / rule 2: slots in order, never the semantic cycle ────────

  it('takes the palette slots in order and never a status hue as an identity', () => {
    const { root } = renderThemed(<StackedBarV4 segments={SEGMENTS} />, SEED_LIGHT);
    const fills = marks(root, 'xen-v4-segment').map((s) => flat(s.props.style).backgroundColor);
    expect(fills).toEqual([SLOTS[0], SLOTS[1], SLOTS[2]]);
    // The base painted segment 3 `success` and segment 4 `warn`.
    expect(fills).not.toContain(theme.light.success);
    expect(fills).not.toContain(theme.light.warn);
  });

  it('retires the descending-opacity steps that made segment four look disabled', () => {
    const { root } = renderThemed(<StackedBarV4 segments={SEGMENTS} />, SEED_LIGHT);
    marks(root, 'xen-v4-segment').forEach((s) =>
      expect(flat(s.props.style).opacity).toBeUndefined()
    );
  });

  it('paints status when every segment asks for it', () => {
    const { root } = renderThemed(
      <StackedBarV4
        segments={[
          { value: 8, label: 'Passed', tone: 'success' },
          { value: 2, label: 'Failed', tone: 'danger' },
        ]}
      />,
      SEED_LIGHT
    );
    const fills = marks(root, 'xen-v4-segment').map((s) => flat(s.props.style).backgroundColor);
    expect(fills).toEqual([theme.light.success, theme.light.danger]);
  });

  it('refuses a stack that mixes status colour with slot colour (rule 3)', () => {
    expect(() =>
      renderThemed(
        <StackedBarV4
          segments={[{ value: 8, label: 'Passed', tone: 'success' }, { value: 2, label: 'Other' }]}
        />,
        SEED_LIGHT
      )
    ).toThrow(/status colour or slot colour, never both/);
  });

  it('folds past the last slot rather than throwing — a stack’s count is data', () => {
    // The palette still throws; the COMPONENT folds. A stack handed six
    // segments from a live API must not take the screen down with a
    // `RangeError` (`foldChartSeries` in `primitives/internal/v4-chart.ts`).
    const { root, getByText } = renderThemed(
      <StackedBarV4 segments={[1, 2, 3, 4, 5, 6].map((v) => ({ value: v }))} />,
      SEED_LIGHT
    );
    const drawn = marks(root, 'xen-v4-segment');
    expect(drawn).toHaveLength(CHART_SERIES_COUNT);
    expect(getByText(CHART_OVERFLOW_LABEL)).toBeTruthy();
    // The total is conserved: 5 + 6 = 11 of 21, so the tail is the widest part.
    const grows = drawn.map((d) => Number(flat(d.props.style).flexGrow));
    expect(grows[CHART_SERIES_COUNT - 1]).toBeCloseTo(11 / 21, 5);
    expect(grows.reduce((a, b) => a + b, 0)).toBeCloseTo(1, 5);
  });

  // ── §1 rule 5: the gap IS the secondary encoding ───────────────────

  it('runs a `CHART_MARK.gap` of page between segments', () => {
    const { root } = renderThemed(<StackedBarV4 segments={SEGMENTS} />, SEED_LIGHT);
    const bar = marks(root, 'xen-v4-chart-plot')[0] as ReactTestInstance;
    expect(flat(bar.props.style).gap).toBe(CHART_MARK.gap);
  });

  it('always carries a legend at two or more segments, and lets it be turned off', () => {
    const on = renderThemed(<StackedBarV4 segments={SEGMENTS} />, SEED_LIGHT);
    expect(marks(on.root, 'xen-v4-chart-legend')).toHaveLength(1);
    expect(marks(on.root, 'legend-swatch')).toHaveLength(3);
    expect(on.getByText('Direct')).toBeTruthy();

    const off = renderThemed(<StackedBarV4 segments={SEGMENTS} legend={false} />, SEED_LIGHT);
    expect(marks(off.root, 'xen-v4-chart-legend')).toHaveLength(0);
  });

  it('sizes the legend swatch from `CHART_MARK.dotSize`, not a 10px literal', () => {
    const { root } = renderThemed(<StackedBarV4 segments={SEGMENTS} />, SEED_LIGHT);
    marks(root, 'legend-swatch').forEach((swatch) => {
      expect(flat(swatch.props.style).width).toBe(CHART_MARK.dotSize);
      expect(flat(swatch.props.style).height).toBe(CHART_MARK.dotSize);
    });
  });

  it('pairs each legend swatch with its own segment colour', () => {
    const { root } = renderThemed(<StackedBarV4 segments={SEGMENTS} />, SEED_LIGHT);
    const swatches = marks(root, 'legend-swatch').map(
      (s) => flat(s.props.style).backgroundColor
    );
    const segments = marks(root, 'xen-v4-segment').map((s) => flat(s.props.style).backgroundColor);
    expect(swatches).toEqual(segments);
  });

  it('puts the direct labels in the legend at four segments or fewer', () => {
    const four = renderThemed(<StackedBarV4 segments={SEGMENTS} />, SEED_LIGHT);
    expect(marks(four.root, 'xen-v4-chart-value')).toHaveLength(3);

    const five = renderThemed(
      <StackedBarV4 segments={[1, 2, 3, 4, 5].map((v) => ({ value: v }))} />,
      SEED_LIGHT
    );
    expect(marks(five.root, 'xen-v4-chart-value')).toHaveLength(0);
  });

  it('`showValues` and `format` steer the legend numbers', () => {
    const { getByText } = renderThemed(
      <StackedBarV4 segments={SEGMENTS} showValues format={(v) => `${v}%`} />,
      SEED_LIGHT
    );
    expect(getByText('52%')).toBeTruthy();
  });

  // ── §4.4: rounding and geometry ────────────────────────────────────

  it('rounds the data end only — the last segment, never the first', () => {
    const { root } = renderThemed(<StackedBarV4 segments={SEGMENTS} />, SEED_LIGHT);
    const segments = marks(root, 'xen-v4-segment');
    const first = flat((segments[0] as ReactTestInstance).props.style);
    const last = flat((segments[2] as ReactTestInstance).props.style);
    expect(first.borderTopRightRadius).toBe(0);
    expect(last.borderTopRightRadius).toBe(CHART_MARK.endRadius);
    expect(last.borderBottomRightRadius).toBe(CHART_MARK.endRadius);
    // The base rounded the whole bar with `radius.full` and clipped it.
    expect(last.borderTopRightRadius).not.toBe(theme.radius.full);
  });

  it('sizes each segment by its share of the total', () => {
    const { root } = renderThemed(<StackedBarV4 segments={SEGMENTS} />, SEED_LIGHT);
    const grow = marks(root, 'xen-v4-segment').map((s) => flat(s.props.style).flexGrow as number);
    expect(grow[0]).toBeCloseTo(0.52, 5);
    expect(grow[1]).toBeCloseTo(0.3, 5);
    expect(grow[2]).toBeCloseTo(0.18, 5);
  });

  it('grows a segment’s target to the tap floor vertically', () => {
    const { root } = renderThemed(<StackedBarV4 segments={SEGMENTS} height={16} />, SEED_LIGHT);
    const slop = (marks(root, 'xen-v4-segment')[0] as ReactTestInstance).props.hitSlop;
    const expected = (minTap(theme.spacing) - 16) / 2;
    expect(slop).toEqual({ top: expected, bottom: expected });
  });

  // ── §4.2: the figure frame ─────────────────────────────────────────

  it('renders the title, summary and caption slots and honours `height`', () => {
    const { root, getByText } = renderThemed(
      <StackedBarV4
        segments={SEGMENTS}
        title="Traffic"
        summary="12,400"
        caption="last 30 days"
        height={24}
      />,
      SEED_LIGHT
    );
    expect(getByText('Traffic')).toBeTruthy();
    expect(getByText('12,400')).toBeTruthy();
    expect(getByText('last 30 days')).toBeTruthy();
    const bar = marks(root, 'xen-v4-chart-plot')[0] as ReactTestInstance;
    expect(flat(bar.props.style).height).toBe(24);
  });

  // ── §4.5: empty, single datum, loading ─────────────────────────────

  it('renders the empty state at the footprint, never nothing', () => {
    const { root, getByText } = renderThemed(
      <StackedBarV4 segments={[]} height={20} />,
      SEED_LIGHT
    );
    expect(marks(root, 'xen-v4-segment')).toHaveLength(0);
    expect(getByText('No data')).toBeTruthy();
  });

  it('treats an all-zero stack as empty rather than dividing by zero', () => {
    const { root, getByText } = renderThemed(
      <StackedBarV4 segments={[{ value: 0 }, { value: 0 }]} />,
      SEED_LIGHT
    );
    expect(marks(root, 'xen-v4-segment')).toHaveLength(0);
    expect(getByText('No data')).toBeTruthy();
    styleValues(root).forEach((v) => {
      expect(v).not.toContain('NaN');
      expect(v).not.toContain('Infinity');
    });
  });

  it('renders one segment for one segment, at the full width and with no legend', () => {
    const { root } = renderThemed(
      <StackedBarV4 segments={[{ value: 9, label: 'Only' }]} />,
      SEED_LIGHT
    );
    const segments = marks(root, 'xen-v4-segment');
    expect(segments).toHaveLength(1);
    expect(flat((segments[0] as ReactTestInstance).props.style).flexGrow).toBeCloseTo(1, 5);
    // One series needs no legend — colour is not carrying identity.
    expect(marks(root, 'xen-v4-chart-legend')).toHaveLength(0);
    styleValues(root).forEach((v) => expect(v).not.toContain('NaN'));
  });

  it('holds the footprint with a skeleton while loading', () => {
    const { root } = renderThemed(<StackedBarV4 segments={SEGMENTS} loading />, SEED_LIGHT);
    expect(marks(root, 'xen-v4-segment')).toHaveLength(0);
  });

  // ── §4.8: the accessible sentence ──────────────────────────────────

  it('derives a sentence naming the form, the headline and every share', () => {
    const { root } = renderThemed(<StackedBarV4 segments={SEGMENTS} title="Traffic" />, SEED_LIGHT);
    expect(figureLabel(root)).toBe(
      'Stacked bar, Traffic, 3 segments, Direct 52%, Referral 30%, Organic 18%'
    );
  });

  it('singularises at one segment and names an unlabelled one by position', () => {
    const { root } = renderThemed(<StackedBarV4 segments={[{ value: 9 }]} />, SEED_LIGHT);
    expect(figureLabel(root)).toBe('Stacked bar, 1 segment, Segment 1 100%');
  });

  it('lets the caller override the sentence', () => {
    const { root } = renderThemed(
      <StackedBarV4 segments={SEGMENTS} accessibilityLabel="Direct dominates" />,
      SEED_LIGHT
    );
    expect(figureLabel(root)).toBe('Direct dominates');
  });

  // ── §4.6: press is native's hover ──────────────────────────────────

  it('carries the precise value in the press bubble and reports it to `onSelect`', () => {
    const onSelect = jest.fn();
    const { root, getByText, queryByText } = renderThemed(
      <StackedBarV4 segments={SEGMENTS} onSelect={onSelect} />,
      SEED_LIGHT
    );
    expect(queryByText('Referral: 30')).toBeNull();

    fireEvent.press(marks(root, 'xen-v4-segment')[1] as ReactTestInstance);
    expect(onSelect).toHaveBeenCalledWith(1, 30);
    expect(getByText('Referral: 30')).toBeTruthy();
  });

  // ── §4.7: motion ───────────────────────────────────────────────────

  it('resolves the reveal to fully visible when it is turned off', () => {
    const { root } = renderThemed(<StackedBarV4 segments={SEGMENTS} animate={false} />, SEED_LIGHT);
    const plot = marks(root, 'xen-v4-chart-plot')[0] as ReactTestInstance;
    const opacity = flat(plot.props.style).opacity as number | { __getValue?: () => number };
    expect(typeof opacity === 'number' ? opacity : opacity?.__getValue?.()).toBe(1);
  });
});

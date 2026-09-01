import * as React from 'react';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { toNativeTokens } from '../../theme/outputs';
import { CHART_MARK, chartSeries } from '../../primitives/internal/v4-chart';
import { PieChartV4, foldPieDataV4, segmentLegendLabelV4 } from './PieChartV4';

const theme = compileTheme(SEED_LIGHT);
const brand = toNativeTokens(theme).ramps.primary[500];
/** The five derived slots, in assignment order, for this seed and scheme. */
const SLOTS = chartSeries(brand, 'light');

const FIVE = [
  { label: 'Direct', value: 40 },
  { label: 'Referral', value: 25 },
  { label: 'Organic', value: 20 },
  { label: 'Social', value: 10 },
  { label: 'Email', value: 5 },
];

/**
 * Host nodes only. The `react-native-svg` mock renders each primitive through
 * `View`, which is itself a composite, so an unfiltered `findAll` returns every
 * mark twice — once for the component and once for the host element under it.
 */
function byTestId(root: ReactTestInstance, id: string): ReactTestInstance[] {
  return root.findAll((n) => typeof n.type === 'string' && n.props?.testID === id);
}

/** Every `<Path>` the plot emitted, in draw order. */
function paths(root: ReactTestInstance): ReactTestInstance[] {
  return byTestId(root, 'svg-path');
}

function circles(root: ReactTestInstance): ReactTestInstance[] {
  return byTestId(root, 'svg-circle');
}

/** The node carrying the plot's spoken sentence. */
function spoken(root: ReactTestInstance): string {
  const node = root.findAll(
    (n) => typeof n.type === 'string' && typeof n.props?.accessibilityLabel === 'string'
  )[0];
  return (node?.props.accessibilityLabel as string) ?? '';
}

describe('PieChartV4 (native)', () => {
  // ── §1 rule 2 + rule 4: the palette, and only the palette ──────────

  it('paints slices from the derived palette in assignment order, never a status token', () => {
    const { root } = renderThemed(<PieChartV4 data={FIVE} />, SEED_LIGHT);
    expect(paths(root).map((p) => p.props.fill)).toEqual(SLOTS);
    // The bug this pass exists to fix: the base cycled
    // ['primary','accent','success','warn','danger'], so slice three was
    // `success` and slice five `danger` on regions that pass or fail nothing.
    expect(paths(root).map((p) => p.props.fill)).not.toContain(theme.light.success);
    expect(paths(root).map((p) => p.props.fill)).not.toContain(theme.light.danger);
  });

  it('never dims a slice — the base stepped opacity down on every wrap', () => {
    const { root } = renderThemed(<PieChartV4 data={FIVE} />, SEED_LIGHT);
    for (const p of paths(root)) expect(p.props.fillOpacity).toBeUndefined();
  });

  it('separates adjacent slices with CHART_MARK.gap of page colour', () => {
    const { root } = renderThemed(<PieChartV4 data={FIVE} />, SEED_LIGHT);
    const first = paths(root)[0] as ReactTestInstance;
    expect(first.props.stroke).toBe(theme.light.surface);
    expect(first.props.strokeWidth).toBe(CHART_MARK.gap);
  });

  it('reaches a status hue only through `tone`', () => {
    const { root } = renderThemed(
      <PieChartV4
        data={[
          { label: 'Passed', value: 90, tone: 'success' },
          { label: 'Failed', value: 10, tone: 'danger' },
        ]}
      />,
      SEED_LIGHT
    );
    expect(paths(root).map((p) => p.props.fill)).toEqual([
      theme.light.success,
      theme.light.danger,
    ]);
  });

  it('refuses a chart that mixes `tone` with palette slots (§1 rule 3)', () => {
    expect(() =>
      foldPieDataV4([
        { label: 'Failed', value: 10, tone: 'danger' },
        { label: 'Rest', value: 90 },
      ])
    ).toThrow(/all `tone` or all palette slots/);
  });

  // ── §7 open question 2: the component owns the "Other" fold ────────

  it('folds at six segments: four named, the tail in slot 5, sorted descending', () => {
    const fold = foldPieDataV4([
      { label: 'A', value: 1 },
      { label: 'B', value: 9 },
      { label: 'C', value: 7 },
      { label: 'D', value: 2 },
      { label: 'E', value: 8 },
      { label: 'F', value: 6 },
    ]);
    expect(fold.segments.map((s) => s.label)).toEqual(['B', 'E', 'C', 'F', 'Other']);
    expect(fold.foldedCount).toBe(2);
    expect(fold.segments[4]?.value).toBe(3);
  });

  it('does NOT sort at five or fewer — a slice keeps its slot when a sibling filters', () => {
    expect(foldPieDataV4(FIVE).segments.map((s) => s.label)).toEqual([
      'Direct',
      'Referral',
      'Organic',
      'Social',
      'Email',
    ]);
  });

  it('drops zero, negative and non-finite rows', () => {
    const fold = foldPieDataV4([
      { label: 'Real', value: 5 },
      { label: 'Zero', value: 0 },
      { label: 'Negative', value: -3 },
      { label: 'NaN', value: Number.NaN },
    ]);
    expect(fold.segments.map((s) => s.label)).toEqual(['Real']);
  });

  it('says so in the legend and in the spoken sentence', () => {
    const { root, getByText } = renderThemed(
      <PieChartV4
        data={[
          { label: 'A', value: 9 },
          { label: 'B', value: 8 },
          { label: 'C', value: 7 },
          { label: 'D', value: 6 },
          { label: 'E', value: 2 },
          { label: 'F', value: 1 },
        ]}
      />,
      SEED_LIGHT
    );
    expect(getByText('Other (2 categories)')).toBeTruthy();
    expect(spoken(root)).toContain('2 smaller categories folded into Other');
  });

  it('names the fold whatever the caller calls it', () => {
    const fold = foldPieDataV4(
      [
        { label: 'A', value: 9 },
        { label: 'B', value: 8 },
        { label: 'C', value: 7 },
        { label: 'D', value: 6 },
        { label: 'E', value: 2 },
        { label: 'F', value: 1 },
      ],
      'Everything else'
    );
    expect(segmentLegendLabelV4(fold.segments[4]!)).toBe('Everything else (2 categories)');
  });

  // ── §4.2: the figure frame ─────────────────────────────────────────

  it('renders title, summary, caption and a legend with names and shares', () => {
    const { getByText } = renderThemed(
      <PieChartV4
        data={FIVE}
        title="Where signups come from"
        summary="12,480"
        caption="last 30 days"
      />,
      SEED_LIGHT
    );
    expect(getByText('Where signups come from')).toBeTruthy();
    expect(getByText('12,480')).toBeTruthy();
    expect(getByText('last 30 days')).toBeTruthy();
    expect(getByText('Direct')).toBeTruthy();
    expect(getByText('40%')).toBeTruthy();
  });

  it('drops the legend at one segment and keeps it at two', () => {
    const one = renderThemed(<PieChartV4 data={[{ label: 'Only', value: 1 }]} />, SEED_LIGHT);
    expect(one.queryByText('Only')).toBeNull();
    const two = renderThemed(
      <PieChartV4
        data={[
          { label: 'A', value: 1 },
          { label: 'B', value: 1 },
        ]}
      />,
      SEED_LIGHT
    );
    expect(two.getByText('A')).toBeTruthy();
  });

  it('sizes the legend swatch at CHART_MARK.dotSize, never the base’s 12', () => {
    const { root } = renderThemed(<PieChartV4 data={FIVE} />, SEED_LIGHT);
    const swatch = root.findAll(
      (n) =>
        typeof n.type === 'string' &&
        (n.props?.style as { width?: number } | undefined)?.width === CHART_MARK.dotSize
    );
    expect(swatch.length).toBe(FIVE.length);
  });

  // ── §4.5: empty, single datum, loading ─────────────────────────────

  it('renders the empty state at the plot’s footprint rather than a bare string', () => {
    const { root, getByText } = renderThemed(<PieChartV4 data={[]} size={200} />, SEED_LIGHT);
    expect(getByText('No data')).toBeTruthy();
    const box = root.findAll(
      (n) => typeof n.type === 'string' && n.props?.accessibilityLabel === 'No data'
    )[0] as ReactTestInstance;
    expect((box.props.style as { width: number; height: number }).height).toBe(200);
    expect(paths(root).length).toBe(0);
  });

  it('renders the empty state when every value is zero', () => {
    const { getByText } = renderThemed(
      <PieChartV4 data={[{ label: 'A', value: 0 }]} emptyLabel="Nothing yet" />,
      SEED_LIGHT
    );
    expect(getByText('Nothing yet')).toBeTruthy();
  });

  it('keeps the title around the empty state so the figure does not vanish', () => {
    const { getByText } = renderThemed(<PieChartV4 data={[]} title="Signups" />, SEED_LIGHT);
    expect(getByText('Signups')).toBeTruthy();
  });

  it('draws a single datum as a full circle, with no NaN anywhere', () => {
    const { root } = renderThemed(
      <PieChartV4 data={[{ label: 'Only', value: 7 }]} size={160} />,
      SEED_LIGHT
    );
    // An arc path cannot express 360°, so the whole ring is a <Circle>.
    expect(paths(root).length).toBe(0);
    const circle = circles(root)[0] as ReactTestInstance;
    expect(circle.props.fill).toBe(SLOTS[0]);
    expect(JSON.stringify(circle.props)).not.toContain('NaN');
  });

  it('emits no NaN into a path for an ordinary multi-slice pie', () => {
    const { root } = renderThemed(<PieChartV4 data={FIVE} />, SEED_LIGHT);
    for (const p of paths(root)) {
      expect(p.props.d as string).not.toContain('NaN');
      expect(p.props.d as string).not.toContain('Infinity');
    }
  });

  it('swaps the plot for a skeleton at the same footprint when loading', () => {
    const { root } = renderThemed(<PieChartV4 data={FIVE} loading />, SEED_LIGHT);
    expect(paths(root).length).toBe(0);
  });

  // ── §1 rule 6 + §4.8 ───────────────────────────────────────────────

  it('derives an accessible sentence naming the form, the count and the leader', () => {
    const { root } = renderThemed(<PieChartV4 data={FIVE} />, SEED_LIGHT);
    expect(spoken(root)).toBe('Pie chart, 5 slices, largest Direct at 40%');
  });

  it('takes an accessibilityLabel override — the native spelling of aria-label', () => {
    const { root } = renderThemed(
      <PieChartV4 data={FIVE} accessibilityLabel="Signups by channel" />,
      SEED_LIGHT
    );
    expect(spoken(root)).toBe('Signups by channel');
  });

  it('mounts with the reveal off as well as on', () => {
    expect(renderThemed(<PieChartV4 data={FIVE} animate={false} />, SEED_LIGHT).toJSON()).toBeTruthy();
  });
});

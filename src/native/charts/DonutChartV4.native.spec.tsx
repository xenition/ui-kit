import * as React from 'react';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { toNativeTokens } from '../../theme/outputs';
import { CHART_MARK, chartSeries } from '../../primitives/internal/v4-chart';
import { DonutChartV4 } from './DonutChartV4';
import { radialThicknessV4 } from './ProgressRingV4';

const theme = compileTheme(SEED_LIGHT);
const SLOTS = chartSeries(toNativeTokens(theme).ramps.primary[500], 'light');

const SPLIT = [
  { label: 'Used', value: 70 },
  { label: 'Free', value: 30 },
];

/** Host nodes only — the svg mock renders through `View`, itself a composite. */
function byTestId(root: ReactTestInstance, id: string): ReactTestInstance[] {
  return root.findAll((n) => typeof n.type === 'string' && n.props?.testID === id);
}

const paths = (root: ReactTestInstance): ReactTestInstance[] => byTestId(root, 'svg-path');

/**
 * Every rendered string, hidden ones included — the centre number is
 * deliberately `accessibilityElementsHidden` (the plot's label already speaks
 * it) and RNTL's `getByText` skips hidden subtrees.
 */
function texts(root: ReactTestInstance): string[] {
  return root
    .findAll((n) => n.type === 'Text')
    .map((n) =>
      Array.isArray(n.props.children)
        ? (n.props.children as unknown[]).join('')
        : String(n.props.children ?? '')
    );
}

function spoken(root: ReactTestInstance): string {
  const node = root.findAll(
    (n) => typeof n.type === 'string' && typeof n.props?.accessibilityLabel === 'string'
  )[0];
  return (node?.props.accessibilityLabel as string) ?? '';
}

describe('DonutChartV4 (native)', () => {
  // ── §5: the ring itself ────────────────────────────────────────────

  it('draws real annuli, not wedges with a surface disc painted over them', () => {
    const { root } = renderThemed(<DonutChartV4 data={SPLIT} />, SEED_LIGHT);
    // The base drew wedges then covered the middle with a surface-filled
    // <Circle>, which shows as a disc the moment the donut sits on a card.
    expect(byTestId(root, 'svg-circle').length).toBe(0);
    const ds = paths(root).map((p) => p.props.d as string);
    expect(ds.length).toBe(2);
    // Out along one radius, back along the other: two arcs per segment.
    for (const d of ds) expect(d.match(/A/g)?.length).toBe(2);
  });

  it('takes the family’s derived thickness, and a fraction of the radius when told', () => {
    const derived = renderThemed(<DonutChartV4 data={SPLIT} size={200} />, SEED_LIGHT);
    const rOuter = 200 / 2 - CHART_MARK.gap / 2;
    expect(radialThicknessV4(200)).toBe(20);
    expect(paths(derived.root)[0]?.props.d as string).toContain(
      `A${(rOuter - 20).toFixed(2)}`
    );

    // A fraction of the OUTER RADIUS — never the base's px here and fraction
    // on web for the same prop name.
    const half = renderThemed(
      <DonutChartV4 data={SPLIT} size={200} thickness={0.5} />,
      SEED_LIGHT
    );
    expect(paths(half.root)[0]?.props.d as string).toContain(
      `A${(rOuter - rOuter * 0.5).toFixed(2)}`
    );
  });

  it('separates segments with CHART_MARK.gap of page colour', () => {
    const { root } = renderThemed(<DonutChartV4 data={SPLIT} />, SEED_LIGHT);
    const first = paths(root)[0] as ReactTestInstance;
    expect(first.props.stroke).toBe(theme.light.surface);
    expect(first.props.strokeWidth).toBe(CHART_MARK.gap);
  });

  it('paints from the palette in order, never dimmed, and status only via tone', () => {
    const { root } = renderThemed(<DonutChartV4 data={SPLIT} />, SEED_LIGHT);
    expect(paths(root).map((p) => p.props.fill)).toEqual([SLOTS[0], SLOTS[1]]);
    // The base stepped `fillOpacity` down by 0.25 per wrap, which made the
    // fourth segment look disabled.
    for (const p of paths(root)) expect(p.props.fillOpacity).toBeUndefined();

    const toned = renderThemed(
      <DonutChartV4
        data={[
          { label: 'Within budget', value: 80, tone: 'success' },
          { label: 'Overspend', value: 20, tone: 'danger' },
        ]}
      />,
      SEED_LIGHT
    );
    expect(paths(toned.root).map((p) => p.props.fill)).toEqual([
      theme.light.success,
      theme.light.danger,
    ]);
  });

  // ── §5: the centre is a slot for `summary` ─────────────────────────

  it('puts `summary` in the hole and hides the duplicate from VoiceOver', () => {
    const { root } = renderThemed(
      <DonutChartV4 data={SPLIT} summary="70%" title="Storage" />,
      SEED_LIGHT
    );
    expect(texts(root)).toContain('70%');
    expect(
      root.findAll(
        (n) => typeof n.type === 'string' && n.props?.accessibilityElementsHidden === true
      ).length
    ).toBeGreaterThan(0);
    // …and the plot says it out loud instead, once.
    expect(spoken(root)).toContain('70%');
  });

  // ── §7 open question 2: the fold ───────────────────────────────────

  it('folds a six-segment donut and says so in the legend', () => {
    const { root, getByText } = renderThemed(
      <DonutChartV4
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
    expect(paths(root).length).toBe(5);
    expect(getByText('Other (2 categories)')).toBeTruthy();
  });

  // ── §4.2: the figure frame ─────────────────────────────────────────

  it('renders title, caption and a legend of names and shares', () => {
    const { getByText } = renderThemed(
      <DonutChartV4 data={SPLIT} title="Storage" caption="of 2 TB" />,
      SEED_LIGHT
    );
    expect(getByText('Storage')).toBeTruthy();
    expect(getByText('of 2 TB')).toBeTruthy();
    expect(getByText('Used')).toBeTruthy();
    expect(getByText('70%')).toBeTruthy();
  });

  // ── §4.5: empty, single datum, loading ─────────────────────────────

  it('renders the empty state at the plot’s footprint, never a bare string', () => {
    const { root, getByText } = renderThemed(<DonutChartV4 data={[]} size={180} />, SEED_LIGHT);
    expect(getByText('No data')).toBeTruthy();
    const box = root.findAll(
      (n) => typeof n.type === 'string' && n.props?.accessibilityLabel === 'No data'
    )[0] as ReactTestInstance;
    expect((box.props.style as { height: number }).height).toBe(180);
  });

  it('draws a single datum as a whole ring with a real hole, and no NaN', () => {
    const { root } = renderThemed(
      <DonutChartV4 data={[{ label: 'Only', value: 7 }]} size={160} />,
      SEED_LIGHT
    );
    const only = paths(root)[0] as ReactTestInstance;
    expect(only.props.fillRule).toBe('evenodd');
    expect(only.props.fill).toBe(SLOTS[0]);
    // Two full circles in one path: four arc commands, no 360° arc anywhere.
    expect((only.props.d as string).match(/A/g)?.length).toBe(4);
    expect(only.props.d as string).not.toContain('NaN');
  });

  it('emits no NaN when the ring closes the hole entirely', () => {
    const { root } = renderThemed(<DonutChartV4 data={SPLIT} thickness={1} />, SEED_LIGHT);
    for (const p of paths(root)) expect(p.props.d as string).not.toContain('NaN');
  });

  it('swaps the plot for a skeleton when loading, keeping the title', () => {
    const { root, getByText } = renderThemed(
      <DonutChartV4 data={SPLIT} loading title="Storage" />,
      SEED_LIGHT
    );
    expect(paths(root).length).toBe(0);
    expect(getByText('Storage')).toBeTruthy();
  });

  // ── §1 rule 6 ──────────────────────────────────────────────────────

  it('derives the accessible sentence and takes an override', () => {
    const { root } = renderThemed(<DonutChartV4 data={SPLIT} summary="70%" />, SEED_LIGHT);
    expect(spoken(root)).toBe('Donut chart, 2 segments, 70%, largest Used at 70%');

    const overridden = renderThemed(
      <DonutChartV4 data={SPLIT} accessibilityLabel="Disk usage" />,
      SEED_LIGHT
    );
    expect(spoken(overridden.root)).toBe('Disk usage');
  });
});

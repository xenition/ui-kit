import '../spec-support/real-animations';
import * as React from 'react';
import { waitFor } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { XenitionNativeThemeProvider } from '../theme';
import { compileTheme } from '../../theme/compile';
import { toNativeTokens } from '../../theme/outputs';
import { CHART_GRID_MIX, chartSeries } from '../../primitives/internal/v4-chart';
import { withAlpha } from '../primitives/internal/color';
import { GaugeChartV4 } from './GaugeChartV4';
import { radialThicknessV4 } from './ProgressRingV4';

const theme = compileTheme(SEED_LIGHT);
const SLOTS = chartSeries(toNativeTokens(theme).ramps.primary[500], 'light');
/** What `palette.grid` resolves to for this seed — chrome, not a border. */
const GRID = withAlpha(theme.light.onSurface, CHART_GRID_MIX);

/** Host nodes only — the svg mock renders through `View`, itself a composite. */
function byTestId(root: ReactTestInstance, id: string): ReactTestInstance[] {
  return root.findAll((n) => typeof n.type === 'string' && n.props?.testID === id);
}

const paths = (root: ReactTestInstance): ReactTestInstance[] => byTestId(root, 'svg-path');

/**
 * The current value of a prop that may be an `Animated.Value`.
 *
 * `Animated.createAnimatedComponent` normally resolves its props before the
 * wrapped component sees them, so this is usually already a number — but the
 * ring's and gauge's lengths are driven values now, and a spec should assert
 * the number rather than the box it happens to arrive in.
 */
const animatedNumber = (v: unknown): number =>
  typeof v === 'number' ? v : Number((v as { __getValue: () => number }).__getValue());


/**
 * Every rendered string, hidden ones included — the gauge's number is
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

describe('GaugeChartV4 (native)', () => {
  // ── §5: chrome, thickness, and the needle that went ────────────────

  it('takes its track from `palette.grid`, never `colors.border`', () => {
    const { root } = renderThemed(<GaugeChartV4 value={40} />, SEED_LIGHT);
    expect(paths(root)[0]?.props.stroke).toBe(GRID);
    expect(paths(root)[0]?.props.stroke).not.toBe(theme.light.border);
  });

  it('derives the arc thickness from the size rather than shipping an 18', () => {
    const small = renderThemed(<GaugeChartV4 value={40} size={120} />, SEED_LIGHT);
    const large = renderThemed(<GaugeChartV4 value={40} size={300} />, SEED_LIGHT);
    expect(paths(small.root)[0]?.props.strokeWidth).toBe(radialThicknessV4(120));
    expect(paths(large.root)[0]?.props.strokeWidth).toBe(radialThicknessV4(300));
    // …and the two are genuinely different, which is the whole point.
    expect(radialThicknessV4(120)).not.toBe(radialThicknessV4(300));
  });

  it('drops the needle: two arcs, no line', () => {
    const { root } = renderThemed(<GaugeChartV4 value={40} />, SEED_LIGHT);
    expect(paths(root).length).toBe(2);
    expect(byTestId(root, 'svg-line').length).toBe(0);
  });

  it('fills from slot 1, and reaches a status hue only through `tone`', () => {
    const plain = renderThemed(<GaugeChartV4 value={40} />, SEED_LIGHT);
    expect(paths(plain.root)[1]?.props.stroke).toBe(SLOTS[0]);
    const toned = renderThemed(<GaugeChartV4 value={95} tone="danger" />, SEED_LIGHT);
    expect(paths(toned.root)[1]?.props.stroke).toBe(theme.light.danger);
  });

  /*
    The value used to be an arc of its own, ending at `gaugePoint(t)` with a
    large-arc flag that flipped at the halfway mark. It is a dash on the
    track's geometry now — see `GaugeArcV4` — so what this asserts is the same
    claim, measured where the length actually lives: more value, less offset,
    and a full gauge landing at exactly zero.
  */
  it('shortens the dash offset as the value grows, and closes it at the ceiling', () => {
    const offsetOf = (value: number): number => {
      const { root } = renderThemed(<GaugeChartV4 value={value} />, SEED_LIGHT);
      return Number(animatedNumber(paths(root)[1]?.props.strokeDashoffset));
    };

    expect(offsetOf(10)).toBeGreaterThan(offsetOf(90));
    expect(offsetOf(100)).toBe(0);

    // One fixed path, so the dash has something constant to run along: the
    // whole semicircle, every time, whatever the value is.
    const { root } = renderThemed(<GaugeChartV4 value={90} />, SEED_LIGHT);
    expect(paths(root)[1]?.props.d).toBe(paths(root)[0]?.props.d);
  });

  // ── §5: a figure with a summary and NO legend ──────────────────────

  it('has no legend — one series has no identity to disambiguate', () => {
    const { queryByText } = renderThemed(
      <GaugeChartV4 value={40} title="Capacity" />,
      SEED_LIGHT
    );
    expect(queryByText('Series 1')).toBeNull();
  });

  it('draws the value as the summary, takes an override, and drops it on request', () => {
    expect(texts(renderThemed(<GaugeChartV4 value={72} />, SEED_LIGHT).root)).toContain('72');
    expect(
      texts(renderThemed(<GaugeChartV4 value={72} summary="72%" />, SEED_LIGHT).root)
    ).toContain('72%');
    expect(
      texts(renderThemed(<GaugeChartV4 value={72} showValue={false} />, SEED_LIGHT).root)
    ).toEqual([]);
  });

  it('renders title and caption around the plot', () => {
    const { getByText } = renderThemed(
      <GaugeChartV4 value={72} title="Disk in use" caption="of 2 TB" />,
      SEED_LIGHT
    );
    expect(getByText('Disk in use')).toBeTruthy();
    expect(getByText('of 2 TB')).toBeTruthy();
  });

  // ── §4.5: empty, single value, loading ─────────────────────────────

  it('renders the empty state for a scale with no span, instead of lying with `|| 1`', () => {
    const { root, getByText } = renderThemed(
      <GaugeChartV4 value={5} min={10} max={10} />,
      SEED_LIGHT
    );
    expect(getByText('No data')).toBeTruthy();
    expect(paths(root).length).toBe(0);
  });

  it('renders the empty state for an inverted scale, with the caller’s wording', () => {
    const { getByText } = renderThemed(
      <GaugeChartV4 value={5} min={100} max={0} emptyLabel="Bad range" />,
      SEED_LIGHT
    );
    expect(getByText('Bad range')).toBeTruthy();
  });

  it('draws the track alone at the floor of the scale, with no NaN', () => {
    // A gauge is a single value, so this IS its single-datum case: at `min`
    // the value arc's endpoints coincide and it is skipped rather than left to
    // the backend's round-cap behaviour.
    const { root } = renderThemed(<GaugeChartV4 value={0} />, SEED_LIGHT);
    expect(paths(root).length).toBe(1);
    expect(paths(root)[0]?.props.d as string).not.toContain('NaN');
  });

  it('draws a full arc at the ceiling with no NaN', () => {
    const { root } = renderThemed(<GaugeChartV4 value={100} />, SEED_LIGHT);
    expect(paths(root).length).toBe(2);
    for (const p of paths(root)) expect(p.props.d as string).not.toContain('NaN');
  });

  it('clamps out of range and survives a non-finite value', () => {
    expect(spoken(renderThemed(<GaugeChartV4 value={9999} />, SEED_LIGHT).root)).toBe(
      'Gauge, 100 of 100'
    );
    const nan = renderThemed(
      <GaugeChartV4 value={Number.NaN} min={10} max={20} />,
      SEED_LIGHT
    );
    expect(spoken(nan.root)).toBe('Gauge, 10 of 20');
    expect(JSON.stringify(nan.toJSON())).not.toContain('NaN');
  });

  it('swaps the plot for a skeleton when loading, keeping the title', () => {
    const { root, getByText } = renderThemed(
      <GaugeChartV4 value={40} loading title="Capacity" />,
      SEED_LIGHT
    );
    expect(paths(root).length).toBe(0);
    expect(getByText('Capacity')).toBeTruthy();
  });

  // ── §1 rule 6 ──────────────────────────────────────────────────────

  it('states its value in words, and takes an override', () => {
    expect(spoken(renderThemed(<GaugeChartV4 value={72} />, SEED_LIGHT).root)).toBe(
      'Gauge, 72 of 100'
    );
    expect(
      spoken(
        renderThemed(
          <GaugeChartV4 value={72} accessibilityLabel="Disk 72 percent full" />,
          SEED_LIGHT
        ).root
      )
    ).toBe('Disk 72 percent full');
  });

  // ── §36.6: a value that CHANGES has to move ────────────────────────

  /*
    The value used to live in the path `d`, which no animation can travel
    along, so a gauge going 40 to 75 redrew rather than moved. It is the dash
    offset on one fixed path now.
  */
  it('travels the arc to a new value instead of redrawing it', async () => {
    const { root, rerender } = renderThemed(<GaugeChartV4 value={40} />, SEED_LIGHT);
    const offsetNow = (): number =>
      animatedNumber((paths(root)[1] as ReactTestInstance).props.strokeDashoffset);
    const geometry = (paths(root)[1] as ReactTestInstance).props.d as string;
    const start = offsetNow();

    rerender(
      <XenitionNativeThemeProvider theme={SEED_LIGHT}>
        <GaugeChartV4 value={75} />
      </XenitionNativeThemeProvider>
    );

    expect(offsetNow()).toBeCloseTo(start, 0);
    // The path itself never changes — only the dash on it does.
    expect((paths(root)[1] as ReactTestInstance).props.d).toBe(geometry);
    await waitFor(() => expect(offsetNow()).toBeLessThan(start));
  });
});
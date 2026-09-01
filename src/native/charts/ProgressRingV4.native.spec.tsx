import '../spec-support/real-animations';
import * as React from 'react';
import { waitFor } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { XenitionNativeThemeProvider } from '../theme';
import { compileTheme } from '../../theme/compile';
import { toNativeTokens } from '../../theme/outputs';
import { CHART_GRID_MIX, CHART_MARK, chartSeries } from '../../primitives/internal/v4-chart';
import { withAlpha } from '../primitives/internal/color';
import { ProgressRingV4, RADIAL_THICKNESS_RATIO, radialThicknessV4 } from './ProgressRingV4';

const theme = compileTheme(SEED_LIGHT);
const SLOTS = chartSeries(toNativeTokens(theme).ramps.primary[500], 'light');
/** What `palette.grid` resolves to for this seed — chrome, not a border. */
const GRID = withAlpha(theme.light.onSurface, CHART_GRID_MIX);

/** Host nodes only — the svg mock renders through `View`, itself a composite. */
function byTestId(root: ReactTestInstance, id: string): ReactTestInstance[] {
  return root.findAll((n) => typeof n.type === 'string' && n.props?.testID === id);
}

const circles = (root: ReactTestInstance): ReactTestInstance[] => byTestId(root, 'svg-circle');

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
 * Every rendered string, hidden ones included.
 *
 * The centre number is deliberately `accessibilityElementsHidden` — the plot's
 * own label already speaks it — and RNTL's `getByText` skips hidden subtrees,
 * so it cannot see the one node this component exists to draw.
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

describe('ProgressRingV4 (native)', () => {
  // ── §5: the derived thickness ──────────────────────────────────────

  it('derives the thickness from the size and floors it at the smallest mark', () => {
    expect(radialThicknessV4(120)).toBe(120 * RADIAL_THICKNESS_RATIO);
    // Below the floor a track stops reading as a track and becomes a border.
    expect(radialThicknessV4(40)).toBe(CHART_MARK.dotSize);
    expect(radialThicknessV4(Number.NaN)).toBe(CHART_MARK.dotSize);
  });

  it('paints the ring at the derived width, and at an explicit one when given', () => {
    const derived = renderThemed(<ProgressRingV4 value={50} size={200} />, SEED_LIGHT);
    expect(circles(derived.root)[0]?.props.strokeWidth).toBe(radialThicknessV4(200));
    const explicit = renderThemed(
      <ProgressRingV4 value={50} size={200} thickness={4} />,
      SEED_LIGHT
    );
    expect(explicit.root && circles(explicit.root)[0]?.props.strokeWidth).toBe(4);
  });

  // ── §3 decision 3: chrome is chrome ────────────────────────────────

  it('takes its track from `palette.grid`, never `colors.border`', () => {
    const { root } = renderThemed(<ProgressRingV4 value={50} />, SEED_LIGHT);
    expect(circles(root)[0]?.props.stroke).toBe(GRID);
    expect(circles(root)[0]?.props.stroke).not.toBe(theme.light.border);
  });

  it('paints progress from slot 1, and a status hue only through `tone`', () => {
    const plain = renderThemed(<ProgressRingV4 value={50} />, SEED_LIGHT);
    expect(circles(plain.root)[1]?.props.stroke).toBe(SLOTS[0]);
    const toned = renderThemed(<ProgressRingV4 value={95} tone="warn" />, SEED_LIGHT);
    expect(circles(toned.root)[1]?.props.stroke).toBe(theme.light.warn);
  });

  // ── §4.2: it is a MARK, not a figure ───────────────────────────────

  it('takes none of the figure frame, and owns exactly its own square', () => {
    const { root, queryByText } = renderThemed(<ProgressRingV4 value={50} />, SEED_LIGHT);
    // No legend row, because a mark has no series to disambiguate.
    expect(queryByText('Series 1')).toBeNull();
    const shell = root.findAll(
      (n) => typeof n.type === 'string' && n.props?.accessibilityLabel === 'Progress ring, 50%'
    )[0] as ReactTestInstance;
    const style = shell.props.style as { width: number; height: number };
    expect(style.width).toBe(120);
    expect(style.height).toBe(120);
  });

  it('shows the percentage, takes a label override, and drops both on request', () => {
    expect(texts(renderThemed(<ProgressRingV4 value={37} />, SEED_LIGHT).root)).toContain('37%');
    expect(
      texts(renderThemed(<ProgressRingV4 value={37} label="3 of 8" />, SEED_LIGHT).root)
    ).toContain('3 of 8');
    expect(
      texts(renderThemed(<ProgressRingV4 value={37} showValue={false} />, SEED_LIGHT).root)
    ).toEqual([]);
  });

  // ── §4.5: empty, single value, loading ─────────────────────────────

  it('renders the empty state for a scale with no ceiling, keeping the footprint', () => {
    const { root, getByText } = renderThemed(
      <ProgressRingV4 value={5} max={0} size={90} />,
      SEED_LIGHT
    );
    expect(getByText('No data')).toBeTruthy();
    const box = root.findAll(
      (n) => typeof n.type === 'string' && n.props?.accessibilityLabel === 'No data'
    )[0] as ReactTestInstance;
    expect((box.props.style as { height: number }).height).toBe(90);
    expect(circles(root).length).toBe(0);
  });

  it('takes the empty state’s wording from the caller', () => {
    expect(
      renderThemed(
        <ProgressRingV4 value={5} max={-1} emptyLabel="Not measured" />,
        SEED_LIGHT
      ).getByText('Not measured')
    ).toBeTruthy();
  });

  it('draws the track alone at zero, so a round cap cannot fake a small non-zero', () => {
    const { root } = renderThemed(<ProgressRingV4 value={0} />, SEED_LIGHT);
    expect(circles(root).length).toBe(1);
  });

  /*
    The dash array used to carry the value — `${c * ratio} ${c}` — which is a
    two-number string and so nothing an animation can travel along. The array
    is the constant circumference now and the value is the OFFSET, which is one
    number; see `RingArcV4`. Same claim either way: a full ring closes exactly.
  */
  it('closes the ring exactly at the ceiling, with no NaN in the dash', () => {
    const { root } = renderThemed(<ProgressRingV4 value={100} size={120} />, SEED_LIGHT);
    const progress = circles(root)[1] as ReactTestInstance;
    const r = (120 - radialThicknessV4(120)) / 2;
    const c = 2 * Math.PI * r;
    expect(progress.props.strokeDasharray).toBe(c);
    expect(Number(animatedNumber(progress.props.strokeDashoffset))).toBe(0);
    expect(Number.isNaN(Number(animatedNumber(progress.props.strokeDashoffset)))).toBe(false);
  });

  it('clamps out of range and survives a non-finite value', () => {
    expect(spoken(renderThemed(<ProgressRingV4 value={400} />, SEED_LIGHT).root)).toBe(
      'Progress ring, 100%'
    );
    const nan = renderThemed(<ProgressRingV4 value={Number.NaN} />, SEED_LIGHT);
    expect(spoken(nan.root)).toBe('Progress ring, 0%');
    expect(JSON.stringify(nan.toJSON())).not.toContain('NaN');
  });

  it('does not paint outside its own footprint at a very thick ring', () => {
    const { root } = renderThemed(
      <ProgressRingV4 value={50} size={40} thickness={80} />,
      SEED_LIGHT
    );
    // Floored at zero rather than going negative, which would put `NaN` in the
    // dash array via the circumference.
    expect(circles(root)[0]?.props.r).toBe(0);
  });

  it('swaps the ring for a skeleton when loading', () => {
    const { root } = renderThemed(<ProgressRingV4 value={50} loading />, SEED_LIGHT);
    expect(circles(root).length).toBe(0);
  });

  // ── §1 rule 6: a mark still says its value in words ─────────────────

  it('states its value in words even though it carries no title', () => {
    expect(spoken(renderThemed(<ProgressRingV4 value={37} />, SEED_LIGHT).root)).toBe(
      'Progress ring, 37%'
    );
    expect(
      spoken(
        renderThemed(
          <ProgressRingV4 value={37} accessibilityLabel="3 of 8 tasks done" />,
          SEED_LIGHT
        ).root
      )
    ).toBe('3 of 8 tasks done');
  });

  // ── §36.6: a value that CHANGES has to move ────────────────────────

  /*
    The dash used to carry the value inside a two-number string, which nothing
    can travel along, so a ring going 40% to 75% arrived at 75% with no
    movement. The value is the dash OFFSET now; what proves it travels is that
    the offset is still its old number on the frame after the change.
  */
  it('travels the arc to a new value instead of jumping to it', async () => {
    const { root, rerender } = renderThemed(<ProgressRingV4 value={40} />, SEED_LIGHT);
    const offsetNow = (): number =>
      animatedNumber((circles(root)[1] as ReactTestInstance).props.strokeDashoffset);
    const start = offsetNow();

    rerender(
      <XenitionNativeThemeProvider theme={SEED_LIGHT}>
        <ProgressRingV4 value={75} />
      </XenitionNativeThemeProvider>
    );

    expect(offsetNow()).toBeCloseTo(start, 0);
    await waitFor(() => expect(offsetNow()).toBeLessThan(start));
  });
});
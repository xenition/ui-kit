import * as React from 'react';
import { Animated, View, type StyleProp, type ViewStyle } from 'react-native';
import { SkeletonV4 } from '../primitives/SkeletonV4';
import { useXenitionTheme } from '../theme';
import { chartSlotColor, useChartPaletteV4, type ChartPaletteV4 } from './internal-v4';
import { CHART_MARK, type ChartToneV4 } from '../../primitives/internal/v4-chart';
import { EASING_ENTER, V4_MOTION } from '../primitives/internal/motion-v4';
import { useReducedMotion } from '../primitives/internal/useReducedMotion';

/**
 * ## Why three shared helpers live in the smallest file
 *
 * `ChartToneV4` (re-exported from the shared palette module),
 * {@link seriesInkV4} and {@link useChartRevealV4} are used by every native
 * chart in the line family, and the obvious home for the two behavioural ones
 * is `LineChartV4` — the figure the rest compose from. They are here instead,
 * and `LineChartV4` imports them **from** this file.
 *
 * The reason is the optional peer below. `LineChartV4` hard-imports
 * `react-native-svg`, so anything imported from it drags the peer in at module
 * load; a `SparklineV4` that imported its own colour resolver from there would
 * throw on `require` in exactly the app the `View` fallback exists for, and the
 * fallback would never run. That is not a hypothetical — it is what the spec
 * that mocks the module away found on the first run.
 *
 * So the dependency points the other way: the peer-free mark holds what
 * everything shares, and the peer-requiring figures build on it. The web twin
 * has no such constraint and keeps the helpers in `LineChartV4`; that
 * asymmetry is plumbing, and prop parity is unaffected by it.
 */


/**
 * The OPTIONAL `react-native-svg` peer, resolved once.
 *
 * Brief §7's open question 6 is answered here: `SparklineV4` and `MiniBarV4`
 * keep a `View` fallback; every other native chart states the requirement in
 * its doc comment and simply imports. The reason those two are the exceptions
 * is that they are **marks**, not figures — the smallest, most embeddable
 * things in the module, the ones most likely to end up in an app that has not
 * installed a native module for a 100×28 trend line. A figure that cannot draw
 * is a hole in a dashboard; a mark that cannot draw can still say the shape.
 *
 * Resolved with the same lazy `require` the kit already uses for
 * `expo-linear-gradient` (`native/commerce/internal/Gradient.tsx`), so the
 * pattern is one pattern rather than two. Jest maps the specifier to a mock,
 * so the SVG path is what the specs exercise; the fallback is proven by the
 * spec that mocks the module away.
 */
interface SvgModule {
  default: React.ComponentType<Record<string, unknown>>;
  Circle: React.ComponentType<Record<string, unknown>>;
  Line: React.ComponentType<Record<string, unknown>>;
  Polyline: React.ComponentType<Record<string, unknown>>;
}

let svg: SvgModule | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  svg = require('react-native-svg') as SvgModule;
} catch {
  svg = null;
}

/** Whether the SVG path is available. Exported so a spec can assert both branches. */
export const SPARKLINE_V4_HAS_SVG = svg !== null;

/**
 * Status hues — the only status ink a V4 chart has (brief §4.3).
 *
 * Declared here while the line family built, because
 * `primitives/internal/v4-chart.ts` was closed to the build groups mid-pass;
 * canonical there now. Re-exported under the same name so the six native files
 * that import it from this one — and `LineChartV4`, which re-exports it
 * again — keep working unchanged.
 */
export type { ChartToneV4 };

/**
 * The ink for series `i`: its slot, or its status hue when it declared one.
 *
 * {@link chartSlotColor} throws past the fifth slot rather than wrapping — a
 * sixth series arrives as a loud `RangeError` naming the fix instead of as two
 * lines quietly sharing a colour (§1 rule 4).
 */
export function seriesInkV4(
  palette: ChartPaletteV4,
  statusColors: Record<ChartToneV4, string>,
  index: number,
  tone?: ChartToneV4
): string {
  return tone !== undefined ? statusColors[tone] : chartSlotColor(palette, index);
}

/**
 * The entrance reveal, shared by every figure and mark in the native line
 * family.
 *
 * Brief §4.7 asks for a reveal that happens **once**, never a per-mark stagger
 * and never a line that draws itself: "a chart that animates every update is a
 * chart nobody can read while it moves." Data updates do not animate at all in
 * this pass.
 *
 * The one place the twins differ is the shape of the reveal. Web wipes the
 * plot in with `transform-origin: bottom; scaleY(0.94)`, which reads as the
 * marks growing off their own baseline. React Native has **no
 * transform-origin** — `scaleY` is always about the centre — so a bottom
 * anchored wipe would need a measured `translateY` recomputed on every layout,
 * which is a measurement pass bought for an entrance nobody watches twice. So
 * native reveals as a fade. That is also exactly what `prefers-reduced-motion`
 * turns the web reveal into, so the two twins agree in the case that matters
 * most, and the difference is only in the untroubled one.
 *
 * Never removed entirely, in either scheme: an element that appears with no
 * transition at all reads as a glitch (`design.md` §36.10).
 */
export function useChartRevealV4(animate: boolean): Animated.Value {
  const reduced = useReducedMotion();
  const value = React.useRef(new Animated.Value(animate ? 0 : 1)).current;
  React.useEffect(() => {
    if (!animate) {
      value.setValue(1);
      return undefined;
    }
    const entrance = Animated.timing(value, {
      toValue: 1,
      duration: reduced ? V4_MOTION.standard : V4_MOTION.enter,
      easing: EASING_ENTER,
      useNativeDriver: true,
    });
    entrance.start();
    // Stopped on unmount. An entrance still running when the chart goes away
    // keeps driving its `Animated.Value` against a tree that no longer exists:
    // a wasted frame loop in an app, and under Jest a live `requestAnimationFrame`
    // chain — which the RN preset implements as a plain ref'd `setTimeout` — that
    // outlives the test and holds the worker's event loop open.
    return () => {
      entrance.stop();
    };
  }, [animate, reduced, value]);
  return value;
}

export interface SparklineV4Props {
  /** Trend values, drawn left to right as one compact line. */
  data: number[];
  /** The plot's width in px. */
  width?: number;
  /** The plot's height in px. */
  height?: number;
  /**
   * Which categorical slot the line is painted from. Default `0` — the brand
   * hue itself, which is why a sparkline in a `TrendCardV4` matches the card
   * it sits in (`CHART_HUE_OFFSETS`: "slot 1 is the brand hue at +0").
   */
  slot?: number;
  /**
   * Paint the line with a **status** hue instead of its slot, because the
   * series genuinely means good or bad. It ships with a label from whatever
   * figure the mark sits inside, never colour alone (brief §1 rule 3).
   */
  tone?: ChartToneV4;
  /** Value at the top of the box. Defaults to the largest datum. */
  max?: number;
  /** Value at the bottom of the box. Defaults to the smallest datum. */
  min?: number;
  /** Show the loading placeholder at the mark's own footprint. */
  loading?: boolean;
  /** Play the entrance reveal. Default `true`. */
  animate?: boolean;
  /** The spoken sentence. Derived when omitted (brief §1 rule 6). */
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * How much of the box the line is inset by, so a datum at the very top or the
 * very bottom is not clipped.
 *
 * Geometry, and expressed as half a dot rather than as `const pad = 2` because
 * what actually has to fit is the painted dot of a single-datum series.
 */
const PAD = CHART_MARK.dotSize / 2;

/** Clamp into `[0, 1]`, treating a non-finite input as 0. */
const clamp01 = (n: number): number => (Number.isFinite(n) ? Math.min(Math.max(n, 0), 1) : 0);

/**
 * **V4 sparkline (native)** — a **mark**, not a figure, and the component this
 * pass changes most.
 *
 * ## The twins were two different pictures
 *
 * Brief §5 Group A: "native's base fakes it with `View` bars, which is why a
 * native sparkline and a web one do not look like the same component." That is
 * the defect. Web draws a polyline; native draws a bar chart and calls it a
 * sparkline — same name, same props, two different marks, and a product that
 * ships both sees a trend line on the web and a barcode on the phone. This V4
 * moves to `react-native-svg` like its siblings, so the two twins finally draw
 * the same thing.
 *
 * The `View`-bar path is **kept, and only as the documented fallback** for
 * when the optional peer is absent (§7 open question 6). It is not the design;
 * it is what happens when the design cannot be drawn, and it is better than
 * nothing because a column of bars still carries the shape of a trend.
 *
 * ## The other three fixes
 *
 * 1. **Colour was a semantic token.** `colors[color]` over the `SemanticColors`
 *    keys, which let a caller paint a neutral trend `danger` (§1 rules 2–3).
 *    A sparkline is a one-series mark, so it takes **slot 1** — the brand hue
 *    at `+0` rotation, so it lands where the base landed *and* now belongs to
 *    the same palette as every other chart in the product.
 * 2. **`gap: 1` and `borderRadius: tokens.radius.sm` per bar.** The first is a
 *    literal; the second rounds a bar at its baseline, which brief §4.4 is
 *    explicit about — "a bar rounded at the baseline floats off its axis".
 *    Both are gone with the bars themselves; the fallback below uses
 *    {@link CHART_MARK.gap} and squares the baseline.
 * 3. **The empty state dropped the footprint.** The base renders a `muted`
 *    "No data" `Text`, so a row of sparklines reflows the instant one has no
 *    history. §4.5's rule is that all three states keep the footprint.
 *
 * ## The empty state is a rule, not a sentence
 *
 * §4.5 asks for the `ChartEmptyV4` equivalent and forbids a bare string or
 * `null`. At a mark's size neither is available: a `sm` label does not fit in
 * 28 pixels of height, and shrinking it would be inventing a font size. So the
 * documented mark-scale reading of that rule is a **recessive baseline rule at
 * `palette.grid` across the mark's own footprint** — visibly "a sparkline with
 * nothing in it" rather than a gap — with the "no data" sentence carried where
 * §4.8 says a chart's meaning lives anyway: the accessibility label.
 * `MiniBarV4` reads the rule the same way, for the same reason.
 */
export function SparklineV4({
  data,
  width = 100,
  height = 28,
  slot = 0,
  tone,
  max,
  min,
  loading = false,
  animate = true,
  accessibilityLabel,
  style,
}: SparklineV4Props): React.ReactElement {
  const { colors } = useXenitionTheme();
  const palette = useChartPaletteV4();
  const reveal = useChartRevealV4(animate);
  // Copied to a const so the null check narrows: `svg` is a module-level
  // `let`, and TypeScript does not carry a narrowing across a function
  // boundary for one of those.
  const lib = svg;

  const statusColors: Record<ChartToneV4, string> = {
    success: colors.success,
    warn: colors.warn,
    danger: colors.danger,
  };
  const ink = seriesInkV4(palette, statusColors, slot, tone);

  if (loading) {
    return (
      <View style={style}>
        <SkeletonV4 variant="rect" width={width} height={height} />
      </View>
    );
  }

  if (data.length === 0) {
    return (
      <View
        accessibilityRole="image"
        accessibilityLabel={accessibilityLabel ?? 'Sparkline, no data'}
        testID="sparkline-empty"
        style={[{ width, height, justifyContent: 'flex-end' }, style]}
      >
        <View style={{ height: 1, backgroundColor: palette.grid }} />
      </View>
    );
  }

  const hi = max ?? Math.max(...data);
  const lo = min ?? Math.min(...data);
  // A flat series divides by 1 and sits on the centre line. §4.5, asserted.
  const span = hi - lo || 1;
  const inner = Math.max(height - PAD * 2, 1);

  const derived = `Sparkline, ${data.length} point${data.length === 1 ? '' : 's'}, ${Math.min(
    ...data
  )} to ${Math.max(...data)}`;

  const points = data.map((v, i) => ({
    // §4.5: one datum is a dot at the centre, not `i / 0`.
    x: data.length === 1 ? width / 2 : PAD + (i / (data.length - 1)) * Math.max(width - PAD * 2, 1),
    y: height - PAD - clamp01((v - lo) / span) * inner,
  }));

  const body =
    lib === null ? (
      /*
        The fallback. Not the design — see the component doc. Bars because a
        `View` cannot draw a diagonal, `CHART_MARK.gap` of surface between them
        because that is the module's one separator, and square at the baseline
        because §4.4 says a bar is only rounded at its data end and at this
        size a 4-radius cap would eat the shortest bars whole.
      */
      <View
        testID="sparkline-fallback"
        style={{
          width,
          height,
          flexDirection: 'row',
          alignItems: 'flex-end',
          gap: CHART_MARK.gap,
        }}
      >
        {data.map((v, i) => (
          <View
            key={i}
            style={{
              flex: 1,
              height: Math.max(clamp01((v - lo) / span) * inner, 1),
              backgroundColor: ink,
              borderTopLeftRadius: CHART_MARK.endRadius,
              borderTopRightRadius: CHART_MARK.endRadius,
            }}
          />
        ))}
      </View>
    ) : (
      <lib.default width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {points.length === 1 ? (
          <lib.Circle
            testID="sparkline-dot"
            cx={(points[0] as { x: number; y: number }).x}
            cy={(points[0] as { x: number; y: number }).y}
            r={CHART_MARK.dotSize / 2}
            fill={ink}
            stroke={palette.ring}
            strokeWidth={CHART_MARK.ring}
          />
        ) : (
          <lib.Polyline
            testID="sparkline-line"
            points={points.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ')}
            fill="none"
            stroke={ink}
            strokeWidth={CHART_MARK.stroke}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        )}
      </lib.default>
    );

  return (
    <View
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel ?? derived}
      style={[{ width, height }, style]}
    >
      <Animated.View style={{ opacity: reveal, width, height }}>
        {body}
      </Animated.View>
    </View>
  );
}

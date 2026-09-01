import * as React from 'react';
import { Animated, type StyleProp, type ViewStyle } from 'react-native';
import { type ChartPaletteV4 } from './internal-v4';
import { type ChartToneV4 } from '../../primitives/internal/v4-chart';
/** Whether the SVG path is available. Exported so a spec can assert both branches. */
export declare const SPARKLINE_V4_HAS_SVG: boolean;
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
export declare function seriesInkV4(palette: ChartPaletteV4, statusColors: Record<ChartToneV4, string>, index: number, tone?: ChartToneV4): string;
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
export declare function useChartRevealV4(animate: boolean): Animated.Value;
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
export declare function SparklineV4({ data, width, height, slot, tone, max, min, loading, animate, accessibilityLabel, style, }: SparklineV4Props): React.ReactElement;
//# sourceMappingURL=SparklineV4.d.ts.map
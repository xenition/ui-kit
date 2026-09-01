"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SPARKLINE_V4_HAS_SVG = void 0;
exports.seriesInkV4 = seriesInkV4;
exports.useChartRevealV4 = useChartRevealV4;
exports.SparklineV4 = SparklineV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const SkeletonV4_1 = require("../primitives/SkeletonV4");
const theme_1 = require("../theme");
const internal_v4_1 = require("./internal-v4");
const v4_chart_1 = require("../../primitives/internal/v4-chart");
const motion_v4_1 = require("../primitives/internal/motion-v4");
const useReducedMotion_1 = require("../primitives/internal/useReducedMotion");
let svg = null;
try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    svg = require('react-native-svg');
}
catch {
    svg = null;
}
/** Whether the SVG path is available. Exported so a spec can assert both branches. */
exports.SPARKLINE_V4_HAS_SVG = svg !== null;
/**
 * The ink for series `i`: its slot, or its status hue when it declared one.
 *
 * {@link chartSlotColor} throws past the fifth slot rather than wrapping — a
 * sixth series arrives as a loud `RangeError` naming the fix instead of as two
 * lines quietly sharing a colour (§1 rule 4).
 */
function seriesInkV4(palette, statusColors, index, tone) {
    return tone !== undefined ? statusColors[tone] : (0, internal_v4_1.chartSlotColor)(palette, index);
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
function useChartRevealV4(animate) {
    const reduced = (0, useReducedMotion_1.useReducedMotion)();
    const value = React.useRef(new react_native_1.Animated.Value(animate ? 0 : 1)).current;
    React.useEffect(() => {
        if (!animate) {
            value.setValue(1);
            return undefined;
        }
        const entrance = react_native_1.Animated.timing(value, {
            toValue: 1,
            duration: reduced ? motion_v4_1.V4_MOTION.standard : motion_v4_1.V4_MOTION.enter,
            easing: motion_v4_1.EASING_ENTER,
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
/**
 * How much of the box the line is inset by, so a datum at the very top or the
 * very bottom is not clipped.
 *
 * Geometry, and expressed as half a dot rather than as `const pad = 2` because
 * what actually has to fit is the painted dot of a single-datum series.
 */
const PAD = v4_chart_1.CHART_MARK.dotSize / 2;
/** Clamp into `[0, 1]`, treating a non-finite input as 0. */
const clamp01 = (n) => (Number.isFinite(n) ? Math.min(Math.max(n, 0), 1) : 0);
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
function SparklineV4({ data, width = 100, height = 28, slot = 0, tone, max, min, loading = false, animate = true, accessibilityLabel, style, }) {
    const { colors } = (0, theme_1.useXenitionTheme)();
    const palette = (0, internal_v4_1.useChartPaletteV4)();
    const reveal = useChartRevealV4(animate);
    // Copied to a const so the null check narrows: `svg` is a module-level
    // `let`, and TypeScript does not carry a narrowing across a function
    // boundary for one of those.
    const lib = svg;
    const statusColors = {
        success: colors.success,
        warn: colors.warn,
        danger: colors.danger,
    };
    const ink = seriesInkV4(palette, statusColors, slot, tone);
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: style, children: (0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "rect", width: width, height: height }) }));
    }
    if (data.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: accessibilityLabel ?? 'Sparkline, no data', testID: "sparkline-empty", style: [{ width, height, justifyContent: 'flex-end' }, style], children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 1, backgroundColor: palette.grid } }) }));
    }
    const hi = max ?? Math.max(...data);
    const lo = min ?? Math.min(...data);
    // A flat series divides by 1 and sits on the centre line. §4.5, asserted.
    const span = hi - lo || 1;
    const inner = Math.max(height - PAD * 2, 1);
    const derived = `Sparkline, ${data.length} point${data.length === 1 ? '' : 's'}, ${Math.min(...data)} to ${Math.max(...data)}`;
    const points = data.map((v, i) => ({
        // §4.5: one datum is a dot at the centre, not `i / 0`.
        x: data.length === 1 ? width / 2 : PAD + (i / (data.length - 1)) * Math.max(width - PAD * 2, 1),
        y: height - PAD - clamp01((v - lo) / span) * inner,
    }));
    const body = lib === null ? (
    /*
      The fallback. Not the design — see the component doc. Bars because a
      `View` cannot draw a diagonal, `CHART_MARK.gap` of surface between them
      because that is the module's one separator, and square at the baseline
      because §4.4 says a bar is only rounded at its data end and at this
      size a 4-radius cap would eat the shortest bars whole.
    */
    (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "sparkline-fallback", style: {
            width,
            height,
            flexDirection: 'row',
            alignItems: 'flex-end',
            gap: v4_chart_1.CHART_MARK.gap,
        }, children: data.map((v, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                flex: 1,
                height: Math.max(clamp01((v - lo) / span) * inner, 1),
                backgroundColor: ink,
                borderTopLeftRadius: v4_chart_1.CHART_MARK.endRadius,
                borderTopRightRadius: v4_chart_1.CHART_MARK.endRadius,
            } }, i))) })) : ((0, jsx_runtime_1.jsx)(lib.default, { width: width, height: height, viewBox: `0 0 ${width} ${height}`, children: points.length === 1 ? ((0, jsx_runtime_1.jsx)(lib.Circle, { testID: "sparkline-dot", cx: points[0].x, cy: points[0].y, r: v4_chart_1.CHART_MARK.dotSize / 2, fill: ink, stroke: palette.ring, strokeWidth: v4_chart_1.CHART_MARK.ring })) : ((0, jsx_runtime_1.jsx)(lib.Polyline, { testID: "sparkline-line", points: points.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' '), fill: "none", stroke: ink, strokeWidth: v4_chart_1.CHART_MARK.stroke, strokeLinejoin: "round", strokeLinecap: "round" })) }));
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: accessibilityLabel ?? derived, style: [{ width, height }, style], children: (0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: reveal, width, height }, children: body }) }));
}
//# sourceMappingURL=SparklineV4.js.map
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
exports.BarChartV4 = BarChartV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const v4_chart_1 = require("../../primitives/internal/v4-chart");
const SkeletonV4_1 = require("../primitives/SkeletonV4");
const TextV4_1 = require("../primitives/TextV4");
const motion_v4_1 = require("../primitives/internal/motion-v4");
const nav_v4_1 = require("../primitives/internal/nav-v4");
const useReducedMotion_1 = require("../primitives/internal/useReducedMotion");
const theme_1 = require("../theme");
const internal_v4_1 = require("./internal-v4");
/**
 * `value / ceiling`, clamped, and **zero when the ceiling is not a usable
 * divisor**.
 *
 * The base floors the ceiling at 1 (`Math.max(max ?? Math.max(...data), 1)`),
 * so a chart of `[0.4]` renders a bar at 40% of the plot — a lie about a
 * single-datum series. Guarding the divisor instead keeps the honest answer (a
 * flat chart is flat) and still never produces `NaN` or `Infinity`, which is
 * the single-datum defect the spec asserts against.
 */
function barRatio(value, ceiling) {
    if (!Number.isFinite(value) || !Number.isFinite(ceiling) || ceiling <= 0)
        return 0;
    return Math.min(Math.max(value / ceiling, 0), 1);
}
/** The largest finite datum, or 0 when there is nothing to measure. */
function ceilingOf(values, override) {
    if (override !== undefined && Number.isFinite(override))
        return override;
    const finite = values.filter((v) => Number.isFinite(v));
    return finite.length > 0 ? Math.max(...finite) : 0;
}
/**
 * The sentence a screen reader gets (brief §1 rule 6, §4.8).
 *
 * HIG is explicit that a rendered chart plus a visible title is *not*
 * accessible — the textual representation is the accessibility story. So the
 * default names the form, the headline, the count and the range, and it
 * singularises at one datum rather than announcing "1 bars".
 */
function barChartLabel(data, title, format) {
    const finite = data.filter((v) => Number.isFinite(v));
    const head = `Bar chart${title ? `, ${title}` : ''}`;
    const count = `${data.length} ${data.length === 1 ? 'bar' : 'bars'}`;
    if (finite.length === 0)
        return `${head}, ${count}`;
    const lo = Math.min(...finite);
    const hi = Math.max(...finite);
    const range = lo === hi ? format(lo) : `${format(lo)} to ${format(hi)}`;
    return `${head}, ${count}, ${range}`;
}
/**
 * The entrance reveal (brief §4.7), as an opacity ramp.
 *
 * Web wipes the plot in with `transform: scaleY(0.94)` and
 * `transform-origin: bottom`; React Native has no transform origin, so the same
 * scale would grow the plot out of its own centre and lift the bars off the
 * axis for 400ms — the exact thing `CHART_MARK.endRadius` exists to prevent.
 * So native's reveal is the fade, which is also what the web twin degrades to
 * under reduced motion: the two platforms converge on one look rather than
 * diverging into two.
 *
 * Reduced motion shortens it to `standard` rather than removing it. An element
 * that appears with no transition at all reads as a glitch (`design.md`
 * §36.10) — the same relief every other V4 surface takes.
 *
 * Deliberately local to this file rather than added to `charts/internal-v4.ts`:
 * three other agents are building in this module concurrently and a shared file
 * edited by four hands is a merge conflict, not a refactor. Folding the five
 * copies into one hook is a coordinator's job once the pass lands.
 */
function useChartRevealV4(animate) {
    const reduced = (0, useReducedMotion_1.useReducedMotion)();
    const progress = React.useRef(new react_native_1.Animated.Value(animate ? 0 : 1)).current;
    React.useEffect(() => {
        if (!animate) {
            progress.setValue(1);
            return undefined;
        }
        const anim = react_native_1.Animated.timing(progress, {
            toValue: 1,
            duration: reduced ? motion_v4_1.V4_MOTION.standard : motion_v4_1.V4_MOTION.enter,
            easing: reduced ? motion_v4_1.EASING_STANDARD : motion_v4_1.EASING_ENTER,
            useNativeDriver: true,
        });
        anim.start();
        return () => anim.stop();
    }, [animate, reduced, progress]);
    return progress;
}
/**
 * **V4 vertical bar chart (native)** — the twin of `charts/BarChartV4`, prop
 * for prop.
 *
 * The base is five decisions the V4 line exists to retire:
 *
 * 1. **`color?: ChartColor` as an identity.** `colors[color]` paints every bar
 *    with a semantic slot, so a second bar chart on the screen reached for
 *    `warn` and became a chart that reads as a warning. V4 has one categorical
 *    answer — slot 1 from the shared palette — and one status answer,
 *    {@link BarChartV4Props.tone}, which is opt-in and means something.
 * 2. **Colour by value.** Brief §4.1 forbids it, and a bar chart is where the
 *    temptation is strongest: bar *length* already encodes magnitude. A
 *    single-series bar chart is **one colour** for every bar.
 * 3. **`colors.muted` as the axis.** `muted` is a de-emphasised *text* colour
 *    with no contrast promise as a rule. The axis is chrome and chrome is
 *    `palette.axis` — the derived neutral at `CHART_AXIS_MIX`, one step more
 *    present than the grid behind it (brief §3.3).
 * 4. **`radius.sm` on the bar top.** Right idea, wrong source: the mark
 *    geometry belongs to `CHART_MARK`, so one bar chart in the kit cannot round
 *    at 4 while the next rounds at whatever the seed's `radius.sm` compiled to
 *    — on a `sharp` seed the base's bars have no rounded end at all.
 *    `CHART_MARK.endRadius` rounds the **data end only**; a bar rounded at the
 *    baseline floats off its axis (brief §4.4).
 * 5. **`gap: tokens.spacing.xs` between bars.** A spacing token doing a mark's
 *    job, and 4 where the mark spec says 2. `CHART_MARK.gap` is the surface
 *    showing between two fills, and it is one of the secondary encodings the
 *    palette's 6–8 CVD band obliges (brief §1 rule 5).
 *
 * Press is native's answer to web's hover (brief §4.6): a bar reveals its
 * precise value and fires {@link BarChartV4Props.onSelect}. Each bar's target
 * is its full-height column slot, carried out to rule 10's 44 floor
 * *vertically* by `hitSlop`; horizontally it stays inside its slot, because a
 * `hitSlop` wider than the slot overlaps the neighbouring bar's target and
 * starts answering the wrong bar.
 *
 * No `react-native-svg`. A bar chart has no curves, no path data and no
 * clipping, so flex `View`s draw it exactly — and unlike an SVG under
 * `preserveAspectRatio`, they keep `CHART_MARK.gap` at 2 real pixels and
 * `CHART_MARK.endRadius` at a real 4px corner at every container width.
 */
function BarChartV4({ data, labels, height = 120, max, tone, showValues, format = String, title, summary, caption, loading = false, emptyLabel = 'No data', animate = true, tooltip = true, indicator = 'dot', onSelect, accessibilityLabel, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const palette = (0, internal_v4_1.useChartPaletteV4)();
    const progress = useChartRevealV4(animate);
    const [selected, setSelected] = React.useState(null);
    const label = accessibilityLabel ?? barChartLabel(data, title, format);
    // Status is a *fill* here (rule 3); the visible value label beside it is what
    // discharges the "never colour alone" obligation.
    const fill = tone ? colors[tone] : (0, internal_v4_1.chartSlotColor)(palette, 0);
    // How far the press target grows past the painted plot to reach the 44 floor.
    const slop = Math.max(0, ((0, nav_v4_1.minTap)(tokens.spacing) - height) / 2);
    const header = title || summary || caption ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [title ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", numberOfLines: 1, children: title })) : null, summary ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "2xl", weight: "bold", numeric: "tabular", children: summary })) : null, caption ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: caption })) : null] })) : null;
    const frame = (children) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: label, style: [{ gap: tokens.spacing.sm }, style], children: [header, children] }));
    // Loading and empty both keep the plot's footprint. A chart that collapses to
    // zero height while its data is in flight is the most common dashboard jank
    // and is free to avoid (brief §4.5).
    if (loading)
        return frame((0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "rect", width: "100%", height: height }));
    if (data.length === 0) {
        return frame((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: emptyLabel }) }));
    }
    const ceiling = ceilingOf(data, max);
    const directLabels = showValues ?? data.length <= v4_chart_1.CHART_DIRECT_LABEL_MAX;
    const bubble = tooltip && selected !== null && data[selected] !== undefined ? selected : null;
    return frame((0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [bubble !== null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: v4_chart_1.CHART_MARK.gap }, children: data.map((_, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, alignItems: 'center' }, children: i === bubble ? ((0, jsx_runtime_1.jsxs)(internal_v4_1.ChartTipV4, { style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.xs,
                            backgroundColor: colors.popover,
                            borderColor: colors.border,
                            borderWidth: 1,
                            borderRadius: tokens.radius.md,
                            paddingHorizontal: tokens.spacing.sm,
                            paddingVertical: tokens.spacing.xs,
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: indicator === 'dot'
                                    ? {
                                        width: v4_chart_1.CHART_MARK.dotSize,
                                        height: v4_chart_1.CHART_MARK.dotSize,
                                        borderRadius: v4_chart_1.CHART_MARK.dotSize,
                                        backgroundColor: fill,
                                    }
                                    : {
                                        width: v4_chart_1.CHART_MARK.dotSize,
                                        height: v4_chart_1.CHART_MARK.stroke,
                                        backgroundColor: indicator === 'dashed' ? undefined : fill,
                                        borderTopWidth: indicator === 'dashed' ? v4_chart_1.CHART_MARK.stroke : 0,
                                        borderStyle: 'dashed',
                                        borderColor: fill,
                                    } }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "onPopover", numeric: "tabular", children: `${labels?.[bubble] ? `${labels[bubble]}: ` : ''}${format(data[bubble])}` })] })) : null }, i))) })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { testID: "xen-v4-chart-plot", style: { height, opacity: progress }, children: [directLabels ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: v4_chart_1.CHART_MARK.gap }, children: data.map((value, i) => ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", align: "center", numeric: "tabular", numberOfLines: 1, style: { flex: 1 }, children: format(value) }, i))) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-v4-bar-row", style: { flex: 1, flexDirection: 'row', alignItems: 'flex-end', gap: v4_chart_1.CHART_MARK.gap }, children: data.map((value, i) => ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { testID: "xen-v4-bar-hit", accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", 
                            // Rule 10's 44 floor, as far as a bar chart can honour it. The
                            // target grows *vertically* to reach it; it cannot grow
                            // horizontally without eating the neighbouring bar's target,
                            // and a chart that answers the wrong bar is a worse failure than
                            // one with a narrow one. A chart with more bars than its width
                            // can carry is a composition problem — facet it, or bin it into
                            // a `HistogramV4`.
                            hitSlop: { top: slop, bottom: slop }, onPress: () => {
                                setSelected((current) => (current === i ? null : i));
                                onSelect?.(i, value);
                            }, style: { flex: 1, height: '100%', justifyContent: 'flex-end' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-v4-bar", style: {
                                    height: `${barRatio(value, ceiling) * 100}%`,
                                    // `1` is the hairline exception in rule 1: a datum that
                                    // exists should be visible as a datum even at 0.
                                    minHeight: 1,
                                    backgroundColor: fill,
                                    borderTopLeftRadius: v4_chart_1.CHART_MARK.endRadius,
                                    borderTopRightRadius: v4_chart_1.CHART_MARK.endRadius,
                                } }) }, i))) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-v4-chart-axis", style: { height: 1, backgroundColor: palette.axis } })] }), labels ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: v4_chart_1.CHART_MARK.gap }, children: labels.map((l, i) => ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", align: "center", numberOfLines: 1, style: { flex: 1 }, children: l }, i))) })) : null] }));
}
//# sourceMappingURL=BarChartV4.js.map
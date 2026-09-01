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
exports.ColumnChartV4 = ColumnChartV4;
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
/** `value / ceiling`, clamped, and zero when the ceiling is not a usable divisor. */
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
/** The sentence a screen reader gets (brief §1 rule 6, §4.8). */
function columnChartLabel(data, title, format) {
    const finite = data.map((d) => d.value).filter((v) => Number.isFinite(v));
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
 * scale would grow the plot out of its own centre. Native's reveal is therefore
 * the fade, which is also what the web twin degrades to under reduced motion —
 * the two platforms converge on one look rather than diverging into two.
 *
 * Reduced motion shortens it rather than removing it: an element that appears
 * with no transition at all reads as a glitch (`design.md` §36.10).
 *
 * Deliberately local to this file rather than added to `charts/internal-v4.ts`:
 * three other agents are building in this module concurrently and a shared file
 * edited by four hands is a merge conflict, not a refactor.
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
 * **V4 horizontal bar chart (native)** — one labelled row per datum, the twin
 * of `charts/ColumnChartV4` prop for prop.
 *
 * What the base got wrong, in the order it misleads a reader:
 *
 * 1. **`color?: ColumnChartColor` as an identity.** `colors[color]` paints
 *    every bar with a semantic slot, so a second chart on the screen reached
 *    for `warn` and became a chart that reads as a warning. V4 has one
 *    categorical answer — slot 1 from the shared palette — and one status
 *    answer, `tone` (brief §1 rule 3, §4.3).
 * 2. **Never colour by value.** A bar's *length* already encodes magnitude
 *    (brief §4.1). Every bar here is one colour.
 * 3. **`colors.border` as the track.** `border` is a hairline colour; a track
 *    is chrome, and chrome is `palette.grid` — the derived neutral at
 *    `CHART_GRID_MIX`, which follows the scheme with no dark rule of its own.
 *    The **baseline** is one step more present at `palette.axis`, and this
 *    chart has a real one: a horizontal bar grows rightward from x = 0, which
 *    the base drew as nothing at all.
 * 4. **`radius.full` on both ends of both the track and the fill.** A bar
 *    rounded at the baseline floats off its axis. `CHART_MARK.endRadius` rounds
 *    the **data end only** (brief §4.4) — here the right edge — and the track
 *    matches so a full bar and its track share one silhouette. It also stops
 *    being seed-dependent: on a `sharp` seed `radius.full` compiles to 0 and
 *    the base's bars lose their rounding entirely.
 * 5. **`showValues` defaulting off.** The palette's worst adjacent CVD ΔE is
 *    6.5, inside the 6–8 floor band, and that band is legal only with a second
 *    channel. At four rows or fewer the value label is that channel.
 *
 * Each row is a real press target at the 44 floor (`minTap`, rule 10) rather
 * than a 12px-tall strip, and rows sit on the spacing rhythm rather than on
 * `CHART_MARK.gap`: the constant is the hairline of page between two fills that
 * would otherwise *touch*, and two labelled rows never touch.
 */
function ColumnChartV4({ data, max, barHeight = 12, showValues, tone, format = String, title, summary, caption, height = 120, loading = false, emptyLabel = 'No data', animate = true, tooltip = true, onSelect, accessibilityLabel, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const palette = (0, internal_v4_1.useChartPaletteV4)();
    const progress = useChartRevealV4(animate);
    const [selected, setSelected] = React.useState(null);
    const label = accessibilityLabel ?? columnChartLabel(data, title, format);
    const fill = tone ? colors[tone] : (0, internal_v4_1.chartSlotColor)(palette, 0);
    const header = title || summary || caption ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [title ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", numberOfLines: 1, children: title })) : null, summary ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "2xl", weight: "bold", numeric: "tabular", children: summary })) : null, caption ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: caption })) : null] })) : null;
    const frame = (children) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: label, style: [{ gap: tokens.spacing.sm }, style], children: [header, children] }));
    if (loading)
        return frame((0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "rect", width: "100%", height: height }));
    if (data.length === 0) {
        return frame((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: emptyLabel }) }));
    }
    const ceiling = ceilingOf(data.map((d) => d.value), max);
    const directLabels = showValues ?? data.length <= v4_chart_1.CHART_DIRECT_LABEL_MAX;
    return frame((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { testID: "xen-v4-chart-plot", style: { gap: tokens.spacing.sm, opacity: progress }, children: data.map((d, i) => {
            const showValue = directLabels || (tooltip && selected === i);
            return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { testID: "xen-v4-bar-hit", accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", onPress: () => {
                    setSelected((current) => (current === i ? null : i));
                    onSelect?.(i, d.value);
                }, style: {
                    minHeight: (0, nav_v4_1.minTap)(tokens.spacing),
                    justifyContent: 'center',
                    gap: tokens.spacing.xs,
                }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.sm,
                        }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, style: { flex: 1 }, children: d.label }), showValue ? (directLabels ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { testID: "xen-v4-chart-value", size: "xs", tone: "mutedText", numeric: "tabular", children: format(d.value) })) : ((0, jsx_runtime_1.jsx)(internal_v4_1.ChartTipV4, { children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { testID: "xen-v4-chart-value", size: "xs", tone: "mutedText", numeric: "tabular", children: format(d.value) }) }))) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'stretch' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-v4-chart-axis", style: { width: 1, backgroundColor: palette.axis } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-v4-chart-track", style: {
                                    flex: 1,
                                    height: barHeight,
                                    backgroundColor: palette.grid,
                                    borderTopRightRadius: v4_chart_1.CHART_MARK.endRadius,
                                    borderBottomRightRadius: v4_chart_1.CHART_MARK.endRadius,
                                }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-v4-bar", style: {
                                        width: `${barRatio(d.value, ceiling) * 100}%`,
                                        height: '100%',
                                        // `1` is the hairline exception in rule 1: a datum that
                                        // exists should be visible as a datum even at 0.
                                        minWidth: 1,
                                        backgroundColor: fill,
                                        borderTopRightRadius: v4_chart_1.CHART_MARK.endRadius,
                                        borderBottomRightRadius: v4_chart_1.CHART_MARK.endRadius,
                                    } }) })] })] }, i));
        }) }));
}
//# sourceMappingURL=ColumnChartV4.js.map
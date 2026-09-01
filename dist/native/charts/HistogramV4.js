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
exports.HistogramV4 = HistogramV4;
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
/** `count / ceiling`, clamped, and zero when the ceiling is not a usable divisor. */
function binRatio(value, ceiling) {
    if (!Number.isFinite(value) || !Number.isFinite(ceiling) || ceiling <= 0)
        return 0;
    return Math.min(Math.max(value / ceiling, 0), 1);
}
/** The largest finite bin, or 0 when there is nothing to measure. */
function ceilingOf(values, override) {
    if (override !== undefined && Number.isFinite(override))
        return override;
    const finite = values.filter((v) => Number.isFinite(v));
    return finite.length > 0 ? Math.max(...finite) : 0;
}
/**
 * How many bins pass between two drawn labels.
 *
 * Derived from {@link CHART_DIRECT_LABEL_MAX} rather than picked, so the number
 * of labels a histogram draws and the number of series a chart may direct-label
 * come from one decision instead of two that drift.
 */
function labelStride(count) {
    return Math.max(1, Math.ceil(count / v4_chart_1.CHART_DIRECT_LABEL_MAX));
}
/** The sentence a screen reader gets (brief §1 rule 6, §4.8). */
function histogramLabel(bins, title, format) {
    const finite = bins.filter((v) => Number.isFinite(v));
    const head = `Histogram${title ? `, ${title}` : ''}`;
    const count = `${bins.length} ${bins.length === 1 ? 'bin' : 'bins'}`;
    if (finite.length === 0)
        return `${head}, ${count}`;
    const lo = Math.min(...finite);
    const hi = Math.max(...finite);
    const range = lo === hi ? format(lo) : `${format(lo)} to ${format(hi)}`;
    return `${head}, ${count}, ${range}`;
}
/**
 * The entrance reveal (brief §4.7), as an opacity ramp. See the note in
 * `BarChartV4` for why native fades where web wipes, and why the hook is local
 * to each file for the length of this pass.
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
 * **A histogram's bins sit flush.** The ruling on brief §4.4's "a
 * `CHART_MARK.gap` of surface separates adjacent bars", which Group B flagged
 * as producing a non-flush histogram — the opposite of what a distribution
 * should look like.
 *
 * The gap rule is about **categorical** bars. There, the gap is doing semantic
 * work: it says *these are separate things*, and it is one of the four
 * secondary encodings rule 5 obliges, because two adjacent fills a dichromat
 * reads as one colour are still visibly two bars when a hairline of page runs
 * between them.
 *
 * A histogram's bins are not separate things. They are **one continuous axis**
 * cut into buckets, and the bucket edges are adjacent by construction — the
 * right-hand edge of bin 3 *is* the left-hand edge of bin 4. Page between them
 * says there is a range of the variable that fell in neither bucket, which is
 * false for every histogram ever drawn. That is not a style preference; it is
 * the chart making a claim about the data that the data does not support, and
 * it is why every reference implementation of a histogram — and every
 * statistics textbook — draws the bars touching.
 *
 * Rule 5 is satisfied without the gap here anyway, and satisfied more cheaply
 * than anywhere else in the module: **a histogram is one series**, so colour is
 * not carrying identity at all and there is no adjacent pair for a reader to
 * confuse. The encoding a histogram needs is the step in the outline where one
 * bin's height meets the next, which flush bars give and a gap actually
 * weakens.
 *
 * Zero rather than "no `gap` property" so the bin row, the label row and the
 * press-bubble row read from one binding: the three are laid out with the same
 * flex rule and a gap on one of them silently misaligns a label from its bin.
 */
const BIN_GAP = 0;
/**
 * **V4 frequency histogram (native)** — a distribution, which is the one bar
 * form whose colour question answers itself.
 *
 * **Bins are one series by definition.** A histogram counts one variable into
 * ordered buckets; there is no second identity to encode, so there is no second
 * colour to spend. The base takes `color?: HistogramColor` and V4 takes a
 * `tone` that changes *which* single colour is used and never *how many* —
 * because a histogram coloured by bin height has spent the identity channel
 * restating the bar length (brief §4.1).
 *
 * The rest of what the base got wrong:
 *
 * - **`borderLeftWidth: 1` in `colors.surface` between bins.** A border eats
 *   into the bin it belongs to, so the first bin ends up a pixel wider than the
 *   rest and the separation is a property of one neighbour rather than of the
 *   pair. It is gone, and — see {@link BIN_GAP} — nothing replaces it: a
 *   histogram's bins are flush, because they are one continuous axis rather
 *   than a row of separate things.
 * - **`colors.muted` as the axis.** A de-emphasised *text* colour doing a
 *   rule's job. The axis is chrome and chrome is `palette.axis` (brief §3.3).
 * - **Square tops.** `CHART_MARK.endRadius` at the data end only, so the family
 *   has one bar silhouette; the baseline stays square because a bar rounded
 *   there floats off its axis (brief §4.4).
 *
 * ## Bin labels thin, they do not rotate
 *
 * HIG's density rule: a chart stays simple and lets people ask for detail. A
 * rotated axis label is a chart admitting it has more labels than room, and on
 * a phone it is unreadable at any angle. So a histogram draws every
 * {@link labelStride}th label upright and leaves the rest to the press bubble.
 *
 * ## The one documented tap-target exception
 *
 * Brief §1 rule 10 names the histogram bin, alongside the heatmap cell, as the
 * place where density genuinely forbids 44 and HIG's absolute floor of 28
 * applies instead — and says the exception holds only where a component states
 * it. This is that statement. The bin's press target is its full-height column
 * slot, carried out to the tap floor **vertically** by `hitSlop`; horizontally
 * it stays inside its slot, because a `hitSlop` wider than the slot would
 * overlap its neighbours' targets and start swallowing their presses, which is
 * a worse failure than a narrow one.
 */
function HistogramV4({ bins, labels, height = 120, max, tone, format = String, title, summary, caption, loading = false, emptyLabel = 'No data', animate = true, tooltip = true, onSelect, accessibilityLabel, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const palette = (0, internal_v4_1.useChartPaletteV4)();
    const progress = useChartRevealV4(animate);
    const [selected, setSelected] = React.useState(null);
    const label = accessibilityLabel ?? histogramLabel(bins, title, format);
    const fill = tone ? colors[tone] : (0, internal_v4_1.chartSlotColor)(palette, 0);
    const slop = Math.max(0, ((0, nav_v4_1.minTap)(tokens.spacing) - height) / 2);
    const header = title || summary || caption ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [title ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", numberOfLines: 1, children: title })) : null, summary ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "2xl", weight: "bold", numeric: "tabular", children: summary })) : null, caption ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: caption })) : null] })) : null;
    const frame = (children) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: label, style: [{ gap: tokens.spacing.sm }, style], children: [header, children] }));
    if (loading)
        return frame((0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "rect", width: "100%", height: height }));
    if (bins.length === 0) {
        return frame((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: emptyLabel }) }));
    }
    const ceiling = ceilingOf(bins, max);
    const stride = labelStride(bins.length);
    const bubble = tooltip && selected !== null && bins[selected] !== undefined ? selected : null;
    return frame((0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [bubble !== null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: BIN_GAP }, children: bins.map((_, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, alignItems: 'center' }, children: i === bubble ? ((0, jsx_runtime_1.jsxs)(internal_v4_1.ChartTipV4, { style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.xs,
                            backgroundColor: colors.popover,
                            borderColor: colors.border,
                            borderWidth: 1,
                            borderRadius: tokens.radius.md,
                            paddingHorizontal: tokens.spacing.sm,
                            paddingVertical: tokens.spacing.xs,
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    width: v4_chart_1.CHART_MARK.dotSize,
                                    height: v4_chart_1.CHART_MARK.dotSize,
                                    borderRadius: v4_chart_1.CHART_MARK.dotSize,
                                    backgroundColor: fill,
                                } }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "onPopover", numeric: "tabular", children: `${labels?.[bubble] ? `${labels[bubble]}: ` : ''}${format(bins[bubble])}` })] })) : null }, i))) })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { testID: "xen-v4-chart-plot", style: { height, opacity: progress }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-v4-bin-row", style: { flex: 1, flexDirection: 'row', alignItems: 'flex-end', gap: BIN_GAP }, children: bins.map((count, i) => ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { testID: "xen-v4-bin-hit", accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", hitSlop: { top: slop, bottom: slop }, onPress: () => {
                                setSelected((current) => (current === i ? null : i));
                                onSelect?.(i, count);
                            }, style: { flex: 1, height: '100%', justifyContent: 'flex-end' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-v4-bin", style: {
                                    height: `${binRatio(count, ceiling) * 100}%`,
                                    // `1` is the hairline exception in rule 1: an empty bin is
                                    // still a bin, and a gap in a distribution is information.
                                    minHeight: 1,
                                    backgroundColor: fill,
                                    borderTopLeftRadius: v4_chart_1.CHART_MARK.endRadius,
                                    borderTopRightRadius: v4_chart_1.CHART_MARK.endRadius,
                                } }) }, i))) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-v4-chart-axis", style: { height: 1, backgroundColor: palette.axis } })] }), labels ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: BIN_GAP }, children: bins.map((_, i) => ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", align: "center", numberOfLines: 1, style: { flex: 1 }, children: i % stride === 0 ? (labels[i] ?? '') : '' }, i))) })) : null] }));
}
//# sourceMappingURL=HistogramV4.js.map
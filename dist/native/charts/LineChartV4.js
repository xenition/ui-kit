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
exports.useChartRevealV4 = exports.seriesInkV4 = exports.CHART_SERIES_COUNT = exports.ChartEmptyV4 = exports.CHART_AUTO_DOT_MAX = void 0;
exports.toSeriesRowsV4 = toSeriesRowsV4;
exports.plotSeriesV4 = plotSeriesV4;
exports.thinAxisIndicesV4 = thinAxisIndicesV4;
exports.ChartSwatchV4 = ChartSwatchV4;
exports.ChartLegendV4 = ChartLegendV4;
exports.LineChartV4 = LineChartV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_svg_1 = __importStar(require("react-native-svg"));
const TextV4_1 = require("../primitives/TextV4");
const LegendV4_1 = require("./LegendV4");
const SkeletonV4_1 = require("../primitives/SkeletonV4");
const nav_v4_1 = require("../primitives/internal/nav-v4");
const theme_1 = require("../theme");
const internal_v4_1 = require("./internal-v4");
Object.defineProperty(exports, "ChartEmptyV4", { enumerable: true, get: function () { return internal_v4_1.ChartEmptyV4; } });
/*
  The tone vocabulary, the slot→ink resolver and the entrance reveal live in
  `SparklineV4` — the peer-FREE file — and are imported here rather than the
  other way round. See that file's `## Why three shared helpers live in the
  smallest file` note: a helper imported from a module that hard-imports
  `react-native-svg` drags the peer in with it, which would have silently
  broken the one fallback brief §7 open question 6 promises.
*/
const SparklineV4_1 = require("./SparklineV4");
Object.defineProperty(exports, "seriesInkV4", { enumerable: true, get: function () { return SparklineV4_1.seriesInkV4; } });
Object.defineProperty(exports, "useChartRevealV4", { enumerable: true, get: function () { return SparklineV4_1.useChartRevealV4; } });
const v4_chart_1 = require("../../primitives/internal/v4-chart");
Object.defineProperty(exports, "CHART_SERIES_COUNT", { enumerable: true, get: function () { return v4_chart_1.CHART_SERIES_COUNT; } });
/**
 * Above this many points a dot per datum stops being information.
 * Brief §5: "automatic below ~20 points and off above".
 */
exports.CHART_AUTO_DOT_MAX = 20;
/** How many horizontal reference rules the plot carries: top, middle, baseline. */
const GRID_ROWS = 3;
/** The most x-axis labels printed before they start thinning (never rotating). */
const AXIS_LABEL_MAX = 6;
/** Clamp into `[0, 1]`, treating a non-finite input as 0. */
const clamp01 = (n) => (Number.isFinite(n) ? Math.min(Math.max(n, 0), 1) : 0);
/** `number[]` or `number[][]` → always `number[][]`. The base's shape stays valid. */
function toSeriesRowsV4(data) {
    if (data.length === 0)
        return [];
    return typeof data[0] === 'number' ? [data] : data;
}
/**
 * Scale a series into the plot box.
 *
 * The two guards brief §4.5 asks every spec in this pass to assert: a
 * **single** datum sits at the horizontal centre rather than dividing by
 * `length - 1`, and a **flat** series divides by 1 rather than by `max - min`.
 */
function plotSeriesV4(values, lo, span, width, height) {
    return values.map((v, i) => ({
        x: values.length === 1 ? width / 2 : (i / (values.length - 1)) * width,
        y: height - clamp01((v - lo) / span) * height,
    }));
}
/** Evenly-spaced indices to print an axis label at, at most `max` of them. */
function thinAxisIndicesV4(count, max = AXIS_LABEL_MAX) {
    if (count <= max)
        return Array.from({ length: count }, (_, i) => i);
    const step = (count - 1) / (max - 1);
    return Array.from({ length: max }, (_, i) => Math.round(i * step));
}
/**
 * A legend swatch at {@link CHART_MARK.dotSize} — brief §4.8: "its swatch is
 * `dotSize`, not a 10×10 literal", which is exactly what the base `Legend`
 * ships (`width: 10, height: 10`).
 */
function ChartSwatchV4({ ink, indicator, radiusFull, }) {
    if (indicator === 'dot') {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: {
                width: v4_chart_1.CHART_MARK.dotSize,
                height: v4_chart_1.CHART_MARK.dotSize,
                borderRadius: radiusFull,
                backgroundColor: ink,
            } }));
    }
    if (indicator === 'dashed') {
        // React Native has no `strokeDasharray` on a View, so a dash is two
        // segments with a gap of surface between them — which is the same
        // `CHART_MARK.gap` idea every fill in this module uses, at swatch scale.
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: { flexDirection: 'row', gap: v4_chart_1.CHART_MARK.gap }, children: [0, 1].map((i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: (v4_chart_1.CHART_MARK.dotSize - v4_chart_1.CHART_MARK.gap) / 2,
                    height: v4_chart_1.CHART_MARK.stroke,
                    backgroundColor: ink,
                } }, i))) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: {
            width: v4_chart_1.CHART_MARK.dotSize,
            height: v4_chart_1.CHART_MARK.stroke,
            backgroundColor: ink,
        } }));
}
/**
 * The native line family's legend.
 *
 * This used to be the markup itself — `LegendV4` was Group D's component and
 * was not on disk while this group built, so the shape it is specified to have
 * was drawn here instead. **The body is now `LegendV4`**, and with it the
 * signature loses the four resolution parameters (`palette`, `statusColors`,
 * `gap`, `radiusFull`): `LegendV4` reads all four from the theme itself, and
 * threading them through a second component was only ever a symptom of the
 * legend being drawn in the wrong file. The web twin's `ChartLegendV4` takes
 * `items` and `indicator` and nothing else, so this is also rule 7's prop
 * parity being restored rather than broken.
 */
function ChartLegendV4({ items, indicator = 'dot', }) {
    return ((0, jsx_runtime_1.jsx)(LegendV4_1.LegendV4, { indicator: indicator, items: items.map((item, i) => ({
            key: item.key ?? item.label,
            label: item.label,
            slot: item.slot ?? i,
            ...(item.tone === undefined ? {} : { tone: item.tone }),
        })) }));
}
function LineChartV4({ data, series, labels, title, summary, caption, legend, height = 160, width = 320, max, min, showDots, grid = true, tooltip = true, indicator = 'line', directLabels, loading = false, emptyLabel = 'No data', formatValue = String, onPointPress, animate = true, accessibilityLabel, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const palette = (0, internal_v4_1.useChartPaletteV4)();
    const [active, setActive] = React.useState(null);
    const reveal = (0, SparklineV4_1.useChartRevealV4)(animate);
    const statusColors = {
        success: colors.success,
        warn: colors.warn,
        danger: colors.danger,
    };
    const rows = toSeriesRowsV4(data);
    const pointCount = rows.reduce((n, row) => Math.max(n, row.length), 0);
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ gap: tokens.spacing.md }, style], children: (0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "rect", width: width, height: height }) }));
    }
    if (pointCount === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ gap: tokens.spacing.md }, style], children: (0, jsx_runtime_1.jsx)(internal_v4_1.ChartEmptyV4, { label: emptyLabel, height: height }) }));
    }
    const flat = rows.flat();
    const hi = max ?? Math.max(...flat);
    const lo = min ?? Math.min(...flat);
    // A flat series is a horizontal line through the middle, not a division by
    // zero — §4.5, and the spec asserts it.
    const span = hi - lo || 1;
    /*
      Past the palette's five slots the tail shares the last one rather than
      throwing. The palette primitive still throws — asking it for a sixth slot is
      a mistake in the caller's own code — but this chart's series count arrives
      with the DATA, and a `RangeError` out of render takes the screen down.
      `foldChartSeries` in `primitives/internal/v4-chart.ts` draws that line: the
      primitive throws, the component folds.
  
      Bands and lines are not summed the way a stack's or a pie's segments are,
      because a line is not a part of a whole — the average of three series is a
      fourth series nobody asked for. So the tail keeps its own shapes, shares the
      last slot, and the legend carries ONE row for it named
      `CHART_OVERFLOW_LABEL`. What a reader loses is the ability to tell the sixth
      line from the seventh, which is exactly what the palette was refusing to
      promise in the first place.
    */
    const fold = (0, v4_chart_1.foldChartSeries)(rows);
    const slotOf = (i) => Math.min(i, v4_chart_1.CHART_SERIES_COUNT - 1);
    const resolved = rows.map((values, i) => {
        const cfg = series?.[i];
        return {
            key: cfg?.key ?? `series-${i}`,
            label: cfg?.label ?? `Series ${i + 1}`,
            values,
            ink: (0, SparklineV4_1.seriesInkV4)(palette, statusColors, slotOf(i), cfg?.tone),
            points: plotSeriesV4(values, lo, span, width, height),
        };
    });
    const dots = showDots ?? pointCount <= exports.CHART_AUTO_DOT_MAX;
    const showLegend = legend === undefined ? resolved.length >= 2 : legend !== false;
    const legendItems = Array.isArray(legend)
        ? legend
        : fold.didFold
            ? [
                ...fold.kept.map((_, i) => ({
                    key: resolved[i]?.key ?? `series-${i}`,
                    label: resolved[i]?.label ?? `Series ${i + 1}`,
                    slot: i,
                    tone: series?.[i]?.tone,
                })),
                {
                    key: 'chart-overflow',
                    label: `${v4_chart_1.CHART_OVERFLOW_LABEL} (${fold.folded.length} series)`,
                    slot: v4_chart_1.CHART_SERIES_COUNT - 1,
                },
            ]
            : resolved.map((s, i) => ({ key: s.key, label: s.label, slot: i, tone: series?.[i]?.tone }));
    const showDirect = directLabels ??
        (resolved.length >= 2 && resolved.length <= v4_chart_1.CHART_DIRECT_LABEL_MAX && series !== undefined);
    // §4.8: the sentence names the form, the series count and the range. HIG is
    // explicit that a rendered plot plus a visible title is NOT accessible.
    const derivedLabel = [
        'Line chart',
        title,
        resolved.length > 1 ? `${resolved.length} series` : undefined,
        `${pointCount} point${pointCount === 1 ? '' : 's'}`,
        `${formatValue(Math.min(...flat))} to ${formatValue(Math.max(...flat))}`,
    ]
        .filter(Boolean)
        .join(', ');
    const xOf = (i) => pointCount === 1 ? width / 2 : (i / (pointCount - 1)) * width;
    // Rule 10: the painted mark stays 8, the hit area reaches 44 on both axes.
    const tap = (0, nav_v4_1.minTap)(tokens.spacing);
    const sliceW = width / Math.max(pointCount, 1);
    const slop = {
        top: Math.max(0, (tap - height) / 2),
        bottom: Math.max(0, (tap - height) / 2),
        left: Math.max(0, (tap - sliceW) / 2),
        right: Math.max(0, (tap - sliceW) / 2),
    };
    const readoutAlign = active === null || pointCount === 1
        ? 'center'
        : active / (pointCount - 1) < 1 / 3
            ? 'flex-start'
            : active / (pointCount - 1) > 2 / 3
                ? 'flex-end'
                : 'center';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: accessibilityLabel ?? derivedLabel, style: [{ gap: tokens.spacing.md }, style], children: [title !== undefined || summary !== undefined || caption !== undefined ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [title !== undefined ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onSurface", children: title })) : null, summary !== undefined ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "2xl", weight: "bold", tone: "onSurface", numeric: "tabular", children: summary })) : null, caption !== undefined ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: caption })) : null] })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { width, height }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: reveal }, children: (0, jsx_runtime_1.jsxs)(react_native_svg_1.default, { width: width, height: height, viewBox: `0 0 ${width} ${height}`, children: [grid
                                    ? Array.from({ length: GRID_ROWS }, (_, i) => {
                                        const y = (i / (GRID_ROWS - 1)) * height;
                                        return ((0, jsx_runtime_1.jsx)(react_native_svg_1.Line, { testID: "chart-grid", x1: 0, y1: y, x2: width, y2: y, stroke: palette.grid, strokeWidth: 1 }, `grid-${i}`));
                                    })
                                    : null, resolved.map((s) => ((0, jsx_runtime_1.jsx)(react_native_svg_1.Polyline, { testID: "chart-line", points: s.points.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' '), fill: "none", stroke: s.ink, strokeWidth: v4_chart_1.CHART_MARK.stroke, strokeLinejoin: "round", strokeLinecap: "round" }, s.key))), resolved.map((s) => dots || s.points.length === 1
                                    ? s.points.map((p, i) => ((0, jsx_runtime_1.jsx)(react_native_svg_1.Circle, { testID: "chart-dot", cx: p.x, cy: p.y, r: v4_chart_1.CHART_MARK.dotSize / 2, fill: s.ink, stroke: palette.ring, strokeWidth: v4_chart_1.CHART_MARK.ring }, `${s.key}-${i}`)))
                                    : null), active !== null && tooltip ? ((0, jsx_runtime_1.jsx)(react_native_svg_1.Line, { testID: "chart-crosshair", x1: xOf(active), y1: 0, x2: xOf(active), y2: height, stroke: palette.axis, strokeWidth: 1 })) : null] }) }), tooltip || onPointPress !== undefined ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            flexDirection: 'row',
                        }, children: Array.from({ length: pointCount }, (_, i) => ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { testID: `chart-hit-${i}`, accessibilityRole: "button", accessibilityLabel: `${labels?.[i] ?? `Point ${i + 1}`}, ${resolved
                                .map((s) => `${s.label} ${formatValue(s.values[i] ?? 0)}`)
                                .join(', ')}`, hitSlop: slop, style: { flex: 1 }, onPress: () => {
                                if (tooltip)
                                    setActive(i);
                                onPointPress?.(i);
                            } }, `hit-${i}`))) })) : null, showDirect
                        ? resolved.map((s) => {
                            const last = s.points[s.points.length - 1];
                            return last === undefined ? null : ((0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", style: {
                                    position: 'absolute',
                                    left: last.x + v4_chart_1.CHART_MARK.dotSize,
                                    top: last.y - tokens.typography.scale.xs,
                                }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: s.label }) }, `direct-${s.key}`));
                        })
                        : null, active !== null && tooltip ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", style: {
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            alignItems: readoutAlign,
                        }, children: (0, jsx_runtime_1.jsxs)(internal_v4_1.ChartTipV4, { testID: "chart-readout", style: {
                                backgroundColor: colors.popover,
                                borderColor: colors.border,
                                borderWidth: 1,
                                borderRadius: tokens.radius.md,
                                paddingHorizontal: tokens.spacing.sm,
                                paddingVertical: tokens.spacing.xs,
                                gap: tokens.spacing.xs,
                            }, children: [labels?.[active] !== undefined ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: labels[active] })) : null, resolved.map((s) => {
                                    const v = s.values[active];
                                    return v === undefined ? null : ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            gap: tokens.spacing.xs,
                                        }, children: [(0, jsx_runtime_1.jsx)(ChartSwatchV4, { ink: s.ink, indicator: indicator, radiusFull: tokens.radius.full }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "onPopover", children: s.label }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", tone: "onPopover", numeric: "tabular", children: formatValue(v) })] }, `tip-${s.key}`));
                                })] }) })) : null] }), labels !== undefined && labels.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width, height: tokens.typography.scale.xs * 2 }, children: thinAxisIndicesV4(Math.min(labels.length, pointCount)).map((i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', left: xOf(i) - sliceW / 2, width: sliceW * 2 }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: labels[i] }) }, `axis-${i}`))) })) : null, showLegend ? (0, jsx_runtime_1.jsx)(ChartLegendV4, { items: legendItems }) : null] }));
}
//# sourceMappingURL=LineChartV4.js.map
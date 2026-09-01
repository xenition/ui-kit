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
exports.CHART_AREA_FILL_ALPHA = void 0;
exports.AreaChartV4 = AreaChartV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_svg_1 = __importStar(require("react-native-svg"));
const TextV4_1 = require("../primitives/TextV4");
const SkeletonV4_1 = require("../primitives/SkeletonV4");
const nav_v4_1 = require("../primitives/internal/nav-v4");
const theme_1 = require("../theme");
const internal_v4_1 = require("./internal-v4");
const v4_chart_1 = require("../../primitives/internal/v4-chart");
Object.defineProperty(exports, "CHART_AREA_FILL_ALPHA", { enumerable: true, get: function () { return v4_chart_1.CHART_AREA_FILL_ALPHA; } });
const LineChartV4_1 = require("./LineChartV4");
/** Clamp into `[0, 1]`, treating a non-finite input as 0. */
const clamp01 = (n) => (Number.isFinite(n) ? Math.min(Math.max(n, 0), 1) : 0);
/**
 * The area under a run of points, closed onto the baseline **or** onto the
 * band beneath it when the chart is stacked.
 *
 * The lower edge is walked in reverse so the path never crosses itself. The
 * base's `M… L last.x base L first.x base Z` shortcut happens to look right
 * for one series over a flat baseline and produces a bow-tie the moment the
 * lower edge is another series — which is precisely what stacking needs, so it
 * is fixed here rather than worked around.
 */
function areaPath(top, bottom, baseline) {
    if (top.length === 0)
        return '';
    const first = top[0];
    const last = top[top.length - 1];
    const up = top
        .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
        .join(' ');
    if (bottom === null) {
        return `${up} L${last.x.toFixed(2)} ${baseline} L${first.x.toFixed(2)} ${baseline} Z`;
    }
    const down = [...bottom]
        .reverse()
        .map((p) => `L${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
        .join(' ');
    return `${up} ${down} Z`;
}
const polyOf = (pts) => pts.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ');
/**
 * **V4 area chart (native)** — `LineChartV4`'s twin, for the case where the
 * space under the line means something.
 *
 * The frame, the palette, the scrubber, the readout, the legend and the
 * derived label are all `LineChartV4`'s and are **composed from it** rather
 * than re-typed (§1 rule 8). Two things are this component's own:
 *
 * 1. **{@link CHART_AREA_FILL_ALPHA}** replaces the base's
 *    `fillOpacity = 0.2` prop, which was one of two different numbers for one
 *    mark across the twins and is on §1 rule 1's list of literals to retire.
 *    The prop is gone rather than defaulted, because a caller who can set it
 *    is a caller who can put a fill at 0.6 and bury the line.
 * 2. **Stacking, with `CHART_MARK.gap` between bands** (§5 Group A). The gap
 *    is not decoration: it is the secondary encoding the palette's 6–8 CVD
 *    band obliges (§1 rule 5). Two adjacent bands a dichromat cannot separate
 *    by hue are still visibly two bands with a hairline of page between them.
 *    It is painted as a `gap`-wide stroke of `colors.surface` along each
 *    band's lower boundary rather than as an inset in the geometry, so it is
 *    exactly two pixels at any plot size.
 */
function AreaChartV4({ data, series, labels, title, summary, caption, legend, height = 160, width = 320, max, min, stacked = false, showDots, grid = true, tooltip = true, indicator = 'line', directLabels, loading = false, emptyLabel = 'No data', formatValue = String, onPointPress, animate = true, accessibilityLabel, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const palette = (0, internal_v4_1.useChartPaletteV4)();
    const [active, setActive] = React.useState(null);
    const reveal = (0, LineChartV4_1.useChartRevealV4)(animate);
    const statusColors = {
        success: colors.success,
        warn: colors.warn,
        danger: colors.danger,
    };
    const rows = (0, LineChartV4_1.toSeriesRowsV4)(data);
    const pointCount = rows.reduce((n, row) => Math.max(n, row.length), 0);
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ gap: tokens.spacing.md }, style], children: (0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "rect", width: width, height: height }) }));
    }
    if (pointCount === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ gap: tokens.spacing.md }, style], children: (0, jsx_runtime_1.jsx)(LineChartV4_1.ChartEmptyV4, { label: emptyLabel, height: height }) }));
    }
    // A stack plots cumulative totals; an overlay plots the values themselves.
    const cumulative = [];
    rows.forEach((row, i) => {
        const below = cumulative[i - 1];
        cumulative.push(row.map((v, j) => v + (below?.[j] ?? 0)));
    });
    const plotted = stacked ? cumulative : rows;
    const flat = plotted.flat();
    const rawFlat = rows.flat();
    const hi = max ?? Math.max(...flat);
    // A stack is read against zero — a band floating off a non-zero baseline is
    // not a part of a whole any more. An overlay keeps the data's own floor.
    const lo = min ?? (stacked ? Math.min(0, ...flat) : Math.min(...flat));
    const span = hi - lo || 1;
    const baseline = height - clamp01((0 - lo) / span) * height;
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
    const fold = (0, v4_chart_1.foldChartSeries)(plotted);
    const slotOf = (i) => Math.min(i, v4_chart_1.CHART_SERIES_COUNT - 1);
    const resolved = plotted.map((values, i) => {
        const cfg = series?.[i];
        return {
            key: cfg?.key ?? `series-${i}`,
            label: cfg?.label ?? `Series ${i + 1}`,
            values: rows[i] ?? values,
            ink: (0, LineChartV4_1.seriesInkV4)(palette, statusColors, slotOf(i), cfg?.tone),
            points: (0, LineChartV4_1.plotSeriesV4)(values, lo, span, width, height),
        };
    });
    const dots = showDots ?? pointCount <= LineChartV4_1.CHART_AUTO_DOT_MAX;
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
    const derivedLabel = [
        stacked ? 'Stacked area chart' : 'Area chart',
        title,
        resolved.length > 1 ? `${resolved.length} series` : undefined,
        `${pointCount} point${pointCount === 1 ? '' : 's'}`,
        `${formatValue(Math.min(...rawFlat))} to ${formatValue(Math.max(...rawFlat))}`,
    ]
        .filter(Boolean)
        .join(', ');
    const xOf = (i) => (pointCount === 1 ? width / 2 : (i / (pointCount - 1)) * width);
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
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: accessibilityLabel ?? derivedLabel, style: [{ gap: tokens.spacing.md }, style], children: [title !== undefined || summary !== undefined || caption !== undefined ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [title !== undefined ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onSurface", children: title })) : null, summary !== undefined ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "2xl", weight: "bold", tone: "onSurface", numeric: "tabular", children: summary })) : null, caption !== undefined ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: caption })) : null] })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { width, height }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: reveal }, children: (0, jsx_runtime_1.jsxs)(react_native_svg_1.default, { width: width, height: height, viewBox: `0 0 ${width} ${height}`, children: [grid ? ((0, jsx_runtime_1.jsx)(react_native_svg_1.Line, { testID: "chart-grid", x1: 0, y1: baseline, x2: width, y2: baseline, stroke: palette.grid, strokeWidth: 1 })) : null, resolved.map((s, i) => ((0, jsx_runtime_1.jsx)(react_native_svg_1.Path, { testID: "chart-area", d: areaPath(s.points, stacked && i > 0 ? (resolved[i - 1]?.points ?? null) : null, baseline), fill: s.ink, fillOpacity: v4_chart_1.CHART_AREA_FILL_ALPHA, stroke: "none" }, `fill-${s.key}`))), stacked
                                    ? resolved.slice(0, -1).map((s) => ((0, jsx_runtime_1.jsx)(react_native_svg_1.Polyline, { testID: "chart-band-gap", points: polyOf(s.points), fill: "none", stroke: colors.surface, strokeWidth: v4_chart_1.CHART_MARK.gap, strokeLinejoin: "round", strokeLinecap: "round" }, `gap-${s.key}`)))
                                    : null, resolved.map((s) => ((0, jsx_runtime_1.jsx)(react_native_svg_1.Polyline, { testID: "chart-line", points: polyOf(s.points), fill: "none", stroke: s.ink, strokeWidth: v4_chart_1.CHART_MARK.stroke, strokeLinejoin: "round", strokeLinecap: "round" }, `line-${s.key}`))), resolved.map((s) => dots || s.points.length === 1
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
                        : null, active !== null && tooltip ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", style: { position: 'absolute', top: 0, left: 0, right: 0, alignItems: readoutAlign }, children: (0, jsx_runtime_1.jsxs)(internal_v4_1.ChartTipV4, { testID: "chart-readout", style: {
                                backgroundColor: colors.popover,
                                borderColor: colors.border,
                                borderWidth: 1,
                                borderRadius: tokens.radius.md,
                                paddingHorizontal: tokens.spacing.sm,
                                paddingVertical: tokens.spacing.xs,
                                gap: tokens.spacing.xs,
                            }, children: [labels?.[active] !== undefined ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: labels[active] })) : null, resolved.map((s) => {
                                    const v = s.values[active];
                                    return v === undefined ? null : ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(LineChartV4_1.ChartSwatchV4, { ink: s.ink, indicator: indicator, radiusFull: tokens.radius.full }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "onPopover", children: s.label }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", tone: "onPopover", numeric: "tabular", children: formatValue(v) })] }, `tip-${s.key}`));
                                })] }) })) : null] }), labels !== undefined && labels.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width, height: tokens.typography.scale.xs * 2 }, children: (0, LineChartV4_1.thinAxisIndicesV4)(Math.min(labels.length, pointCount)).map((i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', left: xOf(i) - sliceW / 2, width: sliceW * 2 }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: labels[i] }) }, `axis-${i}`))) })) : null, showLegend ? ((0, jsx_runtime_1.jsx)(LineChartV4_1.ChartLegendV4, { items: legendItems })) : null] }));
}
//# sourceMappingURL=AreaChartV4.js.map
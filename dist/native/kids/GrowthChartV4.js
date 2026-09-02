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
exports.GrowthChartV4 = GrowthChartV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_svg_1 = __importStar(require("react-native-svg"));
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const feedback_v4_1 = require("../../primitives/internal/feedback-v4");
const v4_chart_1 = require("../../primitives/internal/v4-chart");
const color_1 = require("../../theme/color");
const tone_v4_1 = require("./internal/tone-v4");
const METRIC_GLYPH = {
    height: '📏',
    weight: '⚖️',
    head: '🧢',
    other: '📈',
};
const METRIC_LABEL = {
    height: 'Height',
    weight: 'Weight',
    head: 'Head circumference',
    other: 'Growth',
};
/** Head- and foot-room, as a fraction of the value span, so nothing sits on an edge. */
const DOMAIN_PAD = 0.12;
/** How far the domain is padded past the data, as a fraction of the span, when
 * the series is flat or a single reading. */
const FLAT_PAD = 0.1;
/**
 * **V4 growth chart** — same props as {@link GrowthChart} plus `points`,
 * `percentileBand`, `formatValue` and a `unit` that now reaches every reading.
 *
 * ## Five changes
 *
 * 1. **A growth curve has a date axis.** The base took `data: number[]` and
 *    plotted it on the *array index*, so measurements at 2 months, 4 months and
 *    3 years rendered evenly spaced — a chart of a child's growth in which the
 *    horizontal axis meant nothing. Worse, unsorted input drew a *descending*
 *    curve for a growing child, because nothing put the readings in order.
 *    `points` carries `{ at, value }`, is sorted by `at`, and is laid out in
 *    **real time**: the gap between two measurements on screen is the gap
 *    between them in life. `data` still works and still plots on the index,
 *    so an existing caller sees no change.
 * 2. **A single measurement is visible.** One datum landed exactly on the
 *    bottom edge with half the dot clipped off the plot. The domain is padded,
 *    and a lone reading sits in the middle of the box.
 * 3. **The plot fits the card it is in.** It was a fixed 300px box inside a
 *    `lg`-padded card, so on a narrow phone the curve ran under the padding and
 *    on a tablet it stranded a third of the card empty. The plot measures its
 *    own column.
 * 4. **The series reaches a screen reader as numbers.** The base handed the
 *    whole thing to a `role="img"` with "Height over time" on it — a picture
 *    with a caption, which is nothing at all. The card is one spoken sentence
 *    carrying the count, the span of dates, the first and latest readings and
 *    the change between them; the drawing itself is marked decorative, because
 *    it is.
 * 5. **The card is a card and its skeleton is a skeleton** — `card`/`onCard`
 *    rather than the page's `surface`, and `skeletonFill` rather than
 *    `colors.border`, the hairline colour used as a fill.
 *
 * **Renders an empty state, never a frame around nothing** (§4.5).
 */
function GrowthChartV4({ data, points, metric = 'height', unit, percentile, percentileBand, color = 'primary', height = 160, loading = false, formatValue, emptyLabel = 'No measurements logged yet', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const [plotWidth, setPlotWidth] = React.useState(0);
    const glyph = METRIC_GLYPH[metric] ?? METRIC_GLYPH.other;
    const metricWord = METRIC_LABEL[metric] ?? METRIC_LABEL.other;
    const format = formatValue ?? ((v, u) => `${v}${u ? ` ${u}` : ''}`);
    const container = [(0, tone_v4_1.cardStyle)(theme), style];
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: "Loading growth chart", style: container, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, tone_v4_1.skeletonBlockStyle)(theme, { height: tokens.typography.scale.base, width: '40%' }) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, tone_v4_1.skeletonBlockStyle)(theme, { height }) })] }));
    }
    // Sorting is the whole of defect 1's second half: an unsorted series drew a
    // descending curve for a growing child, and nobody noticed because the axis
    // was the array index and the array index is always ascending.
    const dated = (points ?? [])
        .filter((p) => Number.isFinite(p.value) && Number.isFinite(Date.parse(p.at)))
        .slice()
        .sort((a, b) => Date.parse(a.at) - Date.parse(b.at));
    const bare = dated.length > 0 ? [] : (data ?? []).filter((v) => Number.isFinite(v));
    const values = dated.length > 0 ? dated.map((p) => p.value) : bare;
    if (values.length === 0) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: (0, tone_v4_1.spokenLine)([metricWord, emptyLabel]), style: container, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onCard", children: `${glyph} ${metricWord}` }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', paddingVertical: tokens.spacing.lg, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "2xl", allowFontScaling: false, accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", children: "\uD83D\uDCC9" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", align: "center", children: emptyLabel })] })] }));
    }
    const first = values[0];
    const latest = values[values.length - 1];
    // The band is part of what the plot has to fit, or half of it is drawn
    // outside the box it is meant to explain.
    const band = percentileBand &&
        Number.isFinite(percentileBand.low) &&
        Number.isFinite(percentileBand.high)
        ? {
            low: Math.min(percentileBand.low, percentileBand.high),
            high: Math.max(percentileBand.low, percentileBand.high),
        }
        : undefined;
    const rawLo = Math.min(...values, band ? band.low : Infinity);
    const rawHi = Math.max(...values, band ? band.high : -Infinity);
    // A flat or single-valued series has no span to pad, so it is given one —
    // which is what stops one measurement landing on the bottom edge (defect 2).
    const pad = rawHi - rawLo > 0
        ? (rawHi - rawLo) * DOMAIN_PAD
        : Math.max(1, Math.abs(rawHi) * FLAT_PAD);
    const lo = rawLo - pad;
    const span = rawHi + pad - lo;
    const times = dated.map((p) => Date.parse(p.at));
    const t0 = times.length > 0 ? times[0] : 0;
    const tSpan = times.length > 1 ? times[times.length - 1] - t0 : 0;
    const yOf = (v) => height - ((v - lo) / span) * height;
    const xOf = (i) => {
        if (values.length === 1)
            return plotWidth / 2;
        // Real elapsed time when we have dates, the index when we only have bare
        // numbers — never the index when a date was supplied.
        if (times.length === values.length && tSpan > 0) {
            return ((times[i] - t0) / tSpan) * plotWidth;
        }
        return (i / (values.length - 1)) * plotWidth;
    };
    const plotted = values.map((v, i) => ({
        x: xOf(i),
        y: yOf(v),
        at: dated[i]?.at,
    }));
    const dateOf = (iso) => {
        if (!iso)
            return undefined;
        const ms = Date.parse(iso);
        if (!Number.isFinite(ms))
            return undefined;
        return new Intl.DateTimeFormat(undefined, { month: 'short', year: 'numeric' }).format(new Date(ms));
    };
    const firstDate = dateOf(plotted[0]?.at);
    const lastDate = dateOf(plotted[plotted.length - 1]?.at);
    const change = latest - first;
    const changeText = values.length > 1 ? `${change >= 0 ? '+' : '−'}${format(Math.abs(change), unit)}` : null;
    // A stroke is a non-text graphic, so 3:1 — against the card it is drawn on.
    const ink = (0, color_1.ensureContrast)(colors[color], colors.card, feedback_v4_1.MIN_NON_TEXT_CONTRAST);
    // The band is a grey block with no meaning unless its range is written down.
    const bandText = band ? `${format(band.low, unit)} – ${format(band.high, unit)}` : null;
    const caption = (0, tone_v4_1.metaLine)([percentile, bandText, changeText]);
    // Every number on this card, in one sentence — which is what the base's
    // `role="img"` and its "Height over time" caption replaced with nothing.
    const name = (0, tone_v4_1.spokenLine)([
        metricWord,
        firstDate && lastDate && firstDate !== lastDate ? `${firstDate} – ${lastDate}` : firstDate,
        format(first, unit),
        format(latest, unit),
        changeText,
        percentile,
        bandText,
    ]);
    const onPlotLayout = (event) => {
        setPlotWidth(event.nativeEvent.layout.width);
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: container, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: name, style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'baseline',
                            gap: tokens.spacing.sm,
                        }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onCard", numberOfLines: 1, style: { flexShrink: 1 }, children: `${glyph} ${metricWord}` }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", weight: "bold", tone: "onCard", numeric: "tabular", children: format(latest, unit) })] }), caption ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: caption })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { onLayout: onPlotLayout, accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: { width: '100%', height }, children: plotWidth > 0 ? ((0, jsx_runtime_1.jsxs)(react_native_svg_1.default, { width: plotWidth, height: height, children: [band ? ((0, jsx_runtime_1.jsx)(react_native_svg_1.Rect, { x: 0, y: yOf(band.high), width: plotWidth, height: Math.max(0, yOf(band.low) - yOf(band.high)), fill: (0, tone_v4_1.trackGround)(theme) })) : null, plotted.length > 1 ? ((0, jsx_runtime_1.jsx)(react_native_svg_1.Polyline, { points: plotted.map((p) => `${p.x},${p.y}`).join(' '), fill: "none", stroke: ink, strokeWidth: v4_chart_1.CHART_MARK.stroke, strokeLinejoin: "round", strokeLinecap: "round" })) : null, plotted.map((p, i) => ((0, jsx_runtime_1.jsx)(react_native_svg_1.Circle, { cx: p.x, cy: p.y, r: v4_chart_1.CHART_MARK.dotSize / 2, fill: ink }, i)))] })) : null }), firstDate || lastDate ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: { flexDirection: 'row', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: firstDate ?? '' }), lastDate && lastDate !== firstDate ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: lastDate })) : null] })) : null] }));
}
//# sourceMappingURL=GrowthChartV4.js.map
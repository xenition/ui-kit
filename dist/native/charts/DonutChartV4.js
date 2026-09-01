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
exports.DonutChartV4 = DonutChartV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_svg_1 = __importStar(require("react-native-svg"));
const v4_chart_1 = require("../../primitives/internal/v4-chart");
const TextV4_1 = require("../primitives/TextV4");
const theme_1 = require("../theme");
const internal_v4_1 = require("./internal-v4");
const PieChartV4_1 = require("./PieChartV4");
const ProgressRingV4_1 = require("./ProgressRingV4");
/**
 * **V4 donut chart** — the pie's sibling, and the one radial form with a place
 * to put the number.
 *
 * Requires `react-native-svg` (§7 open question 6).
 *
 * Everything `PieChartV4` changed applies here for the same reasons: slots in
 * assignment order instead of a status arc, `CHART_MARK.gap` of page between
 * segments instead of nothing at all, and the "Other" fold at six or more
 * instead of the base's descending-opacity wrap. Three things are this
 * component's own.
 *
 * 1. **The hole is a slot, not a hole.** §5: "donut's centre is a slot for
 *    `summary`", and §3 puts the number ahead of the plot in the reading order
 *    because "the number is bigger than the chart is loud". A donut is the one
 *    form where those land in the same place. The base's `centerLabel` is
 *    retired — it took a raw string at `typography.scale.lg` on the heading
 *    face, a treatment nothing else in the kit used.
 * 2. **The hole is transparent.** The base drew full pie wedges and then
 *    painted a `colors.surface` circle over them, which works until the donut
 *    sits on a card, a tinted panel or an image — at which point a
 *    surface-coloured disc appears in the middle of the chart. It also meant
 *    the *single-segment* case punched its hole and the multi-segment case did
 *    not, so a filtered donut changed shape. V4 draws real annuli.
 * 3. **The thickness is derived.** `radialThicknessV4` is the family's one
 *    answer, shared with `GaugeChartV4` and `ProgressRingV4`.
 */
function DonutChartV4({ data, size = 160, thickness, title, summary, caption, legend, loading = false, emptyLabel, otherLabel = PieChartV4_1.PIE_OTHER_LABEL, animate = true, accessibilityLabel, style, }) {
    const { colors } = (0, theme_1.useXenitionTheme)();
    const palette = (0, internal_v4_1.useChartPaletteV4)();
    const fold = React.useMemo(() => (0, PieChartV4_1.foldPieDataV4)(data, otherLabel), [data, otherLabel]);
    const frame = (plot, legendNode) => ((0, jsx_runtime_1.jsx)(PieChartV4_1.ChartFigureV4, { title: title, caption: caption, legend: legendNode, style: style, children: plot }));
    if (loading)
        return frame((0, jsx_runtime_1.jsx)(PieChartV4_1.ChartLoadingV4, { width: size, height: size }));
    if (fold.segments.length === 0 || fold.total <= 0) {
        return frame((0, jsx_runtime_1.jsx)(PieChartV4_1.RadialEmptyV4, { label: emptyLabel, width: size, height: size }));
    }
    const cx = size / 2;
    const cy = size / 2;
    const rOuter = size / 2 - v4_chart_1.CHART_MARK.gap / 2;
    const ringWidth = thickness === undefined || !Number.isFinite(thickness)
        ? (0, ProgressRingV4_1.radialThicknessV4)(size)
        : Math.min(Math.max(thickness, 0), 1) * rOuter;
    const rInner = Math.max(rOuter - ringWidth, 0);
    const showLegend = legend ?? fold.segments.length > 1;
    const legendNode = showLegend ? ((0, jsx_runtime_1.jsx)(PieChartV4_1.RadialLegendV4, { items: fold.segments.map((segment, i) => ({
            label: (0, PieChartV4_1.segmentLegendLabelV4)(segment),
            slot: i,
            ...(segment.tone === undefined ? {} : { tone: segment.tone }),
            value: `${(0, PieChartV4_1.shareOfV4)(segment.value, fold.total)}%`,
        })) })) : undefined;
    const top = fold.segments.reduce((a, b) => (b.value > a.value ? b : a));
    const spoken = accessibilityLabel ??
        `Donut chart, ${fold.segments.length} segment${fold.segments.length === 1 ? '' : 's'}` +
            (summary === undefined ? '' : `, ${summary}`) +
            `, largest ${top.label} at ${(0, PieChartV4_1.shareOfV4)(top.value, fold.total)}%` +
            (fold.foldedCount > 0
                ? `, ${fold.foldedCount} smaller categories folded into ${otherLabel}`
                : '');
    let angle = -Math.PI / 2;
    const only = fold.segments[0];
    // A whole ring is 360°, which an arc path cannot express: the two endpoints
    // coincide and nothing is drawn. Two full circles in one path with an
    // even-odd fill rule is the shape that survives it, and it keeps the hole
    // transparent — which the base's overpainted disc did not.
    const fullRing = `M${(0, PieChartV4_1.coordV4)(cx)} ${(0, PieChartV4_1.coordV4)(cy - rOuter)} A${(0, PieChartV4_1.coordV4)(rOuter)} ${(0, PieChartV4_1.coordV4)(rOuter)} 0 1 0 ${(0, PieChartV4_1.coordV4)(cx)} ${(0, PieChartV4_1.coordV4)(cy + rOuter)} ` +
        `A${(0, PieChartV4_1.coordV4)(rOuter)} ${(0, PieChartV4_1.coordV4)(rOuter)} 0 1 0 ${(0, PieChartV4_1.coordV4)(cx)} ${(0, PieChartV4_1.coordV4)(cy - rOuter)} Z ` +
        `M${(0, PieChartV4_1.coordV4)(cx)} ${(0, PieChartV4_1.coordV4)(cy - rInner)} A${(0, PieChartV4_1.coordV4)(rInner)} ${(0, PieChartV4_1.coordV4)(rInner)} 0 1 1 ${(0, PieChartV4_1.coordV4)(cx)} ${(0, PieChartV4_1.coordV4)(cy + rInner)} ` +
        `A${(0, PieChartV4_1.coordV4)(rInner)} ${(0, PieChartV4_1.coordV4)(rInner)} 0 1 1 ${(0, PieChartV4_1.coordV4)(cx)} ${(0, PieChartV4_1.coordV4)(cy - rInner)} Z`;
    return frame((0, jsx_runtime_1.jsx)(PieChartV4_1.ChartRevealV4, { animate: animate, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: spoken, style: { width: size, height: size, alignItems: 'center', justifyContent: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_svg_1.default, { width: size, height: size, viewBox: `0 0 ${size} ${size}`, children: (0, jsx_runtime_1.jsx)(react_native_svg_1.G, { children: fold.segments.length === 1 ? ((0, jsx_runtime_1.jsx)(react_native_svg_1.Path, { d: fullRing, fillRule: "evenodd", fill: (0, PieChartV4_1.segmentFillV4)(palette, colors, only, 0) })) : (fold.segments.map((segment, i) => {
                            const a0 = angle;
                            const a1 = angle + (segment.value / fold.total) * Math.PI * 2;
                            angle = a1;
                            return ((0, jsx_runtime_1.jsx)(react_native_svg_1.Path, { d: (0, PieChartV4_1.annulusPathV4)(cx, cy, rOuter, rInner, a0, a1), fill: (0, PieChartV4_1.segmentFillV4)(palette, colors, segment, i), stroke: palette.ring, strokeWidth: v4_chart_1.CHART_MARK.gap }, segment.label));
                        })) }) }), summary === undefined ? null : (
                // Already spoken by the plot's own label, so the visible copy is
                // hidden rather than read out twice.
                (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: { position: 'absolute' }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "2xl", weight: "bold", numeric: "tabular", children: summary }) }))] }) }), legendNode);
}
//# sourceMappingURL=DonutChartV4.js.map
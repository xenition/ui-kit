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
exports.PieChart = PieChart;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const react_native_svg_1 = __importStar(require("react-native-svg"));
const theme_1 = require("../theme");
/** Semantic palette cycled for slices without an explicit color. */
const PALETTE = ['primary', 'accent', 'success', 'warn', 'danger'];
/** Cartesian point on a circle for an angle measured clockwise from 12 o'clock. */
function polar(cx, cy, r, angle) {
    const a = angle - Math.PI / 2;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}
/**
 * SVG pie chart — token-bound (uses `react-native-svg`). Slice angles accumulate
 * from each value's share of the total; colors come from a semantic key or a
 * cycled palette (opacity steps down on wrap-around). Renders a `muted` "No data"
 * note when empty or when every value is zero.
 */
function PieChart({ data, size = 200, showLegend = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const total = data.reduce((sum, d) => sum + Math.max(d.value, 0), 0);
    if (data.length === 0 || total <= 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "No data" }));
    }
    const r = size / 2;
    const cx = r;
    const cy = r;
    const sliceColor = (d, i) => colors[d.color ?? (PALETTE[i % PALETTE.length] ?? 'primary')];
    const sliceOpacity = (d, i) => d.color ? 1 : 1 - Math.floor(i / PALETTE.length) * 0.25;
    let cursor = 0;
    const slices = data.map((d, i) => {
        const frac = Math.max(d.value, 0) / total;
        const start = cursor * Math.PI * 2;
        cursor += frac;
        const end = cursor * Math.PI * 2;
        const p0 = polar(cx, cy, r, start);
        const p1 = polar(cx, cy, r, end);
        const largeArc = end - start > Math.PI ? 1 : 0;
        const d3 = `M ${cx} ${cy} L ${p0.x} ${p0.y} A ${r} ${r} 0 ${largeArc} 1 ${p1.x} ${p1.y} Z`;
        return { d: d3, fill: sliceColor(d, i), opacity: sliceOpacity(d, i), frac };
    });
    const single = slices.length === 1;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: style, children: [(0, jsx_runtime_1.jsx)(react_native_svg_1.default, { width: size, height: size, viewBox: `0 0 ${size} ${size}`, children: (0, jsx_runtime_1.jsx)(react_native_svg_1.G, { children: single ? ((0, jsx_runtime_1.jsx)(react_native_svg_1.Circle, { cx: cx, cy: cy, r: r, fill: slices[0]?.fill ?? colors.primary, fillOpacity: slices[0]?.opacity ?? 1 })) : (slices.map((s, i) => ((0, jsx_runtime_1.jsx)(react_native_svg_1.Path, { d: s.d, fill: s.fill, fillOpacity: s.opacity }, i)))) }) }), showLegend ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.sm, gap: tokens.spacing.xs }, children: data.map((d, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                width: 12,
                                height: 12,
                                borderRadius: tokens.radius.sm,
                                backgroundColor: sliceColor(d, i),
                                opacity: sliceOpacity(d, i),
                            } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs }, children: d.label })] }, i))) })) : null] }));
}
//# sourceMappingURL=PieChart.js.map
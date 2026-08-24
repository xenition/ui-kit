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
exports.DonutChart = DonutChart;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const react_native_svg_1 = __importStar(require("react-native-svg"));
const theme_1 = require("../theme");
const PALETTE = ['primary', 'accent', 'success', 'warn', 'danger'];
function polar(cx, cy, r, angle) {
    const a = angle - Math.PI / 2;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}
/**
 * SVG donut chart — token-bound (uses `react-native-svg`). Like `PieChart` but
 * each segment is an annular sector between an inner and outer radius, leaving a
 * hole for an optional `centerLabel`. Colors are semantic keys or a cycled
 * palette. Renders a `muted` "No data" note when empty or all-zero.
 */
function DonutChart({ data, size = 200, thickness = 32, centerLabel, showLegend = false, accessibilityLabel, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const total = data.reduce((sum, d) => sum + Math.max(d.value, 0), 0);
    if (data.length === 0 || total <= 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "No data" }));
    }
    const rOuter = size / 2;
    const rInner = Math.max(rOuter - thickness, 1);
    const cx = rOuter;
    const cy = rOuter;
    const segColor = (d, i) => colors[d.color ?? (PALETTE[i % PALETTE.length] ?? 'primary')];
    const segOpacity = (d, i) => d.color ? 1 : 1 - Math.floor(i / PALETTE.length) * 0.25;
    let cursor = 0;
    const segments = data.map((d, i) => {
        const frac = Math.max(d.value, 0) / total;
        const start = cursor * Math.PI * 2;
        cursor += frac;
        const end = cursor * Math.PI * 2;
        const o0 = polar(cx, cy, rOuter, start);
        const o1 = polar(cx, cy, rOuter, end);
        const i1 = polar(cx, cy, rInner, end);
        const i0 = polar(cx, cy, rInner, start);
        const largeArc = end - start > Math.PI ? 1 : 0;
        const path = `M ${o0.x} ${o0.y} A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${o1.x} ${o1.y} ` +
            `L ${i1.x} ${i1.y} A ${rInner} ${rInner} 0 ${largeArc} 0 ${i0.x} ${i0.y} Z`;
        return { path, fill: segColor(d, i), opacity: segOpacity(d, i) };
    });
    const single = segments.length === 1;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: accessibilityLabel ??
            `Donut chart, ${data.length} segments${centerLabel ? `, ${centerLabel}` : ''}`, style: style, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { width: size, height: size, alignItems: 'center', justifyContent: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_svg_1.default, { width: size, height: size, viewBox: `0 0 ${size} ${size}`, children: (0, jsx_runtime_1.jsx)(react_native_svg_1.G, { children: single ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_svg_1.Circle, { cx: cx, cy: cy, r: rOuter, fill: segments[0]?.fill ?? colors.primary, fillOpacity: segments[0]?.opacity ?? 1 }), (0, jsx_runtime_1.jsx)(react_native_svg_1.Circle, { cx: cx, cy: cy, r: rInner, fill: colors.surface })] })) : (segments.map((s, i) => ((0, jsx_runtime_1.jsx)(react_native_svg_1.Path, { d: s.path, fill: s.fill, fillOpacity: s.opacity }, i)))) }) }), centerLabel ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            position: 'absolute',
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale.lg,
                            fontFamily: tokens.typography.fontHeading,
                        }, children: centerLabel })) : null] }), showLegend ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.sm, gap: tokens.spacing.xs }, children: data.map((d, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                width: 12,
                                height: 12,
                                borderRadius: tokens.radius.sm,
                                backgroundColor: segColor(d, i),
                                opacity: segOpacity(d, i),
                            } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs }, children: d.label })] }, i))) })) : null] }));
}
//# sourceMappingURL=DonutChart.js.map
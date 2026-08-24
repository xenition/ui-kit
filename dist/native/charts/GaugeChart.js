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
exports.GaugeChart = GaugeChart;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const react_native_svg_1 = __importStar(require("react-native-svg"));
const theme_1 = require("../theme");
function polar(cx, cy, r, angle) {
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
}
/**
 * SVG gauge — token-bound (uses `react-native-svg`). A 180° semicircular track
 * (`border`) with a value arc filled in a semantic `color` and a needle pointing
 * at the clamped value. `max` guards divide-by-zero. Renders a `muted` "No data"
 * note only when `max <= 0`.
 */
function GaugeChart({ value, max = 100, size = 220, thickness = 18, color = 'primary', showValue = true, accessibilityLabel, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (max <= 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "No data" }));
    }
    const width = size;
    const height = size / 2 + thickness;
    const cx = width / 2;
    const cy = size / 2 + thickness / 2;
    const r = size / 2 - thickness / 2;
    const clamped = Math.min(Math.max(value, 0), max);
    const frac = clamped / max;
    // Sweep from 180° (left) to 360° (right) across the top half.
    const start = Math.PI;
    const end = Math.PI + frac * Math.PI;
    const trackStart = polar(cx, cy, r, Math.PI);
    const trackEnd = polar(cx, cy, r, Math.PI * 2);
    const valStart = polar(cx, cy, r, start);
    const valEnd = polar(cx, cy, r, end);
    const largeArc = end - start > Math.PI ? 1 : 0;
    const needle = polar(cx, cy, r, end);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: accessibilityLabel ?? `Gauge, ${clamped} of ${max}`, style: style, children: [(0, jsx_runtime_1.jsx)(react_native_svg_1.default, { width: width, height: height, viewBox: `0 0 ${width} ${height}`, children: (0, jsx_runtime_1.jsxs)(react_native_svg_1.G, { children: [(0, jsx_runtime_1.jsx)(react_native_svg_1.Path, { d: `M ${trackStart.x} ${trackStart.y} A ${r} ${r} 0 0 1 ${trackEnd.x} ${trackEnd.y}`, fill: "none", stroke: colors.border, strokeWidth: thickness, strokeLinecap: "round" }), (0, jsx_runtime_1.jsx)(react_native_svg_1.Path, { d: `M ${valStart.x} ${valStart.y} A ${r} ${r} 0 ${largeArc} 1 ${valEnd.x} ${valEnd.y}`, fill: "none", stroke: colors[color], strokeWidth: thickness, strokeLinecap: "round" }), (0, jsx_runtime_1.jsx)(react_native_svg_1.Line, { x1: cx, y1: cy, x2: needle.x, y2: needle.y, stroke: colors[color], strokeWidth: 2 })] }) }), showValue ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    textAlign: 'center',
                    marginTop: tokens.spacing.xs,
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.lg,
                    fontFamily: tokens.typography.fontHeading,
                }, children: clamped })) : null] }));
}
//# sourceMappingURL=GaugeChart.js.map
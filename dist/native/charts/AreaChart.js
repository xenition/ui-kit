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
exports.AreaChart = AreaChart;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const react_native_svg_1 = __importStar(require("react-native-svg"));
const theme_1 = require("../theme");
/**
 * SVG area chart — token-bound (uses `react-native-svg`). A line over a filled
 * region (semantic `color` at a low `fillOpacity`); geometry is scaled from the
 * data's own min/max. Renders a `muted` "No data" note on empty input and guards
 * zero-range series.
 */
function AreaChart({ data, height = 160, width = 300, color = 'primary', fillOpacity = 0.2, strokeWidth = 2, showDots = false, accessibilityLabel, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (data.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "No data" }));
    }
    const pad = 8;
    const points = data.map((d, i) => typeof d === 'number' ? { x: i, y: d } : { x: d.x, y: d.y });
    const xs = points.map((p) => p.x);
    const ys = points.map((p) => p.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    const spanX = maxX - minX || 1;
    const spanY = maxY - minY || 1;
    const plotW = Math.max(width - pad * 2, 1);
    const plotH = Math.max(height - pad * 2, 1);
    const baseY = pad + plotH;
    const pixels = points.map((p) => ({
        px: pad + ((p.x - minX) / spanX) * plotW,
        py: pad + (1 - (p.y - minY) / spanY) * plotH,
    }));
    const first = pixels[0] ?? { px: pad, py: baseY };
    const last = pixels[pixels.length - 1] ?? first;
    const lineSegs = pixels.map((p) => `L ${p.px} ${p.py}`).join(' ');
    const areaPath = `M ${first.px} ${baseY} L ${first.px} ${first.py} ${lineSegs} L ${last.px} ${baseY} Z`;
    const polyPoints = pixels.map((p) => `${p.px},${p.py}`).join(' ');
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: accessibilityLabel ?? `Area chart, ${data.length} points`, style: style, children: (0, jsx_runtime_1.jsxs)(react_native_svg_1.default, { width: width, height: height, viewBox: `0 0 ${width} ${height}`, children: [(0, jsx_runtime_1.jsx)(react_native_svg_1.Path, { d: areaPath, fill: colors[color], fillOpacity: fillOpacity, stroke: "none" }), (0, jsx_runtime_1.jsx)(react_native_svg_1.Polyline, { points: polyPoints, fill: "none", stroke: colors[color], strokeWidth: strokeWidth, strokeLinejoin: "round", strokeLinecap: "round" }), showDots
                    ? pixels.map((p, i) => ((0, jsx_runtime_1.jsx)(react_native_svg_1.Circle, { cx: p.px, cy: p.py, r: strokeWidth + 1, fill: colors[color] }, i)))
                    : null] }) }));
}
//# sourceMappingURL=AreaChart.js.map
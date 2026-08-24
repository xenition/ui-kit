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
exports.ScatterChart = ScatterChart;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const react_native_svg_1 = __importStar(require("react-native-svg"));
const theme_1 = require("../theme");
/**
 * SVG scatter plot — token-bound (uses `react-native-svg`). Each point is a
 * semantic-`color` circle scaled from the data's own x/y min/max into the plot
 * box; zero-range axes are guarded. Optional `border` axis lines. Renders a
 * `muted` "No data" note on empty input.
 */
function ScatterChart({ points, height = 200, width = 300, color = 'primary', dotRadius = 4, showAxes = true, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (points.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "No data" }));
    }
    const pad = 12;
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
    const pixels = points.map((p) => ({
        cx: pad + ((p.x - minX) / spanX) * plotW,
        cy: pad + (1 - (p.y - minY) / spanY) * plotH,
    }));
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: style, children: (0, jsx_runtime_1.jsx)(react_native_svg_1.default, { width: width, height: height, viewBox: `0 0 ${width} ${height}`, children: (0, jsx_runtime_1.jsxs)(react_native_svg_1.G, { children: [showAxes ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_svg_1.Line, { x1: pad, y1: pad, x2: pad, y2: pad + plotH, stroke: colors.border, strokeWidth: 1 }), (0, jsx_runtime_1.jsx)(react_native_svg_1.Line, { x1: pad, y1: pad + plotH, x2: pad + plotW, y2: pad + plotH, stroke: colors.border, strokeWidth: 1 })] })) : null, pixels.map((p, i) => ((0, jsx_runtime_1.jsx)(react_native_svg_1.Circle, { cx: p.cx, cy: p.cy, r: dotRadius, fill: colors[color], fillOpacity: 0.85 }, i)))] }) }) }));
}
//# sourceMappingURL=ScatterChart.js.map
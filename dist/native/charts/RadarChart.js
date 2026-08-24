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
exports.RadarChart = RadarChart;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const react_native_svg_1 = __importStar(require("react-native-svg"));
const theme_1 = require("../theme");
const PALETTE = ['primary', 'accent', 'success', 'warn', 'danger'];
/**
 * SVG radar / spider chart — token-bound (uses `react-native-svg`). Draws `border`
 * grid rings and spokes, then one filled `Polygon` per series (semantic color,
 * low fill opacity). Values are normalized to `max`. Renders a `muted` "No data"
 * note when there are no axes or no series.
 */
function RadarChart({ axes, series, size = 220, max, rings = 4, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (axes.length === 0 || series.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "No data" }));
    }
    const n = axes.length;
    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2 - 8;
    const ceiling = Math.max(max ?? Math.max(1, ...series.flat()), 1);
    const angleAt = (i) => -Math.PI / 2 + (i / n) * Math.PI * 2;
    const point = (i, radius) => ({
        x: cx + radius * Math.cos(angleAt(i)),
        y: cy + radius * Math.sin(angleAt(i)),
    });
    const ringPolys = Array.from({ length: rings }, (_, ri) => {
        const rr = (r * (ri + 1)) / rings;
        return Array.from({ length: n }, (_, i) => {
            const p = point(i, rr);
            return `${p.x},${p.y}`;
        }).join(' ');
    });
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: style, children: (0, jsx_runtime_1.jsx)(react_native_svg_1.default, { width: size, height: size, viewBox: `0 0 ${size} ${size}`, children: (0, jsx_runtime_1.jsxs)(react_native_svg_1.G, { children: [ringPolys.map((pts, i) => ((0, jsx_runtime_1.jsx)(react_native_svg_1.Polygon, { points: pts, fill: "none", stroke: colors.border, strokeWidth: 1 }, `ring-${i}`))), axes.map((_, i) => {
                        const p = point(i, r);
                        return ((0, jsx_runtime_1.jsx)(react_native_svg_1.Line, { x1: cx, y1: cy, x2: p.x, y2: p.y, stroke: colors.border, strokeWidth: 1 }, `spoke-${i}`));
                    }), series.map((row, si) => {
                        const stroke = colors[PALETTE[si % PALETTE.length] ?? 'primary'];
                        const pts = Array.from({ length: n }, (_, i) => {
                            const v = Math.max(row[i] ?? 0, 0);
                            const p = point(i, (Math.min(v, ceiling) / ceiling) * r);
                            return `${p.x},${p.y}`;
                        }).join(' ');
                        return ((0, jsx_runtime_1.jsx)(react_native_svg_1.Polygon, { points: pts, fill: stroke, fillOpacity: 0.2, stroke: stroke, strokeWidth: 2 }, `series-${si}`));
                    })] }) }) }));
}
//# sourceMappingURL=RadarChart.js.map
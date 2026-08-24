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
exports.RadarChart = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
/** Point at `angle` (radians, from top) and radius `r` around center `c`. */
function spoke(c, r, angle) {
    return [c + r * Math.sin(angle), c - r * Math.cos(angle)];
}
/**
 * Radar / spider chart — one polygon per series over evenly-spaced axes. Series
 * strokes/fills cycle the theme series vars (fill at low opacity); grid rings
 * use `--xen-border`. No literal colors. Guards empty data and a zero `max`.
 */
exports.RadarChart = React.forwardRef(function RadarChart({ data, series, labels, max, size = 200, className, ...rest }, ref) {
    const allSeries = series && series.length > 0 ? series : data ? [data] : [];
    const axisCount = Math.max(...allSeries.map((s) => s.length), 0);
    if (allSeries.length === 0 || axisCount === 0)
        return (0, jsx_runtime_1.jsx)(internal_1.ChartEmpty, {});
    const c = size / 2;
    const r = size / 2 - 1;
    const ceiling = (0, internal_1.safeMax)(allSeries.flat(), max);
    const step = (Math.PI * 2) / axisCount;
    const ringPoints = (radius) => Array.from({ length: axisCount }, (_, i) => spoke(c, radius, i * step))
        .map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`)
        .join(' ');
    return ((0, jsx_runtime_1.jsxs)("svg", { ref: ref, viewBox: `0 0 ${size} ${size}`, width: size, height: size, role: "img", "aria-label": `Radar chart, ${allSeries.length} series, ${axisCount} axes`, className: (0, cn_1.cn)('inline-block', className), ...rest, children: [[0.25, 0.5, 0.75, 1].map((f) => ((0, jsx_runtime_1.jsx)("polygon", { points: ringPoints(r * f), fill: "none", stroke: "var(--xen-border)", strokeWidth: 1 }, f))), allSeries.map((s, si) => {
                const stroke = (0, internal_1.seriesColor)(si);
                const pts = Array.from({ length: axisCount }, (_, i) => {
                    const v = s[i] ?? 0;
                    const radius = (Math.min(Math.max(v, 0), ceiling) / ceiling) * r;
                    return spoke(c, radius, i * step);
                });
                const poly = pts.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ');
                return (0, jsx_runtime_1.jsx)("polygon", { points: poly, fill: stroke, fillOpacity: 0.15, stroke: stroke, strokeWidth: 2 }, si);
            }), labels
                ? labels.slice(0, axisCount).map((label, i) => {
                    const [x, y] = spoke(c, r + 0.5, i * step);
                    return ((0, jsx_runtime_1.jsx)("text", { x: x.toFixed(2), y: y.toFixed(2), className: "fill-current text-muted", fontSize: 9, textAnchor: "middle", dominantBaseline: "middle", children: label }, i));
                })
                : null] }));
});
//# sourceMappingURL=RadarChart.js.map
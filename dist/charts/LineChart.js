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
exports.LineChart = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
/**
 * Single-series line chart drawn as an inline SVG `<polyline>` — token-bound
 * (`stroke: var(--xen-<color>)`), no literal colors and no charting dependency.
 * Values are scaled into the viewBox with divide-by-zero guards; a flat series
 * (min === max) renders as a centered horizontal line.
 */
exports.LineChart = React.forwardRef(function LineChart({ data, height = 120, width = 320, color = 'primary', max, min, showDots = false, className, ...rest }, ref) {
    if (data.length === 0)
        return (0, jsx_runtime_1.jsx)(internal_1.ChartEmpty, {});
    const hi = max ?? Math.max(...data);
    const lo = min ?? Math.min(...data);
    const range = hi - lo || 1;
    const stroke = (0, internal_1.colorVar)(color);
    const points = data.map((v, i) => {
        const x = data.length === 1 ? width / 2 : (i / (data.length - 1)) * width;
        const y = height - ((v - lo) / range) * height;
        return { x, y };
    });
    const poly = points.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ');
    return ((0, jsx_runtime_1.jsxs)("svg", { ref: ref, viewBox: `0 0 ${width} ${height}`, width: "100%", height: height, preserveAspectRatio: "none", role: "img", className: (0, cn_1.cn)('overflow-visible', className), ...rest, children: [(0, jsx_runtime_1.jsx)("polyline", { points: poly, fill: "none", stroke: stroke, strokeWidth: 2, strokeLinejoin: "round", strokeLinecap: "round" }), showDots
                ? points.map((p, i) => (0, jsx_runtime_1.jsx)("circle", { cx: p.x, cy: p.y, r: 3, fill: stroke }, i))
                : null] }));
});
//# sourceMappingURL=LineChart.js.map
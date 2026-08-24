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
exports.DonutChart = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
/** Point on a circle of radius `r` centered at `(cx, cy)` at `angle` radians. */
function polar(cx, cy, r, angle) {
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
}
/**
 * Donut chart — a pie with a `--xen-surface` hole punched in the center (drawn
 * as a surface-filled `<circle>` over the slices). Slice colors cycle the theme
 * series vars; the center label uses the `text-on-surface` token class. Guards
 * a zero total and a single full slice.
 */
exports.DonutChart = React.forwardRef(function DonutChart({ data, size = 160, thickness = 0.42, centerLabel, className, ...rest }, ref) {
    const values = data.map((d) => Math.max(d.value, 0));
    const total = values.reduce((s, v) => s + v, 0);
    if (data.length === 0 || total <= 0)
        return (0, jsx_runtime_1.jsx)(internal_1.ChartEmpty, {});
    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2;
    const innerR = r * (1 - Math.min(Math.max(thickness, 0.05), 0.95));
    const fillFor = (d, i) => (d.color ? (0, internal_1.colorVar)(d.color) : (0, internal_1.seriesColor)(i));
    const nonZero = data.filter((d) => Math.max(d.value, 0) > 0);
    const single = nonZero.length === 1;
    let angle = -Math.PI / 2;
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('relative inline-block', className), style: { width: size, height: size }, children: [(0, jsx_runtime_1.jsxs)("svg", { ref: ref, viewBox: `0 0 ${size} ${size}`, width: size, height: size, role: "img", ...rest, children: [single ? ((0, jsx_runtime_1.jsx)("circle", { cx: cx, cy: cy, r: r, fill: fillFor(nonZero[0] ?? data[0], 0) })) : (data.map((d, i) => {
                        const frac = Math.max(d.value, 0) / total;
                        if (frac <= 0)
                            return null;
                        const a0 = angle;
                        const a1 = angle + frac * Math.PI * 2;
                        angle = a1;
                        const [x0, y0] = polar(cx, cy, r, a0);
                        const [x1, y1] = polar(cx, cy, r, a1);
                        const large = a1 - a0 > Math.PI ? 1 : 0;
                        const path = `M${cx} ${cy} L${x0.toFixed(2)} ${y0.toFixed(2)} A${r} ${r} 0 ${large} 1 ${x1.toFixed(2)} ${y1.toFixed(2)} Z`;
                        return (0, jsx_runtime_1.jsx)("path", { d: path, fill: fillFor(d, i), stroke: "var(--xen-surface)", strokeWidth: 1 }, i);
                    })), (0, jsx_runtime_1.jsx)("circle", { cx: cx, cy: cy, r: innerR, fill: "var(--xen-surface)" })] }), centerLabel ? ((0, jsx_runtime_1.jsx)("span", { className: "absolute inset-0 flex items-center justify-center text-on-surface text-lg font-semibold", children: centerLabel })) : null] }));
});
//# sourceMappingURL=DonutChart.js.map
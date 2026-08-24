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
exports.PieChart = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
/** Point on a circle of radius `r` centered at `(cx, cy)` at `angle` radians. */
function polar(cx, cy, r, angle) {
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
}
/**
 * Pie chart — inline SVG arc `<path>`s, one per slice. Slice colors cycle the
 * theme series vars (`var(--xen-primary|accent|success|warn|danger)`); no
 * literal colors. A total of zero renders the empty state; a single non-zero
 * slice draws a full `<circle>` (arc paths can't express 360°).
 */
exports.PieChart = React.forwardRef(function PieChart({ data, size = 160, className, ...rest }, ref) {
    const values = data.map((d) => Math.max(d.value, 0));
    const total = values.reduce((s, v) => s + v, 0);
    if (data.length === 0 || total <= 0)
        return (0, jsx_runtime_1.jsx)(internal_1.ChartEmpty, {});
    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2;
    const fillFor = (d, i) => (d.color ? (0, internal_1.colorVar)(d.color) : (0, internal_1.seriesColor)(i));
    const nonZero = data.filter((d) => Math.max(d.value, 0) > 0);
    const single = nonZero.length === 1;
    let angle = -Math.PI / 2; // start at 12 o'clock
    return ((0, jsx_runtime_1.jsx)("svg", { ref: ref, viewBox: `0 0 ${size} ${size}`, width: size, height: size, role: "img", "aria-label": `Pie chart, ${data.length} slices`, className: (0, cn_1.cn)('inline-block', className), ...rest, children: single ? ((0, jsx_runtime_1.jsx)("circle", { cx: cx, cy: cy, r: r, fill: fillFor(nonZero[0] ?? data[0], data.indexOf(nonZero[0] ?? data[0])) })) : (data.map((d, i) => {
            const frac = Math.max(d.value, 0) / total;
            if (frac <= 0)
                return null;
            const a0 = angle;
            const a1 = angle + frac * Math.PI * 2;
            angle = a1;
            const [x0, y0] = polar(cx, cy, r, a0);
            const [x1, y1] = polar(cx, cy, r, a1);
            const large = a1 - a0 > Math.PI ? 1 : 0;
            const d0 = `M${cx} ${cy} L${x0.toFixed(2)} ${y0.toFixed(2)} A${r} ${r} 0 ${large} 1 ${x1.toFixed(2)} ${y1.toFixed(2)} Z`;
            return (0, jsx_runtime_1.jsx)("path", { d: d0, fill: fillFor(d, i), stroke: "var(--xen-surface)", strokeWidth: 1 }, i);
        })) }));
});
//# sourceMappingURL=PieChart.js.map
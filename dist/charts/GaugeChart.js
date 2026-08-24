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
exports.GaugeChart = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
/** Point on a semicircle: `t` in [0,1] maps 180°→0° (left→right). */
function arcPoint(cx, cy, r, t) {
    const a = Math.PI * (1 - t);
    return [cx + r * Math.cos(a), cy - r * Math.sin(a)];
}
/**
 * Semicircular gauge — a `--xen-border` track arc, a value arc in
 * `var(--xen-<color>)`, and a needle to the current value. All colors are
 * tokens. `value` is clamped into `[min, max]` and a zero span is guarded.
 */
exports.GaugeChart = React.forwardRef(function GaugeChart({ value, min = 0, max = 100, size = 200, color = 'primary', showValue = true, className, ...rest }, ref) {
    const span = max - min || 1;
    const t = (0, internal_1.clamp01)((value - min) / span);
    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2 - 6;
    const stroke = (0, internal_1.colorVar)(color);
    const [sx, sy] = arcPoint(cx, cy, r, 0);
    const [ex, ey] = arcPoint(cx, cy, r, 1);
    const [vx, vy] = arcPoint(cx, cy, r, t);
    const track = `M${sx.toFixed(2)} ${sy.toFixed(2)} A${r} ${r} 0 0 1 ${ex.toFixed(2)} ${ey.toFixed(2)}`;
    const large = t > 0.5 ? 1 : 0;
    const fill = `M${sx.toFixed(2)} ${sy.toFixed(2)} A${r} ${r} 0 ${large} 1 ${vx.toFixed(2)} ${vy.toFixed(2)}`;
    const height = cy + 8;
    return ((0, jsx_runtime_1.jsxs)("svg", { ref: ref, viewBox: `0 0 ${size} ${height}`, width: size, height: height, role: "img", className: (0, cn_1.cn)('inline-block', className), ...rest, children: [(0, jsx_runtime_1.jsx)("path", { d: track, fill: "none", stroke: "var(--xen-border)", strokeWidth: 10, strokeLinecap: "round" }), (0, jsx_runtime_1.jsx)("path", { d: fill, fill: "none", stroke: stroke, strokeWidth: 10, strokeLinecap: "round" }), (0, jsx_runtime_1.jsx)("line", { x1: cx, y1: cy, x2: vx, y2: vy, stroke: stroke, strokeWidth: 2 }), (0, jsx_runtime_1.jsx)("circle", { cx: cx, cy: cy, r: 4, fill: stroke }), showValue ? ((0, jsx_runtime_1.jsx)("text", { x: cx, y: cy - r / 2, className: "fill-current text-on-surface", fontSize: size * 0.14, fontWeight: 600, textAnchor: "middle", children: value })) : null] }));
});
//# sourceMappingURL=GaugeChart.js.map
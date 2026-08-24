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
exports.ProgressRing = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
/**
 * Circular progress indicator — a `--xen-border` track circle plus a
 * `var(--xen-<color>)` progress circle drawn with `stroke-dasharray` /
 * `stroke-dashoffset`. The ratio is clamped to `[0, 1]` and a zero `max` is
 * guarded; the optional center label uses `text-on-surface`.
 */
exports.ProgressRing = React.forwardRef(function ProgressRing({ value, max = 100, size = 120, thickness = 10, color = 'primary', showValue = true, className, ...rest }, ref) {
    const ratio = (0, internal_1.clamp01)(value / (max || 1));
    const r = (size - thickness) / 2;
    const circumference = 2 * Math.PI * r;
    const dash = circumference * ratio;
    const stroke = (0, internal_1.colorVar)(color);
    const cx = size / 2;
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('relative inline-block', className), style: { width: size, height: size }, children: [(0, jsx_runtime_1.jsxs)("svg", { ref: ref, viewBox: `0 0 ${size} ${size}`, width: size, height: size, role: "img", ...rest, children: [(0, jsx_runtime_1.jsx)("circle", { cx: cx, cy: cx, r: r, fill: "none", stroke: "var(--xen-border)", strokeWidth: thickness }), (0, jsx_runtime_1.jsx)("circle", { cx: cx, cy: cx, r: r, fill: "none", stroke: stroke, strokeWidth: thickness, strokeLinecap: "round", strokeDasharray: circumference, strokeDashoffset: circumference - dash, transform: `rotate(-90 ${cx} ${cx})` })] }), showValue ? ((0, jsx_runtime_1.jsxs)("span", { className: "absolute inset-0 flex items-center justify-center text-on-surface text-lg font-semibold", children: [Math.round(ratio * 100), "%"] })) : null] }));
});
//# sourceMappingURL=ProgressRing.js.map
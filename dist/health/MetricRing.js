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
exports.MetricRing = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const ProgressRing_1 = require("../charts/ProgressRing");
/**
 * A single labelled progress ring for one health metric — wraps the charts
 * {@link ProgressRing} and adds a value/goal caption below. When `goal <= 0` it
 * degrades to a muted "No goal set" note. Web parity of the native `MetricRing`;
 * the ring carries an `aria-label`, token-only colors.
 */
exports.MetricRing = React.forwardRef(function MetricRing({ label, value, goal, unit, color = 'primary', size = 120, centerLabel, className, ...rest }, ref) {
    if (goal <= 0) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col items-center gap-[var(--xen-space-xs)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: "No goal set" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-on-surface", children: label })] }));
    }
    const clamped = Math.min(Math.max(value, 0), goal);
    const pct = Math.round((clamped / goal) * 100);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col items-center gap-[var(--xen-space-xs)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative flex items-center justify-center", style: { width: size, height: size }, children: [(0, jsx_runtime_1.jsx)(ProgressRing_1.ProgressRing, { value: clamped, max: goal, size: size, color: color, showValue: false, "aria-label": `${label}: ${clamped} of ${goal}${unit ? ` ${unit}` : ''}, ${pct}%` }), (0, jsx_runtime_1.jsx)("span", { className: "absolute inset-0 flex items-center justify-center text-lg font-semibold text-on-surface", children: centerLabel ?? `${pct}%` })] }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-on-surface", children: label }), (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: [clamped, " / ", goal, unit ? ` ${unit}` : ''] })] }));
});
//# sourceMappingURL=MetricRing.js.map
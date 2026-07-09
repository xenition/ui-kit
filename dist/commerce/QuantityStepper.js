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
exports.QuantityStepper = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
/**
 * A −/n/+ quantity control. Values are clamped to `[min, max]`; the boundary
 * button disables itself at each end so `onChange` never fires an out-of-range
 * value. Token-only, keyboard-native (real `<button>`s), and labelled as a
 * group.
 */
exports.QuantityStepper = React.forwardRef(function QuantityStepper({ value, min = 1, max = Number.POSITIVE_INFINITY, step = 1, onChange, disabled = false, label = 'Quantity', decrementLabel = 'Decrease quantity', incrementLabel = 'Increase quantity', className, ...rest }, ref) {
    const atMin = value <= min;
    const atMax = value >= max;
    const emit = (next) => {
        const clamped = clamp(next, min, max);
        if (clamped !== value)
            onChange?.(clamped);
    };
    const btn = 'inline-flex h-8 w-8 items-center justify-center text-on-surface transition-colors ' +
        'hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 ' +
        'disabled:pointer-events-none disabled:opacity-40';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "group", "aria-label": label, "data-xen-quantity-stepper": "", className: (0, cn_1.cn)('inline-flex items-center overflow-hidden rounded-[var(--xen-radius-md)] border border-border bg-surface', className), ...rest, children: [(0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": decrementLabel, disabled: disabled || atMin, onClick: () => emit(value - step), className: (0, cn_1.cn)(btn, 'border-r border-border'), children: (0, jsx_runtime_1.jsx)("svg", { "aria-hidden": "true", width: "14", height: "14", viewBox: "0 0 14 14", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", children: (0, jsx_runtime_1.jsx)("path", { d: "M3 7h8" }) }) }), (0, jsx_runtime_1.jsx)("span", { "data-xen-quantity-value": "", "aria-live": "polite", className: "min-w-8 px-[var(--xen-space-sm)] text-center text-sm font-medium tabular-nums text-on-surface", children: value }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": incrementLabel, disabled: disabled || atMax, onClick: () => emit(value + step), className: (0, cn_1.cn)(btn, 'border-l border-border'), children: (0, jsx_runtime_1.jsx)("svg", { "aria-hidden": "true", width: "14", height: "14", viewBox: "0 0 14 14", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", children: (0, jsx_runtime_1.jsx)("path", { d: "M7 3v8M3 7h8" }) }) })] }));
});
//# sourceMappingURL=QuantityStepper.js.map
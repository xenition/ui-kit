"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberInput = NumberInput;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("./cn");
/** Number input with −/+ steppers, bound to the theme tokens. Clamps to [min, max]. */
function NumberInput({ value, onChange, min, max, step = 1, disabled, className, }) {
    const clamp = (v) => Math.max(min ?? -Infinity, Math.min(max ?? Infinity, v));
    const set = (v) => onChange(clamp(v));
    const btn = 'flex h-9 w-9 shrink-0 items-center justify-center text-on-surface transition-colors hover:bg-neutral-100 disabled:pointer-events-none disabled:opacity-40';
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('inline-flex items-center rounded-[var(--xen-radius-sm)] border border-border bg-surface', className), children: [(0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Decrease", className: btn, disabled: disabled || (min != null && value <= min), onClick: () => set(value - step), children: "\u2212" }), (0, jsx_runtime_1.jsx)("input", { type: "number", value: value, min: min, max: max, step: step, disabled: disabled, onChange: (e) => set(Number(e.target.value)), className: "w-14 border-x border-border bg-transparent px-2 py-1.5 text-center text-sm text-on-surface outline-none" }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Increase", className: btn, disabled: disabled || (max != null && value >= max), onClick: () => set(value + step), children: "+" })] }));
}
//# sourceMappingURL=NumberInput.js.map
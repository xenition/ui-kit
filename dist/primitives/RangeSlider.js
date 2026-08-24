"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RangeSlider = RangeSlider;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("./cn");
/**
 * Two-thumb range slider — a two-handle extension of the themed `Slider`. A
 * token-styled rail carries a `primary` fill between two overlaid range thumbs;
 * values are kept ordered so `low ≤ high`. Web parity of the native
 * `RangeSlider`. No literal colors (kit lint rule).
 */
function RangeSlider({ value, min = 0, max = 100, step = 1, onChange, disabled = false, className, }) {
    const lo = value[0];
    const hi = value[1];
    const span = max > min ? max - min : 1;
    const loPct = (Math.max(min, Math.min(max, lo)) - min) / span;
    const hiPct = (Math.max(min, Math.min(max, hi)) - min) / span;
    const setLow = (n) => onChange?.([Math.min(n, hi), hi]);
    const setHigh = (n) => onChange?.([lo, Math.max(n, lo)]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('relative flex h-5 w-full items-center', disabled && 'opacity-50', className), children: [(0, jsx_runtime_1.jsx)("div", { className: "h-1 w-full rounded-[var(--xen-radius-full)] bg-border" }), (0, jsx_runtime_1.jsx)("div", { className: "absolute h-1 rounded-[var(--xen-radius-full)] bg-primary", style: { left: `${loPct * 100}%`, width: `${Math.max(0, hiPct - loPct) * 100}%` } }), (0, jsx_runtime_1.jsx)("input", { type: "range", "aria-label": "Range minimum", value: lo, min: min, max: max, step: step, disabled: disabled, onChange: (e) => setLow(Number(e.target.value)), className: "pointer-events-none absolute h-5 w-full appearance-none bg-transparent accent-primary [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto disabled:pointer-events-none" }), (0, jsx_runtime_1.jsx)("input", { type: "range", "aria-label": "Range maximum", value: hi, min: min, max: max, step: step, disabled: disabled, onChange: (e) => setHigh(Number(e.target.value)), className: "pointer-events-none absolute h-5 w-full appearance-none bg-transparent accent-primary [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto disabled:pointer-events-none" })] }));
}
//# sourceMappingURL=RangeSlider.js.map
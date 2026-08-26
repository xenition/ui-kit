"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RangeSliderV4 = RangeSliderV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
const picker_v4_1 = require("./internal/picker-v4");
/**
 * **V4 two-thumb slider** — the web twin of `RangeSliderV4`, the same props as
 * {@link RangeSlider}, a different design line.
 *
 * ## Two real range inputs, one rail
 *
 * Keeping two `<input type="range">` elements is what makes the control
 * operable at all: each end gets its own thumb, its own arrow keys, its own
 * `slider` role and its own announced value. It is also the §36.4 answer — the
 * browser's own drag tracks the pointer perfectly, with no transition to lag
 * behind it, and nothing here adds one.
 *
 * What the base then does is paint both with `accent-primary`, so the two
 * thumbs are whatever the browser draws, and stack a separate `bg-primary` div
 * to fake the span. V4 turns the appearance off, redraws both thumbs from
 * tokens, blanks both tracks, and paints the rail ONCE from a four-stop
 * gradient keyed off `--xen-v4-slider-from` and `--xen-v4-slider-pct`. One
 * element owns the span, so it can never drift out of step with the thumbs.
 *
 * The inputs are transparent to the pointer except at their thumbs, so a click
 * on the rail reaches the thumb nearest it rather than whichever input happens
 * to be stacked on top.
 *
 * ## Everything else is `SliderV4`'s
 *
 * The grab strip is `--xen-space-2xl` tall so the whole band is live, the rail
 * has weight so the span reads as a quantity (§33), and each thumb is `lg` with
 * a `surface` collar and `--xen-elevation-card` — already zeroed by the
 * compiler for a flat seed. The pair is kept ordered, so a crossed range is not
 * representable.
 */
function RangeSliderV4({ value, min = 0, max = 100, step = 1, onChange, disabled = false, className, }) {
    (0, inject_1.injectStyleOnce)('xen-v4-slider-styles', picker_v4_1.SLIDER_V4_CSS);
    const lo = value[0];
    const hi = value[1];
    const span = max > min ? max - min : 1;
    const loPct = ((Math.max(min, Math.min(max, lo)) - min) / span) * 100;
    const hiPct = ((Math.max(min, Math.min(max, hi)) - min) / span) * 100;
    const setLow = (n) => onChange?.([Math.min(n, hi), hi]);
    const setHigh = (n) => onChange?.([lo, Math.max(n, lo)]);
    const end = (label, v, set) => ((0, jsx_runtime_1.jsx)("input", { type: "range", "data-xen-v4-slider": "", "data-overlay": "", "aria-label": label, value: v, min: min, max: max, step: step, disabled: disabled, onChange: (e) => set(Number(e.target.value)) }));
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('relative flex h-[var(--xen-space-2xl)] w-full items-center', disabled && 'opacity-[0.38]', className), style: {
            // Plain percentages on custom properties: every CSSOM keeps those.
            '--xen-v4-slider-from': `${loPct}%`,
            '--xen-v4-slider-pct': `${hiPct}%`,
        }, children: [(0, jsx_runtime_1.jsx)("div", { "data-xen-v4-rail": "", "aria-hidden": "true", className: "w-full" }), end('Range minimum', lo, setLow), end('Range maximum', hi, setHigh)] }));
}
//# sourceMappingURL=RangeSliderV4.js.map
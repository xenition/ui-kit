"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RadioGroupV4 = RadioGroupV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
const field_v4_1 = require("./internal/field-v4");
const v4_motion_1 = require("./internal/v4-motion");
const RADIO_V4_CSS = `
[data-xen-v4-radio] {
  appearance: none;
  -webkit-appearance: none;
  position: relative;
  cursor: pointer;
}
[data-xen-v4-radio]:checked {
  border-color: var(--xen-primary);
}
[data-xen-v4-radio]::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  width: 50%;
  height: 50%;
  border-radius: var(--xen-radius-full);
  background-color: var(--xen-primary);
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.2);
  transition: ${(0, v4_motion_1.transitionCss)(['opacity', 'transform'], field_v4_1.FIELD_MOTION)};
}
[data-xen-v4-radio]:checked::after {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}
@media (prefers-reduced-motion: reduce) {
  [data-xen-v4-radio]::after { transition: none; }
}
`;
/**
 * **V4 radio group** — the same props as {@link RadioGroup}, a different
 * design line.
 *
 * Each option is still a real `<input type="radio">` inside its `<label>`, so
 * arrow-key navigation within the group, form submission by `name`, and the
 * accessibility tree all come from the platform. Three things change:
 *
 * 1. **The row is the target.** Every option is `2xl` tall — the height every
 *    other V4 control takes — and the label is part of the hit area. The base
 *    made you hit a 16px circle; this makes the choice as big as the choice is.
 * 2. **The label is read at reading size.** `text-base`, not `text-sm`. A
 *    radio label is the sentence someone is deciding between, not a caption on
 *    a control (§10, typography before containers).
 * 3. **The mark arrives.** `accent-color` gives the platform's dot, drawn its
 *    way and switched instantly. V4 turns the appearance off and scales its own
 *    dot up from nothing in {@link FIELD_MOTION}ms, so the selection travels
 *    between options rather than blinking between them (§36.1) — and it takes
 *    the same shared focus ring `InputV4` paints, drawn with `box-shadow` so
 *    arming it costs no layout (§36.11). Under `prefers-reduced-motion` the
 *    transition is dropped and the dot is simply already there (§36.10).
 *
 * §8 bans excessive pill-shaped controls; a radio is round because a radio has
 * always been round, and the roundness is `--xen-radius-full` — so a `sharp`
 * seed still gets the square marks it asked for rather than a capsule the kit
 * insisted on.
 *
 * No gradient, no glass, no shadow: §16 asks that forms stay minimal, and the
 * only thing a list of choices needs is to be easy to read and easy to hit.
 */
function RadioGroupV4({ options, value, onChange, name, orientation = 'vertical', className, }) {
    (0, inject_1.injectStyleOnce)(field_v4_1.FIELD_V4_STYLE_ID, field_v4_1.FIELD_V4_CSS);
    (0, inject_1.injectStyleOnce)('xen-v4-radio-styles', RADIO_V4_CSS);
    return ((0, jsx_runtime_1.jsx)("div", { role: "radiogroup", className: (0, cn_1.cn)('flex', 
        // Vertical rows already carry their own height, so they need less
        // between them than a wrapping row of them does.
        orientation === 'vertical' ? 'flex-col gap-xs' : 'flex-row flex-wrap gap-md', className), children: options.map((o) => ((0, jsx_runtime_1.jsxs)("label", { className: (0, cn_1.cn)('inline-flex min-h-[var(--xen-space-2xl)] cursor-pointer items-center gap-sm', 'text-base text-on-surface', o.disabled && 'pointer-events-none opacity-[0.38]'), children: [(0, jsx_runtime_1.jsx)("input", { type: "radio", "data-xen-v4-radio": "", "data-xen-v4-field": "", name: name, value: o.value, checked: o.value === value, disabled: o.disabled, onChange: () => onChange(o.value), className: (0, cn_1.cn)('h-[var(--xen-space-lg)] w-[var(--xen-space-lg)] shrink-0', 'rounded-[var(--xen-radius-full)] border border-border bg-surface') }), o.label] }, o.value))) }));
}
//# sourceMappingURL=RadioGroupV4.js.map
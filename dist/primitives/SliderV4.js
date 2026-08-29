"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SliderV4 = SliderV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
const picker_v4_1 = require("./internal/picker-v4");
/**
 * **V4 slider** — the web twin of `SliderV4`, the same props as
 * {@link Slider}, a different design line.
 *
 * ## It stays an `<input type="range">`, and that is the §36.4 answer
 *
 * "Direct manipulation must track the finger." The browser's own range input
 * already does that perfectly — the thumb is under the pointer for the whole
 * drag, with the platform's touch tuning — and it brings arrow keys, Home/End,
 * page-step and the `slider` role with it. Rebuilding it on a `div` with
 * pointer events would mean re-earning all of that and getting the touch
 * behaviour subtly wrong. So the element stays and only its skin changes.
 *
 * What the base does is the opposite trade: it keeps the element and paints it
 * with `accent-primary`, which hands the entire look to the browser. The result
 * is a different control in Safari, Chrome and Firefox, and the one part of the
 * kit that is not the kit. V4 turns the appearance off and redraws the track
 * and the thumb from tokens, so the slider is the same object everywhere — and
 * the same object as its React Native twin.
 *
 * **There is no transition on the thumb**, deliberately. A transition is
 * exactly the "disconnected canned animation" §36.4 rules out: the thumb would
 * lag the pointer by however long the easing ran.
 *
 * ## What changes
 *
 *   - **A grab strip at the tap-target floor.** The input is
 *     `--xen-space-2xl` tall even though the rail is `sm`, so the whole strip
 *     is live. A 20px-tall control is the commonest reason a slider feels like
 *     it is ignoring you.
 *   - **A rail with weight,** so the filled portion is a quantity you can read
 *     at a glance (§33) rather than a thread. The fill is painted by the track
 *     itself — a two-stop gradient with both stops at the value — so there is
 *     no second element to fall out of sync.
 *   - **A thumb that looks grabbable:** `primary` with a `surface` collar so it
 *     reads on top of its own fill, and `--xen-elevation-card`, which the
 *     compiler has already zeroed for a flat seed.
 *   - **The same focus halo `InputV4` arms,** so a slider in a form rings like
 *     its neighbours.
 */
function SliderV4({ value, min = 0, max = 100, step = 1, onChange, disabled, className, }) {
    (0, inject_1.injectStyleOnce)('xen-v4-slider-styles', picker_v4_1.SLIDER_V4_CSS);
    const span = max > min ? max - min : 1;
    const pct = Math.max(0, Math.min(1, (value - min) / span)) * 100;
    return ((0, jsx_runtime_1.jsx)("input", { type: "range", "data-xen-v4-slider": "", value: value, min: min, max: max, step: step, disabled: disabled, onChange: (e) => onChange(Number(e.target.value)), className: (0, cn_1.cn)('w-full', className), style: {
            // A plain percentage, and a custom property: every CSSOM keeps those,
            // unlike a color-mix() on a standard property.
            '--xen-v4-slider-pct': `${pct}%`,
        } }));
}
//# sourceMappingURL=SliderV4.js.map
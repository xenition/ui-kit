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
exports.GoalCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const goal_v4_1 = require("./goal-v4");
const tone_v4_2 = require("./internal/tone-v4");
/**
 * **V4 goal card** — same props as {@link GoalCard} plus `noGoalLabel`,
 * `metLabel`, `formatValue` and `appearance`.
 *
 * ## Six changes
 *
 * 1. **A walk of 12,400 steps against a 10,000 target no longer reports three
 *    different numbers.** The base showed `12400`, announced "12400 of 10000,
 *    100%" and set `aria-valuenow={10000}` — the measurement, the percentage
 *    and the meter each disagreed with the other two. `goalParts` keeps the
 *    measurement and the drawn fraction apart, so the bar fills to 100%, the
 *    meter reports a consistent 100% of its own range, and the overshoot is
 *    said out loud in `aria-valuetext` and printed on the card.
 * 2. **The meter is reachable.** The whole card was a `role="button"`, and a
 *    `progressbar` inside a button is presentational — its value is dropped
 *    outright. The card is now a plain container, the activation wraps only the
 *    title-and-value region and carries the card's spoken name, and the bar
 *    sits beside it with its own role and its own value.
 * 3. **The activation is a real `<button>`.** A `div` with `role="button"`,
 *    `tabIndex={0}` and a hand-written Enter/Space handler is three
 *    approximations of what a button already does, and it was 40px tall on a
 *    thumb-driven screen.
 * 4. **Press is a state layer.** `hover:opacity-90` fades the card's own
 *    content, which is the signal M3 spends 0.38 on to mean *disabled*.
 * 5. **A goal of nought is "no target", not 0%.** `target={0}` drew an empty
 *    track under a real measurement.
 * 6. **The ink is the corrected slot and the track is not a hairline.** The
 *    "Goal met" note and the value drew in `text-success`, the *fill* token,
 *    measured as low as 1.32:1; the track was `bg-border`, the hairline colour
 *    doing a surface's job.
 */
exports.GoalCardV4 = React.forwardRef(function GoalCardV4({ title, value, target, unit, color = 'primary', icon, onPress, noGoalLabel = 'No target set', metLabel = 'Goal met', formatValue, appearance = 'classic', className, ...rest }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    }, []);
    const parts = (0, goal_v4_1.goalParts)(value, target);
    const show = formatValue ?? ((amount, suffix) => `${amount}${suffix ? ` ${suffix}` : ''}`);
    const barTone = parts.met ? 'success' : color;
    // The overshoot is the interesting fact about an exceeded goal, so it is a
    // sentence rather than a number the card silently threw away.
    const overText = parts.over > 0 ? `+${show(parts.over, unit)}` : undefined;
    const name = (0, tone_v4_2.spokenLine)([
        title,
        parts.hasGoal
            ? `${show(parts.value, unit)} of ${show(parts.target ?? 0, unit)}`
            : show(parts.value, unit),
        parts.hasGoal ? `${parts.percent}%` : noGoalLabel,
        parts.met ? metLabel : undefined,
        overText,
    ]);
    const head = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-sm", children: [icon ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "leading-none", children: icon })) : null, (0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-base font-semibold text-on-card", children: title }), parts.met ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-bold', tone_v4_1.TONE_INK.success), children: `✓ ${metLabel}` })) : null] }), (0, jsx_runtime_1.jsxs)("span", { className: "flex items-baseline gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-2xl font-bold', parts.met ? tone_v4_1.TONE_INK.success : 'text-on-card'), children: show(parts.value, undefined) }), parts.hasGoal ? ((0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted-text", children: `/ ${show(parts.target ?? 0, unit)}` })) : unit ? ((0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted-text", children: unit })) : null, overText ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-semibold', tone_v4_1.TONE_INK.success), children: overText })) : null] })] }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-sm', tone_v4_2.HEALTH_CARD_CLASS, (0, tone_v4_2.appearanceClass)(appearance), className), ...rest, children: [onPress ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": name, onClick: onPress, "data-xen-v4-state": "", style: (0, tone_v4_2.appearanceStateVars)(appearance), className: (0, cn_1.cn)('flex flex-col gap-xs rounded-[var(--xen-radius-md)] bg-transparent text-left', chrome_v4_1.MIN_TAP_CLASS, tone_v4_2.FOCUS_RING_CLASS), children: head })) : ((0, jsx_runtime_1.jsx)("span", { className: "flex flex-col gap-xs", children: head })), parts.hasGoal ? ((0, jsx_runtime_1.jsx)("div", { role: "progressbar", "aria-valuenow": Math.round((parts.ratio ?? 0) * (parts.target ?? 0)), "aria-valuemin": 0, "aria-valuemax": parts.target, "aria-valuetext": (0, tone_v4_2.spokenLine)([
                    `${show(parts.value, unit)} of ${show(parts.target ?? 0, unit)}`,
                    `${parts.percent}%`,
                    overText,
                ]), "aria-label": title, className: (0, cn_1.cn)('h-2 overflow-hidden rounded-full', tone_v4_2.TRACK_CLASS), children: (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-full rounded-full', tone_v4_1.TONE_BG[barTone]), style: { width: `${parts.percent ?? 0}%` } }) })) : ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: noGoalLabel }))] }));
});
//# sourceMappingURL=GoalCardV4.js.map
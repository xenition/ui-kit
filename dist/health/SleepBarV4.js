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
exports.SleepBarV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const goal_v4_1 = require("./goal-v4");
const tone_v4_2 = require("./internal/tone-v4");
/**
 * Quality is a **verdict**, so it is the one thing in this card entitled to a
 * status colour — unlike a discipline or a macro, which the V4 pass moved off
 * `success`/`warn`/`danger` precisely so a verdict could keep them.
 */
const QUALITY_TONE = {
    poor: 'danger',
    fair: 'warn',
    good: 'primary',
    excellent: 'success',
};
/** The meter's name. Not a prop: the spec's table settles this component's copy surface. */
const METER_NAME = 'Sleep';
const QUALITY_LABEL = {
    poor: 'Poor',
    fair: 'Fair',
    good: 'Good',
    excellent: 'Excellent',
};
/**
 * **V4 sleep bar** — same props as {@link SleepBar} plus `noGoalLabel`,
 * `qualityLabels`, `formatHours` and `appearance`.
 *
 * ## Five changes
 *
 * 1. **`goal={0}` drew an empty bar for a night that was fully slept.** Nought
 *    was read as *nought per cent* rather than as *no goal*, so 7.5 hours with
 *    no target set rendered as a completely unfilled track — the picture of a
 *    terrible night. There is now a "no goal" branch that prints the hours and
 *    draws no track at all.
 * 2. **The bar is a meter.** It was a pair of nested `div`s with a width and
 *    nothing else; the one proportion the card exists to show was invisible to
 *    a screen reader.
 * 3. **A bare `<div>` was carrying the card's `aria-label`.** Role `generic`
 *    cannot be named and browsers drop the attribute, so the sentence that was
 *    supposed to summarise the night reached nobody. The card is a named
 *    `group` and the meter carries its own value.
 * 4. **The quality word is inked with the corrected slot.** `text-success` is
 *    `var(--xen-success)`, a *fill*, and measures as low as 1.32:1 as text.
 * 5. **The track is not `bg-border`** — a hairline colour is not a surface.
 */
exports.SleepBarV4 = React.forwardRef(function SleepBarV4({ hours, goal = 8, quality, bedtime, wakeTime, noGoalLabel = 'No goal set', qualityLabels, formatHours, appearance = 'classic', className, ...rest }, ref) {
    const parts = (0, goal_v4_1.goalParts)(hours, goal);
    const showHours = formatHours ?? ((value) => `${value}h`);
    const tone = quality ? QUALITY_TONE[quality] : 'primary';
    const qualityWord = quality ? (qualityLabels?.[quality] ?? QUALITY_LABEL[quality]) : undefined;
    const summary = (0, tone_v4_2.spokenLine)([
        METER_NAME,
        parts.hasGoal
            ? `${showHours(parts.value)} of ${showHours(parts.target ?? 0)}`
            : showHours(parts.value),
        parts.hasGoal ? `${parts.percent}%` : noGoalLabel,
        qualityWord,
        bedtime,
        wakeTime,
    ]);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "group", "aria-label": summary, className: (0, cn_1.cn)('flex flex-col gap-sm', tone_v4_2.HEALTH_CARD_CLASS, (0, tone_v4_2.appearanceClass)(appearance), className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-end justify-between", children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-baseline gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "text-base leading-none", children: "\uD83D\uDE34" }), (0, jsx_runtime_1.jsx)("span", { className: "text-2xl font-bold text-on-card", children: showHours(parts.value) }), parts.hasGoal ? ((0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted-text", children: `/ ${showHours(parts.target ?? 0)}` })) : null] }), qualityWord ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-bold', tone_v4_1.TONE_INK[tone]), children: qualityWord })) : null] }), parts.hasGoal ? ((0, jsx_runtime_1.jsx)("div", { role: "progressbar", "aria-label": METER_NAME, "aria-valuenow": parts.percent, "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuetext": (0, tone_v4_2.spokenLine)([
                    `${showHours(parts.value)} of ${showHours(parts.target ?? 0)}`,
                    `${parts.percent}%`,
                    parts.over > 0 ? `+${showHours(parts.over)}` : undefined,
                ]), className: (0, cn_1.cn)('h-2 overflow-hidden rounded-full', tone_v4_2.TRACK_CLASS), children: (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-full rounded-full', tone_v4_1.TONE_BG[tone]), style: { width: `${parts.percent ?? 0}%` } }) })) : (
            // Not a 0% track: a night with no target is unmeasured, not unslept.
            (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: noGoalLabel })), bedtime || wakeTime ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: bedtime ? `🌙 ${bedtime}` : '' }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: wakeTime ? `☀️ ${wakeTime}` : '' })] })) : null] }));
});
//# sourceMappingURL=SleepBarV4.js.map
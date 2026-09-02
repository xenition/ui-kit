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
exports.WorkoutCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const ButtonV4_1 = require("../primitives/ButtonV4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const tone_v4_2 = require("./internal/tone-v4");
/**
 * Identity only — a glyph and a name.
 *
 * The base's third field was a tone, and it read `cardio: 'danger'`,
 * `running: 'warn'`, `walking: 'success'`. See the docblock's change 1.
 */
const WORKOUT_META = {
    strength: { glyph: '🏋️', label: 'Strength' },
    cardio: { glyph: '❤️', label: 'Cardio' },
    yoga: { glyph: '🧘', label: 'Yoga' },
    cycling: { glyph: '🚴', label: 'Cycling' },
    running: { glyph: '🏃', label: 'Running' },
    swimming: { glyph: '🏊', label: 'Swimming' },
    hiit: { glyph: '🔥', label: 'HIIT' },
    walking: { glyph: '🚶', label: 'Walking' },
};
/**
 * **V4 workout card** — same props as {@link WorkoutCard} plus `statLabels`,
 * `completedLabel` and `appearance`.
 *
 * ## Four changes
 *
 * 1. **A walk stopped reading as good news and a cardio session as an alarm.**
 *    The discipline tag was tinted by `variant` — `cardio: 'danger'`,
 *    `running: 'warn'`, `walking: 'success'` — so the kit's status vocabulary
 *    was spent saying which *kind* of exercise this is. A run is not a warning.
 *    The glyph carries the discipline; the tag is neutral ink.
 * 2. **The card's whole summary was on a bare `<div>`.** Role `generic` cannot
 *    be named, so browsers drop `aria-label` from it outright and the sentence
 *    reached nobody. It is a named `group` now — and "Completed" is inside that
 *    name, where before it was a green tick only a sighted user could see.
 * 3. **The two stat captions and the completed word are props.** A localised
 *    app had to fork the component to translate "Duration".
 * 4. **The tag's ink is the corrected slot**, not the fill token: `text-warn`
 *    is `var(--xen-warn)`, which has no contrast promise as text and was being
 *    used at `text-xs` — the smallest type on the card in the weakest colour.
 */
exports.WorkoutCardV4 = React.forwardRef(function WorkoutCardV4({ title, variant, durationMin, calories, description, completed = false, startLabel = 'Start', onStart, statLabels, completedLabel = 'Completed', appearance = 'classic', className, ...rest }, ref) {
    const meta = WORKOUT_META[variant];
    const durationLabel = statLabels?.duration ?? 'Duration';
    const caloriesLabel = statLabels?.calories ?? 'Calories';
    const hasStats = durationMin != null || calories != null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "group", "aria-label": (0, tone_v4_2.spokenLine)([
            meta.label,
            title,
            durationMin != null ? `${durationLabel} ${durationMin} min` : undefined,
            calories != null ? `${caloriesLabel} ${calories} kcal` : undefined,
            completed ? completedLabel : undefined,
        ]), className: (0, cn_1.cn)('flex flex-col gap-md', tone_v4_2.HEALTH_CARD_CLASS, (0, tone_v4_2.appearanceClass)(appearance), className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "text-xl leading-none", children: meta.glyph }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold uppercase text-muted-text", children: meta.label }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-lg font-bold text-on-card", children: title })] })] }), description ? ((0, jsx_runtime_1.jsx)("p", { className: "line-clamp-2 text-sm text-muted-text", children: description })) : null, hasStats ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-xl", children: [durationMin != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: durationLabel }), (0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold text-on-card", children: `${durationMin} min` })] })) : null, calories != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: caloriesLabel }), (0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold text-on-card", children: `${calories} kcal` })] })) : null] })) : null, completed ? ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-sm font-bold', tone_v4_1.TONE_INK.success), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, children: "\u2713 " }), completedLabel] })) : onStart ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "primary", onClick: onStart, children: startLabel })) : null] }));
});
//# sourceMappingURL=WorkoutCardV4.js.map
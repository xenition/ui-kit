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
exports.WorkoutCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Button_1 = require("../primitives/Button");
const internal_1 = require("./internal");
const WORKOUT_META = {
    strength: { glyph: '🏋️', label: 'Strength', color: 'primary' },
    cardio: { glyph: '❤️', label: 'Cardio', color: 'danger' },
    yoga: { glyph: '🧘', label: 'Yoga', color: 'accent' },
    cycling: { glyph: '🚴', label: 'Cycling', color: 'primary' },
    running: { glyph: '🏃', label: 'Running', color: 'warn' },
    swimming: { glyph: '🏊', label: 'Swimming', color: 'accent' },
    hiit: { glyph: '🔥', label: 'HIIT', color: 'danger' },
    walking: { glyph: '🚶', label: 'Walking', color: 'success' },
};
/**
 * A workout summary card: discipline icon + tag, title, a duration / calories
 * stat strip, and a single dominant "Start" action. Completed workouts swap the
 * CTA for a `success` "Completed" note. The `variant` sets the icon and accent
 * tone. Web parity of the native `WorkoutCard`; token-only colors, `onStart`
 * fires from a real `<button>`.
 */
exports.WorkoutCard = React.forwardRef(function WorkoutCard({ title, variant, durationMin, calories, description, completed = false, startLabel = 'Start', onStart, className, ...rest }, ref) {
    const meta = WORKOUT_META[variant];
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": `${meta.label} workout: ${title}${completed ? ', completed' : ''}`, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-xl leading-none", children: meta.glyph }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-bold uppercase', internal_1.TEXT_CLASS[meta.color]), children: meta.label }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-lg font-bold text-on-surface", children: title })] })] }), description ? ((0, jsx_runtime_1.jsx)("p", { className: "line-clamp-2 text-sm text-muted", children: description })) : null, durationMin != null || calories != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-[var(--xen-space-xl)]", children: [durationMin != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: "Duration" }), (0, jsx_runtime_1.jsxs)("span", { className: "text-base font-semibold text-on-surface", children: [durationMin, " min"] })] })) : null, calories != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: "Calories" }), (0, jsx_runtime_1.jsxs)("span", { className: "text-base font-semibold text-on-surface", children: [calories, " kcal"] })] })) : null] })) : null, completed ? ((0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold text-success", children: "\u2713 Completed" })) : onStart ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "primary", onClick: onStart, children: startLabel })) : null] }));
});
//# sourceMappingURL=WorkoutCard.js.map
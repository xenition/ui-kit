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
exports.WorkoutCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
const META = {
    strength: { glyph: '🏋️', label: 'Strength', color: 'primary' },
    cardio: { glyph: '❤️', label: 'Cardio', color: 'danger' },
    yoga: { glyph: '🧘', label: 'Yoga', color: 'accent' },
    cycling: { glyph: '🚴', label: 'Cycling', color: 'primary' },
    running: { glyph: '🏃', label: 'Running', color: 'warn' },
    swimming: { glyph: '🏊', label: 'Swimming', color: 'accent' },
    hiit: { glyph: '🔥', label: 'HIIT', color: 'danger' },
    walking: { glyph: '🚶', label: 'Walking', color: 'success' },
};
/** Soft tint background per accent slot (the web equal of native `withAlpha`). */
const TINT_BG = {
    primary: 'bg-primary/10',
    accent: 'bg-accent/10',
    success: 'bg-success/10',
    warn: 'bg-warn/10',
    danger: 'bg-danger/10',
};
/**
 * WorkoutCard — **hero** design (v2). A large discipline glyph on a tinted disc
 * anchors the card, with a soft tag chip, title, and an emphasized stat pair.
 * The primary action is a circular **start FAB** floating bottom-right;
 * completed workouts replace it with a `success` chip. Elevated surface that
 * lifts on hover. Same props as {@link WorkoutCardProps}; token-only colors.
 */
exports.WorkoutCardV2 = React.forwardRef(function WorkoutCardV2({ title, variant, durationMin, calories, description, completed = false, startLabel = 'Start', onStart, className, ...rest }, ref) {
    const meta = META[variant];
    const showFab = !completed && !!onStart;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": `${meta.label} workout: ${title}${completed ? ', completed' : ''}`, className: (0, cn_1.cn)('relative flex flex-col gap-[var(--xen-space-md)] overflow-hidden rounded-[var(--xen-radius-lg)] bg-surface p-[var(--xen-space-lg)] shadow-md', showFab ? 'pb-[var(--xen-space-2xl)]' : null, className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-16 w-16 shrink-0 items-center justify-center rounded-full', TINT_BG[meta.color]), children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-2xl leading-none", children: meta.glyph }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col items-start gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('rounded-full px-[var(--xen-space-sm)] py-[var(--xen-space-xs)] text-xs font-bold uppercase', TINT_BG[meta.color], internal_1.TEXT_CLASS[meta.color]), children: meta.label }), (0, jsx_runtime_1.jsx)("span", { className: "line-clamp-2 text-xl font-extrabold text-on-surface", children: title })] })] }), description ? (0, jsx_runtime_1.jsx)("p", { className: "line-clamp-2 text-sm text-muted", children: description }) : null, durationMin != null || calories != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-[var(--xen-space-xl)]", children: [durationMin != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-2xl font-extrabold', internal_1.TEXT_CLASS[meta.color]), children: durationMin }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: "minutes" })] })) : null, calories != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-2xl font-extrabold text-on-surface", children: calories }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: "kcal" })] })) : null] })) : null, completed ? ((0, jsx_runtime_1.jsx)("span", { className: "w-fit rounded-full bg-success/10 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)] text-sm font-bold text-success", children: "\u2713 Completed" })) : null, showFab ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `${startLabel} ${title}`, onClick: onStart, className: "absolute bottom-[var(--xen-space-lg)] right-[var(--xen-space-lg)] flex h-[52px] w-[52px] items-center justify-center rounded-full bg-primary text-lg font-extrabold text-on-primary shadow-lg transition duration-200 hover:-translate-y-0.5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 motion-reduce:transition-none motion-reduce:hover:transform-none", children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\u25B6" }) })) : null] }));
});
//# sourceMappingURL=WorkoutCardV2.js.map
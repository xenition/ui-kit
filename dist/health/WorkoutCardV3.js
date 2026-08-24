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
exports.WorkoutCardV3 = void 0;
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
 * WorkoutCard — **compact row** design (v3). A tinted glyph square leads, then
 * the title with its discipline label and an inline `duration · kcal` stat
 * strip, and a trailing soft start chip (or a `success` check when completed).
 * Borderless — reads as one line in a list. Same props as
 * {@link WorkoutCardProps}; token-only colors.
 */
exports.WorkoutCardV3 = React.forwardRef(function WorkoutCardV3({ title, variant, durationMin, calories, description, completed = false, startLabel = 'Start', onStart, className, ...rest }, ref) {
    const meta = META[variant];
    const stats = [];
    if (durationMin != null)
        stats.push(`${durationMin} min`);
    if (calories != null)
        stats.push(`${calories} kcal`);
    const showStart = !completed && !!onStart;
    const tail = stats.length ? `  ·  ${stats.join('  ·  ')}` : description ? `  ·  ${description}` : '';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": `${meta.label} workout: ${title}${completed ? ', completed' : ''}`, className: (0, cn_1.cn)('flex min-h-[60px] items-center gap-[var(--xen-space-md)] py-[var(--xen-space-sm)] px-[var(--xen-space-md)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)]', TINT_BG[meta.color]), children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-lg leading-none", children: meta.glyph }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-bold text-on-surface", children: title }), (0, jsx_runtime_1.jsxs)("span", { className: "truncate text-xs text-muted", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('font-bold', internal_1.TEXT_CLASS[meta.color]), children: meta.label }), tail] })] }), completed ? ((0, jsx_runtime_1.jsx)("span", { className: "shrink-0 text-sm font-extrabold text-success", "aria-hidden": "true", children: "\u2713" })) : showStart ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `${startLabel} ${title}`, onClick: onStart, className: "shrink-0 rounded-full bg-primary/10 px-[var(--xen-space-md)] py-[var(--xen-space-xs)] text-sm font-bold text-primary transition-colors hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: startLabel })) : null] }));
});
//# sourceMappingURL=WorkoutCardV3.js.map
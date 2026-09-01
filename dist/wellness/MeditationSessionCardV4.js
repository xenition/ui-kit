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
exports.MeditationSessionCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const Icon_1 = require("../primitives/Icon");
const CATEGORY_META = {
    breathing: { glyph: '🌬️', label: 'Breathing' },
    focus: { glyph: '🎯', label: 'Focus' },
    sleep: { glyph: '🌙', label: 'Sleep' },
    calm: { glyph: '🍃', label: 'Calm' },
    movement: { glyph: '🧘', label: 'Movement' },
    'body-scan': { glyph: '🌀', label: 'Body scan' },
    'loving-kindness': { glyph: '💗', label: 'Loving kindness' },
};
/**
 * MeditationSessionCardV4 — the "calm" restyle of {@link MeditationSessionCard}.
 * Same props, defaults, labels, a11y and behavior; only the surface changes: a
 * clean neutral card whose one spot of color is a gradient cover tile carrying
 * the category glyph in near-white ink, and a slim gradient resume fill. The
 * Start/Resume CTA, locked note, and loading skeleton are preserved. Token-only
 * colors (`--xen-*` classes, never a literal).
 */
exports.MeditationSessionCardV4 = React.forwardRef(function MeditationSessionCardV4({ title, category, durationMin, level, instructor, description, progress, locked = false, loading = false, startLabel, onStart, className, ...rest }, ref) {
    const meta = CATEGORY_META[category] ?? CATEGORY_META.calm;
    const shell = 'flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-sm p-[var(--xen-space-lg)] text-on-surface';
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-meditation-session-card": "", "aria-busy": "true", "aria-label": "Loading session", className: (0, cn_1.cn)(shell, className), ...rest, children: [(0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { width: "40%", height: 14 }), (0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { width: "80%", height: 20 }), (0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { width: "60%", height: 14 })] }));
    }
    const resume = progress != null && progress > 0 && progress < 1;
    const cta = startLabel ?? (resume ? 'Resume' : 'Start');
    const pct = progress != null ? Math.round(Math.min(Math.max(progress, 0), 1) * 100) : 0;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-meditation-session-card": "", "aria-label": `${meta.label} session: ${title}${locked ? ', premium' : ''}${resume ? `, ${pct}% complete` : ''}`, className: (0, cn_1.cn)(shell, className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("div", { "aria-hidden": "true", className: "flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] bg-gradient-to-br from-primary-400 to-primary-700", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: meta.glyph, size: "2xl", color: "onPrimary" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold uppercase tracking-wide text-muted", children: meta.label }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-lg font-bold text-on-surface", children: title })] }), locked ? ((0, jsx_runtime_1.jsx)("span", { "aria-label": "Premium", className: "text-base", children: "\uD83D\uDD12" })) : null] }), description ? (0, jsx_runtime_1.jsx)("p", { className: "line-clamp-2 text-sm text-muted", children: description }) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap gap-[var(--xen-space-lg)]", children: [durationMin != null ? (0, jsx_runtime_1.jsx)(Meta, { label: "Duration", value: `${durationMin} min` }) : null, level ? (0, jsx_runtime_1.jsx)(Meta, { label: "Level", value: cap(level) }) : null, instructor ? (0, jsx_runtime_1.jsx)(Meta, { label: "Teacher", value: instructor }) : null] }), resume ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-1.5 w-full overflow-hidden rounded-full bg-neutral-200", children: (0, jsx_runtime_1.jsx)("div", { className: "h-1.5 rounded-full bg-gradient-to-r from-primary-400 to-primary-700", style: { width: `${pct}%` } }) }), (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: [pct, "% complete"] })] })) : null, locked ? ((0, jsx_runtime_1.jsx)("p", { className: "text-sm font-semibold text-muted", children: "\uD83D\uDD12 Unlock with a membership" })) : onStart ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", onClick: onStart, children: cta })) : null] }));
});
function Meta({ label, value }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: label }), (0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold text-on-surface", children: value })] }));
}
function cap(s) {
    return s.length === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1);
}
//# sourceMappingURL=MeditationSessionCardV4.js.map
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
exports.MeditationSessionCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const _tokens_1 = require("./_tokens");
const CATEGORY_META = {
    breathing: { glyph: '🌬️', label: 'Breathing', color: 'primary' },
    focus: { glyph: '🎯', label: 'Focus', color: 'accent' },
    sleep: { glyph: '🌙', label: 'Sleep', color: 'primary' },
    calm: { glyph: '🍃', label: 'Calm', color: 'success' },
    movement: { glyph: '🧘', label: 'Movement', color: 'warn' },
    'body-scan': { glyph: '🌀', label: 'Body scan', color: 'accent' },
    'loving-kindness': { glyph: '💗', label: 'Loving kindness', color: 'danger' },
};
/**
 * A meditation session summary card (web parity of the native block): category
 * icon + tag, title, a duration / level / instructor meta strip, an optional
 * resume progress bar, and a single dominant start action. `locked` swaps the
 * CTA for a premium note; `loading` renders a skeleton. `category` sets the icon
 * and accent tone. Token-only colors (`--xen-*` classes, never a literal).
 */
exports.MeditationSessionCard = React.forwardRef(function MeditationSessionCard({ title, category, durationMin, level, instructor, description, progress, locked = false, loading = false, startLabel, onStart, className, }, ref) {
    const meta = CATEGORY_META[category] ?? CATEGORY_META.calm;
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-meditation-session-card": "", "aria-busy": "true", "aria-label": "Loading session", className: (0, cn_1.cn)(_tokens_1.CARD_SHELL, 'flex flex-col gap-[var(--xen-space-md)] p-[var(--xen-space-lg)]', className), children: [(0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { width: "40%", height: 14 }), (0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { width: "80%", height: 20 }), (0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { width: "60%", height: 14 })] }));
    }
    const resume = progress != null && progress > 0 && progress < 1;
    const cta = startLabel ?? (resume ? 'Resume' : 'Start');
    const pct = progress != null ? Math.round(Math.min(Math.max(progress, 0), 1) * 100) : 0;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-meditation-session-card": "", "aria-label": `${meta.label} session: ${title}${locked ? ', premium' : ''}${resume ? `, ${pct}% complete` : ''}`, className: (0, cn_1.cn)(_tokens_1.CARD_SHELL, 'flex flex-col gap-[var(--xen-space-md)] p-[var(--xen-space-lg)]', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("div", { "aria-hidden": "true", className: (0, cn_1.cn)('flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg', _tokens_1.SLOT_TINT[meta.color]), children: meta.glyph }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-bold uppercase tracking-wide', _tokens_1.SLOT_TEXT[meta.color]), children: meta.label }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-lg font-bold text-on-surface", children: title })] }), locked ? ((0, jsx_runtime_1.jsx)("span", { "aria-label": "Premium", className: "text-base", children: "\uD83D\uDD12" })) : null] }), description ? (0, jsx_runtime_1.jsx)("p", { className: "line-clamp-2 text-sm text-muted", children: description }) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap gap-[var(--xen-space-lg)]", children: [durationMin != null ? (0, jsx_runtime_1.jsx)(Meta, { label: "Duration", value: `${durationMin} min` }) : null, level ? (0, jsx_runtime_1.jsx)(Meta, { label: "Level", value: cap(level) }) : null, instructor ? (0, jsx_runtime_1.jsx)(Meta, { label: "Teacher", value: instructor }) : null] }), resume ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: pct, tone: "primary", size: "sm" }), (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: [pct, "% complete"] })] })) : null, locked ? ((0, jsx_runtime_1.jsx)("p", { className: "text-sm font-semibold text-muted", children: "\uD83D\uDD12 Unlock with a membership" })) : onStart ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", onClick: onStart, children: cta })) : null] }));
});
function Meta({ label, value }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: label }), (0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold text-on-surface", children: value })] }));
}
function cap(s) {
    return s.length === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1);
}
//# sourceMappingURL=MeditationSessionCard.js.map
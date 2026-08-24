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
exports.MilestoneCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const CATEGORY_META = {
    physical: { glyph: '🏃', label: 'Physical' },
    cognitive: { glyph: '🧠', label: 'Cognitive' },
    social: { glyph: '🤝', label: 'Social' },
    language: { glyph: '💬', label: 'Language' },
    emotional: { glyph: '❤️', label: 'Emotional' },
    other: { glyph: '🌟', label: 'Milestone' },
};
/**
 * A developmental milestone: a category icon, title, date/age band, an optional
 * note, and an achieved/upcoming chip. State is conveyed by glyph + text + a11y
 * label (never color alone). When `onClick` is set the card is an accessible
 * `role="button"` with keyboard activation; renders a muted skeleton while
 * `loading`. Token-bound throughout — no literal colors.
 */
exports.MilestoneCard = React.forwardRef(function MilestoneCard({ title, category = 'other', date, ageLabel, description, achieved = false, loading = false, onClick, className, ...rest }, ref) {
    const meta = CATEGORY_META[category] ?? CATEGORY_META.other;
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { ref: ref, "data-xen-milestone-card": "", "aria-label": "Loading milestone", className: className, ...rest, children: (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-3.5 w-1/2 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-200" }), (0, jsx_runtime_1.jsx)("div", { className: "h-2.5 w-2/5 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-200" })] }) }));
    }
    const subParts = [ageLabel, date].filter((s) => !!s);
    const interactive = typeof onClick === 'function';
    const a11y = `${title}, ${meta.label}, ${achieved ? 'achieved' : 'upcoming'}`;
    const handleKeyDown = (e) => {
        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick?.();
        }
    };
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { ref: ref, "data-xen-milestone-card": "", className: (0, cn_1.cn)(interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className), role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": a11y, onClick: interactive ? () => onClick?.() : undefined, onKeyDown: interactive ? handleKeyDown : undefined, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: meta.glyph, size: "2xl" }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "line-clamp-2 text-base font-bold text-on-surface", children: title }), (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: [meta.label, ...subParts].join(' · ') })] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: achieved ? 'success' : 'neutral', children: achieved ? '✓ Achieved' : '◦ Upcoming' })] }), description ? (0, jsx_runtime_1.jsx)("p", { className: "mt-2 text-sm text-muted", children: description }) : null] }));
});
//# sourceMappingURL=MilestoneCard.js.map
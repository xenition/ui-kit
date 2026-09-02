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
exports.CourseCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const LEVEL_META = {
    beginner: { label: 'Beginner', tone: 'success' },
    intermediate: { label: 'Intermediate', tone: 'warn' },
    advanced: { label: 'Advanced', tone: 'danger' },
};
/**
 * CourseCard — **V4** "campus" design (web parity of the native V4). The bright,
 * modern learning-platform take on a course: an elevated rounded card with a soft
 * shadow, a soft-primary media well (thumbnail or glyph), level + category
 * badges, the title + instructor, a rating, a lessons · duration stat strip, an
 * optional progress bar with a **tabular-nums** percentage, price, and one
 * dominant CTA (Continue when in progress, else Enroll). Honors the V4 `variant`
 * — `full` (card, default) and `compact` (a dense single row). All colors from
 * `--xen-*` token classes (no literals).
 */
exports.CourseCardV4 = React.forwardRef(function CourseCardV4({ title, instructor, thumbnail, glyph = '📚', level, category, lessonCount, durationLabel, rating, ratingCount, progress, price, ctaLabel, onCtaClick, variant = 'full', className, ...rest }, ref) {
    const levelMeta = level ? LEVEL_META[level] : undefined;
    const inProgress = progress != null;
    const label = ctaLabel ?? (inProgress ? 'Continue' : 'Enroll');
    const shell = 'rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm';
    const cta = onCtaClick ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", onClick: onCtaClick, "aria-label": `${label}: ${title}`, children: label })) : null;
    // ── compact: dense single row ──
    if (variant === 'compact') {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-course-card": "", "aria-label": `Course: ${title}${instructor ? `, by ${instructor}` : ''}`, className: (0, cn_1.cn)(shell, 'flex items-center gap-[var(--xen-space-sm)] p-[var(--xen-space-sm)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] bg-primary/10 text-xl", children: thumbnail ? (0, jsx_runtime_1.jsx)("img", { src: thumbnail, alt: "", className: "h-full w-full object-cover" }) : (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: glyph }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-bold text-on-surface", children: title }), instructor ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: instructor }) : null] }), levelMeta ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: levelMeta.tone, variant: "soft", children: levelMeta.label }) : null, cta] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-course-card": "", "aria-label": `Course: ${title}${instructor ? `, by ${instructor}` : ''}`, className: (0, cn_1.cn)(shell, 'overflow-hidden', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "flex h-32 items-center justify-center bg-primary/10", children: thumbnail ? ((0, jsx_runtime_1.jsx)("img", { src: thumbnail, alt: "", className: "h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)("span", { className: "text-4xl", "aria-hidden": "true", children: glyph })) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-2 p-[var(--xen-space-lg)]", children: [levelMeta || category ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-1", children: [levelMeta ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: levelMeta.tone, variant: "soft", children: levelMeta.label }) : null, category ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "neutral", variant: "soft", children: category }) : null] })) : null, (0, jsx_runtime_1.jsx)("h3", { className: "line-clamp-2 text-lg font-bold text-on-surface", children: title }), instructor ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm text-muted", children: instructor }) : null, rating != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(primitives_1.Rating, { value: rating, size: "sm", showValue: true }), ratingCount != null ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs tabular-nums text-muted", children: ["(", ratingCount, ")"] }) : null] })) : null, lessonCount != null || durationLabel ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] bg-primary/5 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]", children: [lessonCount != null ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs tabular-nums text-muted", children: ["\uD83D\uDCD8 ", lessonCount, " lessons"] }) : null, durationLabel ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs tabular-nums text-muted", children: ["\u23F1 ", durationLabel] }) : null] })) : null, inProgress ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-1", children: [(0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: progress, tone: "primary", size: "sm" }), (0, jsx_runtime_1.jsxs)("span", { className: "text-xs tabular-nums text-muted", children: [Math.round(progress), "% complete"] })] })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "mt-1 flex items-center justify-between", children: [price ? (0, jsx_runtime_1.jsx)("span", { className: "text-lg font-bold tabular-nums text-on-surface", children: price }) : (0, jsx_runtime_1.jsx)("span", {}), cta] })] })] }));
});
//# sourceMappingURL=CourseCardV4.js.map
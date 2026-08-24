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
exports.CourseCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const LEVEL_LABEL = { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' };
/**
 * CourseCard, redesigned (v2): a **media-hero course card**. The thumbnail fills
 * a wide top banner with the level tag and price floating over a scrim; title,
 * instructor, meta, an optional progress bar, and a full-width CTA sit on the
 * surface below. Elevated with a hover lift. Same props as {@link CourseCard},
 * token-only.
 */
exports.CourseCardV2 = React.forwardRef(function CourseCardV2({ title, instructor, thumbnail, glyph = '📚', level, category, lessonCount, durationLabel, rating, ratingCount, progress, price, ctaLabel, onCtaClick, className, ...rest }, ref) {
    const inProgress = typeof progress === 'number';
    const cta = ctaLabel ?? (inProgress ? 'Continue' : 'Enroll');
    const meta = [
        category,
        typeof lessonCount === 'number' ? `${lessonCount} lessons` : null,
        durationLabel,
        typeof rating === 'number' ? `★ ${rating.toFixed(1)}${typeof ratingCount === 'number' ? ` (${ratingCount})` : ''}` : null,
    ].filter((s) => !!s);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-course-card": "", className: (0, cn_1.cn)('flex flex-col overflow-hidden rounded-lg bg-surface shadow-md transition-transform hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative h-32 bg-neutral-100", children: [thumbnail ? ((0, jsx_runtime_1.jsx)("img", { src: thumbnail, alt: "", className: "h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex h-full w-full items-center justify-center text-4xl", children: glyph })), (0, jsx_runtime_1.jsxs)("div", { className: "absolute inset-x-0 top-0 flex items-start justify-between p-2", children: [level ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "primary", children: LEVEL_LABEL[level] }) : (0, jsx_runtime_1.jsx)("span", {}), price ? ((0, jsx_runtime_1.jsx)("span", { className: "rounded-full bg-surface/90 px-2 py-0.5 text-xs font-bold text-on-surface", children: price })) : null] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-2 p-md", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-base font-bold text-on-surface", children: title }), instructor ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: instructor }) : null] }), meta.length > 0 ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: meta.join(' · ') }) : null, inProgress ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: progress, tone: "primary", size: "sm", className: "flex-1" }), (0, jsx_runtime_1.jsxs)("span", { className: "text-xs font-semibold text-muted", children: [progress, "%"] })] })) : null, onCtaClick ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "md", variant: "primary", className: "mt-1 w-full", onClick: onCtaClick, children: cta })) : null] })] }));
});
//# sourceMappingURL=CourseCardV2.js.map
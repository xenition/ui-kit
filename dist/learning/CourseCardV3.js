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
exports.CourseCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const LEVEL_LABEL = { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' };
/**
 * CourseCard, redesigned (v3): a **compact catalog row**. A small square glyph/
 * thumbnail tile leads, the title sits over a single middot-joined meta line,
 * and the price + a quiet CTA hug the right edge. A thin progress underline shows
 * when in progress. Borderless list-friendly — the opposite of v2's hero card.
 * Same props, token-only.
 */
exports.CourseCardV3 = React.forwardRef(function CourseCardV3({ title, instructor, thumbnail, glyph = '📚', level, category, lessonCount, durationLabel, rating, ratingCount, progress, price, ctaLabel, onCtaClick, className, ...rest }, ref) {
    void ratingCount;
    const inProgress = typeof progress === 'number';
    const cta = ctaLabel ?? (inProgress ? 'Continue' : 'Enroll');
    const meta = [
        instructor,
        level ? LEVEL_LABEL[level] : category,
        typeof lessonCount === 'number' ? `${lessonCount} lessons` : durationLabel,
        typeof rating === 'number' ? `★ ${rating.toFixed(1)}` : null,
    ].filter((s) => !!s);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-course-card": "", className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-3', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md bg-neutral-100 text-xl", children: thumbnail ? (0, jsx_runtime_1.jsx)("img", { src: thumbnail, alt: "", className: "h-full w-full object-cover" }) : glyph }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-semibold text-on-surface", children: title }), meta.length > 0 ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: meta.join(' · ') }) : null, inProgress ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-1 h-1 w-full overflow-hidden rounded-full bg-neutral-100", children: (0, jsx_runtime_1.jsx)("div", { className: "h-full rounded-full bg-primary", style: { width: `${Math.max(0, Math.min(100, progress))}%` } }) })) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-1", children: [price ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold text-on-surface", children: price }) : null, onCtaClick ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "ghost", onClick: onCtaClick, children: cta })) : null] })] }));
});
//# sourceMappingURL=CourseCardV3.js.map
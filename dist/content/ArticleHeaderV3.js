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
exports.ArticleHeaderV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Skeleton_1 = require("../primitives/Skeleton");
const AuthorBylineV3_1 = require("./AuthorBylineV3");
/**
 * ArticleHeader — **left-aligned editorial** alternate design (web / React DOM).
 *
 * Text-forward masthead: a category eyebrow led by a short accent rule, a large
 * left-aligned headline, a dek, then a full-width divider and the full byline —
 * with the cover image dropped in last as a figure. Reads like a longform
 * feature opener. Same props as {@link ArticleHeader}, so it is a drop-in swap.
 *
 * Token-pure: the eyebrow rule and label use `bg-accent` / `text-accent`, the
 * divider uses `bg-border`. No literal colors.
 * Stays inside its own design line: the byline is {@link AuthorBylineV3}, not
 * the base one, because an app that picks V3 picks it for every surface it sees.
 */
exports.ArticleHeaderV3 = React.forwardRef(function ArticleHeaderV3({ title, deck, category, coverImageUrl, author, date, readingTime, variant = 'standard', loading = false, className, ...rest }, ref) {
    const hero = variant === 'hero';
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("header", { ref: ref, className: (0, cn_1.cn)('flex flex-col items-start gap-[var(--xen-space-md)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)(Skeleton_1.Skeleton, { variant: "rect", width: 120, height: 16 }), (0, jsx_runtime_1.jsx)(Skeleton_1.Skeleton, { variant: "rect", width: "92%", height: hero ? 44 : 36 }), (0, jsx_runtime_1.jsx)(Skeleton_1.Skeleton, { variant: "rect", width: "70%", height: hero ? 44 : 36 }), (0, jsx_runtime_1.jsx)(Skeleton_1.Skeleton, { variant: "rect", width: "100%", height: 1 }), (0, jsx_runtime_1.jsx)(Skeleton_1.Skeleton, { variant: "rect", width: 180, height: 40 }), (0, jsx_runtime_1.jsx)(Skeleton_1.Skeleton, { variant: "rect", width: "100%", height: hero ? 240 : 200 })] }));
    }
    const meta = [date, readingTime]
        .filter((p) => !!p && p.length > 0)
        .join('  ·  ');
    return ((0, jsx_runtime_1.jsxs)("header", { ref: ref, className: (0, cn_1.cn)('flex flex-col items-start gap-[var(--xen-space-md)]', className), ...rest, children: [category ? ((0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "h-[3px] w-7 rounded-full bg-accent" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-extrabold uppercase tracking-wide text-accent", children: category })] })) : null, (0, jsx_runtime_1.jsx)("h1", { className: (0, cn_1.cn)('text-left font-extrabold leading-tight text-on-surface', hero ? 'text-3xl' : 'text-2xl'), children: title }), deck ? (0, jsx_runtime_1.jsx)("p", { className: "text-lg leading-relaxed text-muted", children: deck }) : null, (0, jsx_runtime_1.jsx)("div", { "aria-hidden": true, className: "h-px w-full self-stretch bg-border" }), author ? ((0, jsx_runtime_1.jsx)(AuthorBylineV3_1.AuthorBylineV3, { author: author, date: date, readingTime: readingTime, variant: "full" })) : meta ? ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: meta })) : null, coverImageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: coverImageUrl, alt: "", loading: "lazy", className: (0, cn_1.cn)('w-full rounded-[var(--xen-radius-lg)] bg-neutral-100 object-cover', hero ? 'h-[240px]' : 'h-[200px]') })) : null] }));
});
//# sourceMappingURL=ArticleHeaderV3.js.map
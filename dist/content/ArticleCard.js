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
exports.ArticleCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const Skeleton_1 = require("../primitives/Skeleton");
const AuthorByline_1 = require("./AuthorByline");
const CategoryChip_1 = require("./CategoryChip");
/**
 * A feed card for one article — the web (React DOM) mirror of the native
 * `ArticleCard`. Composes `Card`, `CategoryChip`, and `AuthorByline`; every
 * color comes from `--xen-*` token classes. Three variants: `standard`
 * (image-top), `featured` (large hero headline), and `compact` (horizontal list
 * row). Supports a `loading` skeleton and fires `onClick(article)` when clicked
 * (rendered as a keyboard-activatable `role="button"` when interactive).
 */
exports.ArticleCard = React.forwardRef(function ArticleCard({ article, onClick, variant = 'standard', loading = false, className, ...rest }, ref) {
    const compact = variant === 'compact';
    const featured = variant === 'featured';
    const interactive = !!onClick;
    let body;
    if (loading) {
        body = compact ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)(Skeleton_1.Skeleton, { variant: "rect", width: 88, height: 88 }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)(Skeleton_1.Skeleton, { variant: "rect", width: "90%", height: 18 }), (0, jsx_runtime_1.jsx)(Skeleton_1.Skeleton, { variant: "rect", width: "60%", height: 14 })] })] })) : ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)(Skeleton_1.Skeleton, { variant: "rect", width: "100%", height: featured ? 200 : 150 }), (0, jsx_runtime_1.jsx)(Skeleton_1.Skeleton, { variant: "rect", width: "90%", height: 20 }), (0, jsx_runtime_1.jsx)(Skeleton_1.Skeleton, { variant: "rect", width: "70%", height: 14 })] }));
    }
    else if (compact) {
        body = ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [article.imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: article.imageUrl, alt: "", loading: "lazy", className: "h-[88px] w-[88px] shrink-0 rounded-[var(--xen-radius-md)] bg-neutral-100 object-cover" })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-[var(--xen-space-xs)]", children: [article.category ? (0, jsx_runtime_1.jsx)(CategoryChip_1.CategoryChip, { label: article.category, variant: "soft" }) : null, (0, jsx_runtime_1.jsx)("h3", { className: "line-clamp-3 text-base font-bold leading-snug text-on-surface", children: article.title }), article.readingTime || article.date ? ((0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: [article.date, article.readingTime].filter(Boolean).join('  ·  ') })) : null] })] }));
    }
    else {
        body = ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-sm)]", children: [article.imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: article.imageUrl, alt: "", loading: "lazy", className: (0, cn_1.cn)('w-full rounded-[var(--xen-radius-md)] bg-neutral-100 object-cover', featured ? 'h-[200px]' : 'h-[160px]') })) : null, article.category ? (0, jsx_runtime_1.jsx)(CategoryChip_1.CategoryChip, { label: article.category, variant: "soft" }) : null, (0, jsx_runtime_1.jsx)("h3", { className: (0, cn_1.cn)('font-extrabold leading-tight text-on-surface', featured ? 'line-clamp-3 text-xl' : 'line-clamp-2 text-lg'), children: article.title }), article.excerpt ? ((0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('text-sm leading-relaxed text-muted', featured ? 'line-clamp-3' : 'line-clamp-2'), children: article.excerpt })) : null, article.author ? ((0, jsx_runtime_1.jsx)(AuthorByline_1.AuthorByline, { author: article.author, date: article.date, readingTime: article.readingTime, variant: "compact" })) : article.date || article.readingTime ? ((0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: [article.date, article.readingTime].filter(Boolean).join('  ·  ') })) : null] }));
    }
    return ((0, jsx_runtime_1.jsx)(Card_1.Card, { ref: ref, role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? article.title : undefined, onClick: interactive ? () => onClick?.(article) : undefined, onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick?.(article);
                }
            }
            : undefined, className: (0, cn_1.cn)(interactive && 'cursor-pointer transition-opacity hover:opacity-90', className), ...rest, children: body }));
});
//# sourceMappingURL=ArticleCard.js.map
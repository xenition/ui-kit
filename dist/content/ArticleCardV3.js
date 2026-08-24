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
exports.ArticleCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Skeleton_1 = require("../primitives/Skeleton");
/**
 * ArticleCard — **minimal, text-first** alternate design (web / React DOM).
 *
 * No card surface and no big image: a thin top rule, a colored category eyebrow,
 * the headline, a muted excerpt, and a small square thumbnail tucked to the
 * right. Reads like an index / digest entry rather than a hero card. Same props
 * as {@link ArticleCard}, so it is a drop-in swap.
 *
 * Token-pure: the rule is `bg-border`, the eyebrow is `text-primary`, body text
 * is `text-on-surface` / `text-muted`. No literal colors.
 */
exports.ArticleCardV3 = React.forwardRef(function ArticleCardV3({ article, onClick, variant = 'standard', loading = false, className, ...rest }, ref) {
    const featured = variant === 'featured';
    const interactive = !!onClick;
    const thumbClass = featured ? 'h-[72px] w-[72px]' : 'h-[56px] w-[56px]';
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)] py-[var(--xen-space-md)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "h-px w-full bg-border" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)(Skeleton_1.Skeleton, { variant: "rect", width: "40%", height: 12 }), (0, jsx_runtime_1.jsx)(Skeleton_1.Skeleton, { variant: "rect", width: "92%", height: 18 }), (0, jsx_runtime_1.jsx)(Skeleton_1.Skeleton, { variant: "rect", width: "70%", height: 14 })] }), (0, jsx_runtime_1.jsx)(Skeleton_1.Skeleton, { variant: "rect", width: featured ? 72 : 56, height: featured ? 72 : 56 })] })] }));
    }
    const meta = [article.author?.name, article.date, article.readingTime]
        .filter((p) => !!p && p.length > 0)
        .join('  ·  ');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? article.title : undefined, onClick: interactive ? () => onClick?.(article) : undefined, onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick?.(article);
                }
            }
            : undefined, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)] py-[var(--xen-space-md)]', interactive &&
            'cursor-pointer transition-opacity duration-200 hover:opacity-70 motion-reduce:transition-none', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { "aria-hidden": true, className: "h-px w-full bg-border" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-start gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-[var(--xen-space-xs)]", children: [article.category ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs font-extrabold uppercase tracking-wide text-primary", children: article.category })) : null, (0, jsx_runtime_1.jsx)("h3", { className: (0, cn_1.cn)('font-bold leading-snug text-on-surface', featured ? 'line-clamp-4 text-lg' : 'line-clamp-3 text-base'), children: article.title }), article.excerpt ? ((0, jsx_runtime_1.jsx)("p", { className: "line-clamp-2 text-sm leading-relaxed text-muted", children: article.excerpt })) : null, meta ? (0, jsx_runtime_1.jsx)("p", { className: "line-clamp-1 text-xs text-muted", children: meta }) : null] }), article.imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: article.imageUrl, alt: "", loading: "lazy", className: (0, cn_1.cn)('shrink-0 rounded-[var(--xen-radius-sm)] bg-neutral-100 object-cover', thumbClass) })) : null] })] }));
});
//# sourceMappingURL=ArticleCardV3.js.map
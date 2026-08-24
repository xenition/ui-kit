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
exports.ArticleCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Skeleton_1 = require("../primitives/Skeleton");
const CategoryChip_1 = require("./CategoryChip");
/**
 * ArticleCard — **magazine full-bleed** alternate design (web / React DOM).
 *
 * Where the base card stacks image → text on a bordered surface, this variant
 * fills the whole card with the cover image and overlays a bottom gradient scrim
 * with the category, headline, and byline reversed out in near-white. Elevated
 * and media-forward. Same props as {@link ArticleCard}, so it is a drop-in swap.
 *
 * Token-pure: the scrim is a `neutral-900` → transparent gradient and the
 * reversed text is `text-neutral-50` — every color traces to a `--xen-*` token.
 * With no cover image it degrades to a soft primary-tinted panel with normal
 * on-surface text so the headline stays legible.
 */
exports.ArticleCardV2 = React.forwardRef(function ArticleCardV2({ article, onClick, variant = 'standard', loading = false, className, ...rest }, ref) {
    const featured = variant === 'featured';
    const compact = variant === 'compact';
    const interactive = !!onClick;
    const hasImage = !!article.imageUrl;
    const heightClass = featured ? 'h-[288px]' : compact ? 'h-[168px]' : 'h-[224px]';
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('overflow-hidden rounded-[var(--xen-radius-lg)]', className), ...rest, children: (0, jsx_runtime_1.jsx)(Skeleton_1.Skeleton, { variant: "rect", width: "100%", height: compact ? 168 : featured ? 288 : 224 }) }));
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
            : undefined, className: (0, cn_1.cn)('relative flex flex-col justify-end overflow-hidden rounded-[var(--xen-radius-lg)] shadow-md', heightClass, hasImage ? 'bg-neutral-200' : 'border border-border bg-primary/10', interactive &&
            'cursor-pointer transition duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[.99] motion-reduce:transition-none motion-reduce:hover:transform-none', className), ...rest, children: [hasImage ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("img", { src: article.imageUrl, alt: "", loading: "lazy", className: "absolute inset-0 h-full w-full object-cover" }), (0, jsx_runtime_1.jsx)("div", { "aria-hidden": true, className: "absolute inset-x-0 bottom-0 top-0 bg-gradient-to-t from-neutral-900/85 via-neutral-900/30 to-transparent" })] })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "relative flex flex-col gap-[var(--xen-space-xs)] p-[var(--xen-space-lg)]", children: [article.category ? (0, jsx_runtime_1.jsx)(CategoryChip_1.CategoryChip, { label: article.category, variant: "solid" }) : null, (0, jsx_runtime_1.jsx)("h3", { className: (0, cn_1.cn)('font-extrabold leading-tight', featured ? 'line-clamp-3 text-xl' : 'line-clamp-2 text-lg', hasImage ? 'text-neutral-50' : 'text-on-surface'), children: article.title }), meta ? ((0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('line-clamp-1 text-xs font-semibold', hasImage ? 'text-neutral-100' : 'text-muted'), children: meta })) : null] })] }));
});
//# sourceMappingURL=ArticleCardV2.js.map
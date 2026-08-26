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
exports.ArticleHeaderV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Skeleton_1 = require("../primitives/Skeleton");
const AuthorBylineV2_1 = require("./AuthorBylineV2");
/**
 * ArticleHeader — **centered hero** alternate design (web / React DOM).
 *
 * A big display title, category eyebrow, and dek are centered *over* a
 * full-bleed cover image darkened by a gradient scrim, with the byline centered
 * beneath. Cinematic masthead rather than the base stacked layout. Same props as
 * {@link ArticleHeader}, so it is a drop-in swap.
 *
 * Token-pure: the scrim is a `neutral-900` overlay, reversed text is
 * `text-neutral-50`. With no cover image it degrades to a centered header on the
 * normal surface with on-surface text.
 * Stays inside its own design line: the byline is {@link AuthorBylineV2}, not
 * the base one, because an app that picks V2 picks it for every surface it sees.
 */
exports.ArticleHeaderV2 = React.forwardRef(function ArticleHeaderV2({ title, deck, category, coverImageUrl, author, date, readingTime, variant = 'standard', loading = false, className, ...rest }, ref) {
    const hero = variant === 'hero';
    const hasCover = !!coverImageUrl;
    const minHeightClass = hero ? 'min-h-[360px]' : 'min-h-[300px]';
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("header", { ref: ref, className: (0, cn_1.cn)('overflow-hidden rounded-[var(--xen-radius-lg)]', className), ...rest, children: (0, jsx_runtime_1.jsx)(Skeleton_1.Skeleton, { variant: "rect", width: "100%", height: hero ? 360 : 300 }) }));
    }
    const meta = [date, readingTime]
        .filter((p) => !!p && p.length > 0)
        .join('  ·  ');
    return ((0, jsx_runtime_1.jsxs)("header", { ref: ref, className: (0, cn_1.cn)('relative flex flex-col items-center justify-center gap-[var(--xen-space-md)] overflow-hidden rounded-[var(--xen-radius-lg)] p-[var(--xen-space-xl)] text-center', minHeightClass, hasCover ? 'bg-neutral-200' : 'border border-border bg-surface', className), ...rest, children: [hasCover ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("img", { src: coverImageUrl, alt: "", loading: "lazy", className: "absolute inset-0 h-full w-full object-cover" }), (0, jsx_runtime_1.jsx)("div", { "aria-hidden": true, className: "absolute inset-0 bg-neutral-900/55" })] })) : null, category ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('relative text-sm font-extrabold uppercase tracking-widest', hasCover ? 'text-neutral-100' : 'text-primary'), children: category })) : null, (0, jsx_runtime_1.jsx)("h1", { className: (0, cn_1.cn)('relative font-extrabold leading-tight', hero ? 'text-3xl' : 'text-2xl', hasCover ? 'text-neutral-50' : 'text-on-surface'), children: title }), deck ? ((0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('relative text-lg leading-relaxed', hasCover ? 'text-neutral-100' : 'text-muted'), children: deck })) : null, author && hasCover ? ((0, jsx_runtime_1.jsx)("p", { className: "relative text-sm font-semibold text-neutral-100", children: [author.name, meta].filter(Boolean).join('  ·  ') })) : author ? ((0, jsx_runtime_1.jsx)(AuthorBylineV2_1.AuthorBylineV2, { author: author, date: date, readingTime: readingTime, variant: "compact" })) : meta ? ((0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('relative text-sm', hasCover ? 'text-neutral-100' : 'text-muted'), children: meta })) : null] }));
});
//# sourceMappingURL=ArticleHeaderV2.js.map
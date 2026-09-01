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
exports.ArticleCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const CardV4_1 = require("../primitives/CardV4");
const SkeletonV4_1 = require("../primitives/SkeletonV4");
const v4_state_1 = require("../primitives/internal/v4-state");
const AuthorBylineV4_1 = require("./AuthorBylineV4");
const CategoryChipV4_1 = require("./CategoryChipV4");
const reading_v4_1 = require("./internal/reading-v4");
/**
 * Hero heights, composed from the spacing scale rather than typed: `160` and
 * `200` at the kit's own rhythm, so a re-scaled seed moves them with it.
 */
const IMAGE_HEIGHT = {
    standard: 'h-[calc(var(--xen-space-2xl)_*_3_+_var(--xen-space-md))]',
    featured: 'h-[calc(var(--xen-space-2xl)_*_4_+_var(--xen-space-sm))]',
};
/** The compact thumbnail — 88 square, as `2xl + xl + sm`. */
const THUMB_CLASS = [
    'h-[calc(var(--xen-space-2xl)_+_var(--xen-space-xl)_+_var(--xen-space-sm))]',
    'w-[calc(var(--xen-space-2xl)_+_var(--xen-space-xl)_+_var(--xen-space-sm))]',
].join(' ');
/**
 * **V4 article card** — the web twin of the native `ArticleCardV4`, same props
 * as {@link ArticleCard} plus `loadingLabel`.
 *
 * ## Five changes
 *
 * 1. **A loading card can no longer be clicked.** The base computed
 *    `interactive` above the loading branch and still hung `role="button"`,
 *    `aria-label` and `onClick` around the skeleton, so a user could tap a
 *    placeholder and open an article that had not arrived. The loading branch
 *    now returns first, inert, named by `loadingLabel` as a polite `status`.
 * 2. **The activation is a real `<button>`**, not a `div` carrying
 *    `role="button"`, `tabIndex` and a hand-written Enter/Space handler. It is
 *    laid over the card rather than wrapped around it, because the body holds
 *    a heading, a paragraph and a byline — block content that is invalid
 *    inside a button and that a wrapping label would swallow.
 * 3. **The image placeholder is the shared media ground.** Web painted
 *    `bg-neutral-100`, a raw ramp step that ignores the seed; native painted
 *    `colors.border`, a hairline token spent as a fill.
 * 4. **Press and hover are the M3 state layer**, not `hover:opacity-90` —
 *    dimming a card is how the kit says *disabled*.
 * 5. **Meta text takes `mutedText`**, the contrast-corrected ink, never the
 *    `muted` fill slot.
 */
exports.ArticleCardV4 = React.forwardRef(function ArticleCardV4({ article, onClick, variant = 'standard', loading = false, loadingLabel = 'Loading article', className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const compact = variant === 'compact';
    const featured = variant === 'featured';
    const imageHeight = IMAGE_HEIGHT[featured ? 'featured' : 'standard'];
    /*
      This branch returns FIRST, and that is the whole point of it. The base
      decided the card was interactive before it decided the card was still
      loading, so the skeleton kept the handler.
    */
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { ref: ref, role: "status", "aria-busy": "true", "aria-label": loadingLabel, className: className, ...rest, children: compact ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-md", children: [(0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "rect", className: (0, cn_1.cn)('shrink-0', THUMB_CLASS) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-sm", children: [(0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "rect", width: "90%", className: "h-[var(--xen-text-lg)]" }), (0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "rect", width: "60%", className: "h-[var(--xen-text-sm)]" })] })] })) : ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-sm", children: [(0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "rect", width: "100%", className: imageHeight }), (0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "rect", width: "90%", className: "h-[var(--xen-text-xl)]" }), (0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "rect", width: "70%", className: "h-[var(--xen-text-sm)]" })] })) }));
    }
    /*
      After the loading branch, never before it. `RelatedArticles` draws its
      placeholders as `{ id, title: '' }`, so a guard hoisted above the branch
      would blank the whole skeleton grid — the state the guard exists to make
      look right.
    */
    if (!article?.title)
        return null;
    const meta = (0, reading_v4_1.metaLine)([article.date, article.readingTime]);
    const body = compact ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-md", children: [article.imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: article.imageUrl, alt: "", loading: "lazy", className: (0, cn_1.cn)('shrink-0 rounded-[var(--xen-radius-md)] object-cover', reading_v4_1.MEDIA_GROUND_CLASS, THUMB_CLASS) })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [article.category ? (0, jsx_runtime_1.jsx)(CategoryChipV4_1.CategoryChipV4, { label: article.category, variant: "soft" }) : null, (0, jsx_runtime_1.jsx)("h3", { className: "line-clamp-3 text-base font-bold leading-snug text-on-surface", children: article.title }), meta ? (0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('text-xs', reading_v4_1.TONE_INK.muted), children: meta }) : null] })] })) : ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-sm", children: [article.imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: article.imageUrl, alt: "", loading: "lazy", className: (0, cn_1.cn)('w-full rounded-[var(--xen-radius-md)] object-cover', reading_v4_1.MEDIA_GROUND_CLASS, imageHeight) })) : null, article.category ? (0, jsx_runtime_1.jsx)(CategoryChipV4_1.CategoryChipV4, { label: article.category, variant: "soft" }) : null, (0, jsx_runtime_1.jsx)("h3", { className: (0, cn_1.cn)('font-bold leading-tight text-on-surface', featured ? 'line-clamp-3 text-xl' : 'line-clamp-2 text-lg'), children: article.title }), article.excerpt ? ((0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('text-sm leading-relaxed', reading_v4_1.TONE_INK.muted, featured ? 'line-clamp-3' : 'line-clamp-2'), children: article.excerpt })) : null, article.author ? ((0, jsx_runtime_1.jsx)(AuthorBylineV4_1.AuthorBylineV4, { author: article.author, date: article.date, readingTime: article.readingTime, variant: "compact" })) : meta ? ((0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('text-xs', reading_v4_1.TONE_INK.muted), children: meta })) : null] }));
    if (!onClick) {
        return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { ref: ref, className: className, ...rest, children: body }));
    }
    /*
      The card's hover and press live on the CARD, and its activation lives on
      a button laid over it. Wrapping the body in the button instead would put
      an `<h3>`, a `<p>` and the byline's own group inside a `<button>` — block
      content a button may not contain, and a name that would replace all three.
    */
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { ref: ref, "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)('var(--xen-surface)', 'var(--xen-on-surface)'), className: (0, cn_1.cn)('relative', className), ...rest, children: [body, (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": (0, reading_v4_1.spokenLine)([
                    article.title,
                    article.category,
                    article.author?.name,
                    article.date,
                    article.readingTime,
                ]), onClick: () => onClick(article), className: (0, cn_1.cn)('absolute inset-0 bg-transparent', 'rounded-[var(--xen-radius-lg)]', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring') })] }));
});
//# sourceMappingURL=ArticleCardV4.js.map
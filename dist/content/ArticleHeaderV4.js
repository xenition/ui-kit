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
exports.ArticleHeaderV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const SkeletonV4_1 = require("../primitives/SkeletonV4");
const AuthorBylineV4_1 = require("./AuthorBylineV4");
const CategoryChipV4_1 = require("./CategoryChipV4");
const reading_v4_1 = require("./internal/reading-v4");
/**
 * The headline's line box as a multiple of its type step — the `leading-tight`
 * the `<h1>` below is actually set in.
 *
 * Named once, and named the same on both twins, because the type scale alone
 * does not settle the placeholder: it gives the glyph size, not the box the
 * glyph sits in. Web typed `44` and `36` while native computed
 * `titleSize * 1.3`, so one variant drew two different skeletons and neither
 * web bar matched the headline that replaced it. Change this number here and
 * the native twin has to move with it.
 */
const TITLE_LEADING = 1.3;
/** The headline placeholder, per variant: the type step times {@link TITLE_LEADING}. */
const TITLE_SKELETON = {
    standard: `h-[calc(var(--xen-text-2xl)_*_${TITLE_LEADING})]`,
    hero: `h-[calc(var(--xen-text-3xl)_*_${TITLE_LEADING})]`,
};
/** Cover heights from the spacing scale — 224 standard, 256 hero. */
const COVER_HEIGHT = {
    standard: 'h-[calc(var(--xen-space-2xl)_*_4_+_var(--xen-space-xl))]',
    hero: 'h-[calc(var(--xen-space-2xl)_*_5_+_var(--xen-space-md))]',
};
/**
 * **V4 article header** — the web twin of the native `ArticleHeaderV4`, same
 * props as {@link ArticleHeader} plus `loadingLabel`.
 *
 * ## Four changes
 *
 * 1. **The skeleton title is the size of the title.** Web typed `44`/`36`
 *    while native derived `titleSize * 1.3`, so one variant drew two different
 *    placeholders and neither web bar matched the headline it stood in for.
 *    Both twins now derive it from the type scale.
 * 2. **The hero placeholder is the shared media ground**, not `bg-neutral-100`
 *    (a raw ramp step that ignores the seed) on web and `colors.border` (a
 *    hairline token spent as a fill) on native.
 * 3. **The deck and the meta line take `mutedText`**, the contrast-corrected
 *    ink slot, where the base inked them with the `muted` fill.
 * 4. **Loading announces itself.** The base drew five grey bars in silence;
 *    the placeholder is now a polite `status` named by `loadingLabel`.
 */
exports.ArticleHeaderV4 = React.forwardRef(function ArticleHeaderV4({ title, deck, category, coverImageUrl, author, date, readingTime, variant = 'standard', loading = false, loadingLabel = 'Loading article', className, ...rest }, ref) {
    const hero = variant === 'hero';
    const key = hero ? 'hero' : 'standard';
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("header", { ref: ref, role: "status", "aria-busy": "true", "aria-label": loadingLabel, className: (0, cn_1.cn)('flex flex-col gap-md', className), ...rest, children: [(0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "rect", width: "30%", className: "h-[var(--xen-text-lg)]" }), (0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "rect", width: "90%", className: TITLE_SKELETON[key] }), (0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "rect", width: "70%", className: TITLE_SKELETON[key] }), (0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "rect", width: "100%", className: COVER_HEIGHT[key] }), (0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "rect", width: "45%", className: "h-[calc(var(--xen-space-xl)_+_var(--xen-space-sm))]" })] }));
    }
    const cover = coverImageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: coverImageUrl, alt: "", loading: "lazy", className: (0, cn_1.cn)('w-full rounded-[var(--xen-radius-lg)] object-cover', reading_v4_1.MEDIA_GROUND_CLASS, COVER_HEIGHT[key]) })) : null;
    const meta = (0, reading_v4_1.metaLine)([date, readingTime]);
    return ((0, jsx_runtime_1.jsxs)("header", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-md', className), ...rest, children: [hero ? null : cover, category ? ((0, jsx_runtime_1.jsx)(CategoryChipV4_1.CategoryChipV4, { label: category, variant: hero ? 'solid' : 'soft' })) : null, (0, jsx_runtime_1.jsx)("h1", { className: (0, cn_1.cn)('font-bold leading-tight text-on-surface', hero ? 'text-3xl' : 'text-2xl'), children: title }), deck ? (0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('text-lg leading-relaxed', reading_v4_1.TONE_INK.muted), children: deck }) : null, hero ? cover : null, author ? ((0, jsx_runtime_1.jsx)(AuthorBylineV4_1.AuthorBylineV4, { author: author, date: date, readingTime: readingTime, variant: "full" })) : meta ? ((0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('text-sm', reading_v4_1.TONE_INK.muted), children: meta })) : null] }));
});
//# sourceMappingURL=ArticleHeaderV4.js.map
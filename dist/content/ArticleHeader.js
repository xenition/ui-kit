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
exports.ArticleHeader = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Skeleton_1 = require("../primitives/Skeleton");
const AuthorByline_1 = require("./AuthorByline");
const CategoryChip_1 = require("./CategoryChip");
/**
 * The masthead of an article page — category eyebrow, headline, dek, cover
 * image, and author byline. Web (React DOM) mirror of the native `ArticleHeader`.
 * Composes `CategoryChip` + `AuthorByline` and reads every color from `--xen-*`
 * token classes. Two variants (`standard` / `hero`) and a `loading` skeleton.
 */
exports.ArticleHeader = React.forwardRef(function ArticleHeader({ title, deck, category, coverImageUrl, author, date, readingTime, variant = 'standard', loading = false, className, ...rest }, ref) {
    const hero = variant === 'hero';
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("header", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-md)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)(Skeleton_1.Skeleton, { variant: "rect", width: 100, height: 20 }), (0, jsx_runtime_1.jsx)(Skeleton_1.Skeleton, { variant: "rect", width: "90%", height: hero ? 44 : 36 }), (0, jsx_runtime_1.jsx)(Skeleton_1.Skeleton, { variant: "rect", width: "70%", height: hero ? 44 : 36 }), (0, jsx_runtime_1.jsx)(Skeleton_1.Skeleton, { variant: "rect", width: "100%", height: 200 }), (0, jsx_runtime_1.jsx)(Skeleton_1.Skeleton, { variant: "rect", width: 180, height: 40 })] }));
    }
    const cover = coverImageUrl && !hero ? ((0, jsx_runtime_1.jsx)("img", { src: coverImageUrl, alt: "", loading: "lazy", className: "h-[220px] w-full rounded-[var(--xen-radius-lg)] bg-neutral-100 object-cover" })) : null;
    const heroCover = coverImageUrl && hero ? ((0, jsx_runtime_1.jsx)("img", { src: coverImageUrl, alt: "", loading: "lazy", className: "h-[260px] w-full rounded-[var(--xen-radius-lg)] bg-neutral-100 object-cover" })) : null;
    return ((0, jsx_runtime_1.jsxs)("header", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-md)]', className), ...rest, children: [cover, category ? (0, jsx_runtime_1.jsx)(CategoryChip_1.CategoryChip, { label: category, variant: hero ? 'solid' : 'soft' }) : null, (0, jsx_runtime_1.jsx)("h1", { className: (0, cn_1.cn)('font-extrabold leading-tight text-on-surface', hero ? 'text-3xl' : 'text-2xl'), children: title }), deck ? (0, jsx_runtime_1.jsx)("p", { className: "text-lg leading-relaxed text-muted", children: deck }) : null, heroCover, author ? ((0, jsx_runtime_1.jsx)(AuthorByline_1.AuthorByline, { author: author, date: date, readingTime: readingTime, variant: "full" })) : date || readingTime ? ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: [date, readingTime].filter(Boolean).join('  ·  ') })) : null] }));
});
//# sourceMappingURL=ArticleHeader.js.map
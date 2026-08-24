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
exports.GalleryHeader = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * The masthead for a client gallery — a title with an optional subtitle, a
 * photo-count meta pill, and an `actions` slot. The `hero` variant lays the
 * text over a full-bleed cover image (with a token scrim for legibility); the
 * `compact` variant is a plain titled band. The title is a semantic heading.
 * Token-only — scrim and surfaces trace to `--xen-*` tokens.
 */
exports.GalleryHeader = React.forwardRef(function GalleryHeader({ title, subtitle, photoCount, coverUrl, variant = 'hero', actions, countLabel = 'photos', className, ...rest }, ref) {
    const isHero = variant === 'hero' && Boolean(coverUrl);
    const textBlock = ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("h2", { className: (0, cn_1.cn)('font-heading text-2xl font-bold', isHero ? 'text-neutral-50' : 'text-on-surface'), children: title }), subtitle ? ((0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('text-sm', isHero ? 'text-neutral-50' : 'text-muted'), children: subtitle })) : null, typeof photoCount === 'number' ? ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('mt-[var(--xen-space-xs)] inline-flex w-fit items-center rounded-full px-[var(--xen-space-sm)] py-0.5 text-xs font-semibold', isHero ? 'bg-neutral-900/40 text-neutral-50' : 'bg-neutral-100 text-muted'), children: [photoCount, " ", countLabel] })) : null, actions ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-[var(--xen-space-sm)] flex flex-wrap gap-[var(--xen-space-sm)]", children: actions })) : null] }));
    if (isHero) {
        return ((0, jsx_runtime_1.jsxs)("header", { ref: ref, "data-xen-gallery-header": "hero", className: (0, cn_1.cn)('relative flex h-[200px] flex-col justify-end overflow-hidden rounded-[var(--xen-radius-lg)] bg-neutral-200', className), ...rest, children: [(0, jsx_runtime_1.jsx)("img", { src: coverUrl, alt: "", className: "absolute inset-0 h-full w-full object-cover" }), (0, jsx_runtime_1.jsx)("div", { className: "relative bg-neutral-900/40 p-[var(--xen-space-lg)]", children: textBlock })] }));
    }
    return ((0, jsx_runtime_1.jsx)("header", { ref: ref, "data-xen-gallery-header": "compact", className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)]', className), ...rest, children: textBlock }));
});
//# sourceMappingURL=GalleryHeader.js.map
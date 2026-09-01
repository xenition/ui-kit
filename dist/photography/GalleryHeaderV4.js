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
exports.GalleryHeaderV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * GalleryHeader — **V4** "studio" design (web parity of the native V4). The
 * client-gallery masthead, and the **one reserved gradient moment** in the
 * photography studio line. The `hero` variant is image-forward: with a
 * `coverUrl` it lays near-white ink over a full-bleed cover photo darkened by a
 * bottom scrim (`from-neutral-900/70`); with no cover it falls back to the brand
 * gradient ground (`from-primary-500 to-primary-700`). The `compact` variant is
 * a clean studio band (no gradient) — bordered `bg-surface`, a bold title, muted
 * subtitle, and a neutral count pill. The photo-count reads as a frosted
 * `primary-50` pill on the gradient; the title is a semantic `<h2>` inside a
 * `<header>`. Identical props/behavior to {@link GalleryHeaderProps}; all colors
 * from `--xen-*` token classes / brand-ramp utilities (no literals).
 */
exports.GalleryHeaderV4 = React.forwardRef(function GalleryHeaderV4({ title, subtitle, photoCount, coverUrl, variant = 'hero', actions, countLabel = 'photos', className, ...rest }, ref) {
    const isHero = variant === 'hero';
    // ── compact: clean studio band, no gradient ──────────────────────────────
    if (!isHero) {
        return ((0, jsx_runtime_1.jsx)("header", { ref: ref, "data-xen-gallery-header": "compact", className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)] rounded-lg border border-border bg-surface p-[var(--xen-space-lg)]', className), ...rest, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("h2", { className: "font-heading text-2xl font-bold text-on-surface", children: title }), subtitle ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: subtitle }) : null, typeof photoCount === 'number' ? ((0, jsx_runtime_1.jsxs)("span", { className: "mt-[var(--xen-space-xs)] inline-flex w-fit items-center rounded-full bg-neutral-100 px-[var(--xen-space-sm)] py-0.5 text-xs font-semibold text-muted", children: [photoCount, " ", countLabel] })) : null, actions ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-[var(--xen-space-sm)] flex flex-wrap gap-[var(--xen-space-sm)]", children: actions })) : null] }) }));
    }
    // ── hero: the reserved gradient moment ───────────────────────────────────
    const textBlock = ((0, jsx_runtime_1.jsxs)("div", { className: "relative flex flex-col gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("h2", { className: "font-heading text-3xl font-bold tracking-tight text-primary-50", children: title }), subtitle ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm text-primary-100", children: subtitle }) : null, typeof photoCount === 'number' ? ((0, jsx_runtime_1.jsxs)("span", { className: "mt-[var(--xen-space-xs)] inline-flex w-fit items-center rounded-full border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-sm)] py-0.5 text-xs font-semibold text-primary-50", children: [photoCount, " ", countLabel] })) : null, actions ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-[var(--xen-space-sm)] flex flex-wrap gap-[var(--xen-space-sm)]", children: actions })) : null] }));
    return ((0, jsx_runtime_1.jsxs)("header", { ref: ref, "data-xen-gallery-header": "hero", className: (0, cn_1.cn)('relative isolate flex min-h-[200px] flex-col justify-end overflow-hidden rounded-[var(--xen-radius-lg)]', 
        // Cover present → neutral ground under the photo; absent → brand gradient ground.
        coverUrl ? 'bg-neutral-200' : 'bg-gradient-to-br from-primary-500 to-primary-700', className), ...rest, children: [coverUrl ? ((0, jsx_runtime_1.jsx)("img", { src: coverUrl, alt: "", className: "absolute inset-0 -z-10 h-full w-full object-cover" })) : null, coverUrl ? ((0, jsx_runtime_1.jsx)("div", { className: "pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-neutral-900/70 to-transparent" })) : null, (0, jsx_runtime_1.jsx)("div", { className: "p-[var(--xen-space-lg)]", children: textBlock })] }));
});
//# sourceMappingURL=GalleryHeaderV4.js.map
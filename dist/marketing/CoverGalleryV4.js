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
exports.CoverGalleryV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const GenerativeCover_1 = require("./GenerativeCover");
const COLUMN_CLASSES = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
};
/**
 * CoverGallery — **V4** "showcase" design (web parity of the native V4). An
 * elevated wall of floating rounded {@link GenerativeCover} plates (composing the
 * same seeded artwork the base does — `form`/`ink`/`paper` per plate still apply)
 * on a clean surface (NO brand gradient): each plate lifts on a soft shadow with
 * a hover bloom, captions read as bold tight-tracked headings, and `meta` becomes
 * a soft-primary chip. The base's per-tile `href` still stretches a link across
 * the plate. Honors every base prop (`items`/`columns`/`aspect`); token-only
 * colors, no literals.
 */
exports.CoverGalleryV4 = React.forwardRef(function CoverGalleryV4({ items, columns = 3, aspect = 1, className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-cover-gallery": "", className: (0, cn_1.cn)('grid grid-cols-1 gap-[var(--xen-space-lg)]', COLUMN_CLASSES[columns], className), ...rest, children: items.map((item, index) => {
            const plate = ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface shadow-sm', 'transition-shadow duration-300 hover:shadow-md'), style: { '--xen-cover-aspect': String(aspect) }, children: (0, jsx_runtime_1.jsx)("div", { className: "aspect-[var(--xen-cover-aspect)] bg-primary/[0.06]", children: (0, jsx_runtime_1.jsx)(GenerativeCover_1.GenerativeCover, { seed: item.seed, form: item.form, ink: item.ink, paper: item.paper, label: item.label ?? (typeof item.caption === 'string' ? item.caption : undefined), className: "h-full w-full" }) }) }));
            return ((0, jsx_runtime_1.jsxs)("figure", { "data-xen-cover-tile": "", className: "relative flex flex-col gap-[var(--xen-space-sm)]", children: [item.href ? ((0, jsx_runtime_1.jsx)("a", { href: item.href, "aria-label": item.label ?? (typeof item.caption === 'string' ? item.caption : 'View'), className: "block after:absolute after:inset-0 after:content-['']", children: plate })) : (plate), item.caption !== undefined || item.meta !== undefined ? ((0, jsx_runtime_1.jsxs)("figcaption", { className: "flex flex-col items-start gap-[var(--xen-space-xs)]", children: [item.caption !== undefined ? ((0, jsx_runtime_1.jsx)("span", { className: "font-heading text-lg font-extrabold leading-snug tracking-tight text-on-surface", children: item.caption })) : null, item.meta !== undefined ? ((0, jsx_runtime_1.jsx)("span", { "data-xen-cover-meta": "", className: "w-fit rounded-[var(--xen-radius-full)] bg-primary/10 px-[var(--xen-space-sm)] py-[2px] text-xs font-medium text-primary", children: item.meta })) : null] })) : null] }, index));
        }) }));
});
//# sourceMappingURL=CoverGalleryV4.js.map
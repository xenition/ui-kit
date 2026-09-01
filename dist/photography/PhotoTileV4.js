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
exports.PhotoTileV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const RATIO_CLASS = {
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]',
};
/**
 * PhotoTile — **V4** "studio" design (web parity of the native V4). The matted,
 * image-forward take on a photo tile: an elevated card whose photo floats inside
 * a thin neutral **mat** ring, honoring all three `ratio` presets — `square`,
 * `portrait` (3/4), and `landscape` (4/3). `selected` and `favorite` are shown by
 * a glyph + token color (never color alone), the `caption` reads as a small
 * soft-primary chip, and `loading` draws a token-only skeleton. Identical
 * props/behavior to {@link PhotoTileProps}; `onClick` makes the whole tile a
 * keyboard-operable button. All colors from `--xen-*` token classes (no literals).
 */
exports.PhotoTileV4 = React.forwardRef(function PhotoTileV4({ url, alt, caption, ratio = 'square', selected = false, favorite = false, loading = false, onClick, className, ...rest }, ref) {
    const interactive = typeof onClick === 'function';
    const container = (0, cn_1.cn)('rounded-[var(--xen-radius-lg)] border border-border bg-surface p-2 text-on-surface shadow-md', interactive &&
        'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className);
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-photo-tile": "", "aria-label": "Loading photo", "aria-busy": "true", className: container, children: (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('animate-pulse rounded-[var(--xen-radius-md)] bg-neutral-200', RATIO_CLASS[ratio]) }) }));
    }
    // The matted photo: the image floats inside a thin inset mat ring on a neutral ground.
    const mat = (0, cn_1.cn)('relative overflow-hidden rounded-[var(--xen-radius-md)] bg-neutral-100 ring-1 ring-inset ring-border', RATIO_CLASS[ratio]);
    const media = ((0, jsx_runtime_1.jsxs)("div", { className: mat, children: [url ? ((0, jsx_runtime_1.jsx)("img", { src: url, alt: interactive ? '' : alt ?? caption ?? '', loading: "lazy", className: "h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex h-full w-full items-center justify-center text-2xl text-muted", "aria-hidden": "true", children: "\uD83D\uDDBC" })), favorite ? ((0, jsx_runtime_1.jsx)("span", { "data-xen-photo-favorite": "", role: "img", "aria-label": "Favourite", className: "absolute right-[var(--xen-space-xs)] top-[var(--xen-space-xs)] inline-flex items-center rounded-full bg-primary/10 px-[var(--xen-space-xs)] py-0.5 text-sm leading-none text-primary", children: "\u2605" })) : null, selected ? ((0, jsx_runtime_1.jsx)("span", { "data-xen-photo-selected": "", role: "img", "aria-label": "Selected", className: "absolute left-[var(--xen-space-xs)] top-[var(--xen-space-xs)] inline-flex h-[22px] w-[22px] items-center justify-center rounded-full bg-accent text-sm leading-none text-on-accent", children: "\u2713" })) : null] }));
    const chip = caption ? ((0, jsx_runtime_1.jsx)("div", { className: "px-1 pb-1 pt-[var(--xen-space-md)]", children: (0, jsx_runtime_1.jsx)("span", { className: "inline-flex max-w-full items-center gap-1 truncate rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-on-surface", children: caption }) })) : null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-photo-tile": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? alt ?? caption ?? 'Photo' : undefined, "aria-pressed": interactive ? selected : undefined, onClick: onClick, onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.currentTarget.click();
                }
            }
            : undefined, className: container, ...rest, children: [media, chip] }));
});
//# sourceMappingURL=PhotoTileV4.js.map
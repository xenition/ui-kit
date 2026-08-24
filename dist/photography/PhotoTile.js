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
exports.PhotoTile = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const RATIO_CLASS = {
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]',
};
/**
 * A single photo tile — the atomic unit of a grid or selection sheet. Draws the
 * image inside an aspect-ratio box (`square`/`portrait`/`landscape`), an
 * optional overlaid `caption`, a `favorite` star marker, and a `selected`
 * accent ring with a check badge. Selection/favourite states carry a glyph +
 * accessibility state, never color alone. Passing `onClick` makes it a
 * keyboard-operable `button`; token-only colors.
 */
exports.PhotoTile = React.forwardRef(function PhotoTile({ url, alt, caption, ratio = 'square', selected = false, favorite = false, loading = false, onClick, className, ...rest }, ref) {
    const interactive = typeof onClick === 'function';
    const frame = (0, cn_1.cn)('relative overflow-hidden rounded-[var(--xen-radius-md)] bg-neutral-100', RATIO_CLASS[ratio], selected && 'ring-2 ring-accent', interactive &&
        'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className);
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-photo-tile": "", "aria-label": "Loading photo", "aria-busy": "true", className: (0, cn_1.cn)(frame, 'animate-pulse bg-neutral-200') }));
    }
    const overlays = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [url ? ((0, jsx_runtime_1.jsx)("img", { src: url, alt: interactive ? '' : alt ?? caption ?? '', loading: "lazy", className: "h-full w-full object-cover" })) : null, favorite ? ((0, jsx_runtime_1.jsx)("span", { "data-xen-photo-favorite": "", role: "img", "aria-label": "Favourite", className: "absolute right-[var(--xen-space-xs)] top-[var(--xen-space-xs)] inline-flex items-center rounded-full bg-neutral-900/60 px-[var(--xen-space-xs)] py-0.5 text-sm leading-none text-on-primary", children: "\u2605" })) : null, selected ? ((0, jsx_runtime_1.jsx)("span", { "data-xen-photo-selected": "", role: "img", "aria-label": "Selected", className: "absolute left-[var(--xen-space-xs)] top-[var(--xen-space-xs)] inline-flex h-[22px] w-[22px] items-center justify-center rounded-full bg-accent text-sm leading-none text-on-accent", children: "\u2713" })) : null, caption ? ((0, jsx_runtime_1.jsx)("span", { className: "absolute inset-x-0 bottom-0 truncate bg-neutral-900/50 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)] text-xs font-semibold text-on-primary", children: caption })) : null] }));
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-photo-tile": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? alt ?? caption ?? 'Photo' : undefined, "aria-pressed": interactive ? selected : undefined, onClick: onClick, onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.currentTarget.click();
                }
            }
            : undefined, className: frame, ...rest, children: overlays }));
});
//# sourceMappingURL=PhotoTile.js.map
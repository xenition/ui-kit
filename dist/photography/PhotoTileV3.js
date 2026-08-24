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
exports.PhotoTileV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const RATIO = { square: 'aspect-square', portrait: 'aspect-[3/4]', landscape: 'aspect-[4/3]' };
/**
 * PhotoTile, redesigned (v3): a **full-bleed minimal tile**. The image fills a
 * borderless rounded frame that zooms slightly on hover; the caption fades in on
 * a bottom scrim only when present, and selected/favourite show a corner check /
 * ★. The opposite of v2's framed polaroid. Same props, token-only.
 */
exports.PhotoTileV3 = React.forwardRef(function PhotoTileV3({ url, alt, caption, ratio = 'square', selected = false, favorite = false, loading = false, onClick, className, ...rest }, ref) {
    const interactive = typeof onClick === 'function';
    if (loading) {
        return (0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-photo-tile": "", "aria-label": "Loading photo", "aria-busy": "true", className: (0, cn_1.cn)('animate-pulse rounded-lg bg-neutral-200', RATIO[ratio], className), ...rest });
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-photo-tile": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? alt ?? caption ?? 'Photo' : undefined, onClick: onClick, className: (0, cn_1.cn)('group relative overflow-hidden rounded-lg bg-neutral-100', RATIO[ratio], selected && 'ring-2 ring-accent', interactive && 'cursor-pointer', className), ...rest, children: [url ? ((0, jsx_runtime_1.jsx)("img", { src: url, alt: interactive ? '' : alt ?? caption ?? '', loading: "lazy", className: "h-full w-full object-cover transition-transform duration-200 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100" })) : null, favorite ? ((0, jsx_runtime_1.jsx)("span", { role: "img", "aria-label": "Favourite", className: "absolute left-1 top-1 inline-flex items-center rounded-full bg-neutral-900/60 px-1.5 py-0.5 text-sm leading-none text-on-primary", children: "\u2605" })) : null, selected ? ((0, jsx_runtime_1.jsx)("span", { role: "img", "aria-label": "Selected", className: "absolute right-1 top-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs text-on-accent", children: "\u2713" })) : null, caption ? ((0, jsx_runtime_1.jsx)("div", { className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-neutral-900/70 to-transparent p-2", children: (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-neutral-50", children: caption }) })) : null] }));
});
//# sourceMappingURL=PhotoTileV3.js.map
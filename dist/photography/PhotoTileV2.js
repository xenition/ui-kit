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
exports.PhotoTileV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const RATIO = { square: 'aspect-square', portrait: 'aspect-[3/4]', landscape: 'aspect-[4/3]' };
/**
 * PhotoTile, redesigned (v2): a **framed polaroid**. The image sits inset in a
 * padded surface frame with a soft shadow and the caption printed on a strip
 * beneath — selected draws an accent ring on the frame, favourite shows a ★.
 * Distinct from v1's flush tile. Same props, token-only.
 */
exports.PhotoTileV2 = React.forwardRef(function PhotoTileV2({ url, alt, caption, ratio = 'square', selected = false, favorite = false, loading = false, onClick, className, ...rest }, ref) {
    const interactive = typeof onClick === 'function';
    if (loading) {
        return (0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-photo-tile": "", "aria-label": "Loading photo", "aria-busy": "true", className: (0, cn_1.cn)('h-40 animate-pulse rounded-md bg-neutral-200 p-2', className), ...rest });
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-photo-tile": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? alt ?? caption ?? 'Photo' : undefined, onClick: onClick, className: (0, cn_1.cn)('flex flex-col gap-1 rounded-md bg-surface p-2 shadow-md transition-transform', selected && 'ring-2 ring-accent', interactive && 'cursor-pointer hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('relative overflow-hidden rounded-sm bg-neutral-100', RATIO[ratio]), children: [url ? (0, jsx_runtime_1.jsx)("img", { src: url, alt: interactive ? '' : alt ?? caption ?? '', loading: "lazy", className: "h-full w-full object-cover" }) : null, favorite ? ((0, jsx_runtime_1.jsx)("span", { role: "img", "aria-label": "Favourite", className: "absolute right-1 top-1 inline-flex items-center rounded-full bg-neutral-900/60 px-1.5 py-0.5 text-sm leading-none text-on-primary", children: "\u2605" })) : null] }), caption ? (0, jsx_runtime_1.jsx)("p", { className: "truncate px-0.5 text-center text-xs text-muted", children: caption }) : null] }));
});
//# sourceMappingURL=PhotoTileV2.js.map
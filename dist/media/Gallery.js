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
exports.Gallery = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const aspect_1 = require("./aspect");
const GRID_COLS = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 sm:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
};
const MASONRY_COLS = {
    2: 'columns-2',
    3: 'columns-2 sm:columns-3',
    4: 'columns-2 sm:columns-3 lg:columns-4',
};
function Media({ item }) {
    if (item.kind === 'video') {
        return ((0, jsx_runtime_1.jsx)("video", { src: item.url, poster: item.poster, muted: true, playsInline: true, preload: "metadata", className: "h-full w-full object-cover" }));
    }
    return ((0, jsx_runtime_1.jsx)("img", { src: item.url, alt: item.alt ?? item.caption ?? '', loading: "lazy", width: item.width, height: item.height, className: "h-full w-full object-cover" }));
}
/**
 * Responsive media grid with a `masonry` variant. `grid` renders uniform tiles;
 * `masonry` uses CSS columns and each item's natural aspect ratio (from
 * `width`/`height`). Images are `loading="lazy"`. When `onOpen` is provided each
 * tile is a button that reports its index (wire it to a `Lightbox`). Token-only.
 */
exports.Gallery = React.forwardRef(function Gallery({ items, columns = 3, variant = 'grid', onOpen, className, ...rest }, ref) {
    const masonry = variant === 'masonry';
    const tile = (item, index) => {
        const aspect = masonry ? (0, aspect_1.aspectStyle)(item.width, item.height) : undefined;
        const inner = ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('overflow-hidden rounded-[var(--xen-radius-md)] bg-neutral-100', !masonry && 'aspect-square'), style: aspect, children: (0, jsx_runtime_1.jsx)(Media, { item: item }) }));
        return ((0, jsx_runtime_1.jsx)("div", { "data-xen-gallery-item": "", className: (0, cn_1.cn)(masonry && 'mb-[var(--xen-space-md)] break-inside-avoid'), children: onOpen ? ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => onOpen(index), "aria-label": item.alt ?? item.caption ?? `Open item ${index + 1}`, className: "block w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: inner })) : (inner) }, index));
    };
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-gallery": variant, className: (0, cn_1.cn)(masonry
            ? (0, cn_1.cn)('gap-[var(--xen-space-md)]', MASONRY_COLS[columns])
            : (0, cn_1.cn)('grid gap-[var(--xen-space-md)]', GRID_COLS[columns]), className), ...rest, children: items.map(tile) }));
});
//# sourceMappingURL=Gallery.js.map
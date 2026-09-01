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
exports.GalleryV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const IconV4_1 = require("../primitives/IconV4");
const aspect_1 = require("./aspect");
/** Whole class names — Tailwind's scanner cannot follow a composed string. */
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
/**
 * **V4 gallery** — the web twin of the native `GalleryV4`, same props as
 * {@link Gallery} plus `emptyMessage`, `videoLabel` and `formatItemLabel`.
 *
 * ## Four changes
 *
 * 1. **A video tile is a poster with a play badge**, never an autoplaying or
 *    control-bearing `<video>` inside a button. A grid of video elements is a
 *    grid of nested interactive controls; a gallery tile's job is to open the
 *    thing, and the lightbox is where it plays.
 * 2. **An empty album says so.**
 * 3. **The placeholder ground is `muted`**, not the `bg-neutral-100` ramp step
 *    that is near-white on a dark page.
 * 4. **Focus is the shared `--xen-ring`**, and the tile's name carries its
 *    position in the album.
 */
exports.GalleryV4 = React.forwardRef(function GalleryV4({ items, columns = 3, variant = 'grid', onOpen, emptyMessage = 'No media yet.', videoLabel = 'video', formatItemLabel, className, ...rest }, ref) {
    const masonry = variant === 'masonry';
    const total = items?.length ?? 0;
    const label = formatItemLabel ?? ((n, of) => `Open item ${n} of ${of}`);
    if (total === 0) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('p-lg text-center text-sm text-muted-text', className), ...rest, children: emptyMessage }));
    }
    const tile = (item, index) => {
        const aspect = masonry ? (0, aspect_1.aspectStyle)(item.width, item.height) : undefined;
        const video = item.kind === 'video';
        const src = video ? item.poster : item.url;
        const name = [
            item.alt ?? item.caption ?? label(index + 1, total),
            video ? videoLabel : null,
        ]
            .filter(Boolean)
            .join(', ');
        const inner = ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('relative flex items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] bg-muted', !masonry && 'aspect-square'), style: aspect, children: [src ? ((0, jsx_runtime_1.jsx)("img", { src: src, alt: item.alt ?? item.caption ?? '', loading: "lazy", className: "h-full w-full object-cover" })) : null, video ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "pointer-events-none absolute flex h-10 w-10 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--xen-on-surface)_55%,transparent)] text-surface", children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: "\u25B6", size: "base" }) })) : null] }));
        return ((0, jsx_runtime_1.jsx)("div", { "data-xen-gallery-item": "", className: (0, cn_1.cn)(masonry && 'mb-md break-inside-avoid'), children: onOpen ? ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => onOpen(index), "aria-label": name, "data-xen-v4-chrome": "on-surface", className: "block w-full rounded-[var(--xen-radius-md)]", children: inner })) : (inner) }, index));
    };
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-gallery": variant, className: (0, cn_1.cn)(masonry ? (0, cn_1.cn)('gap-md', MASONRY_COLS[columns]) : (0, cn_1.cn)('grid gap-md', GRID_COLS[columns]), className), ...rest, children: items.map(tile) }));
});
//# sourceMappingURL=GalleryV4.js.map
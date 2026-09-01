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
exports.LookbookGridV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
/** Whole class names — Tailwind's scanner cannot follow `grid-cols-${n}`. */
const COLS = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-2 sm:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
};
/**
 * **V4 lookbook grid** — the web twin of the native `LookbookGridV4`, same
 * props as {@link LookbookGrid} plus `formatItemLabel`.
 *
 * ## Four changes
 *
 * 1. **The placeholder ground is `bg-muted`**, not a translucent wash that
 *    borrows whatever is behind it.
 * 2. **A tile without a label is named by position**, not by its `id` — the
 *    base read a database key aloud.
 * 3. **The caption overlay uses the elevation colour**, dark in both schemes,
 *    rather than `on-surface`, which inverts.
 * 4. **The grid is a real list**, so a reader announces how many looks there
 *    are before walking them.
 */
exports.LookbookGridV4 = React.forwardRef(function LookbookGridV4({ items, columns = 2, aspectRatio = 1, emptyLabel = 'No looks yet.', formatItemLabel, onSelect, className, ...rest }, ref) {
    const total = items?.length ?? 0;
    const label = formatItemLabel ?? ((n, of) => `Look ${n} of ${of}`);
    const cols = COLS[Math.max(1, Math.min(4, Math.floor(columns)))] ?? COLS[2];
    if (total === 0) {
        return ((0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('p-lg text-center text-sm text-muted-text', className), children: emptyLabel }));
    }
    return (
    /*
      The base's props type is a `<div>`'s, so the root stays one and the
      real `<ul>` sits inside it — a list element that cannot take the
      caller's own div attributes would break prop parity for a semantic
      upgrade, which is not a trade worth making.
    */
    (0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-lookbook-grid": "", className: className, ...rest, children: (0, jsx_runtime_1.jsx)("ul", { className: (0, cn_1.cn)('grid gap-sm', cols), children: items.map((item, index) => {
                const name = item.label ?? label(index + 1, total);
                const tile = ((0, jsx_runtime_1.jsxs)("span", { className: "relative block w-full overflow-hidden rounded-[var(--xen-radius-md)] bg-muted", style: { aspectRatio: String(aspectRatio) }, children: [item.imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: item.imageUrl, alt: onSelect ? '' : name, loading: "lazy", className: "h-full w-full object-cover" })) : null, item.tag ? ((0, jsx_runtime_1.jsx)("span", { className: "absolute left-sm top-sm", children: (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "primary", variant: "soft", size: "sm", children: item.tag }) })) : null, item.label ? ((0, jsx_runtime_1.jsx)("span", { className: "absolute inset-x-0 bottom-0 truncate px-sm py-xs text-xs font-semibold text-neutral-50 bg-[color-mix(in_srgb,var(--xen-elevation-color)_62%,transparent)]", children: item.label })) : null] }));
                return ((0, jsx_runtime_1.jsx)("li", { children: onSelect ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": name, onClick: () => onSelect(item.id), "data-xen-v4-chrome": "on-surface", className: "block w-full rounded-[var(--xen-radius-md)]", children: tile })) : (tile) }, item.id ?? index));
            }) }) }));
});
//# sourceMappingURL=LookbookGridV4.js.map
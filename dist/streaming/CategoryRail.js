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
exports.CategoryRail = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * CategoryRail — **V4** "spotlight" design (web parity of the native V4). A
 * horizontally-scrolling rail of rounded browse tiles (genres / moods). Each
 * tile is a gradient-glow cover — the V4 accent→primary wash — or the category
 * artwork when supplied, with the label set in near-white `onPrimary` ink over a
 * legibility scrim. Tiles are ≥44px tap targets. Presentational only; all colors
 * from `--xen-*` token classes and gradient utilities (no literal hex).
 * Dark-mode safe.
 */
exports.CategoryRail = React.forwardRef(function CategoryRail({ categories, title, onSelect, className, ...rest }, ref) {
    if (categories.length === 0)
        return null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-category-rail": "", className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)]', className), ...rest, children: [title ? ((0, jsx_runtime_1.jsx)("span", { className: "px-[var(--xen-space-xs)] text-xs font-bold uppercase tracking-wide text-muted", children: title })) : null, (0, jsx_runtime_1.jsx)("ul", { role: "list", className: "flex gap-[var(--xen-space-md)] overflow-x-auto pb-[var(--xen-space-xs)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden", children: categories.map((cat) => {
                    const interactive = !!onSelect;
                    return ((0, jsx_runtime_1.jsx)("li", { role: "listitem", className: "shrink-0", children: (0, jsx_runtime_1.jsxs)("button", { type: "button", disabled: !interactive, "aria-label": cat.label, onClick: interactive ? () => onSelect(cat.id) : undefined, className: (0, cn_1.cn)('relative flex h-24 w-32 min-h-[44px] min-w-[44px] items-end overflow-hidden rounded-[var(--xen-radius-lg)] p-[var(--xen-space-sm)] text-left', 'bg-gradient-to-br from-accent-400 to-primary-600', 'transition-transform', interactive &&
                                'hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', !interactive && 'cursor-default'), children: [cat.artworkUrl ? ((0, jsx_runtime_1.jsx)("img", { src: cat.artworkUrl, alt: "", "aria-hidden": "true", className: "absolute inset-0 h-full w-full object-cover" })) : null, (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "absolute inset-0 bg-gradient-to-t from-primary-700/70 to-transparent" }), (0, jsx_runtime_1.jsxs)("span", { className: "relative flex items-center gap-[var(--xen-space-xs)]", children: [cat.glyph ? (0, jsx_runtime_1.jsx)("span", { className: "text-lg text-on-primary", children: cat.glyph }) : null, (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold text-on-primary", children: cat.label })] })] }) }, cat.id));
                }) })] }));
});
//# sourceMappingURL=CategoryRail.js.map
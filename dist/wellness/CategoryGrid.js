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
exports.CategoryGrid = exports.CategoryTile = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const _tokens_1 = require("./_tokens");
/**
 * CategoryTile — one browse tile: a soft, color-coded card in its category's
 * tone. A glyph sits in a slightly deeper tint circle over a lighter tinted
 * ground, with the label in `on-surface`. This is the one wellness surface where
 * per-card color is the point — the grid reads as a palette of categories. The
 * tints are `SLOT_TINT[tone]`, so every color traces to a token and restyles
 * from the seed, light + dark.
 */
exports.CategoryTile = React.forwardRef(function CategoryTile({ category, onSelect, className, ...rest }, ref) {
    const tone = category.tone ?? 'primary';
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('flex', className), ...rest, children: (0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": category.label, onClick: () => onSelect?.(category), className: (0, cn_1.cn)('flex w-full flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] p-[var(--xen-space-lg)] text-left', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', _tokens_1.SLOT_TINT[tone]), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('flex h-11 w-11 items-center justify-center rounded-full text-xl', _tokens_1.SLOT_TINT[tone]), children: category.glyph }), (0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: category.label })] }) }));
});
/**
 * CategoryGrid — the browse surface: a grid of color-coded {@link CategoryTile}s,
 * two per row. Color lives on the tiles (each in its category tone); the grid
 * itself is a plain layout. Token-only colors.
 */
exports.CategoryGrid = React.forwardRef(function CategoryGrid({ categories, onSelect, className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "menu", className: (0, cn_1.cn)('grid gap-3', className), style: { gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }, ...rest, children: categories.map((category) => ((0, jsx_runtime_1.jsx)(exports.CategoryTile, { category: category, onSelect: onSelect }, category.id))) }));
});
//# sourceMappingURL=CategoryGrid.js.map
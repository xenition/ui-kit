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
exports.ProductGridV4 = exports.COLUMN_TIERS = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const grid_v4_1 = require("./internal/grid-v4");
Object.defineProperty(exports, "COLUMN_TIERS", { enumerable: true, get: function () { return grid_v4_1.COLUMN_TIERS; } });
/**
 * Static class strings so Tailwind's scanner can see every variant. These are
 * the tiers in {@link COLUMN_TIERS}, spelled as Tailwind — keep the two in
 * step; the native twin reads the table and this file reads the classes.
 */
const COLUMN_CLASSES = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
};
const GAP_CLASSES = {
    sm: 'gap-sm',
    md: 'gap-md',
    lg: 'gap-lg',
};
/**
 * **V4 product grid** — the web twin of the native `ProductGridV4`, same props
 * as {@link ProductGrid} plus three, a different design line.
 *
 * **This component is layout and nothing else.** It sets a column count and a
 * gutter and renders its children exactly as handed to it: no wrapper with a
 * ground, no ratio forced onto a tile, no `[&>*]:` reaching into a child's
 * styling. A grid that restyles what it holds is a grid you cannot put a
 * `ProductCardV4` and a promo tile in side by side, and it is why the base
 * line's grids and cards had to be upgraded in lockstep.
 *
 * Three changes:
 *
 * 1. **`columns` finally means the same thing on both twins.** See
 *    {@link COLUMN_TIERS} — this was a real cross-platform layout bug, not a
 *    tidy-up.
 * 2. **The gutter is a prop, on the scale.** The base hard-coded `lg` (24).
 *    That is right for a marketing grid of four and too loose for a dense
 *    search result at three columns, and every app that wanted the tighter one
 *    was passing a `className` full of `!gap-*`.
 * 3. **It survives its empty case.** No children and no `empty` renders
 *    nothing; no children *with* an `empty` renders that. The base drew an
 *    empty grid — a `<div>` with gutters and no content, which occupies space
 *    and says nothing (§4.5).
 */
exports.ProductGridV4 = React.forwardRef(function ProductGridV4({ columns = 4, gap = 'lg', empty, label, className, children, ...rest }, ref) {
    // `toArray` drops `null`, `undefined` and booleans, so a grid whose items
    // are all `cond && <Card/>` and all false is correctly empty rather than
    // "four children, none of which render".
    const items = React.Children.toArray(children);
    if (items.length === 0) {
        if (!empty)
            return null;
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-product-grid": "", "data-xen-product-grid-empty": "", "aria-label": label, className: className, ...rest, children: empty }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-product-grid": "", "aria-label": label, className: (0, cn_1.cn)('grid', GAP_CLASSES[gap], COLUMN_CLASSES[columns], className), ...rest, children: children }));
});
//# sourceMappingURL=ProductGridV4.js.map
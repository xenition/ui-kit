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
exports.BREAK_LG = exports.BREAK_SM = exports.COLUMN_TIERS = void 0;
exports.tierFor = tierFor;
exports.ProductGridV4 = ProductGridV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const grid_v4_1 = require("../../commerce/internal/grid-v4");
Object.defineProperty(exports, "COLUMN_TIERS", { enumerable: true, get: function () { return grid_v4_1.COLUMN_TIERS; } });
/**
 * Tailwind's `sm` and `lg`, in dp.
 *
 * They are here so that "the width at which a product grid gains a column" is
 * one decision rather than two, and they are the web preset's values rather
 * than numbers picked for this file — a native tile stepping to three columns
 * at a different width than the web one is the same class of bug as `columns`
 * meaning two things. Not spacings, colours, radii or type sizes, which is why
 * they are allowed to be numbers at all.
 */
exports.BREAK_SM = 640;
exports.BREAK_LG = 1024;
/** Which tier of {@link COLUMN_TIERS} a viewport of `width` dp sits in. */
function tierFor(width) {
    if (width >= exports.BREAK_LG)
        return 2;
    if (width >= exports.BREAK_SM)
        return 1;
    return 0;
}
/**
 * **V4 product grid (native)** — same props as the web `ProductGridV4`,
 * including defaults.
 *
 * **This component is layout and nothing else.** It sets a column count and a
 * gutter and renders its children as handed to it. The one wrapper it does add
 * is the `flex: 1` cell every `FlatList` row needs to divide its width — pure
 * layout, no ground, no padding, nothing that changes how a tile looks.
 *
 * Three changes:
 *
 * 1. **`columns` finally means the same thing as it does on web.** The web
 *    base documented it as "max columns at the widest breakpoint" and
 *    defaulted to 4; this base treated it as a literal count and defaulted to
 *    2. One prop, one name, two meanings — a template that swapped web for
 *    native by import path silently changed its layout. V4 makes it the
 *    ceiling on both twins, defaults both to 4, and steps *down* here through
 *    the same tier table the web class map encodes. A phone renders two
 *    columns because it is a phone, not because it imported a different file.
 * 2. **The gutter is a prop, on the scale.** The base hard-coded `lg` (24),
 *    which is right for a grid of four and too loose for a dense list of two.
 * 3. **It survives its empty case.** No children and no `empty` renders
 *    nothing; no children with an `empty` renders that, through
 *    `ListEmptyComponent` so the list still owns its own scroll (§4.5).
 *
 * Still a `FlatList`, still virtualized, still children-based: a long catalog
 * is the case this component exists for, and the web API is what lets a
 * template swap platforms by import path.
 */
function ProductGridV4({ columns = 4, gap = 'lg', empty, label, children, style, scrollEnabled, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    const { width } = (0, react_native_1.useWindowDimensions)();
    const items = React.Children.toArray(children);
    const resolved = grid_v4_1.COLUMN_TIERS[columns][tierFor(width)];
    const gutter = tokens.spacing[gap];
    if (items.length === 0 && !empty)
        return null;
    return ((0, jsx_runtime_1.jsx)(react_native_1.FlatList, { data: items, accessibilityLabel: label, numColumns: resolved, scrollEnabled: scrollEnabled, keyExtractor: (_, index) => String(index), 
        // A one-column list has no row wrapper to style, and RN throws if it is
        // handed one anyway.
        columnWrapperStyle: resolved > 1 ? { gap: gutter } : undefined, contentContainerStyle: [{ gap: gutter }, style], ListEmptyComponent: empty, renderItem: ({ item }) => (
        // The cell, and nothing but the cell: `flex: 1` is what divides the
        // row's width between tiles. No ground, no padding, no restyling.
        (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: item })) }, `cols-${resolved}`));
}
//# sourceMappingURL=ProductGridV4.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryTile = CategoryTile;
exports.CategoryGrid = CategoryGrid;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
/**
 * CategoryTile — one browse tile: a soft, color-coded card in its category's
 * tone. A glyph sits in a slightly deeper tint circle over a lighter tinted
 * ground, with the label in `onSurface`. This is the one wellness surface where
 * per-card color is the point — the grid reads as a palette of categories. The
 * tint is `withAlpha(colors[tone], …)`, so every color traces to a token and
 * restyles from the seed, light + dark.
 */
function CategoryTile({ category, onSelect, style }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const tone = colors[category.tone ?? 'primary'];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: category.label, onPress: () => onSelect?.(category), style: ({ pressed }) => [
            {
                flexGrow: 1,
                flexBasis: 0,
                minWidth: 150,
                backgroundColor: (0, color_1.withAlpha)(tone, 0.14),
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                gap: tokens.spacing.md,
                opacity: pressed ? 0.85 : 1,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 44,
                    height: 44,
                    borderRadius: tokens.radius.full,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: (0, color_1.withAlpha)(tone, 0.18),
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xl }, children: category.glyph }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: category.label })] }));
}
/**
 * CategoryGrid — the browse surface: a flex-wrap grid of color-coded
 * {@link CategoryTile}s. Each tile grows to fill its row (`flexGrow:1,
 * flexBasis:0, minWidth:150`), so the grid auto-fits ~2 per row without the
 * RN percentage-plus-gap rounding bug. Color lives on the tiles (each in its
 * category tone); the grid itself is a plain layout. Token-only colors.
 */
function CategoryGrid({ categories, onSelect, style }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "menu", style: [{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.md }, style], children: categories.map((category) => ((0, jsx_runtime_1.jsx)(CategoryTile, { category: category, onSelect: onSelect }, category.id))) }));
}
//# sourceMappingURL=CategoryGrid.js.map
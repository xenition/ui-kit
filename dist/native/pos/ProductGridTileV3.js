"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductGridTileV3 = ProductGridTileV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const internal_1 = require("./internal");
/**
 * ProductGridTile — design variant **V3**: a **compact horizontal list row**.
 * Where V1/V2 are square catalog cards, V3 lays the product out as a dense line
 * — a small square thumbnail, the name, and a right-aligned price — for a
 * scrolling menu or a search-results list rather than a button grid. Missing
 * `imageUrl` falls back to a token-tinted initials plate. `soldOut` dims + flags
 * by word; `selected` tints the row and is announced. Same props as
 * {@link ProductGridTileProps}. Token-only.
 */
function ProductGridTileV3({ name, priceCents, currency = 'USD', imageUrl, seed, tone = 'primary', soldOut = false, selected = false, onPress, onLongPress, variant = 'default', testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const accent = (0, internal_1.toneColor)(colors, tone);
    const plateTint = tokens.ramps.neutral[(0, internal_1.seedRampStep)(seed ?? name)];
    const plate = imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: imageUrl }, accessible: true, accessibilityLabel: name, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: plateTint }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: (0, internal_1.initials)(name) }) }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected, disabled: soldOut }, accessibilityLabel: `${name}${typeof priceCents === 'number' ? `, ${(0, internal_1.formatMoney)(priceCents, currency)}` : ''}${soldOut ? ', sold out' : ''}`, disabled: soldOut, onPress: onPress, onLongPress: onLongPress, testID: testID, style: ({ pressed }) => [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.sm,
                borderRadius: tokens.radius.md,
                borderLeftWidth: selected ? 3 : 0,
                borderLeftColor: selected ? accent : 'transparent',
                backgroundColor: selected ? (0, internal_1.withAlpha)(accent, 0.1) : pressed ? tokens.ramps.neutral[100] ?? colors.surface : 'transparent',
                opacity: soldOut ? 0.5 : 1,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 40, height: 40, borderRadius: tokens.radius.sm, overflow: 'hidden' }, children: plate }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: name }), soldOut ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.danger, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: "Sold out" })) : null] }), typeof priceCents === 'number' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: (0, internal_1.formatMoney)(priceCents, currency) })) : null] }));
}
//# sourceMappingURL=ProductGridTileV3.js.map
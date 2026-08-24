"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductGridTile = ProductGridTile;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const internal_1 = require("./internal");
/**
 * A tappable catalog tile for the register grid. With an `imageUrl` it shows the
 * thumbnail; otherwise a deterministic token-tinted plate with the product's
 * initials (the kit ships no image loader — a missing image never blanks). Price
 * is integer **cents** via `formatMoney`. `soldOut` dims and flags by word (not
 * color alone); `selected` draws an accent ring reflected in
 * `accessibilityState`. Token-only tints via `withAlpha` of a theme ramp.
 */
function ProductGridTile({ name, priceCents, currency = 'USD', imageUrl, seed, tone = 'primary', soldOut = false, selected = false, onPress, onLongPress, variant = 'default', testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const compact = variant === 'compact';
    const accent = (0, internal_1.toneColor)(colors, tone);
    const plateTint = tokens.ramps.neutral[(0, internal_1.seedRampStep)(seed ?? name)];
    const plate = imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: imageUrl }, accessible: true, accessibilityLabel: name, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: plateTint }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '700' }, children: (0, internal_1.initials)(name) }) }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected, disabled: soldOut }, accessibilityLabel: `${name}${typeof priceCents === 'number' ? `, ${(0, internal_1.formatMoney)(priceCents, currency)}` : ''}${soldOut ? ', sold out' : ''}`, disabled: soldOut, onPress: onPress, onLongPress: onLongPress, testID: testID, style: ({ pressed }) => [
            {
                borderRadius: tokens.radius.lg,
                borderWidth: selected ? 2 : 1,
                borderColor: selected ? accent : colors.border,
                backgroundColor: selected ? (0, internal_1.withAlpha)(accent, 0.1) : colors.surface,
                overflow: 'hidden',
                opacity: soldOut ? 0.5 : pressed ? 0.9 : 1,
            },
            style,
        ], children: [!compact ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 72, width: '100%', overflow: 'hidden' }, children: plate })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 4, width: '100%', backgroundColor: accent } })), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { padding: tokens.spacing.sm, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: compact ? 1 : 2, style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: name }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, children: [typeof priceCents === 'number' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: (0, internal_1.formatMoney)(priceCents, currency) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, {})), soldOut ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.danger, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: "Sold out" })) : null] })] })] }));
}
//# sourceMappingURL=ProductGridTile.js.map
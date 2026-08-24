"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductGridTileV2 = ProductGridTileV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const elevation_1 = require("../primitives/internal/elevation");
const internal_1 = require("./internal");
/**
 * ProductGridTile — design variant **V2**: an **elevated tile with a large image
 * and a floating price chip**. Where V1 is a flat bordered card with a short
 * plate, V2 floats on a shadow, gives the image a tall 4:3 area, and overlays a
 * solid **price chip** on the artwork so the price reads before the eye reaches
 * the name. Missing `imageUrl` falls back to a token-tinted initials plate.
 * `soldOut` dims + flags by word; `selected` draws an accent ring. Same props as
 * {@link ProductGridTileProps}. Token-only.
 */
function ProductGridTileV2({ name, priceCents, currency = 'USD', imageUrl, seed, tone = 'primary', soldOut = false, selected = false, onPress, onLongPress, variant = 'default', testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const accent = (0, internal_1.toneColor)(colors, tone);
    const plateTint = tokens.ramps.neutral[(0, internal_1.seedRampStep)(seed ?? name)];
    const plate = imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: imageUrl }, accessible: true, accessibilityLabel: name, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: plateTint }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }, children: (0, internal_1.initials)(name) }) }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected, disabled: soldOut }, accessibilityLabel: `${name}${typeof priceCents === 'number' ? `, ${(0, internal_1.formatMoney)(priceCents, currency)}` : ''}${soldOut ? ', sold out' : ''}`, disabled: soldOut, onPress: onPress, onLongPress: onLongPress, testID: testID, style: ({ pressed }) => [
            {
                borderRadius: tokens.radius.lg,
                borderWidth: selected ? 2 : 0,
                borderColor: selected ? accent : 'transparent',
                backgroundColor: colors.surface,
                overflow: 'hidden',
                opacity: soldOut ? 0.5 : pressed ? 0.92 : 1,
                ...(0, elevation_1.shadow)('md', tokens),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { height: 116, width: '100%', overflow: 'hidden' }, children: [plate, typeof priceCents === 'number' ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            position: 'absolute',
                            left: tokens.spacing.sm,
                            bottom: tokens.spacing.sm,
                            paddingVertical: 2,
                            paddingHorizontal: tokens.spacing.sm,
                            borderRadius: tokens.radius.full,
                            backgroundColor: accent,
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onPrimary, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: (0, internal_1.formatMoney)(priceCents, currency) }) })) : null, soldOut ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            position: 'absolute',
                            right: tokens.spacing.sm,
                            top: tokens.spacing.sm,
                            paddingVertical: 2,
                            paddingHorizontal: tokens.spacing.sm,
                            borderRadius: tokens.radius.full,
                            backgroundColor: (0, internal_1.withAlpha)(colors.danger, 0.9),
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onDanger, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: "Sold out" }) })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { padding: tokens.spacing.sm }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: name }) })] }));
}
//# sourceMappingURL=ProductGridTileV2.js.map
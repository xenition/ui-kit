"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceMenuItemV3 = ServiceMenuItemV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const money_1 = require("../commerce/money");
const CATEGORY_LABEL = {
    hair: 'Hair',
    nails: 'Nails',
    skin: 'Skin',
    massage: 'Massage',
    makeup: 'Makeup',
    brows: 'Brows',
    waxing: 'Waxing',
    spa: 'Spa',
};
/**
 * ServiceMenuItem — design variant **V3**: a **minimal price-list line** in the
 * classic menu idiom — the name on the left, the price on the right, joined by a
 * hairline leader rule (`name ———— price`). No glyph tile, no card chrome, no
 * shadow: duration + description sit under the name as muted meta. `popular` is a
 * small accent marker; `unavailable` dims the row, strikes the price, and blocks
 * the press. Same props as {@link ServiceMenuItemProps}. Token-only colors.
 */
function ServiceMenuItemV3({ name, priceCents, currency = 'USD', category = 'spa', durationMin, description, popular = false, unavailable = false, pricePrefix, formatMoney: format = money_1.formatMoney, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const priceText = `${pricePrefix ? `${pricePrefix} ` : ''}${format(priceCents, currency)}`;
    const interactive = !unavailable && !!onPress;
    const label = CATEGORY_LABEL[category] ?? CATEGORY_LABEL.spa;
    const metaBits = [];
    if (durationMin != null)
        metaBits.push(`${durationMin} min`);
    if (description)
        metaBits.push(description);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: interactive ? 'button' : undefined, accessibilityLabel: `${name}, ${label}${durationMin != null ? `, ${durationMin} minutes` : ''}, ${priceText}${unavailable ? ', unavailable' : ''}`, accessibilityState: { disabled: unavailable }, disabled: !interactive, onPress: interactive ? onPress : undefined, style: ({ pressed }) => [
            {
                paddingVertical: tokens.spacing.sm,
                gap: 2,
                opacity: unavailable ? 0.5 : pressed ? 0.85 : 1,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-end', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600', flexShrink: 1 }, children: name }), popular ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.accent, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: "\u2605 Popular" })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            flex: 1,
                            marginBottom: 4,
                            borderBottomWidth: 1,
                            borderStyle: 'dotted',
                            borderColor: (0, color_1.withAlpha)(colors.muted, 0.4),
                        } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: unavailable ? colors.muted : colors.onSurface,
                            fontSize: tokens.typography.scale.base,
                            fontWeight: '700',
                            textDecorationLine: unavailable ? 'line-through' : 'none',
                        }, children: priceText })] }), metaBits.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: metaBits.join(' · ') })) : null] }));
}
//# sourceMappingURL=ServiceMenuItemV3.js.map
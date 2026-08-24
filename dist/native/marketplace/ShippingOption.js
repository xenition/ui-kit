"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingOption = ShippingOption;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const internal_1 = require("./internal");
/**
 * A selectable shipping/delivery method row — method name, price ("Free" at
 * zero), an ETA line, and a radio indicator. Behaves as one option in a group:
 * `selected` drives an accent ring, a filled radio dot, and the a11y `selected`
 * state (never color alone); `disabled` dims it and blocks selection. Reuses
 * `Icon` and the shared `formatMoney`; token-only colors with a token-derived
 * alpha tint.
 */
function ShippingOption({ label, priceCents, currency = 'USD', eta, glyph, selected = false, disabled = false, onSelect, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const priceText = priceCents === undefined ? undefined : priceCents === 0 ? 'Free' : (0, primitives_1.formatMoney)(priceCents, currency);
    const dot = 20;
    const radio = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            width: dot,
            height: dot,
            borderRadius: dot / 2,
            borderWidth: 2,
            borderColor: selected ? colors.primary : colors.border,
            alignItems: 'center',
            justifyContent: 'center',
        }, children: selected ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: dot / 2, height: dot / 2, borderRadius: dot / 4, backgroundColor: colors.primary } })) : null }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected, disabled }, accessibilityLabel: `${label}${priceText ? `, ${priceText}` : ''}${eta ? `, ${eta}` : ''}`, disabled: disabled || !onSelect, onPress: onSelect, style: ({ pressed }) => [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                borderRadius: tokens.radius.md,
                borderWidth: 1,
                borderColor: selected ? colors.primary : colors.border,
                backgroundColor: selected ? (0, internal_1.withAlpha)(colors.primary, 0.08) : colors.surface,
                paddingVertical: tokens.spacing.md,
                paddingHorizontal: tokens.spacing.lg,
                opacity: disabled ? 0.5 : pressed ? 0.9 : 1,
            },
            style,
        ], children: [radio, glyph ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: glyph, size: "lg", color: selected ? 'primary' : 'muted' }) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: label }), eta ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: eta }) : null] }), priceText ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: priceText })) : null] }));
}
//# sourceMappingURL=ShippingOption.js.map
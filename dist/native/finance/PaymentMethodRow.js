"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMethodRow = PaymentMethodRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const appearance_1 = require("../primitives/internal/appearance");
const motion_1 = require("../primitives/internal/motion");
const KIND_GLYPH = {
    card: '💳',
    bank: '🏦',
    wallet: '👛',
};
/**
 * A selectable payment-method row for a wallet / checkout picker: leading
 * glyph, label with a masked `•• last4` and expiry sub-line, an optional
 * "Default" badge, and a trailing selection check. `selected` draws a `primary`
 * ring; unselected rows use the `border` token. Becomes a radio-style button
 * when `onPress` is supplied. Token-bound throughout.
 */
function PaymentMethodRow({ label, kind = 'card', brand: _brand, last4, expiry, icon, isDefault = false, selected = false, onPress, appearance = 'classic', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const sub = [last4 != null ? `•• ${last4}` : null, expiry != null ? `exp ${expiry}` : null]
        .filter(Boolean)
        .join('  ·  ');
    // Appearance surface FIRST; layout (radius/padding) AFTER. Classic reproduces
    // the historical bordered surface byte-for-byte. In every appearance the
    // `selected` primary ring wins as an overlaid border.
    const surface = appearance === 'classic'
        ? {
            borderWidth: 1,
            borderColor: selected ? colors.primary : colors.border,
            backgroundColor: colors.surface,
        }
        : (0, appearance_1.appearanceStyle)(appearance, colors, tokens);
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            surface,
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                padding: tokens.spacing.md,
                borderRadius: tokens.radius.md,
            },
            selected && appearance !== 'classic' ? { borderWidth: 1, borderColor: colors.primary } : null,
            style,
        ], children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: icon ?? KIND_GLYPH[kind], color: selected ? 'primary' : 'onSurface', size: "xl" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: label }), isDefault ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "success", children: "Default" }) : null] }), sub.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: sub })) : null] }), selected ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2713", color: "primary", size: "lg", accessibilityLabel: "Selected" }) : null] }));
    if (!onPress)
        return body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected }, accessibilityLabel: label, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: body }) }));
}
//# sourceMappingURL=PaymentMethodRow.js.map
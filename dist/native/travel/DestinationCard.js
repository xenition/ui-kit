"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DestinationCard = DestinationCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
/**
 * A destination discovery tile — a token-styled media placeholder (no image
 * dependency) with an overlaid glyph, the place name/country, an optional
 * tagline, a "from" price, and an optional badge ribbon. Data + `onPress`
 * only. Token-only colors.
 */
function DestinationCard({ name, country, tagline, glyph = '🌍', fromCents, currency = 'USD', badge, variant = 'default', onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const wide = variant === 'wide';
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
                overflow: 'hidden',
                width: wide ? '100%' : 220,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: {
                    height: wide ? 120 : 140,
                    backgroundColor: colors.border,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale['3xl'], color: colors.muted }, children: glyph }), badge ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', top: tokens.spacing.sm, left: tokens.spacing.sm }, children: (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "primary", children: badge }) })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { padding: tokens.spacing.md, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: name }), country ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: country })) : null] }), tagline ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: tagline })) : null, typeof fromCents === 'number' ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "from" }), (0, jsx_runtime_1.jsx)(primitives_1.PriceTag, { cents: fromCents, currency: currency, size: "sm" })] })) : null] })] }));
    if (!onPress)
        return body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${name}${country ? `, ${country}` : ''}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: body }));
}
//# sourceMappingURL=DestinationCard.js.map
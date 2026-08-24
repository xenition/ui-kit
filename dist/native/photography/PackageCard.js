"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageCard = PackageCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Card_1 = require("../primitives/Card");
const Button_1 = require("../primitives/Button");
const Badge_1 = require("../primitives/Badge");
const Icon_1 = require("../primitives/Icon");
const PriceTag_1 = require("../commerce/PriceTag");
/**
 * A photography pricing package — name, tagline, a headline {@link PriceTag}
 * with a unit suffix, a checked feature list, and a select CTA. `featured`
 * rings the card in the accent token and shows a "Popular" `Badge` (a labelled
 * marker, not color alone). Falls back to an empty-features line. Composes
 * `Card`, `Badge`, `Button`, `Icon`, `PriceTag`. Token-only colors.
 */
function PackageCard({ name, tagline, priceCents, currency = 'USD', priceSuffix, features, featured = false, featuredLabel = 'Popular', onSelect, ctaLabel = 'Choose package', emptyFeaturesLabel = 'Details coming soon', formatMoney, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const list = features ?? [];
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { variant: featured ? 'elevated' : 'outlined', padding: "lg", style: [
            {
                gap: tokens.spacing.md,
                borderWidth: featured ? 2 : 1,
                borderColor: featured ? colors.accent : colors.border,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: name }), tagline ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: tagline })) : null] }), featured ? ((0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "accent", variant: "soft", children: featuredLabel })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(PriceTag_1.PriceTag, { cents: priceCents, currency: currency, formatMoney: formatMoney, size: "lg" }), priceSuffix ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: priceSuffix })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: list.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyFeaturesLabel })) : (list.map((feature, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u2713", size: "sm", color: "success" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: feature })] }, i)))) }), onSelect ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { variant: featured ? 'primary' : 'outline', onPress: onSelect, children: ctaLabel })) : null] }));
}
//# sourceMappingURL=PackageCard.js.map
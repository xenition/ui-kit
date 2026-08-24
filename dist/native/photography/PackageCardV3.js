"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageCardV3 = PackageCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Badge_1 = require("../primitives/Badge");
const Icon_1 = require("../primitives/Icon");
const PriceTag_1 = require("../commerce/PriceTag");
/**
 * PackageCard — design variant **V3**: a **minimal price line**. Name + tagline
 * on the left, the price hugging the right on a single hairline-separated row,
 * with the feature list collapsed to a muted count and the whole row tappable to
 * select — a lightweight list entry for a stacked package menu, not a pricing
 * card. Featured still shows a labelled `Badge`. Same props as
 * {@link PackageCardProps}; token-only, empty-features safe.
 */
function PackageCardV3({ name, tagline, priceCents, currency = 'USD', priceSuffix, features, featured = false, featuredLabel = 'Popular', onSelect, emptyFeaturesLabel = 'Details coming soon', formatMoney, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const list = features ?? [];
    const featureLine = list.length === 0 ? emptyFeaturesLabel : `${list.length} included`;
    const containerStyle = [
        {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            paddingVertical: tokens.spacing.sm,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
        },
        style,
    ];
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: name }), featured ? ((0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "accent", variant: "soft", size: "sm", children: featuredLabel })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: tagline ? `${tagline} · ${featureLine}` : featureLine })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end' }, children: [(0, jsx_runtime_1.jsx)(PriceTag_1.PriceTag, { cents: priceCents, currency: currency, formatMoney: formatMoney, size: "md" }), priceSuffix ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: priceSuffix })) : null] }), onSelect ? (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u203A", size: "lg", color: "muted" }) : null] }));
    if (onSelect) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, onPress: onSelect, style: ({ pressed }) => [containerStyle, { opacity: pressed ? 0.9 : 1 }], children: inner }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: containerStyle, children: inner });
}
//# sourceMappingURL=PackageCardV3.js.map
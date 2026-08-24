"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageCardV2 = PackageCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Card_1 = require("../primitives/Card");
const Button_1 = require("../primitives/Button");
const Icon_1 = require("../primitives/Icon");
const PriceTag_1 = require("../commerce/PriceTag");
const elevation_1 = require("../primitives/internal/elevation");
/**
 * PackageCard — design variant **V2**: an **elevated pricing card** with a
 * corner **ribbon**. Featured packages float on an `xl` shadow, an accent ribbon
 * band runs across the top-right corner, and a big centred price sits above a
 * checked feature list and a full-width CTA — the "recommended tier" look of a
 * pricing table. Featured state carries the labelled ribbon, not colour alone.
 * Same props as {@link PackageCardProps}; token-only, empty-features fallback.
 */
function PackageCardV2({ name, tagline, priceCents, currency = 'USD', priceSuffix, features, featured = false, featuredLabel = 'Popular', onSelect, ctaLabel = 'Choose package', emptyFeaturesLabel = 'Details coming soon', formatMoney, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const list = features ?? [];
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { variant: "flat", padding: "lg", radius: "lg", style: [
            {
                overflow: 'hidden',
                gap: tokens.spacing.md,
                borderWidth: featured ? 2 : 0,
                borderColor: featured ? colors.accent : 'transparent',
                ...(0, elevation_1.shadow)(featured ? 'xl' : 'md', tokens),
            },
            style,
        ], children: [featured ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: featuredLabel, style: {
                    position: 'absolute',
                    top: tokens.spacing.md,
                    right: -tokens.spacing.xl,
                    transform: [{ rotate: '45deg' }],
                    backgroundColor: colors.accent,
                    paddingHorizontal: tokens.spacing.xl,
                    paddingVertical: 2,
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                        color: colors.onAccent,
                        fontSize: tokens.typography.scale.xs,
                        fontWeight: '700',
                    }, children: featuredLabel }) })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2, alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700', textAlign: 'center' }, children: name }), tagline ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, textAlign: 'center' }, children: tagline })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(PriceTag_1.PriceTag, { cents: priceCents, currency: currency, formatMoney: formatMoney, size: "lg" }), priceSuffix ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: priceSuffix })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    gap: tokens.spacing.sm,
                    borderTopWidth: 1,
                    borderTopColor: colors.border,
                    paddingTop: tokens.spacing.md,
                }, children: list.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, textAlign: 'center' }, children: emptyFeaturesLabel })) : (list.map((feature, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u2713", size: "sm", color: "success" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: feature })] }, i)))) }), onSelect ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { variant: featured ? 'primary' : 'elevated', onPress: onSelect, children: ctaLabel })) : null] }));
}
//# sourceMappingURL=PackageCardV2.js.map
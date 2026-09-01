"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageCardV4 = PackageCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Badge_1 = require("../primitives/Badge");
const Button_1 = require("../primitives/Button");
const Icon_1 = require("../primitives/Icon");
const PriceTag_1 = require("../commerce/PriceTag");
/**
 * PackageCard — **V4** "studio" design. The clean, price-forward take on a
 * pricing package: an elevated surface card (no gradient — pricing stays a crisp,
 * legible surface) whose headline is the big, bold {@link PriceTag} (`size="lg"`),
 * the package name set bold above it with a muted tagline, and the inclusions
 * listed with a ✓ glyph. A `featured` ("popular") package earns a labelled
 * soft-primary chip **and** a primary ring — a marker, never color alone.
 * Identical props/behavior to {@link PackageCardProps}: honors `formatMoney`,
 * `priceSuffix`, `features`/`emptyFeaturesLabel`, and renders the `onSelect` CTA
 * when provided. Token-only colors via `useXenitionTheme()`; 8-pt spacing.
 */
function PackageCardV4({ name, tagline, priceCents, currency = 'USD', priceSuffix, features, featured = false, featuredLabel = 'Popular', onSelect, ctaLabel = 'Choose package', emptyFeaturesLabel = 'Details coming soon', formatMoney, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const list = features ?? [];
    const containerStyle = [
        {
            gap: tokens.spacing.md,
            borderRadius: tokens.radius.lg,
            borderWidth: featured ? 2 : 1,
            borderColor: featured ? colors.primary : colors.border,
            backgroundColor: colors.card,
            padding: tokens.spacing.lg,
            shadowColor: colors.onSurface,
            shadowOpacity: 0.08,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 6 },
            elevation: 3,
        },
        style,
    ];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: containerStyle, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: name }), tagline ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: tagline })) : null] }), featured ? ((0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "primary", variant: "soft", size: "sm", children: featuredLabel })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(PriceTag_1.PriceTag, { cents: priceCents, currency: currency, formatMoney: formatMoney, size: "lg" }), priceSuffix ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: priceSuffix })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: list.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyFeaturesLabel })) : (list.map((feature, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u2713", size: "sm", color: "success" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: feature })] }, i)))) }), onSelect ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { variant: featured ? 'primary' : 'outline', onPress: onSelect, children: ctaLabel })) : null] }));
}
//# sourceMappingURL=PackageCardV4.js.map
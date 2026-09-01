"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricePackageRowV4 = PricePackageRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Badge_1 = require("../primitives/Badge");
const Icon_1 = require("../primitives/Icon");
const PriceTag_1 = require("../commerce/PriceTag");
/**
 * PricePackageRow — **V4** "studio" design. The clean à-la-carte price line: an
 * elevated surface row (no gradient — pricing stays a crisp, legible surface)
 * with the label set semibold, a muted detail line, and the {@link PriceTag}
 * right-aligned. A `highlighted` row keeps the clean surface but earns a primary
 * ring, a leading ✓ glyph, and a labelled soft-primary chip (`badgeLabel`) — a
 * marker, never color alone. Identical props/behavior to
 * {@link PricePackageRowProps}: honors `formatMoney` and `unitSuffix`; optional
 * `onPress` exposes it as a `button` (≥44px target) for quote building.
 * Token-only colors via `useXenitionTheme()`; 8-pt spacing.
 */
function PricePackageRowV4({ label, description, priceCents, currency = 'USD', unitSuffix, highlighted = false, badgeLabel, onPress, formatMoney, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const rowStyle = [
        {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: tokens.spacing.sm,
            minHeight: 44,
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.md,
            borderRadius: tokens.radius.lg,
            borderWidth: highlighted ? 2 : 1,
            borderColor: highlighted ? colors.primary : colors.border,
            backgroundColor: colors.card,
            shadowColor: colors.onSurface,
            shadowOpacity: 0.08,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 6 },
            elevation: 3,
        },
        style,
    ];
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flexWrap: 'wrap' }, children: [highlighted ? (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u2713", size: "sm", color: "primary" }) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: label }), highlighted && badgeLabel ? ((0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "primary", variant: "soft", size: "sm", children: badgeLabel })) : null] }), description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: description })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(PriceTag_1.PriceTag, { cents: priceCents, currency: currency, formatMoney: formatMoney, size: "sm" }), unitSuffix ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: unitSuffix })) : null] })] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, onPress: onPress, style: ({ pressed }) => [rowStyle, { opacity: pressed ? 0.9 : 1 }], children: inner }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: rowStyle, children: inner });
}
//# sourceMappingURL=PricePackageRowV4.js.map
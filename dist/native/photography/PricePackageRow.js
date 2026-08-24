"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricePackageRow = PricePackageRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Badge_1 = require("../primitives/Badge");
const PriceTag_1 = require("../commerce/PriceTag");
/** Token-derived translucent tint (no literal hex). */
function withAlpha(hex, alpha) {
    const h = hex.replace('#', '');
    const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
    const r = parseInt(full.slice(0, 2), 16);
    const g = parseInt(full.slice(2, 4), 16);
    const b = parseInt(full.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
/**
 * A compact à-la-carte price line — label, optional detail, and a right-aligned
 * {@link PriceTag} with a unit suffix. `highlighted` gives the row an accent
 * tint and shows an optional `badgeLabel` (a labelled marker, not color alone).
 * Optional `onPress` exposes it as a `button` for quote building. Composes
 * `Badge` and `PriceTag`. Token-only colors.
 */
function PricePackageRow({ label, description, priceCents, currency = 'USD', unitSuffix, highlighted = false, badgeLabel, onPress, formatMoney, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const rowStyle = [
        {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: tokens.spacing.sm,
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.md,
            borderRadius: tokens.radius.md,
            borderWidth: 1,
            borderColor: highlighted ? colors.accent : colors.border,
            backgroundColor: highlighted ? withAlpha(colors.accent, 0.1) : colors.surface,
        },
        style,
    ];
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: label }), highlighted && badgeLabel ? ((0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "accent", variant: "soft", size: "sm", children: badgeLabel })) : null] }), description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: description })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(PriceTag_1.PriceTag, { cents: priceCents, currency: currency, formatMoney: formatMoney, size: "sm" }), unitSuffix ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: unitSuffix })) : null] })] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, onPress: onPress, style: ({ pressed }) => [rowStyle, { opacity: pressed ? 0.9 : 1 }], children: inner }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: rowStyle, children: inner });
}
//# sourceMappingURL=PricePackageRow.js.map
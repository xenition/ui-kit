"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrintOrderRow = PrintOrderRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Badge_1 = require("../primitives/Badge");
const PriceTag_1 = require("../commerce/PriceTag");
const STATUS = {
    pending: { label: 'Pending', tone: 'neutral' },
    printing: { label: 'Printing', tone: 'warn' },
    shipped: { label: 'Shipped', tone: 'primary' },
    delivered: { label: 'Delivered', tone: 'success' },
};
/**
 * A single print-order line — product, size/finish/quantity meta, a status
 * `Badge`, and a line total ({@link PriceTag} of `unitPriceCents × quantity`).
 * Quantity is clamped to at least 1 so the total is always guarded. Status is a
 * labelled badge (not color alone). Optional `onPress` exposes the row as a
 * `button`. Token-only colors.
 */
function PrintOrderRow({ product, size, finish, quantity = 1, unitPriceCents, currency = 'USD', status = 'pending', onPress, formatMoney, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const qty = Math.max(1, Math.floor(quantity));
    const meta = STATUS[status];
    const metaBits = [];
    if (size)
        metaBits.push(size);
    if (finish)
        metaBits.push(finish);
    metaBits.push(`×${qty}`);
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
            borderColor: colors.border,
            backgroundColor: colors.surface,
        },
        style,
    ];
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: product }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: metaBits.join(' · ') })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(PriceTag_1.PriceTag, { cents: unitPriceCents * qty, currency: currency, formatMoney: formatMoney, size: "sm" }), (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: meta.label })] })] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${product}, ${qty}, ${meta.label}`, onPress: onPress, style: ({ pressed }) => [rowStyle, { opacity: pressed ? 0.9 : 1 }], children: inner }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: rowStyle, children: inner });
}
//# sourceMappingURL=PrintOrderRow.js.map
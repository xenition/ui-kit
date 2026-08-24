"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSummary = OrderSummary;
exports.CheckoutSummary = OrderSummary;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const StatusBadge_1 = require("./StatusBadge");
const money_1 = require("./money");
/**
 * Read-only recap of a placed (or about-to-be-placed) order — the native
 * mirror of the web `OrderSummary` / `CheckoutSummary`: line items with
 * per-line totals, the subtotal/shipping/tax/total rows, and an optional status
 * badge. No interactivity. Token-only; money is integer cents throughout.
 */
function OrderSummary({ items, subtotalCents, shippingCents, taxCents, totalCents, currency = 'USD', status, orderNumber, title = 'Order summary', formatMoney: format = money_1.formatMoney, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const Row = ({ label, value }) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: value })] }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                gap: tokens.spacing.md,
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
                padding: tokens.spacing.lg,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [typeof title === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: title })) : (title), orderNumber ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["#", orderNumber] })) : null] }), status ? (0, jsx_runtime_1.jsx)(StatusBadge_1.StatusBadge, { status: status }) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { children: items.map((item, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        gap: tokens.spacing.md,
                        paddingVertical: tokens.spacing.sm,
                        borderTopWidth: i === 0 ? 0 : 1,
                        borderTopColor: colors.border,
                    }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: item.title }), item.variantTitle ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: item.variantTitle })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["Qty ", item.quantity] })] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: format(item.unitPriceCents * item.quantity, currency) })] }, i))) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs, borderTopWidth: 1, borderTopColor: colors.border, paddingTop: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(Row, { label: "Subtotal", value: format(subtotalCents, currency) }), typeof shippingCents === 'number' ? ((0, jsx_runtime_1.jsx)(Row, { label: "Shipping", value: shippingCents === 0 ? 'Free' : format(shippingCents, currency) })) : null, typeof taxCents === 'number' ? (0, jsx_runtime_1.jsx)(Row, { label: "Tax", value: format(taxCents, currency) }) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: "Total" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: format(totalCents, currency) })] })] })] }));
}
//# sourceMappingURL=OrderSummary.js.map
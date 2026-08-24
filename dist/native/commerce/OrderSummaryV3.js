"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSummaryV3 = OrderSummaryV3;
exports.CheckoutSummaryV3 = OrderSummaryV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const StatusBadge_1 = require("./StatusBadge");
const money_1 = require("./money");
/**
 * OrderSummary — design variant **V3**: **minimal and total-first**. Where V1/V2
 * lead with a header and itemized rows, V3 opens with the grand total set large
 * (status badge + order number tucked alongside as metadata), then lists the
 * line items and subtotal/shipping/tax beneath as muted fine print. No box, no
 * shadow. Same props as {@link OrderSummaryProps}. Read-only; token-only; cents.
 */
function OrderSummaryV3({ items, subtotalCents, shippingCents, taxCents, totalCents, currency = 'USD', status, orderNumber, title = 'Order summary', formatMoney: format = money_1.formatMoney, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const Line = ({ label, value }) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: value })] }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.md }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [status ? (0, jsx_runtime_1.jsx)(StatusBadge_1.StatusBadge, { status: status }) : null, orderNumber ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["#", orderNumber] })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '700' }, children: format(totalCents, currency) }), typeof title === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, letterSpacing: 1, fontWeight: '600' }, children: title.toUpperCase() })) : (title)] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: items.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "No items" })) : (items.map((item, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, minWidth: 0, color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [item.title, item.variantTitle ? ` · ${item.variantTitle}` : '', " \u00D7", item.quantity] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: format(item.unitPriceCents * item.quantity, currency) })] }, i)))) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs, borderTopWidth: 1, borderTopColor: colors.border, paddingTop: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(Line, { label: "Subtotal", value: format(subtotalCents, currency) }), typeof shippingCents === 'number' ? ((0, jsx_runtime_1.jsx)(Line, { label: "Shipping", value: shippingCents === 0 ? 'Free' : format(shippingCents, currency) })) : null, typeof taxCents === 'number' ? (0, jsx_runtime_1.jsx)(Line, { label: "Tax", value: format(taxCents, currency) }) : null] })] }));
}
//# sourceMappingURL=OrderSummaryV3.js.map
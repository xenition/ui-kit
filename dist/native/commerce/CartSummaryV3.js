"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartSummaryV3 = CartSummaryV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Button_1 = require("../primitives/Button");
const money_1 = require("./money");
/**
 * CartSummary — design variant **V3**: **minimal and total-first**. Where V1/V2
 * build up subtotal → … → total, V3 leads with the grand total set large under
 * a small caption, then lists the muted breakdown lines beneath it as fine
 * print. No box, no shadow — just type hierarchy and a full-width checkout.
 * Same props as {@link CartSummaryProps}. Token-only; money is integer cents.
 */
function CartSummaryV3({ subtotalCents, shippingCents, taxCents, discountCents, totalCents, currency = 'USD', onCheckout, checkoutLabel = 'Checkout', formatMoney: format = money_1.formatMoney, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const Line = ({ label, value }) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: value })] }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.md }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, letterSpacing: 1, fontWeight: '600' }, children: "TOTAL" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '700' }, children: format(totalCents, currency) })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(Line, { label: "Subtotal", value: format(subtotalCents, currency) }), typeof shippingCents === 'number' ? ((0, jsx_runtime_1.jsx)(Line, { label: "Shipping", value: shippingCents === 0 ? 'Free' : format(shippingCents, currency) })) : null, typeof taxCents === 'number' ? (0, jsx_runtime_1.jsx)(Line, { label: "Tax", value: format(taxCents, currency) }) : null, typeof discountCents === 'number' && discountCents > 0 ? ((0, jsx_runtime_1.jsx)(Line, { label: "Discount", value: `−${format(discountCents, currency)}` })) : null] }), onCheckout ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "lg", onPress: onCheckout, style: { alignSelf: 'stretch' }, children: checkoutLabel })) : null] }));
}
//# sourceMappingURL=CartSummaryV3.js.map
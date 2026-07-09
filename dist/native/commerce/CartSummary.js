"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartSummary = CartSummary;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Button_1 = require("../primitives/Button");
const money_1 = require("./money");
/**
 * Cart totals block — the native mirror of the web `CartSummary`: subtotal /
 * shipping / tax / (discount) / total rows plus an optional checkout button.
 * Every amount is integer cents formatted through {@link formatMoney}. Token-only.
 */
function CartSummary({ subtotalCents, shippingCents, taxCents, discountCents, totalCents, currency = 'USD', onCheckout, checkoutLabel = 'Checkout', formatMoney: format = money_1.formatMoney, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const Row = ({ label, value }) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: value })] }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                gap: tokens.spacing.sm,
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
                padding: tokens.spacing.lg,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(Row, { label: "Subtotal", value: format(subtotalCents, currency) }), typeof shippingCents === 'number' ? ((0, jsx_runtime_1.jsx)(Row, { label: "Shipping", value: shippingCents === 0 ? 'Free' : format(shippingCents, currency) })) : null, typeof taxCents === 'number' ? (0, jsx_runtime_1.jsx)(Row, { label: "Tax", value: format(taxCents, currency) }) : null, typeof discountCents === 'number' && discountCents > 0 ? ((0, jsx_runtime_1.jsx)(Row, { label: "Discount", value: `−${format(discountCents, currency)}` })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    marginTop: tokens.spacing.xs,
                    borderTopWidth: 1,
                    borderTopColor: colors.border,
                    paddingTop: tokens.spacing.sm,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: "Total" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: format(totalCents, currency) })] }), onCheckout ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "md", onPress: onCheckout, style: { marginTop: tokens.spacing.sm }, children: checkoutLabel })) : null] }));
}
//# sourceMappingURL=CartSummary.js.map
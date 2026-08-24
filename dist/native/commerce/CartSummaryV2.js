"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartSummaryV2 = CartSummaryV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Button_1 = require("../primitives/Button");
const money_1 = require("./money");
const elevation_1 = require("../primitives/internal/elevation");
const color_1 = require("../primitives/internal/color");
/**
 * CartSummary — design variant **V2**: an **elevated receipt** with a
 * highlighted total band. Where V1 is a flat bordered list, V2 floats on a
 * drop-shadow, separates the running lines from the total with a **dashed
 * perforation**, and drops the grand total into a primary-tinted band so the
 * amount owed is unmistakable. Same props as {@link CartSummaryProps}.
 * Token-only; money is integer cents.
 */
function CartSummaryV2({ subtotalCents, shippingCents, taxCents, discountCents, totalCents, currency = 'USD', onCheckout, checkoutLabel = 'Checkout', formatMoney: format = money_1.formatMoney, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const Row = ({ label, value, valueColor, }) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: valueColor ?? colors.onSurface, fontSize: tokens.typography.scale.sm }, children: value })] }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                borderRadius: tokens.radius.lg,
                backgroundColor: colors.surface,
                padding: tokens.spacing.lg,
                gap: tokens.spacing.sm,
                ...(0, elevation_1.shadow)('lg', tokens),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(Row, { label: "Subtotal", value: format(subtotalCents, currency) }), typeof shippingCents === 'number' ? ((0, jsx_runtime_1.jsx)(Row, { label: "Shipping", value: shippingCents === 0 ? 'Free' : format(shippingCents, currency) })) : null, typeof taxCents === 'number' ? (0, jsx_runtime_1.jsx)(Row, { label: "Tax", value: format(taxCents, currency) }) : null, typeof discountCents === 'number' && discountCents > 0 ? ((0, jsx_runtime_1.jsx)(Row, { label: "Discount", value: `−${format(discountCents, currency)}`, valueColor: colors.successText })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    marginVertical: tokens.spacing.xs,
                    borderTopWidth: 1,
                    borderStyle: 'dashed',
                    borderTopColor: colors.border,
                } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderRadius: tokens.radius.md,
                    backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.08),
                    paddingVertical: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.md,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: "Total" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primaryText, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: format(totalCents, currency) })] }), onCheckout ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "md", onPress: onCheckout, style: { marginTop: tokens.spacing.xs }, children: checkoutLabel })) : null] }));
}
//# sourceMappingURL=CartSummaryV2.js.map
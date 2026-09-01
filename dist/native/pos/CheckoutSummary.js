"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutSummary = CheckoutSummary;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const internal_1 = require("./internal");
/**
 * CheckoutSummary — **V4** "register" design. The tactile close-of-sale panel:
 * a compact **breakdown list** (subtotal, optional discount/tax/tip) in calm
 * `tabular-nums`, a hairline, then the **grand total big and bold** — the
 * number the counter is built around. A full-width primary **Charge** button
 * (≥44px) repeats the total so the tap target reads the amount. Money is
 * integer **cents** throughout via `formatMoney`; token-only colors via
 * `useXenitionTheme()`, dark-mode safe.
 */
function CheckoutSummary({ subtotalCents, taxCents, discountCents, tipCents, totalCents, currency = 'USD', itemCount, onCharge, chargeLabel, charging = false, testID, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const rows = [{ key: 'subtotal', label: 'Subtotal', amountCents: subtotalCents }];
    if (typeof discountCents === 'number' && discountCents > 0) {
        rows.push({ key: 'discount', label: 'Discount', amountCents: discountCents, negative: true });
    }
    if (typeof taxCents === 'number') {
        rows.push({ key: 'tax', label: 'Tax', amountCents: taxCents });
    }
    if (typeof tipCents === 'number' && tipCents > 0) {
        rows.push({ key: 'tip', label: 'Tip', amountCents: tipCents });
    }
    const formattedTotal = (0, internal_1.formatMoney)(totalCents, currency);
    const label = chargeLabel ? chargeLabel(formattedTotal) : `Charge ${formattedTotal}`;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: testID, style: {
            gap: tokens.spacing.md,
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.card,
            padding: tokens.spacing.lg,
        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "list", accessibilityLabel: "Order breakdown", style: { gap: tokens.spacing.xs }, children: rows.map((row) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: `${row.label}, ${row.negative ? 'minus ' : ''}${(0, internal_1.formatMoney)(row.amountCents, currency)}`, style: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: row.label }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: {
                                color: row.negative ? colors.success : colors.onSurface,
                                fontSize: tokens.typography.scale.sm,
                                fontVariant: ['tabular-nums'],
                            }, children: [row.negative ? '−' : '', (0, internal_1.formatMoney)(row.amountCents, currency)] })] }, row.key))) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 1, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    color: colors.onSurface,
                                    fontSize: tokens.typography.scale.base,
                                    fontWeight: '800',
                                    textTransform: 'uppercase',
                                    letterSpacing: 0.5,
                                }, children: "Total" }), typeof itemCount === 'number' ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '500' }, children: [itemCount, " item", itemCount === 1 ? '' : 's'] })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: {
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale['3xl'],
                            fontWeight: '800',
                            fontVariant: ['tabular-nums'],
                        }, children: formattedTotal })] }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "lg", onPress: onCharge, disabled: charging, loading: charging, accessibilityLabel: label, style: { minHeight: 44, width: '100%' }, children: charging ? 'Charging…' : label })] }));
}
//# sourceMappingURL=CheckoutSummary.js.map
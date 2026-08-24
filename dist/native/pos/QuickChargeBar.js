"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuickChargeBar = QuickChargeBar;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Button_1 = require("../primitives/Button");
const internal_1 = require("./internal");
/**
 * The register's charge affordance — a sticky footer showing the running total
 * (integer **cents** via `formatMoney`) and item count beside a primary Charge
 * button. An empty cart (`itemCount === 0`) disables charging and swaps the
 * total for an `emptyLabel` hint, so the empty state is conveyed by text and the
 * button's `accessibilityState.disabled`, never color alone. `loading` shows the
 * `Button` spinner. Composed from the `Button` primitive; token-only colors.
 */
function QuickChargeBar({ totalCents, currency = 'USD', itemCount, onCharge, chargeLabel = 'Charge', loading = false, disabled = false, emptyLabel = 'Cart empty', secondaryAction, variant = 'bar', testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const isEmpty = itemCount === 0;
    const canCharge = !disabled && !isEmpty && !loading;
    const total = (0, internal_1.safeCents)(totalCents);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: testID, style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                padding: variant === 'bar' ? tokens.spacing.md : 0,
                borderTopWidth: variant === 'bar' ? 1 : 0,
                borderTopColor: colors.border,
                backgroundColor: variant === 'bar' ? colors.surface : 'transparent',
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: isEmpty ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: emptyLabel })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '700' }, children: (0, internal_1.formatMoney)(total, currency) }), typeof itemCount === 'number' ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [itemCount, " item", itemCount === 1 ? '' : 's'] })) : null] })) }), secondaryAction ? (0, jsx_runtime_1.jsx)(react_native_1.View, { children: secondaryAction }) : null, (0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "primary", size: "lg", onPress: onCharge, disabled: !canCharge, loading: loading, children: isEmpty ? chargeLabel : `${chargeLabel} ${(0, internal_1.formatMoney)(total, currency)}` })] }));
}
//# sourceMappingURL=QuickChargeBar.js.map
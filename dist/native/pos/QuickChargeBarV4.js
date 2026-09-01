"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuickChargeBarV4 = QuickChargeBarV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const internal_1 = require("./internal");
const register_1 = require("./internal/register");
const GradientSurface_1 = require("./internal/GradientSurface");
/**
 * QuickChargeBar — **V4** "register" design. The checkout peak: the running
 * **total is big and bold** (integer **cents** via `formatMoney`) on the crisp
 * bar, and the large (≥44px) **Charge** button sits on the brand gradient
 * (`registerGradient`) with the total repeated in near-white `registerInk` — the
 * moment the counter is built around. An empty cart (`itemCount === 0`) disables
 * charging and swaps the total for the `emptyLabel` hint, so the empty state
 * reads by text + the button's `accessibilityState.disabled`, never color alone.
 * `loading` shows a spinner and blocks the charge. Same props/behavior as
 * {@link QuickChargeBarProps}; token-only colors (bar surface via
 * `useXenitionTheme()`, gradient via `GradientSurface`).
 */
function QuickChargeBarV4({ totalCents, currency = 'USD', itemCount, onCharge, chargeLabel = 'Charge', loading = false, disabled = false, emptyLabel = 'Cart empty', secondaryAction, variant = 'bar', testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const isEmpty = itemCount === 0;
    const canCharge = !disabled && !isEmpty && !loading;
    const total = (0, internal_1.safeCents)(totalCents);
    const ink = (0, register_1.registerInk)(tokens.ramps);
    const gradient = (0, register_1.registerGradient)(tokens.ramps);
    const chargeText = isEmpty ? chargeLabel : `${chargeLabel} ${(0, internal_1.formatMoney)(total, currency)}`;
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
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: isEmpty ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: emptyLabel })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }, children: (0, internal_1.formatMoney)(total, currency) }), typeof itemCount === 'number' ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '500' }, children: [itemCount, " item", itemCount === 1 ? '' : 's'] })) : null] })) }), secondaryAction ? (0, jsx_runtime_1.jsx)(react_native_1.View, { children: secondaryAction }) : null, (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { disabled: !canCharge }, accessibilityLabel: chargeText, disabled: !canCharge, onPress: onCharge, style: ({ pressed }) => ({
                    borderRadius: tokens.radius.lg,
                    overflow: 'hidden',
                    opacity: canCharge ? (pressed ? 0.92 : 1) : 0.5,
                    ...(canCharge
                        ? { shadowColor: gradient[gradient.length - 1], shadowOpacity: 0.24, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 3 }
                        : {}),
                }), children: (0, jsx_runtime_1.jsxs)(GradientSurface_1.GradientSurface, { colors: gradient, style: {
                        minHeight: 44,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: tokens.spacing.xs,
                        paddingHorizontal: tokens.spacing.lg,
                        paddingVertical: tokens.spacing.sm,
                    }, children: [loading ? (0, jsx_runtime_1.jsx)(react_native_1.ActivityIndicator, { size: "small", color: ink }) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: ink, fontSize: tokens.typography.scale.base, fontWeight: '800' }, children: chargeText })] }) })] }));
}
//# sourceMappingURL=QuickChargeBarV4.js.map
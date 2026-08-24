"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartBar = CartBar;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const commerce_1 = require("../commerce");
/**
 * A sticky bottom cart summary bar — item count, running total, and a primary
 * action. When `itemCount` is 0 it collapses to a muted, non-interactive empty
 * state; `loading` disables the press and shows a busy label. The bar uses the
 * `primary`/`accent` token pair for the filled action, so its text always meets
 * the contrast-guaranteed `on-*` slot. Token-only.
 */
function CartBar({ itemCount, totalCents, currency = 'USD', label = 'View cart', onPress, variant = 'primary', loading = false, emptyLabel = 'Your cart is empty', formatMoney = commerce_1.formatMoney, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const empty = itemCount <= 0;
    const bg = variant === 'accent' ? colors.accent : colors.primary;
    const fg = variant === 'accent' ? colors.onAccent : colors.onPrimary;
    const disabled = empty || loading;
    const content = empty ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, textAlign: 'center' }, children: emptyLabel })) : ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            minWidth: 24,
                            paddingHorizontal: tokens.spacing.xs,
                            height: 24,
                            borderRadius: tokens.radius.full,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: fg,
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: bg, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: itemCount }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: fg, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: loading ? 'Updating…' : label })] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: fg, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: formatMoney(totalCents, currency) })] }));
    const barStyle = [
        {
            borderRadius: tokens.radius.lg,
            paddingVertical: tokens.spacing.md,
            paddingHorizontal: tokens.spacing.lg,
            backgroundColor: empty ? colors.surface : bg,
            borderWidth: empty ? 1 : 0,
            borderColor: colors.border,
        },
        style,
    ];
    if (empty || !onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "summary", style: barStyle, children: content }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${label}, ${itemCount} items, ${formatMoney(totalCents, currency)}`, accessibilityState: { disabled, busy: loading }, disabled: disabled, onPress: onPress, style: ({ pressed }) => [barStyle, { opacity: pressed ? 0.9 : 1 }], children: content }));
}
//# sourceMappingURL=CartBar.js.map
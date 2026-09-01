"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SplitBillRowV4 = SplitBillRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const internal_1 = require("./internal");
/**
 * SplitBillRow — **V4** "register" design. The tactile checkout take on a
 * split-bill row: a guest/share label with its item count, this party's **share
 * drawn big and bold** in `tabular-nums`, and a clear **paid/unpaid** state —
 * settled parties get a soft-success glow with a `✓ Paid` flag (word, not color
 * alone) and a large (≥44px) check control; unpaid parties get a primary "Pay"
 * settle affordance (≥44px). `selected` draws an accent ring reflected in
 * `accessibilityState`. Same props/behavior as {@link SplitBillRowProps};
 * token-only tints via `useXenitionTheme()` + `withAlpha`. Dark-mode safe.
 */
function SplitBillRowV4({ label, amountCents, currency = 'USD', itemCount, paid = false, selected = false, paidCents, onPress, onTogglePaid, variant = 'even', testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const amount = (0, internal_1.safeCents)(amountCents);
    const settled = paid || (typeof paidCents === 'number' && (0, internal_1.safeCents)(paidCents) >= amount && amount > 0);
    const remaining = typeof paidCents === 'number' ? Math.max(0, amount - (0, internal_1.safeCents)(paidCents)) : amount;
    const content = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
                borderRadius: tokens.radius.lg,
                borderWidth: 2,
                borderColor: selected ? colors.primary : settled ? 'transparent' : colors.border,
                backgroundColor: selected
                    ? (0, internal_1.withAlpha)(colors.primary, 0.1)
                    : settled
                        ? (0, internal_1.withAlpha)(colors.success, 0.12)
                        : colors.surface,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: label }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [variant === 'custom' ? 'Custom' : 'Even split', typeof itemCount === 'number' && itemCount > 0 ? ` · ${itemCount} item${itemCount === 1 ? '' : 's'}` : ''] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '800' }, children: (0, internal_1.formatMoney)(amount, currency) }), settled ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.success, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: "\u2713 Paid" })) : typeof paidCents === 'number' && (0, internal_1.safeCents)(paidCents) > 0 ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.warn, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: [(0, internal_1.formatMoney)(remaining, currency), " left"] })) : null] }), onTogglePaid ? (settled ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected: true }, accessibilityLabel: `Mark ${label} unpaid`, onPress: onTogglePaid, hitSlop: 8, style: {
                    width: 44,
                    height: 44,
                    borderRadius: tokens.radius.full,
                    borderWidth: 2,
                    borderColor: colors.success,
                    backgroundColor: colors.success,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors.onSuccess, fontSize: tokens.typography.scale.base, fontWeight: '800' }, children: "\u2713" }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected: false }, accessibilityLabel: `Mark ${label} paid`, onPress: onTogglePaid, hitSlop: 8, style: ({ pressed }) => ({
                    minWidth: 44,
                    height: 44,
                    paddingHorizontal: tokens.spacing.md,
                    borderRadius: tokens.radius.full,
                    backgroundColor: colors.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: pressed ? 0.9 : 1,
                }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors.onPrimary, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: "Pay" }) }))) : null] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected }, accessibilityLabel: `${label}, ${(0, internal_1.formatMoney)(amount, currency)}${settled ? ', paid' : ''}`, onPress: onPress, testID: testID, children: content }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, children: content });
}
//# sourceMappingURL=SplitBillRowV4.js.map
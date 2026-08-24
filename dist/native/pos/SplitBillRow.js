"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SplitBillRow = SplitBillRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const internal_1 = require("./internal");
/**
 * One party's slice when a bill is split — label, item count, this party's
 * amount (integer **cents** via `formatMoney`), a remaining/paid indicator, and
 * a settle toggle. `paid` is conveyed by a **glyph + word** flag, never color
 * alone; `selected` draws an accent ring reflected in `accessibilityState`.
 * Token-only: accent fill via a token-tinted `withAlpha`.
 */
function SplitBillRow({ label, amountCents, currency = 'USD', itemCount, paid = false, selected = false, paidCents, onPress, onTogglePaid, variant = 'even', testID, style, }) {
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
                borderRadius: tokens.radius.md,
                borderWidth: selected ? 2 : 1,
                borderColor: selected ? colors.primary : colors.border,
                backgroundColor: selected ? (0, internal_1.withAlpha)(colors.primary, 0.08) : colors.surface,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: label }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [variant === 'custom' ? 'Custom' : 'Even split', typeof itemCount === 'number' && itemCount > 0 ? ` · ${itemCount} item${itemCount === 1 ? '' : 's'}` : ''] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: (0, internal_1.formatMoney)(amount, currency) }), settled ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.success, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: "\u2713 Paid" })) : typeof paidCents === 'number' && (0, internal_1.safeCents)(paidCents) > 0 ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.warn, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: [(0, internal_1.formatMoney)(remaining, currency), " left"] })) : null] }), onTogglePaid ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected: settled }, accessibilityLabel: settled ? `Mark ${label} unpaid` : `Mark ${label} paid`, onPress: onTogglePaid, hitSlop: 8, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: 24,
                        height: 24,
                        borderRadius: tokens.radius.sm,
                        borderWidth: 1,
                        borderColor: settled ? colors.success : colors.border,
                        backgroundColor: settled ? colors.success : 'transparent',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }, children: settled ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors.onSuccess, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: "\u2713" })) : null }) })) : null] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected }, accessibilityLabel: `${label}, ${(0, internal_1.formatMoney)(amount, currency)}${settled ? ', paid' : ''}`, onPress: onPress, testID: testID, children: content }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, children: content });
}
//# sourceMappingURL=SplitBillRow.js.map
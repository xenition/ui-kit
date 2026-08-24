"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefundRow = RefundRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * One line of a return / refund: item, quantity, amount (integer **cents** via
 * `formatMoney`), the return reason and refund status as **glyph + word** chips
 * (never color alone), and an optional restock flag. In `selectable` mode a
 * token-styled checkbox (reflected in `accessibilityState.checked`) lets a clerk
 * pick lines to refund. Token-only colors.
 */
function RefundRow({ name, quantity = 1, amountCents, currency = 'USD', reason, status, restock, variant = 'default', selected = false, onToggle, onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const selectable = variant === 'selectable';
    const checkbox = selectable ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "checkbox", accessibilityState: { checked: selected }, accessibilityLabel: `Refund ${name}`, onPress: onToggle, hitSlop: 8, style: {
            width: 24,
            height: 24,
            borderRadius: tokens.radius.sm,
            borderWidth: 1,
            borderColor: selected ? colors.primary : colors.border,
            backgroundColor: selected ? colors.primary : 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
        }, children: selected ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors.onPrimary, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: "\u2713" })) : null })) : null;
    const content = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                paddingVertical: tokens.spacing.sm,
            },
            style,
        ], children: [checkbox, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: 4 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: [quantity > 1 ? `${quantity}× ` : '', name] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: tokens.spacing.xs }, children: [reason ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.REFUND_REASON_META[reason], variant: "inline", size: "sm" }) : null, status ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.REFUND_STATUS_META[status], variant: "soft", size: "sm" }) : null, restock != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: restock ? '↩ Restock' : 'No restock' })) : null] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.danger, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: ["\u2212", (0, internal_1.formatMoney)((0, internal_1.safeCents)(amountCents), currency)] })] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Refund ${name}, ${(0, internal_1.formatMoney)((0, internal_1.safeCents)(amountCents), currency)}`, onPress: onPress, testID: testID, children: content }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, children: content });
}
//# sourceMappingURL=RefundRow.js.map
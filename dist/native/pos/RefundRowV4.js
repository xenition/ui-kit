"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefundRowV4 = RefundRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * RefundRow — **V4** "register" design. The tactile checkout take on a return
 * line: a return glyph in a soft-tint disc, the item + quantity, the reason and
 * refund status as **glyph + word** chips (never color alone), an optional restock
 * flag, and the **refunded amount big and bold** in `tabular-nums` inside a
 * danger-tinted pill. In `selectable` mode a large (≥44px) token-styled checkbox
 * (reflected in `accessibilityState.checked`) lets a clerk pick lines to refund.
 * Same props/behavior as {@link RefundRowProps}; token-only tints via
 * `useXenitionTheme()` + `withAlpha`. Dark-mode safe.
 */
function RefundRowV4({ name, quantity = 1, amountCents, currency = 'USD', reason, status, restock, variant = 'default', selected = false, onToggle, onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const selectable = variant === 'selectable';
    const lead = selectable ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "checkbox", accessibilityState: { checked: selected }, accessibilityLabel: `Refund ${name}`, onPress: onToggle, hitSlop: 8, style: {
            width: 44,
            height: 44,
            borderRadius: tokens.radius.md,
            borderWidth: 2,
            borderColor: selected ? colors.primary : colors.border,
            backgroundColor: selected ? colors.primary : 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
        }, children: selected ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors.onPrimary, fontSize: tokens.typography.scale.base, fontWeight: '800' }, children: "\u2713" })) : null })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            width: 36,
            height: 36,
            borderRadius: tokens.radius.full,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: (0, internal_1.withAlpha)(colors.danger, 0.14),
        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors.danger, fontSize: tokens.typography.scale.base }, children: "\u21A9" }) }));
    const content = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                borderRadius: tokens.radius.lg,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
            },
            style,
        ], children: [lead, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: 4 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: [quantity > 1 ? `${quantity}× ` : '', name] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: tokens.spacing.xs }, children: [reason ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.REFUND_REASON_META[reason], variant: "inline", size: "sm" }) : null, status ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.REFUND_STATUS_META[status], variant: "soft", size: "sm" }) : null, restock != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: restock ? '↩ Restock' : 'No restock' })) : null] })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    borderRadius: tokens.radius.md,
                    paddingVertical: 2,
                    paddingHorizontal: tokens.spacing.sm,
                    backgroundColor: (0, internal_1.withAlpha)(colors.danger, 0.14),
                }, children: (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.danger, fontSize: tokens.typography.scale.base, fontWeight: '800' }, children: ["\u2212", (0, internal_1.formatMoney)((0, internal_1.safeCents)(amountCents), currency)] }) })] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Refund ${name}, ${(0, internal_1.formatMoney)((0, internal_1.safeCents)(amountCents), currency)}`, onPress: onPress, testID: testID, children: content }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, children: content });
}
//# sourceMappingURL=RefundRowV4.js.map
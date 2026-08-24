"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscountRow = DiscountRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const internal_1 = require("./internal");
/**
 * A discount line on the ticket. In its resolved state it shows the label, the
 * percent/amount basis, an optional note, the negative money impact (integer
 * **cents** via `formatMoney`, drawn in the `success`/savings tone), and a
 * remove control. With no active discount it collapses to a dashed "Add
 * discount" button that fires `onAdd`. Token-only colors; a11y button roles.
 */
function DiscountRow({ label, type = 'amount', value, amountCents, currency = 'USD', note, active, onEdit, onRemove, onAdd, addLabel = 'Add discount', variant = 'default', testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const compact = variant === 'compact';
    const isActive = active ?? ((0, internal_1.safeCents)(amountCents) > 0 || (label != null && label !== ''));
    if (!isActive) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: addLabel, onPress: onAdd, testID: testID, style: ({ pressed }) => [
                {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.xs,
                    paddingVertical: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.md,
                    borderRadius: tokens.radius.md,
                    borderWidth: 1,
                    borderStyle: 'dashed',
                    borderColor: colors.border,
                    backgroundColor: pressed ? colors.border : colors.surface,
                },
                style,
            ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: "\uFF0B" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: addLabel })] }));
    }
    const basis = type === 'percent' && typeof value === 'number'
        ? `${value}%`
        : type === 'amount' && typeof value === 'number'
            ? (0, internal_1.formatMoney)(value, currency)
            : undefined;
    const content = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: tokens.spacing.md,
                paddingVertical: compact ? tokens.spacing.xs : tokens.spacing.sm,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors.success, fontSize: tokens.typography.scale.sm }, children: "\uD83C\uDFF7" }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: [label ?? 'Discount', basis ? ` · ${basis}` : ''] })] }), !compact && note ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: note })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.success, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: ["\u2212", (0, internal_1.formatMoney)(amountCents ?? 0, currency)] }), onRemove ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Remove ${label ?? 'discount'}`, onPress: onRemove, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors.danger, fontSize: tokens.typography.scale.base }, children: "\u2715" }) })) : null] })] }));
    if (onEdit) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Edit ${label ?? 'discount'}`, onPress: onEdit, testID: testID, children: content }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, children: content });
}
//# sourceMappingURL=DiscountRow.js.map
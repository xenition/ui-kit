"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscountRowV4 = DiscountRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const internal_1 = require("./internal");
/**
 * DiscountRow — **V4** "register" design. The tactile checkout take on a discount
 * line: a tag glyph in a soft-tint disc, the label with its percent/amount basis,
 * an optional note, and the **negative money impact drawn big and bold** in
 * `tabular-nums` (the savings that matter at the counter) — plus a large (≥44px)
 * remove affordance. With no active discount it collapses to a crisp, rounded
 * dashed "Add discount" button that fires `onAdd`. Same props/behavior as
 * {@link DiscountRowProps}; token-only tints via `useXenitionTheme()` +
 * `withAlpha`. Savings tone = `success`; one accent = `primary`. Dark-mode safe.
 */
function DiscountRowV4({ label, type = 'amount', value, amountCents, currency = 'USD', note, active, onEdit, onRemove, onAdd, addLabel = 'Add discount', variant = 'default', testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const compact = variant === 'compact';
    const isActive = active ?? ((0, internal_1.safeCents)(amountCents) > 0 || (label != null && label !== ''));
    if (!isActive) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: addLabel, onPress: onAdd, testID: testID, style: ({ pressed }) => [
                {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.sm,
                    minHeight: 44,
                    paddingVertical: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.md,
                    borderRadius: tokens.radius.lg,
                    borderWidth: 2,
                    borderStyle: 'dashed',
                    borderColor: colors.border,
                    backgroundColor: pressed ? (0, internal_1.withAlpha)(colors.primary, 0.08) : colors.surface,
                },
                style,
            ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: 28,
                        height: 28,
                        borderRadius: tokens.radius.full,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: (0, internal_1.withAlpha)(colors.primary, 0.12),
                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '800' }, children: "\uFF0B" }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: addLabel })] }));
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
                borderRadius: tokens.radius.lg,
                paddingVertical: compact ? tokens.spacing.xs : tokens.spacing.sm,
                paddingHorizontal: compact ? tokens.spacing.sm : tokens.spacing.md,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: compact ? 32 : 36,
                            height: compact ? 32 : 36,
                            borderRadius: tokens.radius.full,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: (0, internal_1.withAlpha)(colors.success, 0.14),
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors.success, fontSize: tokens.typography.scale.sm }, children: "\uD83C\uDFF7" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: [label ?? 'Discount', basis ? ` · ${basis}` : ''] }), !compact && note ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: note })) : null] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            borderRadius: tokens.radius.md,
                            paddingVertical: 2,
                            paddingHorizontal: tokens.spacing.sm,
                            backgroundColor: (0, internal_1.withAlpha)(colors.success, 0.14),
                        }, children: (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.success, fontSize: tokens.typography.scale.base, fontWeight: '800' }, children: ["\u2212", (0, internal_1.formatMoney)(amountCents ?? 0, currency)] }) }), onRemove ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Remove ${label ?? 'discount'}`, onPress: onRemove, hitSlop: 8, style: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', borderRadius: tokens.radius.full }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors.danger, fontSize: tokens.typography.scale.lg }, children: "\u2715" }) })) : null] })] }));
    if (onEdit) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Edit ${label ?? 'discount'}`, onPress: onEdit, testID: testID, children: content }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, children: content });
}
//# sourceMappingURL=DiscountRowV4.js.map
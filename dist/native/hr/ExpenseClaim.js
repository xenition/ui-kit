"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseClaim = ExpenseClaim;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * An expense-claim card: merchant, category, amount (integer **cents** via
 * `formatMoney`), date, and lifecycle status. Status is a glyph + word pill
 * (approved → success, rejected → danger, never color alone) and a missing
 * receipt is flagged by a word. When `actionable` and still `submitted`,
 * approve / reject buttons render for an approver. `compact` drops the memo.
 * All colors are theme tokens — no literals.
 */
function ExpenseClaim({ merchant, category, amountCents, currency = 'USD', date, status, description, hasReceipt, actionable = false, variant = 'default', onApprove, onReject, onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const compact = variant === 'compact';
    const catMeta = internal_1.EXPENSE_CATEGORY_META[category];
    const showActions = actionable && status === 'submitted';
    const body = ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { variant: "outlined", padding: compact ? 'sm' : 'md', style: [{ gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: merchant }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.sm }, children: catMeta.glyph }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [catMeta.label, date ? ` · ${date}` : ''] })] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: (0, internal_1.formatMoney)(amountCents, currency) }), (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.EXPENSE_STATUS_META[status], variant: "inline", size: "sm" })] })] }), !compact && description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: description })) : null, hasReceipt != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: hasReceipt ? colors.muted : colors.danger, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: hasReceipt ? '📎 Receipt attached' : '⚠ No receipt' })) : null, showActions ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", tone: "success", onPress: onApprove, style: { flex: 1 }, children: "Approve" }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "outline", tone: "danger", onPress: onReject, style: { flex: 1 }, children: "Reject" })] })) : null] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Expense ${merchant}, ${(0, internal_1.formatMoney)(amountCents, currency)}, ${internal_1.EXPENSE_STATUS_META[status].label}`, onPress: onPress, testID: testID, children: body }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, children: body });
}
//# sourceMappingURL=ExpenseClaim.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetBillRow = BudgetBillRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const format_1 = require("./internal/format");
/**
 * A levelized ("budget billing") summary row: the flat monthly charge, a
 * settle-up balance shown as a **signed credit/shortfall** (credit → success,
 * shortfall → danger, conveyed by sign + label + color, never color alone), and
 * an optional plan-vs-actual progress bar. The bar denominator is guarded
 * against zero. All amounts are integer cents via `formatMoney`, so nothing
 * drifts. Every color traces to a token.
 */
function BudgetBillRow({ label = 'Budget billing', monthlyCents, balanceCents, actualToDateCents, plannedToDateCents, reviewDate, currency = 'USD', formatMoney: format = format_1.formatMoney, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const monthly = Math.max(0, Math.trunc(monthlyCents || 0));
    const balance = balanceCents != null && Number.isFinite(balanceCents) ? Math.trunc(balanceCents) : null;
    const isCredit = balance != null && balance >= 0;
    const planned = plannedToDateCents != null ? Math.max(0, Math.trunc(plannedToDateCents)) : 0;
    const actual = actualToDateCents != null ? Math.max(0, Math.trunc(actualToDateCents)) : 0;
    const showBar = planned > 0;
    const overPlan = actual > planned;
    const barTone = overPlan ? 'warn' : 'primary';
    return ((0, jsx_runtime_1.jsxs)(primitives_2.Card, { style: style, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: "\uD83D\uDCC5", size: "lg", accessibilityLabel: "Budget billing" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: label }), reviewDate != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: reviewDate })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: format(monthly, currency) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "per month" })] })] }), balance != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    marginTop: tokens.spacing.md,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: isCredit ? 'Account credit' : 'Settle-up balance' }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: {
                            color: isCredit ? colors.success : colors.danger,
                            fontSize: tokens.typography.scale.sm,
                            fontWeight: '700',
                        }, children: [isCredit ? '' : '−', format(Math.abs(balance), currency)] })] })) : null, showBar ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { marginTop: tokens.spacing.md, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_2.Progress, { value: Math.min(actual, planned * 1.5), max: planned, tone: barTone, size: "sm" }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [format(actual, currency), " actual vs ", format(planned, currency), " planned"] })] })) : null] }));
}
//# sourceMappingURL=BudgetBillRow.js.map
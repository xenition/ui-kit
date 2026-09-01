"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetBillRowV4 = BudgetBillRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const format_1 = require("./internal/format");
const GradientSurface_1 = require("./internal/GradientSurface");
const brand_1 = require("./internal/brand");
/**
 * BudgetBillRow — **V4** design. An elevated row: the budget-billing glyph in
 * the signature brand-gradient disc, the flat monthly charge, a settle-up balance
 * shown as a signed credit/shortfall (credit → success, shortfall → danger, by
 * sign + label + color, never color alone), and an optional plan-vs-actual
 * progress bar (denominator guarded against zero). All amounts are integer cents
 * via `formatMoney`. Same props as {@link BudgetBillRowProps}; token-only colors.
 */
function BudgetBillRowV4({ label = 'Budget billing', monthlyCents, balanceCents, actualToDateCents, plannedToDateCents, reviewDate, currency = 'USD', formatMoney: format = format_1.formatMoney, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const r = tokens.ramps;
    const monthly = Math.max(0, Math.trunc(monthlyCents || 0));
    const balance = balanceCents != null && Number.isFinite(balanceCents) ? Math.trunc(balanceCents) : null;
    const isCredit = balance != null && balance >= 0;
    const planned = plannedToDateCents != null ? Math.max(0, Math.trunc(plannedToDateCents)) : 0;
    const actual = actualToDateCents != null ? Math.max(0, Math.trunc(actualToDateCents)) : 0;
    const showBar = planned > 0;
    const overPlan = actual > planned;
    const barTone = overPlan ? 'warn' : 'primary';
    const card = {
        backgroundColor: colors.card,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.lg,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.1,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 6 },
        elevation: 3,
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [card, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, brand_1.brandDisc)(r), style: { width: 48, height: 48, borderRadius: tokens.radius.md, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }, children: (0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: "\uD83D\uDCC5", size: "xl", accessibilityLabel: "Budget billing", style: { color: (0, brand_1.brandInk)(r) } }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: label }), reviewDate != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs }, children: reviewDate })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: format(monthly, currency) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs }, children: "per month" })] })] }), balance != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    marginTop: tokens.spacing.md,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.sm }, children: isCredit ? 'Account credit' : 'Settle-up balance' }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: {
                            color: isCredit ? colors.success : colors.danger,
                            fontSize: tokens.typography.scale.sm,
                            fontWeight: '700',
                        }, children: [isCredit ? '' : '−', format(Math.abs(balance), currency)] })] })) : null, showBar ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { marginTop: tokens.spacing.md, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_2.Progress, { value: Math.min(actual, planned * 1.5), max: planned, tone: barTone, size: "sm" }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs }, children: [format(actual, currency), " actual vs ", format(planned, currency), " planned"] })] })) : null] }));
}
//# sourceMappingURL=BudgetBillRowV4.js.map
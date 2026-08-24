"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetBar = BudgetBar;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const charts_1 = require("../charts");
const MoneyAmount_1 = require("./MoneyAmount");
const money_1 = require("../commerce/money");
/**
 * A labelled budget progress bar: spent-of-limit with a fill whose tone shifts
 * as the budget is consumed — `success` under 75%, `warn` from 75–100%,
 * `danger` once over. Amounts are integer cents (two-decimal, no drift) and the
 * "remaining / over" line is a signed {@link MoneyAmount}. `limitCents <= 0` is
 * guarded (ratio pinned, no divide-by-zero). Token-bound throughout.
 */
function BudgetBar({ label, spentCents, limitCents, currency = 'USD', formatMoney: format = money_1.formatMoney, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const spent = Number.isFinite(spentCents) ? Math.max(Math.trunc(spentCents), 0) : 0;
    const limit = Number.isFinite(limitCents) ? Math.trunc(limitCents) : 0;
    const ratio = limit > 0 ? spent / limit : spent > 0 ? 1 : 0;
    const remaining = limit - spent; // positive = left, negative = over
    const fillColor = ratio > 1 ? 'danger' : ratio >= 0.75 ? 'warn' : 'success';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.xs }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600', flex: 1 }, children: label }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [format(spent, currency), " / ", format(limit, currency)] })] }), (0, jsx_runtime_1.jsx)(charts_1.MiniBar, { value: ratio * 100, max: 100, color: fillColor, height: 8, accessibilityLabel: `${label}, ${Math.round(ratio * 100)}% of budget used` }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: remaining >= 0 ? 'Remaining' : 'Over budget' }), (0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: remaining, currency: currency, tone: remaining >= 0 ? 'muted' : 'expense', size: "sm", signDisplay: "never", style: { fontSize: tokens.typography.scale.xs, fontWeight: '600' } })] })] }));
}
//# sourceMappingURL=BudgetBar.js.map
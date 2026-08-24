"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavingsGoalCardV2 = SavingsGoalCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const charts_1 = require("../charts");
const MoneyAmount_1 = require("./MoneyAmount");
const money_1 = require("../commerce/money");
/**
 * SavingsGoalCard, redesigned (v2): a **big ProgressRing hero**. A large,
 * percent-labeled ring is centered at the top, with the title, the saved /
 * target line, and the "to go" caption stacked and centered beneath it — a
 * focused, single-goal spotlight. Distinct at a glance from v1's small ring
 * beside a left-aligned block. Same props, guarded target, integer cents.
 */
function SavingsGoalCardV2({ title, savedCents, targetCents, currency = 'USD', deadline, color = 'success', formatMoney: format = money_1.formatMoney, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const saved = Number.isFinite(savedCents) ? Math.max(Math.trunc(savedCents), 0) : 0;
    const target = Number.isFinite(targetCents) ? Math.trunc(targetCents) : 0;
    const pct = target > 0 ? Math.min(saved / target, 1) : 0;
    const remaining = Math.max(target - saved, 0);
    return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { style: style, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(charts_1.ProgressRing, { value: pct * 100, max: 100, size: 132, strokeWidth: 12, color: color, accessibilityLabel: `${title}, ${Math.round(pct * 100)}% saved` }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: title }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: saved, currency: currency, tone: "neutral", size: "md" }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: ["/ ", format(target, currency)] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [format(remaining, currency), " to go", deadline != null ? ` · by ${deadline}` : ''] })] })] }) }));
}
//# sourceMappingURL=SavingsGoalCardV2.js.map
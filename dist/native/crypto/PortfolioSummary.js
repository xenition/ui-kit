"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioSummary = PortfolioSummary;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const charts_1 = require("../charts");
const MoneyAmount_1 = require("../finance/MoneyAmount");
const format_1 = require("./internal/format");
/**
 * The top-of-portfolio hero: a big total ({@link MoneyAmount}), a token-toned
 * 24h change (gain = `success`, loss = `danger`, with a ▲/▼ glyph + accessible
 * up/down label so it is never color-only), and a reused {@link DonutChart} of
 * the allocation breakdown with a legend. All amounts are integer cents — no
 * float drift. Empty `allocations` simply hides the chart.
 */
function PortfolioSummary({ totalCents, currency = 'USD', changeCents, changePct, allocations = [], loading = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const changeToneSlot = (0, format_1.changeToneKey)(changePct ?? changeCents ?? 0);
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { variant: "elevated", style: style, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Loading portfolio", style: { height: 120, borderRadius: tokens.radius.md, backgroundColor: colors.border, opacity: 0.5 } }) }));
    }
    return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { variant: "elevated", style: style, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: "Total balance" }), (0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: totalCents, currency: currency, tone: "neutral", size: "xl" }), changeCents != null || changePct != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[changeToneSlot], fontSize: tokens.typography.scale.sm }, children: (0, format_1.changeGlyph)(changePct ?? changeCents ?? 0) }), changeCents != null ? ((0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: changeCents, currency: currency, tone: changeToneSlot === 'muted' ? 'neutral' : changeToneSlot === 'success' ? 'income' : 'expense', size: "sm", signDisplay: "always" })) : null, changePct != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityLabel: `${(changePct ?? 0) >= 0 ? 'up' : 'down'} ${(0, format_1.formatPct)(Math.abs(changePct))}`, style: { color: colors[changeToneSlot], fontSize: tokens.typography.scale.sm, fontWeight: '600', fontVariant: ['tabular-nums'] }, children: (0, format_1.formatPct)(changePct) })) : null] })) : null] }), allocations.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { alignItems: 'center' }, children: (0, jsx_runtime_1.jsx)(charts_1.DonutChart, { data: allocations.map((a) => ({ label: a.label, value: a.value, color: a.color })), size: 180, thickness: 26, showLegend: true, accessibilityLabel: `Allocation across ${allocations.length} assets` }) })) : null] }) }));
}
//# sourceMappingURL=PortfolioSummary.js.map
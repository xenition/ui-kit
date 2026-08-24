"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShiftReport = ShiftReport;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Card_1 = require("../primitives/Card");
const EmptyState_1 = require("../commerce/EmptyState");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * End-of-shift Z-report card: header (cashier / register / window), the headline
 * metrics (gross, refunds, discounts, tax, net, transactions), an optional
 * per-tender breakdown, and a cash-count variance drawn as a **glyph + word**
 * pill (over/short/balanced — never color alone). All money is integer **cents**
 * via `formatMoney`. A shift with no sales renders an {@link EmptyState}.
 * Composed from `Card` + `StatusPill`; token-only colors.
 */
function ShiftReport({ cashier, registerId, period, grossSalesCents, refundsCents, discountsCents, taxCents, netSalesCents, transactionCount, expectedCashCents, countedCashCents, currency = 'USD', breakdown, variant = 'detailed', emptyLabel = 'No sales this shift', testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const detailed = variant === 'detailed';
    const gross = (0, internal_1.safeCents)(grossSalesCents);
    const net = typeof netSalesCents === 'number' ? (0, internal_1.safeCents)(netSalesCents) : gross - (0, internal_1.safeCents)(refundsCents);
    const empty = gross === 0 && (!breakdown || breakdown.length === 0) && (transactionCount ?? 0) === 0;
    const hasVariance = detailed && typeof expectedCashCents === 'number' && typeof countedCashCents === 'number';
    const variance = hasVariance
        ? (0, internal_1.varianceMeta)((0, internal_1.safeCents)(expectedCashCents), (0, internal_1.safeCents)(countedCashCents))
        : null;
    const Metric = ({ label, value, strong, }) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', paddingVertical: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: strong ? tokens.typography.scale.base : tokens.typography.scale.sm, fontWeight: strong ? '600' : '400' }, children: label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: strong ? tokens.typography.scale.base : tokens.typography.scale.sm, fontWeight: strong ? '700' : '500' }, children: value })] }));
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { variant: "outlined", padding: "lg", style: [{ gap: tokens.spacing.md }, style], testID: testID, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: "Shift report" }), cashier || registerId || period ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [cashier, registerId ? `Reg ${registerId}` : null, period].filter(Boolean).join(' · ') })) : null] }), empty ? ((0, jsx_runtime_1.jsx)(EmptyState_1.EmptyState, { title: emptyLabel })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(Metric, { label: "Gross sales", value: (0, internal_1.formatMoney)(gross, currency) }), typeof refundsCents === 'number' ? ((0, jsx_runtime_1.jsx)(Metric, { label: "Refunds", value: `−${(0, internal_1.formatMoney)(refundsCents, currency)}` })) : null, typeof discountsCents === 'number' ? ((0, jsx_runtime_1.jsx)(Metric, { label: "Discounts", value: `−${(0, internal_1.formatMoney)(discountsCents, currency)}` })) : null, typeof taxCents === 'number' ? (0, jsx_runtime_1.jsx)(Metric, { label: "Tax", value: (0, internal_1.formatMoney)(taxCents, currency) }) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 1, backgroundColor: colors.border, marginVertical: tokens.spacing.xs } }), (0, jsx_runtime_1.jsx)(Metric, { label: "Net sales", value: (0, internal_1.formatMoney)(net, currency), strong: true }), typeof transactionCount === 'number' ? ((0, jsx_runtime_1.jsx)(Metric, { label: "Transactions", value: String(transactionCount) })) : null] }), detailed && breakdown && breakdown.length > 0 ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: "By tender" }), breakdown.map((b, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.PAYMENT_METHOD_META[b.method], variant: "inline", size: "sm" }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: [(0, internal_1.formatMoney)(b.amountCents, currency), typeof b.count === 'number' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: `  (${b.count})` })) : null] })] }, i)))] })) : null, variance ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingTop: tokens.spacing.sm,
                            borderTopWidth: 1,
                            borderTopColor: colors.border,
                        }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "Cash variance" }), (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: variance.meta, variant: "soft", size: "sm" })] }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: (0, internal_1.toneColor)(colors, variance.meta.tone), fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: [variance.deltaCents > 0 ? '+' : variance.deltaCents < 0 ? '−' : '', (0, internal_1.formatMoney)(Math.abs(variance.deltaCents), currency)] })] })) : null] }))] }));
}
//# sourceMappingURL=ShiftReport.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShiftReportV4 = ShiftReportV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Card_1 = require("../primitives/Card");
const EmptyState_1 = require("../commerce/EmptyState");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * ShiftReport — **V4** "register" design. The tactile end-of-shift Z-report: the
 * headline numbers (gross sales, transactions, cash counted, variance) become a
 * crisp **grid of big-numeral stat tiles** you can read across the counter, gross
 * sales carrying the one accent. Refunds / discounts / tax / net stay as a
 * compact ledger beneath. The variance tile is colored by over/short (icon + word
 * pill, never color alone). Optional per-tender breakdown; a shift with no sales
 * renders an {@link EmptyState}. All money is integer **cents** via `formatMoney`.
 * Same props/behavior as {@link ShiftReportProps}; token-only tints via
 * `useXenitionTheme()`.
 */
function ShiftReportV4({ cashier, registerId, period, grossSalesCents, refundsCents, discountsCents, taxCents, netSalesCents, transactionCount, expectedCashCents, countedCashCents, currency = 'USD', breakdown, variant = 'detailed', emptyLabel = 'No sales this shift', testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const detailed = variant === 'detailed';
    const gross = (0, internal_1.safeCents)(grossSalesCents);
    const net = typeof netSalesCents === 'number' ? (0, internal_1.safeCents)(netSalesCents) : gross - (0, internal_1.safeCents)(refundsCents);
    const empty = gross === 0 && (!breakdown || breakdown.length === 0) && (transactionCount ?? 0) === 0;
    const hasVariance = detailed && typeof expectedCashCents === 'number' && typeof countedCashCents === 'number';
    const variance = hasVariance
        ? (0, internal_1.varianceMeta)((0, internal_1.safeCents)(expectedCashCents), (0, internal_1.safeCents)(countedCashCents))
        : null;
    const StatTile = ({ label, value, tone, }) => {
        const tint = tone ? (0, internal_1.toneColor)(colors, tone) : null;
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                flex: 1,
                gap: 2,
                borderRadius: tokens.radius.md,
                padding: tokens.spacing.md,
                backgroundColor: tint ? (0, internal_1.withAlpha)(tint, 0.14) : (0, internal_1.withAlpha)(colors.onSurface, 0.05),
            }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '500' }, children: label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: {
                        color: tint ?? colors.onSurface,
                        fontSize: tokens.typography.scale.xl,
                        fontWeight: '800',
                    }, children: value })] }));
    };
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { variant: "outlined", padding: "lg", style: [{ gap: tokens.spacing.md }, style], testID: testID, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: "Shift report" }), cashier || registerId || period ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [cashier, registerId ? `Reg ${registerId}` : null, period].filter(Boolean).join(' · ') })) : null] }), empty ? ((0, jsx_runtime_1.jsx)(EmptyState_1.EmptyState, { title: emptyLabel })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(StatTile, { label: "Gross sales", value: (0, internal_1.formatMoney)(gross, currency), tone: "primary" }), typeof transactionCount === 'number' ? ((0, jsx_runtime_1.jsx)(StatTile, { label: "Transactions", value: String(transactionCount) })) : ((0, jsx_runtime_1.jsx)(StatTile, { label: "Net sales", value: (0, internal_1.formatMoney)(net, currency) }))] }), typeof countedCashCents === 'number' || variance ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [typeof countedCashCents === 'number' ? ((0, jsx_runtime_1.jsx)(StatTile, { label: "Cash counted", value: (0, internal_1.formatMoney)((0, internal_1.safeCents)(countedCashCents), currency) })) : null, variance ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                            flex: 1,
                                            gap: 2,
                                            borderRadius: tokens.radius.md,
                                            padding: tokens.spacing.md,
                                            backgroundColor: (0, internal_1.withAlpha)((0, internal_1.toneColor)(colors, variance.meta.tone), 0.14),
                                        }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '500' }, children: "Variance" }), (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: variance.meta, variant: "inline", size: "sm" })] }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { allowFontScaling: false, style: {
                                                    color: (0, internal_1.toneColor)(colors, variance.meta.tone),
                                                    fontSize: tokens.typography.scale.xl,
                                                    fontWeight: '800',
                                                }, children: [variance.deltaCents > 0 ? '+' : variance.deltaCents < 0 ? '−' : '', (0, internal_1.formatMoney)(Math.abs(variance.deltaCents), currency)] })] })) : null] })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [typeof refundsCents === 'number' ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', paddingVertical: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "Refunds" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '500' }, children: `−${(0, internal_1.formatMoney)(refundsCents, currency)}` })] })) : null, typeof discountsCents === 'number' ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', paddingVertical: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "Discounts" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '500' }, children: `−${(0, internal_1.formatMoney)(discountsCents, currency)}` })] })) : null, typeof taxCents === 'number' ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', paddingVertical: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "Tax" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '500' }, children: (0, internal_1.formatMoney)(taxCents, currency) })] })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 1, backgroundColor: colors.border, marginVertical: tokens.spacing.xs } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', paddingVertical: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: "Net sales" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: (0, internal_1.formatMoney)(net, currency) })] })] }), detailed && breakdown && breakdown.length > 0 ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: "By tender" }), breakdown.map((b, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.PAYMENT_METHOD_META[b.method], variant: "inline", size: "sm" }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: [(0, internal_1.formatMoney)(b.amountCents, currency), typeof b.count === 'number' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: `  (${b.count})` })) : null] })] }, i)))] })) : null] }))] }));
}
//# sourceMappingURL=ShiftReportV4.js.map
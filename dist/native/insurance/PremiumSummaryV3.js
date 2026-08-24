"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PremiumSummaryV3 = PremiumSummaryV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const format_1 = require("./internal/format");
const CADENCE_LABEL = {
    monthly: 'per month',
    quarterly: 'per quarter',
    annual: 'per year',
};
/**
 * PremiumSummary, alternate design **V3** — total-first and chrome-free. The
 * amount due leads at the top in large type with its cadence; the itemized
 * lines follow as quiet secondary rows (discounts as `successText` credits).
 * The total still defaults to the sum of `items`, so the headline can never
 * disagree with the breakdown. No card border — separation is spacing. Same
 * `PremiumSummaryProps` (integer cents, `loading` state); drops in for
 * `PremiumSummary`. Token-pure.
 */
function PremiumSummaryV3({ items, totalCents, cadence = 'monthly', currency = 'USD', formatMoney: format = format_1.formatMoney, loading = false, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const rows = Array.isArray(items) ? items : [];
    const derivedTotal = rows.reduce((sum, it) => sum + (Number.isFinite(it.amountCents) ? Math.trunc(it.amountCents) : 0), 0);
    const total = totalCents != null ? Math.trunc(totalCents) : derivedTotal;
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading premium", style: [{ gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        height: tokens.typography.scale['3xl'],
                        width: '55%',
                        borderRadius: tokens.radius.sm,
                        backgroundColor: colors.border,
                    } }), [0, 1].map((i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        height: tokens.typography.scale.sm,
                        width: i === 1 ? '40%' : '70%',
                        borderRadius: tokens.radius.sm,
                        backgroundColor: colors.border,
                    } }, i)))] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityLabel: `Total premium ${format(total, currency)} ${CADENCE_LABEL[cadence]}`, style: { color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '800' }, children: format(total, currency) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: CADENCE_LABEL[cadence] })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: rows.map((it, i) => {
                    const cents = Number.isFinite(it.amountCents) ? Math.trunc(it.amountCents) : 0;
                    const isCredit = cents < 0;
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.muted, fontSize: tokens.typography.scale.xs }, children: it.label }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: {
                                    color: isCredit ? colors.successText : colors.muted,
                                    fontSize: tokens.typography.scale.xs,
                                    fontWeight: '600',
                                }, children: [isCredit ? '−' : '', format(Math.abs(cents), currency)] })] }, `${it.label}-${i}`));
                }) })] }));
}
//# sourceMappingURL=PremiumSummaryV3.js.map
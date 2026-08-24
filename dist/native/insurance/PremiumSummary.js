"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PremiumSummary = PremiumSummary;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const format_1 = require("./internal/format");
const CADENCE_LABEL = {
    monthly: 'per month',
    quarterly: 'per quarter',
    annual: 'per year',
};
/**
 * An itemized premium breakdown card: labelled lines (discounts shown as
 * `success`-toned credits with a leading `−`) summing to a bold total. The
 * total defaults to the sum of `items` so it can never disagree with the lines.
 * All amounts are integer cents via `formatMoney` (two decimals, no drift), and
 * every color traces to a `SemanticColors` slot. Supports a `loading` state.
 */
function PremiumSummary({ items, totalCents, cadence = 'monthly', currency = 'USD', formatMoney: format = format_1.formatMoney, loading = false, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const rows = Array.isArray(items) ? items : [];
    const derivedTotal = rows.reduce((sum, it) => sum + (Number.isFinite(it.amountCents) ? Math.trunc(it.amountCents) : 0), 0);
    const total = totalCents != null ? Math.trunc(totalCents) : derivedTotal;
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(primitives_2.Card, { style: style, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Loading premium", children: [0, 1, 2].map((i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        height: tokens.typography.scale.base,
                        borderRadius: tokens.radius.sm,
                        backgroundColor: colors.border,
                        marginBottom: tokens.spacing.sm,
                        width: i === 2 ? '50%' : '100%',
                    } }, i))) }) }));
    }
    return ((0, jsx_runtime_1.jsxs)(primitives_2.Card, { style: style, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: rows.map((it, i) => {
                    const cents = Number.isFinite(it.amountCents) ? Math.trunc(it.amountCents) : 0;
                    const isCredit = cents < 0;
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.muted, fontSize: tokens.typography.scale.sm }, children: it.label }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: {
                                    color: isCredit ? colors.success : colors.onSurface,
                                    fontSize: tokens.typography.scale.sm,
                                    fontWeight: '600',
                                }, children: [isCredit ? '−' : '', format(Math.abs(cents), currency)] })] }, `${it.label}-${i}`));
                }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    marginTop: tokens.spacing.md,
                    paddingTop: tokens.spacing.md,
                    borderTopWidth: 1,
                    borderTopColor: colors.border,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: "Total" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: CADENCE_LABEL[cadence] })] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityLabel: `Total premium ${format(total, currency)} ${CADENCE_LABEL[cadence]}`, style: { color: colors.primary, fontSize: tokens.typography.scale['2xl'], fontWeight: '700' }, children: format(total, currency) })] })] }));
}
//# sourceMappingURL=PremiumSummary.js.map
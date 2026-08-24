"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PremiumSummaryV2 = PremiumSummaryV2;
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
 * PremiumSummary, alternate design **V2** — an elevated receipt. Line items are
 * laid out ledger-style with a hairline rule under each row (discounts as
 * `successText` credits with a leading `−`), then a full-width highlighted
 * **total band** — a tinted footer that makes the amount due the anchor. Total
 * defaults to the sum of `items` so it always reconciles. Same
 * `PremiumSummaryProps` (integer cents, `loading` state); drops in for
 * `PremiumSummary`. Token-pure.
 */
function PremiumSummaryV2({ items, totalCents, cadence = 'monthly', currency = 'USD', formatMoney: format = format_1.formatMoney, loading = false, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const rows = Array.isArray(items) ? items : [];
    const derivedTotal = rows.reduce((sum, it) => sum + (Number.isFinite(it.amountCents) ? Math.trunc(it.amountCents) : 0), 0);
    const total = totalCents != null ? Math.trunc(totalCents) : derivedTotal;
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(primitives_2.Card, { variant: "elevated", padding: "none", radius: "md", style: [{ overflow: 'hidden' }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Loading premium", style: { padding: tokens.spacing.lg }, children: [0, 1, 2].map((i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            height: tokens.typography.scale.base,
                            borderRadius: tokens.radius.sm,
                            backgroundColor: colors.border,
                            marginBottom: tokens.spacing.sm,
                            width: i === 2 ? '50%' : '100%',
                        } }, i))) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 56, backgroundColor: (0, format_1.withAlpha)(colors.primary, 0.08) } })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(primitives_2.Card, { variant: "elevated", padding: "none", radius: "md", style: [{ overflow: 'hidden' }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { paddingHorizontal: tokens.spacing.lg, paddingTop: tokens.spacing.lg }, children: rows.map((it, i) => {
                    const cents = Number.isFinite(it.amountCents) ? Math.trunc(it.amountCents) : 0;
                    const isCredit = cents < 0;
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: tokens.spacing.md,
                            paddingVertical: tokens.spacing.sm,
                            borderBottomWidth: 1,
                            borderBottomColor: (0, format_1.withAlpha)(colors.border, 0.6),
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.muted, fontSize: tokens.typography.scale.sm }, children: it.label }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: {
                                    color: isCredit ? colors.successText : colors.onSurface,
                                    fontSize: tokens.typography.scale.sm,
                                    fontWeight: '600',
                                }, children: [isCredit ? '−' : '', format(Math.abs(cents), currency)] })] }, `${it.label}-${i}`));
                }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    marginTop: tokens.spacing.md,
                    paddingHorizontal: tokens.spacing.lg,
                    paddingVertical: tokens.spacing.md,
                    backgroundColor: (0, format_1.withAlpha)(colors.primary, 0.1),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '800' }, children: "Total due" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: CADENCE_LABEL[cadence] })] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityLabel: `Total premium ${format(total, currency)} ${CADENCE_LABEL[cadence]}`, style: { color: colors.primaryText, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }, children: format(total, currency) })] })] }));
}
//# sourceMappingURL=PremiumSummaryV2.js.map
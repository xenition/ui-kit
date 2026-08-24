"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaxSummaryCard = TaxSummaryCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const format_1 = require("./internal/format");
const STATUS = {
    owed: { label: 'Balance due', glyph: '💳', tone: 'warn' },
    refund: { label: 'Refund', glyph: '💵', tone: 'success' },
    paid: { label: 'Paid', glyph: '✓', tone: 'success' },
    overdue: { label: 'Overdue', glyph: '!', tone: 'danger' },
    filed: { label: 'Filed', glyph: '📄', tone: 'primary' },
};
/**
 * A tax-account summary for one period: the settlement status conveyed by
 * **text + glyph + color** (never color alone), the primary balance / refund as
 * integer cents through `formatMoney`, an optional amount-paid line, and a
 * gated "Pay now" action for owed / overdue balances. The headline amount is
 * toned success for a refund and danger when overdue. Every color traces to a
 * `SemanticColors` slot or a token-derived tint — no literals.
 */
function TaxSummaryCard({ taxYear, taxType, status = 'owed', amountCents, paidCents, dueDate, currency = 'USD', formatMoney: format = format_1.formatMoney, onPay, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const sd = STATUS[status] ?? STATUS.owed;
    const amount = Math.max(0, Math.trunc(amountCents || 0));
    const isPayable = status === 'owed' || status === 'overdue';
    const amountColor = status === 'refund' || status === 'paid'
        ? colors.success
        : status === 'overdue'
            ? colors.danger
            : colors.onSurface;
    return ((0, jsx_runtime_1.jsxs)(primitives_2.Card, { variant: "elevated", style: style, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 48,
                            height: 48,
                            borderRadius: tokens.radius.md,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: (0, format_1.withAlpha)(sd.tone === 'neutral' ? colors.muted : colors[sd.tone], 0.14),
                        }, children: (0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: "\uD83E\uDDFE", size: "xl", accessibilityLabel: "Tax summary" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: [taxType ?? 'Tax', " \u00B7 ", taxYear] }), (0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: sd.tone, variant: "soft", size: "sm", children: `${sd.glyph} ${sd.label}` })] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    marginTop: tokens.spacing.md,
                    paddingTop: tokens.spacing.md,
                    borderTopWidth: 1,
                    borderTopColor: colors.border,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: status === 'refund' ? 'Refund' : 'Balance' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: amountColor, fontSize: tokens.typography.scale.xl, fontWeight: '700' }, children: format(amount, currency) })] }), paidCents != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "Paid" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: format(Math.max(0, Math.trunc(paidCents)), currency) })] })) : null] }), dueDate != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { marginTop: tokens.spacing.sm, color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["Due ", dueDate] })) : null, isPayable && onPay != null && amount > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.md, alignItems: 'flex-end' }, children: (0, jsx_runtime_1.jsx)(primitives_2.Button, { size: "sm", tone: status === 'overdue' ? 'danger' : 'default', onPress: onPay, children: "Pay now" }) })) : null] }));
}
//# sourceMappingURL=TaxSummaryCard.js.map
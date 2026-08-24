"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptViewV2 = ReceiptViewV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const EmptyState_1 = require("../commerce/EmptyState");
const StatusPill_1 = require("./StatusPill");
const elevation_1 = require("../primitives/internal/elevation");
const internal_1 = require("./internal");
/**
 * ReceiptView — design variant **V2**: an **elevated paper receipt**. Where V1
 * is a flat bordered card, V2 floats on a shadowed surface, prints a dashed
 * **perforation** strip beneath the header, and wraps the grand total in a
 * primary-tinted **highlighted band** so the amount due reads at a glance across
 * a counter. Item ladder, tenders with derived change, and footer as in V1. An
 * empty item list renders a labelled {@link EmptyState}. Same props as
 * {@link ReceiptViewProps}. Token-only; money is integer cents.
 */
function ReceiptViewV2({ merchant, addressLines, orderNumber, timestamp, items, currency = 'USD', subtotalCents, discountCents, taxCents, tipCents, totalCents, tenders, footer, variant = 'full', emptyLabel = 'No items on this receipt', testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const compact = variant === 'compact';
    const Perforation = () => ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.border, marginVertical: tokens.spacing.sm, fontSize: tokens.typography.scale.sm, letterSpacing: 2 }, children: '– '.repeat(40) }));
    const Row = ({ label, value, tone }) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: tone === 'success' ? colors.success : colors.onSurface, fontSize: tokens.typography.scale.sm }, children: value })] }));
    const tendered = (tenders ?? []).reduce((acc, t) => acc + (0, internal_1.safeCents)(t.amountCents), 0);
    const changeDue = tenders && tenders.length > 0 ? tendered - (0, internal_1.safeCents)(totalCents) : 0;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: testID, style: [
            {
                borderRadius: tokens.radius.lg,
                backgroundColor: colors.surface,
                padding: tokens.spacing.lg,
                ...(0, elevation_1.shadow)('lg', tokens),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', gap: 2 }, children: [merchant ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '800', textAlign: 'center' }, children: merchant })) : null, !compact && addressLines
                        ? addressLines.map((line, i) => ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, textAlign: 'center' }, children: line }, i)))
                        : null, orderNumber || timestamp ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, textAlign: 'center' }, children: [orderNumber ? `#${orderNumber}` : null, timestamp].filter(Boolean).join(' · ') })) : null] }), (0, jsx_runtime_1.jsx)(Perforation, {}), items.length === 0 ? ((0, jsx_runtime_1.jsx)(EmptyState_1.EmptyState, { title: emptyLabel })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: items.map((item, i) => {
                    const qty = item.quantity ?? 1;
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: [qty > 1 ? `${qty}× ` : '', item.name] }), !compact && item.detail ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: item.detail })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: (0, internal_1.formatMoney)(item.amountCents, currency) })] }, i));
                }) })), (0, jsx_runtime_1.jsx)(Perforation, {}), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [typeof subtotalCents === 'number' ? (0, jsx_runtime_1.jsx)(Row, { label: "Subtotal", value: (0, internal_1.formatMoney)(subtotalCents, currency) }) : null, typeof discountCents === 'number' && discountCents > 0 ? ((0, jsx_runtime_1.jsx)(Row, { label: "Discount", value: `−${(0, internal_1.formatMoney)(discountCents, currency)}`, tone: "success" })) : null, typeof taxCents === 'number' ? (0, jsx_runtime_1.jsx)(Row, { label: "Tax", value: (0, internal_1.formatMoney)(taxCents, currency) }) : null, typeof tipCents === 'number' && tipCents > 0 ? (0, jsx_runtime_1.jsx)(Row, { label: "Tip", value: (0, internal_1.formatMoney)(tipCents, currency) }) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: tokens.spacing.sm,
                    paddingVertical: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.md,
                    borderRadius: tokens.radius.md,
                    backgroundColor: (0, internal_1.withAlpha)(colors.primary, 0.12),
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: "Total" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.xl, fontWeight: '800' }, children: (0, internal_1.formatMoney)(totalCents, currency) })] }), tenders && tenders.length > 0 ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs, marginTop: tokens.spacing.sm }, children: [tenders.map((t, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.PAYMENT_METHOD_META[t.method], variant: "inline", size: "sm" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: (0, internal_1.formatMoney)(t.amountCents, currency) })] }, i))), changeDue > 0 ? (0, jsx_runtime_1.jsx)(Row, { label: "Change", value: (0, internal_1.formatMoney)(changeDue, currency) }) : null] })) : null, footer ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, textAlign: 'center', marginTop: tokens.spacing.md }, children: footer })) : null] }));
}
//# sourceMappingURL=ReceiptViewV2.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptView = ReceiptView;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const EmptyState_1 = require("../commerce/EmptyState");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * A token-styled printed-receipt facsimile — pure `View`/`Text`, no printer and
 * no dependency. Header (merchant + address + order ref), item lines, the
 * subtotal / discount / tax / tip / total ladder, tenders with derived change,
 * and a footer. Money is integer **cents** throughout via `formatMoney`. An
 * empty item list renders a labelled {@link EmptyState}. Token-only colors.
 */
function ReceiptView({ merchant, addressLines, orderNumber, timestamp, items, currency = 'USD', subtotalCents, discountCents, taxCents, tipCents, totalCents, tenders, footer, variant = 'full', emptyLabel = 'No items on this receipt', testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const compact = variant === 'compact';
    const rule = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 1, backgroundColor: colors.border, marginVertical: tokens.spacing.sm } }));
    const Row = ({ label, value, strong, tone, }) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: strong ? colors.onSurface : colors.muted,
                    fontSize: strong ? tokens.typography.scale.base : tokens.typography.scale.sm,
                    fontWeight: strong ? '700' : '400',
                }, children: label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: tone === 'success' ? colors.success : strong ? colors.onSurface : colors.onSurface,
                    fontSize: strong ? tokens.typography.scale.base : tokens.typography.scale.sm,
                    fontWeight: strong ? '700' : '400',
                }, children: value })] }));
    const tendered = (tenders ?? []).reduce((acc, t) => acc + (0, internal_1.safeCents)(t.amountCents), 0);
    const changeDue = tenders && tenders.length > 0 ? tendered - (0, internal_1.safeCents)(totalCents) : 0;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: testID, style: [
            {
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
                padding: tokens.spacing.lg,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', gap: 2 }, children: [merchant ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700', textAlign: 'center' }, children: merchant })) : null, !compact && addressLines
                        ? addressLines.map((line, i) => ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, textAlign: 'center' }, children: line }, i)))
                        : null, orderNumber || timestamp ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, textAlign: 'center' }, children: [orderNumber ? `#${orderNumber}` : null, timestamp].filter(Boolean).join(' · ') })) : null] }), rule, items.length === 0 ? ((0, jsx_runtime_1.jsx)(EmptyState_1.EmptyState, { title: emptyLabel })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: items.map((item, i) => {
                    const qty = item.quantity ?? 1;
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: [qty > 1 ? `${qty}× ` : '', item.name] }), !compact && item.detail ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: item.detail })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: (0, internal_1.formatMoney)(item.amountCents, currency) })] }, i));
                }) })), rule, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [typeof subtotalCents === 'number' ? ((0, jsx_runtime_1.jsx)(Row, { label: "Subtotal", value: (0, internal_1.formatMoney)(subtotalCents, currency) })) : null, typeof discountCents === 'number' && discountCents > 0 ? ((0, jsx_runtime_1.jsx)(Row, { label: "Discount", value: `−${(0, internal_1.formatMoney)(discountCents, currency)}`, tone: "success" })) : null, typeof taxCents === 'number' ? (0, jsx_runtime_1.jsx)(Row, { label: "Tax", value: (0, internal_1.formatMoney)(taxCents, currency) }) : null, typeof tipCents === 'number' && tipCents > 0 ? ((0, jsx_runtime_1.jsx)(Row, { label: "Tip", value: (0, internal_1.formatMoney)(tipCents, currency) })) : null, (0, jsx_runtime_1.jsx)(Row, { label: "Total", value: (0, internal_1.formatMoney)(totalCents, currency), strong: true })] }), tenders && tenders.length > 0 ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [rule, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [tenders.map((t, i) => {
                                const meta = internal_1.PAYMENT_METHOD_META[t.method];
                                return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: meta, variant: "inline", size: "sm" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: (0, internal_1.formatMoney)(t.amountCents, currency) })] }, i));
                            }), changeDue > 0 ? (0, jsx_runtime_1.jsx)(Row, { label: "Change", value: (0, internal_1.formatMoney)(changeDue, currency) }) : null] })] })) : null, footer ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, textAlign: 'center', marginTop: tokens.spacing.md }, children: footer })) : null] }));
}
//# sourceMappingURL=ReceiptView.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptViewV4 = ReceiptViewV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const EmptyState_1 = require("../commerce/EmptyState");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * ReceiptView — **V4** "register" design. The tactile checkout take on a printed
 * receipt: a monospace-feel item list, a clean subtotal / discount / tax / tip
 * block, and — after a **dashed tear line** — the **grand total big and bold** in
 * `tabular-nums` weight (the number that closes the sale). Header (merchant +
 * address + order ref), tenders with derived change, and a footer are preserved.
 * Money is integer **cents** throughout via `formatMoney`. An empty item list
 * renders a labelled {@link EmptyState}. Same props/behavior as
 * {@link ReceiptViewProps}; token-only via `useXenitionTheme()`.
 */
function ReceiptViewV4({ merchant, addressLines, orderNumber, timestamp, items, currency = 'USD', subtotalCents, discountCents, taxCents, tipCents, totalCents, tenders, footer, variant = 'full', emptyLabel = 'No items on this receipt', testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const compact = variant === 'compact';
    const mono = 'monospace';
    const rule = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 1, backgroundColor: colors.border, marginVertical: tokens.spacing.sm } }));
    const Row = ({ label, value, tone, }) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, fontFamily: mono }, children: label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: tone === 'success' ? colors.success : colors.onSurface,
                    fontSize: tokens.typography.scale.sm,
                    fontFamily: mono,
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
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', gap: 2 }, children: [merchant ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale.lg,
                            fontWeight: '800',
                            textAlign: 'center',
                            fontFamily: mono,
                            letterSpacing: 1,
                        }, children: merchant.toUpperCase() })) : null, !compact && addressLines
                        ? addressLines.map((line, i) => ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, textAlign: 'center', fontFamily: mono }, children: line }, i)))
                        : null, orderNumber || timestamp ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, textAlign: 'center', fontFamily: mono }, children: [orderNumber ? `#${orderNumber}` : null, timestamp].filter(Boolean).join(' · ') })) : null] }), rule, items.length === 0 ? ((0, jsx_runtime_1.jsx)(EmptyState_1.EmptyState, { title: emptyLabel })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: items.map((item, i) => {
                    const qty = item.quantity ?? 1;
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontFamily: mono }, children: [qty > 1 ? `${qty}× ` : '', item.name] }), !compact && item.detail ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontFamily: mono }, children: item.detail })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontFamily: mono }, children: (0, internal_1.formatMoney)(item.amountCents, currency) })] }, i));
                }) })), rule, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [typeof subtotalCents === 'number' ? ((0, jsx_runtime_1.jsx)(Row, { label: "Subtotal", value: (0, internal_1.formatMoney)(subtotalCents, currency) })) : null, typeof discountCents === 'number' && discountCents > 0 ? ((0, jsx_runtime_1.jsx)(Row, { label: "Discount", value: `−${(0, internal_1.formatMoney)(discountCents, currency)}`, tone: "success" })) : null, typeof taxCents === 'number' ? (0, jsx_runtime_1.jsx)(Row, { label: "Tax", value: (0, internal_1.formatMoney)(taxCents, currency) }) : null, typeof tipCents === 'number' && tipCents > 0 ? ((0, jsx_runtime_1.jsx)(Row, { label: "Tip", value: (0, internal_1.formatMoney)(tipCents, currency) })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    marginVertical: tokens.spacing.md,
                    borderTopWidth: 2,
                    borderStyle: 'dashed',
                    borderColor: colors.border,
                } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '800', fontFamily: mono, letterSpacing: 1 }, children: "TOTAL" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800', fontFamily: mono }, children: (0, internal_1.formatMoney)(totalCents, currency) })] }), tenders && tenders.length > 0 ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [rule, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [tenders.map((t, i) => {
                                const meta = internal_1.PAYMENT_METHOD_META[t.method];
                                return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: meta, variant: "inline", size: "sm" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontFamily: mono }, children: (0, internal_1.formatMoney)(t.amountCents, currency) })] }, i));
                            }), changeDue > 0 ? (0, jsx_runtime_1.jsx)(Row, { label: "Change", value: (0, internal_1.formatMoney)(changeDue, currency) }) : null] })] })) : null, footer ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, textAlign: 'center', marginTop: tokens.spacing.md, fontFamily: mono }, children: footer })) : null] }));
}
//# sourceMappingURL=ReceiptViewV4.js.map
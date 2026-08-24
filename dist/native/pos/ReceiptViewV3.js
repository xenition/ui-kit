"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptViewV3 = ReceiptViewV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const EmptyState_1 = require("../commerce/EmptyState");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * ReceiptView — design variant **V3**: a **minimal, total-first digital
 * receipt**. Where V1/V2 print merchant → items → total top-to-bottom, V3 leads
 * with the grand total as the hero, drops all card chrome, and lists the items
 * and adjustment ladder underneath as quiet supporting text — the shape of an
 * order-confirmation screen rather than a paper slip. An empty item list renders
 * a labelled {@link EmptyState}. Same props as {@link ReceiptViewProps}.
 * Token-only; money is integer cents.
 */
function ReceiptViewV3({ merchant, addressLines, orderNumber, timestamp, items, currency = 'USD', subtotalCents, discountCents, taxCents, tipCents, totalCents, tenders, footer, variant = 'full', emptyLabel = 'No items on this receipt', testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const compact = variant === 'compact';
    const Row = ({ label, value, tone }) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: tone === 'success' ? colors.success : colors.muted, fontSize: tokens.typography.scale.xs }, children: value })] }));
    const tendered = (tenders ?? []).reduce((acc, t) => acc + (0, internal_1.safeCents)(t.amountCents), 0);
    const changeDue = tenders && tenders.length > 0 ? tendered - (0, internal_1.safeCents)(totalCents) : 0;
    const caption = [merchant, orderNumber ? `#${orderNumber}` : null, timestamp].filter(Boolean).join(' · ');
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.md }, style], testID: testID, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600', textTransform: 'uppercase' }, children: "Total" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }, children: (0, internal_1.formatMoney)(totalCents, currency) }), caption ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: caption }) : null, !compact && addressLines
                        ? addressLines.map((line, i) => ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: line }, i)))
                        : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 1, backgroundColor: colors.border } }), items.length === 0 ? ((0, jsx_runtime_1.jsx)(EmptyState_1.EmptyState, { title: emptyLabel })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: items.map((item, i) => {
                    const qty = item.quantity ?? 1;
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, minWidth: 0, color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [qty > 1 ? `${qty}× ` : '', item.name, !compact && item.detail ? ` — ${item.detail}` : ''] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: (0, internal_1.formatMoney)(item.amountCents, currency) })] }, i));
                }) })), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs / 2 }, children: [typeof subtotalCents === 'number' ? (0, jsx_runtime_1.jsx)(Row, { label: "Subtotal", value: (0, internal_1.formatMoney)(subtotalCents, currency) }) : null, typeof discountCents === 'number' && discountCents > 0 ? ((0, jsx_runtime_1.jsx)(Row, { label: "Discount", value: `−${(0, internal_1.formatMoney)(discountCents, currency)}`, tone: "success" })) : null, typeof taxCents === 'number' ? (0, jsx_runtime_1.jsx)(Row, { label: "Tax", value: (0, internal_1.formatMoney)(taxCents, currency) }) : null, typeof tipCents === 'number' && tipCents > 0 ? (0, jsx_runtime_1.jsx)(Row, { label: "Tip", value: (0, internal_1.formatMoney)(tipCents, currency) }) : null] }), tenders && tenders.length > 0 ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [tenders.map((t, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.PAYMENT_METHOD_META[t.method], variant: "inline", size: "sm" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: (0, internal_1.formatMoney)(t.amountCents, currency) })] }, i))), changeDue > 0 ? (0, jsx_runtime_1.jsx)(Row, { label: "Change", value: (0, internal_1.formatMoney)(changeDue, currency) }) : null] })) : null, footer ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: footer }) : null] }));
}
//# sourceMappingURL=ReceiptViewV3.js.map
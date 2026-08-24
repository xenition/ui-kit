"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderTicket = OrderTicket;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Card_1 = require("../primitives/Card");
const Button_1 = require("../primitives/Button");
const EmptyState_1 = require("../commerce/EmptyState");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
const NEXT_LABEL = {
    new: 'Start',
    preparing: 'Ready',
    ready: 'Serve',
    served: 'Done',
    void: 'Void',
};
/**
 * A kitchen / fulfilment order ticket: header (order ref, destination, server,
 * elapsed time) with a **glyph + word** status pill, the item list with
 * modifiers and notes (completed lines struck + muted, state by text not color),
 * and an optional bump button that advances the ticket. An empty ticket renders
 * an {@link EmptyState}. Composed from `Card` + `Button` + `StatusPill`;
 * token-only colors.
 */
function OrderTicket({ orderNumber, destination, server, status, elapsed, items, onBump, bumpLabel, onPress, variant = 'default', emptyLabel = 'No items on this ticket', testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const compact = variant === 'compact';
    const body = ((0, jsx_runtime_1.jsxs)(Card_1.Card, { variant: "outlined", padding: compact ? 'sm' : 'md', style: [{ gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: ["#", orderNumber, destination ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontWeight: '400' }, children: `  ${destination}` }) : null] }), server || elapsed ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [server, elapsed].filter(Boolean).join(' · ') })) : null] }), status ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.TICKET_STATUS_META[status], variant: "soft", size: "sm" }) : null] }), items.length === 0 ? ((0, jsx_runtime_1.jsx)(EmptyState_1.EmptyState, { title: emptyLabel })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: items.map((item, i) => {
                    const qty = item.quantity ?? 1;
                    const itemColor = item.done ? colors.muted : colors.onSurface;
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2, opacity: item.done ? 0.6 : 1 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: {
                                    color: itemColor,
                                    fontSize: tokens.typography.scale.sm,
                                    fontWeight: '600',
                                    textDecorationLine: item.done ? 'line-through' : 'none',
                                }, children: [qty > 1 ? `${qty}× ` : '', item.name] }), !compact && item.modifiers && item.modifiers.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: item.modifiers.join(' · ') })) : null, !compact && item.note ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.warn, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: ["\u26A0 ", item.note] })) : null] }, i));
                }) })), onBump ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", variant: "secondary", onPress: onBump, style: { alignSelf: 'flex-start' }, children: bumpLabel ?? (status ? NEXT_LABEL[status] : 'Bump') })) : null] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Ticket ${orderNumber}${status ? `, ${internal_1.TICKET_STATUS_META[status].label}` : ''}`, onPress: onPress, testID: testID, children: body }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, children: body });
}
//# sourceMappingURL=OrderTicket.js.map
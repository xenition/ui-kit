"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketRowV4 = TicketRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Avatar_1 = require("../primitives/Avatar");
const TicketPriority_1 = require("./TicketPriority");
const internal_1 = require("./internal");
// open → primary, pending → warn, solved → success, closed → muted. Each has a
// distinct glyph so status is never color-only.
const STATUS = {
    open: { slot: 'primary', glyph: '◉', label: 'Open' },
    pending: { slot: 'warn', glyph: '◐', label: 'Pending' },
    solved: { slot: 'success', glyph: '✓', label: 'Solved' },
    closed: { slot: 'muted', glyph: '✕', label: 'Closed' },
};
/**
 * TicketRow — **V4** "console" design. The calm-workspace take on a queue row:
 * an elevated rounded card with a left status-accent bar (the signature at-a-
 * glance cue) and a soft-tint status pill carrying glyph + label. Requester
 * avatar, subject, optional priority chip, updated hint, and an unread badge.
 * Status is encoded by glyph **and** color (never color alone). Same
 * props/behavior as {@link TicketRowProps}; token-only colors via
 * `useXenitionTheme()`. Supports a `loading` skeleton and a `selected` state.
 */
function TicketRowV4({ ticket, onPress, loading = false, selected = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const cardBase = {
        flexDirection: 'row',
        backgroundColor: colors.card,
        borderRadius: tokens.radius.lg,
        borderWidth: 1,
        borderColor: colors.border,
        overflow: 'hidden',
        shadowColor: colors.onSurface,
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 2,
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading ticket", style: [cardBase, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 4, backgroundColor: (0, internal_1.withAlpha)(colors.onSurface, 0.1) } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md, padding: tokens.spacing.md, flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 40, height: 40, borderRadius: 20, backgroundColor: (0, internal_1.withAlpha)(colors.onSurface, 0.1) } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 12, borderRadius: 4, width: '70%', backgroundColor: (0, internal_1.withAlpha)(colors.onSurface, 0.1) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 10, borderRadius: 4, width: '40%', backgroundColor: (0, internal_1.withAlpha)(colors.onSurface, 0.08) } })] })] })] }));
    }
    const spec = STATUS[ticket.status] ?? STATUS.open;
    const statusColor = colors[spec.slot];
    const unread = typeof ticket.unread === 'number' && ticket.unread > 0 ? ticket.unread : 0;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected }, accessibilityLabel: `Ticket: ${ticket.subject}, ${spec.label}${ticket.requester ? `, from ${ticket.requester}` : ''}${unread ? `, ${unread} unread` : ''}`, onPress: onPress ? () => onPress(ticket.id) : undefined, style: ({ pressed }) => [
            cardBase,
            { backgroundColor: selected ? (0, internal_1.withAlpha)(colors.primary, 0.1) : pressed ? (0, internal_1.withAlpha)(colors.onSurface, 0.04) : colors.card },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 4, backgroundColor: statusColor } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md, padding: tokens.spacing.md, flex: 1 }, children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { size: "md", name: ticket.requester, src: ticket.requesterAvatar }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 4 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: ticket.subject }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            gap: 4,
                                            paddingHorizontal: tokens.spacing.sm,
                                            paddingVertical: 2,
                                            borderRadius: tokens.radius.full,
                                            backgroundColor: (0, internal_1.withAlpha)(statusColor, 0.12),
                                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: statusColor, fontSize: tokens.typography.scale.xs }, children: spec.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: statusColor, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: spec.label })] }), ticket.priority ? (0, jsx_runtime_1.jsx)(TicketPriority_1.TicketPriority, { level: ticket.priority, size: "sm" }) : null, ticket.updatedLabel ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ticket.updatedLabel })) : null] })] }), unread ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            minWidth: 20,
                            paddingHorizontal: 6,
                            height: 20,
                            borderRadius: 10,
                            backgroundColor: colors.primary,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onPrimary, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: unread > 99 ? '99+' : unread }) })) : null] })] }));
}
//# sourceMappingURL=TicketRowV4.js.map
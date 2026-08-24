"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketRowV2 = TicketRowV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Avatar_1 = require("../primitives/Avatar");
const Badge_1 = require("../primitives/Badge");
const appearance_1 = require("../primitives/internal/appearance");
const motion_1 = require("../primitives/internal/motion");
const internal_1 = require("./internal");
const STATUS = {
    open: { badge: 'primary', glyph: '◉', label: 'Open' },
    pending: { badge: 'warn', glyph: '◐', label: 'Pending' },
    solved: { badge: 'success', glyph: '✓', label: 'Solved' },
    closed: { badge: 'neutral', glyph: '✕', label: 'Closed' },
};
const PRIORITY = {
    low: { fill: 'muted', text: 'muted', glyph: '▽', label: 'Low' },
    normal: { fill: 'primary', text: 'primaryText', glyph: '▷', label: 'Normal' },
    high: { fill: 'warn', text: 'warnText', glyph: '△', label: 'High' },
    urgent: { fill: 'danger', text: 'dangerText', glyph: '⚑', label: 'Urgent' },
};
function slaFor(status, priority) {
    if (status === 'solved' || status === 'closed')
        return null;
    if (priority === 'urgent')
        return { fill: 'danger', text: 'dangerText', glyph: '⚠', label: 'SLA breached' };
    if (priority === 'high')
        return { fill: 'warn', text: 'warnText', glyph: '◔', label: 'SLA at risk' };
    return { fill: 'success', text: 'successText', glyph: '✓', label: 'SLA on track' };
}
/**
 * TicketRow — **V2 (card)**. A raised card with a priority-tinted left rail, a
 * requester header, a status pill, an SLA chip and an unread badge. Same
 * `TicketRowProps` as {@link TicketRow}; swap the import to restyle. Status /
 * priority / SLA are carried by glyph + text, never color alone; all colors
 * trace to tokens.
 */
function TicketRowV2({ ticket, onPress, loading = false, selected = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const enter = (0, motion_1.useEnter)();
    const card = (children, a11yLabel, onTap) => ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: [
            { opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] },
            { marginVertical: tokens.spacing.xs, marginHorizontal: tokens.spacing.sm },
            style,
        ], children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: onTap ? 'button' : 'none', accessibilityState: { selected }, accessibilityLabel: a11yLabel, onPress: onTap, onPressIn: onTap ? press.onPressIn : undefined, onPressOut: onTap ? press.onPressOut : undefined, style: [
                (0, appearance_1.appearanceStyle)('elevated', colors, tokens),
                {
                    borderRadius: tokens.radius.lg,
                    overflow: 'hidden',
                    padding: tokens.spacing.md,
                    paddingLeft: tokens.spacing.md + 6,
                    backgroundColor: selected ? (0, internal_1.withAlpha)(colors.primary, 0.08) : colors.surface,
                },
            ], children: children }) }));
    if (loading) {
        return card((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading ticket", style: { gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 32, height: 32, borderRadius: 16, backgroundColor: (0, internal_1.withAlpha)(colors.onSurface, 0.1) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 12, width: '50%', borderRadius: 4, backgroundColor: (0, internal_1.withAlpha)(colors.onSurface, 0.1) } })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 14, width: '80%', borderRadius: 4, backgroundColor: (0, internal_1.withAlpha)(colors.onSurface, 0.1) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 10, width: '40%', borderRadius: 4, backgroundColor: (0, internal_1.withAlpha)(colors.onSurface, 0.08) } })] }), 'Loading ticket');
    }
    const status = STATUS[ticket.status] ?? STATUS.open;
    const priority = ticket.priority ? PRIORITY[ticket.priority] : null;
    const sla = slaFor(ticket.status, ticket.priority);
    const railColor = priority ? colors[priority.fill] : colors.border;
    const unread = typeof ticket.unread === 'number' && ticket.unread > 0 ? ticket.unread : 0;
    const a11y = `Ticket: ${ticket.subject}, ${status.label}${priority ? `, priority ${priority.label}` : ''}${sla ? `, ${sla.label}` : ''}${ticket.requester ? `, from ${ticket.requester}` : ''}${unread ? `, ${unread} unread` : ''}`;
    return card((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 6, backgroundColor: railColor } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { size: "sm", name: ticket.requester, src: ticket.requesterAvatar }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: ticket.requester ?? 'Unknown requester' }), (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: status.badge, variant: "soft", size: "sm", children: `${status.glyph} ${status.label}` })] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: ticket.subject }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }, children: [sla ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: tokens.spacing.xs,
                                    backgroundColor: (0, internal_1.withAlpha)(colors[sla.fill], 0.14),
                                    borderRadius: tokens.radius.full,
                                    paddingVertical: 2,
                                    paddingHorizontal: tokens.spacing.sm,
                                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[sla.text], fontSize: tokens.typography.scale.xs }, children: sla.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[sla.text], fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: sla.label })] })) : null, priority ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[priority.text], fontSize: tokens.typography.scale.xs }, children: priority.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[priority.text], fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: priority.label })] })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 } }), ticket.updatedLabel ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ticket.updatedLabel })) : null, unread ? (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "primary", variant: "solid", size: "sm", count: unread }) : null] })] })] }), a11y, onPress ? () => onPress(ticket.id) : undefined);
}
//# sourceMappingURL=TicketRowV2.js.map
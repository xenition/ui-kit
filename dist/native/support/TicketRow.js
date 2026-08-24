"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketRow = TicketRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Avatar_1 = require("../primitives/Avatar");
const TicketPriority_1 = require("./TicketPriority");
const internal_1 = require("./internal");
// open → primary, pending → warn, solved → success, closed → muted. Each has a
// distinct glyph so status is not color-only.
const STATUS = {
    open: { slot: 'primary', glyph: '◉', label: 'Open' },
    pending: { slot: 'warn', glyph: '◐', label: 'Pending' },
    solved: { slot: 'success', glyph: '✓', label: 'Solved' },
    closed: { slot: 'muted', glyph: '✕', label: 'Closed' },
};
/**
 * A single ticket row for a helpdesk queue/inbox — requester avatar, subject,
 * a glyph+label status marker, an optional priority chip, an updated-time hint,
 * and an unread badge. Tapping fires `onPress(id)`. Status is encoded by glyph
 * **and** text (not color alone). Supports a `loading` skeleton and a
 * `selected` state. Colors come only from `SemanticColors`/token tints — no
 * literal hex.
 */
function TicketRow({ ticket, onPress, loading = false, selected = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "none", accessibilityLabel: "Loading ticket", style: [
                {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.md,
                    padding: tokens.spacing.md,
                    borderBottomColor: colors.border,
                    borderBottomWidth: 1,
                },
                style,
            ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 40, height: 40, borderRadius: 20, backgroundColor: (0, internal_1.withAlpha)(colors.onSurface, 0.1) } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 12, borderRadius: 4, width: '70%', backgroundColor: (0, internal_1.withAlpha)(colors.onSurface, 0.1) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 10, borderRadius: 4, width: '40%', backgroundColor: (0, internal_1.withAlpha)(colors.onSurface, 0.08) } })] })] }));
    }
    const spec = STATUS[ticket.status] ?? STATUS.open;
    const statusColor = colors[spec.slot];
    const unread = typeof ticket.unread === 'number' && ticket.unread > 0 ? ticket.unread : 0;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected }, accessibilityLabel: `Ticket: ${ticket.subject}, ${spec.label}${ticket.requester ? `, from ${ticket.requester}` : ''}${unread ? `, ${unread} unread` : ''}`, onPress: onPress ? () => onPress(ticket.id) : undefined, style: ({ pressed }) => [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                padding: tokens.spacing.md,
                borderBottomColor: colors.border,
                borderBottomWidth: 1,
                backgroundColor: selected
                    ? (0, internal_1.withAlpha)(colors.primary, 0.1)
                    : pressed
                        ? (0, internal_1.withAlpha)(colors.onSurface, 0.04)
                        : 'transparent',
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { size: "md", name: ticket.requester, src: ticket.requesterAvatar }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: ticket.subject }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: statusColor, fontSize: tokens.typography.scale.xs }, children: spec.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: statusColor, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: spec.label })] }), ticket.priority ? (0, jsx_runtime_1.jsx)(TicketPriority_1.TicketPriority, { level: ticket.priority, size: "sm" }) : null, ticket.updatedLabel ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ticket.updatedLabel })) : null] })] }), unread ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    minWidth: 20,
                    paddingHorizontal: 6,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: colors.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onPrimary, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: unread > 99 ? '99+' : unread }) })) : null] }));
}
//# sourceMappingURL=TicketRow.js.map
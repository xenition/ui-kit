"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketRowV3 = TicketRowV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const StatusDot_1 = require("../primitives/StatusDot");
const internal_1 = require("./internal");
const STATUS = {
    open: { dot: 'primary', glyph: '◉', label: 'Open' },
    pending: { dot: 'warn', glyph: '◐', label: 'Pending' },
    solved: { dot: 'success', glyph: '✓', label: 'Solved' },
    closed: { dot: 'muted', glyph: '✕', label: 'Closed' },
};
const PRIORITY = {
    low: { text: 'muted', glyph: '▽', label: 'Low' },
    normal: { text: 'primaryText', glyph: '▷', label: 'Normal' },
    high: { text: 'warnText', glyph: '△', label: 'High' },
    urgent: { text: 'dangerText', glyph: '⚑', label: 'Urgent' },
};
/**
 * TicketRow — **V3 (dense line)**. A single-line queue row: a status dot,
 * a truncated subject, a priority glyph, an updated-time hint and an unread
 * count — no avatar, minimal padding, built for long scannable lists. Same
 * `TicketRowProps` as {@link TicketRow}. Status/priority carried by glyph +
 * text; token colors only.
 */
function TicketRowV3({ ticket, onPress, loading = false, selected = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading ticket", style: [
                {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.sm,
                    paddingVertical: tokens.spacing.xs,
                    paddingHorizontal: tokens.spacing.md,
                    borderBottomColor: colors.border,
                    borderBottomWidth: 1,
                },
                style,
            ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 8, height: 8, borderRadius: 4, backgroundColor: (0, internal_1.withAlpha)(colors.onSurface, 0.12) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, height: 12, borderRadius: 4, backgroundColor: (0, internal_1.withAlpha)(colors.onSurface, 0.1) } })] }));
    }
    const status = STATUS[ticket.status] ?? STATUS.open;
    const priority = ticket.priority ? PRIORITY[ticket.priority] : null;
    const unread = typeof ticket.unread === 'number' && ticket.unread > 0 ? ticket.unread : 0;
    const a11y = `Ticket: ${ticket.subject}, ${status.label}${priority ? `, priority ${priority.label}` : ''}${unread ? `, ${unread} unread` : ''}`;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected }, accessibilityLabel: a11y, onPress: onPress ? () => onPress(ticket.id) : undefined, style: ({ pressed }) => [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.xs + 2,
                paddingHorizontal: tokens.spacing.md,
                borderBottomColor: colors.border,
                borderBottomWidth: 1,
                backgroundColor: selected
                    ? (0, internal_1.withAlpha)(colors.primary, 0.1)
                    : pressed
                        ? (0, internal_1.withAlpha)(colors.onSurface, 0.04)
                        : 'transparent',
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(StatusDot_1.StatusDot, { tone: status.dot, pulse: ticket.status === 'open', size: 8 }), priority ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[priority.text], fontSize: tokens.typography.scale.sm }, children: priority.glyph })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                    flex: 1,
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: unread ? '700' : '500',
                }, children: ticket.subject }), ticket.updatedLabel ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ticket.updatedLabel })) : null, unread ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    minWidth: 18,
                    paddingHorizontal: 5,
                    height: 18,
                    borderRadius: 9,
                    backgroundColor: colors.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onPrimary, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: unread > 99 ? '99+' : unread }) })) : null] }));
}
//# sourceMappingURL=TicketRowV3.js.map
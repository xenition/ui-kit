"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketDetailHeader = TicketDetailHeader;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Avatar_1 = require("../primitives/Avatar");
const GradientSurface_1 = require("./internal/GradientSurface");
const console_1 = require("./internal/console");
/** Status glyph + label for the frosted status tile — status is never color-only. */
const STATUS_META = {
    open: { glyph: '◉', label: 'Open' },
    pending: { glyph: '◐', label: 'Pending' },
    solved: { glyph: '✓', label: 'Solved' },
    closed: { glyph: '✕', label: 'Closed' },
};
/** Priority glyph + label for the frosted priority tile. */
const PRIORITY_META = {
    low: { glyph: '▽', label: 'Low' },
    normal: { glyph: '▷', label: 'Normal' },
    high: { glyph: '△', label: 'High' },
    urgent: { glyph: '⚑', label: 'Urgent' },
};
/**
 * TicketDetailHeader — the gradient "console" hero shown when an agent opens a
 * ticket. The one saturated surface at the top of the detail view: the subject
 * reads as big near-white ink over the console gradient, with the ticket id,
 * status, optional priority, and SLA countdown carried on frosted tiles. A
 * requester row (avatar + requester → assignee), optional tag chips, and a
 * near-white primary "Solve" pill beside a ghost "Assign" button complete it.
 * Status/priority/SLA carry a glyph so meaning is never color-only.
 * Presentational — shaped data + callbacks only; every color derives from the
 * compiled theme ramps (token-only, no literals), light + dark safe.
 */
function TicketDetailHeader({ subject, ticketId, status, priority, requester, requesterAvatar, assignee, slaLabel, slaBreached = false, tags, onSolve, solveLabel = 'Solve', onAssign, assignLabel = 'Assign', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const r = tokens.ramps;
    const ink = (0, console_1.consoleInk)(r);
    const inkSoft = (0, console_1.consoleInkSoft)(r);
    const statusMeta = STATUS_META[status] ?? STATUS_META.open;
    const priorityMeta = priority ? PRIORITY_META[priority] : undefined;
    const Tile = ({ glyph, label, a11yLabel }) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "text", accessibilityLabel: a11yLabel, style: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.xs,
            paddingHorizontal: tokens.spacing.md,
            paddingVertical: tokens.spacing.xs,
            borderRadius: tokens.radius.full,
            backgroundColor: (0, console_1.consoleTile)(r),
            borderWidth: 1,
            borderColor: (0, console_1.consoleBorder)(r),
        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: ink, fontSize: tokens.typography.scale.sm }, children: glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: label })] }));
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ borderRadius: tokens.radius.lg }, style], children: (0, jsx_runtime_1.jsxs)(GradientSurface_1.GradientSurface, { colors: (0, console_1.consoleGradient)(r), style: { borderRadius: tokens.radius.lg, padding: tokens.spacing.lg, overflow: 'hidden', gap: tokens.spacing.lg }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: ticketId }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale['2xl'], fontWeight: '800', letterSpacing: -0.5 }, children: subject })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(Tile, { glyph: statusMeta.glyph, label: statusMeta.label, a11yLabel: `Status ${statusMeta.label}` }), priorityMeta ? ((0, jsx_runtime_1.jsx)(Tile, { glyph: priorityMeta.glyph, label: priorityMeta.label, a11yLabel: `Priority ${priorityMeta.label}` })) : null, slaLabel ? ((0, jsx_runtime_1.jsx)(Tile, { glyph: slaBreached ? '⚠' : '⏱', label: slaLabel, a11yLabel: slaBreached ? `SLA breached, ${slaLabel}` : `SLA, ${slaLabel}` })) : null] }), requester || assignee ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { size: "md", name: requester, src: requesterAvatar }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: [requester ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: ink, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: requester })) : null, assignee ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: inkSoft, fontSize: tokens.typography.scale.sm }, children: `Assigned to ${assignee}` })) : null] })] })) : null, tags && tags.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Tags", style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }, children: tags.map((tag) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            paddingHorizontal: tokens.spacing.sm,
                            paddingVertical: 2,
                            borderRadius: tokens.radius.full,
                            backgroundColor: (0, console_1.consoleTile)(r),
                            borderWidth: 1,
                            borderColor: (0, console_1.consoleBorder)(r),
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: tag }) }, tag))) })) : null, onSolve || onAssign ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [onSolve ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: solveLabel, onPress: onSolve, style: ({ pressed }) => ({
                                flex: 1,
                                minHeight: 44,
                                paddingVertical: tokens.spacing.md,
                                paddingHorizontal: tokens.spacing.lg,
                                borderRadius: tokens.radius.md,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: ink,
                                opacity: pressed ? 0.9 : 1,
                            }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.base, fontWeight: '800' }, children: solveLabel }) })) : null, onAssign ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: assignLabel, onPress: onAssign, style: ({ pressed }) => ({
                                flex: 1,
                                minHeight: 44,
                                paddingVertical: tokens.spacing.md,
                                paddingHorizontal: tokens.spacing.lg,
                                borderRadius: tokens.radius.md,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderWidth: 1,
                                borderColor: (0, console_1.consoleBorder)(r),
                                opacity: pressed ? 0.85 : 1,
                            }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: assignLabel }) })) : null] })) : null] }) }));
}
//# sourceMappingURL=TicketDetailHeader.js.map
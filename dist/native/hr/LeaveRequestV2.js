"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveRequestV2 = LeaveRequestV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/** Map a leave status onto the 3-step approval timeline's active index. */
function timelineStep(status) {
    if (status === 'pending')
        return 1;
    return 2; // approved / denied / cancelled are all decided
}
/**
 * LeaveRequest, design **V2** — a card built around an explicit date-range block
 * and a 3-step approval timeline (Requested → In review → Decided). The range
 * renders as two dated columns joined by an arrow with the day-count between;
 * status is a glyph + word pill (never color alone). When `actionable` and still
 * `pending`, approve / deny buttons show; otherwise the approver is named. Same
 * Props as {@link LeaveRequest}. Elevated + mount-fade, token-pure.
 */
function LeaveRequestV2({ type, startDate, endDate, days, status, employeeName, employeeAvatarUrl, approver, reason, actionable = false, onApprove, onDeny, onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)();
    const typeMeta = internal_1.LEAVE_TYPE_META[type];
    const statusMeta = internal_1.LEAVE_STATUS_META[status];
    const showActions = actionable && status === 'pending';
    const hasEnd = !!endDate && endDate !== startDate;
    const steps = [
        { title: 'Requested' },
        { title: 'In review' },
        { title: status === 'denied' ? 'Denied' : status === 'cancelled' ? 'Cancelled' : 'Approved' },
    ];
    const card = ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { style: [
            {
                opacity: enter.opacity,
                transform: enter.transform,
                borderRadius: tokens.radius.lg,
                backgroundColor: colors.surface,
                padding: tokens.spacing.md,
                gap: tokens.spacing.sm,
                ...(0, elevation_1.shadow)('md', tokens),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flex: 1, minWidth: 0 }, children: [employeeName ? (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "sm", name: employeeName, src: employeeAvatarUrl }) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: 2 }, children: [employeeName ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: employeeName })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.sm }, children: typeMeta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: typeMeta.label })] })] })] }), (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: statusMeta, size: "sm" })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: tokens.spacing.sm,
                    padding: tokens.spacing.sm,
                    borderRadius: tokens.radius.md,
                    backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.06),
                }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "From" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: startDate })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: (0, internal_1.toneColor)(colors, 'primary'), fontSize: tokens.typography.scale.base }, children: "\u2192" }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: [days, " day", days === 1 ? '' : 's'] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, alignItems: 'flex-end' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "To" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: hasEnd ? endDate : startDate })] })] }), (0, jsx_runtime_1.jsx)(primitives_1.Steps, { steps: steps, current: timelineStep(status) }), reason ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: reason })) : null, showActions ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", tone: "success", onPress: onApprove, style: { flex: 1 }, children: "Approve" }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "outline", tone: "danger", onPress: onDeny, style: { flex: 1 }, children: "Deny" })] })) : approver && (status === 'approved' || status === 'denied') ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [status === 'approved' ? 'Approved' : 'Denied', " by ", approver] })) : null] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Leave request, ${typeMeta.label}, ${statusMeta.label}`, onPress: onPress, testID: testID, children: card }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, children: card });
}
//# sourceMappingURL=LeaveRequestV2.js.map
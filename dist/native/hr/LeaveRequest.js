"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveRequest = LeaveRequest;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * A leave / time-off request: type, date range, day count and approval status.
 * Status is a glyph + word pill (pending → warn, approved → success, denied →
 * danger) so it never rests on color alone. When `actionable` and still
 * `pending`, approve / deny buttons render for a manager's queue; once decided
 * the approver is shown instead. All colors are theme tokens — no literals.
 */
function LeaveRequest({ type, startDate, endDate, days, status, employeeName, employeeAvatarUrl, approver, reason, actionable = false, variant = 'default', onApprove, onDeny, onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const compact = variant === 'compact';
    const typeMeta = internal_1.LEAVE_TYPE_META[type];
    const range = endDate && endDate !== startDate ? `${startDate} – ${endDate}` : startDate;
    const showActions = actionable && status === 'pending';
    const body = ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { variant: "outlined", padding: compact ? 'sm' : 'md', style: [{ gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flex: 1 }, children: [employeeName ? (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "sm", name: employeeName, src: employeeAvatarUrl }) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [employeeName ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: employeeName })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.sm }, children: typeMeta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: typeMeta.label })] })] })] }), (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.LEAVE_STATUS_META[status], size: "sm" })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: range }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: [days, " day", days === 1 ? '' : 's'] })] }), !compact && reason ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: reason })) : null, showActions ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", tone: "success", onPress: onApprove, style: { flex: 1 }, children: "Approve" }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "outline", tone: "danger", onPress: onDeny, style: { flex: 1 }, children: "Deny" })] })) : approver && (status === 'approved' || status === 'denied') ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [status === 'approved' ? 'Approved' : 'Denied', " by ", approver] })) : null] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Leave request, ${typeMeta.label}, ${internal_1.LEAVE_STATUS_META[status].label}`, onPress: onPress, testID: testID, children: body }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, children: body });
}
//# sourceMappingURL=LeaveRequest.js.map
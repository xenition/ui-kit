"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveRequestV3 = LeaveRequestV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const motion_1 = require("../primitives/internal/motion");
const internal_1 = require("./internal");
/**
 * LeaveRequest, design **V3** — a dense single line for tight queues. A leading
 * tone status-dot (paired with the status word for a11y — never color alone),
 * the leave type + date range, and the day-count pinned right. Same Props as
 * {@link LeaveRequest}; approve/deny chrome is intentionally dropped in favour
 * of a tappable row. Press-scales on tap; token-pure.
 */
function LeaveRequestV3({ type, startDate, endDate, days, status, employeeName, onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const typeMeta = internal_1.LEAVE_TYPE_META[type];
    const statusMeta = internal_1.LEAVE_STATUS_META[status];
    const range = endDate && endDate !== startDate ? `${startDate} – ${endDate}` : startDate;
    const row = ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { style: [
            {
                transform: [{ scale: press.scale }],
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.sm,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
                backgroundColor: colors.surface,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: statusMeta.label, style: { width: 10, height: 10, borderRadius: tokens.radius.full, backgroundColor: (0, internal_1.toneColor)(colors, statusMeta.tone) } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.sm }, children: typeMeta.glyph }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: [typeMeta.label, employeeName ? ` · ${employeeName}` : ''] })] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: range })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: [days, "d"] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: statusMeta.label })] })] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Leave request, ${typeMeta.label}, ${statusMeta.label}`, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, testID: testID, children: row }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, children: row });
}
//# sourceMappingURL=LeaveRequestV3.js.map
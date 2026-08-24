"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleRow = ScheduleRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const STATUS_LABEL = {
    scheduled: '',
    live: 'Live now',
    ended: 'Ended',
    cancelled: 'Cancelled',
};
const STATUS_TONE = {
    scheduled: 'muted',
    live: 'success',
    ended: 'muted',
    cancelled: 'danger',
};
/**
 * A single row of a day schedule — a time gutter, an accent track rail, and the
 * title/room details, with an optional status caption. Designed to stack into a
 * printed-timetable feel. The status is always spelled out in words (never
 * color alone). Colors come from the compiled theme tokens; no literal colors.
 */
function ScheduleRow({ time, endTime, title, room, track, status = 'scheduled', onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const statusLabel = STATUS_LABEL[status];
    const isCancelled = status === 'cancelled';
    const content = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'stretch', gap: tokens.spacing.md, paddingVertical: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { width: tokens.spacing['2xl'] + tokens.spacing.lg, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: time }), endTime ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: endTime })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 3, borderRadius: tokens.radius.full, backgroundColor: track ? colors.primary : colors.border } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: {
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale.base,
                            fontWeight: '600',
                            textDecorationLine: isCancelled ? 'line-through' : 'none',
                        }, children: title }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }, children: [track ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: track })) : null, room ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: room })) : null, statusLabel ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[STATUS_TONE[status]], fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: statusLabel })) : null] })] })] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${time} ${title}`, onPress: onPress, style: ({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }, style], children: content }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: style, children: content });
}
//# sourceMappingURL=ScheduleRow.js.map
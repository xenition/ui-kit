"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimesheetRow = TimesheetRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * One timesheet entry: date, hours worked (formatted `Hh Mm`), optional clock
 * in/out and project, plus an approval-status pill (glyph + word, never color
 * alone). Overtime is surfaced as a labelled word (`+Xh OT`) rather than only a
 * color. `compact` shows just date + hours + status. All colors are theme
 * tokens — no literals.
 */
function TimesheetRow({ date, hours, status, clockIn, clockOut, project, overtimeHours = 0, variant = 'default', onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const compact = variant === 'compact';
    const clock = clockIn && clockOut ? `${clockIn} – ${clockOut}` : clockIn ?? clockOut;
    const hasOvertime = Number.isFinite(overtimeHours) && overtimeHours > 0;
    const content = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.sm,
                borderRadius: tokens.radius.md,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: date }), !compact ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [clock, project].filter(Boolean).join('  ·  ') || '—' })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: (0, internal_1.formatHours)(hours) }), hasOvertime ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: (0, internal_1.toneColor)(colors, 'warn'), fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: ["+", (0, internal_1.formatHours)(overtimeHours), " OT"] })) : null] }), status ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.TIMESHEET_STATUS_META[status], size: "sm" }) : null] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Timesheet ${date}, ${(0, internal_1.formatHours)(hours)}`, onPress: onPress, testID: testID, children: content }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, children: content });
}
//# sourceMappingURL=TimesheetRow.js.map
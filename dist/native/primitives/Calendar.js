"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calendar = Calendar;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];
function sameDay(a, b) {
    return (a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate());
}
/**
 * Static month grid — a display calendar distinct from the booking
 * `BookingCalendar` and the `DatePicker` field. Renders a header with
 * prev/next chevrons, a weekday row, and a 6×7 day grid; the selected day is
 * filled with `colors.primary` and marked days get an accent dot. All colors
 * and spacing come from the compiled theme tokens via `useXenitionTheme()` —
 * no literal colors.
 */
function Calendar({ month, selected, marks = [], onSelectDate, onMonthChange, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const base = month ?? new Date();
    const year = base.getFullYear();
    const monthIndex = base.getMonth();
    const today = new Date();
    const firstWeekday = new Date(year, monthIndex, 1).getDay();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    // 6 rows × 7 columns; leading blanks then the days.
    const cells = [];
    for (let i = 0; i < firstWeekday; i += 1)
        cells.push(null);
    for (let d = 1; d <= daysInMonth; d += 1)
        cells.push(d);
    while (cells.length % 7 !== 0)
        cells.push(null);
    const goMonth = (delta) => {
        onMonthChange?.(new Date(year, monthIndex + delta, 1));
    };
    const isMarked = (day) => marks.some((m) => sameDay(m, new Date(year, monthIndex, day)));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "none", style: [
            {
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: tokens.radius.md,
                padding: tokens.spacing.md,
                backgroundColor: colors.surface,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: tokens.spacing.sm,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Previous month", onPress: () => goMonth(-1), style: { padding: tokens.spacing.xs }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primaryText, fontSize: tokens.typography.scale.lg }, children: "\u2039" }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: `${MONTHS[monthIndex] ?? ''} ${year}` }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Next month", onPress: () => goMonth(1), style: { padding: tokens.spacing.xs }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primaryText, fontSize: tokens.typography.scale.lg }, children: "\u203A" }) })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row' }, children: WEEKDAYS.map((w) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, alignItems: 'center', paddingVertical: tokens.spacing.xs }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '500' }, children: w }) }, w))) }), Array.from({ length: cells.length / 7 }).map((_, row) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row' }, children: cells.slice(row * 7, row * 7 + 7).map((day, col) => {
                    if (day == null) {
                        return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, aspectRatio: 1 } }, col);
                    }
                    const cellDate = new Date(year, monthIndex, day);
                    const isSelected = selected != null && sameDay(selected, cellDate);
                    const isToday = sameDay(today, cellDate);
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${MONTHS[monthIndex] ?? ''} ${day}, ${year}`, accessibilityState: { selected: isSelected }, onPress: () => onSelectDate?.(cellDate), style: { flex: 1, aspectRatio: 1, alignItems: 'center', justifyContent: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    width: tokens.spacing.xl + tokens.spacing.xs,
                                    height: tokens.spacing.xl + tokens.spacing.xs,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: tokens.radius.full,
                                    backgroundColor: isSelected ? colors.primary : 'transparent',
                                    borderWidth: isToday && !isSelected ? 1 : 0,
                                    borderColor: colors.border,
                                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                        color: isSelected ? colors.onPrimary : colors.onSurface,
                                        fontSize: tokens.typography.scale.sm,
                                        fontWeight: isSelected ? '700' : '400',
                                    }, children: day }) }), isMarked(day) ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    position: 'absolute',
                                    bottom: tokens.spacing.xs / 2,
                                    width: tokens.spacing.xs,
                                    height: tokens.spacing.xs,
                                    borderRadius: tokens.radius.full,
                                    backgroundColor: isSelected ? colors.onPrimary : colors.accent,
                                } })) : null] }, col));
                }) }, row)))] }));
}
//# sourceMappingURL=Calendar.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarStrip = CalendarStrip;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const format_1 = require("./format");
function buildDates(startDate, count) {
    const n = Math.max(1, Math.floor(count));
    return Array.from({ length: n }, (_, i) => {
        const d = new Date(startDate);
        d.setDate(startDate.getDate() + i);
        return d;
    });
}
/**
 * A horizontally-scrolling week/day strip — a compact date picker for browsing
 * an event schedule. Each pill shows the weekday, day number and (on month
 * boundaries) the month, with a dot for marked days. The selected day is filled
 * with `primary` and also carries `accessibilityState.selected`. Colors come
 * from the compiled theme tokens; no literal colors.
 */
function CalendarStrip({ startDate, days = 14, dates, selected, marks = [], onSelectDate, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const list = dates && dates.length > 0 ? dates : buildDates(startDate ?? new Date(), days);
    const isMarked = (d) => marks.some((m) => (0, format_1.sameDay)(m, d));
    return ((0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, accessibilityRole: "tablist", contentContainerStyle: { gap: tokens.spacing.sm, paddingHorizontal: tokens.spacing.xs }, style: style, children: list.map((date, i) => {
            const isSelected = selected != null && (0, format_1.sameDay)(selected, date);
            const showMonth = i === 0 || date.getDate() === 1;
            return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "tab", accessibilityState: { selected: isSelected }, accessibilityLabel: `${(0, format_1.weekdayLabel)(date)} ${(0, format_1.monthLabel)(date)} ${date.getDate()}`, onPress: () => onSelectDate?.(date), style: ({ pressed }) => ({
                    alignItems: 'center',
                    minWidth: tokens.spacing['2xl'] + tokens.spacing.lg,
                    paddingVertical: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.sm,
                    borderRadius: tokens.radius.md,
                    borderWidth: 1,
                    borderColor: isSelected ? colors.primary : colors.border,
                    backgroundColor: isSelected ? colors.primary : pressed ? tokens.ramps.neutral[50] : colors.surface,
                }), children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: isSelected ? colors.onPrimary : colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: (0, format_1.weekdayLabel)(date) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: isSelected ? colors.onPrimary : colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '800' }, children: date.getDate() }), showMonth ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: isSelected ? colors.onPrimary : colors.muted, fontSize: tokens.typography.scale.xs }, children: (0, format_1.monthLabel)(date) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.spacing.sm, justifyContent: 'center' }, children: isMarked(date) ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: tokens.spacing.xs, height: tokens.spacing.xs, borderRadius: tokens.radius.full, backgroundColor: isSelected ? colors.onPrimary : colors.accent } })) : null }))] }, date.toISOString()));
        }) }));
}
//# sourceMappingURL=CalendarStrip.js.map
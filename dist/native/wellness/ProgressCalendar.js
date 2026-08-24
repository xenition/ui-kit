"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressCalendar = ProgressCalendar;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const TONE_KEY = {
    primary: 'primary',
    accent: 'accent',
    success: 'success',
};
const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const LEVEL_ALPHA = [0, 0.28, 0.6, 1];
/**
 * A month completion calendar: a weekday header and a 7-column grid of day
 * cells tinted by a 0–3 completion `level` (a soft heatmap), with today's cell
 * ringed. Completion is conveyed by fill density plus the a11y label, never
 * color alone; leading blanks come from `startWeekday`. Empty `days` shows a
 * note. Token-only colors (semantic slots + a `withAlpha` tint).
 */
function ProgressCalendar({ title, days, startWeekday = 0, tone = 'primary', showWeekdays = true, onSelectDay, emptyLabel = 'No activity this month.', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const accent = colors[TONE_KEY[tone] ?? 'primary'];
    const containerStyle = {
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.lg,
        gap: tokens.spacing.sm,
    };
    if (days.length === 0) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: emptyLabel, style: [containerStyle, style], children: [title ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyLabel })] }));
    }
    // Build a flat cell list: leading blanks, then one cell per day.
    const lead = ((startWeekday % 7) + 7) % 7;
    const cells = [
        ...Array.from({ length: lead }, () => null),
        ...days,
    ];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [containerStyle, style], children: [title ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title })) : null, showWeekdays ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row' }, children: WEEKDAYS.map((w, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, alignItems: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: w }) }, i))) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap' }, children: cells.map((cell, i) => {
                    if (cell == null) {
                        return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: `${100 / 7}%`, aspectRatio: 1, padding: 2 } }, `blank-${i}`);
                    }
                    const level = Math.min(Math.max(cell.level ?? 0, 0), 3);
                    const alpha = LEVEL_ALPHA[level] ?? 0;
                    const filled = level > 0;
                    const bg = filled ? (0, color_1.withAlpha)(accent, alpha) : (0, color_1.withAlpha)(colors.muted, 0.1);
                    const fg = level >= 2 ? colors.onPrimary : colors.onSurface;
                    const label = `Day ${cell.day}, ${level === 0 ? 'no activity' : `level ${level}`}${cell.today ? ', today' : ''}`;
                    const inner = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            flex: 1,
                            borderRadius: tokens.radius.sm,
                            backgroundColor: bg,
                            borderWidth: cell.today ? 2 : 0,
                            borderColor: cell.today ? accent : 'transparent',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: fg, fontSize: tokens.typography.scale.xs }, children: cell.day }) }));
                    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: `${100 / 7}%`, aspectRatio: 1, padding: 2 }, children: onSelectDay ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, onPress: () => onSelectDay(cell), style: ({ pressed }) => ({ flex: 1, opacity: pressed ? 0.7 : 1 }), children: inner })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: label, style: { flex: 1 }, children: inner })) }, `day-${cell.day}-${i}`));
                }) })] }));
}
//# sourceMappingURL=ProgressCalendar.js.map
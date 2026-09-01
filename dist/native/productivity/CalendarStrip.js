"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarStrip = CalendarStrip;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
/** A single day cell — a radio within the strip's radiogroup. */
function DayCell({ day, selected, onSelect, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const count = day.count ?? 0;
    const weekdayColor = selected ? colors.onPrimary : colors.mutedText;
    const numeralColor = selected ? colors.onPrimary : colors.onSurface;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected }, accessibilityLabel: `${day.weekday} ${day.label}${count > 0 ? `, ${count} tasks` : ''}${day.today ? ', today' : ''}`, onPress: () => onSelect?.(day.date), disabled: !onSelect, style: ({ pressed }) => ({
            minWidth: 44,
            minHeight: 64,
            alignItems: 'center',
            justifyContent: 'center',
            gap: tokens.spacing.xs,
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.sm,
            borderRadius: tokens.radius.md,
            backgroundColor: selected ? colors.primary : colors.surface,
            borderWidth: !selected && day.today ? 2 : 0,
            borderColor: !selected && day.today ? colors.primary : 'transparent',
            opacity: pressed && !selected ? 0.7 : 1,
        }), children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: weekdayColor,
                    fontSize: tokens.typography.scale.xs,
                    fontWeight: '600',
                    textTransform: 'uppercase',
                }, children: day.weekday }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: numeralColor, fontSize: tokens.typography.scale.xl, fontWeight: '700' }, children: day.label }), count > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    minWidth: 18,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: tokens.spacing.xs,
                    borderRadius: tokens.radius.full,
                    backgroundColor: selected ? (0, color_1.withAlpha)(colors.onPrimary, 0.24) : (0, color_1.withAlpha)(colors.primary, 0.14),
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                        color: selected ? colors.onPrimary : colors.primaryText,
                        fontSize: tokens.typography.scale.xs,
                        fontWeight: '700',
                    }, children: count }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 18 } }))] }));
}
/**
 * CalendarStrip — **V4** "flow" week strip (native twin of the web component). A
 * horizontally-scrolling row of calm day cells: a weekday letter over a **big
 * date numeral**, with a soft-primary count badge for days that carry tasks.
 * One accent throughout — the **selected** day fills solid primary, **today**
 * wears a primary ring. Cells are ≥44px tap targets and expose a `radiogroup`
 * so a screen reader announces the chosen day. Presentational only. Token-only
 * colors via `useXenitionTheme()` — no literals.
 */
function CalendarStrip({ days, selectedDate, onSelect, label = 'Select a day', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const items = Array.isArray(days) ? days : [];
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "radiogroup", accessibilityLabel: label, style: [{ borderRadius: tokens.radius.lg, backgroundColor: colors.card }, style], children: (0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, contentContainerStyle: { gap: tokens.spacing.sm, padding: tokens.spacing.sm }, children: items.map((day) => ((0, jsx_runtime_1.jsx)(DayCell, { day: day, selected: selectedDate === day.date, onSelect: onSelect }, day.date))) }) }));
}
//# sourceMappingURL=CalendarStrip.js.map
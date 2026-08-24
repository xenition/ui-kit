"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForecastStripV2 = ForecastStripV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const motion_1 = require("../primitives/internal/motion");
const Icon_1 = require("../primitives/Icon");
const weather_utils_1 = require("./weather-utils");
function tempRange(days) {
    const temps = [];
    for (const d of days) {
        if (d.high != null)
            temps.push(d.high);
        if (d.low != null)
            temps.push(d.low);
    }
    if (temps.length === 0)
        return { min: 0, max: 1 };
    const min = Math.min(...temps);
    const max = Math.max(...temps);
    return { min, max: max === min ? min + 1 : max };
}
/** One large tappable day card — hook-per-card lives in its own component. */
function DayCard({ day, index, unit, range, selected, onSelectDay, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const label = (0, weather_utils_1.conditionLabel)(day.condition);
    const glyph = (0, weather_utils_1.conditionGlyph)(day.condition);
    const span = range.max - range.min;
    const lowPct = day.low != null ? (day.low - range.min) / span : 0;
    const highPct = day.high != null ? (day.high - range.min) / span : 1;
    const barLeft = `${Math.max(0, Math.min(1, lowPct)) * 100}%`;
    const barWidth = `${Math.max(0.08, Math.min(1, highPct - lowPct)) * 100}%`;
    const a11y = `${day.label}, ${label}${day.high != null ? `, high ${day.high}${unit}` : ''}${day.low != null ? `, low ${day.low}${unit}` : ''}${day.precip != null ? `, ${day.precip}% precipitation` : ''}`;
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            width: 108,
            alignItems: 'center',
            gap: tokens.spacing.sm,
            paddingVertical: tokens.spacing.md,
            paddingHorizontal: tokens.spacing.sm,
            borderRadius: tokens.radius.lg,
            borderWidth: selected ? 2 : 1,
            borderColor: selected ? colors.primary : colors.border,
            backgroundColor: selected ? (0, weather_utils_1.withAlpha)(colors.primary, 0.1) : colors.surface,
        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: selected ? colors.primaryText : colors.onSurface,
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: selected ? '800' : '600',
                }, children: day.label }), (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: glyph, size: "2xl", accessibilityLabel: label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '800' }, children: day.high != null ? `${day.high}${unit}` : '—' }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    alignSelf: 'stretch',
                    height: 6,
                    borderRadius: tokens.radius.full,
                    backgroundColor: (0, weather_utils_1.withAlpha)(colors.onSurface, 0.08),
                    justifyContent: 'center',
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        position: 'absolute',
                        left: barLeft,
                        width: barWidth,
                        height: 6,
                        borderRadius: tokens.radius.full,
                        backgroundColor: (0, weather_utils_1.withAlpha)(colors.primary, selected ? 0.85 : 0.5),
                    } }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: day.low != null ? `${day.low}${unit}` : '—' }), day.precip != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xs }, children: "\uD83D\uDCA7" }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [day.precip, "%"] })] })) : null] }));
    if (!onSelectDay) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: a11y, children: body }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected }, accessibilityLabel: a11y, onPress: () => onSelectDay(day, index), onPressIn: press.onPressIn, onPressOut: press.onPressOut, children: body }) }));
}
/**
 * ForecastStrip — **large day cards** design (v2). A horizontal scroll of tall,
 * rounded day cards, each carrying the day label, a big condition glyph + text,
 * the high temperature, a token-tinted hi/lo range bar, the low, and an optional
 * precip chance. The selected day gets a thicker primary border, a soft tint,
 * and a bold label — never color alone. Renders a muted empty state when `days`
 * is empty. Same props as {@link ForecastStripProps}; token-only colors.
 */
function ForecastStripV2({ days, unit = '°', selectedIndex, onSelectDay, emptyLabel = 'No forecast available', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (days.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "summary", style: [
                {
                    borderRadius: tokens.radius.md,
                    borderWidth: 1,
                    borderColor: colors.border,
                    padding: tokens.spacing.lg,
                },
                style,
            ], children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, textAlign: 'center' }, children: emptyLabel }) }));
    }
    const range = tempRange(days);
    return ((0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, contentContainerStyle: { gap: tokens.spacing.sm, paddingVertical: tokens.spacing.xs }, style: style, children: days.map((day, index) => ((0, jsx_runtime_1.jsx)(DayCard, { day: day, index: index, unit: unit, range: range, selected: index === selectedIndex, onSelectDay: onSelectDay }, `${day.label}-${index}`))) }));
}
//# sourceMappingURL=ForecastStripV2.js.map
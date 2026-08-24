"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForecastStripV3 = ForecastStripV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Icon_1 = require("../primitives/Icon");
const weather_utils_1 = require("./weather-utils");
/**
 * ForecastStrip — **vertical list** design (v3). Each day is a full-width row:
 * the day label on the left, the condition glyph + short text in the middle, and
 * the high / low temperatures right-aligned; an optional precip chip sits under
 * the day label. The selected row is tinted and its label bolded — never color
 * alone. Rows are divided by hairline separators. Renders a muted empty state
 * when `days` is empty. Same props as {@link ForecastStripProps}; token-only
 * colors.
 */
function ForecastStripV3({ days, unit = '°', selectedIndex, onSelectDay, emptyLabel = 'No forecast available', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const container = {
        borderRadius: tokens.radius.md,
        borderWidth: 1,
        borderColor: colors.border,
        overflow: 'hidden',
    };
    if (days.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "summary", style: [container, { padding: tokens.spacing.lg }, style], children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, textAlign: 'center' }, children: emptyLabel }) }));
    }
    const renderRow = (day, index) => {
        const selected = index === selectedIndex;
        const label = (0, weather_utils_1.conditionLabel)(day.condition);
        const glyph = (0, weather_utils_1.conditionGlyph)(day.condition);
        const a11y = `${day.label}, ${label}${day.high != null ? `, high ${day.high}${unit}` : ''}${day.low != null ? `, low ${day.low}${unit}` : ''}`;
        const row = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                paddingVertical: tokens.spacing.md,
                paddingHorizontal: tokens.spacing.md,
                borderTopWidth: index === 0 ? 0 : 1,
                borderTopColor: colors.border,
                backgroundColor: selected ? (0, weather_utils_1.withAlpha)(colors.primary, 0.08) : 'transparent',
            }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { width: 56 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                color: selected ? colors.primaryText : colors.onSurface,
                                fontSize: tokens.typography.scale.base,
                                fontWeight: selected ? '800' : '600',
                            }, children: day.label }), day.precip != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\uD83D\uDCA7 ", day.precip, "%"] })) : null] }), (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: glyph, size: "xl", accessibilityLabel: label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: label }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: day.high != null ? `${day.high}${unit}` : '—' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base }, children: day.low != null ? `${day.low}${unit}` : '—' })] })] }));
        if (!onSelectDay) {
            return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: a11y, children: row }, `${day.label}-${index}`));
        }
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected }, accessibilityLabel: a11y, onPress: () => onSelectDay(day, index), style: ({ pressed }) => ({ opacity: pressed ? 0.7 : 1 }), children: row }, `${day.label}-${index}`));
    };
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [container, style], children: days.map(renderRow) }));
}
//# sourceMappingURL=ForecastStripV3.js.map
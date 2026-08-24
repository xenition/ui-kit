"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForecastStrip = ForecastStrip;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Card_1 = require("../primitives/Card");
const Icon_1 = require("../primitives/Icon");
const weather_utils_1 = require("./weather-utils");
/**
 * Multi-day forecast (typically 7). Each day is a tappable cell showing its
 * label, the condition as a glyph + short text, and high/low temps; an optional
 * precip chance sits underneath. `variant='scroll'` lays the days out in a
 * horizontal `ScrollView`; `'list'` stacks full-width rows. The selected day is
 * highlighted with a token tint (plus a bold label — never color alone). Renders
 * a muted empty state when `days` is empty. All colors/sizes come from the
 * compiled theme tokens via `useXenitionTheme()` — no literal colors.
 */
function ForecastStrip({ days, unit = '°', selectedIndex, onSelectDay, variant = 'scroll', emptyLabel = 'No forecast available', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (days.length === 0) {
        return ((0, jsx_runtime_1.jsx)(Card_1.Card, { variant: "outlined", style: style, accessibilityRole: "summary", children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.muted,
                    fontSize: tokens.typography.scale.sm,
                    textAlign: 'center',
                }, children: emptyLabel }) }));
    }
    const renderCell = (day, index) => {
        const selected = index === selectedIndex;
        const label = (0, weather_utils_1.conditionLabel)(day.condition);
        const glyph = (0, weather_utils_1.conditionGlyph)(day.condition);
        const isRow = variant === 'list';
        return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected }, accessibilityLabel: `${day.label}, ${label}${day.high != null ? `, high ${day.high}${unit}` : ''}${day.low != null ? `, low ${day.low}${unit}` : ''}`, onPress: onSelectDay ? () => onSelectDay(day, index) : undefined, style: ({ pressed }) => [
                {
                    alignItems: isRow ? 'stretch' : 'center',
                    flexDirection: isRow ? 'row' : 'column',
                    gap: tokens.spacing.xs,
                    paddingVertical: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.md,
                    minWidth: isRow ? undefined : 72,
                    borderRadius: tokens.radius.md,
                    backgroundColor: selected
                        ? tokens.ramps.primary[50]
                        : pressed
                            ? tokens.ramps.neutral[50]
                            : 'transparent',
                    borderWidth: selected ? 1 : 0,
                    borderColor: selected ? colors.primary : 'transparent',
                },
            ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                        color: selected ? colors.primary : colors.onSurface,
                        fontSize: tokens.typography.scale.sm,
                        fontWeight: selected ? '700' : '600',
                        flex: isRow ? 1 : undefined,
                    }, children: day.label }), (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: glyph, size: "lg", accessibilityLabel: label }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: tokens.spacing.xs,
                    }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                color: colors.onSurface,
                                fontSize: tokens.typography.scale.sm,
                                fontWeight: '600',
                            }, children: day.high != null ? `${day.high}${unit}` : '—' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: day.low != null ? `${day.low}${unit}` : '—' })] }), day.precip != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\uD83D\uDCA7 ", day.precip, "%"] })) : null] }, `${day.label}-${index}`));
    };
    if (variant === 'list') {
        return ((0, jsx_runtime_1.jsx)(Card_1.Card, { variant: "outlined", padding: "sm", style: style, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: days.map(renderCell) }) }));
    }
    return ((0, jsx_runtime_1.jsx)(Card_1.Card, { variant: "outlined", padding: "sm", style: style, children: (0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, contentContainerStyle: { gap: tokens.spacing.xs }, children: days.map(renderCell) }) }));
}
//# sourceMappingURL=ForecastStrip.js.map
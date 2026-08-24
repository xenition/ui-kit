"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HourlyRow = HourlyRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Card_1 = require("../primitives/Card");
const Icon_1 = require("../primitives/Icon");
const weather_utils_1 = require("./weather-utils");
/**
 * Horizontal hour-by-hour timeline: each column shows the time, the condition as
 * a glyph + label, the temperature, and (optionally) precip chance. Purely a
 * `ScrollView` of token-styled columns — the condition is conveyed by glyph and
 * text, never color alone. Renders a muted empty state when `hours` is empty.
 * All colors/sizes come from the compiled theme tokens via `useXenitionTheme()`
 * — no literal colors.
 */
function HourlyRow({ hours, unit = '°', showPrecip = true, onSelectHour, emptyLabel = 'No hourly data', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (hours.length === 0) {
        return ((0, jsx_runtime_1.jsx)(Card_1.Card, { variant: "outlined", style: style, accessibilityRole: "summary", children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.muted,
                    fontSize: tokens.typography.scale.sm,
                    textAlign: 'center',
                }, children: emptyLabel }) }));
    }
    return ((0, jsx_runtime_1.jsx)(Card_1.Card, { variant: "outlined", padding: "sm", style: style, children: (0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, contentContainerStyle: { gap: tokens.spacing.md }, children: hours.map((hour, index) => {
                const label = (0, weather_utils_1.conditionLabel)(hour.condition);
                const glyph = (0, weather_utils_1.conditionGlyph)(hour.condition);
                return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: onSelectHour ? 'button' : 'text', accessibilityLabel: `${hour.time}, ${label}${hour.temperature != null ? `, ${hour.temperature}${unit}` : ''}`, onTouchEnd: onSelectHour ? () => onSelectHour(hour, index) : undefined, style: { alignItems: 'center', gap: tokens.spacing.xs, minWidth: 56 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: hour.time }), (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: glyph, size: "lg", accessibilityLabel: label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                color: colors.onSurface,
                                fontSize: tokens.typography.scale.base,
                                fontWeight: '700',
                            }, children: hour.temperature != null ? `${hour.temperature}${unit}` : '—' }), showPrecip && hour.precip != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\uD83D\uDCA7 ", (0, weather_utils_1.clamp)(hour.precip, 0, 100), "%"] })) : null] }, `${hour.time}-${index}`));
            }) }) }));
}
//# sourceMappingURL=HourlyRow.js.map
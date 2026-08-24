"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HourlyRowV3 = HourlyRowV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Card_1 = require("../primitives/Card");
const Icon_1 = require("../primitives/Icon");
const weather_utils_1 = require("./weather-utils");
/**
 * HourlyRow — **dense compact strip** design (v3). A tight horizontal scroll of
 * narrow columns: a small time caption, a small condition glyph, the temperature,
 * and (optionally) a minimal precip figure. Sized for cramming many hours into a
 * single dashboard line. The condition is a glyph AND its text label (exposed to
 * screen readers) — never color alone. Renders a muted empty state when `hours`
 * is empty. Same props as {@link HourlyRowProps}; token-only colors.
 */
function HourlyRowV3({ hours, unit = '°', showPrecip = true, onSelectHour, emptyLabel = 'No hourly data', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (hours.length === 0) {
        return ((0, jsx_runtime_1.jsx)(Card_1.Card, { variant: "outlined", style: style, accessibilityRole: "summary", children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, textAlign: 'center' }, children: emptyLabel }) }));
    }
    return ((0, jsx_runtime_1.jsx)(Card_1.Card, { variant: "outlined", padding: "sm", style: style, children: (0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, contentContainerStyle: { gap: tokens.spacing.sm }, children: hours.map((hour, index) => {
                const label = (0, weather_utils_1.conditionLabel)(hour.condition);
                const glyph = (0, weather_utils_1.conditionGlyph)(hour.condition);
                const precip = hour.precip != null ? (0, weather_utils_1.clamp)(hour.precip, 0, 100) : null;
                const a11y = `${hour.time}, ${label}${hour.temperature != null ? `, ${hour.temperature}${unit}` : ''}`;
                return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: onSelectHour ? 'button' : 'text', accessibilityLabel: a11y, onTouchEnd: onSelectHour ? () => onSelectHour(hour, index) : undefined, style: { alignItems: 'center', gap: 2, minWidth: 40 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: hour.time }), (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: glyph, size: "sm", accessibilityLabel: label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: hour.temperature != null ? `${hour.temperature}${unit}` : '—' }), showPrecip && precip != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [precip, "%"] })) : null] }, `${hour.time}-${index}`));
            }) }) }));
}
//# sourceMappingURL=HourlyRowV3.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HourlyRowV4 = HourlyRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Icon_1 = require("../primitives/Icon");
const weather_utils_1 = require("./weather-utils");
const GradientSurface_1 = require("./internal/GradientSurface");
const v4_sky_1 = require("./internal/v4-sky");
/**
 * HourlyRow — **sky tiles** design (v4). A rounded gradient panel holding a
 * horizontal scroll of soft translucent tiles, one per hour: time, a condition
 * glyph + label, temperature, and an optional precip chance. Gradient stops and
 * near-white ink derive from the brand ramp; the tiles are `skyTile` — no literal
 * colors, condition shown as glyph AND text. Renders a muted line when `hours` is
 * empty. Same props as {@link HourlyRowProps}.
 */
function HourlyRowV4({ hours, unit = '°', showPrecip = true, onSelectHour, emptyLabel = 'No hourly data', style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    const r = tokens.ramps;
    const ink = (0, v4_sky_1.skyInk)(r);
    const inkSoft = (0, v4_sky_1.skyInkSoft)(r);
    const surface = { borderRadius: tokens.radius.lg, padding: tokens.spacing.md, overflow: 'hidden' };
    if (hours.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "summary", style: [{ borderRadius: tokens.radius.lg }, style], children: (0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, v4_sky_1.skyGradient)(r), style: surface, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.sm, textAlign: 'center' }, children: emptyLabel }) }) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ borderRadius: tokens.radius.lg }, style], children: (0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, v4_sky_1.skyGradient)(r), style: surface, children: (0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, contentContainerStyle: { gap: tokens.spacing.sm }, children: hours.map((hour, index) => {
                    const label = (0, weather_utils_1.conditionLabel)(hour.condition);
                    const glyph = (0, weather_utils_1.conditionGlyph)(hour.condition);
                    const a11y = `${hour.time}, ${label}${hour.temperature != null ? `, ${hour.temperature}${unit}` : ''}`;
                    const tile = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            alignItems: 'center',
                            gap: tokens.spacing.xs,
                            minWidth: 62,
                            paddingVertical: tokens.spacing.md,
                            paddingHorizontal: tokens.spacing.sm,
                            borderRadius: tokens.radius.md,
                            backgroundColor: (0, v4_sky_1.skyTile)(r),
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.xs }, children: hour.time }), (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: glyph, size: "lg", accessibilityLabel: label, style: { color: ink } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: ink, fontSize: tokens.typography.scale.base, fontWeight: '800' }, children: hour.temperature != null ? `${hour.temperature}${unit}` : '—' }), showPrecip && hour.precip != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.xs }, children: ["\uD83D\uDCA7 ", (0, weather_utils_1.clamp)(hour.precip, 0, 100), "%"] })) : null] }));
                    if (!onSelectHour) {
                        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: a11y, children: tile }, `${hour.time}-${index}`));
                    }
                    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: () => onSelectHour(hour, index), style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: tile }, `${hour.time}-${index}`));
                }) }) }) }));
}
//# sourceMappingURL=HourlyRowV4.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HourlyRowV2 = HourlyRowV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const motion_1 = require("../primitives/internal/motion");
const Icon_1 = require("../primitives/Icon");
const weather_utils_1 = require("./weather-utils");
/** One rounded hour tile — hook-per-tile lives in its own component. */
function HourTile({ hour, index, unit, showPrecip, onSelectHour, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const label = (0, weather_utils_1.conditionLabel)(hour.condition);
    const glyph = (0, weather_utils_1.conditionGlyph)(hour.condition);
    const precip = hour.precip != null ? (0, weather_utils_1.clamp)(hour.precip, 0, 100) : null;
    const a11y = `${hour.time}, ${label}${hour.temperature != null ? `, ${hour.temperature}${unit}` : ''}${precip != null ? `, ${precip}% precipitation` : ''}`;
    const tile = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            width: 78,
            alignItems: 'center',
            gap: tokens.spacing.xs,
            paddingVertical: tokens.spacing.md,
            paddingHorizontal: tokens.spacing.sm,
            borderRadius: tokens.radius.lg,
            backgroundColor: (0, weather_utils_1.withAlpha)(colors.primary, 0.08),
        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: hour.time }), (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: glyph, size: "2xl", accessibilityLabel: label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '800' }, children: hour.temperature != null ? `${hour.temperature}${unit}` : '—' }), showPrecip && precip != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 2,
                    paddingVertical: 2,
                    paddingHorizontal: tokens.spacing.xs,
                    borderRadius: tokens.radius.full,
                    backgroundColor: (0, weather_utils_1.withAlpha)(colors.onSurface, 0.06),
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xs }, children: "\uD83D\uDCA7" }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: [precip, "%"] })] })) : null] }));
    if (!onSelectHour) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: a11y, children: tile }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: () => onSelectHour(hour, index), onPressIn: press.onPressIn, onPressOut: press.onPressOut, children: tile }) }));
}
/**
 * HourlyRow — **bold rounded tiles** design (v2). A horizontal scroll of soft
 * primary-tinted, generously-rounded hour tiles; each carries the time, a large
 * condition glyph + label, a bold temperature, and a pill-shaped precip chip.
 * The condition is a glyph AND its text label — never color alone. Renders a
 * muted empty state when `hours` is empty. Same props as {@link HourlyRowProps};
 * token-only colors.
 */
function HourlyRowV2({ hours, unit = '°', showPrecip = true, onSelectHour, emptyLabel = 'No hourly data', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (hours.length === 0) {
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
    return ((0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, contentContainerStyle: { gap: tokens.spacing.sm, paddingVertical: tokens.spacing.xs }, style: style, children: hours.map((hour, index) => ((0, jsx_runtime_1.jsx)(HourTile, { hour: hour, index: index, unit: unit, showPrecip: showPrecip, onSelectHour: onSelectHour }, `${hour.time}-${index}`))) }));
}
//# sourceMappingURL=HourlyRowV2.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentWeatherV3 = CurrentWeatherV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const appearance_1 = require("../primitives/internal/appearance");
const Icon_1 = require("../primitives/Icon");
const weather_utils_1 = require("./weather-utils");
/**
 * CurrentWeather — **compact left-aligned** design (v3). A single tidy row: the
 * condition glyph, then a left-aligned stack of location / temperature with the
 * condition label and an inline `H · L` line beside it. Built for list headers
 * and dense dashboards. The condition is a glyph AND its text label — never
 * color alone. Renders a muted placeholder when `temperature` is absent and a
 * skeleton when `loading`. Same props as {@link CurrentWeatherProps};
 * token-only colors.
 */
function CurrentWeatherV3({ location, temperature, unit = '°', condition, feelsLike, high, low, loading = false, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const hasData = temperature != null;
    const label = (0, weather_utils_1.conditionLabel)(condition);
    const glyph = (0, weather_utils_1.conditionGlyph)(condition);
    const container = {
        ...(0, appearance_1.appearanceStyle)('outline', colors, tokens),
        borderRadius: tokens.radius.md,
        paddingVertical: tokens.spacing.md,
        paddingHorizontal: tokens.spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.md,
    };
    const a11y = hasData && !loading
        ? `${location ? location + ', ' : ''}${temperature}${unit}, ${label}`
        : loading
            ? 'Loading current weather'
            : 'Current weather unavailable';
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [container, style], accessibilityRole: "summary", accessibilityLabel: a11y, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: 40,
                        height: 40,
                        borderRadius: tokens.radius.full,
                        backgroundColor: tokens.ramps.neutral[200],
                    } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                width: 90,
                                height: tokens.typography.scale.sm,
                                borderRadius: tokens.radius.sm,
                                backgroundColor: tokens.ramps.neutral[200],
                            } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                width: 130,
                                height: tokens.typography.scale.xl,
                                borderRadius: tokens.radius.sm,
                                backgroundColor: tokens.ramps.neutral[200],
                            } })] })] }));
    }
    const hiLo = [];
    if (high != null)
        hiLo.push(`H ${high}${unit}`);
    if (low != null)
        hiLo.push(`L ${low}${unit}`);
    if (feelsLike != null)
        hiLo.push(`Feels ${feelsLike}${unit}`);
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: glyph, size: "2xl", accessibilityLabel: label }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: [location ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: location })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }, children: hasData ? `${temperature}${unit}` : '—' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: label })] }), hiLo.length ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs, marginTop: 2 }, children: hiLo.join('  ·  ') })) : null] })] }));
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [container, style], accessibilityRole: "summary", accessibilityLabel: a11y, children: inner }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, style: ({ pressed }) => [container, { opacity: pressed ? 0.85 : 1 }, style], children: inner }));
}
//# sourceMappingURL=CurrentWeatherV3.js.map
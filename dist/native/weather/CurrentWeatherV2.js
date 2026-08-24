"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentWeatherV2 = CurrentWeatherV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
const Icon_1 = require("../primitives/Icon");
const weather_utils_1 = require("./weather-utils");
/**
 * CurrentWeather — **immersive hero** design (v2). The whole card is a soft
 * primary-tinted wash floating on an `lg` shadow; a large condition glyph sits
 * centered above an oversized temperature, with the condition label beneath and
 * feels-like / high / low carried as quiet tinted pills. The condition is always
 * a glyph AND its text label — never color alone. Renders a muted placeholder
 * when `temperature` is absent and a skeleton when `loading`. Same props as
 * {@link CurrentWeatherProps}; token-only colors.
 */
function CurrentWeatherV2({ location, temperature, unit = '°', condition, feelsLike, high, low, loading = false, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)();
    const press = (0, motion_1.usePressScale)();
    const hasData = temperature != null;
    const label = (0, weather_utils_1.conditionLabel)(condition);
    const glyph = (0, weather_utils_1.conditionGlyph)(condition);
    const a11y = hasData && !loading
        ? `${location ? location + ', ' : ''}${temperature}${unit}, ${label}`
        : loading
            ? 'Loading current weather'
            : 'Current weather unavailable';
    const wash = {
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.xl,
        backgroundColor: (0, weather_utils_1.withAlpha)(colors.primary, 0.1),
        overflow: 'hidden',
        ...(0, elevation_1.shadow)('lg', tokens),
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [wash, style], accessibilityRole: "summary", accessibilityLabel: a11y, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 96,
                            height: 96,
                            borderRadius: tokens.radius.full,
                            backgroundColor: tokens.ramps.neutral[200],
                        } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 180,
                            height: tokens.typography.scale['3xl'] * 1.8,
                            borderRadius: tokens.radius.md,
                            backgroundColor: tokens.ramps.neutral[200],
                        } })] }) }));
    }
    const pill = (text, key) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            paddingVertical: tokens.spacing.xs,
            paddingHorizontal: tokens.spacing.sm,
            borderRadius: tokens.radius.full,
            backgroundColor: (0, weather_utils_1.withAlpha)(colors.onSurface, 0.06),
        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: text }) }, key));
    const pills = [];
    if (feelsLike != null)
        pills.push(pill(`Feels ${feelsLike}${unit}`, 'feels'));
    if (high != null)
        pills.push(pill(`H ${high}${unit}`, 'high'));
    if (low != null)
        pills.push(pill(`L ${low}${unit}`, 'low'));
    const content = ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { style: { alignItems: 'center', opacity: enter.opacity, transform: enter.transform }, children: [location ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.muted,
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: '600',
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                    marginBottom: tokens.spacing.md,
                }, children: location })) : null, (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: glyph, size: tokens.typography.scale['3xl'] * 2, accessibilityLabel: label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: {
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale['3xl'] * 2,
                    fontWeight: '800',
                    marginTop: tokens.spacing.sm,
                }, children: hasData ? `${temperature}${unit}` : '—' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.lg,
                    fontWeight: '600',
                    marginTop: tokens.spacing.xs,
                }, children: label }), pills.length ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: tokens.spacing.sm,
                    marginTop: tokens.spacing.md,
                }, children: pills })) : null] }));
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [wash, style], accessibilityRole: "summary", accessibilityLabel: a11y, children: content }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: [wash, style], children: content }) }));
}
//# sourceMappingURL=CurrentWeatherV2.js.map
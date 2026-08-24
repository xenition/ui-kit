"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentWeather = CurrentWeather;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Card_1 = require("../primitives/Card");
const Icon_1 = require("../primitives/Icon");
const weather_utils_1 = require("./weather-utils");
/**
 * Hero current-conditions block: location eyebrow, a large temperature, and the
 * condition shown as a glyph beside its text label (accessibility never relies
 * on color). Feels-like plus daily high/low sit underneath. `variant='compact'`
 * collapses to a single row for list headers. Renders a muted placeholder when
 * `temperature` is absent and a skeleton when `loading`. All colors/sizes come
 * from the compiled theme tokens via `useXenitionTheme()` — no literal colors.
 */
function CurrentWeather({ location, temperature, unit = '°', condition, feelsLike, high, low, variant = 'hero', loading = false, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const hasData = temperature != null;
    const label = (0, weather_utils_1.conditionLabel)(condition);
    const glyph = (0, weather_utils_1.conditionGlyph)(condition);
    const a11y = hasData && !loading
        ? `${location ? location + ', ' : ''}${temperature}${unit}, ${label}`
        : loading
            ? 'Loading current weather'
            : 'Current weather unavailable';
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(Card_1.Card, { variant: "elevated", style: style, accessibilityRole: "summary", accessibilityLabel: a11y, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 120,
                            height: tokens.typography.scale.sm,
                            borderRadius: tokens.radius.sm,
                            backgroundColor: tokens.ramps.neutral[200],
                        } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 160,
                            height: tokens.typography.scale['3xl'] * 1.4,
                            borderRadius: tokens.radius.md,
                            backgroundColor: tokens.ramps.neutral[200],
                        } })] }) }));
    }
    if (variant === 'compact') {
        return ((0, jsx_runtime_1.jsx)(Card_1.Card, { variant: "outlined", onTouchEnd: onPress, style: style, accessibilityRole: "summary", accessibilityLabel: a11y, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: glyph, size: "xl" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [location ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: location })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: label })] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale['2xl'],
                            fontWeight: '700',
                        }, children: hasData ? `${temperature}${unit}` : '—' })] }) }));
    }
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { variant: "elevated", onTouchEnd: onPress, style: style, accessibilityRole: "summary", accessibilityLabel: a11y, children: [location ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.muted,
                    fontSize: tokens.typography.scale.sm,
                    marginBottom: tokens.spacing.xs,
                }, children: location })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: glyph, size: tokens.typography.scale['3xl'] * 1.5 }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale['3xl'] * 1.4,
                            fontWeight: '800',
                        }, children: hasData ? `${temperature}${unit}` : '—' })] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.lg,
                    fontWeight: '600',
                    marginTop: tokens.spacing.xs,
                }, children: label }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: tokens.spacing.md,
                    marginTop: tokens.spacing.sm,
                }, children: [feelsLike != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: ["Feels like ", feelsLike, unit] })) : null, high != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: ["H ", high, unit] })) : null, low != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: ["L ", low, unit] })) : null] })] }));
}
//# sourceMappingURL=CurrentWeather.js.map
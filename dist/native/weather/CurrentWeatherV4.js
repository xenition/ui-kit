"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentWeatherV4 = CurrentWeatherV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Icon_1 = require("../primitives/Icon");
const weather_utils_1 = require("./weather-utils");
const GradientSurface_1 = require("./internal/GradientSurface");
const v4_sky_1 = require("./internal/v4-sky");
/**
 * CurrentWeather — **sky hero** design (v4). A rounded gradient panel in the mold
 * of a modern weather app: an oversized temperature, the condition as a big glyph
 * beside its label, and feels-like / high / low as soft translucent pill chips.
 * The gradient stops and the near-white ink all come from the brand ramp, so the
 * whole thing restyles from the seed and never uses a literal color; the
 * condition is a glyph AND text — never color alone. Renders a skeleton when
 * `loading`, a `—` placeholder when `temperature` is absent, and collapses to a
 * single row under `variant='compact'`. Same props as {@link CurrentWeatherProps}.
 */
function CurrentWeatherV4({ location, temperature, unit = '°', condition, feelsLike, high, low, variant = 'hero', loading = false, onPress, style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    const r = tokens.ramps;
    const ink = (0, v4_sky_1.skyInk)(r);
    const inkSoft = (0, v4_sky_1.skyInkSoft)(r);
    const hasData = temperature != null;
    const label = (0, weather_utils_1.conditionLabel)(condition);
    const glyph = (0, weather_utils_1.conditionGlyph)(condition);
    const surface = {
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.lg,
        overflow: 'hidden',
    };
    const a11y = hasData && !loading
        ? `${location ? location + ', ' : ''}${temperature}${unit}, ${label}`
        : loading
            ? 'Loading current weather'
            : 'Current weather unavailable';
    const Chip = ({ text }) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            paddingHorizontal: tokens.spacing.md,
            paddingVertical: tokens.spacing.xs,
            borderRadius: tokens.radius.full,
            backgroundColor: (0, v4_sky_1.skyTile)(r),
        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: text }) }));
    let body;
    if (loading) {
        const bar = (w, h) => ({
            width: w,
            height: h,
            borderRadius: tokens.radius.sm,
            backgroundColor: (0, v4_sky_1.skyTile)(r, 0.28),
        });
        body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: bar(120, tokens.typography.scale.sm) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: bar(180, tokens.typography.scale['3xl'] * 1.6) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: bar(140, tokens.typography.scale.base) })] }));
    }
    else if (variant === 'compact') {
        body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: glyph, size: "2xl", accessibilityLabel: label, style: { color: ink } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: [location ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: inkSoft, fontSize: tokens.typography.scale.xs }, children: location })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: label })] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: ink, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }, children: hasData ? `${temperature}${unit}` : '—' })] }));
    }
    else {
        const chips = [];
        if (feelsLike != null)
            chips.push(`Feels ${feelsLike}${unit}`);
        if (high != null)
            chips.push(`H ${high}${unit}`);
        if (low != null)
            chips.push(`L ${low}${unit}`);
        body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [location ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.sm, fontWeight: '600', letterSpacing: 0.3 }, children: location })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: {
                                color: ink,
                                fontSize: tokens.typography.scale['3xl'] * 1.9,
                                fontWeight: '800',
                                letterSpacing: -2,
                            }, children: hasData ? `${temperature}${unit}` : '—' }), (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: glyph, size: tokens.typography.scale['3xl'] * 1.8, accessibilityLabel: label, style: { color: ink } })] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.lg, fontWeight: '700', marginTop: tokens.spacing.xs }, children: label }), chips.length ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm, marginTop: tokens.spacing.md }, children: chips.map((c) => ((0, jsx_runtime_1.jsx)(Chip, { text: c }, c))) })) : null] }));
    }
    const ground = ((0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, v4_sky_1.skyGradient)(r), style: surface, children: body }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, style: ({ pressed }) => [{ borderRadius: tokens.radius.lg, opacity: pressed ? 0.92 : 1 }, style], children: ground }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "summary", accessibilityLabel: a11y, style: [{ borderRadius: tokens.radius.lg }, style], children: ground }));
}
//# sourceMappingURL=CurrentWeatherV4.js.map
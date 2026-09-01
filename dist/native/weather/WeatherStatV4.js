"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherStatV4 = WeatherStatV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Icon_1 = require("../primitives/Icon");
const GradientSurface_1 = require("./internal/GradientSurface");
const v4_sky_1 = require("./internal/v4-sky");
/**
 * WeatherStat — **sky tile** design (v4). A polished metric tile: the leading
 * glyph sits in a small gradient badge (the brand ramp), the muted label rides
 * above a large token-scaled value with an optional unit suffix, and a caption
 * closes it. Same label / value / unit / caption / glyph contract as the base;
 * `variant='plain'` drops the card chrome for dense grids. Every color/size
 * traces to the compiled theme — no literal colors. Renders a muted placeholder
 * when `value` is absent. Same props as {@link WeatherStatProps}.
 */
function WeatherStatV4({ label, value, unit, glyph, caption, variant = 'card', emptyValue = '—', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const r = tokens.ramps;
    const hasValue = value != null;
    const badge = tokens.typography.scale.xl + tokens.spacing.sm;
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [glyph ? ((0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, v4_sky_1.skyGradient)(r), style: { width: badge, height: badge, borderRadius: tokens.radius.full, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: glyph, size: "base", style: { color: (0, v4_sky_1.skyInk)(r) } }) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: label })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-end', gap: tokens.spacing.xs, marginTop: tokens.spacing.sm }, children: [typeof value === 'string' || typeof value === 'number' || !hasValue ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '800', letterSpacing: -1 }, children: hasValue ? value : emptyValue })) : (value), unit && hasValue ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.base, marginBottom: 3 }, children: unit })) : null] }), caption ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs, marginTop: tokens.spacing.xs }, children: caption })) : null] }));
    const a11y = `${label}, ${hasValue ? `${value}${unit ? ' ' + unit : ''}` : 'no data'}`;
    if (variant === 'plain') {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "summary", accessibilityLabel: a11y, style: style, children: body }));
    }
    const surface = [
        {
            backgroundColor: colors.card,
            borderRadius: tokens.radius.lg,
            padding: tokens.spacing.lg,
            minWidth: 150,
            flexGrow: 1,
            flexBasis: 0,
            shadowColor: colors.onSurface,
            shadowOpacity: 0.12,
            shadowRadius: 14,
            shadowOffset: { width: 0, height: 6 },
            elevation: 3,
        },
        style,
    ];
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "summary", accessibilityLabel: a11y, style: surface, children: body }));
}
//# sourceMappingURL=WeatherStatV4.js.map
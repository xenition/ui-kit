"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirQualityCardV2 = AirQualityCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Icon_1 = require("../primitives/Icon");
const weather_utils_1 = require("./weather-utils");
const BANDS = [
    { max: 50, band: 'good', label: 'Good', glyph: '🟢', tone: 'success' },
    { max: 100, band: 'moderate', label: 'Moderate', glyph: '🟡', tone: 'warn' },
    { max: 150, band: 'sensitive', label: 'Unhealthy for sensitive groups', glyph: '🟠', tone: 'warn' },
    { max: 200, band: 'unhealthy', label: 'Unhealthy', glyph: '🔴', tone: 'danger' },
    { max: 300, band: 'very-unhealthy', label: 'Very unhealthy', glyph: '🟣', tone: 'danger' },
    { max: Infinity, band: 'hazardous', label: 'Hazardous', glyph: '🟤', tone: 'danger' },
];
function bandFor(aqi) {
    return BANDS.find((b) => aqi <= b.max) ?? BANDS[BANDS.length - 1];
}
/**
 * AirQualityCard — **dial** design (v2). The AQI sits large inside a tone-tinted
 * ring, with the severity band shown as a glyph + text label beneath (never
 * color alone). A six-segment token scale band underneath maps the full AQI
 * spectrum, with the active band highlighted and a marker at the current value.
 * Optional pollutant/advice captions follow. Renders a muted empty state when
 * `aqi` is absent and a skeleton when `loading`. Same props as
 * {@link AirQualityCardProps}; token-only colors.
 */
function AirQualityCardV2({ aqi, pollutant, advice, loading = false, emptyLabel = 'Air quality unavailable', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const c = colors;
    const container = {
        borderRadius: tokens.radius.md,
        borderWidth: 1,
        borderColor: colors.border,
        padding: tokens.spacing.lg,
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [container, style], accessibilityLabel: "Loading air quality", children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 120,
                            height: 120,
                            borderRadius: tokens.radius.full,
                            backgroundColor: tokens.ramps.neutral[200],
                        } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 160,
                            height: tokens.typography.scale.base,
                            borderRadius: tokens.radius.sm,
                            backgroundColor: tokens.ramps.neutral[200],
                        } })] }) }));
    }
    if (aqi == null) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [container, style], accessibilityRole: "summary", children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyLabel }) }));
    }
    const meta = bandFor(aqi);
    const ringColor = colors[meta.tone];
    const toneText = c[`${meta.tone}Text`] ?? colors.onSurface;
    const markerPct = (0, weather_utils_1.clamp)(aqi, 0, 300) / 300;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [container, style], accessibilityRole: "summary", accessibilityLabel: `Air quality index ${aqi}, ${meta.label}`, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, marginBottom: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83E\uDEC1", size: "sm", accessibilityLabel: "Air quality" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: "Air Quality" })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            width: 128,
                            height: 128,
                            borderRadius: tokens.radius.full,
                            borderWidth: 8,
                            borderColor: (0, weather_utils_1.withAlpha)(ringColor, 0.35),
                            backgroundColor: (0, weather_utils_1.withAlpha)(ringColor, 0.08),
                            alignItems: 'center',
                            justifyContent: 'center',
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors.onSurface, fontSize: tokens.typography.scale['3xl'] * 1.4, fontWeight: '800' }, children: aqi }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "AQI" })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: meta.glyph, size: "sm", accessibilityLabel: meta.label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: toneText, fontSize: tokens.typography.scale.base, fontWeight: '700', textAlign: 'center' }, children: meta.label })] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { marginTop: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: 2, height: 8 }, children: BANDS.map((b, i) => {
                            const active = b.band === meta.band;
                            return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    flex: 1,
                                    borderTopLeftRadius: i === 0 ? tokens.radius.full : 0,
                                    borderBottomLeftRadius: i === 0 ? tokens.radius.full : 0,
                                    borderTopRightRadius: i === BANDS.length - 1 ? tokens.radius.full : 0,
                                    borderBottomRightRadius: i === BANDS.length - 1 ? tokens.radius.full : 0,
                                    backgroundColor: (0, weather_utils_1.withAlpha)(colors[b.tone], active ? 0.7 : 0.2),
                                } }, b.band));
                        }) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 10, justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                position: 'absolute',
                                left: `${markerPct * 100}%`,
                                width: 4,
                                height: 10,
                                marginLeft: -2,
                                borderRadius: tokens.radius.full,
                                backgroundColor: ringColor,
                            } }) })] }), pollutant ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, marginTop: tokens.spacing.sm }, children: ["Dominant: ", pollutant] })) : null, advice ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, marginTop: tokens.spacing.xs }, children: advice })) : null] }));
}
//# sourceMappingURL=AirQualityCardV2.js.map
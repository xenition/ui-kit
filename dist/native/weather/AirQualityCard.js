"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirQualityCard = AirQualityCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Card_1 = require("../primitives/Card");
const Icon_1 = require("../primitives/Icon");
const weather_utils_1 = require("./weather-utils");
const BANDS = [
    { max: 50, band: 'good', meta: { label: 'Good', glyph: '🟢', tone: 'success' } },
    { max: 100, band: 'moderate', meta: { label: 'Moderate', glyph: '🟡', tone: 'warn' } },
    { max: 150, band: 'sensitive', meta: { label: 'Unhealthy for sensitive groups', glyph: '🟠', tone: 'warn' } },
    { max: 200, band: 'unhealthy', meta: { label: 'Unhealthy', glyph: '🔴', tone: 'danger' } },
    { max: 300, band: 'very-unhealthy', meta: { label: 'Very unhealthy', glyph: '🟣', tone: 'danger' } },
    { max: Infinity, band: 'hazardous', meta: { label: 'Hazardous', glyph: '🟤', tone: 'danger' } },
];
function bandFor(aqi) {
    return (BANDS.find((b) => aqi <= b.max) ?? BANDS[BANDS.length - 1]).meta;
}
/**
 * Air-quality index card: the numeric AQI, its severity band shown as a glyph +
 * text label (never color alone), a token-tinted scale bar with a position
 * marker, and optional pollutant/advice captions. Severity maps to
 * success/warn/danger tokens. Renders a muted empty state when `aqi` is absent
 * and a skeleton when `loading`. All colors/sizes come from the compiled theme
 * tokens via `useXenitionTheme()` — no literal colors.
 */
function AirQualityCard({ aqi, pollutant, advice, loading = false, emptyLabel = 'Air quality unavailable', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(Card_1.Card, { variant: "outlined", style: style, accessibilityLabel: "Loading air quality", children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    height: tokens.typography.scale['2xl'],
                    borderRadius: tokens.radius.sm,
                    backgroundColor: tokens.ramps.neutral[200],
                } }) }));
    }
    if (aqi == null) {
        return ((0, jsx_runtime_1.jsx)(Card_1.Card, { variant: "outlined", style: style, accessibilityRole: "summary", children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyLabel }) }));
    }
    const meta = bandFor(aqi);
    const toneColor = colors[meta.tone];
    const markerPct = (0, weather_utils_1.clamp)(aqi, 0, 300) / 300;
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { variant: "outlined", style: style, accessibilityRole: "summary", accessibilityLabel: `Air quality index ${aqi}, ${meta.label}`, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83E\uDEC1", size: "lg", accessibilityLabel: "Air quality" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "Air Quality" })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'baseline',
                    gap: tokens.spacing.sm,
                    marginTop: tokens.spacing.xs,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale['3xl'],
                            fontWeight: '800',
                        }, children: aqi }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: meta.glyph, size: "sm", accessibilityLabel: meta.label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: toneColor, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: meta.label })] })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    height: 8,
                    borderRadius: tokens.radius.full,
                    backgroundColor: (0, weather_utils_1.withAlpha)(toneColor, 0.18),
                    marginTop: tokens.spacing.sm,
                    justifyContent: 'center',
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        position: 'absolute',
                        left: `${markerPct * 100}%`,
                        width: 4,
                        height: 14,
                        marginLeft: -2,
                        borderRadius: tokens.radius.full,
                        backgroundColor: toneColor,
                    } }) }), pollutant ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: {
                    color: colors.muted,
                    fontSize: tokens.typography.scale.xs,
                    marginTop: tokens.spacing.sm,
                }, children: ["Dominant: ", pollutant] })) : null, advice ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.sm,
                    marginTop: tokens.spacing.xs,
                }, children: advice })) : null] }));
}
//# sourceMappingURL=AirQualityCard.js.map
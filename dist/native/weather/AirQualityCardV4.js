"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirQualityCardV4 = AirQualityCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
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
/** `onSuccess`/`onWarn`/`onDanger` ink for a given severity tone. */
const ON_TONE = {
    success: 'onSuccess',
    warn: 'onWarn',
    danger: 'onDanger',
};
/**
 * AirQualityCard — **elevated card** design (v4). A polished white card sitting on
 * the page: an oversized AQI numeral, its severity band as a solid pill (glyph +
 * text — never color alone), a token-tinted scale track with a position marker,
 * and optional pollutant / advice captions. Band severity maps to
 * success/warn/danger tokens, every color/size traces to the compiled theme via
 * `useXenitionTheme()` — no literal colors. Renders a skeleton when `loading` and
 * a muted empty state when `aqi` is absent. Same props as {@link AirQualityCardProps}.
 */
function AirQualityCardV4({ aqi, pollutant, advice, loading = false, emptyLabel = 'Air quality unavailable', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const surface = [
        {
            backgroundColor: colors.card,
            borderRadius: tokens.radius.lg,
            padding: tokens.spacing.lg,
            shadowColor: colors.onSurface,
            shadowOpacity: 0.12,
            shadowRadius: 14,
            shadowOffset: { width: 0, height: 6 },
            elevation: 3,
        },
        style,
    ];
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Loading air quality", style: surface, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    height: tokens.typography.scale['2xl'],
                    borderRadius: tokens.radius.sm,
                    backgroundColor: (0, weather_utils_1.withAlpha)(colors.onSurface, 0.12),
                } }) }));
    }
    if (aqi == null) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "summary", style: surface, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.sm }, children: emptyLabel }) }));
    }
    const meta = bandFor(aqi);
    const toneColor = colors[meta.tone];
    const onTone = colors[ON_TONE[meta.tone]];
    const markerPct = (0, weather_utils_1.clamp)(aqi, 0, 300) / 300;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "summary", accessibilityLabel: `Air quality index ${aqi}, ${meta.label}`, style: surface, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83E\uDEC1", size: "lg", accessibilityLabel: "Air quality" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: "Air Quality" })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: tokens.spacing.sm,
                    marginTop: tokens.spacing.sm,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: {
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale['3xl'],
                            fontWeight: '800',
                            letterSpacing: -1,
                        }, children: aqi }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.xs,
                            paddingHorizontal: tokens.spacing.md,
                            paddingVertical: tokens.spacing.xs,
                            borderRadius: tokens.radius.full,
                            backgroundColor: toneColor,
                        }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: meta.glyph, size: "sm", accessibilityLabel: meta.label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: onTone, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: meta.label })] })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    height: 10,
                    borderRadius: tokens.radius.full,
                    backgroundColor: (0, weather_utils_1.withAlpha)(toneColor, 0.15),
                    marginTop: tokens.spacing.md,
                    justifyContent: 'center',
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        position: 'absolute',
                        left: `${markerPct * 100}%`,
                        width: 4,
                        height: 16,
                        marginLeft: -2,
                        borderRadius: tokens.radius.full,
                        backgroundColor: toneColor,
                    } }) }), pollutant ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: {
                    color: colors.mutedText,
                    fontSize: tokens.typography.scale.xs,
                    marginTop: tokens.spacing.md,
                }, children: ["Dominant: ", pollutant] })) : null, advice ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.sm,
                    marginTop: tokens.spacing.xs,
                }, children: advice })) : null] }));
}
//# sourceMappingURL=AirQualityCardV4.js.map
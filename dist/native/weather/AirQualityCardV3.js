"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirQualityCardV3 = AirQualityCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Badge_1 = require("../primitives/Badge");
const Icon_1 = require("../primitives/Icon");
const BANDS = [
    { max: 50, band: 'good', label: 'Good', glyph: '🟢', tone: 'success' },
    { max: 100, band: 'moderate', label: 'Moderate', glyph: '🟡', tone: 'warn' },
    { max: 150, band: 'sensitive', label: 'Sensitive groups', glyph: '🟠', tone: 'warn' },
    { max: 200, band: 'unhealthy', label: 'Unhealthy', glyph: '🔴', tone: 'danger' },
    { max: 300, band: 'very-unhealthy', label: 'Very unhealthy', glyph: '🟣', tone: 'danger' },
    { max: Infinity, band: 'hazardous', label: 'Hazardous', glyph: '🟤', tone: 'danger' },
];
function bandFor(aqi) {
    return BANDS.find((b) => aqi <= b.max) ?? BANDS[BANDS.length - 1];
}
/**
 * AirQualityCard — **compact chip row** design (v3). A single inline line: a lung
 * glyph, the "AQI" caption, the numeric value, and a tone `Badge` carrying the
 * severity band's glyph + text label (never color alone). An optional pollutant
 * caption trails on the right; advice, if given, wraps underneath. Sized for
 * dense dashboards and list rows. Renders a muted empty state when `aqi` is
 * absent and a skeleton when `loading`. Same props as
 * {@link AirQualityCardProps}; token-only colors.
 */
function AirQualityCardV3({ aqi, pollutant, advice, loading = false, emptyLabel = 'Air quality unavailable', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const container = {
        borderRadius: tokens.radius.md,
        borderWidth: 1,
        borderColor: colors.border,
        paddingVertical: tokens.spacing.sm,
        paddingHorizontal: tokens.spacing.md,
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [container, style], accessibilityLabel: "Loading air quality", children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    height: tokens.typography.scale.xl,
                    borderRadius: tokens.radius.sm,
                    backgroundColor: tokens.ramps.neutral[200],
                } }) }));
    }
    if (aqi == null) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [container, style], accessibilityRole: "summary", children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyLabel }) }));
    }
    const meta = bandFor(aqi);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [container, style], accessibilityRole: "summary", accessibilityLabel: `Air quality index ${aqi}, ${meta.label}`, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83E\uDEC1", size: "base", accessibilityLabel: "Air quality" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: "AQI" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '800' }, children: aqi }), (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: `${meta.glyph} ${meta.label}` }), pollutant ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { marginLeft: 'auto', color: colors.muted, fontSize: tokens.typography.scale.xs }, children: pollutant })) : null] }), advice ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs, marginTop: tokens.spacing.xs }, children: advice })) : null] }));
}
//# sourceMappingURL=AirQualityCardV3.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherAdvisoryV2 = WeatherAdvisoryV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const elevation_1 = require("../primitives/internal/elevation");
const color_1 = require("../primitives/internal/color");
const KIND_GLYPH = {
    frost: '❄️',
    heat: '🔥',
    rain: '🌧️',
    wind: '💨',
    drought: '🏜️',
    storm: '⛈️',
    general: '🌤️',
};
const SEVERITY_META = {
    info: { label: 'Info', color: 'primary', tone: 'primary' },
    watch: { label: 'Watch', color: 'warn', tone: 'warn' },
    warning: { label: 'Warning', color: 'warn', tone: 'warn' },
    severe: { label: 'Severe', color: 'danger', tone: 'danger' },
};
/**
 * WeatherAdvisory — design variant **V2**: a **big alert banner card** — a large
 * severity glyph in a tinted circular disc on the left, a bold headline, message
 * and timeframe stacked to the right, and a severity {@link Badge}. The whole
 * surface is a tinted, elevated card with a thick severity edge, so it reads as
 * a full-width hero alert rather than V1's slim callout. Severity is stated in
 * text, never color alone. Announced via `accessibilityRole="alert"`. Same props
 * as {@link WeatherAdvisoryProps}. Token-only.
 */
function WeatherAdvisoryV2({ title, message, kind = 'general', severity = 'info', timeframe, icon, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = SEVERITY_META[severity];
    const glyph = icon ?? KIND_GLYPH[kind];
    const accent = colors[meta.color];
    const container = [
        {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            padding: tokens.spacing.md,
            borderRadius: tokens.radius.lg,
            borderTopWidth: 5,
            borderTopColor: accent,
            backgroundColor: (0, color_1.withAlpha)(accent, 0.1),
            ...(0, elevation_1.shadow)('md', tokens),
        },
        style,
    ];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "alert", accessibilityLabel: `${meta.label} advisory: ${title}${message ? `. ${message}` : ''}`, style: container, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 56,
                    height: 56,
                    borderRadius: tokens.radius.full,
                    backgroundColor: (0, color_1.withAlpha)(accent, 0.16),
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale['2xl'] }, children: glyph }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: meta.label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '800', fontFamily: tokens.typography.fontHeading, marginTop: tokens.spacing.xs }, children: title }), message != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, marginTop: 2 }, children: message })) : null, timeframe != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, marginTop: tokens.spacing.xs }, children: ["\uD83D\uDD53 ", timeframe] })) : null] })] }));
}
//# sourceMappingURL=WeatherAdvisoryV2.js.map
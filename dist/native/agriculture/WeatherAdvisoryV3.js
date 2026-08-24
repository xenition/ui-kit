"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherAdvisoryV3 = WeatherAdvisoryV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
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
    info: { label: 'Info', color: 'primary' },
    watch: { label: 'Watch', color: 'warn' },
    warning: { label: 'Warning', color: 'warn' },
    severe: { label: 'Severe', color: 'danger' },
};
/**
 * WeatherAdvisory — design variant **V3**: a **compact inline advisory** — a
 * single-line tinted pill with the category glyph, a `SEVERITY — headline`
 * label, and an optional timeframe flush right. Severity shows as a text prefix,
 * never color alone. Announced via `accessibilityRole="alert"`. Same props as
 * {@link WeatherAdvisoryProps}; only the layout differs. Token-only.
 */
function WeatherAdvisoryV3({ title, message, kind = 'general', severity = 'info', timeframe, icon, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = SEVERITY_META[severity];
    const glyph = icon ?? KIND_GLYPH[kind];
    const accent = colors[meta.color];
    const container = [
        {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.sm,
            paddingVertical: tokens.spacing.xs,
            paddingHorizontal: tokens.spacing.sm,
            borderRadius: tokens.radius.full,
            borderLeftWidth: 3,
            borderLeftColor: accent,
            backgroundColor: (0, color_1.withAlpha)(accent, 0.1),
        },
        style,
    ];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "alert", accessibilityLabel: `${meta.label} advisory: ${title}${message ? `. ${message}` : ''}`, style: container, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.base }, children: glyph }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, fontSize: tokens.typography.scale.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: accent, fontWeight: '800' }, children: meta.label }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontWeight: '600' }, children: [" \u2014 ", title] })] }), timeframe != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\uD83D\uDD53 ", timeframe] })) : null] }));
}
//# sourceMappingURL=WeatherAdvisoryV3.js.map
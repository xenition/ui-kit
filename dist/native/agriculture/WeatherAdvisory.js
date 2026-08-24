"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherAdvisory = WeatherAdvisory;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
/** Token-derived translucent tint (no literal hex; mirrors the primitives). */
function withAlpha(hex, alpha) {
    const h = hex.replace('#', '');
    const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
    const r = parseInt(full.slice(0, 2), 16);
    const g = parseInt(full.slice(2, 4), 16);
    const b = parseInt(full.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
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
 * A weather advisory banner — a tinted, accent-barred callout carrying a
 * category glyph, headline, optional message + timeframe, and a severity
 * {@link Badge}. Severity drives the color, but the text chip states it too, so
 * the alert never relies on color alone. Announced to assistive tech via
 * `accessibilityRole="alert"`. The tint is a token-derived `withAlpha` of the
 * severity slot — no literal colors.
 */
function WeatherAdvisory({ title, message, kind = 'general', severity = 'info', timeframe, icon, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = SEVERITY_META[severity];
    const glyph = icon ?? KIND_GLYPH[kind];
    const accent = colors[meta.color];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "alert", accessibilityLabel: `${meta.label} advisory: ${title}${message ? `. ${message}` : ''}`, style: [
            {
                flexDirection: 'row',
                gap: tokens.spacing.sm,
                padding: tokens.spacing.md,
                borderRadius: tokens.radius.md,
                borderLeftWidth: 4,
                borderLeftColor: accent,
                backgroundColor: withAlpha(accent, 0.12),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: glyph, size: "xl", color: meta.color }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: meta.label })] }), message != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, marginTop: 2 }, children: message })) : null, timeframe != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, marginTop: 4 }, children: ["\uD83D\uDD53 ", timeframe] })) : null] })] }));
}
//# sourceMappingURL=WeatherAdvisory.js.map
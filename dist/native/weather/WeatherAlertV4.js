"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherAlertV4 = WeatherAlertV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Icon_1 = require("../primitives/Icon");
const weather_utils_1 = require("./weather-utils");
const GradientSurface_1 = require("./internal/GradientSurface");
const SEVERITY = {
    advisory: { tone: 'warn', onTone: 'onWarn', glyph: 'ℹ️', label: 'Advisory' },
    watch: { tone: 'warn', onTone: 'onWarn', glyph: '⚠️', label: 'Watch' },
    warning: { tone: 'danger', onTone: 'onDanger', glyph: '⚠️', label: 'Warning' },
    emergency: { tone: 'danger', onTone: 'onDanger', glyph: '🚨', label: 'Emergency' },
};
/**
 * WeatherAlert — **filled tone banner** design (v4). A bold, gradient-filled
 * severity banner: warn (advisory/watch) or danger (warning/emergency) as the
 * ground, with the severity ALSO spelled out by a glyph and a text label — never
 * color alone. A big icon sits in a translucent chip, a severity pill and title
 * lead, and the copy + "until" line follow — all in the contrast-guaranteed
 * on-tone ink. Optional tap + dismiss. The gradient is the tone token stepped
 * with `withAlpha`; every color traces to a token — no literals. Same props as
 * {@link WeatherAlertProps}.
 */
function WeatherAlertV4({ title, description, severity = 'advisory', until, onPress, onDismiss, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = SEVERITY[severity];
    const tone = colors[meta.tone];
    const ink = colors[meta.onTone];
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: onPress ? 'button' : 'alert', accessibilityLabel: `${meta.label}: ${title}`, onPress: onPress, style: ({ pressed }) => [{ borderRadius: tokens.radius.lg, opacity: pressed ? 0.95 : 1 }, style], children: (0, jsx_runtime_1.jsxs)(GradientSurface_1.GradientSurface, { colors: [tone, (0, weather_utils_1.withAlpha)(tone, 0.82)], style: {
                flexDirection: 'row',
                gap: tokens.spacing.md,
                padding: tokens.spacing.lg,
                borderRadius: tokens.radius.lg,
                overflow: 'hidden',
                shadowColor: colors.onSurface,
                shadowOpacity: 0.14,
                shadowRadius: 14,
                shadowOffset: { width: 0, height: 6 },
                elevation: 3,
            }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: 44,
                        height: 44,
                        borderRadius: tokens.radius.full,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: (0, weather_utils_1.withAlpha)(ink, 0.22),
                    }, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: meta.glyph, size: "xl", accessibilityLabel: meta.label, style: { color: ink } }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { paddingHorizontal: tokens.spacing.sm, paddingVertical: 2, borderRadius: tokens.radius.full, backgroundColor: (0, weather_utils_1.withAlpha)(ink, 0.22) }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.xs, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.5 }, children: meta.label }) }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.lg, fontWeight: '800', marginTop: tokens.spacing.xs }, children: title }), description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: (0, weather_utils_1.withAlpha)(ink, 0.92), fontSize: tokens.typography.scale.base, marginTop: tokens.spacing.xs }, children: description })) : null, until ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: (0, weather_utils_1.withAlpha)(ink, 0.8), fontSize: tokens.typography.scale.sm, marginTop: tokens.spacing.xs }, children: ["Until ", until] })) : null] }), onDismiss ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Dismiss alert", onPress: onDismiss, hitSlop: 8, style: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: (0, weather_utils_1.withAlpha)(ink, 0.18) }, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u2715", size: "sm", accessibilityLabel: "Dismiss", style: { color: ink } }) })) : null] }) }));
}
//# sourceMappingURL=WeatherAlertV4.js.map
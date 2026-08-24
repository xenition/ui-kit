"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherAlert = WeatherAlert;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Icon_1 = require("../primitives/Icon");
const weather_utils_1 = require("./weather-utils");
const SEVERITY = {
    advisory: { tone: 'warn', glyph: 'ℹ️', label: 'Advisory' },
    watch: { tone: 'warn', glyph: '⚠️', label: 'Watch' },
    warning: { tone: 'danger', glyph: '⚠️', label: 'Warning' },
    emergency: { tone: 'danger', glyph: '🚨', label: 'Emergency' },
};
/**
 * Banner for a weather advisory. The severity drives the token tone
 * (warn for advisory/watch, danger for warning/emergency) but is ALSO spelled
 * out with a glyph and a text severity label, so it never relies on color
 * alone. The surface is a `warn`/`danger` token tint with a matching left rail.
 * Optional tap + dismiss callbacks. All colors/sizes come from the compiled
 * theme tokens via `useXenitionTheme()` — no literal colors.
 */
function WeatherAlert({ title, description, severity = 'advisory', until, onPress, onDismiss, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = SEVERITY[severity];
    const toneColor = colors[meta.tone];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: onPress ? 'button' : 'alert', accessibilityLabel: `${meta.label}: ${title}`, onPress: onPress, style: ({ pressed }) => [
            {
                flexDirection: 'row',
                gap: tokens.spacing.sm,
                padding: tokens.spacing.md,
                borderRadius: tokens.radius.md,
                borderLeftWidth: 4,
                borderLeftColor: toneColor,
                backgroundColor: (0, weather_utils_1.withAlpha)(toneColor, pressed ? 0.22 : 0.14),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: meta.glyph, size: "lg", accessibilityLabel: meta.label }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                color: toneColor,
                                fontSize: tokens.typography.scale.xs,
                                fontWeight: '700',
                                textTransform: 'uppercase',
                            }, children: meta.label }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale.base,
                            fontWeight: '700',
                            marginTop: 2,
                        }, children: title }), description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale.sm,
                            marginTop: tokens.spacing.xs,
                        }, children: description })) : null, until ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: {
                            color: colors.muted,
                            fontSize: tokens.typography.scale.xs,
                            marginTop: tokens.spacing.xs,
                        }, children: ["Until ", until] })) : null] }), onDismiss ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Dismiss alert", onPress: onDismiss, hitSlop: 8, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u2715", size: "sm", color: "muted", accessibilityLabel: "Dismiss" }) })) : null] }));
}
//# sourceMappingURL=WeatherAlert.js.map
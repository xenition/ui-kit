"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LightControlV4 = LightControlV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
/**
 * LightControl — **V4** "ambient" design. The control-panel take on a light: when
 * the bulb is lit the whole card glows — a soft warm-tinted wash
 * (`withAlpha(warn, 0.08)`), a `warn` border, and a glowing bulb disc; off/`offline`
 * stay calm on `card`. A big legible brightness {@link Slider} and an optional
 * warm→cool color-temperature row keep the base controls; a text
 * `On`/`Off`/`Offline` label carries the state so it never rests on color alone.
 * Sliders disable when off or `offline`. Guards keep the brightness readout in
 * `[0,100]`. Same props/behavior as {@link LightControlProps}; token-only colors
 * via `useXenitionTheme()` (+ `withAlpha`).
 */
function LightControlV4({ name, on = false, brightness = 0, colorTemp, offline = false, onToggle, onBrightnessChange, onColorTempChange, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const disabled = offline || !on;
    const lit = on && !offline;
    const shownBrightness = Math.round(Math.min(Math.max(brightness, 0), 100));
    const statusLabel = offline ? 'Offline' : on ? 'On' : 'Off';
    // Token-derived warm / cool endpoints for the color-temp hint (ramps, not hex).
    const warmTint = tokens.ramps.accent[300];
    const coolTint = tokens.ramps.accent[600];
    const shell = {
        borderRadius: tokens.radius.lg,
        borderWidth: 1,
        padding: tokens.spacing.lg,
        backgroundColor: lit ? (0, color_1.withAlpha)(colors.warn, 0.08) : colors.card,
        borderColor: lit ? (0, color_1.withAlpha)(colors.warn, 0.5) : colors.border,
        ...(lit
            ? { shadowColor: colors.warn, shadowOpacity: 0.18, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 3 }
            : {}),
    };
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { variant: "flat", style: [shell, { opacity: offline ? 0.7 : 1 }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 44,
                            height: 44,
                            borderRadius: tokens.radius.md,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: lit ? (0, color_1.withAlpha)(colors.warn, 0.15) : (0, color_1.withAlpha)(colors.onSurface, 0.05),
                            borderWidth: 1,
                            borderColor: lit ? (0, color_1.withAlpha)(colors.warn, 0.4) : colors.border,
                        }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83D\uDCA1", color: lit ? 'warn' : 'muted', size: "lg" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: name }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: statusLabel })] }), (0, jsx_runtime_1.jsx)(primitives_1.Switch, { checked: on, disabled: offline, onCheckedChange: onToggle, accessibilityLabel: `${name} power` })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { marginTop: tokens.spacing.md, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "Brightness" }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: [shownBrightness, "%"] })] }), (0, jsx_runtime_1.jsx)(primitives_1.Slider, { value: shownBrightness, min: 0, max: 100, step: 1, disabled: disabled, onValueChange: onBrightnessChange })] }), colorTemp != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { marginTop: tokens.spacing.md, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: warmTint, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: "Warm" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: coolTint, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: "Cool" })] }), (0, jsx_runtime_1.jsx)(primitives_1.Slider, { value: Math.min(Math.max(colorTemp, 0), 100), min: 0, max: 100, step: 1, disabled: disabled, onValueChange: onColorTempChange })] })) : null] }));
}
//# sourceMappingURL=LightControlV4.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LightControl = LightControl;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
/**
 * Light controller — an on/off {@link Switch} over brightness and (optional)
 * color-temperature {@link Slider}s. The tinted bulb glyph uses the `warn` slot
 * when lit and `muted` when dark (a text `On`/`Off`/`Offline` label carries the
 * state so it never rests on color alone). Sliders are disabled when the light is
 * off or `offline`, and a warm→cool hint sits under the color-temp track using
 * `tokens.ramps.accent` tints (token-derived, not literal hex). Guards keep the
 * brightness readout in `[0,100]`. No literal colors.
 */
function LightControl({ name, on = false, brightness = 0, colorTemp, offline = false, onToggle, onBrightnessChange, onColorTempChange, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const disabled = offline || !on;
    const shownBrightness = Math.round(Math.min(Math.max(brightness, 0), 100));
    const statusLabel = offline ? 'Offline' : on ? 'On' : 'Off';
    // Token-derived warm / cool endpoints for the color-temp hint (ramps, not hex).
    const warmTint = tokens.ramps.accent[300];
    const coolTint = tokens.ramps.accent[600];
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { variant: on && !offline ? 'elevated' : 'outlined', style: [{ opacity: offline ? 0.7 : 1 }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 36,
                            height: 36,
                            borderRadius: tokens.radius.md,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: colors.surface,
                            borderWidth: 1,
                            borderColor: on && !offline ? colors.warn : colors.border,
                        }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83D\uDCA1", color: on && !offline ? 'warn' : 'muted', size: "lg" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: name }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: statusLabel })] }), (0, jsx_runtime_1.jsx)(primitives_1.Switch, { checked: on, disabled: offline, onCheckedChange: onToggle, accessibilityLabel: `${name} power` })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { marginTop: tokens.spacing.md, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "Brightness" }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: [shownBrightness, "%"] })] }), (0, jsx_runtime_1.jsx)(primitives_1.Slider, { value: shownBrightness, min: 0, max: 100, step: 1, disabled: disabled, onValueChange: onBrightnessChange })] }), colorTemp != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { marginTop: tokens.spacing.md, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: warmTint, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: "Warm" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: coolTint, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: "Cool" })] }), (0, jsx_runtime_1.jsx)(primitives_1.Slider, { value: Math.min(Math.max(colorTemp, 0), 100), min: 0, max: 100, step: 1, disabled: disabled, onValueChange: onColorTempChange })] })) : null] }));
}
//# sourceMappingURL=LightControl.js.map
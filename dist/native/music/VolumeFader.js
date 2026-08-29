"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VolumeFader = VolumeFader;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const types_1 = require("./types");
/**
 * A labelled volume fader — a thin wrapper over the `Slider` primitive that
 * adds a name and a live numeric read-out, plus a `muted` state surfaced in
 * both the dimming *and* the a11y label (never color alone). It owns no audio;
 * drags report out through `onValueChange`. Token-only styling.
 */
function VolumeFader({ value, min = 0, max = 100, step = 1, label, variant = 'labeled', muted = false, unit, disabled = false, onValueChange, onChange, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    // Two spellings, one callback: the original wins when both are passed, so a
    // caller who has migrated half a file never gets the change reported twice.
    const emit = onValueChange ?? onChange;
    const safe = (0, types_1.clamp)(value, min, max);
    const readout = `${Math.round(safe)}${unit ? ` ${unit}` : ''}`;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: label
            ? `${label} volume ${Math.round(safe)}${muted ? ', muted' : ''}`
            : undefined, style: [{ gap: tokens.spacing.xs, opacity: muted || disabled ? 0.55 : 1 }, style], children: [variant === 'labeled' ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, children: [label ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: muted ? `${label} (muted)` : label })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, {})), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: readout })] })) : null, (0, jsx_runtime_1.jsx)(primitives_1.Slider, { value: safe, min: min, max: max, step: step, disabled: disabled, onValueChange: emit })] }));
}
//# sourceMappingURL=VolumeFader.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VolumeFaderV4 = VolumeFaderV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const types_1 = require("./types");
/**
 * VolumeFader — **V4** "session" design. The tactile DAW take on a fader: a
 * token well (`withAlpha(colors.primary, 0.15)`) wrapping the `Slider` primitive
 * so the track reads like a real mixing surface, with the name and a **bold
 * tabular read-out** framing it. `muted` is surfaced in both the dimming *and*
 * the a11y label plus a `(muted)` marker (never color alone). Honors both
 * `variant`s (`labeled` / `bare`) and mirrors the base's drop-in behavior
 * exactly: it owns no audio and reports drags through the same `onValueChange` /
 * `onChange` callbacks (the original spelling wins when both are passed).
 * Token-only colors via `useXenitionTheme()`.
 */
function VolumeFaderV4({ value, min = 0, max = 100, step = 1, label, variant = 'labeled', muted = false, unit, disabled = false, onValueChange, onChange, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    // Two spellings, one callback: the original wins when both are passed, so a
    // caller who has migrated half a file never gets the change reported twice.
    const emit = onValueChange ?? onChange;
    const safe = (0, types_1.clamp)(value, min, max);
    const readout = `${Math.round(safe)}${unit ? ` ${unit}` : ''}`;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: label ? `${label} volume ${Math.round(safe)}${muted ? ', muted' : ''}` : undefined, style: [{ gap: tokens.spacing.xs, opacity: muted || disabled ? 0.55 : 1 }, style], children: [variant === 'labeled' ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, children: [label ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: muted ? `${label} (muted)` : label })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, {})), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: readout })] })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    justifyContent: 'center',
                    paddingHorizontal: tokens.spacing.sm,
                    paddingVertical: tokens.spacing.xs,
                    borderRadius: tokens.radius.md,
                    borderWidth: 1,
                    borderColor: colors.border,
                    backgroundColor: (0, types_1.withAlpha)(colors.primary, 0.15),
                }, children: (0, jsx_runtime_1.jsx)(primitives_1.Slider, { value: safe, min: min, max: max, step: step, disabled: disabled, onValueChange: emit }) })] }));
}
//# sourceMappingURL=VolumeFaderV4.js.map
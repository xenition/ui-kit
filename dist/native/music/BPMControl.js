"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BPMControl = BPMControl;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const types_1 = require("./types");
/**
 * A tempo (BPM) control — a UI shell only, it drives no clock. Shows the tempo
 * read-out with −/＋ steppers (clamped to `[min, max]`) and, in the `tap`
 * variant, a "Tap" button that fires `onTap` for an app to time. The `playing`
 * flag adds a non-color "playing" dot beside the value. Token-only styling.
 */
function BPMControl({ value, min = 40, max = 300, step = 1, variant = 'stepper', playing = false, disabled = false, onChange, onTap, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const safe = (0, types_1.clamp)(value, min, max);
    const bump = (delta) => {
        if (disabled)
            return;
        onChange?.((0, types_1.clamp)(safe + delta, min, max));
    };
    const compact = variant === 'inline';
    const valueSize = compact ? tokens.typography.scale.lg : tokens.typography.scale['3xl'];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: tokens.spacing.sm,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(StepButton, { glyph: "\u2212", a11y: "Decrease tempo", disabled: disabled || safe <= min, onPress: () => bump(-step) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', minWidth: compact ? 56 : 96 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [playing ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    width: 8,
                                    height: 8,
                                    borderRadius: tokens.radius.full,
                                    backgroundColor: colors.success,
                                } })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "text", accessibilityLabel: `Tempo ${(0, types_1.formatBpm)(safe)} beats per minute${playing ? ', playing' : ''}`, style: { color: colors.onSurface, fontSize: valueSize, fontWeight: '800' }, children: (0, types_1.formatBpm)(safe) })] }), !compact ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: "BPM" })) : null] }), (0, jsx_runtime_1.jsx)(StepButton, { glyph: "\uFF0B", a11y: "Increase tempo", disabled: disabled || safe >= max, onPress: () => bump(step) }), variant === 'tap' ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Tap tempo", disabled: disabled, onPress: onTap, style: ({ pressed }) => ({
                    paddingVertical: tokens.spacing.xs,
                    paddingHorizontal: tokens.spacing.md,
                    borderRadius: tokens.radius.md,
                    backgroundColor: (0, types_1.withAlpha)(colors.primary, pressed ? 0.28 : 0.16),
                    opacity: disabled ? 0.5 : 1,
                }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: "Tap" }) })) : null] }));
}
function StepButton({ glyph, a11y, disabled, onPress, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, accessibilityState: { disabled }, disabled: disabled, onPress: onPress, style: ({ pressed }) => ({
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: tokens.radius.full,
            borderWidth: 1,
            borderColor: colors.border,
            opacity: disabled ? 0.4 : pressed ? 0.8 : 1,
        }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: glyph, size: "lg", color: "onSurface" }) }));
}
//# sourceMappingURL=BPMControl.js.map
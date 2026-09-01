"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BPMControlV4 = BPMControlV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const types_1 = require("./types");
/**
 * BPMControl — **V4** "session" design (native parity of the web V4). The
 * tactile take on a tempo control: big **bold tabular numerals** on a rounded
 * token surface, flanked by satisfying ≥44px round −/＋ steppers. Honors every
 * `variant` — `stepper` (readout + steppers), `inline` (compact single-row),
 * and `tap` (adds a soft-primary "Tap" tempo button firing `onTap`). Steps
 * clamp to `[min, max]` via `clamp` and render through `formatBpm`; `playing`
 * lights a non-color `♪` marker. No gradient — transport controls stay
 * clean/tactile. Token-only colors via `useXenitionTheme()`.
 */
function BPMControlV4({ value, min = 40, max = 300, step = 1, variant = 'stepper', playing = false, disabled = false, onChange, onTap, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const safe = (0, types_1.clamp)(value, min, max);
    const compact = variant === 'inline';
    const bump = (delta) => {
        if (disabled)
            return;
        onChange?.((0, types_1.clamp)(safe + delta, min, max));
    };
    const valueSize = compact ? tokens.typography.scale.xl : tokens.typography.scale['3xl'];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: tokens.spacing.sm,
                padding: tokens.spacing.sm,
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
                opacity: disabled ? 0.6 : 1,
                alignSelf: 'flex-start',
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(StepButton, { glyph: "\u2212", a11y: "Decrease tempo", disabled: disabled || safe <= min, onPress: () => bump(-step) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', minWidth: compact ? 64 : 104 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [playing ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u266A", size: "sm", color: "primary", accessibilityLabel: "playing" }) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "text", accessibilityLabel: `Tempo ${(0, types_1.formatBpm)(safe)} beats per minute${playing ? ', playing' : ''}`, style: { color: colors.onSurface, fontSize: valueSize, fontWeight: '800', fontVariant: ['tabular-nums'] }, children: (0, types_1.formatBpm)(safe) })] }), !compact ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700', letterSpacing: 0.5 }, children: "BPM" })) : null] }), (0, jsx_runtime_1.jsx)(StepButton, { glyph: "\uFF0B", a11y: "Increase tempo", disabled: disabled || safe >= max, onPress: () => bump(step) }), variant === 'tap' ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Tap tempo", disabled: disabled, onPress: onTap, style: ({ pressed }) => ({
                    minHeight: 44,
                    justifyContent: 'center',
                    paddingVertical: tokens.spacing.xs,
                    paddingHorizontal: tokens.spacing.md,
                    borderRadius: tokens.radius.md,
                    backgroundColor: (0, types_1.withAlpha)(colors.primary, pressed ? 0.28 : 0.16),
                    opacity: disabled ? 0.4 : 1,
                }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: "Tap" }) })) : null] }));
}
function StepButton({ glyph, a11y, disabled, onPress, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, accessibilityState: { disabled }, disabled: disabled, onPress: onPress, style: ({ pressed }) => ({
            width: 44,
            height: 44,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: tokens.radius.full,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: pressed ? (0, types_1.withAlpha)(colors.primary, 0.1) : colors.surface,
            opacity: disabled ? 0.4 : 1,
        }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: glyph, size: "lg", color: "onSurface" }) }));
}
//# sourceMappingURL=BPMControlV4.js.map
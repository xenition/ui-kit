"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuantityStepper = QuantityStepper;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
/**
 * A −/n/+ quantity control — the native mirror of the web `QuantityStepper`.
 * Values are clamped to `[min, max]`; the boundary button disables itself at
 * each end so `onChange` never fires an out-of-range value. Token-only.
 */
function QuantityStepper({ value, min = 1, max = Number.POSITIVE_INFINITY, step = 1, onChange, disabled = false, label = 'Quantity', decrementLabel = 'Decrease quantity', incrementLabel = 'Increase quantity', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const atMin = value <= min;
    const atMax = value >= max;
    const emit = (next) => {
        const clamped = clamp(next, min, max);
        if (clamped !== value)
            onChange?.(clamped);
    };
    const button = (kind, accLabel, isDisabled, onPress, borderSide) => ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: accLabel, accessibilityState: { disabled: isDisabled }, disabled: isDisabled, onPress: onPress, style: ({ pressed }) => [
            {
                width: 32,
                height: 32,
                alignItems: 'center',
                justifyContent: 'center',
                opacity: isDisabled ? 0.4 : pressed ? 0.7 : 1,
            },
            borderSide,
        ], children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg }, children: kind === 'dec' ? '−' : '+' }) }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "adjustable", accessibilityLabel: label, accessibilityValue: { now: value, min, max: Number.isFinite(max) ? max : undefined }, style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'flex-start',
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: tokens.radius.md,
                backgroundColor: colors.surface,
                overflow: 'hidden',
            },
            style,
        ], children: [button('dec', decrementLabel, disabled || atMin, () => emit(value - step), {
                borderRightWidth: 1,
                borderColor: colors.border,
            }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityLiveRegion: "polite", style: {
                    minWidth: 32,
                    textAlign: 'center',
                    paddingHorizontal: tokens.spacing.sm,
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: '500',
                }, children: value }), button('inc', incrementLabel, disabled || atMax, () => emit(value + step), {
                borderLeftWidth: 1,
                borderColor: colors.border,
            })] }));
}
//# sourceMappingURL=QuantityStepper.js.map
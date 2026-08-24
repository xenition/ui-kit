"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpVerify = OtpVerify;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
/**
 * One-time-code verification — reuses the {@link PinInput} primitive for entry
 * and adds the surrounding flow: a "sent to {destination}" line, an error slot,
 * a Verify button and a resend link with an optional countdown. When
 * `autoSubmit` is on it fires `onVerify` as soon as the code fills, matching the
 * SMS-autofill idiom. Colors come from tokens/primitives. No literal colors.
 */
function OtpVerify({ destination, length = 6, value, onChange, onVerify, onResend, error, loading = false, resendCountdown, verifyLabel = 'Verify', autoSubmit = true, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const handleChange = (next) => {
        onChange(next);
        if (autoSubmit && next.length === length)
            onVerify?.(next);
    };
    const canResend = resendCountdown == null || resendCountdown <= 0;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.lg, alignItems: 'center' }, style], children: [destination ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base, textAlign: 'center' }, children: ["Enter the code we sent to", ' ', (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontWeight: '700' }, children: destination })] })) : null, (0, jsx_runtime_1.jsx)(primitives_1.PinInput, { length: length, value: value, onChange: handleChange }), error ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityLiveRegion: "assertive", style: { color: colors.danger, fontSize: tokens.typography.scale.sm, textAlign: 'center' }, children: error })) : null, (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "lg", loading: loading, disabled: value.length < length, onPress: () => onVerify?.(value), accessibilityLabel: verifyLabel, style: { alignSelf: 'stretch' }, children: verifyLabel }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Resend code", accessibilityState: { disabled: !canResend }, disabled: !canResend, onPress: onResend, hitSlop: tokens.spacing.sm, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                        color: canResend ? colors.primary : colors.muted,
                        fontSize: tokens.typography.scale.sm,
                        fontWeight: '600',
                    }, children: canResend ? 'Resend code' : `Resend in ${Math.max(0, resendCountdown ?? 0)}s` }) })] }));
}
//# sourceMappingURL=OtpVerify.js.map
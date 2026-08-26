"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpVerifyV2 = OtpVerifyV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const elevation_1 = require("../primitives/internal/elevation");
const GetStartedButton_1 = require("./GetStartedButton");
/** §10: geometry only — 56 is the code-cell height, 44 the minimum tap target. */
const CELL_HEIGHT = 56;
const TAP_TARGET = 44;
/** §3: the hero never eats more than ~38% of the screen, even full-bleed. */
const HERO_MAX_SCREEN_FRACTION = 0.38;
const DEFAULT_RESEND_INTERVAL = 30;
/**
 * Code verification — V2, the editorial line. The hero runs full-bleed to the
 * top edge and the content sheet rises over the seam carrying the headline, the
 * §6 code cells and the sticky CTA. The cells keep the base line's contract
 * exactly: 56 tall, focus raises the border to `primary`, an error holds it at
 * `danger` and prints the message — never colour alone.
 *
 * Same props as {@link OtpVerify}. Token-pure.
 */
function OtpVerifyV2({ destination, length = 6, value, onChange, onVerify, onResend, error, loading = false, resendCountdown, verifyLabel = 'Verify', autoSubmit = true, title, subtitle, illustration, logoGlyph, progress, onBack, onDismiss, resendInterval = DEFAULT_RESEND_INTERVAL, resendNotice, resendPrompt = "Didn't get the code?", style, }) {
    const { colors, tokens, scheme } = (0, theme_1.useXenitionTheme)();
    /*
      §3 asks for a "tinted ground" and names `primary[50]`. Taken literally that
      is wrong on native in dark mode: `toNativeTokens` copies the LIGHT
      orientation of the ramps into both schemes (unlike the emitted CSS vars,
      which invert), so `primary[50]` paints a near-white panel behind a
      near-black page. Read the dark end of the same ramp instead — still a
      compiled token, still scheme-correct.
    */
    const tintedGround = scheme === 'dark' ? tokens.ramps.primary[900] : tokens.ramps.primary[50];
    const { height: screenHeight } = (0, react_native_1.useWindowDimensions)();
    const refs = React.useRef([]);
    const [focusedIndex, setFocusedIndex] = React.useState(null);
    const chars = Array.from({ length }, (_, i) => value[i] ?? '');
    const invalid = error != null && error !== '';
    const setChar = (i, c) => {
        const ch = c.slice(-1);
        const next = chars.slice();
        next[i] = ch;
        const joined = next.join('');
        onChange(joined);
        if (ch && i < length - 1)
            refs.current[i + 1]?.focus();
        if (autoSubmit && joined.length === length)
            onVerify?.(joined);
    };
    const onKeyPress = (i, e) => {
        if (e.nativeEvent.key === 'Backspace' && !chars[i] && i > 0)
            refs.current[i - 1]?.focus();
    };
    const remaining = Math.max(0, resendCountdown ?? 0);
    const canResend = resendCountdown == null || resendCountdown <= 0;
    const interval = resendInterval > 0 ? resendInterval : DEFAULT_RESEND_INTERVAL;
    const elapsed = Math.max(0, interval - Math.min(remaining, interval));
    const showHeader = onBack != null || onDismiss != null || progress != null;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ backgroundColor: colors.surface }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    height: screenHeight * HERO_MAX_SCREEN_FRACTION,
                    backgroundColor: tintedGround,
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                }, children: [illustration ?? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: TAP_TARGET * 2,
                            height: TAP_TARGET * 2,
                            borderRadius: tokens.radius.full,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: colors.primary,
                        }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: logoGlyph ?? '✉', size: "3xl", color: "onPrimary" }) })), showHeader ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.sm,
                            paddingHorizontal: tokens.spacing.sm,
                        }, children: [onBack ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Back", onPress: onBack, style: { width: TAP_TARGET, height: TAP_TARGET, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "chevron-left", size: "xl", color: "onSurface" }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: TAP_TARGET, height: TAP_TARGET } })), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, alignItems: 'center' }, children: progress }), onDismiss ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Dismiss", onPress: onDismiss, style: { width: TAP_TARGET, height: TAP_TARGET, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "close", size: "lg", color: "muted" }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: TAP_TARGET, height: TAP_TARGET } }))] })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    marginTop: -tokens.spacing.xl,
                    padding: tokens.spacing.xl,
                    gap: tokens.spacing.lg,
                    backgroundColor: colors.surface,
                    borderTopLeftRadius: tokens.radius.lg,
                    borderTopRightRadius: tokens.radius.lg,
                    ...(0, elevation_1.shadow)('lg', tokens),
                }, children: [title != null || subtitle != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: [title ? ((0, jsx_runtime_1.jsx)(primitives_1.Text, { accessibilityRole: "header", size: "2xl", weight: "bold", tone: "onSurface", align: "center", numberOfLines: 2, children: title })) : null, subtitle ? ((0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "base", tone: "muted", align: "center", numberOfLines: 3, children: subtitle })) : null] })) : null, subtitle == null && destination ? ((0, jsx_runtime_1.jsxs)(primitives_1.Text, { size: "base", tone: "muted", align: "center", children: ["Enter the code we sent to", ' ', (0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "base", weight: "bold", tone: "onSurface", children: destination })] })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm, alignSelf: 'stretch' }, children: chars.map((c, i) => {
                            const borderColor = invalid ? colors.danger : focusedIndex === i ? colors.primary : colors.border;
                            return ((0, jsx_runtime_1.jsx)(react_native_1.TextInput, { ref: (el) => {
                                    refs.current[i] = el;
                                }, accessibilityLabel: `Digit ${i + 1}`, keyboardType: "numeric", maxLength: 1, value: c, onChangeText: (t) => setChar(i, t), onKeyPress: (e) => onKeyPress(i, e), onFocus: () => setFocusedIndex(i), onBlur: () => setFocusedIndex((current) => (current === i ? null : current)), style: {
                                    flex: 1,
                                    maxWidth: CELL_HEIGHT,
                                    height: CELL_HEIGHT,
                                    textAlign: 'center',
                                    fontSize: tokens.typography.scale.lg,
                                    fontWeight: '600',
                                    color: colors.onSurface,
                                    backgroundColor: colors.surface,
                                    borderWidth: 1,
                                    borderColor,
                                    borderRadius: tokens.radius.lg,
                                } }, i));
                        }) }), invalid ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLiveRegion: "assertive", style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "error", size: "sm", color: "danger" }), (0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "sm", tone: "dangerText", children: error })] })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs, alignSelf: 'stretch' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "sm", tone: "muted", children: resendPrompt }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Resend code", accessibilityState: { disabled: !canResend }, disabled: !canResend, onPress: onResend, style: { minHeight: TAP_TARGET, justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "sm", weight: "semibold", tone: canResend ? 'primary' : 'muted', children: canResend ? 'Resend code' : `Resend in ${remaining}s` }) })] }), !canResend ? (0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: elapsed, max: interval, size: "sm" }) : null, resendNotice ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLiveRegion: "polite", style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "check", size: "sm", color: "success" }), (0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "sm", tone: "successText", children: resendNotice })] })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            marginTop: 'auto',
                            alignSelf: 'stretch',
                            borderTopWidth: 1,
                            borderTopColor: colors.border,
                            backgroundColor: colors.surface,
                            paddingTop: tokens.spacing.md,
                            paddingBottom: tokens.spacing.lg,
                        }, children: (0, jsx_runtime_1.jsx)(GetStartedButton_1.GetStartedButton, { label: verifyLabel, trailingArrow: false, loading: loading, disabled: value.length < length, onPress: () => onVerify?.(value) }) })] })] }));
}
//# sourceMappingURL=OtpVerifyV2.js.map
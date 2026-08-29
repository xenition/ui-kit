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
exports.OtpVerify = OtpVerify;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const GetStartedButton_1 = require("./GetStartedButton");
/*
  Geometry, not theme. ONBOARDING-DESIGN-SPEC §10 allows exactly these bare
  numbers: 56 — the height a §6 field stands at, which the code cells now match —
  and 44, the minimum tap target for a header control or a text link (§7). Every
  colour, radius, gap and font size on this screen comes from the theme.
*/
const CELL_HEIGHT = 56;
const TAP_TARGET = 44;
/** §3: the hero panel is roughly 4:3 and never eats more than ~38% of the screen. */
const HERO_ASPECT = 4 / 3;
const HERO_MAX_SCREEN_FRACTION = 0.38;
/** Default cooldown length, in seconds, for the resend progress bar. */
const DEFAULT_RESEND_INTERVAL = 30;
/**
 * One-time-code verification — the code-entry step, rebuilt to the anatomy in
 * `ONBOARDING-DESIGN-SPEC.md`: an optional header (back · progress · dismiss),
 * a hero slot, a headline block, the code field, and the sticky CTA footer.
 *
 * **The code cells are owned here rather than delegated to `PinInput`.** §6
 * requires an error state that raises the field's border to `danger` alongside
 * a `dangerText` message — never colour alone — and `PinInput` has no error or
 * focus contract to express that. The cells keep `PinInput`'s behaviour exactly
 * (single character each, focus advances on entry, backspace retreats) at the
 * §6 geometry: 56 tall, `radius.lg`, a 1px border that rises to `primary` on
 * focus.
 *
 * The **resend affordance shows its cooldown**: the label counts down, a
 * draining bar shows how much of the wait is left, and `resendNotice` confirms
 * the send in a polite live region. A user who cannot tell whether resend
 * worked taps it again, and again — which is how an account ends up
 * rate-limited by its own verification screen.
 *
 * When `autoSubmit` is on it fires `onVerify` as soon as the code fills,
 * matching the SMS-autofill idiom. Every new prop is optional. No literal
 * colors.
 */
function OtpVerify({ destination, length = 6, value, onChange, onVerify, onResend, error, loading = false, resendCountdown, verifyLabel = 'Verify', autoSubmit = true, title, subtitle, illustration, logoGlyph, progress, onBack, onDismiss, resendInterval = DEFAULT_RESEND_INTERVAL, resendNotice, resendPrompt = "Didn't get the code?", style, }) {
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
    const showHero = illustration != null || logoGlyph != null;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.lg }, style], children: [showHeader ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [onBack ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Back", onPress: onBack, style: { width: TAP_TARGET, height: TAP_TARGET, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "chevron-left", size: "xl", color: "onSurface" }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: TAP_TARGET, height: TAP_TARGET } })), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, alignItems: 'center' }, children: progress }), onDismiss ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Dismiss", onPress: onDismiss, style: { width: TAP_TARGET, height: TAP_TARGET, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "close", size: "lg", color: "muted" }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: TAP_TARGET, height: TAP_TARGET } }))] })) : null, showHero ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    alignSelf: 'stretch',
                    aspectRatio: HERO_ASPECT,
                    maxHeight: screenHeight * HERO_MAX_SCREEN_FRACTION,
                    borderRadius: tokens.radius.lg,
                    backgroundColor: tintedGround,
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    padding: tokens.spacing.lg,
                }, children: illustration ?? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: TAP_TARGET * 2,
                        height: TAP_TARGET * 2,
                        borderRadius: tokens.radius.full,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: colors.primary,
                    }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: logoGlyph, size: "3xl", color: "onPrimary" }) })) })) : null, title != null || subtitle != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: [title ? ((0, jsx_runtime_1.jsx)(primitives_1.Text, { accessibilityRole: "header", size: "2xl", weight: "bold", tone: "onSurface", align: "center", numberOfLines: 2, children: title })) : null, subtitle ? ((0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "base", tone: "muted", align: "center", numberOfLines: 3, children: subtitle })) : null] })) : null, subtitle == null && destination ? ((0, jsx_runtime_1.jsxs)(primitives_1.Text, { size: "base", tone: "muted", align: "center", children: ["Enter the code we sent to", ' ', (0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "base", weight: "bold", tone: "onSurface", children: destination })] })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm, alignSelf: 'stretch' }, children: chars.map((c, i) => {
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
                }, children: (0, jsx_runtime_1.jsx)(GetStartedButton_1.GetStartedButton, { label: verifyLabel, trailingArrow: false, loading: loading, disabled: value.length < length, onPress: () => onVerify?.(value) }) })] }));
}
//# sourceMappingURL=OtpVerify.js.map
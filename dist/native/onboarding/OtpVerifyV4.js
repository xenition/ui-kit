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
exports.OtpVerifyV4 = OtpVerifyV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const IconV4_1 = require("../primitives/IconV4");
const ProgressV4_1 = require("../primitives/ProgressV4");
const TextV4_1 = require("../primitives/TextV4");
const field_v4_1 = require("../primitives/internal/field-v4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const GetStartedButtonV4_1 = require("./GetStartedButtonV4");
const flow_v4_1 = require("./internal/flow-v4");
/** Default seconds between resends when the caller supplies no interval. */
const DEFAULT_RESEND_INTERVAL = 30;
/**
 * **V4 code verification** — the base's props plus `fullScreen` and four copy
 * hooks, all optional.
 *
 * ## Five changes
 *
 * 1. **The cells are on the shared field metrics.** `fieldMetrics()`,
 *    `fieldBorder()` and `haloStyle()` — the same height, radius, border and
 *    focus halo `InputV4` and every other V4 control take. The base picked its
 *    own `CELL_HEIGHT`, its own radius and its own focus colour, so the code
 *    field was visibly a different control from the email field one screen
 *    earlier.
 * 2. **Focus does not move the layout.** The halo's space is reserved whether
 *    or not it shows, so tapping a cell no longer nudges the row.
 * 3. **Every English string is a prop.** `resendLabel`,
 *    `formatResendCountdown`, `formatDigitLabel`, `formatDestination` — four
 *    sentences that were unreachable inside a module whose contract is that
 *    copy is caller-supplied.
 * 4. **The digit label carries the total** ("Digit 3 of 6").
 * 5. **`fullScreen`** — the shared shell.
 *
 * `PinInputV4` is deliberately **not** composed here. It takes exactly its
 * base's props (`length`, `value`, `onChange`) and therefore has no way to
 * express an invalid code — and a verification screen that cannot show a wrong
 * code is not a verification screen. Closing that gap belongs in `PinInput`,
 * per the design spec's Addendum, not in a private fork here; until it is
 * closed these cells carry the shared field metrics so the two still match.
 */
function OtpVerifyV4({ destination, length = 6, value, onChange, onVerify, onResend, error, loading = false, resendCountdown, verifyLabel = 'Verify', autoSubmit = true, title, subtitle, illustration, logoGlyph, progress, onBack, onDismiss, resendInterval = DEFAULT_RESEND_INTERVAL, resendNotice, resendPrompt = "Didn't get the code?", resendLabel = 'Resend code', formatResendCountdown, formatDigitLabel, formatDestination, fullScreen = false, ground = 'plain', accent = 'primary', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const grounds = (0, flow_v4_1.flowGrounds)(theme, ground, accent);
    const metrics = (0, field_v4_1.fieldMetrics)(theme);
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
    const showHero = illustration != null || logoGlyph != null;
    const digitLabel = formatDigitLabel ?? ((n, total) => `Digit ${n} of ${total}`);
    const countdownLabel = formatResendCountdown ?? ((seconds) => `Resend in ${seconds}s`);
    const cells = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm, alignSelf: 'stretch' }, children: chars.map((c, i) => {
            const focused = focusedIndex === i;
            return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
                    { flex: 1, maxWidth: metrics.height + metrics.ring * 2 },
                    (0, field_v4_1.haloStyle)(theme, { showing: focused, accent: colors.ring }),
                ], children: (0, jsx_runtime_1.jsx)(react_native_1.TextInput, { ref: (el) => {
                        refs.current[i] = el;
                    }, accessibilityLabel: digitLabel(i + 1, length), keyboardType: "numeric", maxLength: 1, value: c, onChangeText: (t) => setChar(i, t), onKeyPress: (e) => onKeyPress(i, e), onFocus: () => setFocusedIndex(i), onBlur: () => setFocusedIndex((current) => (current === i ? null : current)), style: [
                        {
                            height: metrics.height,
                            textAlign: 'center',
                            fontSize: tokens.typography.scale.lg,
                            fontWeight: '600',
                            color: colors.onSurface,
                            backgroundColor: colors.surface,
                            borderRadius: metrics.radius,
                        },
                        (0, field_v4_1.fieldBorder)(theme, { invalid, focused }),
                    ] }) }, i));
        }) }));
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [showHero ? ((0, jsx_runtime_1.jsx)(flow_v4_1.FlowHeroV4, { illustration: illustration, logoGlyph: logoGlyph, grounds: grounds })) : null, (0, jsx_runtime_1.jsx)(flow_v4_1.FlowHeadlineV4, { title: title ?? '', subtitle: subtitle }), subtitle == null && destination ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", tone: "mutedText", align: "center", children: formatDestination ? (formatDestination(destination)) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["Enter the code we sent to", ' ', (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onSurface", children: destination })] })) })) : null, cells, invalid ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLiveRegion: "assertive", style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: tokens.spacing.xs,
                }, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "error", size: "sm", color: "dangerText" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "dangerText", children: error })] })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs, alignSelf: 'stretch' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: tokens.spacing.xs,
                        }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: resendPrompt }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: resendLabel, accessibilityState: { disabled: !canResend }, disabled: !canResend, onPress: onResend, style: ({ pressed }) => ({
                                    minHeight: (0, chrome_v4_1.minTap)(tokens.spacing),
                                    justifyContent: 'center',
                                    paddingHorizontal: tokens.spacing.xs,
                                    borderRadius: tokens.radius.md,
                                    backgroundColor: pressed ? (0, state_v4_1.pressLayer)(theme) : 'transparent',
                                }), children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: canResend ? 'primaryText' : 'mutedText', numeric: "tabular", children: canResend ? resendLabel : countdownLabel(remaining) }) })] }), !canResend ? (0, jsx_runtime_1.jsx)(ProgressV4_1.ProgressV4, { value: elapsed, max: interval, size: "sm" }) : null, resendNotice ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLiveRegion: "polite", style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: tokens.spacing.xs,
                        }, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "check", size: "sm", color: "successText" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "successText", children: resendNotice })] })) : null] })] }));
    const header = (0, jsx_runtime_1.jsx)(flow_v4_1.FlowHeaderV4, { onBack: onBack, onDismiss: onDismiss, progress: progress });
    const footer = ((0, jsx_runtime_1.jsx)(flow_v4_1.FlowFooterV4, { safeArea: fullScreen, children: (0, jsx_runtime_1.jsx)(GetStartedButtonV4_1.GetStartedButtonV4, { label: verifyLabel, trailingArrow: false, loading: loading, disabled: value.length < length, onPress: () => onVerify?.(value) }) }));
    if (fullScreen) {
        return ((0, jsx_runtime_1.jsx)(flow_v4_1.FlowScreenV4, { grounds: grounds, center: false, keyboardAware: true, header: header, footer: footer, style: style, children: body }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.lg }, style], children: [onBack != null || onDismiss != null || progress != null ? header : null, body, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: 'auto', alignSelf: 'stretch' }, children: footer })] }));
}
//# sourceMappingURL=OtpVerifyV4.js.map
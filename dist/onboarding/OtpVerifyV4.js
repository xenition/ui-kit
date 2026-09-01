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
exports.OtpVerifyV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const IconV4_1 = require("../primitives/IconV4");
const ProgressV4_1 = require("../primitives/ProgressV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const field_v4_1 = require("../primitives/internal/field-v4");
const inject_1 = require("../motion/internal/inject");
const GetStartedButtonV4_1 = require("./GetStartedButtonV4");
const flow_v4_1 = require("./internal/flow-v4");
/** Default seconds between resends when the caller supplies no interval. */
const DEFAULT_RESEND_INTERVAL = 30;
/**
 * **V4 code verification** — the web twin of the native `OtpVerifyV4`: the
 * base's props plus `fullScreen` and four copy hooks.
 *
 * ## Five changes
 *
 * 1. **The cells are on the shared field skin.** `FIELD_V4_SHELL`'s height and
 *    radius, `fieldBorderClass()`, and the one focus ring every V4 control
 *    draws — the base picked its own cell class, so the code field was visibly
 *    a different control from the email field one screen earlier.
 * 2. **Focus does not move the layout.** The ring is a `box-shadow`, so
 *    arming it costs no layout.
 * 3. **Every English string is a prop** — four sentences that were unreachable
 *    inside a module whose contract is that copy is caller-supplied.
 * 4. **The digit label carries the total** ("Digit 3 of 6").
 * 5. **`fullScreen`** — the shared shell.
 *
 * `PinInputV4` is deliberately not composed: it takes exactly its base's props
 * and therefore cannot express an invalid code, and a verification screen that
 * cannot show a wrong code is not a verification screen. Closing that gap
 * belongs in `PinInput`, per the design spec's Addendum.
 */
exports.OtpVerifyV4 = React.forwardRef(function OtpVerifyV4({ destination, length = 6, value, onChange, onVerify, onResend, error, loading = false, resendCountdown, verifyLabel = 'Verify', autoSubmit = true, title, subtitle, illustration, logoGlyph, progress, onBack, onDismiss, resendInterval = DEFAULT_RESEND_INTERVAL, resendNotice, resendPrompt = "Didn't get the code?", resendLabel = 'Resend code', formatResendCountdown, formatDigitLabel, formatDestination, fullScreen = false, ground = 'plain', accent = 'primary', className, style, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(field_v4_1.FIELD_V4_STYLE_ID, field_v4_1.FIELD_V4_CSS);
    const cells = React.useRef([]);
    const chars = Array.from({ length }, (_, i) => value[i] ?? '');
    const invalid = error != null && error !== '';
    const setChar = (i, c) => {
        const ch = c.slice(-1);
        const next = chars.slice();
        next[i] = ch;
        const joined = next.join('');
        onChange(joined);
        if (ch && i < length - 1)
            cells.current[i + 1]?.focus();
        if (autoSubmit && joined.length === length)
            onVerify?.(joined);
    };
    const onKeyDown = (i, e) => {
        if (e.key === 'Backspace' && !chars[i] && i > 0)
            cells.current[i - 1]?.focus();
    };
    const remaining = Math.max(0, resendCountdown ?? 0);
    const canResend = resendCountdown == null || resendCountdown <= 0;
    const interval = resendInterval > 0 ? resendInterval : DEFAULT_RESEND_INTERVAL;
    const elapsed = Math.max(0, interval - Math.min(remaining, interval));
    const showHero = illustration != null || logoGlyph != null;
    const digitLabel = formatDigitLabel ?? ((n, total) => `Digit ${n} of ${total}`);
    const countdownLabel = formatResendCountdown ?? ((seconds) => `Resend in ${seconds}s`);
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [showHero ? (0, jsx_runtime_1.jsx)(flow_v4_1.FlowHeroV4, { illustration: illustration, logoGlyph: logoGlyph }) : null, (0, jsx_runtime_1.jsx)(flow_v4_1.FlowHeadlineV4, { title: title ?? '', subtitle: subtitle }), subtitle == null && destination ? ((0, jsx_runtime_1.jsx)("p", { className: "text-center text-base text-muted-text", children: formatDestination ? (formatDestination(destination)) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["Enter the code we sent to", ' ', (0, jsx_runtime_1.jsx)("strong", { className: "font-bold text-on-surface", children: destination })] })) })) : null, (0, jsx_runtime_1.jsx)("div", { className: "flex w-full gap-sm", children: chars.map((c, i) => ((0, jsx_runtime_1.jsx)("input", { ref: (el) => {
                        cells.current[i] = el;
                    }, "data-xen-v4-field": "", "aria-label": digitLabel(i + 1, length), "aria-invalid": invalid || undefined, inputMode: "numeric", maxLength: 1, value: c, onChange: (e) => setChar(i, e.target.value), onKeyDown: (e) => onKeyDown(i, e), style: (0, field_v4_1.fieldRingVars)(invalid), className: (0, cn_1.cn)(
                    // The shared control geometry, not a per-screen cell class: a
                    // code cell is a field, and it should be the same object the
                    // email field on the previous screen was.
                    'min-w-0 flex-1 rounded-[var(--xen-radius-md)] border bg-surface text-center text-lg font-semibold text-on-surface', 'h-[var(--xen-space-2xl)] max-w-[var(--xen-space-2xl)]', (0, field_v4_1.fieldBorderClass)(invalid)) }, i))) }), invalid ? ((0, jsx_runtime_1.jsxs)("p", { "aria-live": "assertive", className: "flex items-center justify-center gap-xs text-sm text-danger-text", children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "error", size: "sm" }), error] })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex w-full flex-col gap-xs", children: [(0, jsx_runtime_1.jsxs)("p", { className: "flex items-center justify-center gap-xs text-sm text-muted-text", children: [resendPrompt, (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": resendLabel, disabled: !canResend, onClick: onResend, "data-xen-v4-chrome": "on-surface", className: (0, cn_1.cn)('rounded-[var(--xen-radius-md)] px-xs text-sm font-semibold [font-variant-numeric:tabular-nums]', chrome_v4_1.MIN_TAP_CLASS, canResend ? 'text-primary-text' : 'text-muted-text'), children: canResend ? resendLabel : countdownLabel(remaining) })] }), !canResend ? (0, jsx_runtime_1.jsx)(ProgressV4_1.ProgressV4, { value: elapsed, max: interval, size: "sm" }) : null, resendNotice ? ((0, jsx_runtime_1.jsxs)("p", { "aria-live": "polite", className: "flex items-center justify-center gap-xs text-sm text-success-text", children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "check", size: "sm" }), resendNotice] })) : null] })] }));
    const header = (0, jsx_runtime_1.jsx)(flow_v4_1.FlowHeaderV4, { onBack: onBack, onDismiss: onDismiss, progress: progress });
    const footer = ((0, jsx_runtime_1.jsx)(flow_v4_1.FlowFooterV4, { safeArea: fullScreen, children: (0, jsx_runtime_1.jsx)(GetStartedButtonV4_1.GetStartedButtonV4, { label: verifyLabel, trailingArrow: false, loading: loading, disabled: value.length < length, onClick: () => onVerify?.(value) }) }));
    if (fullScreen) {
        return ((0, jsx_runtime_1.jsx)(flow_v4_1.FlowScreenV4, { ref: ref, ...rest, ground: ground, accent: accent, center: false, className: className, style: style, header: header, footer: footer, children: body }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, style: { ...(0, flow_v4_1.flowGroundVars)(ground, accent), ...style }, className: (0, cn_1.cn)('flex flex-col items-center gap-lg', className), ...rest, children: [onBack != null || onDismiss != null || progress != null ? header : null, body, (0, jsx_runtime_1.jsx)("div", { className: "mt-auto w-full", children: footer })] }));
});
//# sourceMappingURL=OtpVerifyV4.js.map
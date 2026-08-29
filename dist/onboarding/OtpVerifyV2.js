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
exports.OtpVerifyV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const Progress_1 = require("../primitives/Progress");
const Text_1 = require("../primitives/Text");
const GetStartedButton_1 = require("./GetStartedButton");
/** §10: geometry only — 56 (`h-14`) is the code-cell size, 44 the tap target. */
const CELL_CLASS = 'h-14 w-14';
const TAP_TARGET_CLASS = 'min-h-11';
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
exports.OtpVerifyV2 = React.forwardRef(function OtpVerifyV2({ destination, length = 6, value, onChange, onVerify, onResend, error, loading = false, resendCountdown, verifyLabel = 'Verify', autoSubmit = true, title, subtitle, illustration, logoGlyph, progress, onBack, onDismiss, resendInterval = DEFAULT_RESEND_INTERVAL, resendNotice, resendPrompt = "Didn't get the code?", className, ...rest }, ref) {
    const refs = React.useRef([]);
    const chars = Array.from({ length }, (_, i) => value[i] ?? '');
    const invalid = error != null && error !== '';
    const setChar = (i, c) => {
        const next = chars.slice();
        next[i] = c.slice(-1);
        const joined = next.join('');
        onChange(joined);
        if (c && i < length - 1)
            refs.current[i + 1]?.focus();
        if (autoSubmit && joined.length === length)
            onVerify?.(joined);
    };
    const onKeyDown = (i, e) => {
        if (e.key === 'Backspace' && !chars[i] && i > 0)
            refs.current[i - 1]?.focus();
    };
    const remaining = Math.max(0, resendCountdown ?? 0);
    const canResend = resendCountdown == null || resendCountdown <= 0;
    const interval = resendInterval > 0 ? resendInterval : DEFAULT_RESEND_INTERVAL;
    const elapsed = Math.max(0, interval - Math.min(remaining, interval));
    const showHeader = onBack != null || onDismiss != null || progress != null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col bg-surface', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative flex h-[38vh] items-center justify-center overflow-hidden bg-primary-50", children: [illustration ?? ((0, jsx_runtime_1.jsx)("span", { className: "flex h-[88px] w-[88px] items-center justify-center rounded-full bg-primary", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: logoGlyph ?? '✉', size: "3xl", color: "onPrimary" }) })), showHeader ? ((0, jsx_runtime_1.jsxs)("div", { className: "absolute inset-x-0 top-0 flex items-center gap-sm px-sm", children: [onBack ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Back", onClick: onBack, className: "flex h-11 w-11 items-center justify-center", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "chevron-left", size: "xl", color: "onSurface" }) })) : ((0, jsx_runtime_1.jsx)("span", { className: "h-11 w-11" })), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-1 justify-center", children: progress }), onDismiss ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Dismiss", onClick: onDismiss, className: "flex h-11 w-11 items-center justify-center", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "close", size: "lg", color: "muted" }) })) : ((0, jsx_runtime_1.jsx)("span", { className: "h-11 w-11" }))] })) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "-mt-xl flex flex-col items-center gap-lg rounded-t-[var(--xen-radius-lg)] bg-surface p-xl shadow-lg", children: [title != null || subtitle != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-sm", children: [title ? ((0, jsx_runtime_1.jsx)("h2", { children: (0, jsx_runtime_1.jsx)(Text_1.Text, { size: "2xl", weight: "bold", tone: "onSurface", align: "center", numberOfLines: 2, className: "block", children: title }) })) : null, subtitle ? ((0, jsx_runtime_1.jsx)(Text_1.Text, { size: "base", tone: "muted", align: "center", numberOfLines: 3, className: "block", children: subtitle })) : null] })) : null, subtitle == null && destination ? ((0, jsx_runtime_1.jsxs)("p", { className: "text-center", children: [(0, jsx_runtime_1.jsxs)(Text_1.Text, { size: "base", tone: "muted", children: ["Enter the code we sent to", ' '] }), (0, jsx_runtime_1.jsx)(Text_1.Text, { size: "base", weight: "bold", tone: "onSurface", children: destination })] })) : null, (0, jsx_runtime_1.jsx)("div", { className: "flex gap-sm", children: chars.map((c, i) => ((0, jsx_runtime_1.jsx)("input", { ref: (el) => {
                                refs.current[i] = el;
                            }, "aria-label": `Digit ${i + 1}`, "aria-invalid": invalid || undefined, inputMode: "numeric", maxLength: 1, value: c, onChange: (e) => setChar(i, e.target.value), onKeyDown: (e) => onKeyDown(i, e), className: (0, cn_1.cn)('rounded-[var(--xen-radius-lg)] border bg-surface text-center text-lg font-semibold text-on-surface outline-none', CELL_CLASS, invalid ? 'border-danger' : 'border-border focus:border-primary') }, i))) }), invalid ? ((0, jsx_runtime_1.jsxs)("p", { "aria-live": "assertive", className: "flex items-center justify-center gap-xs", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "error", size: "sm", color: "danger" }), (0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", tone: "dangerText", children: error })] })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex w-full flex-col items-center gap-xs", children: [(0, jsx_runtime_1.jsxs)("p", { className: "flex items-center justify-center gap-xs", children: [(0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", tone: "muted", children: resendPrompt }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Resend code", "aria-disabled": !canResend || undefined, disabled: !canResend, onClick: onResend, className: (0, cn_1.cn)('flex items-center disabled:pointer-events-none', TAP_TARGET_CLASS), children: (0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", weight: "semibold", tone: canResend ? 'primary' : 'muted', children: canResend ? 'Resend code' : `Resend in ${remaining}s` }) })] }), !canResend ? (0, jsx_runtime_1.jsx)(Progress_1.Progress, { value: elapsed, max: interval, size: "sm", className: "w-full" }) : null, resendNotice ? ((0, jsx_runtime_1.jsxs)("p", { "aria-live": "polite", className: "flex items-center justify-center gap-xs", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "check", size: "sm", color: "success" }), (0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", tone: "successText", children: resendNotice })] })) : null] }), (0, jsx_runtime_1.jsx)("div", { className: "mt-auto flex w-full flex-col border-t border-border bg-surface pb-lg pt-md", children: (0, jsx_runtime_1.jsx)(GetStartedButton_1.GetStartedButton, { label: verifyLabel, trailingArrow: false, loading: loading, disabled: value.length < length, onClick: () => onVerify?.(value) }) })] })] }));
});
//# sourceMappingURL=OtpVerifyV2.js.map
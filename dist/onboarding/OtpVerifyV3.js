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
exports.OtpVerifyV3 = void 0;
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
 * Code verification — V3, the compact line. No hero panel: a small badge sits
 * beside a left-aligned headline and the rows tighten, so the step fits a sheet
 * over the screen the user was already on.
 *
 * The code cells keep their 56 size — a shrunk digit box is a box nobody can
 * hit, and density is not worth a mistyped code. `illustration` is deliberately
 * ignored; `logoGlyph` drives the small leading badge.
 *
 * Same props as {@link OtpVerify}. Token-pure.
 */
exports.OtpVerifyV3 = React.forwardRef(function OtpVerifyV3({ destination, length = 6, value, onChange, onVerify, onResend, error, loading = false, resendCountdown, verifyLabel = 'Verify', autoSubmit = true, title, subtitle, illustration: _illustration, logoGlyph, progress, onBack, onDismiss, resendInterval = DEFAULT_RESEND_INTERVAL, resendNotice, resendPrompt = "Didn't get the code?", className, ...rest }, ref) {
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
    const headline = title ?? (destination ? `Enter the code sent to ${destination}` : undefined);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-md', className), ...rest, children: [showHeader ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm", children: [onBack ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Back", onClick: onBack, className: "flex h-11 w-11 items-center justify-center", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "chevron-left", size: "xl", color: "onSurface" }) })) : null, (0, jsx_runtime_1.jsx)("div", { className: "flex-1", children: progress }), onDismiss ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Dismiss", onClick: onDismiss, className: "flex h-11 w-11 items-center justify-center", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "close", size: "lg", color: "muted" }) })) : null] })) : null, headline != null || subtitle != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-md", children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-50", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: logoGlyph ?? '✉', size: "lg", color: "primary" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [headline != null ? ((0, jsx_runtime_1.jsx)("h2", { children: (0, jsx_runtime_1.jsx)(Text_1.Text, { size: "lg", weight: "bold", tone: "onSurface", numberOfLines: 2, className: "block", children: headline }) })) : null, subtitle ? ((0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", tone: "muted", numberOfLines: 2, children: subtitle })) : null] })] })) : null, (0, jsx_runtime_1.jsx)("div", { className: "flex gap-xs", children: chars.map((c, i) => ((0, jsx_runtime_1.jsx)("input", { ref: (el) => {
                        refs.current[i] = el;
                    }, "aria-label": `Digit ${i + 1}`, "aria-invalid": invalid || undefined, inputMode: "numeric", maxLength: 1, value: c, onChange: (e) => setChar(i, e.target.value), onKeyDown: (e) => onKeyDown(i, e), className: (0, cn_1.cn)('rounded-[var(--xen-radius-lg)] border bg-surface text-center text-lg font-semibold text-on-surface outline-none', CELL_CLASS, invalid ? 'border-danger' : 'border-border focus:border-primary') }, i))) }), invalid ? ((0, jsx_runtime_1.jsxs)("p", { "aria-live": "assertive", className: "flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "error", size: "sm", color: "danger" }), (0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", tone: "dangerText", children: error })] })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex w-full flex-col gap-xs", children: [(0, jsx_runtime_1.jsxs)("p", { className: "flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", tone: "muted", children: resendPrompt }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Resend code", "aria-disabled": !canResend || undefined, disabled: !canResend, onClick: onResend, className: (0, cn_1.cn)('flex items-center disabled:pointer-events-none', TAP_TARGET_CLASS), children: (0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", weight: "semibold", tone: canResend ? 'primary' : 'muted', children: canResend ? 'Resend code' : `Resend in ${remaining}s` }) })] }), !canResend ? (0, jsx_runtime_1.jsx)(Progress_1.Progress, { value: elapsed, max: interval, size: "sm", className: "w-full" }) : null, resendNotice ? ((0, jsx_runtime_1.jsxs)("p", { "aria-live": "polite", className: "flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "check", size: "sm", color: "success" }), (0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", tone: "successText", children: resendNotice })] })) : null] }), (0, jsx_runtime_1.jsx)("div", { className: "mt-auto flex w-full flex-col border-t border-border bg-surface pb-lg pt-sm", children: (0, jsx_runtime_1.jsx)(GetStartedButton_1.GetStartedButton, { label: verifyLabel, trailingArrow: false, loading: loading, disabled: value.length < length, onClick: () => onVerify?.(value) }) })] }));
});
//# sourceMappingURL=OtpVerifyV3.js.map
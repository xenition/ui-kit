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
exports.OtpVerify = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const PinInput_1 = require("../primitives/PinInput");
const GetStartedButton_1 = require("./GetStartedButton");
/**
 * One-time-code verification — reuses the {@link PinInput} primitive for entry
 * and adds the surrounding flow: a "sent to {destination}" line, an error slot
 * (announced assertively), a Verify button and a resend link with an optional
 * countdown. When `autoSubmit` is on it fires `onVerify` as soon as the code
 * fills, matching the SMS-autofill idiom. Colors come from tokens/primitives.
 * No literal colors.
 */
exports.OtpVerify = React.forwardRef(function OtpVerify({ destination, length = 6, value, onChange, onVerify, onResend, error, loading = false, resendCountdown, verifyLabel = 'Verify', autoSubmit = true, className, ...rest }, ref) {
    const handleChange = (next) => {
        onChange(next);
        if (autoSubmit && next.length === length)
            onVerify?.(next);
    };
    const canResend = resendCountdown == null || resendCountdown <= 0;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col items-center gap-6', className), ...rest, children: [destination ? ((0, jsx_runtime_1.jsxs)("p", { className: "text-center text-base text-muted", children: ["Enter the code we sent to", ' ', (0, jsx_runtime_1.jsx)("span", { className: "font-bold text-on-surface", children: destination })] })) : null, (0, jsx_runtime_1.jsx)(PinInput_1.PinInput, { length: length, value: value, onChange: handleChange }), error ? ((0, jsx_runtime_1.jsx)("p", { "aria-live": "assertive", className: "text-center text-sm text-danger", children: error })) : null, (0, jsx_runtime_1.jsx)(GetStartedButton_1.GetStartedButton, { label: verifyLabel, loading: loading, disabled: value.length < length, onClick: () => onVerify?.(value) }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Resend code", "aria-disabled": !canResend || undefined, disabled: !canResend, onClick: onResend, className: (0, cn_1.cn)('text-sm font-semibold disabled:pointer-events-none', canResend ? 'text-primary' : 'text-muted'), children: canResend ? 'Resend code' : `Resend in ${Math.max(0, resendCountdown ?? 0)}s` })] }));
});
//# sourceMappingURL=OtpVerify.js.map
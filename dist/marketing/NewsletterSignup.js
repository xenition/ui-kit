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
exports.NewsletterSignup = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const Button_1 = require("../primitives/Button");
const Input_1 = require("../primitives/Input");
const cn_1 = require("../primitives/cn");
/** Basic, permissive email shape check (no network, no dependency). */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/**
 * Email-capture block: heading, subtext, validated email input, submit button,
 * and success/error states. The endpoint lives entirely in the caller's async
 * `onSubmit(email)` handler — never hardcoded here.
 */
exports.NewsletterSignup = React.forwardRef(function NewsletterSignup({ heading = 'Stay in the loop', subtext, onSubmit, placeholder = 'you@example.com', buttonLabel = 'Subscribe', successMessage = "Thanks — you're subscribed.", invalidMessage = 'Enter a valid email address.', errorMessage = 'Something went wrong. Please try again.', className, ...rest }, ref) {
    const [email, setEmail] = React.useState('');
    const [status, setStatus] = React.useState('idle');
    const [message, setMessage] = React.useState(null);
    const messageId = React.useId();
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!EMAIL_RE.test(email.trim())) {
            setStatus('error');
            setMessage(invalidMessage);
            return;
        }
        setStatus('submitting');
        setMessage(null);
        try {
            await onSubmit(email.trim());
            setStatus('success');
            setMessage(successMessage);
            setEmail('');
        }
        catch (error) {
            setStatus('error');
            setMessage(error instanceof Error && error.message ? error.message : errorMessage);
        }
    };
    const invalid = status === 'error';
    return ((0, jsx_runtime_1.jsxs)("form", { ref: ref, "data-xen-newsletter": "", "data-status": status, onSubmit: handleSubmit, noValidate: true, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface', 'p-[var(--xen-space-lg)]', className), ...rest, children: [heading !== undefined ? ((0, jsx_runtime_1.jsx)("h3", { className: "font-heading text-lg font-semibold", children: heading })) : null, subtext !== undefined ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: subtext }) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-sm)] sm:flex-row", children: [(0, jsx_runtime_1.jsx)(Input_1.Input, { type: "email", name: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: placeholder, "aria-label": "Email address", invalid: invalid, "aria-describedby": message ? messageId : undefined, disabled: status === 'submitting' }), (0, jsx_runtime_1.jsx)(Button_1.Button, { type: "submit", disabled: status === 'submitting', className: "shrink-0", children: buttonLabel })] }), message ? ((0, jsx_runtime_1.jsx)("p", { id: messageId, role: status === 'error' ? 'alert' : 'status', "aria-live": "polite", className: (0, cn_1.cn)('text-sm', status === 'success' ? 'text-success' : 'text-danger'), children: message })) : null] }));
});
//# sourceMappingURL=NewsletterSignup.js.map
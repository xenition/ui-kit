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
exports.NewsletterSignupV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const Button_1 = require("../primitives/Button");
const Input_1 = require("../primitives/Input");
const cn_1 = require("../primitives/cn");
/** Basic, permissive email shape check (no network, no dependency). */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/**
 * NewsletterSignup — **V4** "showcase" design (web parity of the native V4). The
 * bold conversion moment: a vibrant primary→accent brand-gradient ground
 * carrying an extra-bold near-white heading, a soft supporting line, and a
 * **frosted** email input + submit button (translucent `primary-50` tiles) that
 * read cleanly on the saturated surface. Validation, the async `onSubmit(email)`
 * contract, and the success/error states are preserved exactly from the base;
 * only the skin changes. Same props/behavior as {@link NewsletterSignupProps};
 * every color is a `--xen-*` token (`from-primary-500`, `to-accent-500`,
 * `text-primary-50`) — no literals.
 */
exports.NewsletterSignupV4 = React.forwardRef(function NewsletterSignupV4({ heading = 'Stay in the loop', subtext, onSubmit, placeholder = 'you@example.com', buttonLabel = 'Subscribe', successMessage = "Thanks — you're subscribed.", invalidMessage = 'Enter a valid email address.', errorMessage = 'Something went wrong. Please try again.', className, ...rest }, ref) {
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
    return ((0, jsx_runtime_1.jsxs)("form", { ref: ref, "data-xen-newsletter": "", "data-status": status, onSubmit: handleSubmit, noValidate: true, className: (0, cn_1.cn)('relative isolate overflow-hidden rounded-[var(--xen-radius-lg)] shadow-lg', 'bg-gradient-to-br from-primary-500 via-primary-600 to-accent-500 text-primary-50', 'flex flex-col gap-[var(--xen-space-sm)] p-[var(--xen-space-xl)]', className), ...rest, children: [heading !== undefined ? ((0, jsx_runtime_1.jsx)("h3", { className: "font-heading text-2xl font-extrabold leading-tight tracking-tight text-primary-50", children: heading })) : null, subtext !== undefined ? (0, jsx_runtime_1.jsx)("p", { className: "text-base text-primary-100", children: subtext }) : null, (0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-xs)] flex flex-col gap-[var(--xen-space-sm)] sm:flex-row", children: [(0, jsx_runtime_1.jsx)(Input_1.Input, { type: "email", name: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: placeholder, "aria-label": "Email address", invalid: invalid, "aria-describedby": message ? messageId : undefined, disabled: status === 'submitting', className: "border border-primary-50/30 bg-primary-50/15 text-primary-50 placeholder:text-primary-100/70" }), (0, jsx_runtime_1.jsx)(Button_1.Button, { type: "submit", disabled: status === 'submitting', className: "shrink-0 border border-primary-50/30 bg-primary-50/15 text-primary-50 hover:bg-primary-50/25", children: buttonLabel })] }), message ? ((0, jsx_runtime_1.jsx)("p", { id: messageId, role: status === 'error' ? 'alert' : 'status', "aria-live": "polite", className: (0, cn_1.cn)('text-sm font-medium', status === 'success' ? 'text-primary-50' : 'text-primary-100'), children: message })) : null] }));
});
//# sourceMappingURL=NewsletterSignupV4.js.map
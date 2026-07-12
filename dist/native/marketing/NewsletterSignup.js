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
exports.NewsletterSignup = NewsletterSignup;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Input_1 = require("../primitives/Input");
const Button_1 = require("../primitives/Button");
/** Basic, permissive email shape check (no network, no dependency). */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/**
 * Email-capture block — the native mirror of the web `NewsletterSignup`:
 * heading, subtext, a validated email `Input`, a submit `Button`, and
 * success/error states. The web `<form onSubmit>` becomes an explicit submit
 * handler on the button; the endpoint lives entirely in the caller's async
 * `onSubmit(email)`. Composes the native `Input`/`Button` primitives. Token-only.
 */
function NewsletterSignup({ heading = 'Stay in the loop', subtext, onSubmit, placeholder = 'you@example.com', buttonLabel = 'Subscribe', successMessage = "Thanks — you're subscribed.", invalidMessage = 'Enter a valid email address.', errorMessage = 'Something went wrong. Please try again.', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const [email, setEmail] = React.useState('');
    const [status, setStatus] = React.useState('idle');
    const [message, setMessage] = React.useState(null);
    const handleSubmit = async () => {
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
    const submitting = status === 'submitting';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: "xen-newsletter", style: [
            {
                gap: tokens.spacing.sm,
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
                padding: tokens.spacing.lg,
            },
            style,
        ], children: [heading !== undefined ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.lg,
                    fontWeight: '600',
                }, children: heading })) : null, subtext !== undefined ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: subtext })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(Input_1.Input, { value: email, onChangeText: setEmail, placeholder: placeholder, keyboardType: "email-address", autoCapitalize: "none", autoCorrect: false, accessibilityLabel: "Email address", invalid: invalid, editable: !submitting }), (0, jsx_runtime_1.jsx)(Button_1.Button, { onPress: handleSubmit, loading: submitting, disabled: submitting, children: buttonLabel })] }), message ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityLiveRegion: "polite", style: {
                    fontSize: tokens.typography.scale.sm,
                    color: status === 'success' ? colors.success : colors.danger,
                }, children: message })) : null] }));
}
//# sourceMappingURL=NewsletterSignup.js.map
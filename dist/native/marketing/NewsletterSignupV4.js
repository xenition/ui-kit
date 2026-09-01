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
exports.NewsletterSignupV4 = NewsletterSignupV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Input_1 = require("../primitives/Input");
const Button_1 = require("../primitives/Button");
const color_1 = require("../primitives/internal/color");
const Gradient_1 = require("../commerce/internal/Gradient");
/** Basic, permissive email shape check (no network, no dependency). */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/**
 * NewsletterSignup — **V4** "showcase" design (native mirror of the web V4). The
 * bold conversion moment: a vibrant primary→accent brand-gradient ground (via
 * the shared `expo-linear-gradient` wrapper) carrying an extra-bold near-white
 * heading, a soft supporting line, and a **frosted** email `Input` + submit
 * `Button` seated on translucent `primary-50` tiles. Validation, the async
 * `onSubmit(email)` contract, and the success/error states are preserved
 * exactly from the base; only the skin changes. Same props/behavior as
 * {@link NewsletterSignupProps}; token-only colors via `useXenitionTheme()`
 * (`tokens.ramps.primary`/`accent` ground, near-white ink), dark-mode safe.
 */
function NewsletterSignupV4({ heading = 'Stay in the loop', subtext, onSubmit, placeholder = 'you@example.com', buttonLabel = 'Subscribe', successMessage = "Thanks — you're subscribed.", invalidMessage = 'Enter a valid email address.', errorMessage = 'Something went wrong. Please try again.', style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    const r = tokens.ramps;
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
    const ink = r.primary[50];
    const inkSoft = r.primary[100];
    const frost = (0, color_1.withAlpha)(r.primary[50], 0.15);
    const frostBorder = (0, color_1.withAlpha)(r.primary[50], 0.3);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: "xen-newsletter", style: [
            {
                position: 'relative',
                overflow: 'hidden',
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.xl,
                gap: tokens.spacing.sm,
                backgroundColor: r.primary[600],
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(Gradient_1.Gradient, { colors: [r.primary[500], r.primary[600], r.accent[500]], start: { x: 0, y: 0 }, end: { x: 1, y: 1 }, style: react_native_1.StyleSheet.absoluteFillObject }), heading !== undefined ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale['2xl'], fontWeight: '800', letterSpacing: -0.5 }, children: heading })) : null, subtext !== undefined ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.base }, children: subtext })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.sm, marginTop: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(Input_1.Input, { value: email, onChangeText: setEmail, placeholder: placeholder, placeholderTextColor: inkSoft, keyboardType: "email-address", autoCapitalize: "none", autoCorrect: false, accessibilityLabel: "Email address", invalid: invalid, editable: !submitting, style: { backgroundColor: frost, borderColor: frostBorder, color: ink } }), (0, jsx_runtime_1.jsx)(Button_1.Button, { onPress: handleSubmit, loading: submitting, disabled: submitting, style: { backgroundColor: frost, borderWidth: 1, borderColor: frostBorder }, children: buttonLabel })] }), message ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityLiveRegion: "polite", style: {
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: '500',
                    color: status === 'success' ? ink : inkSoft,
                }, children: message })) : null] }));
}
//# sourceMappingURL=NewsletterSignupV4.js.map
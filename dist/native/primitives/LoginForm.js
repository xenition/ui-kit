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
exports.LoginForm = LoginForm;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const AuthCard_1 = require("./AuthCard");
const Text_1 = require("./Text");
const Alert_1 = require("./Alert");
const useForm_1 = require("../../primitives/useForm");
/**
 * Drop-in email/password sign-in form — the native mirror of the web
 * `LoginForm`. Composed from the kit, themed, with validation, loading and
 * error states. SDK-agnostic: wire `onSubmit` to `@xenition/sdk` auth (or
 * anything). Just `<LoginForm onSubmit={…} />`. No literal colors.
 *
 * Drawn from the same parts as the screen-level `SignInScreen` (§6/§9): 56px
 * fields with a muted leading icon, a `primary` focus border, errors as a
 * `danger` border **and** a message in `dangerText`, and the 56px `radius.full`
 * CTA with its trailing `→`. That is the point of sharing them — a screen
 * assembled from this form and a screen assembled from `SignInScreen` are the
 * same product, not two.
 *
 * Everything past `onSubmit`/`onForgotPassword`/`onSignupClick`/`title` is
 * optional copy; with none of it passed the form reads exactly as it did.
 */
function LoginForm({ onSubmit, onForgotPassword, onSignupClick, title = 'Sign in', subtitle, brandGlyph, submitLabel = 'Sign in', submittingLabel = 'Signing in…', emailLabel = 'Email', emailPlaceholder = 'you@example.com', passwordLabel = 'Password', passwordPlaceholder = 'Your password', forgotLabel = 'Forgot password?', switchPrompt = 'No account?', switchLabel = 'Sign up', }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    const [submitError, setSubmitError] = React.useState(null);
    const form = (0, useForm_1.useForm)({
        initialValues: { email: '', password: '' },
        validate: (v) => {
            const e = {};
            if (!v.email)
                e.email = 'Email is required';
            if (!v.password)
                e.password = 'Password is required';
            return e;
        },
        onSubmit: async (v) => {
            setSubmitError(null);
            try {
                await onSubmit(v);
            }
            catch (err) {
                setSubmitError(err instanceof Error ? err.message : 'Sign in failed');
            }
        },
    });
    return ((0, jsx_runtime_1.jsx)(AuthCard_1.AuthCard, { title: title, subtitle: subtitle, brandGlyph: brandGlyph, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.md }, children: [submitError ? (0, jsx_runtime_1.jsx)(Alert_1.Alert, { tone: "danger", children: submitError }) : null, (0, jsx_runtime_1.jsx)(AuthCard_1.AuthField, { label: emailLabel, icon: "mail", accessibilityLabel: emailLabel, keyboardType: "email-address", autoCapitalize: "none", autoComplete: "email", textContentType: "emailAddress", error: form.errors.email, value: form.values.email, onChangeText: (t) => form.setValue('email', t), placeholder: emailPlaceholder }), (0, jsx_runtime_1.jsx)(AuthCard_1.AuthField, { secure: true, label: passwordLabel, icon: "lock", accessibilityLabel: passwordLabel, autoCapitalize: "none", autoComplete: "password", textContentType: "password", error: form.errors.password, value: form.values.password, onChangeText: (t) => form.setValue('password', t), placeholder: passwordPlaceholder }), onForgotPassword ? (
                // §9 right-aligns it: the link belongs to the field above it, not to
                // the margin on the other side of the card.
                (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: forgotLabel, onPress: onForgotPassword, hitSlop: tokens.spacing.sm, style: { alignSelf: 'flex-end', justifyContent: 'center', minHeight: AuthCard_1.AUTH_TAP_TARGET }, children: (0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", weight: "medium", tone: "primaryText", children: forgotLabel }) })) : null, (0, jsx_runtime_1.jsx)(AuthCard_1.AuthSubmitButton, { label: form.submitting ? submittingLabel : submitLabel, onPress: () => form.handleSubmit(), loading: form.submitting }), onSignupClick ? ((0, jsx_runtime_1.jsx)(AuthCard_1.AuthSwitchFooter, { prompt: switchPrompt, label: switchLabel, onPress: onSignupClick })) : null] }) }));
}
//# sourceMappingURL=LoginForm.js.map
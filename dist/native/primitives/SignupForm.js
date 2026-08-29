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
exports.SignupForm = SignupForm;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const AuthCard_1 = require("./AuthCard");
const Alert_1 = require("./Alert");
const useForm_1 = require("../../primitives/useForm");
/**
 * Drop-in sign-up form — the native mirror of the web `SignupForm`. Composed,
 * themed, validated. Wire `onSubmit` to `@xenition/sdk` auth. No literal colors.
 *
 * Drawn from the same parts as the screen-level `SignInScreen` (§6/§9): 56px
 * fields with a muted leading icon, a `primary` focus border, errors as a
 * `danger` border **and** a message in `dangerText`, and the 56px `radius.full`
 * CTA with its trailing `→`.
 *
 * `requireTerms` opts into §9's consent card — a checkbox in a bordered card
 * with both links inline, gating the CTA. It is off by default because a
 * consent step is a product decision, not a style one.
 */
function SignupForm({ onSubmit, onLoginClick, title = 'Create account', subtitle, brandGlyph, minPasswordLength = 8, requireTerms = false, termsLabel, termsLinks, onTermsLinkPress, submitLabel = 'Sign up', submittingLabel = 'Creating…', nameLabel = 'Name', namePlaceholder = 'Ada Lovelace', emailLabel = 'Email', emailPlaceholder = 'you@example.com', passwordLabel = 'Password', passwordPlaceholder = 'Choose a password', switchPrompt = 'Have an account?', switchLabel = 'Sign in', }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    const [submitError, setSubmitError] = React.useState(null);
    const [accepted, setAccepted] = React.useState(false);
    const form = (0, useForm_1.useForm)({
        initialValues: { name: '', email: '', password: '' },
        validate: (v) => {
            const e = {};
            if (!v.name)
                e.name = 'Name is required';
            if (!v.email)
                e.email = 'Email is required';
            if (!v.password || v.password.length < minPasswordLength)
                e.password = `Password must be at least ${minPasswordLength} characters`;
            return e;
        },
        onSubmit: async (v) => {
            setSubmitError(null);
            try {
                await onSubmit(v);
            }
            catch (err) {
                setSubmitError(err instanceof Error ? err.message : 'Sign up failed');
            }
        },
    });
    return ((0, jsx_runtime_1.jsx)(AuthCard_1.AuthCard, { title: title, subtitle: subtitle, brandGlyph: brandGlyph, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.md }, children: [submitError ? (0, jsx_runtime_1.jsx)(Alert_1.Alert, { tone: "danger", children: submitError }) : null, (0, jsx_runtime_1.jsx)(AuthCard_1.AuthField, { label: nameLabel, icon: "user", accessibilityLabel: nameLabel, autoComplete: "name", textContentType: "name", error: form.errors.name, value: form.values.name, onChangeText: (t) => form.setValue('name', t), placeholder: namePlaceholder }), (0, jsx_runtime_1.jsx)(AuthCard_1.AuthField, { label: emailLabel, icon: "mail", accessibilityLabel: emailLabel, keyboardType: "email-address", autoCapitalize: "none", autoComplete: "email", textContentType: "emailAddress", error: form.errors.email, value: form.values.email, onChangeText: (t) => form.setValue('email', t), placeholder: emailPlaceholder }), (0, jsx_runtime_1.jsx)(AuthCard_1.AuthField, { secure: true, label: passwordLabel, icon: "lock", accessibilityLabel: passwordLabel, autoCapitalize: "none", autoComplete: "password-new", textContentType: "newPassword", error: form.errors.password, value: form.values.password, onChangeText: (t) => form.setValue('password', t), placeholder: passwordPlaceholder }), requireTerms ? ((0, jsx_runtime_1.jsx)(AuthCard_1.AuthTermsCard, { checked: accepted, onCheckedChange: setAccepted, label: termsLabel, links: termsLinks, onLinkPress: onTermsLinkPress })) : null, (0, jsx_runtime_1.jsx)(AuthCard_1.AuthSubmitButton, { label: form.submitting ? submittingLabel : submitLabel, onPress: () => form.handleSubmit(), loading: form.submitting, disabled: requireTerms && !accepted }), onLoginClick ? ((0, jsx_runtime_1.jsx)(AuthCard_1.AuthSwitchFooter, { prompt: switchPrompt, label: switchLabel, onPress: onLoginClick })) : null] }) }));
}
//# sourceMappingURL=SignupForm.js.map
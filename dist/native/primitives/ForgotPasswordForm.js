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
exports.ForgotPasswordForm = ForgotPasswordForm;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const AuthCard_1 = require("./AuthCard");
const Field_1 = require("./Field");
const Input_1 = require("./Input");
const Button_1 = require("./Button");
const Alert_1 = require("./Alert");
const StatusMessage_1 = require("./StatusMessage");
const useForm_1 = require("../../primitives/useForm");
/**
 * Drop-in "reset password" request form — the native mirror of the web
 * `ForgotPasswordForm`. Composed, themed, with a sent confirmation state. Wire
 * `onSubmit` to `@xenition/sdk` auth. No literal colors.
 */
function ForgotPasswordForm({ onSubmit, onLoginClick, title = 'Reset password', }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const [submitError, setSubmitError] = React.useState(null);
    const [sent, setSent] = React.useState(false);
    const form = (0, useForm_1.useForm)({
        initialValues: { email: '' },
        validate: (v) => (v.email ? {} : { email: 'Email is required' }),
        onSubmit: async (v) => {
            setSubmitError(null);
            try {
                await onSubmit(v.email);
                setSent(true);
            }
            catch (err) {
                setSubmitError(err instanceof Error ? err.message : 'Could not send reset email');
            }
        },
    });
    return ((0, jsx_runtime_1.jsx)(AuthCard_1.AuthCard, { title: title, footer: onLoginClick ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", onPress: onLoginClick, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.sm }, children: "Back to sign in" }) })) : undefined, children: sent ? ((0, jsx_runtime_1.jsx)(StatusMessage_1.StatusMessage, { state: "empty", message: "Check your email for a reset link." })) : ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.md }, children: [submitError ? (0, jsx_runtime_1.jsx)(Alert_1.Alert, { tone: "danger", children: submitError }) : null, (0, jsx_runtime_1.jsx)(Field_1.Field, { label: "Email", error: form.errors.email, children: (0, jsx_runtime_1.jsx)(Input_1.Input, { keyboardType: "email-address", autoCapitalize: "none", autoComplete: "email", textContentType: "emailAddress", invalid: !!form.errors.email, value: form.values.email, onChangeText: (t) => form.setValue('email', t), placeholder: "you@example.com" }) }), (0, jsx_runtime_1.jsx)(Button_1.Button, { onPress: () => form.handleSubmit(), disabled: form.submitting, loading: form.submitting, children: form.submitting ? 'Sending…' : 'Send reset link' })] })) }));
}
//# sourceMappingURL=ForgotPasswordForm.js.map
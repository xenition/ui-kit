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
const AuthCard_1 = require("./AuthCard");
const Form_1 = require("./Form");
const Text_1 = require("./Text");
const Alert_1 = require("./Alert");
const StatusMessage_1 = require("./StatusMessage");
const useForm_1 = require("./useForm");
/**
 * Drop-in "reset password" request form — composed, themed, with a sent
 * confirmation state.
 *
 * Drawn from the same parts as the screen-level `SignInScreen` (§6/§9): a 56px
 * field with a muted `mail` icon, a `primary` focus border, errors as a
 * `danger` border **and** a message in `danger-text`, and the 56px
 * `radius.full` CTA.
 *
 * The CTA carries no trailing arrow: §5 reserves the `→` for a forward action,
 * and sending a reset link is a terminal one — the next thing the user does is
 * leave for their inbox.
 */
function ForgotPasswordForm({ onSubmit, onLoginClick, title = 'Reset password', subtitle, brandGlyph, submitLabel = 'Send reset link', submittingLabel = 'Sending…', sentMessage = 'Check your email for a reset link.', emailLabel = 'Email', emailPlaceholder = 'you@example.com', backLabel = 'Back to sign in', }) {
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
    return ((0, jsx_runtime_1.jsx)(AuthCard_1.AuthCard, { title: title, subtitle: subtitle, brandGlyph: brandGlyph, footer: onLoginClick && ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": backLabel, onClick: onLoginClick, children: (0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", weight: "semibold", tone: "primaryText", children: backLabel }) })), children: sent ? ((0, jsx_runtime_1.jsx)(StatusMessage_1.StatusMessage, { state: "empty", message: sentMessage })) : ((0, jsx_runtime_1.jsxs)(Form_1.Form, { onSubmit: form.handleSubmit, children: [submitError && (0, jsx_runtime_1.jsx)(Alert_1.Alert, { tone: "danger", children: submitError }), (0, jsx_runtime_1.jsx)(AuthCard_1.AuthField, { label: emailLabel, icon: "mail", inputType: "email", "aria-label": emailLabel, autoComplete: "email", error: form.errors.email, value: form.values.email, onChangeText: (t) => form.setValue('email', t), placeholder: emailPlaceholder }), (0, jsx_runtime_1.jsx)(AuthCard_1.AuthSubmitButton, { type: "submit", label: form.submitting ? submittingLabel : submitLabel, loading: form.submitting, trailingArrow: false })] })) }));
}
//# sourceMappingURL=ForgotPasswordForm.js.map
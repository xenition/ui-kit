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
exports.ForgotPasswordFormV4 = ForgotPasswordFormV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const AlertV4_1 = require("./AlertV4");
const AuthCardV4_1 = require("./AuthCardV4");
const AuthFieldV4_1 = require("./AuthFieldV4");
const AuthSubmitButtonV4_1 = require("./AuthSubmitButtonV4");
const AuthSwitchFooterV4_1 = require("./AuthSwitchFooterV4");
const FormV4_1 = require("./FormV4");
const StatusMessageV4_1 = require("./StatusMessageV4");
const TextV4_1 = require("./TextV4");
const useForm_1 = require("./useForm");
/**
 * **V4 reset-password request form** — the web twin of the native
 * `ForgotPasswordFormV4`, the base's props plus the confirmation copy, a
 * different design line.
 *
 * Composed entirely of V4 children (§10.5): `AuthCardV4` for the shell,
 * `FormV4` for the rhythm, `AuthFieldV4` for the one question, `AuthSubmitButtonV4`
 * for the CTA, `AuthSwitchFooterV4` for both text actions, `AlertV4` for a
 * failed request and `StatusMessageV4` for the confirmation. Nothing is
 * hand-rolled and nothing is a literal — the field's height and radius come
 * from `internal/field-v4`, the CTA's from the submit button, and every gap off
 * the spacing scale.
 *
 * ## The confirmation is the screen
 *
 * A user reaches this form once and leaves it immediately; the only moment that
 * matters is the half-second after the button is pressed. The base spent that
 * moment on a single line of small grey text inside `StatusMessage`, with the
 * headline still reading "Reset password", no sign of *which* address the link
 * went to, and no way to try again. Three things change:
 *
 * 1. **The heading follows the state.** `sentTitle` replaces `title`, and the
 *    subtitle is dropped — it was written to explain the form, and the form is
 *    gone.
 * 2. **The address is echoed back.** The single commonest failure here is a
 *    typo the user cannot see, because the field that held it has been
 *    replaced by a success message. Printing the address is what turns
 *    "nothing arrived" from a dead end into a correction.
 * 3. **There is a next step.** §15 asks an empty state to move the user
 *    forward, and `StatusMessageV4` deliberately carries no action, so the
 *    resend sits below it as `AuthSwitchFooterV4` — §5's rule that a secondary
 *    action is a centred text link, never a second filled button competing
 *    with the one the user just pressed. While it is in flight the label
 *    becomes `submittingLabel` and the link disables, so the state is spoken
 *    rather than merely spun.
 *
 * The whole block is a polite live region: the form it replaced was focused, so
 * without one a screen-reader user is left holding a control that no longer
 * exists with no announcement of what took its place.
 *
 * ## The CTA carries no arrow
 *
 * §5 reserves `→` for a forward action. Sending a reset link is terminal — the
 * next thing the user does is leave for their inbox — so `trailingArrow` is
 * off, exactly as in the base.
 *
 * Errors are text, never colour: a rejected request draws `AlertV4` above the
 * field, and a missing address draws `AuthFieldV4`'s own message underneath it.
 */
function ForgotPasswordFormV4({ onSubmit, onLoginClick, title = 'Reset password', subtitle, brandGlyph, brandIcon, align = 'left', submitLabel = 'Send reset link', submittingLabel = 'Sending…', sentMessage = 'Check your email for a reset link.', sentTitle = 'Check your inbox', resendPrompt = "Didn't get the email?", resendLabel = 'Resend link', resendable = true, emailLabel = 'Email', emailPlaceholder = 'you@example.com', backLabel = 'Back to sign in', backPrompt, className, }) {
    const [submitError, setSubmitError] = React.useState(null);
    const [sent, setSent] = React.useState(false);
    // The address the link actually went to, frozen at the moment it was sent —
    // read back to the user, and replayed by the resend.
    const [sentTo, setSentTo] = React.useState('');
    const [resending, setResending] = React.useState(false);
    const form = (0, useForm_1.useForm)({
        initialValues: { email: '' },
        validate: (v) => (v.email ? {} : { email: 'Email is required' }),
        onSubmit: async (v) => {
            setSubmitError(null);
            try {
                await onSubmit(v.email);
                setSentTo(v.email);
                setSent(true);
            }
            catch (err) {
                setSubmitError(err instanceof Error ? err.message : 'Could not send reset email');
            }
        },
    });
    const handleResend = async () => {
        if (resending)
            return;
        setResending(true);
        setSubmitError(null);
        try {
            await onSubmit(sentTo);
        }
        catch (err) {
            setSubmitError(err instanceof Error ? err.message : 'Could not send reset email');
        }
        finally {
            setResending(false);
        }
    };
    return ((0, jsx_runtime_1.jsx)(AuthCardV4_1.AuthCardV4, { title: sent ? sentTitle : title, 
        // The subtitle explained the form. Once the form is gone it is describing
        // something the user can no longer see.
        subtitle: sent ? undefined : subtitle, brandGlyph: brandGlyph, brandIcon: brandIcon, align: align, className: className, footer: onLoginClick ? ((0, jsx_runtime_1.jsx)(AuthSwitchFooterV4_1.AuthSwitchFooterV4, { prompt: backPrompt, label: backLabel, onClick: onLoginClick })) : undefined, children: sent ? ((0, jsx_runtime_1.jsxs)("div", { role: "status", "aria-live": "polite", "data-xen-v4-forgot-sent": "", className: "flex w-full flex-col gap-md", children: [submitError ? (0, jsx_runtime_1.jsx)(AlertV4_1.AlertV4, { tone: "danger", children: submitError }) : null, (0, jsx_runtime_1.jsx)(StatusMessageV4_1.StatusMessageV4, { state: "empty", message: sentMessage }), sentTo ? ((0, jsx_runtime_1.jsx)("div", { "data-xen-v4-forgot-address": "", className: "w-full", children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", align: "center", children: sentTo }) })) : null, resendable ? ((0, jsx_runtime_1.jsx)(AuthSwitchFooterV4_1.AuthSwitchFooterV4, { prompt: resendPrompt, label: resending ? submittingLabel : resendLabel, onClick: () => {
                        void handleResend();
                    }, disabled: resending })) : null] })) : ((0, jsx_runtime_1.jsxs)(FormV4_1.FormV4, { onSubmit: form.handleSubmit, children: [submitError ? (0, jsx_runtime_1.jsx)(AlertV4_1.AlertV4, { tone: "danger", children: submitError }) : null, (0, jsx_runtime_1.jsx)(AuthFieldV4_1.AuthFieldV4, { label: emailLabel, icon: "mail", inputType: "email", "aria-label": emailLabel, autoComplete: "email", clearable: true, error: form.errors.email, value: form.values.email, onChangeText: (t) => form.setValue('email', t), placeholder: emailPlaceholder }), (0, jsx_runtime_1.jsx)(AuthSubmitButtonV4_1.AuthSubmitButtonV4, { type: "submit", label: submitLabel, busyLabel: submittingLabel, loading: form.submitting, trailingArrow: false })] })) }));
}
//# sourceMappingURL=ForgotPasswordFormV4.js.map
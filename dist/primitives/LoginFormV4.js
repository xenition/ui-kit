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
exports.LoginFormV4 = LoginFormV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
const AlertV4_1 = require("./AlertV4");
const AuthCardV4_1 = require("./AuthCardV4");
const AuthDividerV4_1 = require("./AuthDividerV4");
const AuthFieldV4_1 = require("./AuthFieldV4");
const AuthProviderButtonV4_1 = require("./AuthProviderButtonV4");
const AuthSubmitButtonV4_1 = require("./AuthSubmitButtonV4");
const AuthSwitchFooterV4_1 = require("./AuthSwitchFooterV4");
const FormV4_1 = require("./FormV4");
const TextV4_1 = require("./TextV4");
const nav_v4_1 = require("./internal/nav-v4");
const v4_state_1 = require("./internal/v4-state");
const useForm_1 = require("./useForm");
/**
 * **V4 sign-in form** — `ONBOARDING-DESIGN-SPEC.md` §9's "Sign in" screen as a
 * drop-in component, in the V4 design line. Web twin of the native
 * `LoginFormV4`, at prop parity.
 *
 * Same public surface and the same `useForm` behaviour as {@link LoginForm} —
 * required email, required password, validate on submit, a thrown `onSubmit`
 * surfaced as a form-level message — plus the parts §9 asks for that the base
 * had no props for: providers, the divider that introduces them, and the
 * host-owned error and pending states.
 *
 * ## What V4 changes
 *
 * **It composes the V4 line, whole** (§10.5). `AuthCardV4`, `AuthFieldV4`,
 * `AuthSubmitButtonV4`, `AuthDividerV4`, `AuthProviderButtonV4`,
 * `AuthSwitchFooterV4`, `AlertV4`, `FormV4`, `TextV4` — no base child, so the
 * fields land on the Addendum's settled `spacing['2xl']` / `radius.md` metrics
 * and every control shares one focus ring and one M3 state layer.
 *
 * **`providers={[]}` renders nothing** — not an empty divider. The list is
 * mapped into `AuthDividerV4`'s children slot, and that component returns
 * `null` when the slot is empty, so the rule and the row live or die together.
 * The base pushed this onto the caller; §9 calls out the resulting bug by name.
 *
 * **The headline is §9's, not the card's historical one.** `align='left'` and
 * `titleSize='3xl'` by default: brand tile top-left, `3xl` bold headline, muted
 * subhead. The base card defaults to `xl` because it had shipped callers to
 * keep; a new component in a new line does not.
 *
 * **"Forgot password?" is a real tap target.** The base rendered a bare
 * `<button>` the size of the word — about 17 tall — with no hover, no press and
 * no focus ring. Here it is `MIN_TAP_CLASS` tall, carries the shared V4 state
 * layer, and rings off `--xen-ring` exactly as the footer link does. It is also
 * grouped with the password field at `gap-sm` inside the form's `gap-lg`
 * rhythm, because §9 puts the link on the field above it rather than adrift
 * between two questions.
 *
 * **Errors are always text.** Field errors come out of `AuthFieldV4` as a
 * message plus a `danger` border; the form-level one is an `AlertV4` with
 * `role="alert"`. Nothing in this component signals a failure with colour only.
 */
function LoginFormV4({ onSubmit, onForgotPassword, onSignupClick, title = 'Sign in', subtitle, brandGlyph, brandIcon, brandLabel, align = 'left', titleSize = '3xl', submitLabel = 'Sign in', submittingLabel = 'Signing in…', emailLabel = 'Email', emailPlaceholder = 'you@example.com', passwordLabel = 'Password', passwordPlaceholder = 'Your password', forgotLabel = 'Forgot password?', switchPrompt = 'No account?', switchLabel = 'Sign up', providers = [], onProviderClick, providersLabel = 'or continue with', compactProviders = false, error = null, pending = false, submitDisabled = false, initialEmail = '', emailRequiredMessage = 'Email is required', passwordRequiredMessage = 'Password is required', submitErrorFallback = 'Sign in failed', footer, className, }) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    (0, inject_1.injectStyleOnce)(AuthSwitchFooterV4_1.AUTH_FOOTER_V4_STYLE_ID, AuthSwitchFooterV4_1.AUTH_FOOTER_V4_CSS);
    const [submitError, setSubmitError] = React.useState(null);
    const form = (0, useForm_1.useForm)({
        initialValues: { email: initialEmail, password: '' },
        validate: (v) => {
            const e = {};
            if (!v.email)
                e.email = emailRequiredMessage;
            if (!v.password)
                e.password = passwordRequiredMessage;
            return e;
        },
        onSubmit: async (v) => {
            setSubmitError(null);
            try {
                await onSubmit(v);
            }
            catch (err) {
                setSubmitError(err instanceof Error ? err.message : submitErrorFallback);
            }
        },
    });
    const busy = form.submitting || pending;
    // The thrown message wins: it is the newer of the two, and a host that sets
    // `error` and also throws would otherwise show the stale one.
    const message = submitError ?? error ?? null;
    const providerRow = providers.map((p) => ((0, jsx_runtime_1.jsx)(AuthProviderButtonV4_1.AuthProviderButtonV4, { label: p.label, glyph: p.glyph, name: p.name, compact: compactProviders, disabled: busy || p.disabled === true, onClick: () => onProviderClick?.(p.id) }, p.id)));
    const cardFooter = onSignupClick || footer != null ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [onSignupClick ? ((0, jsx_runtime_1.jsx)(AuthSwitchFooterV4_1.AuthSwitchFooterV4, { prompt: switchPrompt, label: switchLabel, onClick: onSignupClick, disabled: busy })) : null, footer] })) : undefined;
    return ((0, jsx_runtime_1.jsxs)(AuthCardV4_1.AuthCardV4, { title: title, subtitle: subtitle, brandGlyph: brandGlyph, brandIcon: brandIcon, brandLabel: brandLabel, align: align, titleSize: titleSize, footer: cardFooter, className: className, children: [(0, jsx_runtime_1.jsxs)(FormV4_1.FormV4, { onSubmit: form.handleSubmit, noValidate: true, children: [message ? (0, jsx_runtime_1.jsx)(AlertV4_1.AlertV4, { tone: "danger", children: message }) : null, (0, jsx_runtime_1.jsx)(AuthFieldV4_1.AuthFieldV4, { label: emailLabel, icon: "mail", inputType: "email", "aria-label": emailLabel, autoComplete: "email", error: form.errors.email, value: form.values.email, onChangeText: (t) => form.setValue('email', t), placeholder: emailPlaceholder }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-sm", children: [(0, jsx_runtime_1.jsx)(AuthFieldV4_1.AuthFieldV4, { secure: true, label: passwordLabel, icon: "lock", "aria-label": passwordLabel, autoComplete: "current-password", error: form.errors.password, value: form.values.password, onChangeText: (t) => form.setValue('password', t), placeholder: passwordPlaceholder }), onForgotPassword ? ((0, jsx_runtime_1.jsx)("div", { className: "flex w-full justify-end", children: (0, jsx_runtime_1.jsx)("button", { type: "button", "data-xen-v4-auth-link": "", "data-xen-v4-state": "", "aria-label": forgotLabel, onClick: onForgotPassword, disabled: busy, className: (0, cn_1.cn)('inline-flex items-center justify-center px-sm', 'rounded-[var(--xen-radius-md)] focus-visible:outline-none', nav_v4_1.MIN_TAP_CLASS, v4_state_1.V4_DISABLED_CLASS), children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "medium", tone: "primaryText", children: forgotLabel }) }) })) : null] }), (0, jsx_runtime_1.jsx)(AuthSubmitButtonV4_1.AuthSubmitButtonV4, { type: "submit", label: submitLabel, busyLabel: submittingLabel, loading: busy, disabled: submitDisabled })] }), (0, jsx_runtime_1.jsx)(AuthDividerV4_1.AuthDividerV4, { label: providersLabel, children: providerRow })] }));
}
//# sourceMappingURL=LoginFormV4.js.map
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
exports.SignupFormV4 = SignupFormV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const AlertV4_1 = require("./AlertV4");
const AuthCardV4_1 = require("./AuthCardV4");
const AuthDividerV4_1 = require("./AuthDividerV4");
const AuthFieldV4_1 = require("./AuthFieldV4");
const AuthProviderButtonV4_1 = require("./AuthProviderButtonV4");
const AuthSubmitButtonV4_1 = require("./AuthSubmitButtonV4");
const AuthSwitchFooterV4_1 = require("./AuthSwitchFooterV4");
const AuthTermsCardV4_1 = require("./AuthTermsCardV4");
const FormV4_1 = require("./FormV4");
const useForm_1 = require("./useForm");
/** §9's register anatomy, in one place so the two twins cannot drift. */
const DEFAULTS = {
    title: 'Create account',
    submitLabel: 'Sign up',
    submittingLabel: 'Creating…',
    nameLabel: 'Name',
    namePlaceholder: 'Ada Lovelace',
    firstNameLabel: 'First name',
    firstNamePlaceholder: 'Ada',
    lastNameLabel: 'Last name',
    lastNamePlaceholder: 'Lovelace',
    emailLabel: 'Email',
    emailPlaceholder: 'you@example.com',
    passwordLabel: 'Password',
    passwordPlaceholder: 'Choose a password',
    switchPrompt: 'Have an account?',
    switchLabel: 'Sign in',
    termsError: 'Please accept the terms to continue',
    providersLabel: 'or continue with',
};
/**
 * **V4 sign-up form** — `ONBOARDING-DESIGN-SPEC.md` §9's register screen as one
 * drop-in composite. Web twin of the native `SignupFormV4`.
 *
 * Same shell as the V4 sign-in: the brand tile and headline via `AuthCardV4`,
 * then **First / Last on one row** with §6's `spacing.sm` between them, email,
 * password, the terms **checkbox in a bordered card** with both links inline,
 * the CTA — **disabled until the box is ticked** — then the divider, the
 * providers and the centred footer.
 *
 * ## What V4 changes
 *
 * **It composes V4 children, top to bottom** (§10.5). Every field is an
 * `AuthFieldV4`, so the form sits on `internal/field-v4`'s single control
 * metric (the Addendum's `spacing['2xl']` / `radius.md`) rather than on the
 * base's 56 — a sign-up field stacked above an `InputV4` shares an edge.
 *
 * **The name row is two boxes, one value.** §9 asks for First/Last side by
 * side; the base's `onSubmit` contract is a single `name`. Both hold: the two
 * boxes compose one trimmed string, so a caller written against `SignupForm`
 * can swap the import and nothing downstream notices. `splitName={false}`
 * restores the single box.
 *
 * **The consent is on by default.** `requireTerms` defaults `false` on the
 * base because turning it on silently would change what a shipped app asks its
 * users to agree to. `SignupFormV4` is a new export with no callers to
 * surprise, and §9 describes the card as part of the register anatomy — so it
 * defaults `true` here, and the CTA is disabled until it is ticked. A submit
 * forced past the disabled button (an Enter keypress in a field) is caught too,
 * and answers with a message in the card rather than silently doing nothing.
 *
 * **Providers are structural.** The row is handed to `AuthDividerV4` as its
 * children, so `providers={[]}` collapses the divider *and* the row together —
 * §9's "must not show an empty divider" is enforced by the composition rather
 * than by a `&&` at the call site.
 *
 * Errors are always a message, never a border colour alone: the submit failure
 * is an `AlertV4`, and every field prints its own text under the control.
 */
function SignupFormV4({ onSubmit, onLoginClick, title = DEFAULTS.title, subtitle, brandGlyph, brandIcon, brandLabel, className, align = 'left', titleSize = '3xl', minPasswordLength = 8, requireTerms = true, termsLabel, termsLinks, onTermsLinkClick, termsDescription, termsError = DEFAULTS.termsError, splitName = true, submitLabel = DEFAULTS.submitLabel, submittingLabel = DEFAULTS.submittingLabel, nameLabel = DEFAULTS.nameLabel, namePlaceholder = DEFAULTS.namePlaceholder, firstNameLabel = DEFAULTS.firstNameLabel, firstNamePlaceholder = DEFAULTS.firstNamePlaceholder, lastNameLabel = DEFAULTS.lastNameLabel, lastNamePlaceholder = DEFAULTS.lastNamePlaceholder, requireLastName = false, emailLabel = DEFAULTS.emailLabel, emailPlaceholder = DEFAULTS.emailPlaceholder, passwordLabel = DEFAULTS.passwordLabel, passwordPlaceholder = DEFAULTS.passwordPlaceholder, switchPrompt = DEFAULTS.switchPrompt, switchLabel = DEFAULTS.switchLabel, providers = [], onProviderClick, providersLabel = DEFAULTS.providersLabel, }) {
    const [submitError, setSubmitError] = React.useState(null);
    const [accepted, setAccepted] = React.useState(false);
    const [termsTouched, setTermsTouched] = React.useState(false);
    const form = (0, useForm_1.useForm)({
        initialValues: { firstName: '', lastName: '', email: '', password: '' },
        validate: (v) => {
            const e = {};
            // The base's "name is required", said about whichever box is carrying it.
            if (!v.firstName.trim())
                e.firstName = splitName ? 'First name is required' : 'Name is required';
            if (splitName && requireLastName && !v.lastName.trim())
                e.lastName = 'Last name is required';
            if (!v.email)
                e.email = 'Email is required';
            if (!v.password || v.password.length < minPasswordLength)
                e.password = `Password must be at least ${minPasswordLength} characters`;
            return e;
        },
        onSubmit: async (v) => {
            setSubmitError(null);
            const values = {
                // Two boxes, one string — the base's `onSubmit` contract, unchanged.
                name: [v.firstName.trim(), v.lastName.trim()].filter(Boolean).join(' '),
                email: v.email,
                password: v.password,
            };
            try {
                await onSubmit(values);
            }
            catch (err) {
                setSubmitError(err instanceof Error ? err.message : 'Sign up failed');
            }
        },
    });
    // The consent gate. The CTA is disabled on it, but a form can still be
    // submitted from a field, so the gate is enforced here as well as drawn.
    const blocked = requireTerms && !accepted;
    const handleSubmit = (event) => {
        if (blocked) {
            event?.preventDefault();
            setTermsTouched(true);
            return;
        }
        void form.handleSubmit(event);
    };
    const handleAccept = (next) => {
        setAccepted(next);
        if (next)
            setTermsTouched(false);
    };
    return ((0, jsx_runtime_1.jsx)(AuthCardV4_1.AuthCardV4, { title: title, subtitle: subtitle, brandGlyph: brandGlyph, brandIcon: brandIcon, brandLabel: brandLabel, align: align, titleSize: titleSize, footer: onLoginClick ? ((0, jsx_runtime_1.jsx)(AuthSwitchFooterV4_1.AuthSwitchFooterV4, { prompt: switchPrompt, label: switchLabel, onClick: onLoginClick })) : undefined, children: (0, jsx_runtime_1.jsxs)(FormV4_1.FormV4, { onSubmit: handleSubmit, children: [submitError ? (0, jsx_runtime_1.jsx)(AlertV4_1.AlertV4, { tone: "danger", children: submitError }) : null, splitName ? (
                // §6 — two short fields share a row with `spacing.sm` between them.
                // `min-w-0` so a long placeholder shrinks the box instead of pushing
                // the row past the card's edge.
                (0, jsx_runtime_1.jsxs)("div", { className: "flex w-full items-start gap-sm", children: [(0, jsx_runtime_1.jsx)(AuthFieldV4_1.AuthFieldV4, { className: "min-w-0 flex-1", label: firstNameLabel, icon: "user", "aria-label": firstNameLabel, autoComplete: "given-name", error: form.errors.firstName, value: form.values.firstName, onChangeText: (t) => form.setValue('firstName', t), placeholder: firstNamePlaceholder }), (0, jsx_runtime_1.jsx)(AuthFieldV4_1.AuthFieldV4, { className: "min-w-0 flex-1", label: lastNameLabel, "aria-label": lastNameLabel, autoComplete: "family-name", error: form.errors.lastName, value: form.values.lastName, onChangeText: (t) => form.setValue('lastName', t), placeholder: lastNamePlaceholder })] })) : ((0, jsx_runtime_1.jsx)(AuthFieldV4_1.AuthFieldV4, { label: nameLabel, icon: "user", "aria-label": nameLabel, autoComplete: "name", error: form.errors.firstName, value: form.values.firstName, onChangeText: (t) => form.setValue('firstName', t), placeholder: namePlaceholder })), (0, jsx_runtime_1.jsx)(AuthFieldV4_1.AuthFieldV4, { label: emailLabel, icon: "mail", inputType: "email", "aria-label": emailLabel, autoComplete: "email", error: form.errors.email, value: form.values.email, onChangeText: (t) => form.setValue('email', t), placeholder: emailPlaceholder }), (0, jsx_runtime_1.jsx)(AuthFieldV4_1.AuthFieldV4, { secure: true, label: passwordLabel, icon: "lock", "aria-label": passwordLabel, autoComplete: "new-password", error: form.errors.password, value: form.values.password, onChangeText: (t) => form.setValue('password', t), placeholder: passwordPlaceholder }), requireTerms ? ((0, jsx_runtime_1.jsx)(AuthTermsCardV4_1.AuthTermsCardV4, { checked: accepted, onCheckedChange: handleAccept, label: termsLabel, links: termsLinks, onLinkClick: onTermsLinkClick, description: termsDescription, align: termsDescription ? 'top' : 'center', error: termsTouched && !accepted ? termsError : undefined })) : null, (0, jsx_runtime_1.jsx)("span", { onPointerDown: blocked ? () => setTermsTouched(true) : undefined, className: "contents", children: (0, jsx_runtime_1.jsx)(AuthSubmitButtonV4_1.AuthSubmitButtonV4, { type: "submit", label: submitLabel, busyLabel: submittingLabel, loading: form.submitting, disabled: blocked }) }), (0, jsx_runtime_1.jsx)(AuthDividerV4_1.AuthDividerV4, { label: providersLabel, children: providers.map((provider) => ((0, jsx_runtime_1.jsx)(AuthProviderButtonV4_1.AuthProviderButtonV4, { label: provider.label, glyph: provider.glyph, name: provider.name, onClick: () => onProviderClick?.(provider.id) }, provider.id))) })] }) }));
}
//# sourceMappingURL=SignupFormV4.js.map
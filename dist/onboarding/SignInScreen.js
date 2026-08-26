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
exports.SignInScreen = void 0;
exports.useSignInParts = useSignInParts;
exports.signInDomProps = signInDomProps;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Alert_1 = require("../primitives/Alert");
const Text_1 = require("../primitives/Text");
const AuthCard_1 = require("../primitives/AuthCard");
const GetStartedButton_1 = require("./GetStartedButton");
/**
 * Resolve {@link SignInScreenProps} into the shared anatomy. Exported for the
 * V2/V3 lines in this module; not part of the package's public surface.
 */
function useSignInParts(props, options = {}) {
    const { headingSize = '3xl', align = 'left', trailingArrow = true } = options;
    const { mode = 'signIn', title, subtitle, logoGlyph, logoIcon, email, onEmailChange, password, onPasswordChange, firstName = '', onFirstNameChange, lastName = '', onLastNameChange, onSubmit, submitLabel, pending = false, error, emailError, passwordError, firstNameError, lastNameError, termsError, requireTerms, termsAccepted = false, onTermsChange, termsLabel, termsLinks, onTermsLinkClick, providers = [], onProviderClick, providersLabel = 'or continue with', onForgotPassword, forgotLabel = 'Forgot password?', onSwitchToSignUp, onSwitchToSignIn, switchPrompt, switchLabel, emailLabel = 'Email', emailPlaceholder = 'you@example.com', passwordLabel = 'Password', passwordPlaceholder = 'Your password', firstNameLabel = 'First name', firstNamePlaceholder = 'Ada', lastNameLabel = 'Last name', lastNamePlaceholder = 'Lovelace', } = props;
    const register = mode === 'register';
    const gated = requireTerms ?? register;
    /*
      The footer carries the *opposite* action, so which callback it fires
      depends on the mode. A host that renders both modes from one prop set
      usually wires only the one it thinks in, so the other is accepted as a
      fallback rather than leaving the footer silently absent.
    */
    const switchClick = register
        ? (onSwitchToSignIn ?? onSwitchToSignUp)
        : (onSwitchToSignUp ?? onSwitchToSignIn);
    const brand = (0, jsx_runtime_1.jsx)(AuthCard_1.AuthBrandTile, { glyph: logoGlyph, name: logoIcon, align: align });
    const heading = ((0, jsx_runtime_1.jsx)(AuthCard_1.AuthHeading, { title: title ?? (register ? 'Create account' : 'Welcome back'), subtitle: subtitle, align: align, size: headingSize }));
    const alert = error ? (0, jsx_runtime_1.jsx)(Alert_1.Alert, { tone: "danger", children: error }) : null;
    const fields = ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-md", children: [register ? (
            // §6: two short fields share one row, `sm` between them.
            (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-sm", children: [(0, jsx_runtime_1.jsx)(AuthCard_1.AuthField, { className: "flex-1", label: firstNameLabel, icon: "user", "aria-label": firstNameLabel, placeholder: firstNamePlaceholder, autoComplete: "given-name", error: firstNameError, disabled: pending, value: firstName, onChangeText: onFirstNameChange }), (0, jsx_runtime_1.jsx)(AuthCard_1.AuthField, { className: "flex-1", label: lastNameLabel, icon: "user", "aria-label": lastNameLabel, placeholder: lastNamePlaceholder, autoComplete: "family-name", error: lastNameError, disabled: pending, value: lastName, onChangeText: onLastNameChange })] })) : null, (0, jsx_runtime_1.jsx)(AuthCard_1.AuthField, { label: emailLabel, icon: "mail", inputType: "email", "aria-label": emailLabel, placeholder: emailPlaceholder, autoComplete: "email", error: emailError, disabled: pending, value: email, onChangeText: onEmailChange }), (0, jsx_runtime_1.jsx)(AuthCard_1.AuthField, { secure: true, label: passwordLabel, icon: "lock", "aria-label": passwordLabel, placeholder: passwordPlaceholder, autoComplete: register ? 'new-password' : 'current-password', error: passwordError, disabled: pending, value: password, onChangeText: onPasswordChange }), !register && onForgotPassword ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": forgotLabel, onClick: onForgotPassword, disabled: pending, className: "self-end", children: (0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", weight: "medium", tone: "primaryText", children: forgotLabel }) })) : null, register && gated ? ((0, jsx_runtime_1.jsx)(AuthCard_1.AuthTermsCard, { checked: termsAccepted, onCheckedChange: onTermsChange, label: termsLabel, links: termsLinks, onLinkClick: onTermsLinkClick, error: termsError, disabled: pending })) : null] }));
    /*
      §10.6 / the empty state that matters most here: an app with no social
      sign-in must not show a rule labelled "or continue with" above nothing.
      The guard is on the whole block, divider included — not just the buttons.
    */
    const providersBlock = providers.length > 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-md", children: [(0, jsx_runtime_1.jsx)(AuthCard_1.AuthDivider, { label: providersLabel }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-sm", children: providers.map((provider) => ((0, jsx_runtime_1.jsx)(AuthCard_1.AuthProviderButton, { label: provider.label, glyph: provider.glyph, disabled: pending, onClick: () => onProviderClick?.(provider.id) }, provider.id))) })] })) : null;
    const switchFooter = switchClick ? ((0, jsx_runtime_1.jsx)(AuthCard_1.AuthSwitchFooter, { prompt: switchPrompt ?? (register ? 'Already have an account?' : "Don't have an account?"), label: switchLabel ?? (register ? 'Sign in' : 'Sign up'), onClick: switchClick, disabled: pending })) : null;
    /*
      The module's own hero CTA, not a second implementation of it:
      `GetStartedButton` already pins §5's bar (56 tall, `radius.full`, full
      width, trailing `→`) and every other screen in the funnel ends on it.
      (`AuthCard`'s `AuthSubmitButton` is the same treatment one layer down, for
      the composed forms that live in `primitives` and cannot import upward.)
    */
    const cta = ((0, jsx_runtime_1.jsx)(GetStartedButton_1.GetStartedButton, { label: submitLabel ?? (register ? 'Create account' : 'Sign in'), onClick: onSubmit, loading: pending, 
        // §9: the register CTA stays disabled until consent is given. Same
        // shape, reduced opacity — §5 — so it does not appear to move when it
        // enables.
        disabled: register && gated && !termsAccepted, trailingArrow: trailingArrow }));
    return { brand, heading, alert, fields, providers: providersBlock, switchFooter, cta, register };
}
/**
 * Every prop the anatomy consumes. A design line spreads whatever is left onto
 * its wrapper element, so `id`, `data-*` and the rest of the DOM surface keep
 * working the way they did when this screen destructured them by hand.
 */
const SIGN_IN_ANATOMY_PROPS = new Set([
    'mode', 'title', 'subtitle', 'logoGlyph', 'logoIcon',
    'email', 'onEmailChange', 'password', 'onPasswordChange',
    'firstName', 'onFirstNameChange', 'lastName', 'onLastNameChange',
    'onSubmit', 'submitLabel', 'pending',
    'error', 'emailError', 'passwordError', 'firstNameError', 'lastNameError', 'termsError',
    'requireTerms', 'termsAccepted', 'onTermsChange', 'termsLabel', 'termsLinks', 'onTermsLinkClick',
    'providers', 'onProviderClick', 'providersLabel',
    'onForgotPassword', 'forgotLabel',
    'onSwitchToSignUp', 'onSwitchToSignIn', 'switchPrompt', 'switchLabel',
    'emailLabel', 'emailPlaceholder', 'passwordLabel', 'passwordPlaceholder',
    'firstNameLabel', 'firstNamePlaceholder', 'lastNameLabel', 'lastNamePlaceholder',
    'className',
]);
/** The DOM props left over once the anatomy has taken what it needs. */
function signInDomProps(props) {
    const rest = {};
    for (const [key, value] of Object.entries(props)) {
        if (!SIGN_IN_ANATOMY_PROPS.has(key))
            rest[key] = value;
    }
    return rest;
}
/**
 * Screen-level sign-in **and** register — the auth half of the onboarding
 * anatomy in `ONBOARDING-DESIGN-SPEC.md` §9.
 *
 * What was thin about the old screen: an 80px medallion centred over a centred
 * `2xl` headline, two bare 40px `Field`+`Input` boxes, a flat mid-page button,
 * and two stubs of hairline either side of "or continue with". Nothing had a
 * dominant element and nothing had a floor — it read as a form, not a front
 * door.
 *
 * What this is instead:
 *
 * - a 56×56 brand tile top-**left**, so the eye starts where the reading does;
 * - a `3xl` bold headline with a muted subhead under it;
 * - 56px fields with muted leading icons (`mail`, `lock`, `user`), a focus
 *   border in `primary`, and errors drawn as a `danger` border **and** a
 *   message in `danger-text`;
 * - the forgot link right-aligned where the cursor already is;
 * - the CTA pinned into a sticky footer — 56 tall, `radius.full`, trailing `→`
 *   — with a hairline above it so content scrolls under rather than colliding;
 * - "or continue with" centred **on** one continuous rule, and provider
 *   buttons at the same 56 height so the alternative path is not visibly
 *   cheaper than the form;
 * - a centred footer line carrying the opposite action.
 *
 * `mode="register"` renders the §9 register variant from the same parts:
 * First/Last on one row, email, password, a terms checkbox in a bordered card
 * with both links inline, and a CTA that stays disabled until it is ticked.
 *
 * Every empty state is composed: no `logoGlyph` means no tile rather than an
 * empty box, no `subtitle` means no gap, and `providers={[]}` hides the divider
 * along with the buttons.
 *
 * **Presentational only**, like everything else in the kit: fully controlled,
 * it takes callbacks and shaped data and fetches nothing. The native twin is at
 * prop parity — `onProviderPress`/`onTermsLinkPress` for `onProviderClick`/
 * `onTermsLinkClick` is the one house swap. Every color traces to a token.
 */
exports.SignInScreen = React.forwardRef(function SignInScreen(props, ref) {
    const parts = useSignInParts(props);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex min-h-full flex-col bg-surface', props.className), ...signInDomProps(props), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-lg overflow-y-auto p-xl", children: [parts.brand, parts.heading, parts.alert, parts.fields, parts.providers, parts.switchFooter] }), (0, jsx_runtime_1.jsx)(AuthCard_1.AuthStickyFooter, { children: parts.cta })] }));
});
//# sourceMappingURL=SignInScreen.js.map
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
exports.SignInScreenV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const AlertV4_1 = require("../primitives/AlertV4");
const AuthBrandTileV4_1 = require("../primitives/AuthBrandTileV4");
const AuthDividerV4_1 = require("../primitives/AuthDividerV4");
const AuthFieldV4_1 = require("../primitives/AuthFieldV4");
const AuthHeadingV4_1 = require("../primitives/AuthHeadingV4");
const AuthProviderButtonV4_1 = require("../primitives/AuthProviderButtonV4");
const AuthStickyFooterV4_1 = require("../primitives/AuthStickyFooterV4");
const AuthSwitchFooterV4_1 = require("../primitives/AuthSwitchFooterV4");
const AuthTermsCardV4_1 = require("../primitives/AuthTermsCardV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const GetStartedButtonV4_1 = require("./GetStartedButtonV4");
const ProgressDotsV4_1 = require("./ProgressDotsV4");
const flow_v4_1 = require("./internal/flow-v4");
/**
 * **V4 sign-in / register** — the web twin of the native `SignInScreenV4`: the
 * base's props plus the header controls (`onBack`, `onDismiss`, `stepCount`),
 * `legalLinks`, `pinSwitchFooter` and the line's `ground`/`accent`.
 *
 * §9's anatomy, on the V4 auth primitives: brand tile top-left (not centred),
 * a `3xl` headline, the fields at the shared control height with leading
 * icons, a right-aligned "Forgot password?", the sticky CTA, an "or continue
 * with" divider, the provider buttons, and a footer carrying the opposite
 * action.
 *
 * ## Five changes
 *
 * 1. **Every part is its V4 twin.** The base composed `AuthField`,
 *    `AuthBrandTile`, `AuthProviderButton` and the rest from the base line, so
 *    a page built with V4 components everywhere else had base-line auth fields
 *    in the middle of it. Control height, focus ring, error text and hover
 *    state all move to the shared answer.
 * 2. **The screen has a header.** Every other screen in the funnel does, and
 *    sign-in was the one place a user could not go back or see how far through
 *    they were.
 * 3. **The switch footer can be pinned** — see `pinSwitchFooter`.
 * 4. **Legal links have a home** under the CTA, where a register screen needs
 *    them.
 * 5. **The forgot link is a real control** — a tap target with the shared
 *    state layer and focus ring, rather than a bare span.
 *
 * Both modes must render with `providers={[]}` — an app with no social sign-in
 * must not show a rule labelled "or continue with" above nothing — and the
 * guard is on the whole block, divider included.
 */
exports.SignInScreenV4 = React.forwardRef(function SignInScreenV4({ mode = 'signIn', title, subtitle, logoGlyph, logoIcon, email, onEmailChange, password, onPasswordChange, firstName = '', onFirstNameChange, lastName = '', onLastNameChange, onSubmit, submitLabel, pending = false, error, emailError, passwordError, firstNameError, lastNameError, termsError, requireTerms, termsAccepted = false, onTermsChange, termsLabel, termsLinks, onTermsLinkClick, providers = [], onProviderClick, providersLabel = 'or continue with', onForgotPassword, forgotLabel = 'Forgot password?', onSwitchToSignUp, onSwitchToSignIn, switchPrompt, switchLabel, emailLabel = 'Email', emailPlaceholder = 'you@example.com', passwordLabel = 'Password', passwordPlaceholder = 'Your password', firstNameLabel = 'First name', firstNamePlaceholder = 'Ada', lastNameLabel = 'Last name', lastNamePlaceholder = 'Lovelace', onBack, onDismiss, stepCount, stepIndex = 0, legalLinks, onLegalLinkClick, pinSwitchFooter = false, ground = 'plain', accent = 'primary', className, style, ...rest }, ref) {
    const register = mode === 'register';
    const gated = requireTerms ?? register;
    // The footer carries the *opposite* action, so which callback it fires
    // depends on the mode. A host that renders both modes from one prop set
    // usually wires only the one it thinks in, so the other is the fallback
    // rather than leaving the footer silently absent.
    const switchClick = register
        ? (onSwitchToSignIn ?? onSwitchToSignUp)
        : (onSwitchToSignUp ?? onSwitchToSignIn);
    const switchFooter = switchClick ? ((0, jsx_runtime_1.jsx)(AuthSwitchFooterV4_1.AuthSwitchFooterV4, { prompt: switchPrompt ?? (register ? 'Already have an account?' : "Don't have an account?"), label: switchLabel ?? (register ? 'Sign in' : 'Sign up'), onClick: switchClick, disabled: pending })) : null;
    const legal = legalLinks?.filter((link) => link.label) ?? [];
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, style: { ...(0, flow_v4_1.flowGroundVars)(ground, accent), ...style }, className: (0, cn_1.cn)('flex min-h-full flex-col bg-[var(--flow-page)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)(flow_v4_1.FlowHeaderV4, { onBack: onBack, onDismiss: onDismiss, progress: stepCount != null && stepCount > 0 ? ((0, jsx_runtime_1.jsx)(ProgressDotsV4_1.ProgressDotsV4, { variant: "bars", accent: accent, count: stepCount, activeIndex: stepIndex })) : null }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-h-0 flex-1 flex-col gap-lg overflow-y-auto p-lg", children: [(0, jsx_runtime_1.jsx)(AuthBrandTileV4_1.AuthBrandTileV4, { glyph: logoGlyph, name: logoIcon, align: "left" }), (0, jsx_runtime_1.jsx)(AuthHeadingV4_1.AuthHeadingV4, { title: title ?? (register ? 'Create account' : 'Welcome back'), subtitle: subtitle, align: "left", size: "3xl" }), error ? (0, jsx_runtime_1.jsx)(AlertV4_1.AlertV4, { tone: "danger", children: error }) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-md", children: [register ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-sm", children: [(0, jsx_runtime_1.jsx)(AuthFieldV4_1.AuthFieldV4, { className: "flex-1", label: firstNameLabel, icon: "user", placeholder: firstNamePlaceholder, autoComplete: "given-name", error: firstNameError, disabled: pending, value: firstName, onChangeText: onFirstNameChange }), (0, jsx_runtime_1.jsx)(AuthFieldV4_1.AuthFieldV4, { className: "flex-1", label: lastNameLabel, icon: "user", placeholder: lastNamePlaceholder, autoComplete: "family-name", error: lastNameError, disabled: pending, value: lastName, onChangeText: onLastNameChange })] })) : null, (0, jsx_runtime_1.jsx)(AuthFieldV4_1.AuthFieldV4, { label: emailLabel, icon: "mail", inputType: "email", placeholder: emailPlaceholder, autoComplete: "email", error: emailError, disabled: pending, value: email, onChangeText: onEmailChange }), (0, jsx_runtime_1.jsx)(AuthFieldV4_1.AuthFieldV4, { secure: true, label: passwordLabel, icon: "lock", placeholder: passwordPlaceholder, autoComplete: register ? 'new-password' : 'current-password', error: passwordError, disabled: pending, value: password, onChangeText: onPasswordChange }), !register && onForgotPassword ? ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onForgotPassword, disabled: pending, "data-xen-v4-chrome": "on-surface", className: (0, cn_1.cn)('self-end rounded-[var(--xen-radius-md)] px-sm text-sm font-semibold text-primary-text', chrome_v4_1.MIN_TAP_CLASS), children: forgotLabel })) : null, register && gated ? ((0, jsx_runtime_1.jsx)(AuthTermsCardV4_1.AuthTermsCardV4, { checked: termsAccepted, onCheckedChange: onTermsChange, label: termsLabel, links: termsLinks, onLinkClick: onTermsLinkClick, error: termsError, disabled: pending })) : null] }), providers.length > 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-md", children: [(0, jsx_runtime_1.jsx)(AuthDividerV4_1.AuthDividerV4, { label: providersLabel }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-sm", children: providers.map((provider) => ((0, jsx_runtime_1.jsx)(AuthProviderButtonV4_1.AuthProviderButtonV4, { label: provider.label, glyph: provider.glyph, disabled: pending, onClick: () => onProviderClick?.(provider.id) }, provider.id))) })] })) : null, pinSwitchFooter ? null : switchFooter] }), (0, jsx_runtime_1.jsxs)(AuthStickyFooterV4_1.AuthStickyFooterV4, { children: [(0, jsx_runtime_1.jsx)(GetStartedButtonV4_1.GetStartedButtonV4, { label: submitLabel ?? (register ? 'Create account' : 'Sign in'), onClick: onSubmit, loading: pending, disabled: register && gated && !termsAccepted }), pinSwitchFooter ? switchFooter : null, legal.length > 0 ? ((0, jsx_runtime_1.jsx)("p", { className: "flex items-center justify-center gap-sm text-xs text-muted-text", children: legal.map((link, i) => ((0, jsx_runtime_1.jsxs)(React.Fragment, { children: [i > 0 ? (0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, children: "\u00B7" }) : null, (0, jsx_runtime_1.jsx)(flow_v4_1.FlowLinkV4, { label: link.label, emphasis: "tertiary", onClick: onLegalLinkClick ? () => onLegalLinkClick(link.id) : undefined })] }, link.id))) })) : null] })] }));
});
//# sourceMappingURL=SignInScreenV4.js.map
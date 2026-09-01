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
exports.SignInScreenV4 = SignInScreenV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const AlertV4_1 = require("../primitives/AlertV4");
const AuthBrandTileV4_1 = require("../primitives/AuthBrandTileV4");
const AuthDividerV4_1 = require("../primitives/AuthDividerV4");
const AuthFieldV4_1 = require("../primitives/AuthFieldV4");
const AuthHeadingV4_1 = require("../primitives/AuthHeadingV4");
const AuthProviderButtonV4_1 = require("../primitives/AuthProviderButtonV4");
const AuthStickyFooterV4_1 = require("../primitives/AuthStickyFooterV4");
const AuthSwitchFooterV4_1 = require("../primitives/AuthSwitchFooterV4");
const AuthTermsCardV4_1 = require("../primitives/AuthTermsCardV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const GetStartedButtonV4_1 = require("./GetStartedButtonV4");
const ProgressDotsV4_1 = require("./ProgressDotsV4");
const flow_v4_1 = require("./internal/flow-v4");
const flow_v4_2 = require("./internal/flow-v4");
/**
 * **V4 sign-in / register** — the base's props plus the header controls
 * (`onBack`, `onDismiss`, `stepCount`), `legalLinks`, `pinSwitchFooter` and
 * the line's `ground`/`accent`.
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
 *    a screen built with V4 components everywhere else had base-line auth
 *    fields in the middle of it. This is the mechanical half of the pass and
 *    the visible one: control height, focus ring, error text and press state
 *    all change to the shared answer.
 * 2. **The screen has a header.** Every other screen in the funnel does, and
 *    the base's sign-in was the one place a user could not go back or see how
 *    far through they were.
 * 3. **The switch footer can be pinned** — see `pinSwitchFooter`.
 * 4. **Legal links have a home** under the CTA, where a register screen needs
 *    them.
 * 5. **The forgot link takes a press layer and a real tap target**, instead of
 *    being a bare `Text` in a `Pressable` with `hitSlop`.
 *
 * Both modes must render with `providers={[]}` — an app with no social
 * sign-in must not show a rule labelled "or continue with" above nothing — and
 * the guard is on the whole block, divider included.
 */
function SignInScreenV4({ mode = 'signIn', title, subtitle, logoGlyph, logoIcon, email, onEmailChange, password, onPasswordChange, firstName = '', onFirstNameChange, lastName = '', onLastNameChange, onSubmit, submitLabel, pending = false, error, emailError, passwordError, firstNameError, lastNameError, termsError, requireTerms, termsAccepted = false, onTermsChange, termsLabel, termsLinks, onTermsLinkPress, providers = [], onProviderPress, providersLabel = 'or continue with', onForgotPassword, forgotLabel = 'Forgot password?', onSwitchToSignUp, onSwitchToSignIn, switchPrompt, switchLabel, emailLabel = 'Email', emailPlaceholder = 'you@example.com', passwordLabel = 'Password', passwordPlaceholder = 'Your password', firstNameLabel = 'First name', firstNamePlaceholder = 'Ada', lastNameLabel = 'Last name', lastNamePlaceholder = 'Lovelace', onBack, onDismiss, stepCount, stepIndex = 0, legalLinks, onLegalLinkPress, pinSwitchFooter = false, ground = 'plain', accent = 'primary', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    const grounds = (0, flow_v4_1.flowGrounds)(theme, ground, accent);
    const register = mode === 'register';
    const gated = requireTerms ?? register;
    // The footer carries the *opposite* action, so which callback it fires
    // depends on the mode. A host that renders both modes from one prop set
    // usually wires only the one it thinks in, so the other is the fallback
    // rather than leaving the footer silently absent.
    const switchPress = register
        ? (onSwitchToSignIn ?? onSwitchToSignUp)
        : (onSwitchToSignUp ?? onSwitchToSignIn);
    const switchFooter = switchPress ? ((0, jsx_runtime_1.jsx)(AuthSwitchFooterV4_1.AuthSwitchFooterV4, { prompt: switchPrompt ?? (register ? 'Already have an account?' : "Don't have an account?"), label: switchLabel ?? (register ? 'Sign in' : 'Sign up'), onPress: switchPress, disabled: pending })) : null;
    const legal = legalLinks?.filter((link) => link.label) ?? [];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ flex: 1, backgroundColor: grounds.page }, style], children: [(0, jsx_runtime_1.jsx)(flow_v4_1.FlowHeaderV4, { onBack: onBack, onDismiss: onDismiss, progress: stepCount != null && stepCount > 0 ? ((0, jsx_runtime_1.jsx)(ProgressDotsV4_1.ProgressDotsV4, { variant: "bars", accent: accent, count: stepCount, activeIndex: stepIndex })) : null }), (0, jsx_runtime_1.jsxs)(react_native_1.ScrollView, { keyboardShouldPersistTaps: "handled", contentContainerStyle: {
                    flexGrow: 1,
                    padding: tokens.spacing.lg,
                    gap: tokens.spacing.lg,
                }, children: [(0, jsx_runtime_1.jsx)(AuthBrandTileV4_1.AuthBrandTileV4, { glyph: logoGlyph, name: logoIcon, align: "left" }), (0, jsx_runtime_1.jsx)(AuthHeadingV4_1.AuthHeadingV4, { title: title ?? (register ? 'Create account' : 'Welcome back'), subtitle: subtitle, align: "left", size: "3xl" }), error ? (0, jsx_runtime_1.jsx)(AlertV4_1.AlertV4, { tone: "danger", children: error }) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.md }, children: [register ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(AuthFieldV4_1.AuthFieldV4, { style: { flex: 1 }, label: firstNameLabel, icon: "user", accessibilityLabel: firstNameLabel, placeholder: firstNamePlaceholder, autoComplete: "name-given", textContentType: "givenName", error: firstNameError, disabled: pending, value: firstName, onChangeText: onFirstNameChange }), (0, jsx_runtime_1.jsx)(AuthFieldV4_1.AuthFieldV4, { style: { flex: 1 }, label: lastNameLabel, icon: "user", accessibilityLabel: lastNameLabel, placeholder: lastNamePlaceholder, autoComplete: "name-family", textContentType: "familyName", error: lastNameError, disabled: pending, value: lastName, onChangeText: onLastNameChange })] })) : null, (0, jsx_runtime_1.jsx)(AuthFieldV4_1.AuthFieldV4, { label: emailLabel, icon: "mail", accessibilityLabel: emailLabel, placeholder: emailPlaceholder, keyboardType: "email-address", autoCapitalize: "none", autoComplete: "email", textContentType: "emailAddress", error: emailError, disabled: pending, value: email, onChangeText: onEmailChange }), (0, jsx_runtime_1.jsx)(AuthFieldV4_1.AuthFieldV4, { secure: true, label: passwordLabel, icon: "lock", accessibilityLabel: passwordLabel, placeholder: passwordPlaceholder, autoCapitalize: "none", autoComplete: register ? 'password-new' : 'password', textContentType: register ? 'newPassword' : 'password', error: passwordError, disabled: pending, value: password, onChangeText: onPasswordChange }), !register && onForgotPassword ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: forgotLabel, onPress: onForgotPassword, disabled: pending, style: ({ pressed }) => ({
                                    alignSelf: 'flex-end',
                                    justifyContent: 'center',
                                    minHeight: (0, chrome_v4_1.minTap)(tokens.spacing),
                                    paddingHorizontal: tokens.spacing.sm,
                                    borderRadius: tokens.radius.md,
                                    backgroundColor: pressed ? (0, state_v4_1.pressLayer)(theme) : 'transparent',
                                }), children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "primaryText", children: forgotLabel }) })) : null, register && gated ? ((0, jsx_runtime_1.jsx)(AuthTermsCardV4_1.AuthTermsCardV4, { checked: termsAccepted, onCheckedChange: onTermsChange, label: termsLabel, links: termsLinks, onLinkPress: onTermsLinkPress, error: termsError, disabled: pending })) : null] }), providers.length > 0 ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(AuthDividerV4_1.AuthDividerV4, { label: providersLabel }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: providers.map((provider) => ((0, jsx_runtime_1.jsx)(AuthProviderButtonV4_1.AuthProviderButtonV4, { label: provider.label, glyph: provider.glyph, disabled: pending, onPress: () => onProviderPress?.(provider.id) }, provider.id))) })] })) : null, pinSwitchFooter ? null : switchFooter] }), (0, jsx_runtime_1.jsxs)(AuthStickyFooterV4_1.AuthStickyFooterV4, { children: [(0, jsx_runtime_1.jsx)(GetStartedButtonV4_1.GetStartedButtonV4, { label: submitLabel ?? (register ? 'Create account' : 'Sign in'), onPress: onSubmit, loading: pending, disabled: register && gated && !termsAccepted }), pinSwitchFooter ? switchFooter : null, legal.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: tokens.spacing.sm,
                        }, children: legal.map((link, i) => ((0, jsx_runtime_1.jsxs)(React.Fragment, { children: [i > 0 ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: "\u00B7" })) : null, (0, jsx_runtime_1.jsx)(flow_v4_2.FlowLinkV4, { label: link.label, emphasis: "tertiary", onPress: onLegalLinkPress ? () => onLegalLinkPress(link.id) : undefined })] }, link.id))) })) : null] })] }));
}
//# sourceMappingURL=SignInScreenV4.js.map
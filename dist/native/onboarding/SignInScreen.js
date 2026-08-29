"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSignInParts = useSignInParts;
exports.SignInScreen = SignInScreen;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const AuthCard_1 = require("../primitives/AuthCard");
const GetStartedButton_1 = require("./GetStartedButton");
/**
 * Resolve {@link SignInScreenProps} into the shared anatomy. Exported for the
 * V2/V3 lines in this module; not part of the package's public surface.
 */
function useSignInParts(props, options = {}) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    const { headingSize = '3xl', align = 'left', trailingArrow = true } = options;
    const { mode = 'signIn', title, subtitle, logoGlyph, logoIcon, email, onEmailChange, password, onPasswordChange, firstName = '', onFirstNameChange, lastName = '', onLastNameChange, onSubmit, submitLabel, pending = false, error, emailError, passwordError, firstNameError, lastNameError, termsError, requireTerms, termsAccepted = false, onTermsChange, termsLabel, termsLinks, onTermsLinkPress, providers = [], onProviderPress, providersLabel = 'or continue with', onForgotPassword, forgotLabel = 'Forgot password?', onSwitchToSignUp, onSwitchToSignIn, switchPrompt, switchLabel, emailLabel = 'Email', emailPlaceholder = 'you@example.com', passwordLabel = 'Password', passwordPlaceholder = 'Your password', firstNameLabel = 'First name', firstNamePlaceholder = 'Ada', lastNameLabel = 'Last name', lastNamePlaceholder = 'Lovelace', } = props;
    const register = mode === 'register';
    const gated = requireTerms ?? register;
    /*
      The footer carries the *opposite* action, so which callback it fires
      depends on the mode. A host that renders both modes from one prop set
      usually wires only the one it thinks in, so the other is accepted as a
      fallback rather than leaving the footer silently absent.
    */
    const switchPress = register
        ? (onSwitchToSignIn ?? onSwitchToSignUp)
        : (onSwitchToSignUp ?? onSwitchToSignIn);
    const brand = (0, jsx_runtime_1.jsx)(AuthCard_1.AuthBrandTile, { glyph: logoGlyph, name: logoIcon, align: align });
    const heading = ((0, jsx_runtime_1.jsx)(AuthCard_1.AuthHeading, { title: title ?? (register ? 'Create account' : 'Welcome back'), subtitle: subtitle, align: align, size: headingSize }));
    const alert = error ? (0, jsx_runtime_1.jsx)(primitives_1.Alert, { tone: "danger", children: error }) : null;
    const fields = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.md }, children: [register ? (
            // §6: two short fields share one row, `sm` between them.
            (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(AuthCard_1.AuthField, { style: { flex: 1 }, label: firstNameLabel, icon: "user", accessibilityLabel: firstNameLabel, placeholder: firstNamePlaceholder, autoComplete: "name-given", textContentType: "givenName", error: firstNameError, disabled: pending, value: firstName, onChangeText: onFirstNameChange }), (0, jsx_runtime_1.jsx)(AuthCard_1.AuthField, { style: { flex: 1 }, label: lastNameLabel, icon: "user", accessibilityLabel: lastNameLabel, placeholder: lastNamePlaceholder, autoComplete: "name-family", textContentType: "familyName", error: lastNameError, disabled: pending, value: lastName, onChangeText: onLastNameChange })] })) : null, (0, jsx_runtime_1.jsx)(AuthCard_1.AuthField, { label: emailLabel, icon: "mail", accessibilityLabel: emailLabel, placeholder: emailPlaceholder, keyboardType: "email-address", autoCapitalize: "none", autoComplete: "email", textContentType: "emailAddress", error: emailError, disabled: pending, value: email, onChangeText: onEmailChange }), (0, jsx_runtime_1.jsx)(AuthCard_1.AuthField, { secure: true, label: passwordLabel, icon: "lock", accessibilityLabel: passwordLabel, placeholder: passwordPlaceholder, autoCapitalize: "none", autoComplete: register ? 'password-new' : 'password', textContentType: register ? 'newPassword' : 'password', error: passwordError, disabled: pending, value: password, onChangeText: onPasswordChange }), !register && onForgotPassword ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: forgotLabel, onPress: onForgotPassword, disabled: pending, hitSlop: tokens.spacing.sm, style: { alignSelf: 'flex-end', justifyContent: 'center', minHeight: AuthCard_1.AUTH_TAP_TARGET }, children: (0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "sm", weight: "medium", tone: "primaryText", children: forgotLabel }) })) : null, register && gated ? ((0, jsx_runtime_1.jsx)(AuthCard_1.AuthTermsCard, { checked: termsAccepted, onCheckedChange: onTermsChange, label: termsLabel, links: termsLinks, onLinkPress: onTermsLinkPress, error: termsError, disabled: pending })) : null] }));
    /*
      §10.6 / the empty state that matters most here: an app with no social
      sign-in must not show a rule labelled "or continue with" above nothing.
      The guard is on the whole block, divider included — not just the buttons.
    */
    const providersBlock = providers.length > 0 ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(AuthCard_1.AuthDivider, { label: providersLabel }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: providers.map((provider) => ((0, jsx_runtime_1.jsx)(AuthCard_1.AuthProviderButton, { label: provider.label, glyph: provider.glyph, disabled: pending, onPress: () => onProviderPress?.(provider.id) }, provider.id))) })] })) : null;
    const switchFooter = switchPress ? ((0, jsx_runtime_1.jsx)(AuthCard_1.AuthSwitchFooter, { prompt: switchPrompt ?? (register ? 'Already have an account?' : "Don't have an account?"), label: switchLabel ?? (register ? 'Sign in' : 'Sign up'), onPress: switchPress, disabled: pending })) : null;
    /*
      The module's own hero CTA, not a second implementation of it:
      `GetStartedButton` already pins §5's bar (56 tall, `radius.full`, full
      width, trailing `→`) and every other screen in the funnel ends on it.
      (`AuthCard`'s `AuthSubmitButton` is the same treatment one layer down, for
      the composed forms that live in `primitives` and cannot import upward.)
    */
    const cta = ((0, jsx_runtime_1.jsx)(GetStartedButton_1.GetStartedButton, { label: submitLabel ?? (register ? 'Create account' : 'Sign in'), onPress: onSubmit, loading: pending, 
        // §9: the register CTA stays disabled until consent is given. Same
        // shape, reduced opacity — §5 — so it does not appear to move when it
        // enables.
        disabled: register && gated && !termsAccepted, trailingArrow: trailingArrow }));
    return { brand, heading, alert, fields, providers: providersBlock, switchFooter, cta, register };
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
 *   message in `dangerText`;
 * - the forgot link right-aligned where the thumb already is;
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
 * it takes callbacks and shaped data and fetches nothing. Wire `onSubmit` to
 * `@xenition/sdk` auth, Supabase, or whatever the app uses. Every color and
 * space comes from the compiled tokens. No literal colors.
 */
function SignInScreen(props) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const parts = useSignInParts(props);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ flex: 1, backgroundColor: colors.surface }, props.style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.ScrollView, { keyboardShouldPersistTaps: "handled", contentContainerStyle: {
                    flexGrow: 1,
                    padding: tokens.spacing.xl,
                    gap: tokens.spacing.lg,
                }, children: [parts.brand, parts.heading, parts.alert, parts.fields, parts.providers, parts.switchFooter] }), (0, jsx_runtime_1.jsx)(AuthCard_1.AuthStickyFooter, { children: parts.cta })] }));
}
//# sourceMappingURL=SignInScreen.js.map
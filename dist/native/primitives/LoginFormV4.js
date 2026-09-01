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
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const AlertV4_1 = require("./AlertV4");
const AuthCardV4_1 = require("./AuthCardV4");
const AuthDividerV4_1 = require("./AuthDividerV4");
const AuthFieldV4_1 = require("./AuthFieldV4");
const AuthProviderButtonV4_1 = require("./AuthProviderButtonV4");
const AuthSubmitButtonV4_1 = require("./AuthSubmitButtonV4");
const AuthSwitchFooterV4_1 = require("./AuthSwitchFooterV4");
const FormV4_1 = require("./FormV4");
const TextV4_1 = require("./TextV4");
const chrome_v4_1 = require("./internal/chrome-v4");
const nav_v4_1 = require("./internal/nav-v4");
const state_v4_1 = require("./internal/state-v4");
const useForm_1 = require("../../primitives/useForm");
/**
 * **V4 sign-in form** — `ONBOARDING-DESIGN-SPEC.md` §9's "Sign in" screen as a
 * drop-in component, in the V4 design line. Native twin of the web
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
 * and every control shares one focus treatment and one M3 state layer.
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
 * **"Forgot password?" is a real tap target.** The base gave it
 * `AUTH_TAP_TARGET` and no press feedback at all. Here it takes `minTap` off
 * the spacing scale — the same expression `ButtonV4` and the V4 nav line
 * compose — and answers a press with the shared state layer instead of nothing.
 * It is also grouped with the password field at `spacing.sm` inside the form's
 * `spacing.lg` rhythm, because §9 puts the link on the field above it rather
 * than adrift between two questions.
 *
 * **Errors are always text.** Field errors come out of `AuthFieldV4` as a
 * message plus a `danger` border; the form-level one is an `AlertV4` with
 * `accessibilityRole="alert"`. Nothing here signals a failure with colour only.
 */
function LoginFormV4({ onSubmit, onForgotPassword, onSignupClick, title = 'Sign in', subtitle, brandGlyph, brandIcon, align = 'left', titleSize = '3xl', submitLabel = 'Sign in', submittingLabel = 'Signing in…', emailLabel = 'Email', emailPlaceholder = 'you@example.com', passwordLabel = 'Password', passwordPlaceholder = 'Your password', forgotLabel = 'Forgot password?', switchPrompt = 'No account?', switchLabel = 'Sign up', providers = [], onProviderClick, providersLabel = 'or continue with', compactProviders = false, error = null, pending = false, submitDisabled = false, initialEmail = '', emailRequiredMessage = 'Email is required', passwordRequiredMessage = 'Password is required', submitErrorFallback = 'Sign in failed', footer, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
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
    const providerRow = providers.map((p) => ((0, jsx_runtime_1.jsx)(AuthProviderButtonV4_1.AuthProviderButtonV4, { label: p.label, glyph: p.glyph, name: p.name, compact: compactProviders, disabled: busy || p.disabled === true, onPress: () => onProviderClick?.(p.id) }, p.id)));
    const cardFooter = onSignupClick || footer != null ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [onSignupClick ? ((0, jsx_runtime_1.jsx)(AuthSwitchFooterV4_1.AuthSwitchFooterV4, { prompt: switchPrompt, label: switchLabel, onPress: onSignupClick, disabled: busy })) : null, footer] })) : undefined;
    return ((0, jsx_runtime_1.jsxs)(AuthCardV4_1.AuthCardV4, { title: title, subtitle: subtitle, brandGlyph: brandGlyph, brandIcon: brandIcon, align: align, titleSize: titleSize, footer: cardFooter, style: style, children: [(0, jsx_runtime_1.jsxs)(FormV4_1.FormV4, { children: [message ? (0, jsx_runtime_1.jsx)(AlertV4_1.AlertV4, { tone: "danger", children: message }) : null, (0, jsx_runtime_1.jsx)(AuthFieldV4_1.AuthFieldV4, { label: emailLabel, icon: "mail", accessibilityLabel: emailLabel, keyboardType: "email-address", autoCapitalize: "none", autoComplete: "email", textContentType: "emailAddress", error: form.errors.email, value: form.values.email, onChangeText: (t) => form.setValue('email', t), placeholder: emailPlaceholder }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(AuthFieldV4_1.AuthFieldV4, { secure: true, label: passwordLabel, icon: "lock", accessibilityLabel: passwordLabel, autoCapitalize: "none", autoComplete: "password", textContentType: "password", error: form.errors.password, value: form.values.password, onChangeText: (t) => form.setValue('password', t), placeholder: passwordPlaceholder }), onForgotPassword ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: forgotLabel, accessibilityState: { disabled: busy }, onPress: onForgotPassword, disabled: busy, style: ({ pressed }) => ({
                                    alignSelf: 'flex-end',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    minHeight: (0, nav_v4_1.minTap)(tokens.spacing),
                                    paddingHorizontal: tokens.spacing.sm,
                                    borderRadius: tokens.radius.md,
                                    backgroundColor: pressed && !busy ? (0, state_v4_1.pressFill)(theme) : 'transparent',
                                    opacity: (0, chrome_v4_1.disabledOpacity)(theme.state, busy),
                                }), children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "medium", tone: "primaryText", children: forgotLabel }) })) : null] }), (0, jsx_runtime_1.jsx)(AuthSubmitButtonV4_1.AuthSubmitButtonV4, { label: submitLabel, busyLabel: submittingLabel, loading: busy, disabled: submitDisabled, onPress: () => {
                            void form.handleSubmit();
                        } })] }), (0, jsx_runtime_1.jsx)(AuthDividerV4_1.AuthDividerV4, { label: providersLabel, children: providerRow })] }));
}
//# sourceMappingURL=LoginFormV4.js.map
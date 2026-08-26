import * as React from 'react';
export interface LoginValues {
    email: string;
    password: string;
}
export interface LoginFormProps {
    /** Called with the credentials. Throw to surface an error message in the form. */
    onSubmit: (values: LoginValues) => void | Promise<void>;
    onForgotPassword?: () => void;
    onSignupClick?: () => void;
    title?: React.ReactNode;
    /** Supporting line under the title. */
    subtitle?: React.ReactNode;
    /** Brand glyph for the §9 tile above the headline. Nothing renders without one. */
    brandGlyph?: string;
    /** Primary CTA copy. Default `'Sign in'`. */
    submitLabel?: string;
    /** Copy for the pending CTA. Default `'Signing in…'`. */
    submittingLabel?: string;
    /** Field copy — the host owns every string a user reads. */
    emailLabel?: string;
    emailPlaceholder?: string;
    passwordLabel?: string;
    passwordPlaceholder?: string;
    forgotLabel?: string;
    switchPrompt?: string;
    switchLabel?: string;
}
/**
 * Drop-in email/password sign-in form — composed from the kit, themed, with
 * validation, loading and error states. SDK-agnostic: wire `onSubmit` to
 * `@xenition/sdk` auth (or anything). Just `<LoginForm onSubmit={…} />`.
 *
 * Drawn from the same parts as the screen-level `SignInScreen` (§6/§9): 56px
 * fields with a muted leading icon, a `primary` focus border, errors as a
 * `danger` border **and** a message in `danger-text`, and the 56px
 * `radius.full` CTA with its trailing `→`. That is the point of sharing them —
 * a screen assembled from this form and a screen assembled from `SignInScreen`
 * are the same product, not two.
 *
 * Everything past `onSubmit`/`onForgotPassword`/`onSignupClick`/`title` is
 * optional copy; with none of it passed the form reads exactly as it did.
 */
export declare function LoginForm({ onSubmit, onForgotPassword, onSignupClick, title, subtitle, brandGlyph, submitLabel, submittingLabel, emailLabel, emailPlaceholder, passwordLabel, passwordPlaceholder, forgotLabel, switchPrompt, switchLabel, }: LoginFormProps): React.ReactElement;
//# sourceMappingURL=LoginForm.d.ts.map
import * as React from 'react';
export interface ForgotPasswordFormProps {
    /** Called with the email. Throw to surface an error; resolve to show the sent state. */
    onSubmit: (email: string) => void | Promise<void>;
    onLoginClick?: () => void;
    title?: React.ReactNode;
    /** Supporting line under the title. */
    subtitle?: React.ReactNode;
    /** Brand glyph for the §9 tile above the headline. Nothing renders without one. */
    brandGlyph?: string;
    /** Primary CTA copy. Default `'Send reset link'`. */
    submitLabel?: string;
    /** Copy for the pending CTA. Default `'Sending…'`. */
    submittingLabel?: string;
    /** Confirmation copy once the request lands. */
    sentMessage?: string;
    /** Field copy — the host owns every string a user reads. */
    emailLabel?: string;
    emailPlaceholder?: string;
    backLabel?: string;
}
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
export declare function ForgotPasswordForm({ onSubmit, onLoginClick, title, subtitle, brandGlyph, submitLabel, submittingLabel, sentMessage, emailLabel, emailPlaceholder, backLabel, }: ForgotPasswordFormProps): React.ReactElement;
//# sourceMappingURL=ForgotPasswordForm.d.ts.map
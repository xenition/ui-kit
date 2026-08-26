import * as React from 'react';
import { type AuthTermsLink } from './AuthCard';
export interface SignupValues {
    name: string;
    email: string;
    password: string;
}
export interface SignupFormProps {
    /** Called with the new-account values. Throw to surface an error message. */
    onSubmit: (values: SignupValues) => void | Promise<void>;
    onLoginClick?: () => void;
    title?: React.ReactNode;
    /** Supporting line under the title. */
    subtitle?: React.ReactNode;
    /** Brand glyph for the §9 tile above the headline. Nothing renders without one. */
    brandGlyph?: string;
    /** Minimum password length (default 8). */
    minPasswordLength?: number;
    /**
     * Render the §9 terms card and keep the CTA disabled until it is ticked.
     * Default `false` — today's form has no consent step and adding one silently
     * would change what an existing app asks its users to agree to.
     */
    requireTerms?: boolean;
    /** Consent lead-in copy. Default `'I agree to the'`. */
    termsLabel?: string;
    /** The inline legal links. Defaults to Terms of Service + Privacy Policy. */
    termsLinks?: AuthTermsLink[];
    /** Fires with the clicked link's `id`. */
    onTermsLinkClick?: (id: string) => void;
    /** Primary CTA copy. Default `'Sign up'`. */
    submitLabel?: string;
    /** Copy for the pending CTA. Default `'Creating…'`. */
    submittingLabel?: string;
    /** Field copy — the host owns every string a user reads. */
    nameLabel?: string;
    namePlaceholder?: string;
    emailLabel?: string;
    emailPlaceholder?: string;
    passwordLabel?: string;
    passwordPlaceholder?: string;
    switchPrompt?: string;
    switchLabel?: string;
}
/**
 * Drop-in sign-up form — composed, themed, validated. Wire `onSubmit` to
 * `@xenition/sdk` auth.
 *
 * Drawn from the same parts as the screen-level `SignInScreen` (§6/§9): 56px
 * fields with a muted leading icon, a `primary` focus border, errors as a
 * `danger` border **and** a message in `danger-text`, and the 56px
 * `radius.full` CTA with its trailing `→`.
 *
 * `requireTerms` opts into §9's consent card — a checkbox in a bordered card
 * with both links inline, gating the CTA. It is off by default because a
 * consent step is a product decision, not a style one.
 */
export declare function SignupForm({ onSubmit, onLoginClick, title, subtitle, brandGlyph, minPasswordLength, requireTerms, termsLabel, termsLinks, onTermsLinkClick, submitLabel, submittingLabel, nameLabel, namePlaceholder, emailLabel, emailPlaceholder, passwordLabel, passwordPlaceholder, switchPrompt, switchLabel, }: SignupFormProps): React.ReactElement;
//# sourceMappingURL=SignupForm.d.ts.map
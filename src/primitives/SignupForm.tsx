import * as React from 'react';
import {
  AuthCard,
  AuthField,
  AuthSubmitButton,
  AuthSwitchFooter,
  AuthTermsCard,
  type AuthTermsLink,
} from './AuthCard';
import { Form } from './Form';
import { Alert } from './Alert';
import { useForm } from './useForm';

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
export function SignupForm({
  onSubmit,
  onLoginClick,
  title = 'Create account',
  subtitle,
  brandGlyph,
  minPasswordLength = 8,
  requireTerms = false,
  termsLabel,
  termsLinks,
  onTermsLinkClick,
  submitLabel = 'Sign up',
  submittingLabel = 'Creating…',
  nameLabel = 'Name',
  namePlaceholder = 'Ada Lovelace',
  emailLabel = 'Email',
  emailPlaceholder = 'you@example.com',
  passwordLabel = 'Password',
  passwordPlaceholder = 'Choose a password',
  switchPrompt = 'Have an account?',
  switchLabel = 'Sign in',
}: SignupFormProps): React.ReactElement {
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [accepted, setAccepted] = React.useState(false);
  const form = useForm<SignupValues>({
    initialValues: { name: '', email: '', password: '' },
    validate: (v) => {
      const e: Partial<Record<keyof SignupValues, string>> = {};
      if (!v.name) e.name = 'Name is required';
      if (!v.email) e.email = 'Email is required';
      if (!v.password || v.password.length < minPasswordLength)
        e.password = `Password must be at least ${minPasswordLength} characters`;
      return e;
    },
    onSubmit: async (v) => {
      setSubmitError(null);
      try {
        await onSubmit(v);
      } catch (err) {
        setSubmitError(err instanceof Error ? err.message : 'Sign up failed');
      }
    },
  });

  return (
    <AuthCard title={title} subtitle={subtitle} brandGlyph={brandGlyph}>
      <Form onSubmit={form.handleSubmit}>
        {submitError && <Alert tone="danger">{submitError}</Alert>}
        <AuthField
          label={nameLabel}
          icon="user"
          aria-label={nameLabel}
          autoComplete="name"
          error={form.errors.name}
          value={form.values.name}
          onChangeText={(t) => form.setValue('name', t)}
          placeholder={namePlaceholder}
        />
        <AuthField
          label={emailLabel}
          icon="mail"
          inputType="email"
          aria-label={emailLabel}
          autoComplete="email"
          error={form.errors.email}
          value={form.values.email}
          onChangeText={(t) => form.setValue('email', t)}
          placeholder={emailPlaceholder}
        />
        <AuthField
          secure
          label={passwordLabel}
          icon="lock"
          aria-label={passwordLabel}
          autoComplete="new-password"
          error={form.errors.password}
          value={form.values.password}
          onChangeText={(t) => form.setValue('password', t)}
          placeholder={passwordPlaceholder}
        />
        {requireTerms && (
          <AuthTermsCard
            checked={accepted}
            onCheckedChange={setAccepted}
            label={termsLabel}
            links={termsLinks}
            onLinkClick={onTermsLinkClick}
          />
        )}
        <AuthSubmitButton
          type="submit"
          label={form.submitting ? submittingLabel : submitLabel}
          loading={form.submitting}
          disabled={requireTerms && !accepted}
        />
        {onLoginClick && (
          <AuthSwitchFooter prompt={switchPrompt} label={switchLabel} onClick={onLoginClick} />
        )}
      </Form>
    </AuthCard>
  );
}

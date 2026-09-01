import * as React from 'react';
import { AlertV4 } from './AlertV4';
import { AuthCardV4 } from './AuthCardV4';
import { AuthDividerV4 } from './AuthDividerV4';
import { AuthFieldV4 } from './AuthFieldV4';
import { AuthProviderButtonV4 } from './AuthProviderButtonV4';
import { AuthSubmitButtonV4 } from './AuthSubmitButtonV4';
import { AuthSwitchFooterV4 } from './AuthSwitchFooterV4';
import { AuthTermsCardV4 } from './AuthTermsCardV4';
import { FormV4 } from './FormV4';
import { useForm } from './useForm';
import type { AuthAlign } from './AuthCard';
import type { TextSize } from './Text';
import type { IconName } from './icon-names';
import type { SignupFormProps, SignupValues } from './SignupForm';

/**
 * One social/SSO button offered under the divider (§9).
 *
 * Structurally the onboarding module's `SignInProvider`, restated here because
 * `primitives/` must not import from `onboarding/` — a primitive that depends
 * on a screen module is a layering inversion, and this is three fields.
 */
export interface SignupProviderV4 {
  /** Stable key handed back to {@link SignupFormV4Props.onProviderClick}. */
  id: string;
  /** Button copy (e.g. `'Continue with Google'`). */
  label: string;
  /** One-off brand glyph — the kit ships no Google/Apple marks. */
  glyph?: string;
  /** A name from the kit's icon set, for a non-brand provider (`'mail'`, `'phone'`). */
  name?: IconName;
}

/**
 * The values the split name row is edited through.
 *
 * The *public* contract is unchanged — {@link SignupFormV4Props.onSubmit} still
 * receives the base's `{ name, email, password }`. This shape exists only
 * between the two visible boxes and the one string they compose, so a caller's
 * `onSubmit` and every existing test of it keep working while §9's First/Last
 * row is what the user actually sees.
 */
interface SignupFieldValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignupFormV4Props extends SignupFormProps {
  /** Brand icon from the named set, for an app with no mark of its own. */
  brandIcon?: IconName;
  /**
   * The accessible name for the brand tile.
   *
   * `AuthCardV4` added this precisely so a mark that carries meaning can
   * announce it, and then no composite forwarded it — so **every composed auth
   * screen's brand tile was permanently decorative**, with the prop reachable
   * only by hand-assembling the card. Found by putting all fourteen auth
   * components on one screen.
   */
  brandLabel?: string;
  /**
   * A layout override for the card.
   *
   * Its two siblings both take one; this form did not, which made it the only
   * auth form a screen could not place. An asymmetry with no reason behind it.
   */
  className?: string;
  /** Headline alignment. Default `'left'` — §9's tile and headline sit top-left. */
  align?: AuthAlign;
  /** Headline step. Default `'3xl'` — §9's register headline. */
  titleSize?: TextSize;
  /**
   * §9's First/Last row. Default `true`.
   *
   * Set `false` for the base's single `Name` box — a jurisdiction or an
   * audience where splitting a name is wrong (mononyms, non-Western ordering)
   * should not have to fork the component.
   */
  splitName?: boolean;
  /** First-name copy, used when {@link splitName} is on. */
  firstNameLabel?: string;
  firstNamePlaceholder?: string;
  /** Last-name copy, used when {@link splitName} is on. */
  lastNameLabel?: string;
  lastNamePlaceholder?: string;
  /**
   * Whether the last name is required. Default `false` — the base required
   * exactly one name and a great many people have exactly one.
   */
  requireLastName?: boolean;
  /** A quiet supporting line inside the consent card. */
  termsDescription?: string;
  /**
   * Shown in the consent card when a submit is attempted with the box
   * unticked. Default `'Please accept the terms to continue'`.
   */
  termsError?: string;
  /** Social/SSO providers. The whole block — divider included — is hidden when empty (§9). */
  providers?: SignupProviderV4[];
  /** Fires with the pressed provider's `id`. */
  onProviderClick?: (id: string) => void;
  /** Divider copy above the provider row. Default `'or continue with'`. */
  providersLabel?: string;
}

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
} as const;

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
export function SignupFormV4({
  onSubmit,
  onLoginClick,
  title = DEFAULTS.title,
  subtitle,
  brandGlyph,
  brandIcon,
  brandLabel,
  className,
  align = 'left',
  titleSize = '3xl',
  minPasswordLength = 8,
  requireTerms = true,
  termsLabel,
  termsLinks,
  onTermsLinkClick,
  termsDescription,
  termsError = DEFAULTS.termsError,
  splitName = true,
  submitLabel = DEFAULTS.submitLabel,
  submittingLabel = DEFAULTS.submittingLabel,
  nameLabel = DEFAULTS.nameLabel,
  namePlaceholder = DEFAULTS.namePlaceholder,
  firstNameLabel = DEFAULTS.firstNameLabel,
  firstNamePlaceholder = DEFAULTS.firstNamePlaceholder,
  lastNameLabel = DEFAULTS.lastNameLabel,
  lastNamePlaceholder = DEFAULTS.lastNamePlaceholder,
  requireLastName = false,
  emailLabel = DEFAULTS.emailLabel,
  emailPlaceholder = DEFAULTS.emailPlaceholder,
  passwordLabel = DEFAULTS.passwordLabel,
  passwordPlaceholder = DEFAULTS.passwordPlaceholder,
  switchPrompt = DEFAULTS.switchPrompt,
  switchLabel = DEFAULTS.switchLabel,
  providers = [],
  onProviderClick,
  providersLabel = DEFAULTS.providersLabel,
}: SignupFormV4Props): React.ReactElement {
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [accepted, setAccepted] = React.useState(false);
  const [termsTouched, setTermsTouched] = React.useState(false);

  const form = useForm<SignupFieldValues>({
    initialValues: { firstName: '', lastName: '', email: '', password: '' },
    validate: (v) => {
      const e: Partial<Record<keyof SignupFieldValues, string>> = {};
      // The base's "name is required", said about whichever box is carrying it.
      if (!v.firstName.trim())
        e.firstName = splitName ? 'First name is required' : 'Name is required';
      if (splitName && requireLastName && !v.lastName.trim())
        e.lastName = 'Last name is required';
      if (!v.email) e.email = 'Email is required';
      if (!v.password || v.password.length < minPasswordLength)
        e.password = `Password must be at least ${minPasswordLength} characters`;
      return e;
    },
    onSubmit: async (v) => {
      setSubmitError(null);
      const values: SignupValues = {
        // Two boxes, one string — the base's `onSubmit` contract, unchanged.
        name: [v.firstName.trim(), v.lastName.trim()].filter(Boolean).join(' '),
        email: v.email,
        password: v.password,
      };
      try {
        await onSubmit(values);
      } catch (err) {
        setSubmitError(err instanceof Error ? err.message : 'Sign up failed');
      }
    },
  });

  // The consent gate. The CTA is disabled on it, but a form can still be
  // submitted from a field, so the gate is enforced here as well as drawn.
  const blocked = requireTerms && !accepted;

  const handleSubmit = (event?: React.FormEvent): void => {
    if (blocked) {
      event?.preventDefault();
      setTermsTouched(true);
      return;
    }
    void form.handleSubmit(event);
  };

  const handleAccept = (next: boolean): void => {
    setAccepted(next);
    if (next) setTermsTouched(false);
  };

  return (
    <AuthCardV4
      title={title}
      subtitle={subtitle}
      brandGlyph={brandGlyph}
      brandIcon={brandIcon}
      brandLabel={brandLabel}
      align={align}
      titleSize={titleSize}
      footer={
        onLoginClick ? (
          <AuthSwitchFooterV4 prompt={switchPrompt} label={switchLabel} onClick={onLoginClick} />
        ) : undefined
      }
    >
      <FormV4 onSubmit={handleSubmit}>
        {submitError ? <AlertV4 tone="danger">{submitError}</AlertV4> : null}

        {splitName ? (
          // §6 — two short fields share a row with `spacing.sm` between them.
          // `min-w-0` so a long placeholder shrinks the box instead of pushing
          // the row past the card's edge.
          <div className="flex w-full items-start gap-sm">
            <AuthFieldV4
              className="min-w-0 flex-1"
              label={firstNameLabel}
              icon="user"
              aria-label={firstNameLabel}
              autoComplete="given-name"
              error={form.errors.firstName}
              value={form.values.firstName}
              onChangeText={(t) => form.setValue('firstName', t)}
              placeholder={firstNamePlaceholder}
            />
            <AuthFieldV4
              className="min-w-0 flex-1"
              label={lastNameLabel}
              aria-label={lastNameLabel}
              autoComplete="family-name"
              error={form.errors.lastName}
              value={form.values.lastName}
              onChangeText={(t) => form.setValue('lastName', t)}
              placeholder={lastNamePlaceholder}
            />
          </div>
        ) : (
          <AuthFieldV4
            label={nameLabel}
            icon="user"
            aria-label={nameLabel}
            autoComplete="name"
            error={form.errors.firstName}
            value={form.values.firstName}
            onChangeText={(t) => form.setValue('firstName', t)}
            placeholder={namePlaceholder}
          />
        )}

        <AuthFieldV4
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

        <AuthFieldV4
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

        {requireTerms ? (
          <AuthTermsCardV4
            checked={accepted}
            onCheckedChange={handleAccept}
            label={termsLabel}
            links={termsLinks}
            onLinkClick={onTermsLinkClick}
            description={termsDescription}
            align={termsDescription ? 'top' : 'center'}
            error={termsTouched && !accepted ? termsError : undefined}
          />
        ) : null}

        {/*
          The disabled CTA has to be able to say WHY it is disabled.

          §9 asks for a CTA disabled until the terms box is ticked, and that is
          kept. But a disabled submit button also suppresses implicit
          (Enter-key) submission, so `handleSubmit` never ran while blocked,
          `termsTouched` was never set, and `termsError` — a string this
          component ships, defaults and documents — could not render from this
          form at any point. It was unreachable weight.

          Pressing a disabled control is the moment a user asks the question,
          so that is where the answer belongs. The wrapper takes the press the
          button cannot, and a control that refuses without explaining itself
          is an accessibility defect rather than a tidy one.
        */}
        <span
          onPointerDown={blocked ? () => setTermsTouched(true) : undefined}
          className="contents"
        >
          <AuthSubmitButtonV4
            type="submit"
            label={submitLabel}
            busyLabel={submittingLabel}
            loading={form.submitting}
            disabled={blocked}
          />
        </span>

        {/*
          The row is the divider's children, so an app with no social sign-in
          renders neither — §9's empty-provider rule, held structurally.
        */}
        <AuthDividerV4 label={providersLabel}>
          {providers.map((provider) => (
            <AuthProviderButtonV4
              key={provider.id}
              label={provider.label}
              glyph={provider.glyph}
              name={provider.name}
              onClick={() => onProviderClick?.(provider.id)}
            />
          ))}
        </AuthDividerV4>
      </FormV4>
    </AuthCardV4>
  );
}

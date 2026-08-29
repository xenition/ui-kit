import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AlertV4 } from './AlertV4';
import { AuthCardV4 } from './AuthCardV4';
import { AuthDividerV4 } from './AuthDividerV4';
import { AuthFieldV4 } from './AuthFieldV4';
import { AuthProviderButtonV4 } from './AuthProviderButtonV4';
import { AuthSubmitButtonV4 } from './AuthSubmitButtonV4';
import { AuthSwitchFooterV4 } from './AuthSwitchFooterV4';
import { AuthTermsCardV4 } from './AuthTermsCardV4';
import { FormV4 } from './FormV4';
import { useForm } from '../../primitives/useForm';
import type { AuthAlign } from './AuthCard';
import type { TextSize } from './Text';
import type { IconName } from '../../primitives/icon-names';
import type { SignupFormProps, SignupValues } from './SignupForm';

/**
 * One social/SSO button offered under the divider (§9).
 *
 * Structurally the onboarding module's `SignInProvider`, restated here because
 * `primitives/` must not import from `onboarding/` — a primitive that depends
 * on a screen module is a layering inversion, and this is three fields.
 */
export interface SignupProviderV4 {
  /** Stable key handed back to {@link SignupFormV4Props.onProviderPress}. */
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
  onProviderPress?: (id: string) => void;
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
 * drop-in composite. Native twin of the web `SignupFormV4`, at prop parity but
 * for the platform's `onProviderPress` / `onTermsLinkPress` naming.
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
 * defaults `true` here, and the CTA is disabled until it is ticked. The gate is
 * also enforced in the submit handler, so a programmatic press cannot slip past
 * the disabled button.
 *
 * **Providers are structural.** The row is handed to `AuthDividerV4` as its
 * children, so `providers={[]}` collapses the divider *and* the row together —
 * §9's "must not show an empty divider" is enforced by the composition rather
 * than by a `&&` at the call site.
 *
 * Errors are always a message, never a border colour alone: the submit failure
 * is an `AlertV4`, and every field prints its own text under the control. No
 * literal colors, spacings, radii or font sizes — everything comes off
 * `useXenitionTheme()`.
 */
export function SignupFormV4({
  onSubmit,
  onLoginClick,
  title = DEFAULTS.title,
  subtitle,
  brandGlyph,
  brandIcon,
  align = 'left',
  titleSize = '3xl',
  minPasswordLength = 8,
  requireTerms = true,
  termsLabel,
  termsLinks,
  onTermsLinkPress,
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
  onProviderPress,
  providersLabel = DEFAULTS.providersLabel,
}: SignupFormV4Props): React.ReactElement {
  const { tokens } = useXenitionTheme();
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

  // The consent gate. The CTA is disabled on it, and the gate is enforced here
  // as well as drawn, so a programmatic press cannot get past it.
  const blocked = requireTerms && !accepted;

  const handleSubmit = (): void => {
    if (blocked) {
      setTermsTouched(true);
      return;
    }
    void form.handleSubmit();
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
      align={align}
      titleSize={titleSize}
      footer={
        onLoginClick ? (
          <AuthSwitchFooterV4 prompt={switchPrompt} label={switchLabel} onPress={onLoginClick} />
        ) : undefined
      }
    >
      <FormV4>
        {submitError ? <AlertV4 tone="danger">{submitError}</AlertV4> : null}

        {splitName ? (
          // §6 — two short fields share a row with `spacing.sm` between them.
          // `flex: 1` each, so the pair always halves whatever width the card
          // gives them instead of overflowing on a narrow phone.
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              gap: tokens.spacing.sm,
            }}
          >
            <AuthFieldV4
              style={{ flex: 1 }}
              label={firstNameLabel}
              icon="user"
              accessibilityLabel={firstNameLabel}
              autoComplete="name-given"
              textContentType="givenName"
              error={form.errors.firstName}
              value={form.values.firstName}
              onChangeText={(t) => form.setValue('firstName', t)}
              placeholder={firstNamePlaceholder}
            />
            <AuthFieldV4
              style={{ flex: 1 }}
              label={lastNameLabel}
              accessibilityLabel={lastNameLabel}
              autoComplete="name-family"
              textContentType="familyName"
              error={form.errors.lastName}
              value={form.values.lastName}
              onChangeText={(t) => form.setValue('lastName', t)}
              placeholder={lastNamePlaceholder}
            />
          </View>
        ) : (
          <AuthFieldV4
            label={nameLabel}
            icon="user"
            accessibilityLabel={nameLabel}
            autoComplete="name"
            textContentType="name"
            error={form.errors.firstName}
            value={form.values.firstName}
            onChangeText={(t) => form.setValue('firstName', t)}
            placeholder={namePlaceholder}
          />
        )}

        <AuthFieldV4
          label={emailLabel}
          icon="mail"
          accessibilityLabel={emailLabel}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          textContentType="emailAddress"
          error={form.errors.email}
          value={form.values.email}
          onChangeText={(t) => form.setValue('email', t)}
          placeholder={emailPlaceholder}
        />

        <AuthFieldV4
          secure
          label={passwordLabel}
          icon="lock"
          accessibilityLabel={passwordLabel}
          autoCapitalize="none"
          autoComplete="password-new"
          textContentType="newPassword"
          error={form.errors.password}
          value={form.values.password}
          onChangeText={(t) => form.setValue('password', t)}
          placeholder={passwordPlaceholder}
          // The keyboard's own "go" key is native's Enter-in-a-field: it
          // reaches the submit without going near the CTA, which is exactly why
          // the consent gate is enforced in the handler and not only drawn on
          // the button.
          returnKeyType="go"
          onSubmitEditing={handleSubmit}
        />

        {requireTerms ? (
          <AuthTermsCardV4
            checked={accepted}
            onCheckedChange={handleAccept}
            label={termsLabel}
            links={termsLinks}
            onLinkPress={onTermsLinkPress}
            description={termsDescription}
            align={termsDescription ? 'top' : 'center'}
            error={termsTouched && !accepted ? termsError : undefined}
          />
        ) : null}

        <AuthSubmitButtonV4
          label={submitLabel}
          busyLabel={submittingLabel}
          onPress={handleSubmit}
          loading={form.submitting}
          disabled={blocked}
        />

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
              onPress={() => onProviderPress?.(provider.id)}
            />
          ))}
        </AuthDividerV4>
      </FormV4>
    </AuthCardV4>
  );
}

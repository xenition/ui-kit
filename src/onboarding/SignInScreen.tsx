import * as React from 'react';
import { cn } from '../primitives/cn';
import { Alert } from '../primitives/Alert';
import { Text, type TextSize } from '../primitives/Text';
import {
  AuthBrandTile,
  AuthDivider,
  AuthField,
  AuthHeading,
  AuthProviderButton,
  AuthStickyFooter,
  AuthSwitchFooter,
  AuthTermsCard,
  type AuthAlign,
  type AuthTermsLink,
} from '../primitives/AuthCard';
import type { IconName } from '../primitives/icon-names';
import { GetStartedButton } from './GetStartedButton';
import type { SignInProvider } from './types';

/** Which of the two auth screens this is. Default `'signIn'`. */
export type SignInMode = 'signIn' | 'register';

export interface SignInScreenProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSubmit'> {
  /**
   * `'signIn'` (default) or `'register'`. §9 gives both screens **one**
   * anatomy — the same brand tile, headline, 56px fields, sticky CTA, divider,
   * providers and footer — differing only in which fields appear and whether
   * consent gates the CTA. Two screens with one anatomy beats two components
   * that drift apart the first time one of them is touched.
   */
  mode?: SignInMode;
  /** Headline. Defaults to `'Welcome back'` / `'Create account'` by mode. */
  title?: string;
  /** Supporting line under the title. */
  subtitle?: string;
  /** Emoji/glyph for the §9 brand tile. Nothing renders without one. */
  logoGlyph?: string;
  /** Brand tile icon from the kit's named set, for an app with no mark. */
  logoIcon?: IconName;

  /** Controlled email value. */
  email: string;
  /** Fires with the new email text. */
  onEmailChange: (value: string) => void;
  /** Controlled password value. */
  password: string;
  /** Fires with the new password text. */
  onPasswordChange: (value: string) => void;

  /** Controlled first name — `register` only, rendered on a row with the last name (§6). */
  firstName?: string;
  onFirstNameChange?: (value: string) => void;
  /** Controlled last name — `register` only. */
  lastName?: string;
  onLastNameChange?: (value: string) => void;

  /** Fires when the primary CTA is clicked. The host does the signing in. */
  onSubmit: () => void;
  /** Primary CTA copy. Defaults to `'Sign in'` / `'Create account'` by mode. */
  submitLabel?: string;
  /** Spinner on the CTA and every control disabled while the host awaits. */
  pending?: boolean;

  /** Form-level failure ("Wrong email or password", "You're offline"). */
  error?: string | null;
  /** Field-level message under the email input. */
  emailError?: string | null;
  /** Field-level message under the password input. */
  passwordError?: string | null;
  /** Field-level message under the first-name input. */
  firstNameError?: string | null;
  /** Field-level message under the last-name input. */
  lastNameError?: string | null;
  /** Message under the terms card (e.g. "Please accept the terms"). */
  termsError?: string | null;

  /**
   * Whether consent gates the CTA. Defaults to `true` in `register` mode and
   * `false` in `signIn` — so the terms card and the disabled CTA are exactly
   * the §9 register behaviour, and no existing sign-in caller is affected.
   * Pass `false` in register mode for an app whose legal copy lives elsewhere.
   */
  requireTerms?: boolean;
  /** Controlled consent state. */
  termsAccepted?: boolean;
  /** Fires with the next consent value. */
  onTermsChange?: (accepted: boolean) => void;
  /** Consent lead-in copy. Default `'I agree to the'`. */
  termsLabel?: string;
  /** The inline legal links. Defaults to Terms of Service + Privacy Policy. */
  termsLinks?: AuthTermsLink[];
  /** Fires with the clicked link's `id`. */
  onTermsLinkClick?: (id: string) => void;

  /** Social/SSO providers to offer. The whole block — divider included — is hidden when empty. */
  providers?: SignInProvider[];
  /** Fires with the provider's `id`. */
  onProviderClick?: (id: string) => void;
  /** Separator copy centred on the divider rule. Default `'or continue with'`. */
  providersLabel?: string;

  /** Fires on the forgot-password link. Hidden when omitted, and in `register` mode. */
  onForgotPassword?: () => void;
  /** Forgot-password copy. Default `'Forgot password?'`. */
  forgotLabel?: string;

  /** Fires on the switch to sign-up (the footer action in `signIn` mode). */
  onSwitchToSignUp?: () => void;
  /** Fires on the switch to sign-in (the footer action in `register` mode). */
  onSwitchToSignIn?: () => void;
  /** Lead-in copy for the switch. Defaults by mode. */
  switchPrompt?: string;
  /** Switch link copy. Defaults by mode. */
  switchLabel?: string;

  /** Field copy — every string a user reads is the host's to localize. */
  emailLabel?: string;
  emailPlaceholder?: string;
  passwordLabel?: string;
  passwordPlaceholder?: string;
  firstNameLabel?: string;
  firstNamePlaceholder?: string;
  lastNameLabel?: string;
  lastNamePlaceholder?: string;
}

/** How one design line wants the shared parts drawn. */
export interface SignInPartsOptions {
  /** Headline step. Base/V2 use `'3xl'` (§9); V3 compacts to `'xl'`. */
  headingSize?: TextSize;
  /** Headline + brand alignment. Default `'left'` — §9 is explicit. */
  align?: AuthAlign;
  /** Trailing `→` on the CTA. Default `true` (§5). */
  trailingArrow?: boolean;
}

/**
 * The parts of the auth anatomy, already wired to the props.
 *
 * The three design lines below differ in **layout**, not in what they are made
 * of: the same brand tile, the same 56px fields, the same divider, the same
 * CTA. Building those once here is what makes that claim true rather than
 * aspirational — a change to the field treatment cannot land in the base
 * screen and miss V3.
 */
export interface SignInParts {
  brand: React.ReactElement | null;
  heading: React.ReactElement | null;
  /** Form-level failure banner, or `null`. */
  alert: React.ReactElement | null;
  /** Every input, the forgot link and the terms card, in §9 order. */
  fields: React.ReactElement;
  /** Divider + provider buttons, or `null` when there are no providers. */
  providers: React.ReactElement | null;
  /** Centred footer line carrying the opposite action, or `null`. */
  switchFooter: React.ReactElement | null;
  /** The §5 CTA. */
  cta: React.ReactElement;
  /** Resolved mode flag, for a line that needs to branch. */
  register: boolean;
}

/**
 * Resolve {@link SignInScreenProps} into the shared anatomy. Exported for the
 * V2/V3 lines in this module; not part of the package's public surface.
 */
export function useSignInParts(
  props: SignInScreenProps,
  options: SignInPartsOptions = {}
): SignInParts {
  const { headingSize = '3xl', align = 'left', trailingArrow = true } = options;

  const {
    mode = 'signIn',
    title,
    subtitle,
    logoGlyph,
    logoIcon,
    email,
    onEmailChange,
    password,
    onPasswordChange,
    firstName = '',
    onFirstNameChange,
    lastName = '',
    onLastNameChange,
    onSubmit,
    submitLabel,
    pending = false,
    error,
    emailError,
    passwordError,
    firstNameError,
    lastNameError,
    termsError,
    requireTerms,
    termsAccepted = false,
    onTermsChange,
    termsLabel,
    termsLinks,
    onTermsLinkClick,
    providers = [],
    onProviderClick,
    providersLabel = 'or continue with',
    onForgotPassword,
    forgotLabel = 'Forgot password?',
    onSwitchToSignUp,
    onSwitchToSignIn,
    switchPrompt,
    switchLabel,
    emailLabel = 'Email',
    emailPlaceholder = 'you@example.com',
    passwordLabel = 'Password',
    passwordPlaceholder = 'Your password',
    firstNameLabel = 'First name',
    firstNamePlaceholder = 'Ada',
    lastNameLabel = 'Last name',
    lastNamePlaceholder = 'Lovelace',
  } = props;

  const register = mode === 'register';
  const gated = requireTerms ?? register;

  /*
    The footer carries the *opposite* action, so which callback it fires
    depends on the mode. A host that renders both modes from one prop set
    usually wires only the one it thinks in, so the other is accepted as a
    fallback rather than leaving the footer silently absent.
  */
  const switchClick = register
    ? (onSwitchToSignIn ?? onSwitchToSignUp)
    : (onSwitchToSignUp ?? onSwitchToSignIn);

  const brand = <AuthBrandTile glyph={logoGlyph} name={logoIcon} align={align} />;

  const heading = (
    <AuthHeading
      title={title ?? (register ? 'Create account' : 'Welcome back')}
      subtitle={subtitle}
      align={align}
      size={headingSize}
    />
  );

  const alert = error ? <Alert tone="danger">{error}</Alert> : null;

  const fields = (
    <div className="flex flex-col gap-md">
      {register ? (
        // §6: two short fields share one row, `sm` between them.
        <div className="flex gap-sm">
          <AuthField
            className="flex-1"
            label={firstNameLabel}
            icon="user"
            aria-label={firstNameLabel}
            placeholder={firstNamePlaceholder}
            autoComplete="given-name"
            error={firstNameError}
            disabled={pending}
            value={firstName}
            onChangeText={onFirstNameChange}
          />
          <AuthField
            className="flex-1"
            label={lastNameLabel}
            icon="user"
            aria-label={lastNameLabel}
            placeholder={lastNamePlaceholder}
            autoComplete="family-name"
            error={lastNameError}
            disabled={pending}
            value={lastName}
            onChangeText={onLastNameChange}
          />
        </div>
      ) : null}

      <AuthField
        label={emailLabel}
        icon="mail"
        inputType="email"
        aria-label={emailLabel}
        placeholder={emailPlaceholder}
        autoComplete="email"
        error={emailError}
        disabled={pending}
        value={email}
        onChangeText={onEmailChange}
      />

      <AuthField
        secure
        label={passwordLabel}
        icon="lock"
        aria-label={passwordLabel}
        placeholder={passwordPlaceholder}
        autoComplete={register ? 'new-password' : 'current-password'}
        error={passwordError}
        disabled={pending}
        value={password}
        onChangeText={onPasswordChange}
      />

      {/*
        §9 puts the forgot link right-aligned under the password on sign-in and
        nowhere at all on register — there is no password to have forgotten
        for an account that does not exist yet.
      */}
      {!register && onForgotPassword ? (
        <button
          type="button"
          aria-label={forgotLabel}
          onClick={onForgotPassword}
          disabled={pending}
          className="self-end"
        >
          <Text size="sm" weight="medium" tone="primaryText">
            {forgotLabel}
          </Text>
        </button>
      ) : null}

      {register && gated ? (
        <AuthTermsCard
          checked={termsAccepted}
          onCheckedChange={onTermsChange}
          label={termsLabel}
          links={termsLinks}
          onLinkClick={onTermsLinkClick}
          error={termsError}
          disabled={pending}
        />
      ) : null}
    </div>
  );

  /*
    §10.6 / the empty state that matters most here: an app with no social
    sign-in must not show a rule labelled "or continue with" above nothing.
    The guard is on the whole block, divider included — not just the buttons.
  */
  const providersBlock =
    providers.length > 0 ? (
      <div className="flex flex-col gap-md">
        <AuthDivider label={providersLabel} />
        <div className="flex flex-col gap-sm">
          {providers.map((provider) => (
            <AuthProviderButton
              key={provider.id}
              label={provider.label}
              glyph={provider.glyph}
              disabled={pending}
              onClick={() => onProviderClick?.(provider.id)}
            />
          ))}
        </div>
      </div>
    ) : null;

  const switchFooter = switchClick ? (
    <AuthSwitchFooter
      prompt={switchPrompt ?? (register ? 'Already have an account?' : "Don't have an account?")}
      label={switchLabel ?? (register ? 'Sign in' : 'Sign up')}
      onClick={switchClick}
      disabled={pending}
    />
  ) : null;

  /*
    The module's own hero CTA, not a second implementation of it:
    `GetStartedButton` already pins §5's bar (56 tall, `radius.full`, full
    width, trailing `→`) and every other screen in the funnel ends on it.
    (`AuthCard`'s `AuthSubmitButton` is the same treatment one layer down, for
    the composed forms that live in `primitives` and cannot import upward.)
  */
  const cta = (
    <GetStartedButton
      label={submitLabel ?? (register ? 'Create account' : 'Sign in')}
      onClick={onSubmit}
      loading={pending}
      // §9: the register CTA stays disabled until consent is given. Same
      // shape, reduced opacity — §5 — so it does not appear to move when it
      // enables.
      disabled={register && gated && !termsAccepted}
      trailingArrow={trailingArrow}
    />
  );

  return { brand, heading, alert, fields, providers: providersBlock, switchFooter, cta, register };
}

/**
 * Every prop the anatomy consumes. A design line spreads whatever is left onto
 * its wrapper element, so `id`, `data-*` and the rest of the DOM surface keep
 * working the way they did when this screen destructured them by hand.
 */
const SIGN_IN_ANATOMY_PROPS = new Set<string>([
  'mode', 'title', 'subtitle', 'logoGlyph', 'logoIcon',
  'email', 'onEmailChange', 'password', 'onPasswordChange',
  'firstName', 'onFirstNameChange', 'lastName', 'onLastNameChange',
  'onSubmit', 'submitLabel', 'pending',
  'error', 'emailError', 'passwordError', 'firstNameError', 'lastNameError', 'termsError',
  'requireTerms', 'termsAccepted', 'onTermsChange', 'termsLabel', 'termsLinks', 'onTermsLinkClick',
  'providers', 'onProviderClick', 'providersLabel',
  'onForgotPassword', 'forgotLabel',
  'onSwitchToSignUp', 'onSwitchToSignIn', 'switchPrompt', 'switchLabel',
  'emailLabel', 'emailPlaceholder', 'passwordLabel', 'passwordPlaceholder',
  'firstNameLabel', 'firstNamePlaceholder', 'lastNameLabel', 'lastNamePlaceholder',
  'className',
]);

/** The DOM props left over once the anatomy has taken what it needs. */
export function signInDomProps(props: SignInScreenProps): React.HTMLAttributes<HTMLDivElement> {
  const rest: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(props)) {
    if (!SIGN_IN_ANATOMY_PROPS.has(key)) rest[key] = value;
  }
  return rest as React.HTMLAttributes<HTMLDivElement>;
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
 *   message in `danger-text`;
 * - the forgot link right-aligned where the cursor already is;
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
 * it takes callbacks and shaped data and fetches nothing. The native twin is at
 * prop parity — `onProviderPress`/`onTermsLinkPress` for `onProviderClick`/
 * `onTermsLinkClick` is the one house swap. Every color traces to a token.
 */
export const SignInScreen = React.forwardRef<HTMLDivElement, SignInScreenProps>(
  function SignInScreen(props, ref) {
    const parts = useSignInParts(props);

    return (
      <div
        ref={ref}
        className={cn('flex min-h-full flex-col bg-surface', props.className)}
        {...signInDomProps(props)}
      >
        <div className="flex flex-1 flex-col gap-lg overflow-y-auto p-xl">
          {parts.brand}
          {parts.heading}
          {parts.alert}
          {parts.fields}
          {parts.providers}
          {parts.switchFooter}
        </div>

        <AuthStickyFooter>{parts.cta}</AuthStickyFooter>
      </div>
    );
  }
);

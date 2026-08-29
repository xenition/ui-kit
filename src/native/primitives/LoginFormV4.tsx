import * as React from 'react';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AlertV4 } from './AlertV4';
import { AuthCardV4 } from './AuthCardV4';
import { AuthDividerV4 } from './AuthDividerV4';
import { AuthFieldV4 } from './AuthFieldV4';
import { AuthProviderButtonV4 } from './AuthProviderButtonV4';
import { AuthSubmitButtonV4 } from './AuthSubmitButtonV4';
import { AuthSwitchFooterV4 } from './AuthSwitchFooterV4';
import { FormV4 } from './FormV4';
import { TextV4 } from './TextV4';
import { disabledOpacity } from './internal/chrome-v4';
import { minTap } from './internal/nav-v4';
import { pressFill } from './internal/state-v4';
import { useForm } from '../../primitives/useForm';
import type { AuthAlign } from './AuthCard';
import type { IconName } from '../../primitives/icon-names';
import type { TextSize } from './Text';
import type { LoginFormProps, LoginValues } from './LoginForm';

/**
 * One social/SSO button offered under the divider.
 *
 * Declared here rather than imported from `onboarding/types` on purpose: a
 * primitive must not depend on a screen module, and the shape is three fields.
 * It is structurally identical to `SignInProvider`, so a host already holding
 * that list can pass it straight in.
 */
export interface LoginProviderV4 {
  /** Stable key handed back to {@link LoginFormV4Props.onProviderClick}. */
  id: string;
  /** Button copy ("Continue with Google"). Also the accessible name. */
  label: string;
  /** One-off brand glyph — the kit ships no Google/Apple marks. */
  glyph?: string;
  /** A name from the kit's icon set, for a non-brand provider (`'mail'`, `'phone'`). */
  name?: IconName;
  /** Greys this one provider out without removing it from the row. */
  disabled?: boolean;
}

export interface LoginFormV4Props extends LoginFormProps {
  /** Brand icon from the named set, for an app with no mark of its own. */
  brandIcon?: IconName;
  /**
   * Headline alignment. Default `'left'` — §9 is explicit that the brand tile
   * is top-**left**, not centred.
   */
  align?: AuthAlign;
  /** Headline step. Default `'3xl'` (§9). */
  titleSize?: TextSize;

  /**
   * Social/SSO providers offered under the form.
   *
   * The whole block — the "or continue with" rule included — is handed to
   * {@link AuthDividerV4} as its children slot, so `providers={[]}` renders
   * **nothing at all** rather than a hairline introducing a void (§9, §12).
   * Default `[]`.
   */
  providers?: LoginProviderV4[];
  /**
   * Fires with the pressed provider's `id`.
   *
   * Named `onProviderClick` on **both** twins, not `onProviderPress`: the
   * `LoginForm` family already spells its native callbacks `onSignupClick`, and
   * §10.3 asks for one name per prop across the two platforms.
   */
  onProviderClick?: (id: string) => void;
  /** Copy centred on the divider rule. Default `'or continue with'`. */
  providersLabel?: string;
  /** Logo-only provider buttons, for three or more side by side. Default `false`. */
  compactProviders?: boolean;

  /**
   * Host-owned form-level failure ("You're offline"), for an app that does its
   * own error handling rather than throwing from `onSubmit`. Rendered as text
   * in a `danger` alert — never colour alone. A message thrown by `onSubmit`
   * takes precedence, because it is the newer of the two.
   */
  error?: string | null;
  /** Host-driven pending state, ORed with the form's own. Default `false`. */
  pending?: boolean;
  /** Gates the CTA without changing its shape (§5). Default `false`. */
  submitDisabled?: boolean;

  /** Seeds the email field at mount — a remembered address. Not controlled. */
  initialEmail?: string;

  /** Validation copy — the host owns every string a user reads. */
  emailRequiredMessage?: string;
  passwordRequiredMessage?: string;
  /** Shown when `onSubmit` throws something that is not an `Error`. */
  submitErrorFallback?: string;

  /** Extra content under the switch line, inside the card footer. */
  footer?: React.ReactNode;
  /** Wrapper style override — layout only. */
  style?: StyleProp<ViewStyle>;
}

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
export function LoginFormV4({
  onSubmit,
  onForgotPassword,
  onSignupClick,
  title = 'Sign in',
  subtitle,
  brandGlyph,
  brandIcon,
  align = 'left',
  titleSize = '3xl',
  submitLabel = 'Sign in',
  submittingLabel = 'Signing in…',
  emailLabel = 'Email',
  emailPlaceholder = 'you@example.com',
  passwordLabel = 'Password',
  passwordPlaceholder = 'Your password',
  forgotLabel = 'Forgot password?',
  switchPrompt = 'No account?',
  switchLabel = 'Sign up',
  providers = [],
  onProviderClick,
  providersLabel = 'or continue with',
  compactProviders = false,
  error = null,
  pending = false,
  submitDisabled = false,
  initialEmail = '',
  emailRequiredMessage = 'Email is required',
  passwordRequiredMessage = 'Password is required',
  submitErrorFallback = 'Sign in failed',
  footer,
  style,
}: LoginFormV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { tokens } = theme;

  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const form = useForm<LoginValues>({
    initialValues: { email: initialEmail, password: '' },
    validate: (v) => {
      const e: Partial<Record<keyof LoginValues, string>> = {};
      if (!v.email) e.email = emailRequiredMessage;
      if (!v.password) e.password = passwordRequiredMessage;
      return e;
    },
    onSubmit: async (v) => {
      setSubmitError(null);
      try {
        await onSubmit(v);
      } catch (err) {
        setSubmitError(err instanceof Error ? err.message : submitErrorFallback);
      }
    },
  });

  const busy = form.submitting || pending;
  // The thrown message wins: it is the newer of the two, and a host that sets
  // `error` and also throws would otherwise show the stale one.
  const message = submitError ?? error ?? null;

  const providerRow = providers.map((p) => (
    <AuthProviderButtonV4
      key={p.id}
      label={p.label}
      glyph={p.glyph}
      name={p.name}
      compact={compactProviders}
      disabled={busy || p.disabled === true}
      onPress={() => onProviderClick?.(p.id)}
    />
  ));

  const cardFooter =
    onSignupClick || footer != null ? (
      <>
        {onSignupClick ? (
          <AuthSwitchFooterV4
            prompt={switchPrompt}
            label={switchLabel}
            onPress={onSignupClick}
            disabled={busy}
          />
        ) : null}
        {footer}
      </>
    ) : undefined;

  return (
    <AuthCardV4
      title={title}
      subtitle={subtitle}
      brandGlyph={brandGlyph}
      brandIcon={brandIcon}
      align={align}
      titleSize={titleSize}
      footer={cardFooter}
      style={style}
    >
      <FormV4>
        {message ? <AlertV4 tone="danger">{message}</AlertV4> : null}
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
        {/*
          §9 puts "Forgot password?" on the field above it, not adrift in the
          form's own rhythm — so the two are one group at `spacing.sm` inside
          the `spacing.lg` sequence of questions.
        */}
        <View style={{ gap: tokens.spacing.sm }}>
          <AuthFieldV4
            secure
            label={passwordLabel}
            icon="lock"
            accessibilityLabel={passwordLabel}
            autoCapitalize="none"
            autoComplete="password"
            textContentType="password"
            error={form.errors.password}
            value={form.values.password}
            onChangeText={(t) => form.setValue('password', t)}
            placeholder={passwordPlaceholder}
          />
          {onForgotPassword ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={forgotLabel}
              accessibilityState={{ disabled: busy }}
              onPress={onForgotPassword}
              disabled={busy}
              style={({ pressed }) => ({
                alignSelf: 'flex-end',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: minTap(tokens.spacing),
                paddingHorizontal: tokens.spacing.sm,
                borderRadius: tokens.radius.md,
                backgroundColor: pressed && !busy ? pressFill(theme) : 'transparent',
                opacity: disabledOpacity(theme.state, busy),
              })}
            >
              <TextV4 size="sm" weight="medium" tone="primaryText">
                {forgotLabel}
              </TextV4>
            </Pressable>
          ) : null}
        </View>
        <AuthSubmitButtonV4
          label={submitLabel}
          busyLabel={submittingLabel}
          loading={busy}
          disabled={submitDisabled}
          onPress={() => {
            void form.handleSubmit();
          }}
        />
      </FormV4>
      {/*
        The divider owns the empty state: with no providers the map yields `[]`
        and the whole block — rule, label and row — renders `null` (§9).
      */}
      <AuthDividerV4 label={providersLabel}>{providerRow}</AuthDividerV4>
    </AuthCardV4>
  );
}

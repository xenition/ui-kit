import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import {
  AUTH_TAP_TARGET,
  AuthCard,
  AuthField,
  AuthSubmitButton,
  AuthSwitchFooter,
} from './AuthCard';
import { Text } from './Text';
import { Alert } from './Alert';
import { useForm } from '../../primitives/useForm';

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
 * Drop-in email/password sign-in form — the native mirror of the web
 * `LoginForm`. Composed from the kit, themed, with validation, loading and
 * error states. SDK-agnostic: wire `onSubmit` to `@xenition/sdk` auth (or
 * anything). Just `<LoginForm onSubmit={…} />`. No literal colors.
 *
 * Drawn from the same parts as the screen-level `SignInScreen` (§6/§9): 56px
 * fields with a muted leading icon, a `primary` focus border, errors as a
 * `danger` border **and** a message in `dangerText`, and the 56px `radius.full`
 * CTA with its trailing `→`. That is the point of sharing them — a screen
 * assembled from this form and a screen assembled from `SignInScreen` are the
 * same product, not two.
 *
 * Everything past `onSubmit`/`onForgotPassword`/`onSignupClick`/`title` is
 * optional copy; with none of it passed the form reads exactly as it did.
 */
export function LoginForm({
  onSubmit,
  onForgotPassword,
  onSignupClick,
  title = 'Sign in',
  subtitle,
  brandGlyph,
  submitLabel = 'Sign in',
  submittingLabel = 'Signing in…',
  emailLabel = 'Email',
  emailPlaceholder = 'you@example.com',
  passwordLabel = 'Password',
  passwordPlaceholder = 'Your password',
  forgotLabel = 'Forgot password?',
  switchPrompt = 'No account?',
  switchLabel = 'Sign up',
}: LoginFormProps): React.ReactElement {
  const { tokens } = useXenitionTheme();
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const form = useForm<LoginValues>({
    initialValues: { email: '', password: '' },
    validate: (v) => {
      const e: Partial<Record<keyof LoginValues, string>> = {};
      if (!v.email) e.email = 'Email is required';
      if (!v.password) e.password = 'Password is required';
      return e;
    },
    onSubmit: async (v) => {
      setSubmitError(null);
      try {
        await onSubmit(v);
      } catch (err) {
        setSubmitError(err instanceof Error ? err.message : 'Sign in failed');
      }
    },
  });

  return (
    <AuthCard title={title} subtitle={subtitle} brandGlyph={brandGlyph}>
      <View style={{ gap: tokens.spacing.md }}>
        {submitError ? <Alert tone="danger">{submitError}</Alert> : null}
        <AuthField
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
        <AuthField
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
          // §9 right-aligns it: the link belongs to the field above it, not to
          // the margin on the other side of the card.
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={forgotLabel}
            onPress={onForgotPassword}
            hitSlop={tokens.spacing.sm}
            style={{ alignSelf: 'flex-end', justifyContent: 'center', minHeight: AUTH_TAP_TARGET }}
          >
            <Text size="sm" weight="medium" tone="primaryText">
              {forgotLabel}
            </Text>
          </Pressable>
        ) : null}
        <AuthSubmitButton
          label={form.submitting ? submittingLabel : submitLabel}
          onPress={() => form.handleSubmit()}
          loading={form.submitting}
        />
        {onSignupClick ? (
          <AuthSwitchFooter prompt={switchPrompt} label={switchLabel} onPress={onSignupClick} />
        ) : null}
      </View>
    </AuthCard>
  );
}

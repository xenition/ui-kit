import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AuthCard } from './AuthCard';
import { Field } from './Field';
import { Input } from './Input';
import { Button } from './Button';
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
}

/**
 * Drop-in email/password sign-in form — the native mirror of the web
 * `LoginForm`. Composed from the kit, themed, with validation, loading and
 * error states. SDK-agnostic: wire `onSubmit` to `@xenition/sdk` auth (or
 * anything). Just `<LoginForm onSubmit={…} />`. No literal colors.
 */
export function LoginForm({
  onSubmit,
  onForgotPassword,
  onSignupClick,
  title = 'Sign in',
}: LoginFormProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
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
    <AuthCard title={title}>
      <View style={{ gap: tokens.spacing.md }}>
        {submitError ? <Alert tone="danger">{submitError}</Alert> : null}
        <Field label="Email" error={form.errors.email}>
          <Input
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            textContentType="emailAddress"
            invalid={!!form.errors.email}
            value={form.values.email}
            onChangeText={(t) => form.setValue('email', t)}
            placeholder="you@example.com"
          />
        </Field>
        <Field label="Password" error={form.errors.password}>
          <Input
            secureTextEntry
            autoCapitalize="none"
            autoComplete="password"
            textContentType="password"
            invalid={!!form.errors.password}
            value={form.values.password}
            onChangeText={(t) => form.setValue('password', t)}
          />
        </Field>
        {onForgotPassword ? (
          <Pressable
            accessibilityRole="button"
            onPress={onForgotPassword}
            style={{ alignSelf: 'flex-start' }}
          >
            <Text style={{ color: colors.primaryText, fontSize: tokens.typography.scale.sm }}>
              Forgot password?
            </Text>
          </Pressable>
        ) : null}
        <Button onPress={() => form.handleSubmit()} disabled={form.submitting} loading={form.submitting}>
          {form.submitting ? 'Signing in…' : 'Sign in'}
        </Button>
        {onSignupClick ? (
          <View style={{ flexDirection: 'row', justifyContent: 'center', gap: tokens.spacing.xs }}>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
              No account?
            </Text>
            <Pressable accessibilityRole="button" onPress={onSignupClick}>
              <Text style={{ color: colors.primaryText, fontSize: tokens.typography.scale.sm }}>
                Sign up
              </Text>
            </Pressable>
          </View>
        ) : null}
      </View>
    </AuthCard>
  );
}

import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AuthCard } from './AuthCard';
import { Field } from './Field';
import { Input } from './Input';
import { Button } from './Button';
import { Alert } from './Alert';
import { useForm } from '../../primitives/useForm';

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
  /** Minimum password length (default 8). */
  minPasswordLength?: number;
}

/**
 * Drop-in sign-up form — the native mirror of the web `SignupForm`. Composed,
 * themed, validated. Wire `onSubmit` to `@xenition/sdk` auth. No literal colors.
 */
export function SignupForm({
  onSubmit,
  onLoginClick,
  title = 'Create account',
  minPasswordLength = 8,
}: SignupFormProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const [submitError, setSubmitError] = React.useState<string | null>(null);
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
    <AuthCard title={title}>
      <View style={{ gap: tokens.spacing.md }}>
        {submitError ? <Alert tone="danger">{submitError}</Alert> : null}
        <Field label="Name" error={form.errors.name}>
          <Input
            autoComplete="name"
            textContentType="name"
            invalid={!!form.errors.name}
            value={form.values.name}
            onChangeText={(t) => form.setValue('name', t)}
          />
        </Field>
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
            autoComplete="password-new"
            textContentType="newPassword"
            invalid={!!form.errors.password}
            value={form.values.password}
            onChangeText={(t) => form.setValue('password', t)}
          />
        </Field>
        <Button onPress={() => form.handleSubmit()} disabled={form.submitting} loading={form.submitting}>
          {form.submitting ? 'Creating…' : 'Sign up'}
        </Button>
        {onLoginClick ? (
          <View style={{ flexDirection: 'row', justifyContent: 'center', gap: tokens.spacing.xs }}>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
              Have an account?
            </Text>
            <Pressable accessibilityRole="button" onPress={onLoginClick}>
              <Text style={{ color: colors.primaryText, fontSize: tokens.typography.scale.sm }}>
                Sign in
              </Text>
            </Pressable>
          </View>
        ) : null}
      </View>
    </AuthCard>
  );
}

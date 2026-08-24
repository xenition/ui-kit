import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AuthCard } from './AuthCard';
import { Field } from './Field';
import { Input } from './Input';
import { Button } from './Button';
import { Alert } from './Alert';
import { StatusMessage } from './StatusMessage';
import { useForm } from '../../primitives/useForm';

export interface ForgotPasswordFormProps {
  /** Called with the email. Throw to surface an error; resolve to show the sent state. */
  onSubmit: (email: string) => void | Promise<void>;
  onLoginClick?: () => void;
  title?: React.ReactNode;
}

/**
 * Drop-in "reset password" request form — the native mirror of the web
 * `ForgotPasswordForm`. Composed, themed, with a sent confirmation state. Wire
 * `onSubmit` to `@xenition/sdk` auth. No literal colors.
 */
export function ForgotPasswordForm({
  onSubmit,
  onLoginClick,
  title = 'Reset password',
}: ForgotPasswordFormProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [sent, setSent] = React.useState(false);
  const form = useForm<{ email: string }>({
    initialValues: { email: '' },
    validate: (v) => (v.email ? {} : { email: 'Email is required' }),
    onSubmit: async (v) => {
      setSubmitError(null);
      try {
        await onSubmit(v.email);
        setSent(true);
      } catch (err) {
        setSubmitError(err instanceof Error ? err.message : 'Could not send reset email');
      }
    },
  });

  return (
    <AuthCard
      title={title}
      footer={
        onLoginClick ? (
          <Pressable accessibilityRole="button" onPress={onLoginClick}>
            <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.sm }}>
              Back to sign in
            </Text>
          </Pressable>
        ) : undefined
      }
    >
      {sent ? (
        <StatusMessage state="empty" message="Check your email for a reset link." />
      ) : (
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
          <Button onPress={() => form.handleSubmit()} disabled={form.submitting} loading={form.submitting}>
            {form.submitting ? 'Sending…' : 'Send reset link'}
          </Button>
        </View>
      )}
    </AuthCard>
  );
}

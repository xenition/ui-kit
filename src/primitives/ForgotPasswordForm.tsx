import * as React from 'react';
import { AuthCard } from './AuthCard';
import { Form } from './Form';
import { Field } from './Field';
import { Input } from './Input';
import { Button } from './Button';
import { Alert } from './Alert';
import { StatusMessage } from './StatusMessage';
import { useForm } from './useForm';

export interface ForgotPasswordFormProps {
  /** Called with the email. Throw to surface an error; resolve to show the sent state. */
  onSubmit: (email: string) => void | Promise<void>;
  onLoginClick?: () => void;
  title?: React.ReactNode;
}

/** Drop-in "reset password" request form — composed, themed, with a sent confirmation state. */
export function ForgotPasswordForm({
  onSubmit,
  onLoginClick,
  title = 'Reset password',
}: ForgotPasswordFormProps): React.ReactElement {
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
        onLoginClick && (
          <button type="button" onClick={onLoginClick} className="text-primary">
            Back to sign in
          </button>
        )
      }
    >
      {sent ? (
        <StatusMessage state="empty" message="Check your email for a reset link." />
      ) : (
        <Form onSubmit={form.handleSubmit}>
          {submitError && <Alert tone="danger">{submitError}</Alert>}
          <Field label="Email" error={form.errors.email}>
            <Input
              type="email"
              autoComplete="email"
              value={form.values.email}
              onChange={(e) => form.setValue('email', e.target.value)}
              placeholder="you@example.com"
            />
          </Field>
          <Button type="submit" disabled={form.submitting}>
            {form.submitting ? 'Sending…' : 'Send reset link'}
          </Button>
        </Form>
      )}
    </AuthCard>
  );
}

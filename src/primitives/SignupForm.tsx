import * as React from 'react';
import { AuthCard } from './AuthCard';
import { Form } from './Form';
import { Field } from './Field';
import { Input } from './Input';
import { Button } from './Button';
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
  /** Minimum password length (default 8). */
  minPasswordLength?: number;
}

/** Drop-in sign-up form — composed, themed, validated. Wire `onSubmit` to `@xenition/sdk` auth. */
export function SignupForm({
  onSubmit,
  onLoginClick,
  title = 'Create account',
  minPasswordLength = 8,
}: SignupFormProps): React.ReactElement {
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
      <Form onSubmit={form.handleSubmit}>
        {submitError && <Alert tone="danger">{submitError}</Alert>}
        <Field label="Name" error={form.errors.name}>
          <Input
            autoComplete="name"
            value={form.values.name}
            onChange={(e) => form.setValue('name', e.target.value)}
          />
        </Field>
        <Field label="Email" error={form.errors.email}>
          <Input
            type="email"
            autoComplete="email"
            value={form.values.email}
            onChange={(e) => form.setValue('email', e.target.value)}
            placeholder="you@example.com"
          />
        </Field>
        <Field label="Password" error={form.errors.password}>
          <Input
            type="password"
            autoComplete="new-password"
            value={form.values.password}
            onChange={(e) => form.setValue('password', e.target.value)}
          />
        </Field>
        <Button type="submit" disabled={form.submitting}>
          {form.submitting ? 'Creating…' : 'Sign up'}
        </Button>
        {onLoginClick && (
          <p className="text-center text-sm text-muted">
            Have an account?{' '}
            <button type="button" onClick={onLoginClick} className="text-primary">
              Sign in
            </button>
          </p>
        )}
      </Form>
    </AuthCard>
  );
}

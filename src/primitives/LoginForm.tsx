import * as React from 'react';
import { AuthCard } from './AuthCard';
import { Form } from './Form';
import { Field } from './Field';
import { Input } from './Input';
import { Button } from './Button';
import { Alert } from './Alert';
import { useForm } from './useForm';

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
 * Drop-in email/password sign-in form — composed from the kit, themed, with
 * validation, loading and error states. SDK-agnostic: wire `onSubmit` to
 * `@xenition/sdk` auth (or anything). Just `<LoginForm onSubmit={…} />`.
 */
export function LoginForm({
  onSubmit,
  onForgotPassword,
  onSignupClick,
  title = 'Sign in',
}: LoginFormProps): React.ReactElement {
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
        <Field label="Password" error={form.errors.password}>
          <Input
            type="password"
            autoComplete="current-password"
            value={form.values.password}
            onChange={(e) => form.setValue('password', e.target.value)}
          />
        </Field>
        {onForgotPassword && (
          <button type="button" onClick={onForgotPassword} className="self-start text-sm text-primary">
            Forgot password?
          </button>
        )}
        <Button type="submit" disabled={form.submitting}>
          {form.submitting ? 'Signing in…' : 'Sign in'}
        </Button>
        {onSignupClick && (
          <p className="text-center text-sm text-muted">
            No account?{' '}
            <button type="button" onClick={onSignupClick} className="text-primary">
              Sign up
            </button>
          </p>
        )}
      </Form>
    </AuthCard>
  );
}

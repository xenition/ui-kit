import * as React from 'react';
import { Button } from '../primitives/Button';
import { Input } from '../primitives/Input';
import { cn } from '../primitives/cn';

/** Basic, permissive email shape check (no network, no dependency). */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SignupStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface NewsletterSignupProps
  extends Omit<React.HTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  /** Section heading. */
  heading?: React.ReactNode;
  /** Supporting copy under the heading. */
  subtext?: React.ReactNode;
  /**
   * SDK-agnostic submit handler — receives the validated email and may be
   * async. Throw (or reject) to surface the error state.
   */
  onSubmit: (email: string) => void | Promise<void>;
  /** Input placeholder. */
  placeholder?: string;
  /** Submit button label. */
  buttonLabel?: React.ReactNode;
  /** Message shown after a successful submit. */
  successMessage?: React.ReactNode;
  /** Message shown when the email fails validation. */
  invalidMessage?: string;
  /** Fallback message shown when `onSubmit` throws without a message. */
  errorMessage?: string;
}

/**
 * Email-capture block: heading, subtext, validated email input, submit button,
 * and success/error states. The endpoint lives entirely in the caller's async
 * `onSubmit(email)` handler — never hardcoded here.
 */
export const NewsletterSignup = React.forwardRef<HTMLFormElement, NewsletterSignupProps>(
  function NewsletterSignup(
    {
      heading = 'Stay in the loop',
      subtext,
      onSubmit,
      placeholder = 'you@example.com',
      buttonLabel = 'Subscribe',
      successMessage = "Thanks — you're subscribed.",
      invalidMessage = 'Enter a valid email address.',
      errorMessage = 'Something went wrong. Please try again.',
      className,
      ...rest
    },
    ref
  ) {
    const [email, setEmail] = React.useState('');
    const [status, setStatus] = React.useState<SignupStatus>('idle');
    const [message, setMessage] = React.useState<React.ReactNode>(null);
    const messageId = React.useId();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();
      if (!EMAIL_RE.test(email.trim())) {
        setStatus('error');
        setMessage(invalidMessage);
        return;
      }
      setStatus('submitting');
      setMessage(null);
      try {
        await onSubmit(email.trim());
        setStatus('success');
        setMessage(successMessage);
        setEmail('');
      } catch (error) {
        setStatus('error');
        setMessage(error instanceof Error && error.message ? error.message : errorMessage);
      }
    };

    const invalid = status === 'error';

    return (
      <form
        ref={ref}
        data-xen-newsletter=""
        data-status={status}
        onSubmit={handleSubmit}
        noValidate
        className={cn(
          'flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface',
          'p-[var(--xen-space-lg)]',
          className
        )}
        {...rest}
      >
        {heading !== undefined ? (
          <h3 className="font-heading text-lg font-semibold">{heading}</h3>
        ) : null}
        {subtext !== undefined ? <p className="text-sm text-muted">{subtext}</p> : null}
        <div className="flex flex-col gap-[var(--xen-space-sm)] sm:flex-row">
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            aria-label="Email address"
            invalid={invalid}
            aria-describedby={message ? messageId : undefined}
            disabled={status === 'submitting'}
          />
          <Button type="submit" disabled={status === 'submitting'} className="shrink-0">
            {buttonLabel}
          </Button>
        </div>
        {message ? (
          <p
            id={messageId}
            role={status === 'error' ? 'alert' : 'status'}
            aria-live="polite"
            className={cn('text-sm', status === 'success' ? 'text-success' : 'text-danger')}
          >
            {message}
          </p>
        ) : null}
      </form>
    );
  }
);

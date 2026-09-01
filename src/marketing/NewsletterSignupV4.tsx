import * as React from 'react';
import { Button } from '../primitives/Button';
import { Input } from '../primitives/Input';
import { cn } from '../primitives/cn';
import type { NewsletterSignupProps } from './NewsletterSignup';

/** Drop-in for {@link NewsletterSignupProps} — same props, the V4 "showcase" design. */
export type NewsletterSignupV4Props = NewsletterSignupProps;

/** Basic, permissive email shape check (no network, no dependency). */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SignupStatus = 'idle' | 'submitting' | 'success' | 'error';

/**
 * NewsletterSignup — **V4** "showcase" design (web parity of the native V4). The
 * bold conversion moment: a vibrant primary→accent brand-gradient ground
 * carrying an extra-bold near-white heading, a soft supporting line, and a
 * **frosted** email input + submit button (translucent `primary-50` tiles) that
 * read cleanly on the saturated surface. Validation, the async `onSubmit(email)`
 * contract, and the success/error states are preserved exactly from the base;
 * only the skin changes. Same props/behavior as {@link NewsletterSignupProps};
 * every color is a `--xen-*` token (`from-primary-500`, `to-accent-500`,
 * `text-primary-50`) — no literals.
 */
export const NewsletterSignupV4 = React.forwardRef<HTMLFormElement, NewsletterSignupV4Props>(
  function NewsletterSignupV4(
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
          'relative isolate overflow-hidden rounded-[var(--xen-radius-lg)] shadow-lg',
          'bg-gradient-to-br from-primary-500 via-primary-600 to-accent-500 text-primary-50',
          'flex flex-col gap-[var(--xen-space-sm)] p-[var(--xen-space-xl)]',
          className
        )}
        {...rest}
      >
        {heading !== undefined ? (
          <h3 className="font-heading text-2xl font-extrabold leading-tight tracking-tight text-primary-50">
            {heading}
          </h3>
        ) : null}
        {subtext !== undefined ? <p className="text-base text-primary-100">{subtext}</p> : null}
        <div className="mt-[var(--xen-space-xs)] flex flex-col gap-[var(--xen-space-sm)] sm:flex-row">
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
            className="border border-primary-50/30 bg-primary-50/15 text-primary-50 placeholder:text-primary-100/70"
          />
          <Button
            type="submit"
            disabled={status === 'submitting'}
            className="shrink-0 border border-primary-50/30 bg-primary-50/15 text-primary-50 hover:bg-primary-50/25"
          >
            {buttonLabel}
          </Button>
        </div>
        {message ? (
          <p
            id={messageId}
            role={status === 'error' ? 'alert' : 'status'}
            aria-live="polite"
            className={cn('text-sm font-medium', status === 'success' ? 'text-primary-50' : 'text-primary-100')}
          >
            {message}
          </p>
        ) : null}
      </form>
    );
  }
);

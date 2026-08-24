import * as React from 'react';
import { cn } from '../primitives/cn';
import { PinInput } from '../primitives/PinInput';
import { GetStartedButton } from './GetStartedButton';

export interface OtpVerifyProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** The channel the code was sent to (e.g. a phone number or email). */
  destination?: string;
  /** Number of digits. Default `6`. */
  length?: number;
  /** Controlled code value. */
  value: string;
  /** Fires with the joined code on every keystroke. */
  onChange: (value: string) => void;
  /** Fires when the user confirms (or the code auto-fills to full length). */
  onVerify?: (code: string) => void;
  /** Fires when the user clicks "Resend code". */
  onResend?: () => void;
  /** Error message shown under the inputs (e.g. `'That code didn't match'`). */
  error?: string;
  /** Verify button spinner + block. */
  loading?: boolean;
  /** Seconds until resend is available; disables the resend link until 0. */
  resendCountdown?: number;
  /** Verify button copy. Default `'Verify'`. */
  verifyLabel?: string;
  /** Auto-fire `onVerify` once the code reaches `length`. Default `true`. */
  autoSubmit?: boolean;
}

/**
 * One-time-code verification — reuses the {@link PinInput} primitive for entry
 * and adds the surrounding flow: a "sent to {destination}" line, an error slot
 * (announced assertively), a Verify button and a resend link with an optional
 * countdown. When `autoSubmit` is on it fires `onVerify` as soon as the code
 * fills, matching the SMS-autofill idiom. Colors come from tokens/primitives.
 * No literal colors.
 */
export const OtpVerify = React.forwardRef<HTMLDivElement, OtpVerifyProps>(
  function OtpVerify(
    {
      destination,
      length = 6,
      value,
      onChange,
      onVerify,
      onResend,
      error,
      loading = false,
      resendCountdown,
      verifyLabel = 'Verify',
      autoSubmit = true,
      className,
      ...rest
    },
    ref
  ) {
    const handleChange = (next: string): void => {
      onChange(next);
      if (autoSubmit && next.length === length) onVerify?.(next);
    };

    const canResend = resendCountdown == null || resendCountdown <= 0;

    return (
      <div ref={ref} className={cn('flex flex-col items-center gap-6', className)} {...rest}>
        {destination ? (
          <p className="text-center text-base text-muted">
            Enter the code we sent to{' '}
            <span className="font-bold text-on-surface">{destination}</span>
          </p>
        ) : null}

        <PinInput length={length} value={value} onChange={handleChange} />

        {error ? (
          <p aria-live="assertive" className="text-center text-sm text-danger">
            {error}
          </p>
        ) : null}

        <GetStartedButton
          label={verifyLabel}
          loading={loading}
          disabled={value.length < length}
          onClick={() => onVerify?.(value)}
        />

        <button
          type="button"
          aria-label="Resend code"
          aria-disabled={!canResend || undefined}
          disabled={!canResend}
          onClick={onResend}
          className={cn(
            'text-sm font-semibold disabled:pointer-events-none',
            canResend ? 'text-primary' : 'text-muted'
          )}
        >
          {canResend ? 'Resend code' : `Resend in ${Math.max(0, resendCountdown ?? 0)}s`}
        </button>
      </div>
    );
  }
);

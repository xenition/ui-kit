import * as React from 'react';
import { cn } from './cn';

export interface PhoneInputProps {
  /** Controlled raw digits (no punctuation), e.g. `"5551234567"`. */
  value?: string;
  /** Fires with the raw digit string (mask is presentation-only). */
  onChangeText?: (digits: string) => void;
  /** Dialing prefix shown in the leading badge. */
  countryCode?: string;
  placeholder?: string;
  /** Renders the danger border state. */
  invalid?: boolean;
  disabled?: boolean;
  /** Accessible label for the input. */
  accessibilityLabel?: string;
  className?: string;
}

/** Strip to digits, cap at 10, format as `(NNN) NNN-NNNN` progressively. */
function formatUsPhone(digits: string): string {
  const d = digits.replace(/\D/g, '').slice(0, 10);
  if (d.length === 0) return '';
  if (d.length <= 3) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

/**
 * Phone field — a token-bound `<input>` that displays a progressive
 * `(NNN) NNN-NNNN` mask while reporting only the raw digits through
 * `onChangeText`, with a leading country-code badge. Web parity of the native
 * `PhoneInput`; border flips to `danger` when `invalid`. No literal colors (kit
 * lint rule).
 */
export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(function PhoneInput(
  {
    value = '',
    onChangeText,
    countryCode = '+1',
    placeholder = '(555) 123-4567',
    invalid = false,
    disabled = false,
    accessibilityLabel = 'Phone number',
    className,
  },
  ref
) {
  const handle = (text: string): void => {
    onChangeText?.(text.replace(/\D/g, '').slice(0, 10));
  };

  return (
    <div
      className={cn(
        'flex w-full items-center gap-sm bg-surface',
        'border rounded-[var(--xen-radius-sm)] px-md py-sm transition-colors',
        'focus-within:ring-1',
        invalid
          ? 'border-danger focus-within:border-danger focus-within:ring-danger'
          : 'border-border focus-within:border-primary focus-within:ring-primary',
        disabled && 'pointer-events-none opacity-50',
        className
      )}
    >
      <span className="border-r border-border pr-sm text-base text-muted">{countryCode}</span>
      <input
        ref={ref}
        type="tel"
        inputMode="tel"
        aria-label={accessibilityLabel}
        aria-invalid={invalid || undefined}
        value={formatUsPhone(value)}
        disabled={disabled}
        placeholder={placeholder}
        autoComplete="tel"
        onChange={(e) => handle(e.target.value)}
        className="min-w-0 flex-1 bg-transparent text-base text-on-surface placeholder:text-muted focus:outline-none"
      />
    </div>
  );
});

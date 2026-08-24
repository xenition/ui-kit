import * as React from 'react';
import { cn } from './cn';

export interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'type'> {
  /** Controlled secret text. */
  value?: string;
  /** Fires with the new secret text. */
  onChangeText?: (text: string) => void;
  /** Optional field label rendered above the input. */
  label?: string;
  placeholder?: string;
  /** Renders the danger border state. */
  invalid?: boolean;
  disabled?: boolean;
  /** Accessible label for the input. */
  accessibilityLabel?: string;
  /** Wrapper className override. */
  className?: string;
}

/**
 * Password field — a token-bound `<input type="password">` with a show/hide
 * toggle that flips the masking. Web parity of the native `PasswordInput`;
 * `invalid` swaps the border to `danger`. No literal colors (kit lint rule).
 */
export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput(
    {
      value = '',
      onChangeText,
      label,
      placeholder = 'Password',
      invalid = false,
      disabled = false,
      accessibilityLabel = 'Password',
      className,
      ...rest
    },
    ref
  ) {
    const [visible, setVisible] = React.useState(false);

    return (
      <div className={cn('flex flex-col gap-xs', className)}>
        {label ? <span className="text-sm text-on-surface">{label}</span> : null}
        <div
          className={cn(
            'flex w-full items-center gap-sm bg-surface',
            'border rounded-[var(--xen-radius-sm)] px-md py-sm transition-colors',
            'focus-within:ring-1',
            invalid
              ? 'border-danger focus-within:border-danger focus-within:ring-danger'
              : 'border-border focus-within:border-primary focus-within:ring-primary',
            disabled && 'pointer-events-none opacity-50'
          )}
        >
          <input
            ref={ref}
            type={visible ? 'text' : 'password'}
            aria-label={accessibilityLabel}
            aria-invalid={invalid || undefined}
            value={value}
            disabled={disabled}
            placeholder={placeholder}
            autoCapitalize="none"
            autoCorrect="off"
            onChange={(e) => onChangeText?.(e.target.value)}
            className="min-w-0 flex-1 bg-transparent text-base text-on-surface placeholder:text-muted focus:outline-none"
            {...rest}
          />
          <button
            type="button"
            aria-label={visible ? 'Hide password' : 'Show password'}
            aria-pressed={visible}
            disabled={disabled}
            onClick={() => setVisible((v) => !v)}
            className={cn(
              'text-sm font-semibold hover:opacity-70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary',
              visible ? 'text-primary' : 'text-muted'
            )}
          >
            {visible ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>
    );
  }
);

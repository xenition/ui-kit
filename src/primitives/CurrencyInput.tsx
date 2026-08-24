import * as React from 'react';
import { cn } from './cn';

export interface CurrencyInputProps {
  /** Controlled numeric amount (major units, e.g. dollars). */
  value?: number | null;
  /** Fires with the parsed number (or `null` when the field is cleared). */
  onChange?: (value: number | null) => void;
  /** Leading currency glyph shown in the badge. */
  symbol?: string;
  /** Fractional digits to allow while typing (default 2). */
  precision?: number;
  placeholder?: string;
  /** Renders the danger border state. */
  invalid?: boolean;
  disabled?: boolean;
  /** Accessible label for the input. */
  accessibilityLabel?: string;
  className?: string;
}

/**
 * Currency field — a token-bound `<input>` with a leading currency badge that
 * accepts digits and a single decimal point (capped to `precision`) and reports
 * the parsed `number` (or `null`) via `onChange`. Web parity of the native
 * `CurrencyInput`; border flips to `danger` when `invalid`. No literal colors
 * (kit lint rule).
 */
export function CurrencyInput({
  value,
  onChange,
  symbol = '$',
  precision = 2,
  placeholder = '0.00',
  invalid = false,
  disabled = false,
  accessibilityLabel = 'Amount',
  className,
}: CurrencyInputProps): React.ReactElement {
  // Local text buffer so a trailing "." or "0" survives while typing; it stays
  // in sync when the controlled value changes from outside.
  const [text, setText] = React.useState(value == null ? '' : String(value));
  React.useEffect(() => {
    const asNum = text === '' ? null : Number(text);
    if (value !== asNum && !(Number.isNaN(asNum ?? NaN) && value == null)) {
      setText(value == null ? '' : String(value));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const sanitize = (raw: string): string => {
    let cleaned = raw.replace(/[^0-9.]/g, '');
    const firstDot = cleaned.indexOf('.');
    if (firstDot !== -1) {
      const head = cleaned.slice(0, firstDot + 1);
      const tail = cleaned.slice(firstDot + 1).replace(/\./g, '');
      cleaned = head + tail.slice(0, Math.max(0, precision));
    }
    return cleaned;
  };

  const handle = (raw: string): void => {
    const next = sanitize(raw);
    setText(next);
    if (next === '' || next === '.') {
      onChange?.(null);
      return;
    }
    const n = Number(next);
    onChange?.(Number.isNaN(n) ? null : n);
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
      <span className="text-base font-semibold text-muted">{symbol}</span>
      <input
        type="text"
        inputMode="decimal"
        aria-label={accessibilityLabel}
        aria-invalid={invalid || undefined}
        value={text}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => handle(e.target.value)}
        className="min-w-0 flex-1 bg-transparent text-right text-base text-on-surface placeholder:text-muted focus:outline-none"
      />
    </div>
  );
}

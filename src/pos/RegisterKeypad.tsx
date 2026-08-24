import * as React from 'react';
import { cn } from '../primitives/cn';

/** A key emitted by the keypad. Digit keys are the character itself. */
export type KeypadKey =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | 'decimal'
  | 'doubleZero'
  | 'backspace'
  | 'clear';

export type RegisterKeypadVariant = 'amount' | 'number' | 'pin';

export interface RegisterKeypadProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onKeyPress' | 'children'> {
  /** Current entry string (controlled). Digits, and a single `.` for `amount`. */
  value?: string;
  /** Called with the next entry string for value-mutating keys. */
  onChange?: (next: string) => void;
  /** Called with every raw key press (including backspace/clear). */
  onKeyPress?: (key: KeypadKey) => void;
  /**
   * Layout mode. `amount` shows a decimal key, `number` swaps it for a `00`
   * key, `pin` masks the display and drops the decimal (bottom-left is clear).
   */
  variant?: RegisterKeypadVariant;
  /** Render the running entry above the grid (default `true`). */
  showDisplay?: boolean;
  /** Prefix drawn before the display value (e.g. a currency symbol). */
  displayPrefix?: string;
  /** Placeholder shown when the entry is empty. */
  placeholder?: string;
  /** Max entry length (guards runaway input). Default 12. */
  maxLength?: number;
  /** Block all keys and dim the grid. */
  disabled?: boolean;
  /** Accessible label for the whole keypad (default `Register keypad`). */
  accessibilityLabel?: string;
}

const DIGIT_ROWS: KeypadKey[][] = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
];

const KEY_LABEL: Partial<Record<KeypadKey, string>> = {
  decimal: 'Decimal point',
  doubleZero: 'Double zero',
  backspace: 'Backspace',
  clear: 'Clear entry',
};

/**
 * A numeric entry grid for a register — tenders, quantities, and PINs, the DOM
 * parity of the native keypad. Keys are emitted through `onKeyPress`, and
 * value-mutating keys additionally fold into a controlled `value` via `onChange`
 * (append digit, single decimal, `00`, backspace, clear). `pin` masks the
 * display. Token-only: every surface, border, and glyph color traces to a
 * `--xen-*` token class, and each key is a real, labelled `<button>` for
 * keyboard + screen-reader use. No dependencies.
 */
export const RegisterKeypad = React.forwardRef<HTMLDivElement, RegisterKeypadProps>(
  function RegisterKeypad(
    {
      value = '',
      onChange,
      onKeyPress,
      variant = 'amount',
      showDisplay = true,
      displayPrefix,
      placeholder = '0',
      maxLength = 12,
      disabled = false,
      accessibilityLabel = 'Register keypad',
      className,
      ...rest
    },
    ref
  ) {
    const applyKey = (key: KeypadKey): string => {
      switch (key) {
        case 'backspace':
          return value.slice(0, -1);
        case 'clear':
          return '';
        case 'decimal':
          return value.includes('.') || value.length >= maxLength ? value : `${value || '0'}.`;
        case 'doubleZero':
          return value.length + 2 > maxLength ? value : `${value}00`;
        default:
          return value.length >= maxLength ? value : `${value}${key}`;
      }
    };

    const press = (key: KeypadKey): void => {
      if (disabled) return;
      onKeyPress?.(key);
      const next = applyKey(key);
      if (next !== value) onChange?.(next);
    };

    const bottomLeft: KeypadKey =
      variant === 'amount' ? 'decimal' : variant === 'number' ? 'doubleZero' : 'clear';
    const rows: KeypadKey[][] = [...DIGIT_ROWS, [bottomLeft, '0', 'backspace']];

    const displayText = variant === 'pin' ? '•'.repeat(value.length) : value;

    const keyLabel = (key: KeypadKey): string => KEY_LABEL[key] ?? key;
    const keyGlyph = (key: KeypadKey): string => {
      switch (key) {
        case 'decimal':
          return '.';
        case 'doubleZero':
          return '00';
        case 'backspace':
          return '⌫';
        case 'clear':
          return 'C';
        default:
          return key;
      }
    };

    return (
      <div
        ref={ref}
        aria-label={accessibilityLabel}
        data-xen-register-keypad=""
        className={cn(
          'flex flex-col gap-[var(--xen-space-sm)]',
          disabled ? 'opacity-50' : '',
          className
        )}
        {...rest}
      >
        {showDisplay ? (
          <div
            aria-label={`Entry ${value || placeholder}`}
            className="flex items-baseline justify-end gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] border border-border bg-surface px-[var(--xen-space-md)] py-[var(--xen-space-sm)]"
          >
            {displayPrefix ? <span className="text-lg text-muted">{displayPrefix}</span> : null}
            <span
              className={cn(
                'truncate text-2xl font-bold tabular-nums',
                value ? 'text-on-surface' : 'text-muted'
              )}
            >
              {displayText || placeholder}
            </span>
          </div>
        ) : null}

        <div className="flex flex-col gap-[var(--xen-space-sm)]">
          {rows.map((row, r) => (
            <div key={r} className="flex gap-[var(--xen-space-sm)]">
              {row.map((key) => {
                const isAction = key === 'backspace' || key === 'clear';
                return (
                  <button
                    key={key}
                    type="button"
                    aria-label={keyLabel(key)}
                    disabled={disabled}
                    onClick={() => press(key)}
                    className={cn(
                      'flex min-h-[52px] flex-1 items-center justify-center rounded-[var(--xen-radius-md)] border border-border bg-surface text-xl font-semibold transition-colors',
                      'hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
                      'disabled:pointer-events-none disabled:opacity-50',
                      isAction ? 'text-muted' : 'text-on-surface'
                    )}
                  >
                    {keyGlyph(key)}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  }
);

import * as React from 'react';
import { cn } from '../primitives/cn';
import type { KeypadKey, RegisterKeypadProps } from './RegisterKeypad';

/** Drop-in for {@link RegisterKeypadProps} — same props, the V4 "register" design. */
export type RegisterKeypadV4Props = RegisterKeypadProps;

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
 * RegisterKeypad — **V4** "register" design (web parity of the native V4). The
 * tactile checkout take on a numeric pad: **big ≥44px keys** with a soft-primary
 * press, a **bold `tabular-nums` amount display**, and distinct clear / backspace
 * action keys (the primary/danger accents a busy counter reaches for). Keys are
 * emitted through `onKeyPress`, and value-mutating keys fold into a controlled
 * `value` via `onChange` (append digit, single decimal, `00`, backspace, clear);
 * `pin` masks the display. Same props/behavior as {@link RegisterKeypadProps};
 * each key is a real, labelled `<button>`, and all colors come from `--xen-*`
 * token classes (no literals).
 */
export const RegisterKeypadV4 = React.forwardRef<HTMLDivElement, RegisterKeypadV4Props>(
  function RegisterKeypadV4(
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

    const keyClass = (key: KeypadKey): string => {
      const base =
        'flex min-h-[56px] flex-1 items-center justify-center rounded-[var(--xen-radius-lg)] border text-2xl font-extrabold tabular-nums transition-all ' +
        'active:scale-[0.95] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 ' +
        'disabled:pointer-events-none disabled:opacity-50';
      if (key === 'clear') {
        return cn(base, 'border-danger bg-surface text-danger hover:bg-danger hover:text-on-danger');
      }
      if (key === 'backspace') {
        return cn(base, 'border-border bg-neutral-100 text-muted hover:bg-neutral-200');
      }
      return cn(base, 'border-border bg-surface text-on-surface hover:bg-primary-50 active:bg-primary-100');
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
            className="flex items-baseline justify-end gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-lg)] border-2 border-border bg-surface px-[var(--xen-space-lg)] py-[var(--xen-space-md)]"
          >
            {displayPrefix ? (
              <span className="text-xl font-bold text-muted">{displayPrefix}</span>
            ) : null}
            <span
              className={cn(
                'truncate text-3xl font-extrabold tabular-nums',
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
              {row.map((key) => (
                <button
                  key={key}
                  type="button"
                  aria-label={keyLabel(key)}
                  disabled={disabled}
                  onClick={() => press(key)}
                  className={keyClass(key)}
                >
                  {keyGlyph(key)}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
);

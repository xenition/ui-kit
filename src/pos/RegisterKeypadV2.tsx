import * as React from 'react';
import { cn } from '../primitives/cn';
import type { RegisterKeypadProps, KeypadKey } from './RegisterKeypad';

/** Same public contract as {@link RegisterKeypad} — a drop-in alternate design. */
export type RegisterKeypadV2Props = RegisterKeypadProps;

const DIGIT_ROWS: KeypadKey[][] = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
];

/**
 * RegisterKeypad, redesigned (v2): a **big circular keypad**. Large round keys
 * with a filled backspace and a tall display panel — a tactile till pad. Identical
 * entry behavior to {@link RegisterKeypad}. Same props, token-only.
 */
export const RegisterKeypadV2 = React.forwardRef<HTMLDivElement, RegisterKeypadV2Props>(
  function RegisterKeypadV2(
    { value = '', onChange, onKeyPress, variant = 'amount', showDisplay = true, displayPrefix, placeholder = '0', maxLength = 12, disabled = false, accessibilityLabel = 'Register keypad', className, ...rest },
    ref
  ) {
    const applyKey = (key: KeypadKey): string => {
      switch (key) {
        case 'backspace': return value.slice(0, -1);
        case 'clear': return '';
        case 'decimal': return value.includes('.') || value.length >= maxLength ? value : `${value || '0'}.`;
        case 'doubleZero': return value.length + 2 > maxLength ? value : `${value}00`;
        default: return value.length >= maxLength ? value : `${value}${key}`;
      }
    };
    const press = (key: KeypadKey): void => {
      if (disabled) return;
      onKeyPress?.(key);
      const next = applyKey(key);
      if (next !== value) onChange?.(next);
    };
    const bottomLeft: KeypadKey = variant === 'amount' ? 'decimal' : variant === 'number' ? 'doubleZero' : 'clear';
    const rows: KeypadKey[][] = [...DIGIT_ROWS, [bottomLeft, '0', 'backspace']];
    const glyph = (k: KeypadKey): string => (k === 'decimal' ? '.' : k === 'doubleZero' ? '00' : k === 'backspace' ? '⌫' : k === 'clear' ? 'C' : k);
    const displayText = variant === 'pin' ? '•'.repeat(value.length) : value;

    return (
      <div ref={ref} aria-label={accessibilityLabel} data-xen-register-keypad="" className={cn('flex flex-col gap-3', disabled && 'opacity-50', className)} {...rest}>
        {showDisplay ? (
          <div aria-label={`Entry ${value || placeholder}`} className="flex items-baseline justify-end gap-1 rounded-lg bg-neutral-100 px-4 py-3">
            {displayPrefix ? <span className="text-lg text-muted">{displayPrefix}</span> : null}
            <span className={cn('truncate text-3xl font-bold tabular-nums', value ? 'text-on-surface' : 'text-muted')}>{displayText || placeholder}</span>
          </div>
        ) : null}
        <div className="flex flex-col gap-3">
          {rows.map((row, r) => (
            <div key={r} className="flex justify-center gap-3">
              {row.map((key) => {
                const isAction = key === 'backspace' || key === 'clear';
                return (
                  <button
                    key={key}
                    type="button"
                    aria-label={glyph(key)}
                    disabled={disabled}
                    onClick={() => press(key)}
                    className={cn(
                      'flex h-16 w-16 items-center justify-center rounded-full text-2xl font-semibold transition-colors',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50',
                      isAction ? 'bg-neutral-100 text-muted hover:bg-neutral-200' : 'bg-surface text-on-surface shadow-sm hover:bg-neutral-50'
                    )}
                  >
                    {glyph(key)}
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

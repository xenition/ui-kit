import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from './cn';
import { FIELD_V4_CSS, FIELD_V4_STYLE_ID, fieldRingVars } from './internal/field-v4';
import type { PinInputProps } from './PinInput';

export type { PinInputProps as PinInputV4Props };

/**
 * **V4 PIN / OTP entry** — the same props as {@link PinInput}, a different
 * design line.
 *
 * A one-time code is the most time-critical field in any product: it is read
 * off another screen while a timer runs. So the changes are about getting
 * through it, not about how it looks:
 *
 * 1. **The code can be pasted whole.** The base takes one character per box, so
 *    pasting six from a message filled one and dropped five. V4 intercepts the
 *    paste, spreads it across the remaining boxes and lands the caret at the
 *    end; the first box carries `autoComplete="one-time-code"`, so the browser
 *    can offer the code from the SMS itself — §4, optimize for time to value,
 *    and §32, recognition over recall.
 * 2. **Boxes at the form's own height.** Each is `2xl` tall — the height every
 *    other V4 control takes — and `2xl − sm` wide, so a row of six still fits a
 *    narrow screen while each box stays a real target (§30).
 * 3. **A ring that shows where you are.** Each box takes the shared V4 halo, and
 *    a box that already holds a digit keeps a brand border, so the row shows
 *    its own progress. The ring is a `box-shadow`, so advancing between boxes
 *    costs no layout (§36.11).
 *
 * The figures are `tabular-nums` and centred, so a `1` sits where an `8` sits
 * and the row does not twitch as it fills. Focusing a box selects what is in
 * it, so typing over a digit replaces it rather than fighting the caret.
 *
 * No gradient, no glass, no shadow: §16 asks that forms stay minimal, and this
 * is the most minimal form there is.
 */
export function PinInputV4({
  length = 6,
  value,
  onChange,
  className,
}: PinInputProps): React.ReactElement {
  injectStyleOnce(FIELD_V4_STYLE_ID, FIELD_V4_CSS);

  const refs = React.useRef<(HTMLInputElement | null)[]>([]);
  const chars = Array.from({ length }, (_, i) => value[i] ?? '');

  const emit = (next: string[]): void => onChange(next.join(''));

  const setChar = (index: number, char: string): void => {
    const next = chars.slice();
    next[index] = char.slice(-1);
    emit(next);
    if (char && index < length - 1) refs.current[index + 1]?.focus();
  };

  /** Spread a pasted code forward from this box instead of dropping all but one. */
  const paste = (index: number, event: React.ClipboardEvent<HTMLInputElement>): void => {
    const text = event.clipboardData.getData('text').replace(/\s/g, '');
    if (text.length <= 1) return;
    event.preventDefault();
    const next = chars.slice();
    let cursor = index;
    for (const char of text) {
      if (cursor >= length) break;
      next[cursor] = char;
      cursor += 1;
    }
    emit(next);
    refs.current[Math.min(cursor, length - 1)]?.focus();
  };

  const onKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Backspace' && !chars[index] && index > 0) refs.current[index - 1]?.focus();
  };

  return (
    <div className={cn('flex gap-sm', className)}>
      {chars.map((char, index) => (
        <input
          key={index}
          ref={(el) => {
            refs.current[index] = el;
          }}
          data-xen-v4-field=""
          inputMode="numeric"
          // Only the first box asks for the code: the browser fills the rest
          // from it, and six boxes all claiming the same autofill is a fight.
          autoComplete={index === 0 ? 'one-time-code' : 'off'}
          maxLength={1}
          value={char}
          onChange={(e) => setChar(index, e.target.value)}
          onPaste={(e) => paste(index, e)}
          onFocus={(e) => e.target.select()}
          onKeyDown={(e) => onKeyDown(index, e)}
          className={cn(
            'h-[var(--xen-space-2xl)] w-[calc(var(--xen-space-2xl)_-_var(--xen-space-sm))]',
            'rounded-[var(--xen-radius-md)] border bg-surface',
            'text-center text-lg tabular-nums text-on-surface',
            // A filled box keeps the brand edge, so the row shows its progress.
            char ? 'border-primary' : 'border-border'
          )}
          style={fieldRingVars(false)}
        />
      ))}
    </div>
  );
}

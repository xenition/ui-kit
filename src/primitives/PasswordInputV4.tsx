import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from './cn';
import {
  FIELD_V4_CSS,
  FIELD_V4_SHELL,
  FIELD_V4_STYLE_ID,
  fieldBorderClass,
  fieldRingVars,
} from './internal/field-v4';
import type { PasswordInputProps } from './PasswordInput';

export type { PasswordInputProps as PasswordInputV4Props };

/**
 * **V4 password field** — the same props as {@link PasswordInput}, a different
 * design line.
 *
 * The reveal toggle is the whole design problem here: it is a word sitting
 * inside a field the user is trying to type into, so it has to be reachable
 * without being in the way. V4 keeps it a word, gives it a full-height target
 * inside the shell, and — this is the part that matters for a keyboard — lets
 * it keep its own focus ring. The shared shell rule suppresses the outline on
 * `input`, `textarea` and `select` only, never on a button living inside a
 * shell, because someone tabbing to the toggle must still see where they are
 * (§46).
 *
 * The rest is the shared field language:
 *
 * - `FIELD_V4_SHELL` — the same height, radius and padding `InputV4` and
 *   `SelectV4` take — so a password sits under an email field in a sign-up
 *   form and shares its edge (§13). The base's `radius.sm` box was visibly a
 *   different component.
 * - The same brand halo, on `:focus-within` so the whole control rings, drawn
 *   with `box-shadow` so arming it costs no layout (§36.11).
 * - The label sits above at `text-sm`, medium weight, matching `InputV4`.
 *
 * The toggle says **Show** / **Hide** rather than carrying an eye icon: §47
 * asks for copy that says what happens, an eye with a slash through it means
 * two different things depending on which product you last used, and the state
 * is then in a word rather than only in an icon (§46). It is tinted
 * `text-primary-text` when revealed — the contrast-safe text form the compiler
 * measured against `surface`, not the vivid `primary` slot, which is for fills.
 *
 * No gradient, no glass, no shadow: §16 asks that forms stay minimal.
 */
export const PasswordInputV4 = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInputV4(
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
    injectStyleOnce(FIELD_V4_STYLE_ID, FIELD_V4_CSS);
    const [visible, setVisible] = React.useState(false);

    return (
      <div className={cn('grid gap-sm', className)}>
        {label ? <span className="text-sm font-medium text-on-surface">{label}</span> : null}
        <div
          data-xen-v4-shell=""
          className={cn(
            FIELD_V4_SHELL,
            fieldBorderClass(invalid),
            'flex items-center gap-sm',
            disabled && 'pointer-events-none opacity-[0.38]'
          )}
          style={fieldRingVars(invalid)}
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
            className={cn(
              'min-w-0 flex-1 bg-transparent text-base text-on-surface',
              'placeholder:text-muted-text'
            )}
            {...rest}
          />
          <button
            type="button"
            data-xen-v4-inline-action=""
            aria-label={visible ? 'Hide password' : 'Show password'}
            aria-pressed={visible}
            disabled={disabled}
            onClick={() => setVisible((v) => !v)}
            className={cn(
              'flex h-[var(--xen-space-2xl)] shrink-0 items-center px-xs',
              'rounded-[var(--xen-radius-sm)] text-sm font-semibold',
              visible ? 'text-primary-text' : 'text-muted-text'
            )}
          >
            {visible ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>
    );
  }
);

import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from './cn';
import type { InputProps } from './Input';
import { transitionCss } from './internal/v4-motion';
import { FIELD_HALO_PERCENT } from './internal/field-v4';

export interface InputV4Props extends InputProps {
  /**
   * Field label, rendered above the input and wired to it by `id`.
   *
   * Optional and additive — every existing `Input` usage still type-checks —
   * and it brings the web twin to parity with the native one, which has
   * carried a `label` since v0.
   */
  label?: string;
  /**
   * What went wrong and how to fix it.
   *
   * A red border says "wrong"; only a message says what to do about it
   * (`design.md` §38), and the kit cannot invent that copy for a field it
   * knows nothing about. Passing it also puts the field in the invalid state,
   * so the border and the message can never disagree.
   */
  error?: string;
  /** Class for the label/field/message wrapper (the native `containerStyle`). */
  containerClassName?: string;
}

/**
 * The focus ring cannot be a utility class: it is a translucent mix of a token
 * that changes with the field's validity, so it lives here as a `color-mix`
 * over a custom property — the same recipe `GlassPanel` and `Bento` use. Its
 * width is `--xen-space-xs`, so even the ring is on the spacing scale.
 */
const INPUT_V4_CSS = `
[data-xen-v4-input] {
  transition: ${transitionCss(['border-color', 'box-shadow'])};
}
[data-xen-v4-input]:focus {
  outline: none;
  border-color: var(--xen-v4-ring-color, var(--xen-ring));
  box-shadow: 0 0 0 var(--xen-space-xs) color-mix(in srgb, var(--xen-v4-ring-color, var(--xen-ring)) ${FIELD_HALO_PERCENT}%, transparent);
}
@media (prefers-reduced-motion: reduce) {
  [data-xen-v4-input] { transition: none; }
}
`;

/**
 * **V4 text input** — the web twin of the native `InputV4`, same props as
 * {@link Input} plus an optional `label` and `error`.
 *
 * Three things make it read as a considered control rather than a box:
 *
 * 1. **Height and softness.** A `2xl` minimum height and the `md` radius
 *    instead of `sm`. Both come off the scales, so a `sharp` seed still gets
 *    square corners and nothing is picked here.
 * 2. **A real focus ring.** Focus paints a translucent brand halo around the
 *    field rather than swapping the border colour — the difference between a
 *    control that responds and one that merely changes. It is drawn with
 *    `box-shadow`, so it costs no layout and focusing never nudges the page
 *    (§36.11), and it is dropped to a plain colour change under
 *    `prefers-reduced-motion` (§36.10).
 * 3. **An error state that says something.** `invalid` turns the field and its
 *    ring to `danger`; `error` adds the message underneath and points
 *    `aria-describedby` at it, so a screen reader gets the recovery copy and
 *    not just "invalid".
 *
 * No gradient, no glass, no shadow. A form field is not a hero, and depth on
 * an input is depth spent where §35.11 and §8 say it should not be.
 */
export const InputV4 = React.forwardRef<HTMLInputElement, InputV4Props>(function InputV4(
  { className, containerClassName, invalid = false, error, label, id, style, ...rest },
  ref
) {
  injectStyleOnce('xen-v4-input-styles', INPUT_V4_CSS);
  const reactId = React.useId();
  const inputId = id ?? `${reactId}-input`;
  const errorId = `${reactId}-error`;

  // An error message IS an invalid state; one variable is how the border and
  // the copy stay in agreement.
  const isInvalid = invalid || error !== undefined;

  return (
    <div className={cn('grid gap-sm', containerClassName)}>
      {label !== undefined ? (
        <label htmlFor={inputId} className="text-sm font-medium text-on-surface">
          {label}
        </label>
      ) : null}
      <input
        ref={ref}
        id={inputId}
        data-xen-v4-input=""
        aria-invalid={isInvalid || undefined}
        aria-describedby={error !== undefined ? errorId : undefined}
        className={cn(
          'w-full bg-surface text-on-surface placeholder:text-muted-text',
          'min-h-[var(--xen-space-2xl)] px-md py-sm text-base',
          'border rounded-[var(--xen-radius-md)]',
          isInvalid ? 'border-danger' : 'border-border',
          'disabled:pointer-events-none disabled:opacity-[0.38]',
          className
        )}
        style={
          {
            '--xen-v4-ring-color': isInvalid ? 'var(--xen-danger)' : 'var(--xen-ring)',
            ...style,
          } as React.CSSProperties
        }
        {...rest}
      />
      {error !== undefined ? (
        <p id={errorId} role="alert" className="text-sm text-danger-text">
          {error}
        </p>
      ) : null}
    </div>
  );
});

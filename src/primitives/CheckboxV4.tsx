import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from './cn';
import { FIELD_MOTION, FIELD_V4_CSS, FIELD_V4_STYLE_ID, fieldRingVars } from './internal/field-v4';
import type { CheckboxProps } from './Checkbox';
import { transitionCss } from './internal/v4-motion';

export type { CheckboxProps as CheckboxV4Props };

/**
 * The tick, as a mask rather than a glyph.
 *
 * A `content: '✓'` tick is whatever the user's font decides it is — a
 * different weight, a different optical centre, and a different shape on every
 * platform, which is exactly the inconsistency a kit exists to remove. The mask
 * is a path, so the stroke weight is ours; and because a mask reads only alpha,
 * the fill colour is still `var(--xen-v4-mark-color)` and no literal colour
 * enters the file. `stroke='currentColor'` in the data URI is inert for the
 * same reason — a mask does not care what colour the shape is.
 */
const TICK =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 6 9 17l-5-5'/%3E%3C/svg%3E\")";

const CHECKBOX_V4_CSS = `
[data-xen-v4-checkbox] {
  appearance: none;
  -webkit-appearance: none;
  position: relative;
  cursor: pointer;
}
[data-xen-v4-checkbox]:checked {
  background-color: var(--xen-v4-fill-color, var(--xen-primary));
  border-color: var(--xen-v4-fill-color, var(--xen-primary));
}
[data-xen-v4-checkbox]::after {
  content: '';
  position: absolute;
  inset: 0;
  background-color: var(--xen-v4-mark-color, var(--xen-on-primary));
  -webkit-mask: ${TICK} center / 68% no-repeat;
  mask: ${TICK} center / 68% no-repeat;
  opacity: 0;
  transform: scale(0.7);
  transition: ${transitionCss(['opacity', 'transform'], FIELD_MOTION)};
}
[data-xen-v4-checkbox]:checked::after {
  opacity: 1;
  transform: none;
}
@media (prefers-reduced-motion: reduce) {
  [data-xen-v4-checkbox]::after { transition: none; }
}
`;

/**
 * **V4 checkbox** — the same props as {@link Checkbox}, a different design line.
 *
 * It is still a real `<input type="checkbox">`, so it keeps form submission,
 * `:checked`, keyboard activation and the accessibility tree for free; what
 * changes is everything the browser would otherwise decide for us:
 *
 * 1. **A mark we drew.** `accent-color` hands the tick's shape and weight to
 *    the platform, which is why the base checkbox looks like three different
 *    controls on three operating systems. V4 turns the appearance off and
 *    masks a path in `--xen-on-primary` over a `--xen-primary` fill, so the
 *    tick matches the rest of the kit everywhere.
 * 2. **A real focus ring.** The same translucent brand halo `InputV4` paints,
 *    from the same shared sheet, drawn with `box-shadow` so arming it costs no
 *    layout (§36.11). The base's `focus:ring-1` was a hairline that read as a
 *    second border.
 * 3. **A fill that crosses rather than cuts.** The tick fades and scales up in
 *    {@link FIELD_MOTION}ms — §36.1 names "a checkbox smoothly changes to
 *    completed state" as functional motion — and the transition is dropped
 *    entirely under `prefers-reduced-motion` (§36.10), leaving the state
 *    instant but never absent.
 *
 * `invalid` retints the ring, the border and the fill to `danger` from one
 * flag, so the border and the halo can never disagree. The recovery copy is
 * deliberately not here: a primitive cannot invent the sentence that tells
 * someone what to fix (§38), so the message belongs to the `Field` that wraps
 * this control and owns the label too.
 *
 * No gradient, no glass, no shadow — §16 asks that forms stay minimal, and a
 * checkbox is the smallest thing on the page to spend depth on.
 */
export const CheckboxV4 = React.forwardRef<HTMLInputElement, CheckboxProps>(function CheckboxV4(
  { className, invalid = false, style, ...rest },
  ref
) {
  injectStyleOnce(FIELD_V4_STYLE_ID, FIELD_V4_CSS);
  injectStyleOnce('xen-v4-checkbox-styles', CHECKBOX_V4_CSS);

  return (
    <input
      ref={ref}
      type="checkbox"
      data-xen-v4-checkbox=""
      data-xen-v4-field=""
      aria-invalid={invalid || undefined}
      className={cn(
        'h-[var(--xen-space-lg)] w-[var(--xen-space-lg)] shrink-0',
        'rounded-[var(--xen-radius-sm)] border bg-surface',
        invalid ? 'border-danger' : 'border-border',
        'disabled:pointer-events-none disabled:opacity-[0.38]',
        className
      )}
      style={
        {
          ...fieldRingVars(invalid),
          '--xen-v4-mark-color': invalid ? 'var(--xen-on-danger)' : 'var(--xen-on-primary)',
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    />
  );
});

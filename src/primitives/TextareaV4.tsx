import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from './cn';
import {
  FIELD_V4_CSS,
  FIELD_V4_STYLE_ID,
  fieldBorderClass,
  fieldRingVars,
} from './internal/field-v4';
import type { TextareaProps } from './Textarea';

export type { TextareaProps as TextareaV4Props };

/**
 * **V4 multi-line field** — the same props as {@link Textarea}, a different
 * design line.
 *
 * A textarea is the one form control whose job is reading, not just entry, so
 * the changes split between the two:
 *
 * 1. **It matches the fields around it.** `--xen-radius-md` and `px-md` from
 *    the shared field language, and a minimum height of one full control
 *    height, so a small textarea is never shorter than the `InputV4` above it
 *    in a form (§13). The base's `radius.sm` box was visibly a different
 *    component.
 * 2. **It is set to be read.** `leading-relaxed` rather than the browser's
 *    default, which is most of what separates prose from a wall (§10). `rows`
 *    still drives the height, so the caller decides how much of the answer is
 *    visible before scrolling.
 * 3. **It resizes down one axis only.** The base allows `resize-y`, and V4
 *    keeps exactly that: dragging a field wider than the form it sits in breaks
 *    the column everything else is aligned to (§9, spacing as structure), while
 *    dragging it taller is the user telling you their answer is longer than you
 *    guessed.
 *
 * Focus is the shared brand halo `InputV4` paints, drawn with `box-shadow` so
 * arming it costs no layout (§36.11), and dropped to a plain colour change
 * under `prefers-reduced-motion` (§36.10). `invalid` turns the border and the
 * ring `danger` from one flag, so they can never disagree; the recovery copy
 * belongs to the `Field` that wraps this control, because a primitive cannot
 * invent the sentence that says what to fix (§38).
 *
 * No gradient, no glass, no shadow — §16 asks that forms stay minimal, and a
 * box someone is writing in is the last place to spend depth.
 */
export const TextareaV4 = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function TextareaV4({ className, invalid = false, rows = 4, style, ...rest }, ref) {
    injectStyleOnce(FIELD_V4_STYLE_ID, FIELD_V4_CSS);

    return (
      <textarea
        ref={ref}
        rows={rows}
        data-xen-v4-field=""
        aria-invalid={invalid || undefined}
        className={cn(
          'w-full resize-y bg-surface text-on-surface placeholder:text-muted-text',
          'min-h-[var(--xen-space-2xl)] px-md py-sm text-base leading-relaxed',
          'border rounded-[var(--xen-radius-md)]',
          fieldBorderClass(invalid),
          'disabled:pointer-events-none disabled:opacity-[0.38]',
          className
        )}
        style={{ ...fieldRingVars(invalid), ...style }}
        {...rest}
      />
    );
  }
);

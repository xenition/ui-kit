import * as React from 'react';
import type { TextareaProps } from './Textarea';
export type { TextareaProps as TextareaV4Props };
/**
 * **V4 multi-line field** — the same props as {@link Textarea}, a different
 * design line.
 *
 * A textarea is the one form control whose job is reading, not just entry, so
 * the changes split between the two:
 *
 * 1. **It matches the fields around it.** `md` radius and `md` horizontal
 *    padding from the shared `fieldMetrics`, and a minimum height of at least
 *    one full control height, so a one-row textarea is never shorter than the
 *    `InputV4` above it in a form (§13). The base's `radius.sm` box was
 *    visibly a different component.
 * 2. **It is set to be read.** Lines at 1.5× rather than 1.4×, which is most of
 *    what separates prose from a wall (§10). `rows` still drives the height,
 *    so the caller decides how much of the answer is visible before scrolling.
 * 3. **A real focus ring.** The same brand halo `InputV4` paints, with its
 *    space reserved whether or not it is showing, so focusing never nudges the
 *    label above it or the field below (§36.11).
 *
 * `invalid` turns the border and the ring `danger` from one flag, so they can
 * never disagree; the recovery copy belongs to the `Field` that wraps this
 * control, because a primitive cannot invent the sentence that says what to fix
 * (§38).
 *
 * No gradient, no glass, no shadow — §16 asks that forms stay minimal, and a
 * box someone is writing in is the last place to spend depth.
 */
export declare function TextareaV4({ invalid, label, rows, containerStyle, style, editable, onFocus, onBlur, ...rest }: TextareaProps): React.ReactElement;
//# sourceMappingURL=TextareaV4.d.ts.map
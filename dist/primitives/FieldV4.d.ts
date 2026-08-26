import * as React from 'react';
import type { FieldProps } from './Field';
export type { FieldProps as FieldV4Props };
/**
 * **V4 field** — the web twin of the native `FieldV4`, same props as
 * {@link Field}, a different design line.
 *
 * A field is three things stacked in a column, which makes it look like the
 * least interesting component in the kit and hides the fact that it is the one
 * carrying a form's entire error story.
 *
 * 1. **The message reaches the control.** The base field rendered its error in
 *    a sibling `<p>` and left it there: no `aria-describedby`, no
 *    `aria-invalid`, so a screen-reader user landing on the input heard the
 *    label and nothing about what was wrong with it, and the field did not
 *    report itself as invalid at all. V4 gives the message a real id and wires
 *    the control to it. It only fills in what the caller left blank — an
 *    explicit `aria-describedby` or `aria-invalid` on the child is theirs and
 *    wins (§23 — preserve unrelated work).
 * 2. **An error is not only red.** A red line under a field is invisible to a
 *    red-green viewer and to anyone reading in bright sun. V4 leads the error
 *    with the kit's `error` glyph, so the state has a shape as well as a hue
 *    (§46) — and `role="alert"` still announces it when it appears.
 * 3. **Both messages are measured.** The error took `text-danger`, the FILL
 *    slot, whose guarantee is about `on-danger` and not about itself as ink;
 *    the hint took `text-muted-text`, which is `neutral[600]` with no promise
 *    either. The error moves to `text-danger-text`, and the hint is computed
 *    per scheme with `ensureContrast`. Helper text is the smallest thing on a
 *    form and the first thing an unmeasured colour makes unreadable.
 *
 * The gap is `spacing.xs` on both twins — the web field was on Tailwind's
 * `gap-1.5` (6px) against native's 4px, so the same field was two different
 * heights. No card, no fill, no gradient: §10 and §11 both say a label, a
 * control and a line of helper text are a group because of spacing, not
 * because of a container.
 */
export declare const FieldV4: React.ForwardRefExoticComponent<FieldProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=FieldV4.d.ts.map
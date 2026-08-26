import * as React from 'react';
import type { FieldProps } from './Field';
export type { FieldProps as FieldV4Props };
/**
 * **V4 field** — same props as {@link Field}, a different design line.
 *
 * A field is three things stacked in a column, which makes it look like the
 * least interesting component in the kit and hides the fact that it is the one
 * carrying a form's entire error story.
 *
 * 1. **The message reaches the control.** The base field rendered its error in
 *    a sibling `Text` and left it there: nothing tied the message to the input,
 *    so a screen-reader user landing on the field heard the label and nothing
 *    about what was wrong with it. V4 hands the message down to the control as
 *    `accessibilityHint`, which is how React Native says "here is the extra
 *    thing you need to know about this input". It only fills in what the caller
 *    left blank — a hint already set on the control is theirs and wins (§23 —
 *    preserve unrelated work).
 * 2. **An error is not only red.** A red line under a field is invisible to a
 *    red-green viewer and to anyone reading in bright sun. V4 leads the error
 *    with the kit's `error` glyph, so the state has a shape as well as a hue
 *    (§46) — and `role="alert"` still announces it when it appears.
 * 3. **Both messages are measured.** The error took `dangerText`, which is
 *    right; the hint took `muted`, which is `neutral[600]` with no contrast
 *    promise against `surface` at all. Both are now run through
 *    `ensureContrast`. Helper text is the smallest thing on a form and the
 *    first thing an unmeasured colour makes unreadable.
 *
 * The gap comes from `spacing.xs` on both twins — the web field was on
 * Tailwind's `gap-1.5` (6px) against native's 4px, so the same field was two
 * different heights. No card, no fill, no gradient: §10 and §11 both say a
 * label, a control and a line of helper text are a group because of spacing,
 * not because of a container.
 */
export declare function FieldV4({ label, required, error, hint, style, children, ...rest }: FieldProps): React.ReactElement;
//# sourceMappingURL=FieldV4.d.ts.map
import * as React from 'react';
import type { RadioGroupProps, RadioOption } from './RadioGroup';
export type { RadioGroupProps as RadioGroupV4Props, RadioOption };
/**
 * **V4 radio group** — the same props as {@link RadioGroup}, a different
 * design line.
 *
 * Three changes, all of them about the hand rather than the eye:
 *
 * 1. **The row is the target.** Each option is `2xl` tall — the height every
 *    other V4 control takes — and the whole row responds, label included. The
 *    base made you hit a 20pt circle; this makes the choice as big as the
 *    choice is.
 * 2. **The label is read at reading size.** `base`, not `sm`. A radio label is
 *    the sentence someone is deciding between, not a caption on a control
 *    (§10, typography before containers).
 * 3. **The mark arrives.** The inner dot is always mounted and scales up from
 *    nothing in {@link FIELD_MOTION}ms, so the selection moves between options
 *    instead of blinking between them (§36.1). A brand halo lights in the space
 *    the ring already reserves while a row is held, so pressing never shifts
 *    the layout under the finger (§36.11). Both are skipped under Reduce
 *    Motion, where the selection is simply already there (§36.10).
 *
 * §8 bans excessive pill-shaped controls; a radio is round because a radio has
 * always been round, and the shape comes from `radius.full` — so a `sharp`
 * seed still gets the square marks it asked for rather than a capsule the kit
 * insisted on.
 *
 * No gradient, no glass, no shadow: §16 asks that forms stay minimal, and the
 * only thing a list of choices needs is to be easy to read and easy to hit.
 */
export declare function RadioGroupV4({ options, value, onValueChange, onChange, orientation, style, }: RadioGroupProps): React.ReactElement;
//# sourceMappingURL=RadioGroupV4.d.ts.map
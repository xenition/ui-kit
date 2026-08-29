import * as React from 'react';
import type { RadioGroupProps, RadioOption } from './RadioGroup';
export type { RadioGroupProps as RadioGroupV4Props, RadioOption };
/**
 * **V4 radio group** — the same props as {@link RadioGroup}, a different
 * design line.
 *
 * Each option is still a real `<input type="radio">` inside its `<label>`, so
 * arrow-key navigation within the group, form submission by `name`, and the
 * accessibility tree all come from the platform. Three things change:
 *
 * 1. **The row is the target.** Every option is `2xl` tall — the height every
 *    other V4 control takes — and the label is part of the hit area. The base
 *    made you hit a 16px circle; this makes the choice as big as the choice is.
 * 2. **The label is read at reading size.** `text-base`, not `text-sm`. A
 *    radio label is the sentence someone is deciding between, not a caption on
 *    a control (§10, typography before containers).
 * 3. **The mark arrives.** `accent-color` gives the platform's dot, drawn its
 *    way and switched instantly. V4 turns the appearance off and scales its own
 *    dot up from nothing in {@link FIELD_MOTION}ms, so the selection travels
 *    between options rather than blinking between them (§36.1) — and it takes
 *    the same shared focus ring `InputV4` paints, drawn with `box-shadow` so
 *    arming it costs no layout (§36.11). Under `prefers-reduced-motion` the
 *    transition is dropped and the dot is simply already there (§36.10).
 *
 * §8 bans excessive pill-shaped controls; a radio is round because a radio has
 * always been round, and the roundness is `--xen-radius-full` — so a `sharp`
 * seed still gets the square marks it asked for rather than a capsule the kit
 * insisted on.
 *
 * No gradient, no glass, no shadow: §16 asks that forms stay minimal, and the
 * only thing a list of choices needs is to be easy to read and easy to hit.
 */
export declare function RadioGroupV4({ options, value, onChange, name, orientation, className, }: RadioGroupProps): React.ReactElement;
//# sourceMappingURL=RadioGroupV4.d.ts.map
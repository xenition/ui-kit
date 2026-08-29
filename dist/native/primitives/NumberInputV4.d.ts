import * as React from 'react';
import type { NumberInputProps } from './NumberInput';
export type { NumberInputProps as NumberInputV4Props };
/**
 * **V4 number input** — the same props as {@link NumberInput}, a different
 * design line.
 *
 * A stepper is the control people miss most often, because the base makes both
 * of its buttons 40pt inside a 34pt row and puts them either side of a value
 * that shifts as it grows. V4 fixes all three:
 *
 * 1. **Square targets at the control's own height.** Each stepper is
 *    `2xl × 2xl` — the same `2xl` `InputV4` is tall, so the whole control
 *    matches the field above it in a form and each button clears 44pt on its
 *    own (§30, mobile is not compressed desktop).
 * 2. **A value that does not move.** The number is centred, given a minimum
 *    width off the spacing scale, and set in tabular figures, so 9 → 10 → 100
 *    does not shuffle the steppers under the finger while someone is holding
 *    one down (§36.11 — do not move a control out from under the finger).
 * 3. **A focus ring on the whole control.** Focusing the number lights the
 *    same brand halo `InputV4` paints, around the entire stepper rather than
 *    the text box inside it, because the control is the thing that has focus.
 *    Its space is reserved either way, so nothing shifts (§36.11).
 *
 * A stepper at its limit is dimmed **and** disabled, so the state is in the
 * interaction and not only in the colour (§46). No gradient, no glass, no
 * shadow: §16 asks that forms stay minimal.
 */
export declare function NumberInputV4({ value, onValueChange, onChange, min, max, step, disabled, style, }: NumberInputProps): React.ReactElement;
//# sourceMappingURL=NumberInputV4.d.ts.map
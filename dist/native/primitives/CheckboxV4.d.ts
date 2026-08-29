import * as React from 'react';
import type { CheckboxProps } from './Checkbox';
export type { CheckboxProps as CheckboxV4Props };
/**
 * **V4 checkbox** — the same props as {@link Checkbox}, a different design line.
 *
 * Three things separate it from a 20pt square that changes colour:
 *
 * 1. **A target you can actually hit.** The box itself stays small — a
 *    checkbox that grows to a button is a checkbox nobody recognises (§31,
 *    use familiar interactions) — but its `hitSlop` opens the touch area out
 *    to the same `2xl` every other V4 control is tall. The visible mark and
 *    the thing you press are allowed to be different sizes; only one of them
 *    has to clear 44pt.
 * 2. **A fill that crosses rather than cuts.** Checking it fades a
 *    `colors.primary` layer up behind the tick instead of swapping a
 *    background, so the state change is legible as a change — §36.1 names "a
 *    checkbox smoothly changes to completed state" as functional motion. It
 *    runs on the native driver in {@link FIELD_MOTION}ms, and under Reduce
 *    Motion it lands on the final value on the first frame (§36.10): the tick
 *    is never information you have to wait for.
 * 3. **Press feedback that respects the reader.** `usePressScale` is
 *    reduced-motion aware by construction, and a brand halo lights up in the
 *    space the focus ring already reserves — so pressing never moves the
 *    control out from under the finger (§36.11).
 *
 * `invalid` answers in `danger` on the border, exactly as `InputV4` does. The
 * recovery copy is deliberately not here: a primitive cannot invent the
 * sentence that tells someone what to fix (§38), so the message belongs to the
 * `Field` that wraps this control and owns the label too.
 *
 * No gradient, no glass, no shadow — §16 asks that forms stay minimal, and a
 * checkbox is the smallest thing on the page to spend depth on.
 */
export declare function CheckboxV4({ checked, onCheckedChange, invalid, disabled, accessibilityLabel, style, }: CheckboxProps): React.ReactElement;
//# sourceMappingURL=CheckboxV4.d.ts.map
import * as React from 'react';
import type { InputProps } from './Input';
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
export declare const InputV4: React.ForwardRefExoticComponent<InputV4Props & React.RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=InputV4.d.ts.map
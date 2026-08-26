import * as React from 'react';
import type { InputProps } from './Input';
export interface InputV4Props extends InputProps {
    /**
     * What went wrong and how to fix it.
     *
     * Optional and additive — every existing `Input` usage still type-checks —
     * but it is the half of an error state that actually helps. A red border
     * says "wrong"; only a message says what to do about it (`design.md` §38),
     * and the kit cannot invent that copy for a field it knows nothing about.
     * Passing it also puts the field in the invalid state, so the border and the
     * message can never disagree.
     */
    error?: string;
}
/**
 * **V4 text input** — same props as {@link Input} plus an optional `error`
 * message, a different design line.
 *
 * Three things make it read as a considered control rather than a box:
 *
 * 1. **Height and softness.** A `2xl` minimum height (a comfortable target for
 *    a thumb, and room for the text to breathe) and the `md` radius instead of
 *    `sm`. Both come off the scales, so a `sharp` seed still gets square
 *    corners and nothing is picked here.
 * 2. **A real focus ring.** Focus paints a translucent brand halo AROUND the
 *    field, not just a different border colour — the difference between a
 *    control that responds and one that merely changes. The halo's space is
 *    reserved whether or not it is showing, so focusing a field never nudges
 *    the layout (§36.11 — do not move controls out from under the finger).
 *    The colour is `colors.primary`, which the provider has resolved for the
 *    active scheme; `ramps.primary[400]` would be a near-white halo on a dark
 *    page, because the ramps keep the light orientation in both schemes.
 * 3. **An error state that says something.** `invalid` turns the field and its
 *    ring to `danger`; `error` adds the message underneath, announced politely
 *    to a screen reader.
 *
 * No gradient, no glass, no shadow. A form field is not a hero, and depth on
 * an input is depth spent where §35.11 and §8 say it should not be — which is
 * why nothing here consumes `gradient` or `elevation` at all.
 */
export declare function InputV4({ invalid, error, label, containerStyle, style, editable, onFocus, onBlur, ...rest }: InputV4Props): React.ReactElement;
//# sourceMappingURL=InputV4.d.ts.map
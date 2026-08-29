import * as React from 'react';
import type { CheckboxProps } from './Checkbox';
export type { CheckboxProps as CheckboxV4Props };
/**
 * **V4 checkbox** — the same props as {@link Checkbox}, a different design line.
 *
 * It is still a real `<input type="checkbox">`, so it keeps form submission,
 * `:checked`, keyboard activation and the accessibility tree for free; what
 * changes is everything the browser would otherwise decide for us:
 *
 * 1. **A mark we drew.** `accent-color` hands the tick's shape and weight to
 *    the platform, which is why the base checkbox looks like three different
 *    controls on three operating systems. V4 turns the appearance off and
 *    masks a path in `--xen-on-primary` over a `--xen-primary` fill, so the
 *    tick matches the rest of the kit everywhere.
 * 2. **A real focus ring.** The same translucent brand halo `InputV4` paints,
 *    from the same shared sheet, drawn with `box-shadow` so arming it costs no
 *    layout (§36.11). The base's `focus:ring-1` was a hairline that read as a
 *    second border.
 * 3. **A fill that crosses rather than cuts.** The tick fades and scales up in
 *    {@link FIELD_MOTION}ms — §36.1 names "a checkbox smoothly changes to
 *    completed state" as functional motion — and the transition is dropped
 *    entirely under `prefers-reduced-motion` (§36.10), leaving the state
 *    instant but never absent.
 *
 * `invalid` retints the ring, the border and the fill to `danger` from one
 * flag, so the border and the halo can never disagree. The recovery copy is
 * deliberately not here: a primitive cannot invent the sentence that tells
 * someone what to fix (§38), so the message belongs to the `Field` that wraps
 * this control and owns the label too.
 *
 * No gradient, no glass, no shadow — §16 asks that forms stay minimal, and a
 * checkbox is the smallest thing on the page to spend depth on.
 */
export declare const CheckboxV4: React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=CheckboxV4.d.ts.map
import * as React from 'react';
import type { IcebreakerChipProps } from './IcebreakerChip';
/** Same props as {@link IcebreakerChip}; V4 adds none. */
export type IcebreakerChipV4Props = IcebreakerChipProps;
/**
 * **V4 icebreaker chip** — the web twin of the native `IcebreakerChipV4`, same
 * props as {@link IcebreakerChip}.
 *
 * ## Four changes
 *
 * 1. **Both sizes are hittable.** `sm` came out around 22px tall and `md`
 *    around 30 — and `ProfileCard` renders *every* interest chip at `sm`, so a
 *    profile was a field of 22px targets. Both now clear 44.
 * 2. **`solid` is actually solid, and the same solid on both twins.** Web drew
 *    `bg-primary-100 text-primary` under that name — a ramp step wearing the
 *    solid label, and a different chip from its native twin. `soft` is an
 *    opaque `color-mix` into `surface` rather than a `-50` ramp step, so it
 *    keeps its colour on a card, on the page and over a photo.
 * 3. **Brand ink is the contrast-corrected slot.** `text-primary` is a *fill*
 *    with no contrast promise; on a 12% tint of itself it is the one place the
 *    promise actually matters. It becomes `text-primary-text`.
 * 4. **Selected is a mark, not just a colour.** `aria-pressed` always said so;
 *    nothing visible did, and a selected `solid` chip and an unselected one
 *    were the same disc. A check leads the label when the chip is chosen.
 *
 * Press and hover are the shared state layer — the base faded the chip's own
 * content with `hover:opacity-90`, which is the signal M3 spends on *disabled*.
 */
export declare const IcebreakerChipV4: React.ForwardRefExoticComponent<IcebreakerChipProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=IcebreakerChipV4.d.ts.map
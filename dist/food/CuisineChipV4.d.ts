import * as React from 'react';
import type { CuisineChipProps } from './CuisineChip';
export interface CuisineChipV4Props extends CuisineChipProps {
    /**
     * The chip's state before anything is tapped, when it runs **uncontrolled**
     * — that is, when `selected` is not passed at all. Default `false`, which is
     * what the base rendered; the difference is that it can now change.
     */
    defaultSelected?: boolean;
}
/**
 * **V4 cuisine chip** — the web twin of the native `CuisineChipV4`, same props
 * as {@link CuisineChip} plus `defaultSelected`.
 *
 * ## Four changes
 *
 * 1. **A filter that can actually be turned on.** The chip held no state and
 *    `selected` defaulted to `false`, so an uncontrolled `CuisineChip` was a
 *    permanently unselected filter: it emitted on every tap and never moved.
 *    Passing `selected` still hands control to the caller; omitting it now
 *    means the chip owns its state, seeded from `defaultSelected`.
 * 2. **It clears 44.** `py-1` around a 12px label is about 24px — a third of
 *    a target on a control that exists to be tapped, and a horizontal strip of
 *    them is the hardest thing on a menu screen to hit.
 * 3. **Press is a state layer, disabled is 0.38.** `hover:bg-neutral-100` is a
 *    light-oriented ramp step that paints a near-white slab on a dark page,
 *    and `opacity-50` was a round number where M3 spends 0.38.
 * 4. **Focus rings on the `ring` token**, not `primary-300` — a ramp step
 *    inverts with the scheme, while `--xen-ring` is `primary` already
 *    corrected to 3:1 against the page.
 */
export declare const CuisineChipV4: React.ForwardRefExoticComponent<CuisineChipV4Props & React.RefAttributes<HTMLButtonElement | HTMLSpanElement>>;
//# sourceMappingURL=CuisineChipV4.d.ts.map
import * as React from 'react';
import type { DealCardProps } from './DealCard';
export interface DealCardV4Props extends DealCardProps {
    /** The word in front of the probability figure. Default `'Probability'`. */
    probabilityLabel?: string;
    /** Announced while the skeleton is up. Default `'Loading deal'`. */
    loadingLabel?: string;
}
/**
 * **V4 deal card** — the web twin of the native `DealCardV4`, same props as
 * {@link DealCard} plus `probabilityLabel` and `loadingLabel`.
 *
 * ## Six changes
 *
 * 1. **The probability meter has a name.** Both twins gave it `aria-valuenow`
 *    and nothing else, with the visible word "Probability" sitting in a
 *    detached sibling — so the meter announced a bare number with no idea what
 *    it was measuring. It is named now, and on an interactive card the figure
 *    also joins the card's own name, because a `button`'s label replaces
 *    everything under it.
 * 2. **One accessible name.** `Deal Acme` replaced the subtree, so the value,
 *    the stage, the probability, the owner and the close date were all silent —
 *    every fact the card draws is in the name, comma-joined.
 * 3. **`compact` actually densifies.** `padding` reached `Card` on native only,
 *    so the web card dropped its meter and its meta row and kept the full `lg`
 *    inset — less information in the same space.
 * 4. **Money is tabular**, so a column of deal values lines up on the decimal
 *    instead of drifting with the digit widths.
 * 5. **The skeleton is the shared placeholder.** The base painted
 *    `bg-neutral-100` — a ramp step, so a pale plate on a dark page — and sized
 *    one block off a **type-scale** token, which is a font size, not a height.
 * 6. **A press is a state layer on a real button**, in place of a
 *    `role="button"` div with a hand-written Enter/Space handler.
 */
export declare const DealCardV4: React.ForwardRefExoticComponent<DealCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DealCardV4.d.ts.map
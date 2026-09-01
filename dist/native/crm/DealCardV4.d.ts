import * as React from 'react';
import type { DealCardProps } from './DealCard';
export interface DealCardV4Props extends DealCardProps {
    /** Name of the probability meter. Default `'Probability'`. */
    probabilityLabel?: string;
    /** Announced while the skeleton is up. Default `'Loading deal'`. */
    loadingLabel?: string;
}
/**
 * **V4 deal card** — same props as {@link DealCard} plus `probabilityLabel`
 * and `loadingLabel`.
 *
 * ## Six changes
 *
 * 1. **The probability meter has a name.** Both twins gave it
 *    `accessibilityRole="progressbar"` and a value with **no label**, leaving
 *    the visible word "Probability" as a detached sibling — so a reader heard
 *    "60 percent" of nothing. The word and the meter are now one control.
 * 2. **The card announces everything it shows** — deal, account, value, stage,
 *    probability, owner and close date. `Deal Acme, Acme Inc` replaced the
 *    whole subtree, so the money was silent (rule A).
 * 3. **Money and the percentage are tabular**, so a column of deal cards has
 *    its figures on one grid instead of jittering per digit.
 * 4. **The owner avatar is `sm` on both twins.** Native drew `xs`; the same
 *    card was two different densities per platform.
 * 5. **The skeleton is the shared opaque placeholder** rather than
 *    `colors.border`, and its bar heights come off the spacing scale — the
 *    base sized a box with a **type-scale** token, which is a font size.
 * 6. **`highlighted` is a ring, not a translucent wash.** A wash makes the
 *    card's ink pair depend on whatever is behind it; the card keeps
 *    `card`/`onCard` and gains a `primary` edge. Plus rules B and C.
 *
 * **Renders nothing without a `name`.**
 */
export declare function DealCardV4({ name, company, valueCents, currency, stage, probability, owner, closeDate, outcome, variant, loading, probabilityLabel, loadingLabel, onPress, testID, style, }: DealCardV4Props): React.ReactElement | null;
//# sourceMappingURL=DealCardV4.d.ts.map
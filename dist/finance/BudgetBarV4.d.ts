import * as React from 'react';
import type { BudgetBarProps } from './BudgetBar';
export interface BudgetBarV4Props extends BudgetBarProps {
    /** The word in front of an overspend. Default `'over'`. */
    overLabel?: string;
    /**
     * How the announced percentage is spelled. Default
     * `'<n>% of budget used'` — the base's own phrasing, now overridable and
     * carrying the **true** figure rather than the clamped one.
     */
    formatPercent?: (percent: number) => string;
}
/**
 * **V4 budget bar** — the web twin of the native `BudgetBarV4`, same props as
 * {@link BudgetBar} plus `overLabel` and `formatPercent`.
 *
 * ## Four changes
 *
 * 1. **The bar and its name stop disagreeing.** The base clamped the drawn
 *    fill and left the announced percentage uncapped, so a category at 300%
 *    spent reported `aria-valuenow="100"` beside a name reading "300% of
 *    budget used". Both numbers are real and they are not the same number:
 *    `meterParts()` hands the clamped ratio to the meter, and the true percent
 *    goes to `aria-valuetext`, which is what a reader actually says.
 * 2. **The overspend has a sign and a word.** `signDisplay="never"` on the
 *    remainder meant −$40.00 and +$40.00 rendered the identical string, and
 *    the only difference between "you have $40 left" and "you are $40 over"
 *    was the hue — invisible in greyscale and to a red-green viewer.
 * 3. **The remainder is legible.** It was `text-muted` — a ramp step with no
 *    contrast promise — used as an ink, on the one figure in the component a
 *    user is looking for.
 * 4. **The size override applies.** The base passed `size="sm"` *and*
 *    `className="text-xs font-semibold"` to `MoneyAmount`; `cn()` is a plain
 *    joiner, so both landed on the element and Tailwind's emit order restored
 *    the originals — while the native twin's style object applied, and the two
 *    twins drew the same figure at different sizes. The size comes from the
 *    prop, and nothing is passed that cannot win.
 */
export declare const BudgetBarV4: React.ForwardRefExoticComponent<BudgetBarV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=BudgetBarV4.d.ts.map
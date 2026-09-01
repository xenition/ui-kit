import * as React from 'react';
import type { BudgetBarProps } from './BudgetBar';
export interface BudgetBarV4Props extends BudgetBarProps {
    /** Caption beside the remaining figure once the budget is exceeded. Default `'over'`. */
    overLabel?: string;
    /** The meter's spoken figure. Default `'112% of budget used'`. */
    formatPercent?: (percent: number) => string;
}
/**
 * **V4 budget bar** — same props as {@link BudgetBar} plus `overLabel` and
 * `formatPercent`.
 *
 * ## Five changes
 *
 * 1. **The bar and its name agree.** The base clamped the *fill* and left the
 *    announced percentage uncapped, so at 300% spent one element drew a full
 *    bar while the name beside it said "300% of budget used" — and the meter
 *    was an `image`, so the number was never exposed as a value at all.
 *    `meterParts()` returns the clamped ratio for the meter and the true
 *    percent for the name, and the meter is a real `progressbar` carrying the
 *    clamped value.
 * 2. **Over-budget prints with a sign.** `signDisplay="never"` made −$12.00
 *    and +$12.00 the same string, leaving the tone as the only difference
 *    between "you have twelve dollars left" and "you are twelve dollars over"
 *    — invisible in greyscale.
 * 3. **The remaining balance is readable.** It is drawn through
 *    `MoneyAmount`'s `tone="muted"`, which meant `colors.muted`: a ramp step
 *    with no contrast promise, carrying a real balance.
 * 4. **The figure is sized by `size`, not by an override.** The base handed
 *    `MoneyAmount` a style object setting `fontSize` and `fontWeight` — which
 *    applies on native and is silently dropped on web, where `cn` is a joiner
 *    rather than a merger — so the same remaining balance rendered at two
 *    different sizes on the two platforms.
 * 5. **The bar's tone is genuinely status.** Budget health is one of the few
 *    places `success` / `warn` / `danger` are earned, and it ships with the
 *    percentage as a word so it never rests on hue.
 */
export declare function BudgetBarV4({ label, spentCents, limitCents, currency, formatMoney: format, overLabel, formatPercent, style, }: BudgetBarV4Props): React.ReactElement;
//# sourceMappingURL=BudgetBarV4.d.ts.map
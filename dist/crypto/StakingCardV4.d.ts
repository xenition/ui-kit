import * as React from 'react';
import type { StakingCardProps } from './StakingCard';
export interface StakingCardV4Props extends StakingCardProps {
    /** Caption over the yield figure. Default `'APY'`. */
    apyLabel?: string;
}
/**
 * **V4 staking card** — the web twin of the native `StakingCardV4`, same props
 * as {@link StakingCard} plus `apyLabel`.
 *
 * ## Four changes
 *
 * 1. **APY is printed without a change sign.** See {@link formatApy}: the base
 *    ran the yield through `formatPct`, so every position advertised a
 *    "+4.20%" that reads as a movement in the rate rather than the rate.
 * 2. **APY is not `success`.** It was coloured green unconditionally, and a
 *    yield is a level — the number is identical whether the position is up or
 *    down. Green here spends the gain slot on a constant, and leaves nothing
 *    to say when something actually gains.
 * 3. **The twins agree.** The staked figure took the `xl` step on the web and
 *    `lg` on the phone — it is the card's headline number, so both take `xl`.
 *    The card was `elevated` on the phone and `outlined` on the web. And Claim
 *    wore `tone="success"` on native only, a status colour spent on an action,
 *    which the line does not do. All three now match.
 * 4. **Ink is ink.** `text-muted` and `text-success` are fill slots; the
 *    captions, the rewards figure and the money now use the contrast-corrected
 *    `*Text` forms, and every stacked figure is tabular.
 */
export declare const StakingCardV4: React.ForwardRefExoticComponent<StakingCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=StakingCardV4.d.ts.map
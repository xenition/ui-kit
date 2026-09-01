import * as React from 'react';
import type { StakingCardProps } from './StakingCard';
export interface StakingCardV4Props extends StakingCardProps {
    /** Caption over the yield figure. Default `'APY'`. */
    apyLabel?: string;
}
/**
 * **V4 staking position** — same props as {@link StakingCard} plus `apyLabel`.
 *
 * ## Four changes
 *
 * 1. **APY is printed without a change sign.** `formatPct` prefixes `+` for
 *    every positive value, so a 4.2% yield rendered as **`+4.20%`** — which
 *    reads as a movement *in* the rate, not as the rate. An APY is a level.
 * 2. **APY is not `success`.** The base coloured it green unconditionally. A
 *    yield is not a gain; it is a number that happens to be positive, and
 *    spending the success slot on it means the one colour that should mean
 *    "this went well" is on screen whether or not anything did.
 * 3. **The two twins agree about the actions.** Native gave Claim
 *    `tone="success"` and web did not, so the same button was green on the
 *    phone and brand-coloured on the laptop; both now take the default
 *    primary. `disabled` is `!hasRewards || loading` for Claim and `loading`
 *    for Unstake, as the web twin already had it.
 * 4. **The figures are announced as figures.** "Staked, 12.5 ETH, $30,000" is
 *    one stop instead of three, and the fiat and token amounts are tabular so
 *    the two stacked columns line up.
 */
export declare function StakingCardV4({ symbol, name, stakedAmount, decimals, stakedValueCents, currency, apy, rewardsAmount, status, apyLabel, onClaim, onUnstake, loading, style, }: StakingCardV4Props): React.ReactElement | null;
//# sourceMappingURL=StakingCardV4.d.ts.map
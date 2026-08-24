import * as React from 'react';
/** Lifecycle state of a staking position. */
export type StakingStatus = 'active' | 'unbonding' | 'inactive';
export interface StakingCardProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Staked asset ticker (e.g. `ETH`, `ATOM`). */
    symbol: string;
    /** Asset long name (e.g. `Ethereum`). */
    name?: string;
    /** Amount currently staked, in token units. */
    stakedAmount: number;
    /** Fraction digits for token amounts (default `4`). */
    decimals?: number;
    /** Fiat value of the stake, in integer **cents**. */
    stakedValueCents?: number;
    /** ISO 4217 currency for fiat values (default `USD`). */
    currency?: string;
    /** Annual percentage yield (e.g. `4.2`). */
    apy?: number;
    /** Claimable rewards, in token units. */
    rewardsAmount?: number;
    /** Position lifecycle — shown as a glyph + labelled badge, not color-only. */
    status?: StakingStatus;
    /** Fires when the claim button is pressed (disabled when no rewards). */
    onClaim?: () => void;
    /** Fires when the unstake button is pressed. */
    onUnstake?: () => void;
    /** Loading state — disables the action buttons. */
    loading?: boolean;
}
/**
 * A staking position card: asset header with a status badge (glyph + label, so
 * state is not color-only), the staked amount + fiat value, a highlighted APY,
 * claimable rewards toned `success`, and Claim / Unstake actions. Claim is
 * disabled when there are no rewards. All token amounts are fixed-precision and
 * fiat is integer cents — no float drift. Web parity of the native
 * `StakingCard`.
 */
export declare const StakingCard: React.ForwardRefExoticComponent<StakingCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=StakingCard.d.ts.map
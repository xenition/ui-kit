import * as React from 'react';
import type { LoyaltyCardProps, LoyaltyTier } from './LoyaltyCard';
export interface LoyaltyCardV4Props extends LoyaltyCardProps {
    /** Override the tier names — four English words lived inside. */
    tierLabels?: Partial<Record<LoyaltyTier, string>>;
    /** Format the points figure. Default `'1,240 points'`. */
    formatPoints?: (points: number) => string;
    /** Build the to-next-tier line. Default `'260 to Gold'`. */
    formatRemaining?: (remaining: number, nextTier: string) => string;
    /** Shown when the member is at the top tier. Default `'Top tier'`. */
    topTierLabel?: string;
}
/**
 * **V4 loyalty card** — the web twin of the native `LoyaltyCardV4`, same props
 * as {@link LoyaltyCard} plus four copy hooks.
 *
 * ## Four changes
 *
 * 1. **The progress bar is `ProgressV4`.** The base drew its own track and
 *    fill, so the one meter on this card did not match the meters everywhere
 *    else and announced no value.
 * 2. **The points figure is tabular and formatted** — a loyalty balance is a
 *    number a member compares against a target.
 * 3. **The tier ink is contrast-corrected**, where the base put a fill slot on
 *    text, including `muted`, which promises nothing.
 * 4. **A top-tier member is told so** rather than silently getting a full bar.
 *
 * **Renders nothing without a `memberName`** (§4.5).
 */
export declare const LoyaltyCardV4: React.ForwardRefExoticComponent<LoyaltyCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LoyaltyCardV4.d.ts.map
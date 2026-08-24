import * as React from 'react';
export type LoyaltyTier = 'bronze' | 'silver' | 'gold' | 'platinum';
export interface LoyaltyCardProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Member name shown on the card. */
    memberName: string;
    /** Current points balance. */
    points: number;
    /** Membership tier; drives label, glyph, and accent. Falls back to `bronze`. */
    tier?: LoyaltyTier;
    /** Points required to reach the next tier. Enables the progress bar. */
    nextTierAt?: number;
    /** Name of the next tier (for the progress caption). */
    nextTierLabel?: string;
    /** Optional membership id / code shown under the name. */
    memberId?: string;
}
/**
 * A membership loyalty card: tier badge, member name/id, a large points balance,
 * and (when `nextTierAt` is set) a progress bar toward the next tier with a
 * remaining-points caption. `tier` drives the accent, glyph, and label — never
 * color alone. Progress is clamped and guards a zero/invalid target. Token-only
 * colors.
 */
export declare const LoyaltyCard: React.ForwardRefExoticComponent<LoyaltyCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LoyaltyCard.d.ts.map
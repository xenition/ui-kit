import * as React from 'react';
export interface LoyaltyCardProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Loyalty program name (e.g. "SkyMiles"). */
    program: string;
    /** Member's display name. */
    memberName: string;
    /** Membership tier label (e.g. "Gold"). */
    tier: string;
    /** Current miles / points balance (formatted with `toLocaleString()`). */
    points: number;
    /** Optional membership / account id shown in the card footer. */
    memberId?: string;
    /**
     * Points required to reach the next tier. When set (and above `points`), a
     * token-driven progress bar toward the next tier is shown.
     */
    nextTierPoints?: number;
    /** Word for the balance unit (default "points"). */
    unitLabel?: string;
}
/**
 * LoyaltyCard — a **V4** "journey" loyalty card (web parity of the native twin).
 * A miles / points membership card on the brand gradient: the program name and a
 * frosted tier chip up top, the balance (formatted via `toLocaleString()`) in
 * near-white ink, an optional token-driven progress bar toward the next tier, and
 * the member name / id as a frosted footer row. All colors from `--xen-*` token
 * classes and gradient utilities — no literals; dark-mode safe.
 */
export declare const LoyaltyCard: React.ForwardRefExoticComponent<LoyaltyCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LoyaltyCard.d.ts.map
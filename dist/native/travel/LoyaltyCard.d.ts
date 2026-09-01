import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface LoyaltyCardProps {
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
    style?: StyleProp<ViewStyle>;
}
/**
 * LoyaltyCard — a **V4** "journey" loyalty card. A miles / points membership card
 * on the brand gradient: the program name and a frosted tier chip up top, the
 * balance (formatted via `toLocaleString()`) in near-white ink, an optional
 * token-driven progress bar toward the next tier, and the member name / id as a
 * frosted footer row. Token-only colors via `useXenitionTheme()` and the
 * `journey*` helpers; dark-mode safe.
 */
export declare function LoyaltyCard({ program, memberName, tier, points, memberId, nextTierPoints, unitLabel, style, }: LoyaltyCardProps): React.ReactElement;
//# sourceMappingURL=LoyaltyCard.d.ts.map
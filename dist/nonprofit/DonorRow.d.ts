import * as React from 'react';
/** Recognition tier for a donor. */
export type DonorTier = 'bronze' | 'silver' | 'gold' | 'platinum';
export interface DonorRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** Donor name. */
    name: string;
    /** Avatar image URL (initials fallback otherwise). */
    avatarUrl?: string;
    /** Lifetime giving, integer **cents**. */
    totalCents: number;
    /** ISO 4217 currency (default `USD`). */
    currency?: string;
    /** Number of gifts made. */
    giftCount?: number;
    /** Recognition tier rendered as a badge. */
    tier?: DonorTier;
    /** Rank position shown as a leading number (e.g. leaderboard). */
    rank?: number;
    /** Mark this donor as anonymous (name is replaced with a generic label). */
    anonymous?: boolean;
    /** Fires when the row is clicked (mirrors native `onPress`). */
    onClick?: () => void;
}
/**
 * Web parity of the native `DonorRow`: a donor list / leaderboard row —
 * optional rank, avatar, name, an optional recognition-tier badge, lifetime
 * giving (integer cents → `formatMoney`), and a gift count. Anonymous donors
 * show a generic label and a placeholder avatar. When `onClick` is set the row
 * is a `role="button"` target with keyboard activation. All colors come from the
 * `--xen-*` token classes — no literal colors.
 */
export declare const DonorRow: React.ForwardRefExoticComponent<DonorRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DonorRow.d.ts.map
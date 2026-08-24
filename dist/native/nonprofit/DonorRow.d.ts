import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Recognition tier for a donor. */
export type DonorTier = 'bronze' | 'silver' | 'gold' | 'platinum';
export interface DonorRowProps {
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
    /** Fires when the row is pressed. */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A donor list / leaderboard row: optional rank, avatar, name, an optional
 * recognition-tier badge, lifetime giving (integer cents → `formatMoney`), and a
 * gift count. Anonymous donors show a generic label and a placeholder avatar.
 * The row is optionally pressable. All colors come from the compiled theme
 * tokens — no literal colors.
 */
export declare function DonorRow({ name, avatarUrl, totalCents, currency, giftCount, tier, rank, anonymous, onPress, style, }: DonorRowProps): React.ReactElement;
//# sourceMappingURL=DonorRow.d.ts.map
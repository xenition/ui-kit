import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Visual density of a {@link FundraiserCard}. */
export type FundraiserCardVariant = 'default' | 'compact' | 'featured';
export interface FundraiserCardProps {
    /** Fundraiser title. */
    title: string;
    /** Name of the person / team organizing. */
    organizerName: string;
    /** Organizer avatar URL (initials fallback otherwise). */
    organizerAvatarUrl?: string;
    /** Cover image URL; a token placeholder is drawn when absent. */
    imageUrl?: string;
    /** Alt text for the cover (defaults to the title). */
    imageAlt?: string;
    /** Amount raised so far, integer **cents**. */
    raisedCents: number;
    /** Goal, integer **cents** (divide-by-zero guarded downstream). */
    goalCents: number;
    /** ISO 4217 currency (default `USD`). */
    currency?: string;
    /** Donor count shown in the meta row. */
    donorCount?: number;
    /** Density / emphasis. `featured` enlarges the cover and title. */
    variant?: FundraiserCardVariant;
    /** Fires when the donate CTA is pressed. */
    onDonate?: () => void;
    /** Fires when the share action is pressed (rendered when provided). */
    onShare?: () => void;
    /** Show a skeleton placeholder instead of content. */
    loading?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * A peer-to-peer fundraiser card: organizer identity, an optional cover, the
 * title, a `CampaignProgress` meter (raised/goal in integer cents), and donate /
 * share actions. `variant` switches density; `compact` drops the cover. All
 * colors come from the compiled theme tokens — no literal colors.
 */
export declare function FundraiserCard({ title, organizerName, organizerAvatarUrl, imageUrl, imageAlt, raisedCents, goalCents, currency, donorCount, variant, onDonate, onShare, loading, style, }: FundraiserCardProps): React.ReactElement;
//# sourceMappingURL=FundraiserCard.d.ts.map
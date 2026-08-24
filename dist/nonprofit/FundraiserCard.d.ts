import * as React from 'react';
/** Visual density of a {@link FundraiserCard}. */
export type FundraiserCardVariant = 'default' | 'compact' | 'featured';
export interface FundraiserCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
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
    /** Fires when the donate CTA is clicked (mirrors native `onPress`). */
    onDonate?: () => void;
    /** Fires when the share action is clicked (rendered when provided). */
    onShare?: () => void;
    /** Show a skeleton placeholder instead of content. */
    loading?: boolean;
}
/**
 * Web parity of the native `FundraiserCard`: a peer-to-peer fundraiser card —
 * organizer identity, an optional cover, the title, a `CampaignProgress` meter
 * (raised/goal in integer cents), and donate / share actions. `variant` switches
 * density; `compact` drops the cover. All colors come from the `--xen-*` token
 * classes — no literal colors.
 */
export declare const FundraiserCard: React.ForwardRefExoticComponent<FundraiserCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=FundraiserCard.d.ts.map
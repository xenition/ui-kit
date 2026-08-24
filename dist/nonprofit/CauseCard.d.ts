import * as React from 'react';
/** Visual density of a {@link CauseCard}. */
export type CauseCardVariant = 'default' | 'compact' | 'featured';
export interface CauseCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'title'> {
    /** Cause / program name. */
    title: string;
    /** Short description of the cause. */
    description?: string;
    /** Cover image URL; a token-filled placeholder is drawn when absent. */
    imageUrl?: string;
    /** Alt text for the cover (defaults to the title). */
    imageAlt?: string;
    /** Category label rendered as a badge (e.g. `Education`). */
    category?: string;
    /** Amount raised so far, integer **cents** (enables the mini progress meter). */
    raisedCents?: number;
    /** Goal, integer **cents**. */
    goalCents?: number;
    /** ISO 4217 currency (default `USD`). */
    currency?: string;
    /** Density / emphasis. `featured` enlarges the cover and title. */
    variant?: CauseCardVariant;
    /** Click handler for the whole card (mirrors native `onPress`). */
    onClick?: () => void;
    /** Show a skeleton placeholder instead of content. */
    loading?: boolean;
}
/**
 * Web parity of the native `CauseCard`: a browse tile for a single cause /
 * program — cover (image or token placeholder), a category badge, title, blurb,
 * and an optional inline `CampaignProgress` meter when a goal is supplied.
 * `variant` switches between a full card, a `compact` cover-less row, and a
 * larger `featured` treatment. When `onClick` is set the whole card becomes a
 * `role="button"` target with keyboard (Enter / Space) activation. All colors
 * come from the `--xen-*` token classes — no literal colors.
 */
export declare const CauseCard: React.ForwardRefExoticComponent<CauseCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CauseCard.d.ts.map
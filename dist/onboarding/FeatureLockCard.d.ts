import * as React from 'react';
export type FeatureLockVariant = 'card' | 'inline';
export interface FeatureLockCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /** Name of the gated capability (e.g. `'Unlimited exports'`). */
    title: string;
    /** One-line description of what unlocking delivers. */
    description?: string;
    /** Lock glyph. Default `'🔒'`. */
    icon?: string;
    /** Ribbon copy on the badge. Default `'Pro'`. */
    planLabel?: string;
    /** Unlock CTA copy. Default `'Unlock'` — override with the outcome. */
    unlockLabel?: string;
    /** Fires on the unlock CTA. */
    onUnlock?: () => void;
    /** `'inline'` renders a compact borderless row. Default `'card'`. */
    variant?: FeatureLockVariant;
}
/**
 * Locked-feature teaser — shown where a free user hits a gated capability. It
 * names the feature, says what unlocking gets them and offers the upgrade CTA,
 * turning a dead end into a value pitch (paywall-after-value, design.md §27-28).
 * The `inline` variant collapses to a compact row for list contexts. Colors are
 * token-bound via the {@link Card}/{@link Badge} primitives. No literal colors.
 */
export declare const FeatureLockCard: React.ForwardRefExoticComponent<FeatureLockCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=FeatureLockCard.d.ts.map
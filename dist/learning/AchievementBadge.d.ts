import * as React from 'react';
/** Achievement tier — sets the ring tone. */
export type AchievementTier = 'bronze' | 'silver' | 'gold' | 'platinum';
export type AchievementBadgeSize = 'sm' | 'md' | 'lg';
export interface AchievementBadgeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /** Achievement title. */
    title: string;
    /** Icon / emoji shown in the medallion. */
    glyph?: string;
    /** Tier; sets the ring tone. */
    tier?: AchievementTier;
    /** Whether the achievement is unlocked; locked badges dim and show a 🔒. */
    unlocked?: boolean;
    /** Optional short description under the title. */
    description?: string;
    /** Size preset. */
    size?: AchievementBadgeSize;
    /** Hide the title/description labels (medallion only). */
    hideLabel?: boolean;
    /** Fires when the badge is clicked. */
    onSelect?: () => void;
}
/**
 * A gamification achievement badge: a tier-toned medallion with an icon, plus a
 * title / description. Locked achievements dim the medallion and overlay a lock
 * glyph (state is spoken, not color-only). Interactive badges are a
 * `role="button"` element with Enter/Space activation. Token-only colors
 * (`--xen-*`).
 */
export declare const AchievementBadge: React.ForwardRefExoticComponent<AchievementBadgeProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AchievementBadge.d.ts.map
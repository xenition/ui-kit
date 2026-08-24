import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Achievement tier — sets the ring tone. */
export type AchievementTier = 'bronze' | 'silver' | 'gold' | 'platinum';
export type AchievementBadgeSize = 'sm' | 'md' | 'lg';
export interface AchievementBadgeProps {
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
    /** Fires when the badge is pressed. */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A gamification achievement badge: a tier-toned medallion with an icon, plus a
 * title / description. Locked achievements dim the medallion and overlay a lock
 * glyph (state is spoken, not color-only). Token-only colors.
 */
export declare function AchievementBadge({ title, glyph, tier, unlocked, description, size, hideLabel, onPress, style, }: AchievementBadgeProps): React.ReactElement;
//# sourceMappingURL=AchievementBadge.d.ts.map
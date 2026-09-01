import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface AchievementBadgeProps {
    /** Achievement name. */
    title: string;
    /** A short line describing how it's earned. */
    description?: string;
    /** Glyph shown on the earned medallion. Default `'🏅'`. */
    glyph?: string;
    /** Whether the badge has been unlocked. */
    earned?: boolean;
    /** Progress toward earning (0–1); shown as a caption on the locked medallion. */
    progress?: number;
    style?: StyleProp<ViewStyle>;
}
/**
 * AchievementBadge — a medallion on a calm, clean surface card. When earned, the
 * medallion is a vivid brand gradient with the achievement glyph; when locked it
 * falls back to a muted neutral disc with a lock and an optional progress caption.
 * The earned/locked state is carried by the label and the glyph, not by color
 * alone. Color derives entirely from the ramp, so it adapts light + dark and
 * restyles from the seed — the reward gradient earns its saturation only once the
 * badge is unlocked.
 */
export declare function AchievementBadge({ title, description, glyph, earned, progress, style, }: AchievementBadgeProps): React.ReactElement;
//# sourceMappingURL=AchievementBadge.d.ts.map
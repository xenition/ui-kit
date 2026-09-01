import * as React from 'react';
export interface AchievementBadgeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
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
    className?: string;
}
/**
 * AchievementBadge (web parity) — a medallion on a calm, clean surface card. When
 * earned, the medallion is a vivid brand gradient with the achievement glyph
 * (`color="onPrimary"`); when locked it falls back to a muted `bg-neutral-100`
 * disc with a lock (`text-muted`) and an optional progress caption. The
 * earned/locked state is carried by the label and the glyph, not by color alone.
 * Token-only colors — the reward gradient earns its saturation only once the
 * badge is unlocked.
 */
export declare const AchievementBadge: React.ForwardRefExoticComponent<AchievementBadgeProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AchievementBadge.d.ts.map
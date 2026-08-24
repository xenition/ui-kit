import * as React from 'react';
import type { Achievement } from './types';
export type AchievementUnlockVariant = 'toast' | 'inline';
export interface AchievementUnlockProps {
    /** The achievement to celebrate. */
    achievement: Achievement;
    /**
     * - `toast`  — a compact banner for a transient unlock notification (default).
     * - `inline` — a larger centered card for a details / list surface.
     */
    variant?: AchievementUnlockVariant;
    /**
     * Whether it's unlocked. `false` renders a locked/greyed placeholder (a
     * padlock + "Locked"), so the same component covers both trophy states.
     */
    unlocked?: boolean;
    /** Overline above the title, e.g. `'Achievement unlocked'`. */
    label?: string;
    /** Called when the banner is clicked — open the achievement. */
    onClick?: (achievement: Achievement) => void;
    /** Extra classes on the root card. */
    className?: string;
}
/**
 * An achievement / trophy unlock surface — a glyph medallion, an overline, the
 * title + criteria, and a point value. Locked achievements render a padlock and
 * muted copy (state shown via text + icon, not color alone). `toast` is a
 * compact banner; `inline` is a centered card. `onClick` opens it (a real
 * `<button>`; disabled while locked). Composes `Card`, `Icon`. Token-only.
 */
export declare function AchievementUnlock({ achievement, variant, unlocked, label, onClick, className, }: AchievementUnlockProps): React.ReactElement;
//# sourceMappingURL=AchievementUnlock.d.ts.map
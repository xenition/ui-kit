import * as React from 'react';
import type { PlayerProfile } from './types';
export type PlayerStatCardVariant = 'compact' | 'detailed';
export interface PlayerStatCardProps {
    /** The player to render. */
    player: PlayerProfile;
    /**
     * - `compact`  — avatar + name + rank in a single row (default).
     * - `detailed` — adds a grid of the player's headline stats.
     */
    variant?: PlayerStatCardVariant;
    /** Presence indicator on the avatar. */
    online?: boolean;
    /** Called when the card is clicked — open the full profile. */
    onClick?: (player: PlayerProfile) => void;
    /** Extra classes on the root card. */
    className?: string;
}
/**
 * A player profile summary — avatar (with optional presence dot), handle,
 * rank/level, and (in `detailed`) a responsive grid of headline stats. Renders
 * a graceful "No stats yet" line when `detailed` has no stats. `onClick(player)`
 * opens the profile (the card becomes a keyboard-operable `role="button"`).
 * Presence is announced via text, never color alone. Composes `Card`, `Avatar`,
 * `Badge`. Token-only.
 */
export declare function PlayerStatCard({ player, variant, online, onClick, className, }: PlayerStatCardProps): React.ReactElement;
//# sourceMappingURL=PlayerStatCard.d.ts.map
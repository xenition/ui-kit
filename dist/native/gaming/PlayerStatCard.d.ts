import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
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
    /** Called when the card is tapped — open the full profile. */
    onPress?: (player: PlayerProfile) => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A player profile summary — avatar (with optional presence), handle, rank/
 * level, and (in `detailed`) a responsive grid of headline stats. Renders a
 * graceful "No stats yet" line when `detailed` has no stats. `onPress(player)`
 * opens the profile. Composes `Card`, `Avatar`, `Badge`. Token-only.
 */
export declare function PlayerStatCard({ player, variant, online, onPress, style, }: PlayerStatCardProps): React.ReactElement;
//# sourceMappingURL=PlayerStatCard.d.ts.map
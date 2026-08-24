import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type GameRecord } from './types';
export type GameCardVariant = 'grid' | 'list' | 'featured';
export interface GameCardProps {
    /** The game to render. */
    game: GameRecord;
    /**
     * - `grid`     — cover above stacked meta (default).
     * - `list`     — cover left, meta right, single row.
     * - `featured` — large cover + rating + prominent action.
     */
    variant?: GameCardVariant;
    /** Show a spinner + block the action (e.g. install in flight). */
    loading?: boolean;
    /** Called when the card body is tapped — open the store page. */
    onPress?: (game: GameRecord) => void;
    /**
     * Called by the primary action. Shows a Play / Install button when set; the
     * label + a11y reflect `game.installed`.
     */
    onPlay?: (game: GameRecord) => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A game / store title card — key art, title, genre, star rating, and a
 * Play/Install action. `onPress(game)` opens the title; `onPlay(game)` runs the
 * primary action with its label bound to `game.installed`. Composes `Card`,
 * `Button`, `Badge`. Token-only — no literal hex.
 */
export declare function GameCard({ game, variant, loading, onPress, onPlay, style, }: GameCardProps): React.ReactElement;
//# sourceMappingURL=GameCard.d.ts.map
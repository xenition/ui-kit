import * as React from 'react';
import type { GameRecord } from './types';
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
    /** Show the action as busy + block it (e.g. install in flight). */
    loading?: boolean;
    /** Called when the card body is clicked — open the store page. */
    onClick?: (game: GameRecord) => void;
    /**
     * Called by the primary action. Shows a Play / Install button when set; the
     * label + a11y reflect `game.installed`.
     */
    onPlay?: (game: GameRecord) => void;
    /** Extra classes on the root card. */
    className?: string;
}
/**
 * A game / store title card — key art, title, genre, star rating, and a
 * Play/Install action. `onClick(game)` opens the title (the card becomes a
 * keyboard-operable `role="button"`); `onPlay(game)` runs the primary action
 * (a real `<button>`) with its label bound to `game.installed`. Composes `Card`,
 * `Button`, `Badge`, `Rating`. Token-only — no literal colors.
 */
export declare function GameCard({ game, variant, loading, onClick, onPlay, className, }: GameCardProps): React.ReactElement;
//# sourceMappingURL=GameCard.d.ts.map
import * as React from 'react';
import type { GameCardProps } from './GameCard';
/** Same public contract as {@link GameCard} — a drop-in alternate design. */
export type GameCardV3Props = GameCardProps;
/**
 * GameCard, redesigned (v3): a **dense library row**. A small cover thumbnail, the
 * title over a genre·rating line, the price, and a compact Play/Install — hairline-
 * bordered for a list. The opposite of v2's cover hero. Same props, token-only.
 */
export declare const GameCardV3: React.ForwardRefExoticComponent<GameCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=GameCardV3.d.ts.map
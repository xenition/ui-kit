import * as React from 'react';
import type { GameCardProps } from './GameCard';
/** Drop-in alternate of {@link GameCardProps} — identical prop contract. */
export type GameCardV3Props = GameCardProps;
/**
 * GameCard — design variant **V3**: a **horizontal cover-left row**. A compact
 * square of key art on the left, the title / genre / rating stacked in the
 * middle, and the Play / Install control pinned to the right — a dense library
 * list line rather than V1's boxed tile or V2's hero. Same props as
 * {@link GameCardProps}; the action label + a11y still bind to `game.installed`.
 * Token-only, elevated surface (no border).
 */
export declare function GameCardV3({ game, loading, onPress, onPlay, style, }: GameCardV3Props): React.ReactElement;
//# sourceMappingURL=GameCardV3.d.ts.map
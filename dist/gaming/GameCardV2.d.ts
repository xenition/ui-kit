import * as React from 'react';
import type { GameCardProps } from './GameCard';
/** Same public contract as {@link GameCard} — a drop-in alternate design. */
export type GameCardV2Props = GameCardProps;
/**
 * GameCard, redesigned (v2): a **cover-hero store card**. The key art fills the
 * card; a rating badge and price float over it, the title/genre sit on a scrim,
 * and a Play/Install button anchors the foot. Elevated, hover-lift. Distinct from
 * v1. Same props, token-only.
 */
export declare const GameCardV2: React.ForwardRefExoticComponent<GameCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=GameCardV2.d.ts.map
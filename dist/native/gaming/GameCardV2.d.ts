import * as React from 'react';
import type { GameCardProps } from './GameCard';
/** Drop-in alternate of {@link GameCardProps} — identical prop contract. */
export type GameCardV2Props = GameCardProps;
/**
 * GameCard — design variant **V2**: a **full-bleed cover hero** with a centered
 * play overlay and the title / genre / rating laid over a bottom scrim. Where V1
 * is a media-top card with a separate body, V2 is one immersive key-art tile —
 * the cover fills the frame, a circular play control floats at the center, and
 * the facts sit on a dark gradient scrim. Same props as {@link GameCardProps};
 * only the layout differs. Token-only: the scrim is `withAlpha` of the neutral
 * ramp, overlay text is the lightest neutral step, the play control uses
 * `primary`.
 */
export declare function GameCardV2({ game, loading, onPress, onPlay, style, }: GameCardV2Props): React.ReactElement;
//# sourceMappingURL=GameCardV2.d.ts.map
import * as React from 'react';
import type { SwipeCardProps } from './SwipeCard';
/** Drop-in alternate design — identical props to `SwipeCard`. */
export type SwipeCardV2Props = SwipeCardProps;
/**
 * SwipeCard — design variant **V2** (web parity of the native V2). A softly
 * rounded full-bleed card with a multi-band gradient scrim (not the base's single
 * flat one), an inline name·distance line, and a **solid, filled decision stamp**
 * that swings in from the like/nope side. Reads as a plusher, more modern deck
 * card at a glance. Same `SwipeCardProps`, so it drops straight into `SwipeDeck`;
 * token classes only; photo-less profiles fall back to a token placeholder.
 */
export declare const SwipeCardV2: React.ForwardRefExoticComponent<SwipeCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SwipeCardV2.d.ts.map
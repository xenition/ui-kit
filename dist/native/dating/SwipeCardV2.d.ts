import * as React from 'react';
import type { SwipeCardProps } from './SwipeCard';
/** Drop-in alternate design — identical props to `SwipeCard`. */
export type SwipeCardV2Props = SwipeCardProps;
/**
 * SwipeCard — design variant **V2**. A softly **rounded full-bleed** card with a
 * multi-band gradient (not the original's single flat scrim), an inline
 * name·distance line, and a **solid, filled decision stamp** that swings in from
 * the like/nope side. Reads as a plusher, more modern deck card at a glance.
 * Same `SwipeCardProps`, so it drops straight into `SwipeDeck`. Token-pure
 * scrims via `withAlpha` of the neutral ramp; photo-less profiles fall back to a
 * token placeholder.
 */
export declare function SwipeCardV2({ profile, variant, overlay, overlayOpacity, aspectRatio, style, }: SwipeCardV2Props): React.ReactElement;
//# sourceMappingURL=SwipeCardV2.d.ts.map
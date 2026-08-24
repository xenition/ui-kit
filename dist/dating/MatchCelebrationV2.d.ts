import * as React from 'react';
import type { MatchCelebrationProps } from './MatchCelebration';
/** Drop-in alternate design — identical props to `MatchCelebration`. */
export type MatchCelebrationV2Props = MatchCelebrationProps;
/**
 * MatchCelebration — design variant **V2**, an **immersive full-screen** moment
 * (web parity of the native V2). Instead of a small centred dialog, the whole
 * viewport becomes a deep tinted stage: two **overlapping ringed avatars** sit
 * above a filled **celebratory band** carrying the headline, with the CTAs
 * anchored below. Same `MatchCelebrationProps`; token classes only; dismissible
 * via backdrop or Escape; returns nothing when `visible` is false.
 */
export declare const MatchCelebrationV2: React.ForwardRefExoticComponent<MatchCelebrationProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MatchCelebrationV2.d.ts.map
import * as React from 'react';
import type { MatchCelebrationProps } from './MatchCelebration';
/** Drop-in alternate design — identical props to `MatchCelebration`. */
export type MatchCelebrationV3Props = MatchCelebrationProps;
/**
 * MatchCelebration — design variant **V3**, a **compact toast** (web parity of the
 * native V3). Rather than taking over the screen, it drops a small horizontal card
 * in from the top over a light dismissable scrim: two tiny overlapping avatars, a
 * two-line headline/subtitle, and an inline message button. Ideal when a full
 * celebration would be too heavy. Same `MatchCelebrationProps`; token classes
 * only; dismissible via backdrop or Escape; returns nothing when not visible.
 */
export declare const MatchCelebrationV3: React.ForwardRefExoticComponent<MatchCelebrationProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MatchCelebrationV3.d.ts.map
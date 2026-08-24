import * as React from 'react';
import type { MatchCelebrationProps } from './MatchCelebration';
/** Drop-in alternate design — identical props to `MatchCelebration`. */
export type MatchCelebrationV2Props = MatchCelebrationProps;
/**
 * MatchCelebration — design variant **V2**, an **immersive full-screen** moment.
 * Instead of a small centred dialog, the whole screen becomes a deep tinted
 * stage: two **overlapping ringed avatars** sit above a filled **celebratory
 * band** carrying the headline, with the CTAs anchored below. Same
 * `MatchCelebrationProps`; token-pure (the stage is `withAlpha` of the neutral
 * ramp); returns nothing when `visible` is false; announced as a modal alert.
 */
export declare function MatchCelebrationV2({ visible, you, match, variant, title, onMessage, onKeepSwiping, onClose, messageLabel, keepSwipingLabel, }: MatchCelebrationV2Props): React.ReactElement | null;
//# sourceMappingURL=MatchCelebrationV2.d.ts.map
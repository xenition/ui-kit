import * as React from 'react';
import type { MatchCelebrationProps } from './MatchCelebration';
/** Drop-in alternate design — identical props to `MatchCelebration`. */
export type MatchCelebrationV3Props = MatchCelebrationProps;
/**
 * MatchCelebration — design variant **V3**, a **compact toast**. Rather than
 * taking over the screen, it slides a small horizontal card in from the top: two
 * tiny overlapping avatars, a two-line headline/subtitle, and an inline message
 * button, over a light dismissable scrim. Ideal when a full celebration would be
 * too heavy. Same `MatchCelebrationProps`; token-pure; returns nothing when not
 * visible; announced as a modal alert.
 */
export declare function MatchCelebrationV3({ visible, you, match, variant, title, onMessage, onKeepSwiping, onClose, messageLabel, keepSwipingLabel, }: MatchCelebrationV3Props): React.ReactElement | null;
//# sourceMappingURL=MatchCelebrationV3.d.ts.map
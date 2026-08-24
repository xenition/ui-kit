import * as React from 'react';
import type { RewardStarProps } from './RewardStar';
/** Same public contract as {@link RewardStar} — a drop-in alternate design. */
export type RewardStarV2Props = RewardStarProps;
/**
 * RewardStar, redesigned (v2): a **big star-burst tile**. One oversized filled
 * star sits in a tinted circular burst with the count set large as "value / max"
 * beneath, and the optional caption below that. Tapping the tile awards the next
 * star — `onReward(value + 1)`, wrapping to 1 once full — the reward gesture as a
 * single celebratory press. Distinct from v1's inline star row. Same props,
 * token-only.
 */
export declare const RewardStarV2: React.ForwardRefExoticComponent<RewardStarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RewardStarV2.d.ts.map
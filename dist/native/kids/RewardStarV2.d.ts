import * as React from 'react';
import type { RewardStarProps } from './RewardStar';
/** Same public contract as {@link RewardStar} — a drop-in alternate design. */
export type RewardStarV2Props = RewardStarProps;
/**
 * RewardStar, redesigned (v2): a **big star-burst tile**. One oversized filled
 * star sits in a tinted circular burst, with the count set large as "value / max"
 * beneath it and the optional caption below. Tapping the tile awards the next
 * star — `onReward(value + 1)`, wrapping back to 1 once full — the reward gesture
 * as a single celebratory press. Distinct from v1's small inline star row. Same
 * props.
 */
export declare function RewardStarV2({ value, max, label, color, readOnly, onReward, style, }: RewardStarV2Props): React.ReactElement;
//# sourceMappingURL=RewardStarV2.d.ts.map
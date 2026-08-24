import * as React from 'react';
import type { RewardStarProps } from './RewardStar';
/** Same public contract as {@link RewardStar} — a drop-in alternate design. */
export type RewardStarV3Props = RewardStarProps;
/**
 * RewardStar, redesigned (v3): a **tight inline star strip**. The stars pack on
 * one line with a small gap and the caption trails inline to the right rather
 * than stacking beneath — a compact readout for list rows and headers. Filled
 * state stays glyph + a11y (never color alone). Same props, token-only.
 */
export declare const RewardStarV3: React.ForwardRefExoticComponent<RewardStarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RewardStarV3.d.ts.map
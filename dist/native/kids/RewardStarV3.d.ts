import * as React from 'react';
import type { RewardStarProps } from './RewardStar';
/** Same public contract as {@link RewardStar} — a drop-in alternate design. */
export type RewardStarV3Props = RewardStarProps;
/**
 * RewardStar, redesigned (v3): a **tight inline star strip**. The stars pack on
 * one line with a small gap and the caption trails inline to the right rather
 * than wrapping below — a compact meter for lists and headers. Tapping the Nth
 * star fires `onReward(N)`. Filled state reads from the solid vs. outline glyph
 * plus the a11y label (never color alone). Same props.
 */
export declare function RewardStarV3({ value, max, size, label, color, readOnly, onReward, style, }: RewardStarV3Props): React.ReactElement;
//# sourceMappingURL=RewardStarV3.d.ts.map
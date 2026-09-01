import * as React from 'react';
import type { ReviewStarsProps } from './ReviewStars';
/** Drop-in for {@link ReviewStarsProps} — same props, the V4 "journey" design. */
export type ReviewStarsV4Props = ReviewStarsProps;
/**
 * ReviewStars — **V4** "journey" design. The boarding-pass take on an aggregate
 * review: the average sits large in near-white ink on a brand-gradient rating
 * badge (the signature V4 touch), the star row and count ride beside it, and the
 * optional per-star distribution is drawn as thin token proportion bars. Bar
 * widths are guarded against a zero total. Same props/behavior as
 * {@link ReviewStarsProps}; token-only colors via `useXenitionTheme()`. Pass
 * `compact` for a single-line layout that hides the distribution.
 */
export declare function ReviewStarsV4({ average, total, distribution, summary, compact, style, }: ReviewStarsV4Props): React.ReactElement;
//# sourceMappingURL=ReviewStarsV4.d.ts.map
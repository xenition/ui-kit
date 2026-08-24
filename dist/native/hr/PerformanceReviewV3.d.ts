import * as React from 'react';
import type { PerformanceReviewProps } from './PerformanceReview';
/** Drop-in alternate design for {@link PerformanceReview} — identical Props. */
export type PerformanceReviewV3Props = PerformanceReviewProps;
/**
 * PerformanceReview, design **V3** — a compact single row. Cycle + reviewer on
 * the left, a condensed star meter and goal percentage on the right, and the
 * review status carried by a leading tone glyph + word (never color alone).
 * Rating is still announced numerically via a11y. Same Props as
 * {@link PerformanceReview}; the goal ring/bar is dropped for density.
 * Press-scales on tap; token-pure.
 */
export declare function PerformanceReviewV3({ cycle, reviewer, rating, ratingMax, status, goalCompletion, onPress, testID, style, }: PerformanceReviewV3Props): React.ReactElement;
//# sourceMappingURL=PerformanceReviewV3.d.ts.map
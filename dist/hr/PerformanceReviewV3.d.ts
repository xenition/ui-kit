import * as React from 'react';
import type { PerformanceReviewProps } from './PerformanceReview';
/** Drop-in alternate design for {@link PerformanceReview} — identical Props. */
export type PerformanceReviewV3Props = PerformanceReviewProps;
/**
 * PerformanceReview, design **V3** — a compact single row. Cycle + reviewer on
 * the left with the review status carried by a leading tone glyph + word (never
 * color alone), and a condensed star meter and goal percentage pinned right.
 * The rating is still announced numerically via `aria-label`. Same Props as
 * {@link PerformanceReview}; the goal ring/bar is dropped for density, on a
 * borderless divider row. Token-pure.
 */
export declare const PerformanceReviewV3: React.ForwardRefExoticComponent<PerformanceReviewProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PerformanceReviewV3.d.ts.map
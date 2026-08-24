import * as React from 'react';
import type { PerformanceReviewProps } from './PerformanceReview';
/** Drop-in alternate design for {@link PerformanceReview} — identical Props. */
export type PerformanceReviewV2Props = PerformanceReviewProps;
/**
 * PerformanceReview, design **V2** — a card pairing a prominent star meter with
 * a circular goal-completion ring. The ring is a four-arc gauge whose lit
 * segments track the percentage, with the number in its centre (so progress is
 * read by both position and text, never color alone). Rating is announced
 * numerically via a11y as well as drawn. Same Props as {@link PerformanceReview}.
 * Elevated + mount-fade, token-pure.
 */
export declare function PerformanceReviewV2({ cycle, reviewer, reviewerAvatarUrl, rating, ratingMax, status, goalCompletion, goalCount, dueDate, onPress, testID, style, }: PerformanceReviewV2Props): React.ReactElement;
//# sourceMappingURL=PerformanceReviewV2.d.ts.map
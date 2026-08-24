import * as React from 'react';
import type { PerformanceReviewProps } from './PerformanceReview';
/** Drop-in alternate design for {@link PerformanceReview} — identical Props. */
export type PerformanceReviewV2Props = PerformanceReviewProps;
/**
 * PerformanceReview, design **V2** — a card pairing a prominent star meter with
 * a conic goal-completion ring. The ring is drawn from token-bound gradient
 * stops and shows the percentage as text in its centre (so progress is read by
 * both position and number, never color alone). The rating is announced
 * numerically via `aria-label` as well as drawn with filled/empty stars. Same
 * Props as {@link PerformanceReview}. Elevated with a subtle hover lift;
 * token-pure (no literals).
 */
export declare const PerformanceReviewV2: React.ForwardRefExoticComponent<PerformanceReviewProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PerformanceReviewV2.d.ts.map
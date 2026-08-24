import * as React from 'react';
import { type ReviewStatus } from './internal';
export type PerformanceReviewVariant = 'default' | 'compact';
export interface PerformanceReviewProps {
    /** Review cycle label (e.g. "H1 2026"). */
    cycle: string;
    /** Reviewer / manager name. */
    reviewer?: string;
    /** Reviewer avatar. */
    reviewerAvatarUrl?: string;
    /** Overall rating 0…`ratingMax`. Rendered as a star meter. */
    rating?: number;
    /** Rating scale ceiling (default 5). */
    ratingMax?: number;
    /** Review lifecycle status — glyph + word pill. */
    status?: ReviewStatus;
    /** Goal-completion percentage 0–100 (rendered as a meter). */
    goalCompletion?: number;
    /** Number of goals under review. */
    goalCount?: number;
    /** Pre-formatted due / meeting date. */
    dueDate?: string;
    /** Density. */
    variant?: PerformanceReviewVariant;
    /** Click handler (open the review; web parity of native `onPress`). */
    onClick?: () => void;
    className?: string;
}
/**
 * Performance-review summary: cycle, reviewer, a star rating meter, review
 * status, and an optional goal-completion meter (the shared `Progress`
 * primitive). Status is a glyph + word pill (never color alone) and the rating
 * is announced numerically via `aria-label` as well as drawn with filled/empty
 * stars. `compact` drops the goal meter. All colors are `--xen-*` token classes
 * — no literals. `forwardRef` to the root `<div>`.
 */
export declare const PerformanceReview: React.ForwardRefExoticComponent<PerformanceReviewProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PerformanceReview.d.ts.map
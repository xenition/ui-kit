import * as React from 'react';
export type ProgressDotsSize = 'sm' | 'md';
/**
 * How the indicator draws itself.
 *
 * - `'dots'` — a row of dots with the active step widened into a pill. The
 *   slide-position indicator this component has always been.
 * - `'bars'` — the onboarding **step** indicator from the design spec (§2):
 *   one equal-width segment per step, complete and current filled with the
 *   primary token, upcoming in the border token. No numbers, no captions.
 *   This is what replaced the numbered-circle stepper the shipped screens used.
 */
export type ProgressDotsVariant = 'dots' | 'bars';
export interface ProgressDotsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
    /** Total number of steps/pages. */
    count: number;
    /** Zero-based index of the active step. */
    activeIndex: number;
    /** Dot scale. Default `'md'`. */
    size?: ProgressDotsSize;
    /**
     * Indicator treatment. Default `'dots'` — the historical rendering, so no
     * existing caller moves. Pass `'bars'` for the header step indicator.
     */
    variant?: ProgressDotsVariant;
    /** When set, dots become pressable and report the tapped index. */
    onDotClick?: (index: number) => void;
}
/**
 * Paged-progress indicator — two treatments of the same idea, chosen with
 * `variant`.
 *
 * `'dots'` (the default, and everything that shipped before this prop existed)
 * is a slide-position indicator: a row of token-bound dots where the active
 * step is a widened "pill" in the primary color and the rest are muted.
 *
 * `'bars'` is the onboarding step indicator the design spec calls for (§2):
 * equal-width segments spanning the header, filled up to and including the
 * current step, fully rounded, `gap-xs` apart. It carries no numbers and no
 * captions on purpose — the numbered circles it replaces were the single worst
 * offender on the shipped screens, cramped at the top with labels too small to
 * read.
 *
 * Both treatments are decorative unless `onDotClick` is supplied, in which case
 * each step becomes a labelled button. An empty or negative `count` renders an
 * empty row rather than crashing, and a `count` of one renders a single full
 * bar. No literal colors.
 */
export declare const ProgressDots: React.ForwardRefExoticComponent<ProgressDotsProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ProgressDots.d.ts.map
import * as React from 'react';
export type ProgressDotsSize = 'sm' | 'md';
export interface ProgressDotsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
    /** Total number of steps/pages. */
    count: number;
    /** Zero-based index of the active step. */
    activeIndex: number;
    /** Dot scale. Default `'md'`. */
    size?: ProgressDotsSize;
    /** When set, dots become pressable and report the tapped index. */
    onDotClick?: (index: number) => void;
}
/**
 * Paged-progress indicator — a row of token-bound dots where the active step is
 * a widened "pill" in the primary color and the rest are muted. Shared by
 * {@link OnboardingSlides} and the welcome/paywall flow so every screen
 * advertises its position identically. Dots are decorative unless `onDotClick`
 * is supplied, in which case each becomes a labelled button. Guards an
 * empty/negative `count`. No literal colors.
 */
export declare const ProgressDots: React.ForwardRefExoticComponent<ProgressDotsProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ProgressDots.d.ts.map
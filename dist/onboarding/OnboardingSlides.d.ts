import * as React from 'react';
import type { OnboardingSlide } from './types';
export type OnboardingSlidesVariant = 'default' | 'minimal';
export interface OnboardingSlidesProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** Ordered intro slides. An empty list renders the empty state. */
    slides: OnboardingSlide[];
    /** Controlled active index. Omit to let the component own its position. */
    index?: number;
    /** Fires with the next index whenever the slide changes. */
    onIndexChange?: (index: number) => void;
    /** Fires when the user clicks "Skip". */
    onSkip?: () => void;
    /** Fires when the user advances past the final slide ("Done"). */
    onComplete?: () => void;
    /** Show the "Skip" affordance. Default `true`. */
    showSkip?: boolean;
    /** Label for the final-slide primary action. Default `'Get started'`. */
    finishLabel?: string;
    /** `'minimal'` drops the hero medallion for a text-only intro. */
    variant?: OnboardingSlidesVariant;
}
/**
 * Paged intro carousel — the first-run "here's the value" sequence
 * (design.md §41-42). Renders one {@link OnboardingSlide} at a time with a hero
 * medallion, a {@link ProgressDots} indicator, a "Skip" escape hatch and a
 * Next/Done primary action that walks to `onComplete` on the last slide. Works
 * controlled (`index` + `onIndexChange`) or uncontrolled. All indexing is
 * clamped so an out-of-range `index` can't crash, and an empty `slides` list
 * renders the {@link EmptyState}. No literal colors.
 */
export declare const OnboardingSlides: React.ForwardRefExoticComponent<OnboardingSlidesProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=OnboardingSlides.d.ts.map
import * as React from 'react';
import type { OnboardingSlidesProps } from './OnboardingSlides';
/** Same public contract as {@link OnboardingSlides} — a drop-in alternate design. */
export type OnboardingSlidesV2Props = OnboardingSlidesProps;
/**
 * OnboardingSlides, redesigned (v2): a **full-bleed hero carousel**. Each slide
 * fills a tall primary-tinted panel with a large medallion, headline, and
 * description centered; progress dots sit at the bottom with Skip and a circular
 * Next/Done button. A bolder intro than v1. Same props, token-only.
 */
export declare const OnboardingSlidesV2: React.ForwardRefExoticComponent<OnboardingSlidesProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=OnboardingSlidesV2.d.ts.map
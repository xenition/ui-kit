import * as React from 'react';
import type { OnboardingSlidesProps } from './OnboardingSlides';
/** Drop-in for {@link OnboardingSlides} — identical props, different design. */
export type OnboardingSlidesV2Props = OnboardingSlidesProps;
/**
 * Onboarding intro — V2. A full-bleed illustration hero fills the top of the
 * screen per slide, with the headline/description below and a pinned footer of
 * {@link ProgressDots} plus a big Next/Done button. Same controlled/uncontrolled
 * indexing and clamping as {@link OnboardingSlides}; empty list guarded. Token-pure.
 */
export declare function OnboardingSlidesV2({ slides, index, onIndexChange, onSkip, onComplete, showSkip, finishLabel, style, }: OnboardingSlidesV2Props): React.ReactElement;
//# sourceMappingURL=OnboardingSlidesV2.d.ts.map
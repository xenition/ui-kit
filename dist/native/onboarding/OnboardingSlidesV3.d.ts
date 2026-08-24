import * as React from 'react';
import type { OnboardingSlidesProps } from './OnboardingSlides';
/** Drop-in for {@link OnboardingSlides} — identical props, different design. */
export type OnboardingSlidesV3Props = OnboardingSlidesProps;
/**
 * Onboarding intro — V3. A minimal, text-forward take: a slim top progress bar
 * (fraction of slides completed) with a "Skip" link, centered headline/body, and
 * a Back / Next(Done) control pair at the base. No hero medallion — quieter and
 * faster to read. Same indexing/clamping and empty guard as
 * {@link OnboardingSlides}. Token-pure.
 */
export declare function OnboardingSlidesV3({ slides, index, onIndexChange, onSkip, onComplete, showSkip, finishLabel, style, }: OnboardingSlidesV3Props): React.ReactElement;
//# sourceMappingURL=OnboardingSlidesV3.d.ts.map
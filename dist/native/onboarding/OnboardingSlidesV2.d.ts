import * as React from 'react';
import type { OnboardingSlidesProps } from './OnboardingSlides';
/** Drop-in for {@link OnboardingSlides} — identical props, different design. */
export type OnboardingSlidesV2Props = OnboardingSlidesProps;
/**
 * Onboarding intro — V2, the **editorial** line.
 *
 * Same shell as {@link OnboardingSlides} — header · hero · headline · sticky
 * footer — but the hero is not a panel sitting under the header: it runs
 * full-bleed to the very top edge, the header controls float over it, and a
 * `colors.surface` content sheet lifts up over the bottom of the art. Each
 * advance remounts the body so the art and copy cross-fade in together.
 *
 * Identical props to {@link OnboardingSlides}, including the §3 `illustration`
 * slot and its medallion fallback. Same controlled/uncontrolled indexing and
 * clamping; an empty list is guarded. Token-pure.
 */
export declare function OnboardingSlidesV2({ slides, index, onIndexChange, onSkip, onComplete, illustration, onBack, showSkip, finishLabel, style, }: OnboardingSlidesV2Props): React.ReactElement;
//# sourceMappingURL=OnboardingSlidesV2.d.ts.map
import * as React from 'react';
import type { OnboardingSlidesProps } from './OnboardingSlides';
/** Same public contract as {@link OnboardingSlides} — a drop-in alternate design. */
export type OnboardingSlidesV2Props = OnboardingSlidesProps;
/**
 * Onboarding intro — V2, the **editorial** line.
 *
 * Same shell as {@link OnboardingSlides} — header · hero · headline · sticky
 * footer — but the hero is not a panel sitting under the header: it runs
 * full-bleed to the very top edge, the header controls float over it, and a
 * `surface` content sheet lifts up over the bottom of the art.
 *
 * Identical props to {@link OnboardingSlides}, including the §3 `illustration`
 * slot and its medallion fallback. Same controlled/uncontrolled indexing and
 * clamping; an empty list renders the {@link EmptyState}. Token-only.
 */
export declare const OnboardingSlidesV2: React.ForwardRefExoticComponent<OnboardingSlidesProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=OnboardingSlidesV2.d.ts.map
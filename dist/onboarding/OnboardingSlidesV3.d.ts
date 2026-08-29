import * as React from 'react';
import type { OnboardingSlidesProps } from './OnboardingSlides';
/** Same public contract as {@link OnboardingSlides} — a drop-in alternate design. */
export type OnboardingSlidesV3Props = OnboardingSlidesProps;
/**
 * Onboarding intro — V3, the **compact** line.
 *
 * No hero panel. The slide glyph drops to a small leading badge beside the
 * headline and the screen collapses to header · title row · sticky footer — for
 * a sheet presentation, or a short intro where a 38%-tall illustration would
 * push the CTA off the fold. Same shell, different idea (§11), not a reskin.
 *
 * The "Skip / Next" pair of bare text links this line used to end on is gone:
 * §5 gives every screen in the funnel the same 56-tall CTA, and the escape
 * hatch moves to the header's dismiss control where the rest of the module
 * keeps it.
 *
 * Identical props to {@link OnboardingSlides}. An `illustration` is honoured
 * (§3) — it takes the leading badge rather than a hero panel — and the slide
 * glyph is the fallback. Same indexing/clamping and empty guard. Token-only.
 */
export declare const OnboardingSlidesV3: React.ForwardRefExoticComponent<OnboardingSlidesProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=OnboardingSlidesV3.d.ts.map
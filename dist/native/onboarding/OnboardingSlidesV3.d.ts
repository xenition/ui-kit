import * as React from 'react';
import type { OnboardingSlidesProps } from './OnboardingSlides';
/** Drop-in for {@link OnboardingSlides} — identical props, different design. */
export type OnboardingSlidesV3Props = OnboardingSlidesProps;
/**
 * Onboarding intro — V3, the **compact** line.
 *
 * No hero panel. The slide glyph drops to a small leading badge beside the
 * headline and the screen collapses to header · title row · sticky footer — for
 * a sheet presentation, or a short intro where a 38%-tall illustration would
 * push the CTA off the fold. Same shell, different idea (§11), not a reskin.
 *
 * The "STEP 1 / 3" caption this line used to carry is gone: §2 replaced it with
 * the header's segmented bars, which say the same thing without asking anyone
 * to read 12px of tracking-heavy uppercase.
 *
 * Identical props to {@link OnboardingSlides}. An `illustration` is honoured
 * (§3) — it takes the leading badge rather than a hero panel — and the slide
 * glyph is the fallback. Same indexing/clamping and empty guard. Token-pure.
 */
export declare function OnboardingSlidesV3({ slides, index, onIndexChange, onSkip, onComplete, illustration, onBack, showSkip, finishLabel, style, }: OnboardingSlidesV3Props): React.ReactElement;
//# sourceMappingURL=OnboardingSlidesV3.d.ts.map
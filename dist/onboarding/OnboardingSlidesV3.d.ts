import * as React from 'react';
import type { OnboardingSlidesProps } from './OnboardingSlides';
/** Same public contract as {@link OnboardingSlides} — a drop-in alternate design. */
export type OnboardingSlidesV3Props = OnboardingSlidesProps;
/**
 * OnboardingSlides, redesigned (v3): a **minimal stepped intro**. A slim top
 * progress bar tracks position, the slide title/description sit left-aligned and
 * quiet, and Skip / Next are plain text links. No hero medallion, no dots — the
 * opposite of v2's full-bleed carousel. Same props, token-only.
 */
export declare const OnboardingSlidesV3: React.ForwardRefExoticComponent<OnboardingSlidesProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=OnboardingSlidesV3.d.ts.map
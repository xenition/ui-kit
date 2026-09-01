import * as React from 'react';
import { type OnboardingAccentV4 } from './internal/flow-v4';
import type { ProgressDotsProps } from './ProgressDots';
export interface ProgressDotsV4Props extends ProgressDotsProps {
    /** Which brand slot the filled segments answer in. Default `'primary'`. */
    accent?: OnboardingAccentV4;
    /**
     * Animate the active segment's arrival. Default `true`;
     * `prefers-reduced-motion` overrides it regardless.
     */
    animated?: boolean;
}
/** The `<style>` id this indicator's transition shares. Injection is idempotent. */
export declare const PROGRESS_V4_STYLE_ID = "xen-v4-onboarding-progress";
/**
 * **V4 paged-progress indicator** — the web twin of the native
 * `ProgressDotsV4`, same props as {@link ProgressDots} plus `accent` and
 * `animated`.
 *
 * ## Four changes
 *
 * 1. **The track is a surface, not a hairline** (see {@link PROGRESS_V4_CSS}).
 * 2. **Thickness comes off the scale** (see {@link THICKNESS}).
 * 3. **The active segment transitions in**, on the `standard` duration —
 *    colour only, because a bar that slides implies the *content* slid, and in
 *    a stepped flow it did not.
 * 4. **The accessible value counts steps, not indices.** The base reported
 *    `aria-valuemin=0 / valuemax=count-1 / valuenow=activeIndex`, so a screen
 *    reader on step one of three announced "0 of 2".
 *
 * A `count` of zero renders an empty row rather than throwing; a `count` of one
 * renders a single full bar. Both treatments stay decorative unless
 * `onDotClick` is supplied, in which case each step becomes a labelled button.
 */
export declare const ProgressDotsV4: React.ForwardRefExoticComponent<ProgressDotsV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ProgressDotsV4.d.ts.map
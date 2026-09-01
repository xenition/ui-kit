import * as React from 'react';
import { type OnboardingAccentV4 } from './internal/flow-v4';
import type { ProgressDotsProps } from './ProgressDots';
export interface ProgressDotsV4Props extends ProgressDotsProps {
    /** Which brand slot the filled segments answer in. Default `'primary'`. */
    accent?: OnboardingAccentV4;
    /**
     * Animate the active segment's arrival. Default `true`; `useReducedMotion()`
     * overrides it to `false` regardless.
     */
    animated?: boolean;
}
/**
 * **V4 paged-progress indicator** — same props as {@link ProgressDots} plus
 * `accent` and `animated`, both optional.
 *
 * ## Four changes
 *
 * 1. **The track is a surface, not a hairline.** The base filled upcoming
 *    segments with `colors.border` — a *divider* colour asked to act as a
 *    *fill*. On a dark seed that is a near-invisible rail; on a high-contrast
 *    one it is a row of hard black bars competing with the filled steps. The
 *    track is now an M3 state mix of `onSurface` over `surface`, which is a
 *    quiet neutral in both schemes by construction.
 * 2. **Thickness comes off the scale** (see {@link THICKNESS}).
 * 3. **The active segment animates in.** On the `standard` duration, which is
 *    what a state change between two positions takes. It fades rather than
 *    slides: a bar that slides implies the *content* slid, and in a stepped
 *    flow it did not. Collapses to nothing under `useReducedMotion()`.
 * 4. **The accessible value counts steps, not indices.** The base reported
 *    `{min: 0, max: total - 1, now: activeIndex}` — a screen reader on step
 *    one of three announced "0 of 2". It now reports 1-based positions, which
 *    is what the visible label says.
 *
 * A `count` of zero renders an empty row rather than crashing; a `count` of one
 * renders a single full bar. Both treatments stay decorative unless
 * `onDotPress` is supplied, in which case each step becomes a labelled button.
 */
export declare function ProgressDotsV4({ count, activeIndex, size, variant, accent, animated, onDotPress, accessibilityLabel, style, }: ProgressDotsV4Props): React.ReactElement;
//# sourceMappingURL=ProgressDotsV4.d.ts.map
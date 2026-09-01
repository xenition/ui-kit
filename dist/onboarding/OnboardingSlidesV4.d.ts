import * as React from 'react';
import { type OnboardingFlowV4Props } from './internal/flow-v4';
import type { OnboardingSlidesProps } from './OnboardingSlides';
export interface OnboardingSlidesV4Props extends OnboardingSlidesProps, OnboardingFlowV4Props {
    /**
     * Let the user swipe between slides. Default `true`.
     *
     * A CSS scroll-snap track, so the gesture is the platform's own — momentum,
     * rubber-banding and trackpad support included — rather than a pointer-event
     * reimplementation of it (§31: use the familiar interaction). Turn it off for
     * a flow that must be walked in order.
     */
    swipeable?: boolean;
    /** CTA copy on every slide but the last. Default `'Next'`. */
    nextLabel?: string;
    /** Text skip action under the CTA. The header ✕ stays either way. */
    skipLabel?: string;
    /** Copy for the empty state. Default `'Nothing to show yet.'`. */
    emptyMessage?: string;
}
/**
 * **V4 intro carousel** — the web twin of the native `OnboardingSlidesV4`: the
 * base's props plus `swipeable`, `nextLabel`, `skipLabel`, `emptyMessage` and
 * the line's `ground`/`accent`.
 *
 * ## Five changes
 *
 * 1. **It swipes.** A scroll-snap track drives the same index the buttons do,
 *    in both directions, controlled or uncontrolled. The base's carousel could
 *    only be advanced by clicking "Next".
 * 2. **Each slide gets its own artwork** — `OnboardingSlide.illustration`. The
 *    base took one `illustration` for the whole carousel, so a three-slide
 *    intro showed one picture while the copy changed under it.
 * 3. **The copy is the host's** — `nextLabel`, `skipLabel`, `emptyMessage`
 *    replace three hard-coded English strings.
 * 4. **The footer is the shared one**, so the CTA clears the inset and a skip
 *    action has a place under it rather than only as a ✕ a user may read as
 *    "close the app".
 * 5. **Slides arrive**, and not at all under `prefers-reduced-motion`.
 *
 * An empty `slides` renders the message, not a blank screen.
 */
export declare const OnboardingSlidesV4: React.ForwardRefExoticComponent<OnboardingSlidesV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=OnboardingSlidesV4.d.ts.map
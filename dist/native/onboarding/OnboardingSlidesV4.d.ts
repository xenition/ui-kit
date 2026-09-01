import * as React from 'react';
import { type OnboardingFlowV4Props } from './internal/flow-v4';
import type { OnboardingSlidesProps } from './OnboardingSlides';
export interface OnboardingSlidesV4Props extends OnboardingSlidesProps, OnboardingFlowV4Props {
    /**
     * Let the user swipe between slides. Default `true`.
     *
     * The base had no gesture at all: a carousel that only advances from a
     * button is not a carousel, it is a wizard wearing dots, and a swipe is the
     * first thing anyone tries on one (§31 — use the familiar interaction).
     * Turn it off for a flow that must be walked in order.
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
 * **V4 intro carousel** — the base's props plus `swipeable`, `nextLabel`,
 * `skipLabel`, `emptyMessage` and the line's `ground`/`accent`.
 *
 * ## Five changes
 *
 * 1. **It swipes.** A paged `ScrollView` drives the same index the buttons do,
 *    in both directions, controlled or uncontrolled. This is the change: the
 *    base's carousel could only be advanced by tapping "Next".
 * 2. **Each slide gets its own artwork.** `OnboardingSlide.illustration`.
 *    The base took one `illustration` for the whole carousel, so a three-slide
 *    intro showed one picture while the copy changed under it. The
 *    carousel-wide prop still works as the fallback.
 * 3. **The copy is the host's.** `nextLabel`, `skipLabel` and `emptyMessage`
 *    replace three hard-coded English strings in a module whose whole contract
 *    is that copy is caller-supplied.
 * 4. **The footer is the shared one**, so the CTA clears the home indicator
 *    and a skip action has a place under it rather than only as a ✕ a user may
 *    read as "close the app".
 * 5. **Slides arrive.** The staggered entrance, replayed as the index changes,
 *    and collapsed under `useReducedMotion()`.
 *
 * The header ✕ is still the skip affordance when `showSkip` is on, so nothing
 * existing moves. An empty `slides` renders the message, not a blank screen.
 */
export declare function OnboardingSlidesV4({ slides, index, onIndexChange, onSkip, onComplete, illustration, onBack, showSkip, finishLabel, nextLabel, skipLabel, emptyMessage, swipeable, variant, ground, accent, style, }: OnboardingSlidesV4Props): React.ReactElement;
//# sourceMappingURL=OnboardingSlidesV4.d.ts.map
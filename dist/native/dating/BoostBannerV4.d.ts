import * as React from 'react';
import type { BoostBannerProps } from './BoostBanner';
export interface BoostBannerV4Props extends BoostBannerProps {
    /** Name for the dismiss control. Default `'Dismiss'`. */
    dismissLabel?: string;
}
/**
 * **V4 boost banner** — same props as {@link BoostBanner} plus
 * `dismissLabel`.
 *
 * ## Four changes
 *
 * 1. **`onDismiss` no longer deletes the CTA.** The base branched
 *    `onDismiss ? closeButton : ctaButton`, so a banner you could dismiss was
 *    a banner you could not act on — and `ctaLabel` was accepted, documented
 *    and silently discarded. Nothing said the two props were exclusive
 *    because nobody decided that they were. Both render.
 * 2. **The CTA can be pressed.** It was wrapped in `pointerEvents="none"` —
 *    still drawn, still announced as a button, inert to every tap. The whole
 *    card carried the press instead, which is the third change:
 * 3. **The banner is not a button with buttons inside it.** A `role="button"`
 *    container makes its children presentational on some readers and gives a
 *    switch-control user one target where there are two actions. The banner is
 *    a plain surface now; the CTA and the dismiss are the controls.
 * 4. **Dismiss is a real target.** It was a bare ✕ with `hitSlop={8}` — about
 *    18px of drawn control. It clears 44, presses with a state layer rather
 *    than an `opacity: 0.9`, and its tint is composited so the banner is the
 *    same colour on a card as on the page.
 */
export declare function BoostBannerV4({ variant, title, subtitle, ctaLabel, onPress, activeLabel, onDismiss, dismissLabel, style, }: BoostBannerV4Props): React.ReactElement;
//# sourceMappingURL=BoostBannerV4.d.ts.map
import * as React from 'react';
import { type FlowLegalLink, type OnboardingFlowV4Props } from './internal/flow-v4';
import type { PaywallFeatureRow } from './PaywallScreen';
import type { WelcomeScreenProps } from './WelcomeScreen';
import type { IconName } from '../primitives/icon-names';
export interface WelcomeScreenV4Props extends WelcomeScreenProps, OnboardingFlowV4Props {
    /**
     * The §8 feature rows, between the headline and the CTA.
     *
     * This is what the reference welcome-offer screen actually is — a hero, a
     * headline, three rows on a connecting rail and one CTA — and the base could
     * not draw it, so hosts reached for `PaywallScreen` (dragging a plan
     * selector and a billing toggle they did not want) or rebuilt the rows.
     */
    features?: PaywallFeatureRow[];
    /** Optional heading above the rows. */
    featuresTitle?: string;
    /** Force the connecting rail on or off. Default: on at three or more rows. */
    featureRail?: boolean;
    /** Reassurance line above the CTA. */
    reassurance?: string;
    /** Its glyph. Default `success`. */
    reassuranceIcon?: IconName;
    /** A third, quieter action under the secondary link. */
    tertiaryLabel?: string;
    onTertiary?: () => void;
    /** Terms · Privacy, inline at the very bottom. */
    legalLinks?: FlowLegalLink[];
    onLegalLinkClick?: (id: string) => void;
    /** Trailing mark on the CTA. Overrides the default `→`. */
    ctaTrailing?: React.ReactNode;
}
/**
 * **V4 first-launch welcome** — the web twin of the native `WelcomeScreenV4`:
 * the base's props plus `features`, `reassurance`, the two extra footer slots,
 * and the line's `ground`/`accent`.
 *
 * ## Five changes
 *
 * 1. **The body scrolls under a pinned footer.** The base centred its content
 *    in one column; add three feature rows on a short viewport and the bottom
 *    of the copy was unreachable. `min-h-0` on the scrolling region is the part
 *    that is easy to get wrong — without it the page scrolls instead of the
 *    body, which un-pins the CTA.
 * 2. **The CTA clears the safe-area inset**, via `AuthStickyFooterV4`.
 * 3. **It can carry the value proposition** — `features`.
 * 4. **The secondary action reads as a choice** — underlined, `on-surface`,
 *    its own tap target — instead of muted text the eye files as a caption.
 * 5. **The hero tint inverts with the scheme** rather than being a light ramp
 *    step painted on a dark page.
 *
 * `variant="bottomSheet"` still left-aligns the headline block — the one place
 * §4 allows it — and now also stops centring the body, because a sheet is
 * anchored to its top edge.
 */
export declare const WelcomeScreenV4: React.ForwardRefExoticComponent<WelcomeScreenV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=WelcomeScreenV4.d.ts.map
import * as React from 'react';
import { type FlowLegalLink, type OnboardingFlowV4Props } from './internal/flow-v4';
import type { PaywallFeatureRow } from './PaywallScreen';
import type { WelcomeScreenProps } from './WelcomeScreen';
import type { IconName } from '../../primitives/icon-names';
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
    onLegalLinkPress?: (id: string) => void;
    /** Trailing mark on the CTA. Overrides the default `→`. */
    ctaTrailing?: React.ReactNode;
}
/**
 * **V4 first-launch welcome** — the base's props plus `features`,
 * `reassurance`, the two extra footer slots, and the line's `ground`/`accent`.
 *
 * ## Five changes
 *
 * 1. **It scrolls.** The base centred its body with `flex: 1`. Add three
 *    feature rows to a 5.4" phone and the bottom of the copy was simply
 *    unreachable. `FlowScreenV4` keeps the centring for a short screen and
 *    scrolls a long one, with the header and footer pinned either way.
 * 2. **The CTA clears the home indicator.** Via `AuthStickyFooterV4`, which
 *    the base's hand-rolled band did not use, so on a notched phone the button
 *    sat under the home bar.
 * 3. **It can carry the value proposition.** `features` — see above.
 * 4. **The secondary action reads as a choice.** Underlined, `onSurface`, its
 *    own tap target, instead of muted text the eye files as a caption.
 * 5. **The hero tint survives dark mode without a branch**, and the medallion
 *    scales with the viewport instead of sitting at a fixed 96 on a tablet.
 *
 * `variant="bottomSheet"` still left-aligns the headline block — the one place
 * §4 allows it — and now also stops centring the body, because a sheet is
 * anchored to its top edge. Every part is optional; the screen composes with
 * no illustration, no subtitle, no header controls and no secondary action.
 */
export declare function WelcomeScreenV4({ title, subtitle, logoGlyph, illustration, primaryLabel, onGetStarted, secondaryLabel, onSecondary, onBack, onDismiss, stepCount, stepIndex, loading, variant, features, featuresTitle, featureRail, reassurance, reassuranceIcon, tertiaryLabel, onTertiary, legalLinks, onLegalLinkPress, ctaTrailing, ground, accent, style, }: WelcomeScreenV4Props): React.ReactElement;
//# sourceMappingURL=WelcomeScreenV4.d.ts.map
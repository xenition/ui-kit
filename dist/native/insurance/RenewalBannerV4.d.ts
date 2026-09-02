import * as React from 'react';
import type { RenewalBannerProps } from './RenewalBanner';
export interface RenewalBannerV4Props extends RenewalBannerProps {
    /**
     * What is owed at renewal, in integer **cents**.
     *
     * Distinct from `premiumCents`, which is the recurring price. A renewal that
     * carries an arrears balance or a pro-rated adjustment owes a different
     * number, and the base had nowhere to put it.
     */
    amountDueCents?: number;
    /** When the grace period ends, already formatted by the caller. */
    graceDate?: string;
    /** Precedes {@link RenewalBannerV4Props.amountDueCents}. Default `'Amount due'`. */
    amountDueLabel?: string;
    /** Precedes {@link RenewalBannerV4Props.graceDate}. Default `'Grace period ends'`. */
    graceLabel?: string;
    /** Build the renewal sentence. Default `'Your policy renews on 4 May'`. */
    formatRenewal?: (date: string) => string;
}
/**
 * **V4 renewal banner** — same props as {@link RenewalBanner} plus
 * `amountDueCents`, `graceDate`, `amountDueLabel`, `graceLabel` and
 * `formatRenewal` (`formatMoney` is already on the base).
 *
 * ## Five changes
 *
 * 1. **An overdue renewal announces itself.** The banner is the one component
 *    in this module that appears *because something changed*, and it had no
 *    live region on either twin — so a policyholder using a screen reader was
 *    told their cover had lapsed only if they happened to swipe back up to the
 *    top of the screen. `overdue` is now `accessibilityRole="alert"` with an
 *    assertive live region; `due` is polite; `upcoming` announces nothing,
 *    because a renewal three weeks out is not an interruption. Announcing
 *    everything is how a user learns to ignore everything.
 * 2. **The heading is a heading.** The label sat on a roleless `View` and the
 *    headline was drawn as ordinary body text — on the web twin, literally a
 *    `<p>` — so nothing in the banner was reachable by heading navigation.
 * 3. **The money owed has somewhere to live.** `premiumCents` is the recurring
 *    price; what is actually due at renewal, plus how long the grace period
 *    runs, are the two facts that decide whether a person acts today. Neither
 *    had a prop, so an app that knew both had to draw its own banner.
 * 4. **The band is opaque and its ink is ink.** `withAlpha(tint, 0.1)` over a
 *    `tint` border was a translucent wash that changed colour with whatever was
 *    behind it, and `colors.muted` drew the body copy — a ramp step with no
 *    contrast promise. Composited once, `mutedText` for the copy.
 * 5. **Renew clears 44 and says what it renews.** The button was a bare
 *    `Button` with no minimum height and the word "Renew now" for a name; two
 *    policies on one screen gave a reader two identical actions.
 *
 * **Renders nothing without a `renewalDate`** (§4.5).
 */
export declare function RenewalBannerV4({ renewalDate, urgency, premiumCents, currency, amountDueCents, graceDate, amountDueLabel, graceLabel, formatRenewal, renewLabel, loading, formatMoney: format, onRenew, style, }: RenewalBannerV4Props): React.ReactElement | null;
//# sourceMappingURL=RenewalBannerV4.d.ts.map
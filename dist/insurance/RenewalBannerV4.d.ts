import * as React from 'react';
import type { RenewalBannerProps } from './RenewalBanner';
export interface RenewalBannerV4Props extends RenewalBannerProps {
    /**
     * What is owed to renew, in integer **cents**.
     *
     * `premiumCents` is the recurring price; the amount due at renewal is often
     * neither that nor a multiple of it — arrears, a proration, a reinstatement
     * fee. The banner asked the holder to pay and never said how much.
     */
    amountDueCents?: number;
    /** The last day cover survives non-payment, already formatted by the caller. */
    graceDate?: string;
    /** The caption over the figure. Default `'Amount due'`. */
    amountDueLabel?: string;
    /** The words before `graceDate`. Default `'Grace period ends'`. */
    graceLabel?: string;
    /** Build the renewal sentence. Default `'Your policy renews on 12 Aug'`. */
    formatRenewal?: (date: string) => string;
}
/**
 * **V4 renewal banner** — same props as {@link RenewalBanner} plus
 * `amountDueCents` and `graceDate`.
 *
 * ## Five changes
 *
 * 1. **An overdue renewal announces itself.** The banner had no live region at
 *    all, so a policy that had lapsed into its grace period appeared silently:
 *    a screen-reader user who had just submitted a payment, or landed on the
 *    page from a link, was told nothing. Overdue is the one genuinely urgent
 *    state in this module — cover is ending — so it, and only it, is an
 *    `alert`. Upcoming and due stay quiet, because announcing everything
 *    teaches a user to ignore everything.
 * 2. **The label sat on a roleless `<div>`.** ARIA forbids naming a generic
 *    element and browsers drop the label, so `aria-label="Renewal overdue, 12
 *    Aug"` was never spoken by anything — while also being the only place the
 *    date was joined to the heading.
 * 3. **The heading is a heading.** It was a `<p>` in bold, so the banner was
 *    invisible to a reader navigating a policy page by heading.
 * 4. **It can say what is owed, and by when.** See `amountDueCents` and
 *    `graceDate`.
 * 5. **The tint follows the theme.** `bg-primary-50` and `border-primary` over
 *    `bg-warn/10` were three different recipes; the ground is now the tone
 *    mixed 10% into the card, which is what the native twin mixes, and the
 *    Renew button clears 44.
 */
export declare const RenewalBannerV4: React.ForwardRefExoticComponent<RenewalBannerV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RenewalBannerV4.d.ts.map
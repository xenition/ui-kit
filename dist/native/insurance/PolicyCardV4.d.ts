import * as React from 'react';
import type { PolicyCardProps } from './PolicyCard';
/** The four captions a policy card draws over its figures. */
export interface PolicyCardV4Labels {
    /** Precedes the named insured. Default `'Insured'`. */
    insured?: string;
    /** Caption over the coverage figure. Default `'Coverage'`. */
    coverage?: string;
    /** Caption over the premium figure. Default `'Premium'`. */
    premium?: string;
    /** Precedes the renewal date. Default `'Renews'`. */
    renews?: string;
}
export interface PolicyCardV4Props extends PolicyCardProps {
    /**
     * Why the policy is in the state it is in — shown for `lapsed` and
     * `cancelled`, which the base rendered with no reason at all.
     */
    statusReason?: string;
    /** When the status took effect, already formatted by the caller. */
    statusDate?: string;
    /** Override the four English captions. */
    labels?: PolicyCardV4Labels;
}
/**
 * **V4 policy card** — same props as {@link PolicyCard} plus `statusReason`,
 * `statusDate` and `labels` (`formatMoney` is already on the base).
 *
 * ## Six changes
 *
 * 1. **A lapsed policy says why, when, and that the coverage is not in
 *    force.** `lapsed` and `cancelled` had nowhere to put a reason, no date and
 *    no next step — and directly underneath, the card kept drawing the full
 *    coverage amount at full weight, in the same ink an active policy uses. A
 *    policyholder whose cover lapsed for non-payment saw a red pill and
 *    "$500,000.00". The reason and the date are props now, and on an adverse
 *    status the coverage figure is drawn muted with the status word beside its
 *    caption, so the number can no longer be read as money that is available.
 * 2. **The card announces its money.** The base named the whole `Pressable`
 *    `"Premier Auto, Auto policy, Active"` and then rendered the coverage, the
 *    premium and the renewal date as children of it. ARIA — and, on native, a
 *    `Pressable`'s default `accessible` flattening — replaces the contents with
 *    the name, so the card announced a status and no figures whatsoever. Every
 *    figure is folded into the spoken name.
 * 3. **The status pill is a sibling of the activation, not a descendant.**
 *    Wrapping the whole card meant the pill, the reason and the renewal line
 *    were all inside one leaf. The card is a plain `CardV4` now; the press
 *    wraps the glyph-and-title region only.
 * 4. **Press is a state layer.** `opacity: pressed ? 0.85 : 1` dimmed the
 *    card's own content, which is the signal M3 spends on *disabled*.
 * 5. **A negative coverage is shown.** `Math.max(0, …)` printed `$0.00` for
 *    `coverageCents={-1}`, indistinguishable from a policy with no benefit.
 * 6. **Ink stops being fill.** `colors.muted` drew every caption and
 *    `colors.primary` drew the premium — both are fill slots with no contrast
 *    promise as text; a rendered audit measured `primary` as low as 1.32:1.
 *    They are `mutedText` and `primaryText` now, and the leading disc's
 *    `withAlpha(primary, 0.12)` is an opaque composite instead of a wash that
 *    changed colour with whatever was behind the card.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
export declare function PolicyCardV4({ variant, name, policyNumber, coverageCents, premiumCents, cadence, status, holder, renewalDate, currency, statusReason, statusDate, labels, formatMoney: format, onPress, style, }: PolicyCardV4Props): React.ReactElement | null;
//# sourceMappingURL=PolicyCardV4.d.ts.map
import * as React from 'react';
import type { PolicyCardProps } from './PolicyCard';
/** The four words the card puts in front of its figures. */
export interface PolicyCardV4Labels {
    /** Before the named insured. Default `'Insured'`. */
    insured?: string;
    /** Over the coverage figure. Default `'Coverage'`. */
    coverage?: string;
    /** Over the premium figure. Default `'Premium'`. */
    premium?: string;
    /** Before the renewal date. Default `'Renews'`. */
    renews?: string;
}
export interface PolicyCardV4Props extends PolicyCardProps {
    /**
     * Why the policy is lapsed or cancelled.
     *
     * `lapsed` and `cancelled` are decisions the holder has to act on and the
     * card had no field to carry the reason, so the screen said "✕ Cancelled"
     * over a coverage figure that is no longer real and stopped there.
     */
    statusReason?: string;
    /** When the status took effect, already formatted by the caller. */
    statusDate?: string;
    /** The words the card prints before its own figures. */
    labels?: PolicyCardV4Labels;
}
/**
 * **V4 policy card** — same props as {@link PolicyCard} plus `statusReason`,
 * `statusDate` and `labels`.
 *
 * ## Six changes
 *
 * 1. **A cancelled policy can say why, and when.** The base carried `status`
 *    and nothing else, so "✕ Cancelled" sat above a live-looking $250,000
 *    coverage figure with no reason, no effective date and no next step. The
 *    holder could not tell a non-payment lapse from a mid-term cancellation,
 *    and the largest number on the card was one they were no longer entitled
 *    to. An adverse status now renders the caller's sentence and its date, and
 *    the coverage figure is captioned as no longer in force.
 * 2. **The card announces its own money.** `aria-label` sat on the element
 *    that also contained the coverage, the premium and the renewal date —
 *    ARIA replaces an element's contents with its name, so the card announced
 *    "Premier Auto, Auto policy, Active" and **no amount at all**. Coverage,
 *    premium and renewal are folded into the name, joined with commas.
 * 3. **`coverageCents={-1}` no longer prints "$0.00".** Every figure in the
 *    module was clamped with `Math.max(0, …)`, so a sentinel or a bad fetch
 *    was indistinguishable from a policy that genuinely covers nothing. A
 *    below-zero amount is printed as it is and captioned.
 * 4. **The card is not a `div` pretending to be a button.** `pressableProps`
 *    gave it `role="button"`, `tabIndex` and a hand-written Enter/Space
 *    handler — three approximations of a `<button>`, and the handler is the
 *    one that steals keydowns from anything nested inside it. The activation
 *    is a real `<button>` wrapping the identity and the figures; the status
 *    pill is its **sibling**.
 * 5. **Press is a state layer.** `hover:opacity-90` fades the card's own
 *    content, which is the signal M3 spends 0.38 on to mean *disabled*, so a
 *    hovered card and a dead one looked alike.
 * 6. **Every word is a prop and focus is `ring-ring`.** "Insured",
 *    "Coverage", "Premium" and "Renews" were hard-coded English, and the focus
 *    ring was `ring-primary-300` — a ramp step that ignores the seed and
 *    mirrors under `[data-theme="dark"]`.
 */
export declare const PolicyCardV4: React.ForwardRefExoticComponent<PolicyCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PolicyCardV4.d.ts.map
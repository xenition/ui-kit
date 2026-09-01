import * as React from 'react';
import type { TrialBannerProps } from './TrialBanner';
export interface TrialBannerV4Props extends TrialBannerProps {
    /**
     * Total days in the trial. Supplying it *and* {@link TrialBannerProps.daysLeft}
     * draws a meter under the copy, so "3 days left" also reads as **how far
     * through** — a number alone cannot say whether three is nearly over or
     * barely started.
     */
    daysTotal?: number;
    /**
     * Build the countdown copy. Default `'N days left'` / `'1 day left'`.
     *
     * A prop rather than a string because the base hard-coded English
     * pluralization inside the component, which is unreachable for a host that
     * localizes — and this module's whole contract is that copy is
     * caller-supplied.
     */
    formatDaysLeft?: (days: number) => string;
    /** Dismiss affordance. Hidden when omitted. */
    onDismiss?: () => void;
    /** Accessible name for the dismiss control. Default `'Dismiss'`. */
    dismissLabel?: string;
}
/**
 * **V4 trial banner** — same props as {@link TrialBanner} plus `daysTotal`,
 * `formatDaysLeft`, `onDismiss` and `dismissLabel`.
 *
 * ## Four changes
 *
 * 1. **Soft, not solid.** The base filled the whole strip with `colors.accent`
 *    (or `warn`, or `success`) at full saturation. Sat above a paywall, that is
 *    a second loud coloured block arguing with the CTA — and §5 gives the CTA
 *    that job alone. V4 tints the ground toward the tone and puts the copy in
 *    the tone's **contrast-corrected text slot**, which is how `AlertV4` and
 *    `CalloutV4` already draw the same idea.
 * 2. **The subtitle is a tone, not an opacity.** `opacity: 0.9` on ink is a
 *    contrast reduction the compiler cannot see and no measurement accounts
 *    for. `mutedText` is the slot that means "secondary" and carries a promise.
 * 3. **The countdown can show its position.** With `daysTotal`, a meter draws
 *    the fraction remaining. "2 days left" out of 3 and out of 30 are different
 *    facts and the base rendered them identically.
 * 4. **The copy is the host's.** `formatDaysLeft` replaces the hard-coded
 *    English plural, and `dismissLabel` names the new control.
 *
 * **There is still no `TrialBannerV2`/`V3` line split** — a strip this small has
 * one correct shape, and `design-line-composition` documents that from the
 * other side. This V4 is the same shape, corrected.
 */
export declare function TrialBannerV4({ title, subtitle, daysLeft, daysTotal, tone, actionLabel, onActionPress, icon, formatDaysLeft, onDismiss, dismissLabel, style, }: TrialBannerV4Props): React.ReactElement | null;
//# sourceMappingURL=TrialBannerV4.d.ts.map
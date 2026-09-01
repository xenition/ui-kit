import * as React from 'react';
import type { TrialBannerProps } from './TrialBanner';
export interface TrialBannerV4Props extends TrialBannerProps {
    /**
     * Total days in the trial. Supplying it *and* `daysLeft` draws a meter under
     * the copy, so "3 days left" also reads as **how far through** — a number
     * alone cannot say whether three is nearly over or barely started.
     */
    daysTotal?: number;
    /**
     * Build the countdown copy. Default `'N days left'` / `'1 day left'`.
     *
     * A prop rather than a string, because the base hard-coded English
     * pluralization inside the component where a host that localizes cannot
     * reach it — and this module's contract is that copy is caller-supplied.
     */
    formatDaysLeft?: (days: number) => string;
    /** Dismiss affordance. Hidden when omitted. */
    onDismiss?: () => void;
    /** Accessible name for the dismiss control. Default `'Dismiss'`. */
    dismissLabel?: string;
}
/**
 * **V4 trial banner** — the web twin of the native `TrialBannerV4`, same props
 * as {@link TrialBanner} plus `daysTotal`, `formatDaysLeft`, `onDismiss` and
 * `dismissLabel`.
 *
 * ## Four changes
 *
 * 1. **Soft, not solid** (see {@link TONE}).
 * 2. **The subtitle is a tone, not an opacity.** `opacity: 0.9` on ink is a
 *    contrast reduction no measurement accounts for; `muted-text` is the slot
 *    that means "secondary" and carries a promise.
 * 3. **The countdown can show its position** — "2 days left" out of 3 and out
 *    of 30 are different facts and the base rendered them identically.
 * 4. **The copy is the host's** — `formatDaysLeft`, `dismissLabel`.
 *
 * **There is still no `TrialBannerV2`/`V3`** — a strip this small has one
 * correct shape. This V4 is that shape, corrected. Renders nothing without a
 * `title`.
 */
export declare const TrialBannerV4: React.ForwardRefExoticComponent<TrialBannerV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TrialBannerV4.d.ts.map
import * as React from 'react';
import type { PremiumSummaryProps } from './PremiumSummary';
/** Same public contract as {@link PremiumSummary} — a drop-in alternate design. */
export type PremiumSummaryV3Props = PremiumSummaryProps;
/**
 * PremiumSummary, redesigned (**V3**) — **total-first and chrome-free**. The
 * amount due leads at the top in large type with its cadence; the itemized lines
 * follow as quiet secondary rows (discounts as `text-success` credits). The
 * total still defaults to the sum of `items`, so the headline can never disagree
 * with the breakdown. No card border — separation is spacing. Same
 * `PremiumSummaryProps` (integer cents, `loading` state); drops in for
 * `PremiumSummary`. Token-pure.
 */
export declare const PremiumSummaryV3: React.ForwardRefExoticComponent<PremiumSummaryProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PremiumSummaryV3.d.ts.map
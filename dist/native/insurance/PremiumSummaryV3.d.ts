import * as React from 'react';
import type { PremiumSummaryProps } from './PremiumSummary';
/** Drop-in replacement for {@link PremiumSummary} — identical props, distinct design. */
export type PremiumSummaryV3Props = PremiumSummaryProps;
/**
 * PremiumSummary, alternate design **V3** — total-first and chrome-free. The
 * amount due leads at the top in large type with its cadence; the itemized
 * lines follow as quiet secondary rows (discounts as `successText` credits).
 * The total still defaults to the sum of `items`, so the headline can never
 * disagree with the breakdown. No card border — separation is spacing. Same
 * `PremiumSummaryProps` (integer cents, `loading` state); drops in for
 * `PremiumSummary`. Token-pure.
 */
export declare function PremiumSummaryV3({ items, totalCents, cadence, currency, formatMoney: format, loading, style, }: PremiumSummaryV3Props): React.ReactElement;
//# sourceMappingURL=PremiumSummaryV3.d.ts.map
import * as React from 'react';
import type { PremiumSummaryProps } from './PremiumSummary';
/** Drop-in replacement for {@link PremiumSummary} — identical props, distinct design. */
export type PremiumSummaryV2Props = PremiumSummaryProps;
/**
 * PremiumSummary, alternate design **V2** — an elevated receipt. Line items are
 * laid out ledger-style with a hairline rule under each row (discounts as
 * `successText` credits with a leading `−`), then a full-width highlighted
 * **total band** — a tinted footer that makes the amount due the anchor. Total
 * defaults to the sum of `items` so it always reconciles. Same
 * `PremiumSummaryProps` (integer cents, `loading` state); drops in for
 * `PremiumSummary`. Token-pure.
 */
export declare function PremiumSummaryV2({ items, totalCents, cadence, currency, formatMoney: format, loading, style, }: PremiumSummaryV2Props): React.ReactElement;
//# sourceMappingURL=PremiumSummaryV2.d.ts.map
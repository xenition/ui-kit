import * as React from 'react';
import type { PremiumSummaryProps } from './PremiumSummary';
/** Same public contract as {@link PremiumSummary} — a drop-in alternate design. */
export type PremiumSummaryV2Props = PremiumSummaryProps;
/**
 * PremiumSummary, redesigned (**V2**) — an **elevated receipt**. Line items are
 * laid out ledger-style with a hairline rule under each row (discounts as
 * `text-success` credits with a leading `−`), then a full-width highlighted
 * **total band** — a tinted footer that makes the amount due the anchor. The
 * total defaults to the sum of `items`, so it always reconciles with the lines.
 * Same `PremiumSummaryProps` (integer cents, `loading` state); drops in for
 * `PremiumSummary`. Token-pure.
 */
export declare const PremiumSummaryV2: React.ForwardRefExoticComponent<PremiumSummaryProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PremiumSummaryV2.d.ts.map
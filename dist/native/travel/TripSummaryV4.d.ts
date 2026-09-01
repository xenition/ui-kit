import * as React from 'react';
import type { TripSummaryProps } from './TripSummary';
/** Drop-in for {@link TripSummaryProps} — same props, the V4 "journey" design. */
export type TripSummaryV4Props = TripSummaryProps;
/**
 * TripSummary — **V4** "journey" design. The boarding-pass recap: a
 * brand-gradient hero total up top (the grand total in near-white `journeyInk`
 * — the signature V4 lift), then the itemized line items on the clean surface
 * below, split from the hero by a dashed boarding-pass tear line. When
 * `totalCents` is omitted the total is summed from `items`. Money is integer
 * cents formatted through {@link formatMoney}. Same props/behavior as
 * {@link TripSummaryProps}; token-only colors via `useXenitionTheme()`.
 */
export declare function TripSummaryV4({ destination, dates, travelers, items, totalCents, currency, formatMoney: format, title, action, style, }: TripSummaryV4Props): React.ReactElement;
//# sourceMappingURL=TripSummaryV4.d.ts.map
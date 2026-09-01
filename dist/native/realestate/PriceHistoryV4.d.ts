import * as React from 'react';
import type { PriceHistoryProps } from './PriceHistory';
/** Drop-in for {@link PriceHistoryProps} — same props, the V4 "listing" design. */
export type PriceHistoryV4Props = PriceHistoryProps;
/**
 * PriceHistory — **V4** "listing" design. The editorial, price-forward take on a
 * listing's price-over-time card: the **latest price big**, the net change from
 * the first point (tinted `success` up / `danger` down / `muted` flat), and a
 * token-colored {@link Sparkline} of the series. Same props/behavior as
 * {@link PriceHistoryProps} — guards empty input with a muted note and never
 * indexes an empty array. Token-only colors via `useXenitionTheme()`; money uses
 * the shared `formatMoney`.
 */
export declare function PriceHistoryV4({ points, currency, title, chartHeight, style, }: PriceHistoryV4Props): React.ReactElement;
//# sourceMappingURL=PriceHistoryV4.d.ts.map
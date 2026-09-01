import * as React from 'react';
import type { PriceHistoryProps } from './PriceHistory';
/** Drop-in for {@link PriceHistoryProps} — same props, the V4 "listing" design. */
export type PriceHistoryV4Props = PriceHistoryProps;
/**
 * PriceHistory — **V4** "listing" design (web parity of the native V4). The
 * editorial, price-forward take on a listing's price-over-time card: the
 * **latest price big**, the net change from the first point (tinted `success`
 * up / `danger` down / `muted` flat), and a token-colored line/area chart of the
 * series with a dot on every point (the event markers). Same props/behavior as
 * {@link PriceHistoryProps} — guards empty input with a muted note and never
 * indexes an empty array. All colors from `--xen-*` token vars/classes (no
 * literals); money uses the shared `formatMoney`.
 */
export declare const PriceHistoryV4: React.ForwardRefExoticComponent<PriceHistoryProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PriceHistoryV4.d.ts.map
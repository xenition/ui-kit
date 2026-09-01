import * as React from 'react';
import type { PriceTickerProps } from './PriceTicker';
export interface PriceTickerV4Props extends PriceTickerProps {
    /** Wording for the movement. Defaults `up` / `down` / `unchanged`. */
    directionLabels?: {
        up?: string;
        down?: string;
        flat?: string;
    };
}
/**
 * **V4 price ticker** — same props as {@link PriceTicker} plus
 * `directionLabels`.
 *
 * ## Four changes
 *
 * 1. **A loss is announced as a loss.** The base built its spoken change as
 *    `` `${pct >= 0 ? 'up' : 'down'} ${formatPct(Math.abs(pct))}` `` — and
 *    `formatPct` re-applies the sign, so `Math.abs` guaranteed a `+` on a
 *    fall: "down +3.20%". `>= 0` also sent a flat `0` down the "up" branch
 *    while the glyph beside it drew `•`.
 * 2. **The row announces the price.** `"BTC price"` was the whole name, and it
 *    *replaced* the subtree — so the one number the component exists to show
 *    was never spoken. It is one line now: symbol, name, price, movement.
 * 3. **Loading is a ticker-shaped skeleton**, not a translucent slab of
 *    `border` that is a different colour on every ground it lands on.
 * 4. **The change reads as text.** `colors[changeToneKey(pct)]` handed back a
 *    fill slot for ink; the `*Text` slots are what carry a contrast promise.
 *    Press is a state layer, and the sparkline — which says nothing the name
 *    does not — is hidden from the reader.
 */
export declare function PriceTickerV4({ symbol, name, price, changePct, currencySymbol, priceDecimals, spark, variant, loading, directionLabels, onPress, style, }: PriceTickerV4Props): React.ReactElement | null;
//# sourceMappingURL=PriceTickerV4.d.ts.map
import * as React from 'react';
import type { MarketPriceRowProps, PriceDirection } from './MarketPriceRow';
export interface MarketPriceRowV4Props extends MarketPriceRowProps {
    /**
     * Format the change. Default `'+2.4%'` / `'-1.1%'` / `'0.0%'`.
     *
     * The base built the string inline with a hard-coded `toFixed(1)` and a
     * hand-written sign, so a host could not localize the decimal separator or
     * choose a different precision for a thinly-traded commodity.
     */
    formatChange?: (changePct: number, direction: PriceDirection) => string;
    /** Announced after the change, so direction is never colour alone. */
    directionLabels?: Partial<Record<PriceDirection, string>>;
}
/**
 * **V4 market price row** — the web twin of the native `MarketPriceRowV4`,
 * same props as {@link MarketPriceRow} plus `formatChange` and
 * `directionLabels`.
 *
 * ## Four changes
 *
 * 1. **Direction is not carried by colour alone.** The glyph was already
 *    there; the spoken label is new, so a screen reader says "up 2.4 percent"
 *    rather than reading a triangle.
 * 2. **The change is formattable** — see `formatChange`.
 * 3. **It is a row from the shared row line**, with the shared hover layer.
 * 4. **The price and the change are tabular**, which is the whole point of a
 *    column of prices.
 *
 * **Renders nothing without a `commodity`** (§4.5).
 */
export declare const MarketPriceRowV4: React.ForwardRefExoticComponent<MarketPriceRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MarketPriceRowV4.d.ts.map
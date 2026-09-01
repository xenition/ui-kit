import * as React from 'react';
import type { ExchangeRateRowProps } from './ExchangeRateRow';
export interface ExchangeRateRowV4Props extends ExchangeRateRowProps {
    /** BCP-47 locale for the rate and the change. Defaults to the runtime's. */
    locale?: string;
}
/**
 * **V4 exchange rate row** — same props as {@link ExchangeRateRow} plus
 * `locale`.
 *
 * ## Four changes
 *
 * 1. **A large `precision` no longer throws.** `Math.max(0, precision)`
 *    clamped the bottom and left the top open, so anything above 100 was a
 *    `RangeError` out of `toFixed` — an uncaught throw from a display row.
 *    `ratePrecision()` clamps both ends.
 * 2. **The rate is formatted through `Intl`.** `toFixed` hard-locks the
 *    decimal mark to `.`, so a de-DE app showed "1.234,56 EUR" beside
 *    "0.9184" — two number systems in one row.
 * 3. **A zero change is not a green gain.** `(changePct ?? 0) >= 0` painted a
 *    flat 0.00% in `success` with an up arrow. Zero has its own branch, no
 *    arrow and a neutral ink.
 * 4. **The row announces the change**, clears 44 from the shared row family,
 *    and draws its press as a state layer rather than `opacity: 0.7` — which
 *    dims content and so reads as *disabled*.
 */
export declare function ExchangeRateRowV4({ baseCurrency, quoteCurrency, rate, changePct, precision, locale, onPress, appearance, style, }: ExchangeRateRowV4Props): React.ReactElement;
//# sourceMappingURL=ExchangeRateRowV4.d.ts.map
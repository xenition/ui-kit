import * as React from 'react';
import type { DealForecastProps } from './DealForecast';
export interface DealForecastV4Props extends DealForecastProps {
    /** How the target figure is spelled. Default `formatMoney(cents, currency)`. */
    formatTarget?: (cents: number) => string;
    /** Caption over the attainment figure. Default `'vs target'`. */
    targetLabel?: string;
    /** Word shown and announced once quota is met. Default `'Target met'`. */
    attainedLabel?: string;
}
/**
 * **V4 deal forecast** — same props as {@link DealForecast} plus
 * `formatTarget`, `targetLabel` and `attainedLabel`.
 *
 * ## Four changes
 *
 * 1. **The target is actually shown.** `targetCents` is documented as "shown
 *    as a labelled reference" and was only ever divided into the total: a
 *    caller supplied a quota and saw a percentage and the words "vs target",
 *    never the quota itself. It now prints, through `formatTarget`.
 * 2. **Attainment is clamped.** The base divided raw, so a reversed period
 *    rendered a negative percent; `attainment()` clamps to 0-100.
 * 3. **Hitting quota is a word, not a colour.** Crossing 100% swapped the
 *    figure to `success` and said nothing else — invisible in greyscale, and
 *    silent to a reader. `attainedLabel` renders beside the figure and joins
 *    the block's accessible name.
 * 4. **The figures are tabular** and the empty state carries status semantics
 *    rather than being one muted line in a blank region.
 */
export declare function DealForecastV4({ periods, title, currency, targetCents, color, height, emptyLabel, formatTarget, targetLabel, attainedLabel, style, }: DealForecastV4Props): React.ReactElement;
//# sourceMappingURL=DealForecastV4.d.ts.map
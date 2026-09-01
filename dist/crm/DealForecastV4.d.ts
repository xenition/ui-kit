import * as React from 'react';
import type { DealForecastProps } from './DealForecast';
export interface DealForecastV4Props extends DealForecastProps {
    /** How the target figure is spelled. Defaults to `formatMoney`. */
    formatTarget?: (cents: number) => string;
    /** The words above the attainment figure. Default `'vs target'`. */
    targetLabel?: string;
    /** The word that appears once the quota is met. Default `'Target met'`. */
    attainedLabel?: string;
}
/**
 * **V4 deal forecast** — the web twin of the native `DealForecastV4`, same
 * props as {@link DealForecast} plus `formatTarget`, `targetLabel` and
 * `attainedLabel`.
 *
 * ## Four changes
 *
 * 1. **The target is finally shown.** `targetCents` is documented as "shown as
 *    a labelled reference" and was only ever used to compute a percentage: a
 *    caller supplied a quota and the block printed "78%" and the words "vs
 *    target" — never the quota itself, so there was nothing to check the
 *    percentage against. It is rendered now, through `formatTarget`.
 * 2. **Attainment is clamped.** The base divided raw, so a reversed period
 *    rendered a *negative* percent and a bumper quarter drew past the end of
 *    its own track. {@link attainment} clamps to 0–100.
 * 3. **Hitting quota is a word, not a colour.** Crossing the target was
 *    signalled by turning the figure green — colour alone, and green drawn with
 *    a **fill** token used as ink. `attainedLabel` renders beside the figure
 *    and joins the accessible sentence.
 * 4. **The total is tabular and the empty state is real** — a titled
 *    {@link EmptyStateV4} with status semantics, not a lone grey line where a
 *    chart should be.
 */
export declare const DealForecastV4: React.ForwardRefExoticComponent<DealForecastV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DealForecastV4.d.ts.map
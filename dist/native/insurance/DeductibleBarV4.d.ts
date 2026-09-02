import * as React from 'react';
import type { DeductibleBarProps } from './DeductibleBar';
export interface DeductibleBarV4Props extends DeductibleBarProps {
    /**
     * The whole caption once the ceiling is reached — not a suffix. Default
     * `'Deductible met'`.
     */
    metLabel?: string;
    /** Follows the remaining amount. Default `'to go'`. */
    toGoLabel?: string;
    /**
     * Follows the amount applied beyond the ceiling. Default
     * `'applied beyond the deductible'`.
     */
    overLabel?: string;
    /**
     * Shown when no usable ceiling was supplied — a policy with no deductible
     * recorded. Default `'No deductible recorded'`.
     */
    noCeilingLabel?: string;
}
/**
 * **V4 deductible bar** — same props as {@link DeductibleBar} plus `metLabel`,
 * `toGoLabel`, `overLabel` and `noCeilingLabel` (`formatMoney` is already on
 * the base).
 *
 * ## Five changes
 *
 * 1. **A policy with no deductible stops claiming the deductible is met.**
 *    `ratio = ceiling > 0 ? met / ceiling : 1` — so `deductibleCents={0}`, which
 *    is what a plan with no deductible sends, drew a **full green bar reading
 *    "Deductible met"** over "$0.00 / $0.00". The shared reader reports that
 *    case as `hasCeiling: false`, and the component draws no meter and no
 *    verdict, only what has been applied.
 * 2. **The meter and the caption agree.** The base passed `value={ratio * 100}`
 *    straight through, so `metCents={10000} deductibleCents={30000}` announced
 *    "33.33333333333333 percent" beside a caption that said 33%. `percent` is
 *    a whole number, computed once, and it is the number the progressbar
 *    reports and the number the caption prints.
 * 3. **Money applied beyond the ceiling is acknowledged.** $1,500 against a
 *    $1,000 deductible rendered "$1,000.00 / $1,000.00" and said nothing about
 *    the other $500 — a figure a policyholder is entitled to see, because it is
 *    what their next claim is measured from.
 * 4. **The bar is one named progressbar.** The label sat on a plain `View`
 *    with no `accessible`, so on iOS it was not a stop at all and the meter
 *    inside it reported a bare number with no name.
 * 5. **`warn` stops meaning "in progress".** An unmet deductible is the normal
 *    state of a policy in January, not a caution; toning it amber is how a
 *    product teaches people to ignore amber. In-progress is `primary`, met is
 *    `success` — a state colour for the one state that is actually a state.
 */
export declare function DeductibleBarV4({ metCents, deductibleCents, label, currency, metLabel, toGoLabel, overLabel, noCeilingLabel, formatMoney: format, style, }: DeductibleBarV4Props): React.ReactElement;
//# sourceMappingURL=DeductibleBarV4.d.ts.map
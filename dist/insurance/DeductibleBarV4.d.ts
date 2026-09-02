import * as React from 'react';
import type { DeductibleBarProps } from './DeductibleBar';
export interface DeductibleBarV4Props extends DeductibleBarProps {
    /** The whole caption once the ceiling is reached. Default `'Deductible met'`. */
    metLabel?: string;
    /** The words **after** the remaining amount. Default `'to go'`. */
    toGoLabel?: string;
    /**
     * The words **after** the amount applied past the ceiling. Default
     * `'applied beyond the deductible'`.
     */
    overLabel?: string;
    /**
     * The caption when no usable ceiling was supplied. Default
     * `'No deductible recorded'`.
     *
     * The string change 1 needs: with nothing to measure against there is no bar
     * and no percentage, and the line has to say *why* rather than fall back to
     * a sentence about progress.
     */
    noCeilingLabel?: string;
}
/**
 * **V4 deductible bar** — same props as {@link DeductibleBar} plus `metLabel`,
 * `toGoLabel` and `overLabel`.
 *
 * ## Four changes
 *
 * 1. **A policy with no deductible no longer reads as a deductible that has
 *    been met.** The base guarded a `<= 0` ceiling by setting `ratio = 1`, so
 *    `deductibleCents={0}` — which is what a plan with no deductible recorded,
 *    or a field that has not loaded, looks like — drew a **full green bar
 *    reading "Deductible met"**. That is a claim about money the holder does
 *    not owe. With no usable ceiling the bar is not drawn at all and the line
 *    says only what has been applied.
 * 2. **The meter and the caption are the same number.** `value={ratio * 100}`
 *    was announced as `33.33333333333333` while the caption beside it said
 *    33%; both now come from `deductibleParts`, whose `percent` is a whole
 *    number by construction.
 * 3. **Money applied beyond the ceiling is shown.** `metCents={150000}`
 *    against a `deductibleCents={100000}` displayed "$1,000.00 / $1,000.00"
 *    and never mentioned the extra $500 — the one figure the holder would have
 *    called about.
 * 4. **Every word is a prop**, and the caption is inked with `*-text` slots
 *    rather than `text-success` / `text-muted`, which are fills the compiler
 *    makes no contrast promise about as text.
 */
export declare const DeductibleBarV4: React.ForwardRefExoticComponent<DeductibleBarV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DeductibleBarV4.d.ts.map
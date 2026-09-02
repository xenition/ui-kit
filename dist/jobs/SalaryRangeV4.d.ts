import * as React from 'react';
import type { SalaryRangeProps } from './SalaryRange';
export interface SalaryRangeV4Props extends SalaryRangeProps {
    /**
     * Render one bound. Defaults to the module's compact formatter — `$120K`.
     *
     * Takes the amount in whole currency units, not cents: that is the shape
     * `Salary.min` / `Salary.max` already carry, and converting on the way in
     * would silently divide every existing caller's band by a hundred.
     */
    formatMoney?: (amount: number, currency?: string) => string;
    /** The suffix per cadence. Defaults to `'/yr'`, `'/hr'`, `'/mo'`. */
    periodLabels?: {
        year?: string;
        hour?: string;
        month?: string;
    };
    /**
     * Shown when bounds were supplied but none is usable — `NaN`, `Infinity`, a
     * negative wage. Default `'Salary range unavailable'`.
     *
     * Not the inverted case: `{min: 120000, max: 90000}` is *renderable*, and
     * `salaryParts` swaps the bounds so it reads forwards.
     */
    invalidLabel?: string;
}
/**
 * **V4 salary range** — same props as {@link SalaryRange} plus `formatMoney`,
 * `periodLabels` and `invalidLabel`.
 *
 * ## Four changes
 *
 * 1. **The salary was silent in Chrome and Firefox.** The base put the band's
 *    only accessible name on `role="text"`. That is not an ARIA role — it is a
 *    WebKit extension — so both other engines drop the role *and* the
 *    `aria-label` that hung off it, and the pay for the job was announced
 *    nowhere. There is no role here at all now: the band is ordinary text in
 *    an ordinary `<span>`, which is what a screen reader reads best and what a
 *    parent folds into its own name.
 * 2. **A band that runs backwards is no longer drawn backwards.**
 *    `{min: 120000, max: 90000}` rendered "$120K – $90K/yr" and repeated it in
 *    the label. `salaryParts` swaps the bounds, so the band reads forwards and
 *    renders — that is a correction, not an error state, and nothing extra is
 *    said beside it.
 * 3. **Undisclosed and broken are different sentences.** `formatSalary` tested
 *    `typeof min === 'number'`, which `NaN` and `Infinity` both pass; a
 *    negative bound printed "-$5K". All three are dropped — and a posting that
 *    offered bounds and had all of them dropped says `invalidLabel`, a fact
 *    about the data, rather than falling through to `emptyLabel`, a fact about
 *    the posting. The base could not tell them apart.
 * 4. **The empty hint stops being inked with a fill token.** `text-muted` is
 *    the decorative ramp slot the compiler makes no contrast promise about;
 *    "Salary not disclosed" is a sentence a reader has to read, so it takes
 *    `muted-text`.
 */
export declare const SalaryRangeV4: React.ForwardRefExoticComponent<SalaryRangeV4Props & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=SalaryRangeV4.d.ts.map
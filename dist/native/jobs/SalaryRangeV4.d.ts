import * as React from 'react';
import type { SalaryRangeProps } from './SalaryRange';
export interface SalaryRangeV4Props extends SalaryRangeProps {
    /** Render one bound. Default the module's compact money formatter. */
    formatMoney?: (amount: number, currency?: string) => string;
    /** Cadence suffixes. Default `/yr`, `/hr`, `/mo`. */
    periodLabels?: {
        year?: string;
        hour?: string;
        month?: string;
    };
    /**
     * Shown when bounds were supplied but none is usable — `NaN`, `Infinity`, a
     * negative wage. Default `'Salary range unavailable'`.
     */
    invalidLabel?: string;
}
/**
 * **V4 salary range** — same props as {@link SalaryRange} plus `formatMoney`,
 * `periodLabels` and `invalidLabel`.
 *
 * ## Four changes
 *
 * 1. **The band is spoken at all.** The base put its `accessibilityLabel` on a
 *    `View` that was never `accessible`, so the pay — the single fact a job
 *    seeker scans for — was silent on every screen in the module. The `View`
 *    is now `accessible`, which is the whole fix and the reason this file
 *    exists.
 * 2. **A band that runs backwards is no longer drawn backwards.**
 *    `formatSalary` tested `typeof min === 'number'`, which `NaN` passes, so
 *    `{min: 120000, max: 90000}` rendered "$120K – $90K/yr" and `{min: NaN}`
 *    rendered "From $NaN/yr" — with the accessible label repeating it.
 *    `salaryParts` validates: inverted bounds are swapped so the band reads
 *    forwards, and a band with nothing usable says `invalidLabel` instead of
 *    printing the arithmetic's failure.
 * 3. **Undisclosed and broken are different sentences.** "Salary not
 *    disclosed" is a fact about the posting; "Salary range unavailable" is a
 *    fact about the data. The base could not tell them apart.
 * 4. **`muted` was inking the text.** `muted` is a ramp step with no contrast
 *    promise — it is a fill. The empty hint now takes `mutedText`, the slot
 *    that is measured against the surface, and the 💰 is hidden from the
 *    reader because "money bag, ninety thousand dollars" is not the sentence.
 *
 * **Renders nothing without a `salary` and without an `emptyLabel`** (§4.5) —
 * a frame around no band is worse than no frame.
 */
export declare function SalaryRangeV4({ salary, size, format, emptyLabel, invalidLabel, formatMoney, periodLabels, glyph, style, }: SalaryRangeV4Props): React.ReactElement | null;
//# sourceMappingURL=SalaryRangeV4.d.ts.map
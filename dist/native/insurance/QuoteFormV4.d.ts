import * as React from 'react';
import { type MoneyFormatter } from '../../commerce/money';
import type { QuoteFormProps } from './QuoteForm';
export interface QuoteFormV4Props extends QuoteFormProps {
    /**
     * Format the deductible choices. Default: the kit-wide `formatMoney`, which
     * every other component in this module already funnels through.
     */
    formatMoney?: MoneyFormatter;
    /** BCP-47 locale for the default money formatter and the amount parser. */
    locale?: string;
    /**
     * Shown under the coverage field when what was typed is not an amount.
     *
     * Default `'Enter an amount, for example 25,000'`. The base read anything
     * unparseable as `0` and disabled the submit with no explanation, which is
     * indistinguishable from a form that has stopped working.
     */
    invalidAmountLabel?: string;
}
/**
 * **V4 quote form** — same props as {@link QuoteForm} plus `formatMoney`,
 * `locale` and `invalidAmountLabel`.
 *
 * ## Four changes
 *
 * 1. **`1000,50` no longer asks for $100,050 of cover.** `toCents` stripped
 *    everything but digits and dots and then `parseFloat`ed the remains, so a
 *    comma-decimal locale had its separator deleted and its digits
 *    concatenated. The parser is separator-aware now — see
 *    {@link parseAmountToCents} — and, where the base read anything
 *    unparseable as a silent `0`, it rejects and the field says so with
 *    `invalidAmountLabel`. It stays inside this file rather than moving to a
 *    shared pure module, so both twins land without a third file appearing
 *    under either of them mid-flight.
 * 2. **A prefill that arrives from a fetch reaches the field.** `coverageCents`
 *    seeded `React.useState` and was never read again, so the visible input
 *    kept the old text while `effCoverage` submitted the new number: the screen
 *    showed one figure and the request carried another. The text follows the
 *    controlled prop.
 * 3. **The deductible labels come from the module's money home.** They were
 *    built inline as `(c / 100).toLocaleString(undefined, { style: 'currency',
 *    currency })` — a second, private spelling of money in a module whose whole
 *    contract is that every amount goes through one formatter. With
 *    `currency="JPY"` that label and the `deductibleCents` payload beside it
 *    disagreed by 100×, and no `formatMoney` override existed to correct it.
 *    There is one now, and a `locale` for the default.
 * 4. **Every control clears 44** and the form is built from the V4 field line,
 *    so its focus ring, its error ink and its press layer are the ones the rest
 *    of the kit uses rather than the base primitives' own.
 *
 * The field labels stay English on both twins. They are not in the shared prop
 * table, and a `labels` bag on one twin only would be the parity break this
 * line exists to avoid.
 */
export declare function QuoteFormV4({ variants, deductibleOptions, variant: variantProp, coverageCents: coverageProp, deductibleCents: deductibleProp, currency, submitLabel, loading, locale, invalidAmountLabel, formatMoney: format, onChange, onSubmit, style, }: QuoteFormV4Props): React.ReactElement;
//# sourceMappingURL=QuoteFormV4.d.ts.map
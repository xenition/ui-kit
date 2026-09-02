import * as React from 'react';
import type { MoneyFormatter } from './internal/format';
import type { QuoteFormProps } from './QuoteForm';
export interface QuoteFormV4Props extends QuoteFormProps {
    /** Override the cents → string formatter used in the deductible options. */
    formatMoney?: MoneyFormatter;
    /**
     * BCP-47 locale. Decides how a typed amount is read as well as how the
     * deductible options are printed — the two were allowed to disagree.
     */
    locale?: string;
    /** Shown when the coverage field holds something that is not an amount. */
    invalidAmountLabel?: string;
}
/**
 * **V4 quote form** — same props as {@link QuoteForm} plus `formatMoney`,
 * `locale` and `invalidAmountLabel`.
 *
 * ## Four changes
 *
 * 1. **`1000,50` no longer quotes $100,050.** `toCents` stripped everything
 *    but digits and dots and `parseFloat`ed the remainder, so a comma decimal
 *    mark — the majority of the world — multiplied the coverage by a hundred,
 *    and the form submitted that number while the field on screen still read
 *    `1000,50`. The parse is now separator-aware and takes the caller's
 *    `locale`; text that is not an amount is reported rather than silently
 *    read as `0`.
 * 2. **A prefill that arrives after mount reaches the field.** `coverageCents`
 *    seeded `useState` once and was never read again, so a quote fetched into
 *    a controlled form left the input showing the old text while submitting
 *    the new number — the two most important values on the screen disagreeing
 *    with nobody able to see it. The displayed text is now derived: the
 *    typist's own keystrokes while they agree with the prop, the prop's value
 *    the moment it does not.
 * 3. **A blocked submit says why.** The button went `disabled` with no message
 *    — the base's own comment called it "a no-op" — so a user who typed a
 *    coverage the parse rejected saw a dead button and no reason. The field
 *    now carries the error, and the button's `aria-describedby` points at it.
 * 4. **The controls clear 44 and focus with `ring-ring`.** Nothing in the
 *    module cleared the tap floor, and the ring was `ring-primary-300` — a
 *    ramp step that ignores the seed and mirrors under `[data-theme="dark"]`.
 */
export declare const QuoteFormV4: React.ForwardRefExoticComponent<QuoteFormV4Props & React.RefAttributes<HTMLFormElement>>;
//# sourceMappingURL=QuoteFormV4.d.ts.map
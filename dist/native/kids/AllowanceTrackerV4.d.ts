import * as React from 'react';
import type { AllowanceTrackerProps } from './AllowanceTracker';
export interface AllowanceTrackerV4Props extends AllowanceTrackerProps {
    /** Format an amount in whole currency units. Default: `Intl.NumberFormat`. */
    formatMoney?: (amount: number, currency?: string) => string;
    /** BCP-47 locale for the default formatter. Default: the runtime's own. */
    locale?: string;
    /** Copy for the five labelled parts. */
    labels?: {
        balance?: string;
        earned?: string;
        spent?: string;
        add?: string;
        spend?: string;
    };
}
/**
 * **V4 allowance tracker** — same props as {@link AllowanceTracker} plus
 * `formatMoney`, `locale` and `labels`.
 *
 * ## Five changes
 *
 * 1. **Money is formatted, not concatenated.** The base built every amount as
 *    `` `${currency}${amount.toLocaleString()}` ``, so `balance={-5}` printed
 *    **`$-5`** — the sign wedged between the symbol and the digits — and
 *    `5.5` printed `$5.5` rather than `$5.50`. `formatMoney` from
 *    `commerce/money` handles a real ISO code; a bare symbol falls back to a
 *    localised number with the symbol in front and the sign in front of *that*.
 *    A `formatMoney` override and a `locale` are both accepted.
 * 2. **The savings meter draws what it announces.** The base computed a clamped
 *    percentage and then used it **only as a truthiness gate**, handing the raw
 *    `balance` and `target` to the bar — so a balance of −20 against a $100
 *    goal announced `valuenow=-20` against `valuemin=0`. `meterParts` gives the
 *    bar a clamped ratio and the readout the untouched number, which are two
 *    different jobs the base was doing with one variable.
 * 3. **A goal of nought still shows the balance.** `target={0}` used to remove
 *    the whole goal block; now the goal line renders with the reading and no
 *    meter, because the money in the wallet is real either way.
 * 4. **Spending is not an error.** The base inked spent-this-period in
 *    `colors.danger`. A child buying something with their own allowance has not
 *    caused a fault; the direction is carried by the `−` in front of the
 *    amount and by the word above it. Earned keeps `successText`, which is a
 *    genuine positive event.
 * 5. **The card is a card.** It painted `surface` — the page colour — so it
 *    never read as raised, and its skeleton painted `colors.border`, the
 *    hairline colour used as a fill. Both are tokens now (`card`/`onCard`,
 *    `skeletonFill`), and the actions clear the 44 tap floor.
 */
export declare function AllowanceTrackerV4({ balance, currency, earned, spent, goal, loading, emptyLabel, formatMoney, locale, labels, onAdd, onWithdraw, style, }: AllowanceTrackerV4Props): React.ReactElement;
//# sourceMappingURL=AllowanceTrackerV4.d.ts.map
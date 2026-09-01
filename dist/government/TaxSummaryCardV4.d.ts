import * as React from 'react';
import type { TaxStatus, TaxSummaryCardProps } from './TaxSummaryCard';
export interface TaxSummaryCardV4Props extends TaxSummaryCardProps {
    /** Override the five status words — `'Balance due'`, `'Overdue'`, … */
    statusLabels?: Partial<Record<TaxStatus, string>>;
    /** What the due date is called. Default `'Due'`. */
    dueLabel?: string;
    /** How "Pay now" names itself once armed. Default `'Confirm payment'`. */
    confirmPayLabel?: string;
}
/**
 * **V4 tax summary** — the web twin of the native `TaxSummaryCardV4`, same
 * props as {@link TaxSummaryCard} plus `statusLabels`, `dueLabel` and
 * `confirmPayLabel`.
 *
 * ## Five changes
 *
 * 1. **The due date stops being an afterthought.** It was a muted 12px line —
 *    the same size and colour as the "Paid" caption — with nothing at all
 *    linking it to `overdue`, on the one component whose whole job is to say
 *    when money is owed. It is now a labelled pair, it takes the weight and the
 *    ink its consequence deserves once the account is overdue, and it is what
 *    the overdue announcement leads with.
 * 2. **Overdue announces.** `overdue` is an adverse state by
 *    {@link isAdverse}, and the base had no live region anywhere. The sentence
 *    reaches a polite region one commit after mount, because a live region
 *    announces *changes* and text present at first paint is read by nobody.
 * 3. **Paying takes a confirming press.** "Pay now" was one tap on a ~32px
 *    target with no confirm and no pending state; it arms first, renames
 *    itself, and disarms on blur. It also clears 44.
 * 4. **The amounts are ink, not fills.** `text-success` and `text-danger` are
 *    the *fill* slots and carry no contrast promise as words — the figure a
 *    taxpayer reads takes `success-text` / `danger-text`. The leading disc's
 *    glyph likewise stops being the fill drawn on a tint of itself.
 * 5. **Balance, Paid and Due are label/value pairs**, not sibling spans that
 *    happen to sit above one another — so a reader hears "Balance, $1,240.00"
 *    rather than two disconnected readings — and `filed` stops wearing the
 *    brand colour beside a green Paid.
 */
export declare const TaxSummaryCardV4: React.ForwardRefExoticComponent<TaxSummaryCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TaxSummaryCardV4.d.ts.map
import * as React from 'react';
import type { TaxStatus, TaxSummaryCardProps } from './TaxSummaryCard';
export interface TaxSummaryCardV4Props extends TaxSummaryCardProps {
    /** Override the five status words (`'Balance due'`, `'Overdue'`, …). */
    statusLabels?: Partial<Record<TaxStatus, string>>;
    /** What the due date is called. Default `'Due'`. */
    dueLabel?: string;
    /** What the pay button says once it is armed. Default `'Confirm payment'`. */
    confirmPayLabel?: string;
}
/**
 * **V4 tax summary** — same props as {@link TaxSummaryCard} plus
 * `statusLabels`, `dueLabel` and `confirmPayLabel`.
 *
 * ## Five changes
 *
 * 1. **The due date is not an afterthought.** It was a muted `xs` line — the
 *    same size and colour as the "Paid" caption — with nothing linking it to
 *    `overdue`, on a card whose entire consequence is that date. It joins the
 *    spoken name, and on an overdue account it takes the danger ink and a
 *    weight that matches what missing it costs.
 * 2. **Overdue announces.** `isAdverse('overdue')` is true and the base said
 *    it only by tinting a pill; the status line is an assertive live region
 *    now, so an account that goes overdue while the screen is open is heard.
 * 3. **Paying takes a confirming press**, and the button clears 44 —
 *    "Pay now" was one tap on a ~34pt target with no confirm and no pending
 *    state.
 * 4. **The amounts take the contrast-corrected ink.** `colors.success` and
 *    `colors.danger` are *fill* slots with no contrast promise as text, and
 *    the headline balance was drawn in them at `xl`. The card's summary is
 *    also one announced object, which it could not be before without
 *    swallowing the Pay button — so the name sits on the text region and the
 *    button is its sibling.
 * 5. **Having filed is not an outcome.** `filed` was `primary` — a brand
 *    colour on a record of what you did, sitting beside `overdue`, which is a
 *    warning about what you owe. It is `IDENTITY_TONE`, and the disc it tints
 *    follows it.
 */
export declare function TaxSummaryCardV4({ taxYear, taxType, status, amountCents, paidCents, dueDate, currency, formatMoney: format, statusLabels, dueLabel, confirmPayLabel, onPay, style, }: TaxSummaryCardV4Props): React.ReactElement;
//# sourceMappingURL=TaxSummaryCardV4.d.ts.map
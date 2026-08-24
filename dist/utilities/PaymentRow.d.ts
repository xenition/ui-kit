import * as React from 'react';
import { type MoneyFormatter } from './internal/format';
import { type PaymentState } from './internal/status';
export type { PaymentState };
export interface PaymentRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** Amount of the payment in integer **cents**. */
    amountCents: number;
    /** Localized date string (already formatted by the caller). */
    date: string;
    /** Settlement state — conveyed by text + glyph + color. */
    status: PaymentState;
    /** Payment method label (e.g. "Visa ···4242", "Bank ···1881"). */
    method?: string;
    /** Reference / confirmation number. */
    reference?: string;
    /** ISO 4217 currency code (default `USD`). */
    currency?: string;
    /** Override the cents → string formatter (locale control). */
    formatMoney?: MoneyFormatter;
    /** Fires on row click (e.g. open receipt); becomes a button when supplied. */
    onClick?: () => void;
}
/**
 * One line in a payment history: a tinted state glyph disc, a method/date stack,
 * a right-aligned amount, and a status pill. The state is conveyed redundantly
 * (glyph + label + a color that traces to a semantic token: paid → success,
 * failed → danger) so it is never color-alone. A refunded/failed amount is shown
 * muted with a strike so it reads as non-current at a glance. Amount is integer
 * cents via `formatMoney`. Becomes a `role="button"` row only when `onClick` is
 * supplied. Web parity of the native `PaymentRow`.
 */
export declare const PaymentRow: React.ForwardRefExoticComponent<PaymentRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PaymentRow.d.ts.map
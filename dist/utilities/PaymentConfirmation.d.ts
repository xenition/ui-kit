import * as React from 'react';
import { type MoneyFormatter } from './internal/format';
export interface PaymentConfirmationProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /** Amount paid, in integer **cents**. */
    amountCents: number;
    /** ISO 4217 currency code (default `USD`). */
    currency?: string;
    /** Confirmation / receipt number to display. */
    confirmationNumber?: string;
    /** Method the payment was made with (e.g. "Visa •••• 4242"). */
    method?: string;
    /** Localized payment date string. */
    date?: string;
    /** Override the cents → string formatter. */
    formatMoney?: MoneyFormatter;
    /** Headline (default "Payment successful"). */
    title?: string;
    /** Fires on the primary "Done" action. */
    onDone?: () => void;
    /** Fires on the "View receipt" action. */
    onViewReceipt?: () => void;
}
/**
 * The payment success surface (web parity) — the module's peak moment and the
 * one full brand-gradient ground beyond the account header. A frosted check
 * badge, the headline, and the paid amount (integer cents via `formatMoney`)
 * sit centered in near-white ink over the gradient; the confirmation #, method,
 * and date read as frosted rows (`bg-primary-500`). "Done" (a near-white
 * `bg-on-primary text-primary` pill) and "View receipt" (a ghost button) each
 * appear only when their handler is set. Every color derives from the brand
 * ramp — token-only, no literals.
 */
export declare const PaymentConfirmation: React.ForwardRefExoticComponent<PaymentConfirmationProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PaymentConfirmation.d.ts.map
import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type MoneyFormatter } from './internal/format';
export interface PaymentConfirmationProps {
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
    style?: StyleProp<ViewStyle>;
}
/**
 * The payment success surface — the module's peak moment and the one full
 * brand-gradient ground beyond the account header. A frosted check badge, the
 * headline, and the paid amount (integer cents via `formatMoney`) sit centered
 * in near-white ink over the gradient; the confirmation #, method, and date read
 * as frosted rows. "Done" (a near-white pill) and "View receipt" (a ghost
 * button) each appear only when their handler is set. Every color derives from
 * the brand ramp — no literals, light + dark.
 */
export declare function PaymentConfirmation({ amountCents, currency, confirmationNumber, method, date, formatMoney: format, title, onDone, onViewReceipt, style, }: PaymentConfirmationProps): React.ReactElement;
//# sourceMappingURL=PaymentConfirmation.d.ts.map
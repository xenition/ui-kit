import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type MoneyFormatter } from './internal/format';
import { type PaymentState } from './internal/status';
export type { PaymentState };
export interface PaymentRowProps {
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
    /** Fires on row press (e.g. open receipt); becomes a button when supplied. */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * One line in a payment history: a tinted state glyph disc, a method/date stack,
 * a right-aligned amount, and a status pill. The state is conveyed redundantly
 * (glyph + label + a color that traces to a `SemanticColors` slot: paid →
 * success, failed → danger) so it is never color-alone. A refunded/failed amount
 * is shown muted with a strike so it reads as non-current at a glance. Amount is
 * integer cents via `formatMoney`. Becomes a button only when `onPress` is
 * supplied.
 */
export declare function PaymentRow({ amountCents, date, status, method, reference, currency, formatMoney: format, onPress, style, }: PaymentRowProps): React.ReactElement;
//# sourceMappingURL=PaymentRow.d.ts.map
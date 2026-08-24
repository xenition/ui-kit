import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type MoneyFormatter } from './internal/format';
/** Settlement state of a tax account for a period. */
export type TaxStatus = 'owed' | 'refund' | 'paid' | 'overdue' | 'filed';
export interface TaxSummaryCardProps {
    /** Tax year / period label (e.g. "2025" or "Q2 2026"). */
    taxYear: string;
    /** Kind of tax (e.g. "Property tax", "Income tax"). */
    taxType?: string;
    /** Account settlement status (default `owed`). */
    status?: TaxStatus;
    /** Primary amount in integer **cents** — balance due or refund total. */
    amountCents: number;
    /** Amount already paid this period, in integer **cents**. */
    paidCents?: number;
    /** Localized due date (already formatted). */
    dueDate?: string;
    /** ISO 4217 currency code (default `USD`). */
    currency?: string;
    /** Override the cents → string formatter (locale control). */
    formatMoney?: MoneyFormatter;
    /** Fires "Pay now" (shown only for owed / overdue balances). */
    onPay?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A tax-account summary for one period: the settlement status conveyed by
 * **text + glyph + color** (never color alone), the primary balance / refund as
 * integer cents through `formatMoney`, an optional amount-paid line, and a
 * gated "Pay now" action for owed / overdue balances. The headline amount is
 * toned success for a refund and danger when overdue. Every color traces to a
 * `SemanticColors` slot or a token-derived tint — no literals.
 */
export declare function TaxSummaryCard({ taxYear, taxType, status, amountCents, paidCents, dueDate, currency, formatMoney: format, onPay, style, }: TaxSummaryCardProps): React.ReactElement;
//# sourceMappingURL=TaxSummaryCard.d.ts.map
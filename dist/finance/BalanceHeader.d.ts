import * as React from 'react';
import { type MoneyFormatter } from '../commerce/money';
export interface BalanceHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Caption above the figure (default `Total balance`). */
    label?: string;
    /** Headline balance in integer **cents**. */
    balanceCents: number;
    /** ISO 4217 currency code (default `USD`). */
    currency?: string;
    /** Period-over-period change in **cents**; tints + arrow (income/expense tone). */
    changeCents?: number;
    /** Optional percentage change shown beside the change amount. */
    changePct?: number;
    /** Optional trend series for a compact sparkline under the figure. */
    trend?: number[];
    /** Override the cents → string formatter (locale control). */
    formatMoney?: MoneyFormatter;
    /** Show a loading placeholder instead of the figure. */
    loading?: boolean;
}
/**
 * The hero balance block for an account/wallet screen: a muted label, a large
 * token-scaled figure, an optional up/down change (colored `text-success` /
 * `text-danger`), and an optional {@link Sparkline}. The balance is integer
 * cents (formatted to two decimals, no drift); the change tone derives from its
 * sign. All colors trace to tokens. Web parity of the native `BalanceHeader`.
 */
export declare const BalanceHeader: React.ForwardRefExoticComponent<BalanceHeaderProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=BalanceHeader.d.ts.map
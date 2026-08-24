import * as React from 'react';
import { type MoneyFormatter } from './internal/format';
export interface BudgetBillRowProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Row heading (default "Budget billing"). */
    label?: string;
    /** The level (averaged) monthly charge in integer **cents**. */
    monthlyCents: number;
    /**
     * Running settle-up balance in integer **cents**. Positive = a credit the
     * account carries; negative = a shortfall owed at reconciliation.
     */
    balanceCents?: number;
    /** Actual charges to date in integer **cents** (for the plan-vs-actual bar). */
    actualToDateCents?: number;
    /** Planned charges to date in integer **cents** (bar denominator). */
    plannedToDateCents?: number;
    /** Localized next-review date (e.g. "Reviews in Nov"). */
    reviewDate?: string;
    /** ISO 4217 currency code (default `USD`). */
    currency?: string;
    /** Override the cents → string formatter (locale control). */
    formatMoney?: MoneyFormatter;
}
/**
 * A levelized ("budget billing") summary row: the flat monthly charge, a
 * settle-up balance shown as a **signed credit/shortfall** (credit → success,
 * shortfall → danger, conveyed by sign + label + color, never color alone), and
 * an optional plan-vs-actual progress bar. The bar denominator is guarded
 * against zero. All amounts are integer cents via `formatMoney`, so nothing
 * drifts. Every color traces to a `--xen-*` token. Web parity of the native
 * `BudgetBillRow`.
 */
export declare const BudgetBillRow: React.ForwardRefExoticComponent<BudgetBillRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=BudgetBillRow.d.ts.map
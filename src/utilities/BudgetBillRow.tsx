import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card, Icon, Progress, type ProgressTone } from '../primitives';
import { formatMoney, type MoneyFormatter } from './internal/format';

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
export const BudgetBillRow = React.forwardRef<HTMLDivElement, BudgetBillRowProps>(function BudgetBillRow(
  {
    label = 'Budget billing',
    monthlyCents,
    balanceCents,
    actualToDateCents,
    plannedToDateCents,
    reviewDate,
    currency = 'USD',
    formatMoney: format = formatMoney,
    className,
    ...rest
  },
  ref
) {
  const monthly = Math.max(0, Math.trunc(monthlyCents || 0));
  const balance = balanceCents != null && Number.isFinite(balanceCents) ? Math.trunc(balanceCents) : null;
  const isCredit = balance != null && balance >= 0;

  const planned = plannedToDateCents != null ? Math.max(0, Math.trunc(plannedToDateCents)) : 0;
  const actual = actualToDateCents != null ? Math.max(0, Math.trunc(actualToDateCents)) : 0;
  const showBar = planned > 0;
  const overPlan = actual > planned;
  const barTone: ProgressTone = overPlan ? 'warn' : 'primary';

  return (
    <Card ref={ref} className={className} {...rest}>
      <div className="flex items-center gap-[var(--xen-space-md)]">
        <Icon glyph="📅" size="lg" aria-label="Budget billing" />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-base font-bold text-on-surface">{label}</span>
          {reviewDate != null ? <span className="text-xs text-muted">{reviewDate}</span> : null}
        </div>
        <div className="flex flex-col items-end gap-0.5">
          <span className="text-lg font-bold text-on-surface">{format(monthly, currency)}</span>
          <span className="text-xs text-muted">per month</span>
        </div>
      </div>

      {balance != null ? (
        <div className="mt-[var(--xen-space-md)] flex items-center justify-between">
          <span className="text-sm text-muted">{isCredit ? 'Account credit' : 'Settle-up balance'}</span>
          <span className={cn('text-sm font-bold', isCredit ? 'text-success' : 'text-danger')}>
            {isCredit ? '' : '−'}
            {format(Math.abs(balance), currency)}
          </span>
        </div>
      ) : null}

      {showBar ? (
        <div className="mt-[var(--xen-space-md)] flex flex-col gap-[var(--xen-space-xs)]">
          <Progress value={Math.min(actual, planned * 1.5)} max={planned} tone={barTone} size="sm" />
          <span className="text-xs text-muted">
            {format(actual, currency)} actual vs {format(planned, currency)} planned
          </span>
        </div>
      ) : null}
    </Card>
  );
});

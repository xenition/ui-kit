import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, Progress, type ProgressTone } from '../primitives';
import { formatMoney } from './internal/format';
import type { BudgetBillRowProps } from './BudgetBillRow';

/** Drop-in for {@link BudgetBillRowProps} — same props, a different design. */
export type BudgetBillRowV4Props = BudgetBillRowProps;

/**
 * BudgetBillRow — **V4** design. A clean, elevated row: the budget-billing glyph
 * in the signature brand-gradient disc, the flat monthly charge, a settle-up
 * balance shown as a signed credit/shortfall (credit → success, shortfall →
 * danger, by sign + label + color, never color alone), and an optional
 * plan-vs-actual progress bar (denominator guarded against zero). All amounts are
 * integer cents via `formatMoney`. Same props/behavior as
 * {@link BudgetBillRowProps}; token-only colors.
 */
export const BudgetBillRowV4 = React.forwardRef<HTMLDivElement, BudgetBillRowV4Props>(
  function BudgetBillRowV4(
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
      <div
        ref={ref}
        className={cn(
          'rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-lg p-5',
          className
        )}
        {...rest}
      >
        <div className="flex items-center gap-[var(--xen-space-md)]">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] bg-gradient-to-br from-primary-400 to-primary-700">
            <Icon glyph="📅" size="xl" color="onPrimary" aria-label="Budget billing" />
          </span>
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
      </div>
    );
  }
);

import * as React from 'react';
import { cn } from '../primitives/cn';
import { Meter } from './internal/Meter';
import { MoneyAmount } from './MoneyAmount';
import { formatMoney, type MoneyFormatter } from '../commerce/money';

export interface BudgetBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Category / budget name. */
  label: string;
  /** Amount spent so far, in integer **cents**. */
  spentCents: number;
  /** Budget ceiling, in integer **cents**. */
  limitCents: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Override the cents → string formatter (locale control). */
  formatMoney?: MoneyFormatter;
}

/**
 * A labelled budget progress bar: spent-of-limit with a {@link Meter} fill
 * whose tone shifts as the budget is consumed — `success` under 75%, `warn`
 * from 75–100%, `danger` once over. Amounts are integer cents (two-decimal, no
 * drift) and the "remaining / over" line is a signed {@link MoneyAmount}.
 * `limitCents <= 0` is guarded (ratio pinned, no divide-by-zero). Token-bound
 * throughout. Web parity of the native `BudgetBar`.
 */
export const BudgetBar = React.forwardRef<HTMLDivElement, BudgetBarProps>(function BudgetBar(
  { label, spentCents, limitCents, currency = 'USD', formatMoney: format = formatMoney, className, ...rest },
  ref
) {
  const spent = Number.isFinite(spentCents) ? Math.max(Math.trunc(spentCents), 0) : 0;
  const limit = Number.isFinite(limitCents) ? Math.trunc(limitCents) : 0;
  const ratio = limit > 0 ? spent / limit : spent > 0 ? 1 : 0;
  const remaining = limit - spent; // positive = left, negative = over

  const fillColor = ratio > 1 ? 'danger' : ratio >= 0.75 ? 'warn' : 'success';

  return (
    <div ref={ref} className={cn('flex flex-col gap-[var(--xen-space-xs)]', className)} {...rest}>
      <div className="flex items-baseline justify-between">
        <span className="min-w-0 flex-1 truncate text-sm font-semibold text-on-surface">{label}</span>
        <span className="text-xs text-muted">
          {format(spent, currency)} / {format(limit, currency)}
        </span>
      </div>
      <Meter
        value={ratio * 100}
        color={fillColor}
        aria-label={`${label}, ${Math.round(ratio * 100)}% of budget used`}
      />
      <div className="flex items-center gap-[var(--xen-space-xs)]">
        <span className="text-xs text-muted">{remaining >= 0 ? 'Remaining' : 'Over budget'}</span>
        <MoneyAmount
          cents={remaining}
          currency={currency}
          tone={remaining >= 0 ? 'muted' : 'expense'}
          size="sm"
          signDisplay="never"
          className="text-xs font-semibold"
        />
      </div>
    </div>
  );
});

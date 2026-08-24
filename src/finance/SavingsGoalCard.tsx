import * as React from 'react';
import { Card } from '../primitives/Card';
import { ProgressRing } from '../charts/ProgressRing';
import { MoneyAmount } from './MoneyAmount';
import { formatMoney, type MoneyFormatter } from '../commerce/money';
import type { FinanceColor } from './internal/Meter';

export interface SavingsGoalCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Goal name (e.g. "Emergency fund"). */
  title: string;
  /** Amount saved so far, in integer **cents**. */
  savedCents: number;
  /** Target amount, in integer **cents**. */
  targetCents: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Optional target-date caption (already localized). */
  deadline?: string;
  /** Token color slot for the progress ring (default `success`). */
  color?: FinanceColor;
  /** Override the cents → string formatter (locale control). */
  formatMoney?: MoneyFormatter;
}

/**
 * A savings-goal tile: a {@link ProgressRing} showing percent-to-target beside
 * a saved / target breakdown and an optional deadline. Progress is
 * `savedCents / targetCents` (guarded against a non-positive target), amounts
 * are integer cents through {@link MoneyAmount}, and the "to go" figure is the
 * remaining cents. Token-bound throughout. Web parity of the native
 * `SavingsGoalCard`.
 */
export const SavingsGoalCard = React.forwardRef<HTMLDivElement, SavingsGoalCardProps>(
  function SavingsGoalCard(
    { title, savedCents, targetCents, currency = 'USD', deadline, color = 'success', formatMoney: format = formatMoney, className, ...rest },
    ref
  ) {
    const saved = Number.isFinite(savedCents) ? Math.max(Math.trunc(savedCents), 0) : 0;
    const target = Number.isFinite(targetCents) ? Math.trunc(targetCents) : 0;
    const pct = target > 0 ? Math.min(saved / target, 1) : 0;
    const remaining = Math.max(target - saved, 0);

    return (
      <Card ref={ref} className={className} {...rest}>
        <div className="flex items-center gap-[var(--xen-space-lg)]">
          <ProgressRing
            value={pct * 100}
            max={100}
            size={84}
            thickness={9}
            color={color}
            aria-label={`${title}, ${Math.round(pct * 100)}% saved`}
          />
          <div className="flex min-w-0 flex-1 flex-col gap-[var(--xen-space-xs)]">
            <p className="truncate text-base font-bold text-on-surface">{title}</p>
            <div className="flex items-baseline gap-[var(--xen-space-xs)]">
              <MoneyAmount cents={saved} currency={currency} tone="neutral" size="md" />
              <span className="text-sm text-muted">/ {format(target, currency)}</span>
            </div>
            <p className="text-xs text-muted">
              {format(remaining, currency)} to go{deadline != null ? ` · by ${deadline}` : ''}
            </p>
          </div>
        </div>
      </Card>
    );
  }
);

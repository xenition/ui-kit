import * as React from 'react';
import { Card } from '../primitives/Card';
import { ProgressRing } from '../charts/ProgressRing';
import { MoneyAmount } from './MoneyAmount';
import { formatMoney } from '../commerce/money';
import type { SavingsGoalCardProps } from './SavingsGoalCard';

/** Same public contract as {@link SavingsGoalCard} — a drop-in alternate design. */
export type SavingsGoalCardV2Props = SavingsGoalCardProps;

/**
 * SavingsGoalCard, redesigned (v2): a **big ProgressRing hero**. A large,
 * percent-labeled ring is centered at the top, with the title, the saved /
 * target line, and the "to go" caption stacked and centered beneath it — a
 * focused, single-goal spotlight. Distinct at a glance from the base's small
 * ring beside a left-aligned block. Same props, guarded target, integer cents.
 */
export const SavingsGoalCardV2 = React.forwardRef<HTMLDivElement, SavingsGoalCardV2Props>(
  function SavingsGoalCardV2(
    { title, savedCents, targetCents, currency = 'USD', deadline, color = 'success', formatMoney: format = formatMoney, className, ...rest },
    ref
  ) {
    const saved = Number.isFinite(savedCents) ? Math.max(Math.trunc(savedCents), 0) : 0;
    const target = Number.isFinite(targetCents) ? Math.trunc(targetCents) : 0;
    const pct = target > 0 ? Math.min(saved / target, 1) : 0;
    const remaining = Math.max(target - saved, 0);

    return (
      <Card ref={ref} className={className} {...rest}>
        <div className="flex flex-col items-center gap-[var(--xen-space-md)] text-center">
          <ProgressRing
            value={pct * 100}
            max={100}
            size={132}
            thickness={12}
            color={color}
            aria-label={`${title}, ${Math.round(pct * 100)}% saved`}
          />
          <div className="flex min-w-0 flex-col items-center gap-[var(--xen-space-xs)]">
            <p className="truncate text-lg font-bold text-on-surface">{title}</p>
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

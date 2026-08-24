import * as React from 'react';
import { Card, Button, Progress } from '../primitives';
import { EmptyState } from '../commerce';

export interface AllowanceGoal {
  /** What the child is saving for, e.g. "New bike". */
  label: string;
  /** Target amount. */
  target: number;
}

export interface AllowanceTrackerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current wallet balance. `NaN`/undefined renders the empty state. */
  balance: number;
  /** Currency symbol prefix. */
  currency?: string;
  /** Amount earned this period. */
  earned?: number;
  /** Amount spent this period. */
  spent?: number;
  /** Optional savings goal; drives a progress bar from `balance`→`target`. */
  goal?: AllowanceGoal;
  /** Loading placeholder state. */
  loading?: boolean;
  /** Copy shown when there is no balance set. */
  emptyLabel?: string;
  /** Fires to add funds / give allowance. */
  onAdd?: () => void;
  /** Fires to withdraw / spend. */
  onWithdraw?: () => void;
}

function fmt(currency: string, amount: number): string {
  return `${currency}${amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}

/**
 * A child's allowance wallet: a headline balance, an earned/spent split, an
 * optional savings-goal progress bar, and add/withdraw actions. Renders the
 * shared {@link EmptyState} when no balance is set. Earned/spent carry `+`/`−`
 * signs alongside their token color, so the split reads without color alone.
 * Token-bound throughout — no literal colors.
 */
export const AllowanceTracker = React.forwardRef<HTMLDivElement, AllowanceTrackerProps>(
  function AllowanceTracker(
    { balance, currency = '$', earned, spent, goal, loading = false, emptyLabel = 'No allowance set up yet', onAdd, onWithdraw, className, ...rest },
    ref
  ) {
    if (loading) {
      return (
        <Card ref={ref} data-xen-allowance-tracker="" aria-label="Loading allowance" className={className} {...rest}>
          <div className="space-y-2">
            <div className="h-3 w-1/3 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-200" />
            <div className="h-7 w-1/2 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-200" />
          </div>
        </Card>
      );
    }

    if (!Number.isFinite(balance)) {
      return (
        <EmptyState
          ref={ref}
          data-xen-allowance-tracker=""
          aria-label={emptyLabel}
          className={className}
          icon={<span className="text-3xl">🐷</span>}
          title="Allowance"
          description={emptyLabel}
          {...rest}
        />
      );
    }

    const goalPct =
      goal && goal.target > 0 ? Math.max(0, Math.min(100, (balance / goal.target) * 100)) : undefined;

    return (
      <Card ref={ref} data-xen-allowance-tracker="" aria-label={`Balance ${fmt(currency, balance)}`} className={className} {...rest}>
        <div>
          <p className="text-xs text-muted">Balance</p>
          <p className="text-3xl font-extrabold text-on-surface">{fmt(currency, balance)}</p>
        </div>

        {typeof earned === 'number' || typeof spent === 'number' ? (
          <div className="mt-3 flex gap-8">
            {typeof earned === 'number' ? (
              <div>
                <p className="text-xs text-muted">Earned</p>
                <p className="text-base font-bold text-success">{`+${fmt(currency, earned)}`}</p>
              </div>
            ) : null}
            {typeof spent === 'number' ? (
              <div>
                <p className="text-xs text-muted">Spent</p>
                <p className="text-base font-bold text-danger">{`−${fmt(currency, spent)}`}</p>
              </div>
            ) : null}
          </div>
        ) : null}

        {goal && goalPct !== undefined ? (
          <div className="mt-3 space-y-1.5">
            <div className="flex justify-between">
              <span className="text-sm font-semibold text-on-surface">🎯 {goal.label}</span>
              <span className="text-xs text-muted">
                {fmt(currency, balance)} / {fmt(currency, goal.target)}
              </span>
            </div>
            <Progress value={balance} max={goal.target} tone="success" />
          </div>
        ) : null}

        {onAdd || onWithdraw ? (
          <div className="mt-3 flex gap-2">
            {onAdd ? (
              <Button size="sm" variant="primary" className="flex-1" onClick={() => onAdd()}>
                Add
              </Button>
            ) : null}
            {onWithdraw ? (
              <Button size="sm" variant="outline" className="flex-1" onClick={() => onWithdraw()}>
                Spend
              </Button>
            ) : null}
          </div>
        ) : null}
      </Card>
    );
  }
);

import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives';
import { ProgressRing } from '../charts/ProgressRing';
import { EmptyState } from '../commerce';
import type { AllowanceTrackerProps } from './AllowanceTracker';

/** Same public contract as {@link AllowanceTracker} — a drop-in alternate design. */
export type AllowanceTrackerV2Props = AllowanceTrackerProps;

function fmt(currency: string, amount: number): string {
  return `${currency}${amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}

/**
 * AllowanceTracker, redesigned (v2): a **wallet hero card**. A big centered
 * balance leads; the savings goal renders as a circular ring medallion showing
 * percent to target; earned and spent sit in two tinted stat pills below;
 * Add/Spend anchor the card. Elevated. Distinct from v1's stacked layout. Same
 * props, same empty state, token-only.
 */
export const AllowanceTrackerV2 = React.forwardRef<HTMLDivElement, AllowanceTrackerV2Props>(
  function AllowanceTrackerV2(
    { balance, currency = '$', earned, spent, goal, loading = false, emptyLabel = 'No allowance set up yet', onAdd, onWithdraw, className, ...rest },
    ref
  ) {
    if (loading) {
      return (
        <div
          ref={ref}
          data-xen-allowance-tracker=""
          aria-label="Loading allowance"
          className={cn('flex flex-col items-center gap-3 rounded-lg bg-surface p-md shadow-md', className)}
          {...rest}
        >
          <div className="h-8 w-1/2 animate-pulse rounded-sm bg-neutral-200" />
          <div className="h-16 w-16 animate-pulse rounded-full bg-neutral-200" />
        </div>
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

    const pct = goal && goal.target > 0 ? Math.min(100, Math.round((balance / goal.target) * 100)) : null;

    return (
      <div
        ref={ref}
        data-xen-allowance-tracker=""
        className={cn('flex flex-col items-center gap-3 rounded-lg bg-surface p-md text-center shadow-md', className)}
        {...rest}
      >
        <div>
          <p className="text-xs uppercase tracking-wide text-muted">Balance</p>
          <p className="text-3xl font-bold text-on-surface">{fmt(currency, balance)}</p>
        </div>

        {goal && pct !== null ? (
          <div className="flex flex-col items-center gap-1">
            <ProgressRing value={pct} max={100} size={92} thickness={10} color="primary" showValue />
            <p className="text-xs text-muted">
              {goal.label} · {fmt(currency, goal.target)}
            </p>
          </div>
        ) : null}

        <div className="grid w-full grid-cols-2 gap-2">
          <div className="rounded-md bg-success/10 px-3 py-2">
            <p className="text-xs text-muted">Earned</p>
            <p className="text-sm font-bold text-success">+{fmt(currency, earned ?? 0)}</p>
          </div>
          <div className="rounded-md bg-danger/10 px-3 py-2">
            <p className="text-xs text-muted">Spent</p>
            <p className="text-sm font-bold text-danger">−{fmt(currency, spent ?? 0)}</p>
          </div>
        </div>

        {(onAdd || onWithdraw) ? (
          <div className="flex w-full gap-2">
            {onAdd ? (
              <Button size="md" variant="primary" className="flex-1" onClick={onAdd}>
                Add
              </Button>
            ) : null}
            {onWithdraw ? (
              <Button size="md" variant="outline" className="flex-1" onClick={onWithdraw}>
                Spend
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
);

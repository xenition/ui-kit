import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives';
import { EmptyState } from '../commerce';
import type { AllowanceTrackerProps } from './AllowanceTracker';

/** Same public contract as {@link AllowanceTracker} — a drop-in alternate design. */
export type AllowanceTrackerV3Props = AllowanceTrackerProps;

function fmt(currency: string, amount: number): string {
  return `${currency}${amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}

/**
 * AllowanceTracker, redesigned (v3): a **compact balance row**. A piggy glyph, a
 * tiny "Balance" caption over the figure, an optional goal-percent chip, and a
 * small Add/Spend pair — all on one dense line for embedding in a list. The
 * opposite of v2's tall hero card. Same props, same empty state, token-only.
 */
export const AllowanceTrackerV3 = React.forwardRef<HTMLDivElement, AllowanceTrackerV3Props>(
  function AllowanceTrackerV3(
    { balance, currency = '$', earned, spent, goal, loading = false, emptyLabel = 'No allowance set up yet', onAdd, onWithdraw, className, ...rest },
    ref
  ) {
    void earned;
    void spent;

    if (loading) {
      return (
        <div
          ref={ref}
          data-xen-allowance-tracker=""
          aria-label="Loading allowance"
          className={cn('flex items-center gap-3 rounded-md border border-border p-3', className)}
          {...rest}
        >
          <div className="h-8 w-8 animate-pulse rounded-full bg-neutral-200" />
          <div className="h-4 w-24 animate-pulse rounded-sm bg-neutral-200" />
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
        className={cn('flex items-center gap-3 rounded-md border border-border p-3', className)}
        {...rest}
      >
        <span aria-hidden className="text-2xl leading-none">
          🐷
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs uppercase tracking-wide text-muted">Balance</p>
          <p className="text-lg font-bold text-on-surface">{fmt(currency, balance)}</p>
        </div>
        {pct !== null ? (
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">{pct}%</span>
        ) : null}
        {onAdd ? (
          <Button size="sm" variant="primary" onClick={onAdd}>
            Add
          </Button>
        ) : null}
        {onWithdraw ? (
          <Button size="sm" variant="ghost" onClick={onWithdraw}>
            Spend
          </Button>
        ) : null}
      </div>
    );
  }
);

import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives';
import { formatMoney } from '../commerce';
import { StatusPill } from './StatusPill';
import { RETAINER_STATUS_META, type RetainerStatus } from './internal';
import type { RetainerBalanceProps } from './RetainerBalance';

/** Same public contract as {@link RetainerBalance} — a drop-in alternate design. */
export type RetainerBalanceV3Props = RetainerBalanceProps;

function derive(balance: number, low: number): RetainerStatus {
  if (balance <= 0) return 'depleted';
  if (low > 0 && balance <= low) return 'low';
  return 'healthy';
}

/**
 * RetainerBalance, redesigned (v3): a **compact trust row**. The matter label over
 * the balance, an inline status word, and a small Replenish when low — hairline-
 * bordered for a matter list. The opposite of v2's card. Same props, token-only.
 */
export const RetainerBalanceV3 = React.forwardRef<HTMLDivElement, RetainerBalanceV3Props>(
  function RetainerBalanceV3({ balanceCents, initialCents, lowThresholdCents = 0, currency = 'USD', status, label, loading = false, variant, onReplenish, testID, className, ...rest }, ref) {
    void variant;
    void initialCents;
    if (loading) {
      return <div ref={ref} data-xen-retainer-balance="" data-testid={testID} aria-label="Loading retainer" className={cn('flex items-center gap-3 border-b border-border py-2.5', className)} {...rest}><div className="h-3 w-2/5 animate-pulse rounded-sm bg-neutral-100" /></div>;
    }
    const st = status ?? derive(balanceCents, lowThresholdCents);
    const showReplenish = onReplenish && (st === 'low' || st === 'depleted');

    return (
      <div ref={ref} data-xen-retainer-balance="" data-testid={testID} className={cn('flex items-center gap-3 border-b border-border py-2.5', className)} {...rest}>
        <div className="min-w-0 flex-1">
          {label ? <p className="truncate text-xs text-muted">{label}</p> : null}
          <p className="text-lg font-bold text-on-surface">{formatMoney(balanceCents, currency)}</p>
        </div>
        <StatusPill meta={RETAINER_STATUS_META[st]} variant="inline" size="sm" />
        {showReplenish ? <Button size="sm" variant="ghost" onClick={onReplenish}>Replenish</Button> : null}
      </div>
    );
  }
);

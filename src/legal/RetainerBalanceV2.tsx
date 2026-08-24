import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives';
import { formatMoney } from '../commerce';
import { StatusPill } from './StatusPill';
import { RETAINER_STATUS_META, clampPct, type RetainerStatus } from './internal';
import type { RetainerBalanceProps } from './RetainerBalance';

/** Same public contract as {@link RetainerBalance} — a drop-in alternate design. */
export type RetainerBalanceV2Props = RetainerBalanceProps;

function derive(balance: number, low: number): RetainerStatus {
  if (balance <= 0) return 'depleted';
  if (low > 0 && balance <= low) return 'low';
  return 'healthy';
}

/**
 * RetainerBalance, redesigned (v2): an **elevated trust card**. The matter label
 * and a status pill head a big balance figure, a fill meter against the initial
 * retainer, and a Replenish CTA when low/depleted. Distinct from v1. Same props,
 * token-only.
 */
export const RetainerBalanceV2 = React.forwardRef<HTMLDivElement, RetainerBalanceV2Props>(
  function RetainerBalanceV2({ balanceCents, initialCents, lowThresholdCents = 0, currency = 'USD', status, label, loading = false, variant, onReplenish, testID, className, ...rest }, ref) {
    void variant;
    if (loading) {
      return <div ref={ref} data-xen-retainer-balance="" data-testid={testID} aria-label="Loading retainer" className={cn('h-28 animate-pulse rounded-lg bg-neutral-100', className)} {...rest} />;
    }
    const st = status ?? derive(balanceCents, lowThresholdCents);
    const pct = typeof initialCents === 'number' && initialCents > 0 ? clampPct((balanceCents / initialCents) * 100) : null;
    const showReplenish = onReplenish && (st === 'low' || st === 'depleted');

    return (
      <div ref={ref} data-xen-retainer-balance="" data-testid={testID} className={cn('flex flex-col gap-3 rounded-lg bg-surface p-md shadow-sm', className)} {...rest}>
        <div className="flex items-center justify-between">
          {label ? <p className="text-sm font-semibold text-on-surface">{label}</p> : <span />}
          <StatusPill meta={RETAINER_STATUS_META[st]} size="sm" />
        </div>
        <div>
          <p className="text-3xl font-bold text-on-surface">{formatMoney(balanceCents, currency)}</p>
          {typeof initialCents === 'number' ? <p className="text-xs text-muted">of {formatMoney(initialCents, currency)} initial</p> : null}
        </div>
        {pct !== null ? (
          <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-100" role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100}>
            <div className={cn('h-full rounded-full', st === 'depleted' ? 'bg-danger' : st === 'low' ? 'bg-warn' : 'bg-success')} style={{ width: `${pct}%` }} />
          </div>
        ) : null}
        {showReplenish ? <Button size="md" variant="primary" className="w-full" onClick={onReplenish}>Replenish</Button> : null}
      </div>
    );
  }
);

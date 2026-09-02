import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives';
import { StatusPill } from './StatusPill';
import { RETAINER_STATUS_META, clampPct, formatMoney, toneBgClass, type RetainerStatus } from './internal';
import type { RetainerBalanceProps } from './RetainerBalance';

/** Drop-in for {@link RetainerBalanceProps} — same props, the V4 "chambers" design. */
export type RetainerBalanceV4Props = RetainerBalanceProps;

function deriveStatus(balanceCents: number, low: number): RetainerStatus {
  if (balanceCents <= 0) return 'depleted';
  if (balanceCents <= low) return 'low';
  return 'healthy';
}

/**
 * RetainerBalance — **V4** "chambers" design (web parity of the native V4). The
 * distinguished, chambers take on a trust / retainer meter: an elevated rounded
 * card with a soft shadow, a big legible **tabular-nums** balance (money carried
 * as integer cents through the shared `formatMoney`), a labelled glyph + word
 * health pill (never color alone), a fill meter against the initial retainer, and
 * a "Replenish" action when funds run low. Status is derived from the balance vs.
 * a low-water threshold unless overridden. Exposes an ARIA `progressbar`. Reuses
 * the base `variant` (`default` / `compact`). All colors from `--xen-*` token
 * classes (no literals).
 */
export const RetainerBalanceV4 = React.forwardRef<HTMLDivElement, RetainerBalanceV4Props>(function RetainerBalanceV4(
  { balanceCents, initialCents, lowThresholdCents = 0, currency = 'USD', status, label, loading = false, variant = 'default', onReplenish, testID, className, ...rest },
  ref
) {
  const compact = variant === 'compact';
  const resolved = status ?? deriveStatus(balanceCents, lowThresholdCents);
  const statusMeta = RETAINER_STATUS_META[resolved];
  const fillClass = toneBgClass(statusMeta.tone);
  const pct = initialCents && initialCents > 0 ? clampPct(Math.round((Math.max(0, balanceCents) / initialCents) * 100)) : undefined;
  const showReplenish = onReplenish && (resolved === 'low' || resolved === 'depleted');
  const shell = 'rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm';

  if (loading) {
    return (
      <div
        ref={ref}
        data-testid={testID}
        data-xen-retainer-balance=""
        aria-label="Loading retainer"
        aria-busy="true"
        className={cn(shell, 'flex flex-col gap-[var(--xen-space-sm)] p-[var(--xen-space-lg)]', className)}
        {...rest}
      >
        <div className="h-3 w-2/5 rounded-[var(--xen-radius-sm)] bg-neutral-100" />
        <div className="h-6 w-3/5 rounded-[var(--xen-radius-sm)] bg-neutral-100" />
        <div className="h-2 w-full rounded-full bg-neutral-100" />
      </div>
    );
  }

  return (
    <div
      ref={ref}
      data-testid={testID}
      data-xen-retainer-balance=""
      className={cn(shell, 'flex flex-col gap-[var(--xen-space-md)]', compact ? 'p-[var(--xen-space-md)]' : 'p-[var(--xen-space-lg)]', className)}
      {...rest}
    >
      <div className="flex items-start justify-between gap-[var(--xen-space-sm)]">
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted">{label ?? 'Retainer balance'}</span>
          <span className="text-3xl font-bold tabular-nums text-on-surface">{formatMoney(balanceCents, currency)}</span>
          {!compact && initialCents ? (
            <span className="text-xs tabular-nums text-muted">of {formatMoney(initialCents, currency)} initial</span>
          ) : null}
        </div>
        <StatusPill meta={statusMeta} variant="soft" size="sm" />
      </div>

      {pct != null ? (
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
          aria-label={`${statusMeta.label}, ${pct}% remaining`}
          className="h-2.5 w-full overflow-hidden rounded-full bg-neutral-100"
        >
          <div className={cn('h-full rounded-full', fillClass)} style={{ width: `${pct}%` }} />
        </div>
      ) : null}

      {showReplenish ? (
        <Button size="sm" variant="primary" className="self-start" onClick={onReplenish}>
          Replenish
        </Button>
      ) : null}
    </div>
  );
});

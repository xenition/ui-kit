import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card, Button } from '../primitives';
import { StatusPill } from './StatusPill';
import {
  RETAINER_STATUS_META,
  clampPct,
  formatMoney,
  toneBgClass,
  type RetainerStatus,
} from './internal';

export type RetainerBalanceVariant = 'default' | 'compact';

export interface RetainerBalanceProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current trust / retainer balance in integer **cents**. */
  balanceCents: number;
  /**
   * Original / target retainer in integer **cents** — the meter denominator.
   * When omitted the meter is hidden and only the balance is shown.
   */
  initialCents?: number;
  /**
   * Low-balance threshold in integer **cents**. At or below it the status is
   * derived as `low`; at/below zero, `depleted`.
   */
  lowThresholdCents?: number;
  /** ISO 4217 currency (default USD). */
  currency?: string;
  /** Explicit status override — otherwise derived from balance vs. threshold. */
  status?: RetainerStatus;
  /** Client / matter label. */
  label?: string;
  /** Render a placeholder skeleton instead of content. */
  loading?: boolean;
  /** Density. */
  variant?: RetainerBalanceVariant;
  /** Render a "Replenish" action (shown when low / depleted). */
  onReplenish?: () => void;
  testID?: string;
}

function deriveStatus(balanceCents: number, low: number): RetainerStatus {
  if (balanceCents <= 0) return 'depleted';
  if (balanceCents <= low) return 'low';
  return 'healthy';
}

/**
 * Trust / retainer balance meter: the current balance carried as integer
 * **cents** and rendered through the shared `formatMoney`, a fill meter against
 * the initial retainer, and a health pill (glyph + word so status never rests on
 * color alone). Status is derived from the balance vs. a low-water threshold
 * unless explicitly overridden. A "Replenish" action surfaces when funds run
 * low. Exposes an ARIA `progressbar`. All colors are `--xen-*` token classes.
 */
export const RetainerBalance = React.forwardRef<HTMLDivElement, RetainerBalanceProps>(
  function RetainerBalance(
    {
      balanceCents,
      initialCents,
      lowThresholdCents = 0,
      currency = 'USD',
      status,
      label,
      loading = false,
      variant = 'default',
      onReplenish,
      testID,
      className,
      ...rest
    },
    ref
  ) {
    const compact = variant === 'compact';
    const resolved = status ?? deriveStatus(balanceCents, lowThresholdCents);
    const statusMeta = RETAINER_STATUS_META[resolved];
    const fillClass = toneBgClass(statusMeta.tone);

    const pct =
      initialCents && initialCents > 0
        ? clampPct(Math.round((Math.max(0, balanceCents) / initialCents) * 100))
        : undefined;

    const showReplenish = onReplenish && (resolved === 'low' || resolved === 'depleted');

    return (
      <Card
        ref={ref}
        data-testid={testID}
        className={cn(
          'flex flex-col gap-[var(--xen-space-sm)]',
          compact && 'p-[var(--xen-space-md)]',
          className
        )}
        {...rest}
      >
        {loading ? (
          <div aria-label="Loading retainer" className="flex flex-col gap-[var(--xen-space-xs)]">
            <div className="h-3 w-2/5 rounded-[var(--xen-radius-sm)] bg-neutral-100" />
            <div className="h-6 w-3/5 rounded-[var(--xen-radius-sm)] bg-neutral-100" />
            <div className="h-2 w-full rounded-full bg-neutral-100" />
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between gap-[var(--xen-space-sm)]">
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="text-xs font-semibold text-muted">
                  {label ?? 'Retainer balance'}
                </span>
                <span className="text-2xl font-bold text-on-surface">
                  {formatMoney(balanceCents, currency)}
                </span>
                {!compact && initialCents ? (
                  <span className="text-xs text-muted">
                    of {formatMoney(initialCents, currency)} initial
                  </span>
                ) : null}
              </div>
              <StatusPill meta={statusMeta} size="sm" />
            </div>

            {pct != null ? (
              <div
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={pct}
                aria-label={`${statusMeta.label}, ${pct}% remaining`}
                className="h-2 w-full overflow-hidden rounded-full bg-border"
              >
                <div
                  className={cn('h-full rounded-full', fillClass)}
                  style={{ width: `${pct}%` }}
                />
              </div>
            ) : null}

            {showReplenish ? (
              <Button size="sm" variant="primary" className="self-start" onClick={onReplenish}>
                Replenish
              </Button>
            ) : null}
          </>
        )}
      </Card>
    );
  }
);

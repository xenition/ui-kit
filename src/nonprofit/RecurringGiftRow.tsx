import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, type BadgeTone } from '../primitives/Badge';
import { Icon } from '../primitives/Icon';
import { Button } from '../primitives/Button';
import { formatMoney } from './internal';

/** Cadence of a recurring gift. */
export type GiftFrequency = 'weekly' | 'monthly' | 'quarterly' | 'yearly';
/** Lifecycle of a recurring gift. */
export type RecurringGiftStatus = 'active' | 'paused' | 'canceled';

export interface RecurringGiftRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Per-cycle amount, integer **cents**. */
  amountCents: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Billing cadence. */
  frequency: GiftFrequency;
  /** Program / fund name the gift supports. */
  fund?: string;
  /** Pre-formatted next-charge label (e.g. `Next: Sep 1`). */
  nextChargeLabel?: string;
  /** Current status (default `active`). */
  status?: RecurringGiftStatus;
  /** Fires when an active gift is paused. */
  onPause?: () => void;
  /** Fires when a paused gift is resumed. */
  onResume?: () => void;
  /** Fires when the gift is canceled (rendered when provided). */
  onCancel?: () => void;
  /** Block the action buttons (web `Button` has no `loading`, so they disable). */
  loading?: boolean;
}

const FREQ_LABEL: Record<GiftFrequency, string> = {
  weekly: '/week',
  monthly: '/month',
  quarterly: '/quarter',
  yearly: '/year',
};

const STATUS_TONE: Record<RecurringGiftStatus, BadgeTone> = {
  active: 'success',
  paused: 'warn',
  canceled: 'neutral',
};

/**
 * Web parity of the native `RecurringGiftRow`: a managed recurring-gift row —
 * the per-cycle amount (integer cents → `formatMoney`) with its cadence suffix,
 * the supported fund, a next-charge hint, a status badge, and pause / resume /
 * cancel controls appropriate to the status. Status is carried by badge text +
 * the row `aria-label`, not color alone. All colors come from the `--xen-*`
 * token classes — no literal colors.
 */
export const RecurringGiftRow = React.forwardRef<HTMLDivElement, RecurringGiftRowProps>(
  function RecurringGiftRow(
    {
      amountCents,
      currency = 'USD',
      frequency,
      fund,
      nextChargeLabel,
      status = 'active',
      onPause,
      onResume,
      onCancel,
      loading = false,
      className,
      ...rest
    },
    ref
  ) {
    const statusLabel = status.charAt(0).toUpperCase() + status.slice(1);

    return (
      <div
        ref={ref}
        aria-label={`${formatMoney(amountCents, currency)} ${FREQ_LABEL[frequency]} recurring gift, ${statusLabel}`}
        className={cn(
          'flex flex-col gap-sm rounded-md border border-border bg-surface p-md',
          className
        )}
        {...rest}
      >
        <div className="flex items-center gap-sm">
          <Icon glyph="🔁" size="base" color="muted" />
          <div className="flex flex-1 items-baseline gap-xs">
            <span className="text-lg font-extrabold text-on-surface">{formatMoney(amountCents, currency)}</span>
            <span className="text-sm text-muted">{FREQ_LABEL[frequency]}</span>
          </div>
          <Badge tone={STATUS_TONE[status]}>{statusLabel}</Badge>
        </div>

        {fund ? <span className="text-sm text-on-surface">{fund}</span> : null}
        {nextChargeLabel && status === 'active' ? (
          <span className="text-sm text-muted">{nextChargeLabel}</span>
        ) : null}

        {status !== 'canceled' ? (
          <div className="flex gap-sm">
            {status === 'active' ? (
              <Button size="sm" variant="outline" disabled={loading} onClick={onPause}>
                Pause
              </Button>
            ) : (
              <Button size="sm" variant="primary" disabled={loading} onClick={onResume}>
                Resume
              </Button>
            )}
            {onCancel ? (
              <Button size="sm" variant="ghost" disabled={loading} onClick={onCancel}>
                Cancel
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
);

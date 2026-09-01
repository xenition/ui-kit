import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, type BadgeTone } from '../primitives/Badge';
import { Icon } from '../primitives/Icon';
import { Button } from '../primitives/Button';
import { formatMoney } from './internal';
import type { GiftFrequency, RecurringGiftRowProps, RecurringGiftStatus } from './RecurringGiftRow';

/** Drop-in for {@link RecurringGiftRowProps} — same props, the V4 "rally" design. */
export type RecurringGiftRowV4Props = RecurringGiftRowProps;

const FREQ: Record<GiftFrequency, { label: string; glyph: string }> = {
  weekly: { label: '/week', glyph: '📅' },
  monthly: { label: '/month', glyph: '🗓️' },
  quarterly: { label: '/quarter', glyph: '📆' },
  yearly: { label: '/year', glyph: '🎂' },
};

const STATUS: Record<RecurringGiftStatus, { tone: BadgeTone; label: string; glyph: string }> = {
  active: { tone: 'success', label: 'Active', glyph: '🔁' },
  paused: { tone: 'warn', label: 'Paused', glyph: '⏸️' },
  canceled: { tone: 'neutral', label: 'Canceled', glyph: '🚫' },
};

/**
 * RecurringGiftRow — **V4** "rally" design (web parity of the native V4). An
 * elevated, rounded managed recurring-gift row on a clean surface (no gradient):
 * a leading cadence glyph in a soft-primary well, the bold per-cycle amount
 * (integer cents → `formatMoney`) with its cadence suffix, a glyph + labelled
 * status {@link Badge} (never color alone), a frequency chip, the supported fund,
 * a next-charge hint, and pause / resume / cancel controls appropriate to the
 * status. Honors every `frequency` (weekly/monthly/quarterly/yearly) and
 * `status` (active/paused/canceled). Identical props/behavior to
 * {@link RecurringGiftRowProps}. All colors from `--xen-*` token classes (no
 * literals).
 */
export const RecurringGiftRowV4 = React.forwardRef<HTMLDivElement, RecurringGiftRowV4Props>(
  function RecurringGiftRowV4(
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
    const freq = FREQ[frequency];
    const statusMeta = STATUS[status];

    return (
      <div
        ref={ref}
        aria-label={`${formatMoney(amountCents, currency)} ${freq.label} recurring gift, ${statusMeta.label}`}
        className={cn(
          'flex flex-col gap-sm rounded-lg border border-border bg-surface text-on-surface shadow-md p-md',
          className
        )}
        {...rest}
      >
        <div className="flex items-center gap-md">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <Icon glyph={freq.glyph} size="lg" aria-hidden />
          </span>
          <div className="flex flex-1 items-baseline gap-xs">
            <span className="text-lg font-extrabold text-on-surface">{formatMoney(amountCents, currency)}</span>
            <span className="text-sm text-muted">{freq.label}</span>
          </div>
          <Badge tone={statusMeta.tone} variant="soft">
            <Icon glyph={statusMeta.glyph} size="xs" aria-hidden />
            {statusMeta.label}
          </Badge>
        </div>

        <div className="flex flex-wrap items-center gap-sm">
          <span className="inline-flex items-center gap-xs rounded-full bg-primary/10 px-sm py-px text-sm text-primary">
            <Icon glyph={freq.glyph} size="xs" aria-hidden />
            {`Every ${freq.label.replace('/', '')}`}
          </span>
          {fund ? <span className="text-sm text-on-surface">{fund}</span> : null}
        </div>

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

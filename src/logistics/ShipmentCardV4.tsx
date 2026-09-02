import * as React from 'react';
import { cn } from '../primitives/cn';
import { CarrierBadge } from './CarrierBadge';
import { Badge } from '../primitives/Badge';
import { SHIPMENT_META, TONE_TEXT, pressableProps } from './internal';
import type { ShipmentCardProps } from './ShipmentCard';

/**
 * Drop-in for {@link ShipmentCardProps} — same props, the V4 "dispatch" design.
 * Reuses the base `variant` (`default` = full card, `compact` = dense row).
 */
export type ShipmentCardV4Props = ShipmentCardProps;

/**
 * ShipmentCard — **V4** "dispatch" design (web parity of the native V4). The
 * confident, operations-desk take on a shipment: an elevated rounded card with a
 * soft shadow, the tracking-number headline, a labelled glyph + word status
 * badge (never color alone), a soft-primary meta strip carrying the
 * `CarrierBadge` + piece count, an origin→destination lane, and an ETA line.
 * Clickable when `onClick` is set (keyboard-operable button). Honors the V4
 * `variant` — `full` (card, default) and `compact` (a dense single row) —
 * identical props/behavior to {@link ShipmentCardProps}. All colors from
 * `--xen-*` token classes (no literals).
 */
export const ShipmentCardV4 = React.forwardRef<HTMLDivElement, ShipmentCardV4Props>(function ShipmentCardV4(
  {
    trackingNumber,
    recipient,
    origin,
    destination,
    status,
    carrier,
    service,
    eta,
    pieces,
    variant = 'default',
    loading = false,
    onClick,
    className,
    ...rest
  },
  ref
) {
  const meta = SHIPMENT_META[status] ?? SHIPMENT_META.draft;
  const shell = 'rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm';

  if (loading) {
    return (
      <div
        ref={ref}
        data-xen-shipment-card=""
        aria-label="Loading shipment"
        aria-busy="true"
        className={cn(shell, 'flex flex-col gap-[var(--xen-space-md)] p-[var(--xen-space-lg)]', className)}
        {...rest}
      >
        <div className="h-4 w-3/5 rounded-[var(--xen-radius-sm)] bg-neutral-100" />
        <div className="h-3 w-2/5 rounded-[var(--xen-radius-sm)] bg-neutral-100" />
        <div className="h-8 w-full rounded-[var(--xen-radius-md)] bg-neutral-100" />
      </div>
    );
  }

  const interactive = pressableProps(onClick);
  const a11y = `Shipment ${trackingNumber}, ${meta.label}`;
  const statusBadge = (
    <Badge tone={meta.tone} variant="soft" size="sm">
      <span aria-hidden="true">{meta.glyph}</span> {meta.label}
    </Badge>
  );

  // ── compact: dense single row ──
  if (variant === 'compact') {
    return (
      <div
        ref={ref}
        data-xen-shipment-card=""
        aria-label={interactive ? a11y : undefined}
        className={cn(
          shell,
          'flex items-center gap-[var(--xen-space-sm)] p-[var(--xen-space-sm)]',
          interactive &&
            'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
          className
        )}
        {...interactive}
        {...rest}
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] bg-primary/10 text-base">
          <span aria-hidden="true">🚚</span>
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate text-sm font-bold text-on-surface">{trackingNumber}</span>
          {recipient ? <span className="truncate text-xs text-muted">{recipient}</span> : null}
        </div>
        {statusBadge}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      data-xen-shipment-card=""
      aria-label={interactive ? a11y : undefined}
      className={cn(
        shell,
        'flex flex-col gap-[var(--xen-space-md)] p-[var(--xen-space-lg)]',
        interactive &&
          'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...interactive}
      {...rest}
    >
      <div className="flex items-start justify-between gap-[var(--xen-space-sm)]">
        <div className="min-w-0 flex-1">
          <p className="truncate text-lg font-bold tabular-nums text-on-surface">{trackingNumber}</p>
          {recipient ? <p className="truncate text-xs text-muted">{recipient}</p> : null}
        </div>
        {statusBadge}
      </div>

      <div className="flex flex-wrap items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] bg-primary/5 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]">
        <CarrierBadge carrier={carrier} service={service} size="sm" />
        {pieces != null ? (
          <span className="text-xs text-muted">{`${pieces} ${pieces === 1 ? 'piece' : 'pieces'}`}</span>
        ) : null}
      </div>

      {origin || destination ? (
        <div className="flex items-center gap-[var(--xen-space-xs)]">
          <span className="min-w-0 flex-1 truncate text-sm font-semibold text-on-surface">{origin ?? '—'}</span>
          <span aria-hidden="true" className={cn('text-sm', TONE_TEXT[meta.tone])}>
            →
          </span>
          <span className="min-w-0 flex-1 truncate text-right text-sm font-semibold text-on-surface">
            {destination ?? '—'}
          </span>
        </div>
      ) : null}

      {eta ? <p className="text-xs text-muted">{`ETA · ${eta}`}</p> : null}
    </div>
  );
});

import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Badge } from '../primitives/Badge';
import { CarrierBadge } from './CarrierBadge';
import {
  SHIPMENT_META,
  TONE_TEXT,
  pressableProps,
  type ShipmentStatus,
  type CarrierCode,
} from './internal';

export type ShipmentCardVariant = 'default' | 'compact';

export interface ShipmentCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Tracking number / shipment id (rendered as the headline). */
  trackingNumber: string;
  /** Human recipient / customer name. */
  recipient?: string;
  /** Origin location label. */
  origin?: string;
  /** Destination location label. */
  destination?: string;
  /** Lifecycle status — carried by glyph + word, never color alone. */
  status: ShipmentStatus;
  /** Carrier code for the inline `CarrierBadge`. */
  carrier?: CarrierCode;
  /** Carrier service level (e.g. `Ground`, `2-Day`). */
  service?: string;
  /** Human ETA line (e.g. `Tomorrow by 8 PM`). */
  eta?: string;
  /** Package count for a multi-piece shipment. */
  pieces?: number;
  /** Layout density. `compact` drops the origin→destination row. */
  variant?: ShipmentCardVariant;
  /** Loading skeleton (no data yet). */
  loading?: boolean;
  /** Makes the whole card clickable. */
  onClick?: () => void;
}

/**
 * Summary card for one shipment: tracking number headline, a glyph + word
 * status badge, an inline `CarrierBadge`, origin→destination, ETA and piece
 * count. Status meaning is text-first (badge label + glyph), with tone as
 * reinforcement only. Clickable when `onClick` is set (button role + label);
 * otherwise a static summary. Loading renders a muted skeleton. All colors are
 * theme tokens. Web parity of the native `ShipmentCard`.
 */
export const ShipmentCard = React.forwardRef<HTMLDivElement, ShipmentCardProps>(
  function ShipmentCard(
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

    if (loading) {
      return (
        <Card
          ref={ref}
          variant="outlined"
          aria-busy="true"
          aria-label="Loading shipment"
          className={cn('flex flex-col gap-[var(--xen-space-sm)]', className)}
          {...rest}
        >
          <div className="h-4 w-[55%] animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-200" />
          <div className="h-3 w-[80%] animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-100" />
          <div className="h-3 w-[40%] animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-100" />
        </Card>
      );
    }

    const interactive = pressableProps(onClick);

    return (
      <Card
        ref={ref}
        variant={interactive ? 'interactive' : 'outlined'}
        aria-label={interactive ? `Shipment ${trackingNumber}, ${meta.label}` : undefined}
        className={cn(
          'flex flex-col gap-[var(--xen-space-sm)]',
          interactive &&
            'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
          className
        )}
        {...interactive}
        {...rest}
      >
        <div className="flex items-center justify-between gap-[var(--xen-space-sm)]">
          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-bold text-on-surface">{trackingNumber}</p>
            {recipient ? <p className="truncate text-xs text-muted">{recipient}</p> : null}
          </div>
          <Badge tone={meta.tone} variant="soft" size="sm">
            {`${meta.glyph} ${meta.label}`}
          </Badge>
        </div>

        <div className="flex flex-wrap items-center gap-[var(--xen-space-sm)]">
          <CarrierBadge carrier={carrier} service={service} size="sm" />
          {pieces != null ? (
            <span className="text-xs text-muted">{`${pieces} ${pieces === 1 ? 'piece' : 'pieces'}`}</span>
          ) : null}
        </div>

        {variant === 'default' && (origin || destination) ? (
          <div className="flex items-center gap-[var(--xen-space-xs)]">
            <span className="min-w-0 flex-1 truncate text-sm text-on-surface">{origin ?? '—'}</span>
            <span aria-hidden="true" className={cn('text-sm', TONE_TEXT[meta.tone])}>
              →
            </span>
            <span className="min-w-0 flex-1 truncate text-right text-sm text-on-surface">
              {destination ?? '—'}
            </span>
          </div>
        ) : null}

        {eta ? <p className="text-xs text-muted">{`ETA · ${eta}`}</p> : null}
      </Card>
    );
  }
);

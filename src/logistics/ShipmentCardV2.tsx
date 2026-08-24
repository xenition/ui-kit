import * as React from 'react';
import { cn } from '../primitives/cn';
import { CarrierBadge } from './CarrierBadge';
import { SHIPMENT_META, TONE_TEXT, TONE_SOFT_BG, TONE_SOFT_STRONG_BG, pressableProps } from './internal';
import type { ShipmentCardProps } from './ShipmentCard';

/** Drop-in for {@link ShipmentCard}: identical props, a distinct design. */
export type ShipmentCardV2Props = ShipmentCardProps;

/**
 * ShipmentCard, alternate design **V2** — an *elevated hero card*. Where the
 * classic is a flat outlined summary, V2 floats on a soft shadow, leads with a
 * carrier badge + a bold status pill on one header line, dedicates a full-width
 * tinted "route strip" to origin → destination with the tone-glyph as the arrow,
 * and closes with a prominent ETA footer. Status is glyph + word (tone only
 * reinforces). Loading and every prop behave exactly as the classic. No literal
 * colors.
 */
export const ShipmentCardV2 = React.forwardRef<HTMLDivElement, ShipmentCardV2Props>(
  function ShipmentCardV2(
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
    const shell = 'flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] bg-surface p-[var(--xen-space-md)] shadow-md';

    if (loading) {
      return (
        <div
          ref={ref}
          aria-busy="true"
          aria-label="Loading shipment"
          className={cn(shell, className)}
          {...rest}
        >
          <div className="h-[18px] w-1/2 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-200" />
          <div className="h-10 w-full animate-pulse rounded-[var(--xen-radius-md)] bg-neutral-100" />
          <div className="h-3 w-[35%] animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-100" />
        </div>
      );
    }

    const interactive = pressableProps(onClick);

    return (
      <div
        ref={ref}
        aria-label={interactive ? `Shipment ${trackingNumber}, ${meta.label}` : undefined}
        className={cn(
          shell,
          interactive &&
            'cursor-pointer transition-shadow hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
          className
        )}
        {...interactive}
        {...rest}
      >
        <div className="flex items-center justify-between gap-[var(--xen-space-sm)]">
          <CarrierBadge carrier={carrier} service={service} size="sm" />
          <span
            className={cn(
              'inline-flex items-center gap-[var(--xen-space-xs)] rounded-full px-[var(--xen-space-sm)] py-[var(--xen-space-xs)] text-xs font-bold',
              TONE_SOFT_STRONG_BG[meta.tone],
              TONE_TEXT[meta.tone]
            )}
          >
            <span aria-hidden="true">{meta.glyph}</span>
            {meta.label}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="truncate text-lg font-bold text-on-surface">{trackingNumber}</span>
          {recipient ? <span className="truncate text-xs text-muted">{recipient}</span> : null}
        </div>

        {variant === 'default' && (origin || destination) ? (
          <div
            className={cn(
              'flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] p-[var(--xen-space-sm)]',
              TONE_SOFT_BG[meta.tone]
            )}
          >
            <span className="min-w-0 flex-1 truncate text-sm font-semibold text-on-surface">{origin ?? '—'}</span>
            <span aria-hidden="true" className={cn('text-base', TONE_TEXT[meta.tone])}>
              →
            </span>
            <span className="min-w-0 flex-1 truncate text-right text-sm font-semibold text-on-surface">
              {destination ?? '—'}
            </span>
          </div>
        ) : null}

        {eta || pieces != null ? (
          <div className="flex items-center justify-between gap-[var(--xen-space-sm)]">
            {eta ? (
              <span className="text-sm font-semibold text-on-surface">{`ETA · ${eta}`}</span>
            ) : (
              <span />
            )}
            {pieces != null ? (
              <span className="text-xs text-muted">{`${pieces} ${pieces === 1 ? 'piece' : 'pieces'}`}</span>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
);

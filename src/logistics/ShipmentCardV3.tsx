import * as React from 'react';
import { cn } from '../primitives/cn';
import { CARRIER_META, SHIPMENT_META, TONE_TEXT, TONE_SOFT_STRONG_BG, pressableProps } from './internal';
import type { ShipmentCardProps } from './ShipmentCard';

/** Drop-in for {@link ShipmentCard}: identical props, a distinct design. */
export type ShipmentCardV3Props = ShipmentCardProps;

/**
 * ShipmentCard, alternate design **V3** — a *dense list line*. Borderless and
 * single-row: a leading status-glyph chip, then a two-line stack (tracking
 * number + inline carrier glyph, then a muted `origin → destination · ETA` meta
 * line), with the status word right-aligned. Built to repeat tightly in a
 * shipments list — the inverse of V2's elevated card. Status stays glyph + word
 * (tone reinforces only). Same props; loading renders a slim skeleton line.
 */
export const ShipmentCardV3 = React.forwardRef<HTMLDivElement, ShipmentCardV3Props>(
  function ShipmentCardV3(
    {
      trackingNumber,
      recipient,
      origin,
      destination,
      status,
      carrier = 'generic',
      service,
      eta,
      pieces,
      loading = false,
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    const meta = SHIPMENT_META[status] ?? SHIPMENT_META.draft;
    const carrierMeta = CARRIER_META[carrier] ?? CARRIER_META.generic;
    const shell =
      'flex items-center gap-[var(--xen-space-sm)] border-b border-border px-[var(--xen-space-xs)] py-[var(--xen-space-sm)]';

    if (loading) {
      return (
        <div ref={ref} aria-busy="true" aria-label="Loading shipment" className={cn(shell, className)} {...rest}>
          <div className="h-[26px] w-[26px] animate-pulse rounded-full bg-neutral-200" />
          <div className="flex flex-1 flex-col gap-[var(--xen-space-xs)]">
            <div className="h-3 w-[45%] animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-200" />
            <div className="h-2.5 w-[70%] animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-100" />
          </div>
        </div>
      );
    }

    const metaLine = [
      origin || destination ? `${origin ?? '—'} → ${destination ?? '—'}` : null,
      recipient,
      eta ? `ETA ${eta}` : null,
      pieces != null ? `${pieces} pc` : null,
      service,
    ]
      .filter(Boolean)
      .join('  ·  ');

    const interactive = pressableProps(onClick);

    return (
      <div
        ref={ref}
        aria-label={interactive ? `Shipment ${trackingNumber}, ${meta.label}` : undefined}
        className={cn(
          shell,
          interactive &&
            'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
          className
        )}
        {...interactive}
        {...rest}
      >
        <span
          aria-hidden="true"
          className={cn(
            'flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full text-xs',
            TONE_SOFT_STRONG_BG[meta.tone],
            TONE_TEXT[meta.tone]
          )}
        >
          {meta.glyph}
        </span>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center gap-[var(--xen-space-xs)]">
            <span aria-hidden="true" className="text-xs text-muted">
              {carrierMeta.glyph}
            </span>
            <span className="min-w-0 flex-1 truncate text-sm font-bold text-on-surface">{trackingNumber}</span>
          </div>
          {metaLine ? <span className="truncate text-xs text-muted">{metaLine}</span> : null}
        </div>

        <span className={cn('text-xs font-bold', TONE_TEXT[meta.tone])}>{meta.label}</span>
      </div>
    );
  }
);

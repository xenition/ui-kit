import * as React from 'react';
import { cn } from '../primitives/cn';
import { clamp01, clickableProps } from './internal';
import type { MapPinCardProps } from './MapPinCard';

/** Drop-in for {@link MapPinCardProps} — same props, the V4 "listing" design. */
export type MapPinCardV4Props = MapPinCardProps;

/**
 * MapPinCard — **V4** "listing" design (web parity of the native V4). The
 * image-forward, editorial take on the location preview: a rounded elevated frame
 * with a subtle soft-primary gradient "ground" (no faux grid clutter) and a single
 * primary pill pin marking the spot. STATIC and dependency-free — it imports no map
 * library, so it renders in any environment; wire a real map behind `onClick`. Same
 * props/behavior as {@link MapPinCardProps}: `address` + `caption` in a floating
 * card overlay, `pin` position clamped to the frame. All colors come from the
 * `--xen-*` tokens (no literals); a11y-labelled.
 */
export const MapPinCardV4 = React.forwardRef<HTMLDivElement, MapPinCardV4Props>(
  function MapPinCardV4(
    { address, caption, pin = { x: 0.5, y: 0.5 }, height = 160, onClick, className, ...rest },
    ref
  ) {
    const x = clamp01(pin.x);
    const y = clamp01(pin.y);
    const interactive = clickableProps(
      onClick as React.MouseEventHandler | undefined,
      `Open map for ${address}`
    );

    return (
      <div
        ref={ref}
        onClick={onClick}
        aria-label={interactive ? undefined : `Map showing ${address}`}
        role={interactive ? undefined : 'img'}
        style={{ height }}
        className={cn(
          'relative overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-gradient-to-br from-primary/10 to-surface shadow-md',
          onClick && 'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          className
        )}
        {...interactive}
        {...rest}
      >
        {/* Price/location pin — a primary pill marker. */}
        <span
          data-testid="xen-re-map-pin"
          aria-hidden="true"
          className="absolute flex -translate-x-1/2 -translate-y-full flex-col items-center"
          style={{ left: `${x * 100}%`, top: `${y * 100}%` }}
        >
          <span className="inline-flex items-center gap-1 rounded-full border border-on-primary bg-primary px-2.5 py-1 text-xs font-bold text-on-primary shadow-md">
            <span>📍</span>
            {address}
          </span>
          <span className="h-2 w-0.5 bg-primary" />
        </span>

        {/* Caption overlay. */}
        <span className="absolute inset-x-2 bottom-2 block rounded-[var(--xen-radius-md)] border border-border bg-surface px-2 py-1 shadow-sm">
          <span className="block truncate text-sm font-semibold text-on-surface">{address}</span>
          {caption ? <span className="block truncate text-xs text-muted">{caption}</span> : null}
        </span>
      </div>
    );
  }
);

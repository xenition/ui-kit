import * as React from 'react';
import { cn } from '../primitives/cn';
import { clamp01, clickableProps } from './internal';

export interface MapPinCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Address / place name announced and shown under the pin. */
  address: string;
  /** Secondary line (neighborhood, coordinates, "0.4 mi to transit", …). */
  caption?: string;
  /**
   * Pin position as fractions of the frame, `0`–`1` (default centered). Clamped
   * so the marker never leaves the card.
   */
  pin?: { x: number; y: number };
  /** Frame height in px (default 160). */
  height?: number;
}

/**
 * Web parity of the native `MapPinCard`: a location preview for a listing — a
 * STATIC, dependency-free styled placeholder, NOT a live map. It imports no map
 * library, so it renders in any environment: a token-tinted frame with faux grid
 * lines standing in for tiles and a single pin marker. Wire a real map behind
 * `onClick`. Data + callback only; all colors come from the `--xen-*` tokens —
 * no literal colors; a11y-labelled.
 */
export const MapPinCard = React.forwardRef<HTMLDivElement, MapPinCardProps>(
  function MapPinCard(
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
          'relative overflow-hidden border border-border bg-surface',
          'rounded-[var(--xen-radius-lg)]',
          onClick && 'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          className
        )}
        {...interactive}
        {...rest}
      >
        {/* Faux grid — purely decorative token lines standing in for map tiles. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {[25, 50, 75].map((f) => (
            <span
              key={`h-${f}`}
              className="absolute inset-x-0 h-px bg-border"
              style={{ top: `${f}%` }}
            />
          ))}
          {[25, 50, 75].map((f) => (
            <span
              key={`v-${f}`}
              className="absolute inset-y-0 w-px bg-border"
              style={{ left: `${f}%` }}
            />
          ))}
        </div>

        {/* Pin marker. */}
        <span
          data-testid="xen-re-map-pin"
          className="absolute flex flex-col items-center"
          style={{ left: `${x * 100}%`, top: `${y * 100}%`, marginLeft: -10, marginTop: -20 }}
        >
          <span className="h-5 w-5 rounded-full border-2 border-on-primary bg-primary" />
          <span className="h-2 w-0.5 bg-primary" />
        </span>

        {/* Caption overlay. */}
        <span className="absolute inset-x-2 bottom-2 block border border-border bg-surface px-2 py-1 rounded-[var(--xen-radius-sm)]">
          <span className="block truncate text-sm font-semibold text-on-surface">{address}</span>
          {caption ? <span className="block truncate text-xs text-muted">{caption}</span> : null}
        </span>
      </div>
    );
  }
);

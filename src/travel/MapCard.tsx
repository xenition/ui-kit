import * as React from 'react';
import { cn } from '../primitives/cn';

export interface MapCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Place name announced and shown under the pin. */
  label: string;
  /** Secondary address/coordinate line. */
  caption?: string;
  /**
   * Pin position as fractions of the frame, `0`–`1` (default centered). Clamped
   * so the marker never leaves the card.
   */
  pin?: { x: number; y: number };
  /** Frame height in px (default 160). */
  height?: number;
  /** Fires when the card is activated (e.g. to open the real map elsewhere). */
  onClick?: () => void;
}

const clamp01 = (n: number): number => (n < 0 ? 0 : n > 1 ? 1 : n);

/**
 * Web parity of the native `MapCard`: a location preview — a STATIC,
 * dependency-free styled `div` placeholder, NOT a live map. It draws a
 * token-tinted frame with faux grid lines and a single pin marker; there is
 * intentionally no map library import, so it renders in any environment. Wire a
 * real map behind `onClick` when needed. Token-only colors.
 */
export const MapCard = React.forwardRef<HTMLDivElement, MapCardProps>(function MapCard(
  { label, caption, pin = { x: 0.5, y: 0.5 }, height = 160, onClick, className, ...rest },
  ref
) {
  const x = clamp01(pin.x);
  const y = clamp01(pin.y);
  const interactive = typeof onClick === 'function';

  return (
    <div
      ref={ref}
      data-xen-map-card=""
      role={interactive ? 'button' : 'img'}
      aria-label={interactive ? `Open map for ${label}` : `Map showing ${label}`}
      style={{ height }}
      className={cn(
        'relative overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface',
        interactive &&
          'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...rest}
      {...(interactive
        ? {
            tabIndex: 0,
            onClick,
            onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.();
              }
            },
          }
        : {})}
    >
      {/* Faux grid — purely decorative token lines standing in for map tiles. */}
      <div aria-hidden="true" className="absolute inset-0">
        {[0.25, 0.5, 0.75].map((f) => (
          <div
            key={`h-${f}`}
            style={{ top: `${f * 100}%` }}
            className="absolute left-0 right-0 h-px bg-border"
          />
        ))}
        {[0.25, 0.5, 0.75].map((f) => (
          <div
            key={`v-${f}`}
            style={{ left: `${f * 100}%` }}
            className="absolute bottom-0 top-0 w-px bg-border"
          />
        ))}
      </div>

      {/* Pin marker. */}
      <div
        data-testid="xen-map-pin"
        aria-hidden="true"
        style={{ left: `${x * 100}%`, top: `${y * 100}%`, marginLeft: -10, marginTop: -20 }}
        className="absolute flex flex-col items-center"
      >
        <div className="h-5 w-5 rounded-full border-2 border-on-primary bg-primary" />
        <div className="h-2 w-[2px] bg-primary" />
      </div>

      {/* Caption overlay. */}
      <div className="absolute bottom-[var(--xen-space-sm)] left-[var(--xen-space-sm)] right-[var(--xen-space-sm)] rounded-[var(--xen-radius-sm)] border border-border bg-surface px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]">
        <div className="truncate text-sm font-semibold text-on-surface">{label}</div>
        {caption ? <div className="truncate text-xs text-muted">{caption}</div> : null}
      </div>
    </div>
  );
});

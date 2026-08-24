import * as React from 'react';
import { cn } from '../primitives/cn';

/** An endpoint plotted on the static route frame. */
export interface RoutePoint {
  /** Short label shown under the row (e.g. `'Pickup'`). */
  label: string;
  /** Address / place line. */
  address?: string;
  /**
   * Position as fractions of the frame, `0`–`1` (clamped). Defaults place the
   * pickup lower-left and drop-off upper-right.
   */
  at?: { x: number; y: number };
}

export interface TripRouteProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Trip start endpoint. */
  origin: RoutePoint;
  /** Trip end endpoint. */
  destination: RoutePoint;
  /** Optional intermediate waypoints (stops), plotted in order. */
  waypoints?: RoutePoint[];
  /** Pre-formatted total distance (e.g. `'8.4 mi'`). */
  distance?: string;
  /** Pre-formatted ETA / duration (e.g. `'22 min'`). */
  duration?: string;
  /** Frame height in px (default 180). */
  height?: number;
  /** Fires when the frame is pressed (e.g. to open a real map elsewhere). */
  onClick?: () => void;
}

const clamp01 = (n: number): number => (Number.isFinite(n) ? (n < 0 ? 0 : n > 1 ? 1 : n) : 0.5);

/**
 * A trip's origin→destination route rendered as a STATIC, dependency-free styled
 * `div` placeholder — NOT a live map. It draws a token-tinted frame with faux
 * grid tiles, a dashed connecting line, and labelled A/B (plus numbered
 * waypoint) markers; there is intentionally no map library, so it renders in any
 * environment. Endpoints are text-labelled, not color-coded alone. Colors come
 * from `--xen-*` token classes — no literal colors. Wire a real map behind
 * `onClick` when needed. Web parity of the native `TripRoute`.
 */
export const TripRoute = React.forwardRef<HTMLDivElement, TripRouteProps>(function TripRoute(
  { origin, destination, waypoints = [], distance, duration, height = 180, onClick, className, ...rest },
  ref
) {
  const oAt = origin.at ?? { x: 0.2, y: 0.75 };
  const dAt = destination.at ?? { x: 0.8, y: 0.25 };
  const ox = clamp01(oAt.x);
  const oy = clamp01(oAt.y);
  const dx = clamp01(dAt.x);
  const dy = clamp01(dAt.y);

  const DOTS = 7;
  const dots = Array.from({ length: DOTS }, (_, i) => {
    const t = (i + 1) / (DOTS + 1);
    return { x: ox + (dx - ox) * t, y: oy + (dy - oy) * t };
  });

  const marker = (
    x: number,
    y: number,
    glyph: string,
    bg: 'bg-primary' | 'bg-success' | 'bg-accent',
    testid: string
  ) => (
    <span
      key={testid}
      data-testid={testid}
      aria-hidden="true"
      className={cn(
        'absolute inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-surface text-xs font-extrabold text-on-primary',
        bg
      )}
      style={{ left: `${x * 100}%`, top: `${y * 100}%`, marginLeft: -12, marginTop: -12 }}
    >
      {glyph}
    </span>
  );

  const a11y = `Route from ${origin.label}${origin.address ? ` ${origin.address}` : ''} to ${destination.label}${
    destination.address ? ` ${destination.address}` : ''
  }${distance ? `, ${distance}` : ''}${duration ? `, ${duration}` : ''}`;

  const frame = (
    <div
      data-xen-trip-route=""
      className="relative overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-neutral-100"
      style={{ height }}
    >
      {/* Faux map tiles — purely decorative token grid standing in for a map. */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-0">
        {[0.25, 0.5, 0.75].map((f) => (
          <span key={`h-${f}`} className="absolute left-0 right-0 h-px bg-border" style={{ top: `${f * 100}%` }} />
        ))}
        {[0.25, 0.5, 0.75].map((f) => (
          <span key={`v-${f}`} className="absolute bottom-0 top-0 w-px bg-border" style={{ left: `${f * 100}%` }} />
        ))}
      </span>

      {/* Dashed connector. */}
      {dots.map((p, i) => (
        <span
          key={`dot-${i}`}
          aria-hidden="true"
          className="absolute h-1.5 w-1.5 rounded-full bg-primary"
          style={{ left: `${p.x * 100}%`, top: `${p.y * 100}%`, marginLeft: -3, marginTop: -3 }}
        />
      ))}

      {/* Waypoints (numbered). */}
      {waypoints.map((w, i) =>
        marker(clamp01(w.at?.x ?? 0.5), clamp01(w.at?.y ?? 0.5), String(i + 1), 'bg-accent', `xen-trip-waypoint-${i}`)
      )}

      {marker(ox, oy, 'A', 'bg-primary', 'xen-trip-origin')}
      {marker(dx, dy, 'B', 'bg-success', 'xen-trip-destination')}

      {/* Distance / duration overlay. */}
      {distance || duration ? (
        <div className="absolute right-[var(--xen-space-sm)] top-[var(--xen-space-sm)] flex gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-sm)] border border-border bg-surface px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]">
          {distance ? <span className="text-xs font-bold text-on-surface">{distance}</span> : null}
          {duration ? <span className="text-xs text-muted">{duration}</span> : null}
        </div>
      ) : null}
    </div>
  );

  const legend = (
    <div className="mt-[var(--xen-space-sm)] flex gap-[var(--xen-space-md)]">
      <div className="flex-1">
        <span className="block text-xs font-semibold text-muted">A · {origin.label}</span>
        {origin.address ? <span className="block truncate text-sm text-on-surface">{origin.address}</span> : null}
      </div>
      <div className="flex-1">
        <span className="block text-xs font-semibold text-muted">B · {destination.label}</span>
        {destination.address ? (
          <span className="block truncate text-sm text-on-surface">{destination.address}</span>
        ) : null}
      </div>
    </div>
  );

  if (!onClick) {
    return (
      <div ref={ref} role="img" aria-label={a11y} className={className} {...rest}>
        {frame}
        {legend}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      role="button"
      tabIndex={0}
      aria-label={`Open map. ${a11y}`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className={cn(
        'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...rest}
    >
      {frame}
      {legend}
    </div>
  );
});

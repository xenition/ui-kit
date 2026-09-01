import * as React from 'react';
import { cn } from '../primitives/cn';
import type { MapCardProps } from './MapCard';

/** Drop-in for {@link MapCardProps} — same props, the V4 "journey" design. */
export type MapCardV4Props = MapCardProps;

const clamp01 = (n: number): number => (n < 0 ? 0 : n > 1 ? 1 : n);

/**
 * MapCard — **V4** "journey" design (web parity of the native V4). The
 * boarding-pass take on a location preview: a decorative accent→primary
 * "horizon" gradient ground stands in for the map tiles (the signature V4
 * touch), the pin sits inside a frosted glass tile with near-white ink, and the
 * label/caption ride a matching frosted card so the place name stays legible on
 * the saturated ground. It remains a STATIC, dependency-free placeholder — there
 * is intentionally no map library import, so it renders in any environment. Wire
 * a real map behind `onClick` when needed. Same props/behavior as
 * {@link MapCardProps}; all colors from `--xen-*` token classes (no literal
 * colors).
 */
export const MapCardV4 = React.forwardRef<HTMLDivElement, MapCardV4Props>(function MapCardV4(
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
        'relative overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-gradient-to-br from-accent-400 to-primary-600',
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
      {/* Faux grid — purely decorative near-white lines standing in for map tiles. */}
      <div aria-hidden="true" className="absolute inset-0">
        {[0.25, 0.5, 0.75].map((f) => (
          <div
            key={`h-${f}`}
            style={{ top: `${f * 100}%` }}
            className="absolute left-0 right-0 h-px bg-primary-50/20"
          />
        ))}
        {[0.25, 0.5, 0.75].map((f) => (
          <div
            key={`v-${f}`}
            style={{ left: `${f * 100}%` }}
            className="absolute bottom-0 top-0 w-px bg-primary-50/20"
          />
        ))}
      </div>

      {/* Pin glyph inside a frosted tile. */}
      <div
        data-testid="xen-map-pin"
        aria-hidden="true"
        style={{ left: `${x * 100}%`, top: `${y * 100}%`, marginLeft: -14, marginTop: -14 }}
        className="absolute flex h-7 w-7 items-center justify-center rounded-full border border-primary-50/30 bg-primary-50/15 text-sm leading-none text-primary-50"
      >
        📍
      </div>

      {/* Caption overlay — frosted glass tile with near-white ink. */}
      <div className="absolute bottom-[var(--xen-space-sm)] left-[var(--xen-space-sm)] right-[var(--xen-space-sm)] rounded-[var(--xen-radius-sm)] border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]">
        <div className="truncate text-sm font-semibold text-primary-50">{label}</div>
        {caption ? <div className="truncate text-xs text-primary-100">{caption}</div> : null}
      </div>
    </div>
  );
});

import * as React from 'react';
import { cn } from '../primitives/cn';
import { metaLine, ROUTE_DOTS, TONE_BG, TONE_ON, type ToneV4 } from './internal/fleet-v4';
import type { RoutePoint, TripRouteProps } from './TripRoute';

export interface TripRouteV4Props extends TripRouteProps {
  /** Glyphs on the two end markers. Defaults `'A'` / `'B'`. */
  originGlyph?: string;
  destinationGlyph?: string;
  /** Announced for the whole map. Default `'Route from A to B'`. */
  formatRouteLabel?: (origin: string, destination: string) => string;
}

const clamp01 = (n: number): number => Math.max(0, Math.min(1, Number.isFinite(n) ? n : 0));

/**
 * **V4 trip route** — the web twin of the native `TripRouteV4`, same props as
 * {@link TripRoute} plus `originGlyph`, `destinationGlyph` and
 * `formatRouteLabel`.
 *
 * ## Three changes
 *
 * 1. **The markers use their *paired* ink** (`TONE_ON`). This is the defect
 *    that put the table in `tone-v4`: the base painted each marker `bg-[tone]`
 *    and its glyph `text-on-primary` regardless, so a `success` origin marker
 *    was a green disc wearing the brand's ink and whether it was readable
 *    depended on the seed.
 * 2. **The map has one accessible name** naming both endpoints, rather than
 *    being a decorative box with two unlabelled discs in it.
 * 3. **The ground is a mixed tint**, so it reads as a surface behind the route
 *    in both schemes instead of a flat neutral.
 */
export const TripRouteV4 = React.forwardRef<HTMLDivElement, TripRouteV4Props>(
  function TripRouteV4(
    {
      origin,
      destination,
      waypoints = [],
      distance,
      duration,
      height = 180,
      originGlyph = 'A',
      destinationGlyph = 'B',
      formatRouteLabel,
      onClick,
      className,
      style,
      ...rest
    },
    ref
  ) {
    const oAt = origin.at ?? { x: 0.2, y: 0.75 };
    const dAt = destination.at ?? { x: 0.8, y: 0.25 };
    const ox = clamp01(oAt.x);
    const oy = clamp01(oAt.y);
    const dx = clamp01(dAt.x);
    const dy = clamp01(dAt.y);

    const dots = Array.from({ length: ROUTE_DOTS }, (_, i) => {
      const t = (i + 1) / (ROUTE_DOTS + 1);
      return { x: ox + (dx - ox) * t, y: oy + (dy - oy) * t };
    });

    const pin = (x: number, y: number, glyph: string, tone: ToneV4, testId: string) => (
      <span
        key={testId}
        data-testid={testId}
        aria-hidden
        className={cn(
          'absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center',
          'rounded-full border-2 border-card text-xs font-bold',
          TONE_BG[tone],
          // `TONE_ON`, not `text-on-primary`. See the note on this component.
          TONE_ON[tone]
        )}
        style={{ left: `${x * 100}%`, top: `${y * 100}%` }}
      >
        {glyph}
      </span>
    );

    const label = (formatRouteLabel ?? ((a: string, b: string) => `Route from ${a} to ${b}`))(
      origin.label,
      destination.label
    );
    const caption = metaLine([distance, duration]);

    const map = (
      <div
        data-testid="xen-trip-route"
        className="relative overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-[color-mix(in_srgb,var(--xen-primary)_6%,var(--xen-card))]"
        style={{ height }}
      >
        {dots.map((d, i) => (
          <span
            key={`dot-${i}`}
            aria-hidden
            className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
            style={{ left: `${d.x * 100}%`, top: `${d.y * 100}%` }}
          />
        ))}
        {waypoints.map((w: RoutePoint, i) =>
          w.at
            ? pin(clamp01(w.at.x), clamp01(w.at.y), String(i + 1), 'accent', `xen-route-waypoint-${i}`)
            : null
        )}
        {pin(ox, oy, originGlyph, 'success', 'xen-route-origin')}
        {pin(dx, dy, destinationGlyph, 'primary', 'xen-route-destination')}
      </div>
    );

    const body = (
      <div className="flex flex-col gap-sm">
        {map}
        <div className="flex flex-col gap-xs">
          <span className="truncate text-sm font-semibold text-on-surface">{origin.label}</span>
          <span className="truncate text-sm font-semibold text-on-surface">
            {destination.label}
          </span>
          {caption ? (
            <span className="text-xs text-muted-text [font-variant-numeric:tabular-nums]">
              {caption}
            </span>
          ) : null}
        </div>
      </div>
    );

    if (!onClick) {
      return (
        <div
          ref={ref}
          aria-label={metaLine([label, caption])}
          className={className}
          style={style}
          {...rest}
        >
          {body}
        </div>
      );
    }

    return (
      <div ref={ref} className={className} style={style} {...rest}>
        <button
          type="button"
          onClick={onClick}
          aria-label={metaLine([label, caption])}
          data-xen-v4-chrome="on-surface"
          className="w-full rounded-[var(--xen-radius-lg)] text-left"
        >
          {body}
        </button>
      </div>
    );
  }
);

import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { clamp } from './weather-utils';

const CARDINALS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'] as const;

/** Nearest 8-point cardinal name for a bearing in degrees. */
function cardinalFor(deg: number): string {
  const idx = Math.round((((deg % 360) + 360) % 360) / 45) % 8;
  return CARDINALS[idx] ?? 'N';
}

export interface WindCompassProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'aria-label'> {
  /** Wind bearing in degrees (0 = from North). Default `0`. */
  direction?: number;
  /** Sustained wind speed. */
  speed?: number;
  /** Peak gust speed. */
  gust?: number;
  /** Unit label for speed (e.g. `'mph'`, `'km/h'`). Default `'mph'`. */
  unit?: string;
  /** Diameter of the dial in px. Default `120`. */
  size?: number;
}

/**
 * Wind direction + speed dial (web parity of the native `WindCompass`). A
 * dependency-free `div` compass: a token-bordered ring with N/E/S/W tick labels
 * and a rotated arrow (CSS `transform: rotate`) showing the bearing, with the
 * sustained speed centred and an optional gust caption. The cardinal direction
 * is ALSO written out as text, so orientation never relies on the arrow alone.
 * All colors/sizes come from the `--xen-*` tokens via Tailwind classes — no
 * literal colors, no SVG deps.
 */
export const WindCompass = React.forwardRef<HTMLDivElement, WindCompassProps>(function WindCompass(
  { direction = 0, speed, gust, unit = 'mph', size = 120, className, ...rest },
  ref
) {
  const deg = ((direction % 360) + 360) % 360;
  const cardinal = cardinalFor(deg);
  const dial = clamp(size, 72, 400);
  const arrowLen = dial * 0.36;

  return (
    <Card
      ref={ref}
      role="img"
      aria-label={`Wind from ${cardinal}, ${deg} degrees${speed != null ? `, ${speed} ${unit}` : ''}${
        gust != null ? `, gusting ${gust} ${unit}` : ''
      }`}
      className={cn('flex flex-col items-center gap-2', className)}
      {...rest}
    >
      <div
        className="relative flex items-center justify-center rounded-full border-2 border-border"
        style={{ width: dial, height: dial }}
      >
        {/* Cardinal ticks. */}
        <span className="absolute top-1 text-xs text-muted">N</span>
        <span className="absolute bottom-1 text-xs text-muted">S</span>
        <span className="absolute left-1 text-xs text-muted">W</span>
        <span className="absolute right-1 text-xs text-muted">E</span>

        {/* Rotated arrow (pure CSS transform, dependency-free). */}
        <div
          aria-hidden="true"
          className="flex flex-col items-center"
          style={{ width: 2, height: arrowLen, transform: `rotate(${deg}deg)` }}
        >
          <span
            className="border-b-primary"
            style={{
              width: 0,
              height: 0,
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderBottomWidth: 8,
              borderBottomStyle: 'solid',
            }}
          />
          <span className="w-0.5 flex-1 bg-primary" />
        </div>

        {/* Centre label. */}
        <div className="absolute flex flex-col items-center">
          <span className="text-lg font-extrabold text-on-surface">{speed != null ? speed : '—'}</span>
          <span className="text-xs text-muted">{unit}</span>
        </div>
      </div>

      <span className="text-sm font-semibold text-on-surface">
        From {cardinal} ({deg}°)
      </span>
      {gust != null ? (
        <span className="text-xs text-muted">
          Gusts {gust} {unit}
        </span>
      ) : null}
    </Card>
  );
});

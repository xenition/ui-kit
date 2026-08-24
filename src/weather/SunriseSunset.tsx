import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Icon } from '../primitives/Icon';
import { clamp } from './weather-utils';

export interface SunriseSunsetProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'aria-label'> {
  /** Sunrise time label (e.g. `'6:42 AM'`). */
  sunrise?: string;
  /** Sunset time label (e.g. `'7:58 PM'`). */
  sunset?: string;
  /**
   * Daylight progress 0–1 (fraction of the day elapsed between sunrise and
   * sunset). Positions the sun marker on the arc. Default `0.5`.
   */
  progress?: number;
  /** Height of the arc area in px. Default `72`. */
  arcHeight?: number;
  /** Message shown when both times are absent. */
  emptyLabel?: string;
}

/**
 * Sunrise / sunset card with a static daylight arc (web parity of the native
 * `SunriseSunset`). The arc is a dependency-free row of token-tinted dots forming
 * a dome; the sun marker sits at `progress` along it. Sunrise and sunset are
 * labelled with glyphs + times, so the info never relies on the arc alone.
 * Renders a muted empty state when both times are absent. All colors come from
 * the `--xen-*` tokens via Tailwind classes — no literal colors, no SVG deps.
 */
export const SunriseSunset = React.forwardRef<HTMLDivElement, SunriseSunsetProps>(
  function SunriseSunset(
    { sunrise, sunset, progress = 0.5, arcHeight = 72, emptyLabel = 'Sun times unavailable', className, ...rest },
    ref
  ) {
    if (sunrise == null && sunset == null) {
      return (
        <Card ref={ref} role="img" aria-label={emptyLabel} className={className} {...rest}>
          <p className="text-sm text-muted">{emptyLabel}</p>
        </Card>
      );
    }

    const p = clamp(progress, 0, 1);
    const DOTS = 11;
    const height = clamp(arcHeight, 40, 200);

    return (
      <Card
        ref={ref}
        role="img"
        aria-label={`Sunrise ${sunrise ?? 'unknown'}, sunset ${sunset ?? 'unknown'}`}
        className={className}
        {...rest}
      >
        <div className="relative flex flex-col justify-end" style={{ height }}>
          {/* Static dome of dots — each dot's vertical offset traces a parabola. */}
          <div className="flex flex-row items-end justify-between" style={{ height }}>
            {Array.from({ length: DOTS }).map((_, i) => {
              const t = i / (DOTS - 1);
              const dome = Math.sin(t * Math.PI); // 0→1→0
              const active = t <= p;
              const dotSize = 6;
              return (
                <span
                  key={i}
                  aria-hidden="true"
                  className={cn('rounded-full', active ? 'bg-accent' : 'bg-neutral-200')}
                  style={{ width: dotSize, height: dotSize, marginBottom: dome * (height - dotSize * 2) }}
                />
              );
            })}
          </div>
          {/* Sun marker positioned along the dome. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute"
            style={{ left: `${p * 100}%`, bottom: Math.sin(p * Math.PI) * (height - 12), marginLeft: -9 }}
          >
            <Icon glyph="☀️" size="lg" aria-hidden />
          </span>
        </div>

        <div className="mt-2 flex flex-row justify-between">
          <span className="flex flex-row items-center gap-1">
            <Icon glyph="🌅" size="sm" aria-label="Sunrise" />
            <span className="text-sm text-on-surface">{sunrise ?? '—'}</span>
          </span>
          <span className="flex flex-row items-center gap-1">
            <Icon glyph="🌇" size="sm" aria-label="Sunset" />
            <span className="text-sm text-on-surface">{sunset ?? '—'}</span>
          </span>
        </div>
      </Card>
    );
  }
);

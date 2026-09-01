import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import type { SunriseSunsetProps } from './SunriseSunset';

export type SunriseSunsetV4Props = SunriseSunsetProps;

function clamp(n: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, n));
}

/**
 * V4 design-line sunrise/sunset card — a polished elevated white card with a
 * static daylight arc. Same props, defaults and empty handling as the base
 * `SunriseSunset`: a dependency-free dome of dots with a sun marker sitting at
 * `progress` along it, and glyph + time labels for sunrise and sunset. The arc
 * is accented with the `accent` token on a `bg-neutral-100` track. All colors
 * flow through Tailwind token classes.
 */
export const SunriseSunsetV4 = React.forwardRef<HTMLDivElement, SunriseSunsetV4Props>(
  function SunriseSunsetV4(
    { sunrise, sunset, progress = 0.5, arcHeight = 72, emptyLabel = 'Sun times unavailable', className, ...rest },
    ref
  ) {
    const shell = 'rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-lg p-5';

    if (sunrise == null && sunset == null) {
      return (
        <div ref={ref} role="img" aria-label={emptyLabel} className={cn(shell, className)} {...rest}>
          <p className="text-sm text-muted">{emptyLabel}</p>
        </div>
      );
    }

    const p = clamp(progress, 0, 1);
    const DOTS = 11;
    const height = clamp(arcHeight, 40, 200);

    return (
      <div
        ref={ref}
        role="img"
        aria-label={`Sunrise ${sunrise ?? 'unknown'}, sunset ${sunset ?? 'unknown'}`}
        className={cn(shell, 'flex flex-col', className)}
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
                  className={cn('rounded-full', active ? 'bg-accent' : 'bg-neutral-100')}
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
            <Icon glyph="☀️" size="lg" color="warn" aria-hidden />
          </span>
        </div>

        <div className="mt-3 flex flex-row justify-between">
          <span className="flex flex-row items-center gap-1">
            <Icon glyph="🌅" size="sm" className="text-accent" aria-label="Sunrise" />
            <span className="text-sm text-on-surface">{sunrise ?? '—'}</span>
          </span>
          <span className="flex flex-row items-center gap-1">
            <Icon glyph="🌇" size="sm" className="text-accent" aria-label="Sunset" />
            <span className="text-sm text-on-surface">{sunset ?? '—'}</span>
          </span>
        </div>
      </div>
    );
  }
);

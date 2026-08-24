import * as React from 'react';
import { cn } from '../primitives/cn';
import { conditionGlyph, conditionLabel } from './weather-utils';
import type { CurrentWeatherProps } from './CurrentWeather';

/** Same public contract as {@link CurrentWeather} — a drop-in alternate design. */
export type CurrentWeatherV2Props = CurrentWeatherProps;

/**
 * CurrentWeather, redesigned (v2): a **big gradient hero**. A primary-tinted panel
 * with the location eyebrow, an oversized temperature beside the condition glyph,
 * the condition label, and a feels-like · high · low strip. Bolder than v1. Same
 * props, token-only.
 */
export const CurrentWeatherV2 = React.forwardRef<HTMLDivElement, CurrentWeatherV2Props>(
  function CurrentWeatherV2({ location, temperature, unit = '°', condition, feelsLike, high, low, variant, loading = false, className, ...rest }, ref) {
    void variant;
    if (loading) {
      return <div ref={ref} data-xen-current-weather="" aria-label="Loading weather" className={cn('h-40 animate-pulse rounded-lg bg-neutral-100', className)} {...rest} />;
    }
    const meta = [
      typeof feelsLike === 'number' ? `Feels ${feelsLike}${unit}` : null,
      typeof high === 'number' ? `H ${high}${unit}` : null,
      typeof low === 'number' ? `L ${low}${unit}` : null,
    ].filter((s): s is string => !!s);

    return (
      <div ref={ref} data-xen-current-weather="" className={cn('flex flex-col gap-2 rounded-lg bg-primary/10 p-md', className)} {...rest}>
        {location ? <p className="text-xs font-semibold uppercase tracking-wide text-muted">{location}</p> : null}
        <div className="flex items-center gap-4">
          {condition ? <span className="text-5xl" aria-hidden>{conditionGlyph(condition)}</span> : null}
          {typeof temperature === 'number' ? <span className="text-6xl font-bold text-on-surface">{temperature}{unit}</span> : null}
        </div>
        {condition ? <p className="text-sm font-medium text-on-surface">{conditionLabel(condition)}</p> : null}
        {meta.length > 0 ? <p className="text-sm text-muted">{meta.join(' · ')}</p> : null}
      </div>
    );
  }
);

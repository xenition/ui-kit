import * as React from 'react';
import { cn } from '../primitives/cn';
import { conditionGlyph, conditionLabel } from './weather-utils';
import type { CurrentWeatherProps } from './CurrentWeather';

/** Same public contract as {@link CurrentWeather} — a drop-in alternate design. */
export type CurrentWeatherV3Props = CurrentWeatherProps;

/**
 * CurrentWeather, redesigned (v3): a **compact condition bar**. The glyph, the
 * temperature and location, and a high/low·feels line pack onto one dense row —
 * for a header or list. The opposite of v2's hero. Same props, token-only.
 */
export const CurrentWeatherV3 = React.forwardRef<HTMLDivElement, CurrentWeatherV3Props>(
  function CurrentWeatherV3({ location, temperature, unit = '°', condition, feelsLike, high, low, variant, loading = false, className, ...rest }, ref) {
    void variant;
    if (loading) {
      return <div ref={ref} data-xen-current-weather="" aria-label="Loading weather" className={cn('flex items-center gap-3 py-2', className)} {...rest}><div className="h-3 w-2/5 animate-pulse rounded-sm bg-neutral-100" /></div>;
    }
    const right = [
      typeof high === 'number' ? `H ${high}${unit}` : null,
      typeof low === 'number' ? `L ${low}${unit}` : null,
      typeof feelsLike === 'number' ? `Feels ${feelsLike}${unit}` : null,
    ].filter((s): s is string => !!s).join(' · ');

    return (
      <div ref={ref} data-xen-current-weather="" className={cn('flex items-center gap-3 py-2', className)} {...rest}>
        {condition ? <span className="text-2xl" aria-hidden>{conditionGlyph(condition)}</span> : null}
        <div className="min-w-0">
          <p className="text-lg font-bold text-on-surface">
            {typeof temperature === 'number' ? `${temperature}${unit}` : ''}
            {location ? <span className="ml-2 text-xs font-normal text-muted">{location}</span> : null}
          </p>
          {condition ? <p className="text-xs text-muted">{conditionLabel(condition)}</p> : null}
        </div>
        {right ? <span className="ml-auto text-xs text-muted">{right}</span> : null}
      </div>
    );
  }
);

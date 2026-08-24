import * as React from 'react';
import { cn } from '../primitives/cn';
import type { AirQualityCardProps, AqiBand } from './AirQualityCard';

/** Same public contract as {@link AirQualityCard} — a drop-in alternate design. */
export type AirQualityCardV2Props = AirQualityCardProps;

const BANDS: { max: number; band: AqiBand; label: string; glyph: string; text: string; fill: string }[] = [
  { max: 50, band: 'good', label: 'Good', glyph: '🟢', text: 'text-success', fill: 'bg-success' },
  { max: 100, band: 'moderate', label: 'Moderate', glyph: '🟡', text: 'text-warn', fill: 'bg-warn' },
  { max: 150, band: 'sensitive', label: 'Unhealthy for sensitive groups', glyph: '🟠', text: 'text-warn', fill: 'bg-warn' },
  { max: 200, band: 'unhealthy', label: 'Unhealthy', glyph: '🔴', text: 'text-danger', fill: 'bg-danger' },
  { max: 300, band: 'very-unhealthy', label: 'Very unhealthy', glyph: '🟣', text: 'text-danger', fill: 'bg-danger' },
  { max: Infinity, band: 'hazardous', label: 'Hazardous', glyph: '🟤', text: 'text-danger', fill: 'bg-danger' },
];
const bandFor = (aqi: number): (typeof BANDS)[number] => BANDS.find((b) => aqi <= b.max) ?? BANDS[BANDS.length - 1]!;

/**
 * AirQualityCard, redesigned (v2): a **big AQI hero**. The index is a large
 * band-colored figure with the band glyph + label, a 0–300 scale bar with a
 * marker at the reading, the dominant pollutant, and advice. Bolder than v1. Same
 * props, token-only.
 */
export const AirQualityCardV2 = React.forwardRef<HTMLDivElement, AirQualityCardV2Props>(
  function AirQualityCardV2({ aqi, pollutant, advice, loading = false, emptyLabel = 'Air quality unavailable', className, ...rest }, ref) {
    if (loading) {
      return <div ref={ref} data-xen-air-quality-card="" aria-label="Loading air quality" className={cn('h-32 animate-pulse rounded-lg bg-neutral-100', className)} {...rest} />;
    }
    if (typeof aqi !== 'number') {
      return <div ref={ref} data-xen-air-quality-card="" className={cn('rounded-lg bg-surface p-md text-sm text-muted shadow-sm', className)} {...rest}>{emptyLabel}</div>;
    }
    const b = bandFor(aqi);
    const pos = Math.min(100, (aqi / 300) * 100);

    return (
      <div ref={ref} data-xen-air-quality-card="" aria-label={`Air quality index ${aqi}, ${b.label}`} className={cn('flex flex-col gap-3 rounded-lg bg-surface p-md shadow-sm', className)} {...rest}>
        <div className="flex items-center gap-3">
          <span className="text-3xl" aria-hidden>{b.glyph}</span>
          <div>
            <p className={cn('text-4xl font-bold', b.text)}>{aqi}</p>
            <p className="text-sm font-medium text-on-surface">{b.label}</p>
          </div>
        </div>
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-neutral-100">
          <div className={cn('h-full rounded-full', b.fill)} style={{ width: `${pos}%` }} />
        </div>
        {(pollutant || advice) ? (
          <p className="text-xs text-muted">{[pollutant ? `Main pollutant: ${pollutant}` : null, advice].filter(Boolean).join(' · ')}</p>
        ) : null}
      </div>
    );
  }
);

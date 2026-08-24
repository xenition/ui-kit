import * as React from 'react';
import { cn } from '../primitives/cn';
import type { AirQualityCardProps, AqiBand } from './AirQualityCard';

/** Same public contract as {@link AirQualityCard} — a drop-in alternate design. */
export type AirQualityCardV3Props = AirQualityCardProps;

const BANDS: { max: number; band: AqiBand; label: string; glyph: string; text: string }[] = [
  { max: 50, band: 'good', label: 'Good', glyph: '🟢', text: 'text-success' },
  { max: 100, band: 'moderate', label: 'Moderate', glyph: '🟡', text: 'text-warn' },
  { max: 150, band: 'sensitive', label: 'Sensitive', glyph: '🟠', text: 'text-warn' },
  { max: 200, band: 'unhealthy', label: 'Unhealthy', glyph: '🔴', text: 'text-danger' },
  { max: 300, band: 'very-unhealthy', label: 'Very unhealthy', glyph: '🟣', text: 'text-danger' },
  { max: Infinity, band: 'hazardous', label: 'Hazardous', glyph: '🟤', text: 'text-danger' },
];
const bandFor = (aqi: number): (typeof BANDS)[number] => BANDS.find((b) => aqi <= b.max) ?? BANDS[BANDS.length - 1]!;

/**
 * AirQualityCard, redesigned (v3): a **compact AQI line**. The band glyph, the
 * index number (band-colored) with its label, and the pollutant folded in — a
 * single dense row. The opposite of v2's hero. Same props, token-only.
 */
export const AirQualityCardV3 = React.forwardRef<HTMLDivElement, AirQualityCardV3Props>(
  function AirQualityCardV3({ aqi, pollutant, advice, loading = false, emptyLabel = 'Air quality unavailable', className, ...rest }, ref) {
    void advice;
    if (loading) {
      return <div ref={ref} data-xen-air-quality-card="" aria-label="Loading air quality" className={cn('flex items-center gap-3 py-2', className)} {...rest}><div className="h-3 w-2/5 animate-pulse rounded-sm bg-neutral-100" /></div>;
    }
    if (typeof aqi !== 'number') {
      return <div ref={ref} data-xen-air-quality-card="" className={cn('py-2 text-sm text-muted', className)} {...rest}>{emptyLabel}</div>;
    }
    const b = bandFor(aqi);

    return (
      <div ref={ref} data-xen-air-quality-card="" aria-label={`Air quality index ${aqi}, ${b.label}`} className={cn('flex items-center gap-2 py-2', className)} {...rest}>
        <span className="text-lg" aria-hidden>{b.glyph}</span>
        <span className={cn('text-lg font-bold', b.text)}>{aqi}</span>
        <span className="text-sm text-on-surface">{b.label}</span>
        {pollutant ? <span className="ml-auto text-xs text-muted">{pollutant}</span> : null}
      </div>
    );
  }
);

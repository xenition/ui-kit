import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, type IconColor } from '../primitives/Icon';
import type { AirQualityCardProps } from './AirQualityCard';

export type AirQualityCardV4Props = AirQualityCardProps;

/** AQI severity band. */
type AqiBand = 'good' | 'moderate' | 'sensitive' | 'unhealthy' | 'very-unhealthy' | 'hazardous';

type Tone = 'success' | 'warn' | 'danger';

interface BandMeta {
  band: AqiBand;
  label: string;
  glyph: string;
  tone: Tone;
}

/** Same thresholds + EXACT label strings as the base `AirQualityCard`. */
const BANDS: { max: number; meta: BandMeta }[] = [
  { max: 50, meta: { band: 'good', label: 'Good', glyph: '🟢', tone: 'success' } },
  { max: 100, meta: { band: 'moderate', label: 'Moderate', glyph: '🟡', tone: 'warn' } },
  { max: 150, meta: { band: 'sensitive', label: 'Unhealthy for sensitive groups', glyph: '🟠', tone: 'warn' } },
  { max: 200, meta: { band: 'unhealthy', label: 'Unhealthy', glyph: '🔴', tone: 'danger' } },
  { max: 300, meta: { band: 'very-unhealthy', label: 'Very unhealthy', glyph: '🟣', tone: 'danger' } },
  { max: Infinity, meta: { band: 'hazardous', label: 'Hazardous', glyph: '🟤', tone: 'danger' } },
];

/** Filled severity pill classes (solid tokens only — no opacity modifiers). */
const TONE_PILL: Record<Tone, string> = {
  success: 'bg-success text-on-success',
  warn: 'bg-warn text-on-warn',
  danger: 'bg-danger text-on-danger',
};

/** Token class for the scale-marker fill, keyed by severity tone. */
const TONE_MARKER: Record<Tone, string> = {
  success: 'bg-success',
  warn: 'bg-warn',
  danger: 'bg-danger',
};

/** `Icon` color slot for the severity glyph. */
const TONE_ICON: Record<Tone, IconColor> = {
  success: 'success',
  warn: 'warn',
  danger: 'danger',
};

function clamp(n: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, n));
}

function bandFor(aqi: number): BandMeta {
  return (BANDS.find((b) => aqi <= b.max) ?? BANDS[BANDS.length - 1]!).meta;
}

/**
 * V4 design-line air-quality card — a polished elevated white card that sits on
 * the page. Same props, defaults, band thresholds and EXACT label strings as the
 * base `AirQualityCard`, restyled onto the V4 surface: a big glyph, a large
 * numeral, a filled severity pill, and a token scale track with a positioned
 * marker. All colors flow through Tailwind token classes.
 */
export const AirQualityCardV4 = React.forwardRef<HTMLDivElement, AirQualityCardV4Props>(
  function AirQualityCardV4(
    { aqi, pollutant, advice, loading = false, emptyLabel = 'Air quality unavailable', className, ...rest },
    ref
  ) {
    const shell = 'rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-lg p-5';

    if (loading) {
      return (
        <div ref={ref} role="img" aria-label="Loading air quality" className={cn(shell, className)} {...rest}>
          <div className="h-8 w-full animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-200" />
        </div>
      );
    }

    if (aqi == null) {
      return (
        <div ref={ref} role="img" aria-label={emptyLabel} className={cn(shell, className)} {...rest}>
          <p className="text-sm text-muted">{emptyLabel}</p>
        </div>
      );
    }

    const meta = bandFor(aqi);
    const markerPct = clamp(aqi, 0, 300) / 300;

    return (
      <div
        ref={ref}
        role="img"
        aria-label={`Air quality index ${aqi}, ${meta.label}`}
        className={cn(shell, 'flex flex-col', className)}
        {...rest}
      >
        <div className="flex flex-row items-center gap-2">
          <Icon glyph="🫁" size="2xl" color={TONE_ICON[meta.tone]} aria-label="Air quality" />
          <span className="text-sm text-muted">Air Quality</span>
        </div>

        <div className="mt-1 flex flex-row items-baseline gap-3">
          <span className="text-4xl font-extrabold text-on-surface">{aqi}</span>
          <span
            className={cn(
              'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold',
              TONE_PILL[meta.tone]
            )}
          >
            <span aria-hidden="true">{meta.glyph}</span>
            {meta.label}
          </span>
        </div>

        {/* Token scale track with a positioned marker. */}
        <div className="relative mt-3 h-2 rounded-full bg-neutral-100">
          <span
            aria-hidden="true"
            className={cn('absolute top-1/2 h-3.5 w-1 -translate-y-1/2 rounded-full', TONE_MARKER[meta.tone])}
            style={{ left: `${markerPct * 100}%`, marginLeft: -2 }}
          />
        </div>

        {pollutant ? <p className="mt-3 text-xs text-muted">Dominant: {pollutant}</p> : null}
        {advice ? <p className="mt-1 text-sm text-on-surface">{advice}</p> : null}
      </div>
    );
  }
);

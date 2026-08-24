import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Icon } from '../primitives/Icon';
import { Badge, type BadgeTone } from '../primitives/Badge';
import { clamp } from './weather-utils';

/** AQI severity band. */
export type AqiBand =
  | 'good'
  | 'moderate'
  | 'sensitive'
  | 'unhealthy'
  | 'very-unhealthy'
  | 'hazardous';

/** Severity tone — success/warn/danger only, always paired with the label + glyph. */
type Tone = Extract<BadgeTone, 'success' | 'warn' | 'danger'>;

interface BandMeta {
  label: string;
  glyph: string;
  tone: Tone;
}

const BANDS: { max: number; band: AqiBand; meta: BandMeta }[] = [
  { max: 50, band: 'good', meta: { label: 'Good', glyph: '🟢', tone: 'success' } },
  { max: 100, band: 'moderate', meta: { label: 'Moderate', glyph: '🟡', tone: 'warn' } },
  { max: 150, band: 'sensitive', meta: { label: 'Unhealthy for sensitive groups', glyph: '🟠', tone: 'warn' } },
  { max: 200, band: 'unhealthy', meta: { label: 'Unhealthy', glyph: '🔴', tone: 'danger' } },
  { max: 300, band: 'very-unhealthy', meta: { label: 'Very unhealthy', glyph: '🟣', tone: 'danger' } },
  { max: Infinity, band: 'hazardous', meta: { label: 'Hazardous', glyph: '🟤', tone: 'danger' } },
];

/** Token class for the scale-marker fill, keyed by severity tone. */
const TONE_MARKER: Record<Tone, string> = {
  success: 'bg-success',
  warn: 'bg-warn',
  danger: 'bg-danger',
};

function bandFor(aqi: number): BandMeta {
  return (BANDS.find((b) => aqi <= b.max) ?? BANDS[BANDS.length - 1]!).meta;
}

export interface AirQualityCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'aria-label'> {
  /** US AQI index value (0–500+). */
  aqi?: number;
  /** Dominant pollutant caption (e.g. `'PM2.5'`). */
  pollutant?: string;
  /** Short guidance sentence. */
  advice?: string;
  /** Loading skeleton. */
  loading?: boolean;
  /** Message shown when `aqi` is absent. */
  emptyLabel?: string;
}

/**
 * Air-quality index card (web parity of the native `AirQualityCard`): the
 * numeric AQI, its severity band shown as a `Badge` glyph + text label (never
 * color alone), a token scale track with a positioned marker, and optional
 * pollutant/advice captions. Severity maps to success/warn/danger token tones.
 * Renders a muted empty state when `aqi` is absent and a token skeleton when
 * `loading`. All colors come from the `--xen-*` tokens via Tailwind classes.
 */
export const AirQualityCard = React.forwardRef<HTMLDivElement, AirQualityCardProps>(
  function AirQualityCard(
    { aqi, pollutant, advice, loading = false, emptyLabel = 'Air quality unavailable', className, ...rest },
    ref
  ) {
    if (loading) {
      return (
        <Card ref={ref} role="img" aria-label="Loading air quality" className={className} {...rest}>
          <div className="h-8 w-full animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-200" />
        </Card>
      );
    }

    if (aqi == null) {
      return (
        <Card ref={ref} role="img" aria-label={emptyLabel} className={className} {...rest}>
          <p className="text-sm text-muted">{emptyLabel}</p>
        </Card>
      );
    }

    const meta = bandFor(aqi);
    const markerPct = clamp(aqi, 0, 300) / 300;

    return (
      <Card
        ref={ref}
        role="img"
        aria-label={`Air quality index ${aqi}, ${meta.label}`}
        className={className}
        {...rest}
      >
        <div className="flex flex-row items-center gap-2">
          <Icon glyph="🫁" size="lg" aria-label="Air quality" />
          <span className="text-sm text-muted">Air Quality</span>
        </div>

        <div className="mt-1 flex flex-row items-baseline gap-2">
          <span className="text-3xl font-extrabold text-on-surface">{aqi}</span>
          <Badge tone={meta.tone}>
            <span aria-hidden="true">{meta.glyph}</span>
            {meta.label}
          </Badge>
        </div>

        {/* Token scale track with a positioned marker. */}
        <div className="relative mt-2 h-2 rounded-full bg-neutral-100">
          <span
            aria-hidden="true"
            className={cn('absolute top-1/2 h-3.5 w-1 -translate-y-1/2 rounded-full', TONE_MARKER[meta.tone])}
            style={{ left: `${markerPct * 100}%`, marginLeft: -2 }}
          />
        </div>

        {pollutant ? <p className="mt-2 text-xs text-muted">Dominant: {pollutant}</p> : null}
        {advice ? <p className="mt-1 text-sm text-on-surface">{advice}</p> : null}
      </Card>
    );
  }
);

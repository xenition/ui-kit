import * as React from 'react';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { IconV4 } from '../primitives/IconV4';
import { TONE_INK, toneGround, type FarmTone } from './internal/farm-v4';
import type { AdvisoryKind, AdvisorySeverity, WeatherAdvisoryProps } from './WeatherAdvisory';

export interface WeatherAdvisoryV4Props extends WeatherAdvisoryProps {
  /** Override the severity names — four English words lived inside the component. */
  severityLabels?: Partial<Record<AdvisorySeverity, string>>;
}

/** Kind → glyph. Domain knowledge, so it stays here. */
const KIND_GLYPH: Record<AdvisoryKind, string> = {
  frost: '❄️',
  heat: '🔥',
  rain: '🌧️',
  wind: '💨',
  drought: '🏜️',
  storm: '⛈️',
  general: '🌤️',
};

/**
 * Severity → tone and default label.
 *
 * `watch` and `warning` share `warn`: the tone scale has three steps and the
 * severity scale has four, and the **word** is what separates a watch from a
 * warning — which is how a meteorological service separates them too.
 */
const SEVERITY_META: Record<AdvisorySeverity, { label: string; tone: FarmTone }> = {
  info: { label: 'Info', tone: 'primary' },
  watch: { label: 'Watch', tone: 'warn' },
  warning: { label: 'Warning', tone: 'warn' },
  severe: { label: 'Severe', tone: 'danger' },
};

/**
 * **V4 weather advisory** — the web twin of the native `WeatherAdvisoryV4`,
 * same props as {@link WeatherAdvisory} plus `severityLabels`.
 *
 * ## Four changes
 *
 * 1. **Severity reads without colour**, via the badge word beside the tint.
 * 2. **The tint is a `color-mix()` over the semantic variables**, so it lands
 *    correctly in dark mode.
 * 3. **The glyph takes the contrast-corrected ink**, not the fill slot.
 * 4. **`role="alert"` is on the severe end only.** The base announced every
 *    advisory as an alert including `info`, which trains a screen-reader user
 *    to ignore the ones that matter — an `info` advisory is a status, a
 *    `severe` one interrupts.
 *
 * **Renders nothing without a `title`** (§4.5).
 */
export const WeatherAdvisoryV4 = React.forwardRef<HTMLDivElement, WeatherAdvisoryV4Props>(
  function WeatherAdvisoryV4(
    {
      title,
      message,
      kind = 'general',
      severity = 'info',
      timeframe,
      icon,
      severityLabels,
      className,
      style,
      ...rest
    },
    ref
  ) {
    if (!title) return null;

    const meta = SEVERITY_META[severity];
    const label = severityLabels?.[severity] ?? meta.label;
    const glyph = icon ?? KIND_GLYPH[kind];

    return (
      <div
        ref={ref}
        // Only the severe end interrupts. An `info` advisory that announces
        // itself as an alert is how a user learns to ignore all of them.
        role={severity === 'severe' ? 'alert' : 'status'}
        data-xen-weather-advisory={severity}
        className={cn(
          'flex gap-md rounded-[var(--xen-radius-lg)] border border-border p-md',
          className
        )}
        style={{ background: toneGround(meta.tone), ...style }}
        {...rest}
      >
        <IconV4 glyph={glyph} size="2xl" className={TONE_INK[meta.tone]} />

        <div className="flex min-w-0 flex-1 flex-col gap-xs">
          <div className="flex items-center gap-sm">
            <p className="min-w-0 flex-1 font-heading text-base font-bold text-on-card">{title}</p>
            <BadgeV4 tone={meta.tone} variant="soft" size="sm">
              {label}
            </BadgeV4>
          </div>

          {message ? <p className="text-sm text-on-card">{message}</p> : null}

          {timeframe ? (
            <p className="flex items-center gap-xs text-xs text-muted-text">
              <IconV4 name="clock" size="xs" />
              {timeframe}
            </p>
          ) : null}
        </div>
      </div>
    );
  }
);

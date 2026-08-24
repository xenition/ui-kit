import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, Badge } from '../primitives';
import type { BadgeTone, IconColor } from '../primitives';

/** Advisory category. Drives the default glyph. */
export type AdvisoryKind = 'frost' | 'heat' | 'rain' | 'wind' | 'drought' | 'storm' | 'general';
/** Advisory severity — colors the banner and is stated as a text chip. */
export type AdvisorySeverity = 'info' | 'watch' | 'warning' | 'severe';

export interface WeatherAdvisoryProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Advisory headline (e.g. "Frost expected overnight"). */
  title: string;
  /** Supporting detail (e.g. "Lows near -2°C, 03:00–07:00"). */
  message?: string;
  /** Category. Default `'general'` — selects the leading glyph. */
  kind?: AdvisoryKind;
  /** Severity. Default `'info'` — colors the banner + text chip. */
  severity?: AdvisorySeverity;
  /** Valid-window / timing hint (e.g. "Tonight → 7am"). */
  timeframe?: string;
  /** Override the leading glyph/emoji. */
  icon?: string;
}

const KIND_GLYPH: Record<AdvisoryKind, string> = {
  frost: '❄️',
  heat: '🔥',
  rain: '🌧️',
  wind: '💨',
  drought: '🏜️',
  storm: '⛈️',
  general: '🌤️',
};

const SEVERITY_META: Record<
  AdvisorySeverity,
  { label: string; iconColor: IconColor; edge: string; tone: BadgeTone }
> = {
  info: { label: 'Info', iconColor: 'primary', edge: 'border-primary', tone: 'primary' },
  watch: { label: 'Watch', iconColor: 'warn', edge: 'border-warn', tone: 'warn' },
  warning: { label: 'Warning', iconColor: 'warn', edge: 'border-warn', tone: 'warn' },
  severe: { label: 'Severe', iconColor: 'danger', edge: 'border-danger', tone: 'danger' },
};

/**
 * A weather advisory banner — a token-tinted, accent-barred callout carrying a
 * category glyph, headline, optional message + timeframe, and a severity
 * {@link Badge}. Severity drives the accent color, but the text chip states it
 * too, so the alert never relies on color alone. Announced to assistive tech
 * via `role="alert"`. The tint and left edge come from token classes
 * (`bg-neutral-50` + `border-<tone>`) — no literal colors.
 */
export const WeatherAdvisory = React.forwardRef<HTMLDivElement, WeatherAdvisoryProps>(
  function WeatherAdvisory(
    { title, message, kind = 'general', severity = 'info', timeframe, icon, className, ...rest },
    ref
  ) {
    const meta = SEVERITY_META[severity];
    const glyph = icon ?? KIND_GLYPH[kind];

    return (
      <div
        ref={ref}
        role="alert"
        data-xen-weather-advisory=""
        aria-label={`${meta.label} advisory: ${title}${message ? `. ${message}` : ''}`}
        className={cn(
          'flex gap-2 rounded-[var(--xen-radius-md)] border-l-4 bg-neutral-50 p-3',
          meta.edge,
          className
        )}
        {...rest}
      >
        <Icon glyph={glyph} size="xl" color={meta.iconColor} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1">
            <span className="flex-1 text-base font-bold text-on-surface">{title}</span>
            <Badge tone={meta.tone}>{meta.label}</Badge>
          </div>
          {message != null ? (
            <p className="mt-0.5 text-sm text-on-surface">{message}</p>
          ) : null}
          {timeframe != null ? (
            <p className="mt-1 text-xs text-muted">🕓 {timeframe}</p>
          ) : null}
        </div>
      </div>
    );
  }
);

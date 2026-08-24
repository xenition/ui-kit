import * as React from 'react';
import { cn } from '../primitives/cn';
import type { WeatherAdvisoryProps, AdvisoryKind, AdvisorySeverity } from './WeatherAdvisory';

/** Same public contract as {@link WeatherAdvisory} — a drop-in alternate design. */
export type WeatherAdvisoryV2Props = WeatherAdvisoryProps;

const KIND_GLYPH: Record<AdvisoryKind, string> = { frost: '❄️', heat: '🔥', rain: '🌧️', wind: '💨', drought: '🌵', storm: '⛈️', general: '⚠️' };
const SEV: Record<AdvisorySeverity, { tint: string; text: string; label: string }> = {
  info: { tint: 'bg-primary/10', text: 'text-primary', label: 'Info' },
  watch: { tint: 'bg-warn/10', text: 'text-warn', label: 'Watch' },
  warning: { tint: 'bg-warn/10', text: 'text-warn', label: 'Warning' },
  severe: { tint: 'bg-danger/10', text: 'text-danger', label: 'Severe' },
};

/**
 * WeatherAdvisory, redesigned (v2): a **bold advisory banner**. A severity-tinted
 * panel with a large kind glyph, the headline, the message, a severity pill, and a
 * timeframe — a prominent alert. Distinct from v1. Same props, token-only.
 */
export const WeatherAdvisoryV2 = React.forwardRef<HTMLDivElement, WeatherAdvisoryV2Props>(
  function WeatherAdvisoryV2({ title, message, kind = 'general', severity = 'info', timeframe, icon, className, ...rest }, ref) {
    const s = SEV[severity];
    return (
      <div ref={ref} data-xen-weather-advisory="" role="status" className={cn('flex gap-3 rounded-lg p-md', s.tint, className)} {...rest}>
        <span className="text-3xl" aria-hidden>{icon ?? KIND_GLYPH[kind]}</span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="text-base font-bold text-on-surface">{title}</p>
            <span className={cn('rounded-full px-2 py-0.5 text-xs font-bold', s.text)}>{s.label}</span>
          </div>
          {message ? <p className="mt-0.5 text-sm text-on-surface">{message}</p> : null}
          {timeframe ? <p className="mt-1 text-xs text-muted">🕐 {timeframe}</p> : null}
        </div>
      </div>
    );
  }
);

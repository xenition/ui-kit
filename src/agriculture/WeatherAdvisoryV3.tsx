import * as React from 'react';
import { cn } from '../primitives/cn';
import type { WeatherAdvisoryProps, AdvisoryKind, AdvisorySeverity } from './WeatherAdvisory';

/** Same public contract as {@link WeatherAdvisory} — a drop-in alternate design. */
export type WeatherAdvisoryV3Props = WeatherAdvisoryProps;

const KIND_GLYPH: Record<AdvisoryKind, string> = { frost: '❄️', heat: '🔥', rain: '🌧️', wind: '💨', drought: '🌵', storm: '⛈️', general: '⚠️' };
const SEV: Record<AdvisorySeverity, { text: string; label: string }> = {
  info: { text: 'text-primary', label: 'Info' }, watch: { text: 'text-warn', label: 'Watch' }, warning: { text: 'text-warn', label: 'Warning' }, severe: { text: 'text-danger', label: 'Severe' },
};

/**
 * WeatherAdvisory, redesigned (v3): a **compact advisory line**. A kind glyph, the
 * headline over a message·timeframe line, and a severity word (color + text) on
 * the right — a hairline-bordered inline alert. The opposite of v2's banner. Same
 * props, token-only.
 */
export const WeatherAdvisoryV3 = React.forwardRef<HTMLDivElement, WeatherAdvisoryV3Props>(
  function WeatherAdvisoryV3({ title, message, kind = 'general', severity = 'info', timeframe, icon, className, ...rest }, ref) {
    const s = SEV[severity];
    const sub = [message, timeframe].filter((v): v is string => !!v).join(' · ');
    return (
      <div ref={ref} data-xen-weather-advisory="" role="status" className={cn('flex items-center gap-3 border-b border-border py-2.5', className)} {...rest}>
        <span className="text-lg" aria-hidden>{icon ?? KIND_GLYPH[kind]}</span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-on-surface">{title}</p>
          {sub ? <p className="truncate text-xs text-muted">{sub}</p> : null}
        </div>
        <span className={cn('shrink-0 text-xs font-bold', s.text)}>{s.label}</span>
      </div>
    );
  }
);

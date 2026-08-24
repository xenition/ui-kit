import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyState } from '../commerce';
import { conditionGlyph, conditionLabel } from './weather-utils';
import type { HourlyRowProps } from './HourlyRow';

/** Same public contract as {@link HourlyRow} — a drop-in alternate design. */
export type HourlyRowV2Props = HourlyRowProps;

/**
 * HourlyRow, redesigned (v2): an **hourly bar chart**. Each hour is a column with
 * the temperature, a proportional bar (taller = warmer across the window), the
 * condition glyph, and a precip hint. A visual trend vs. v1's flat list. Same
 * props, token-only.
 */
export const HourlyRowV2 = React.forwardRef<HTMLDivElement, HourlyRowV2Props>(function HourlyRowV2(
  { hours, unit = '°', showPrecip = true, onSelectHour, emptyLabel = 'No hourly data', className, ...rest },
  ref
) {
  if (hours.length === 0) {
    return <EmptyState ref={ref} icon={<span className="text-3xl">🕐</span>} title={emptyLabel} className={className} />;
  }
  const temps = hours.map((h) => h.temperature).filter((t): t is number => typeof t === 'number');
  const min = temps.length ? Math.min(...temps) : 0;
  const max = temps.length ? Math.max(...temps) : 1;
  const height = (t?: number): number => (typeof t !== 'number' || max === min ? 40 : 20 + ((t - min) / (max - min)) * 60);

  return (
    <div ref={ref} data-xen-hourly-row="" className={cn('flex gap-2 overflow-x-auto', className)} {...rest}>
      {hours.map((h, i) => {
        const interactive = typeof onSelectHour === 'function';
        return (
          <button
            key={`${h.time}-${i}`}
            type="button"
            aria-label={`${h.time}${typeof h.temperature === 'number' ? `, ${h.temperature}${unit}` : ''}${h.condition ? `, ${conditionLabel(h.condition)}` : ''}`}
            disabled={!interactive}
            onClick={interactive ? () => onSelectHour?.(h, i) : undefined}
            className="flex w-14 shrink-0 flex-col items-center gap-1"
          >
            <span className="text-xs font-bold text-on-surface">{typeof h.temperature === 'number' ? `${h.temperature}${unit}` : ''}</span>
            <span className="flex h-24 w-full items-end justify-center">
              <span className="w-2 rounded-full bg-primary" style={{ height: `${height(h.temperature)}%` }} />
            </span>
            {h.condition ? <span className="text-base" aria-hidden>{conditionGlyph(h.condition)}</span> : null}
            {showPrecip && typeof h.precip === 'number' ? <span className="text-[10px] text-primary">💧{h.precip}%</span> : null}
            <span className="text-[10px] text-muted">{h.time}</span>
          </button>
        );
      })}
    </div>
  );
});

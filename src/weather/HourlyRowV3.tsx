import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyState } from '../commerce';
import { conditionGlyph, conditionLabel } from './weather-utils';
import type { HourlyRowProps } from './HourlyRow';

/** Same public contract as {@link HourlyRow} — a drop-in alternate design. */
export type HourlyRowV3Props = HourlyRowProps;

/**
 * HourlyRow, redesigned (v3): a **tight hour ticker**. Very small columns — time,
 * glyph, temperature, and an optional precip hint — pack into a horizontal scroll
 * for a compact strip. The minimal counterpart to v2's bar chart. Same props,
 * token-only.
 */
export const HourlyRowV3 = React.forwardRef<HTMLDivElement, HourlyRowV3Props>(function HourlyRowV3(
  { hours, unit = '°', showPrecip = true, onSelectHour, emptyLabel = 'No hourly data', className, ...rest },
  ref
) {
  if (hours.length === 0) {
    return <EmptyState ref={ref} icon={<span className="text-3xl">🕐</span>} title={emptyLabel} className={className} />;
  }
  return (
    <div ref={ref} data-xen-hourly-row="" className={cn('flex gap-3 overflow-x-auto', className)} {...rest}>
      {hours.map((h, i) => {
        const interactive = typeof onSelectHour === 'function';
        return (
          <button
            key={`${h.time}-${i}`}
            type="button"
            aria-label={`${h.time}${typeof h.temperature === 'number' ? `, ${h.temperature}${unit}` : ''}${h.condition ? `, ${conditionLabel(h.condition)}` : ''}`}
            disabled={!interactive}
            onClick={interactive ? () => onSelectHour?.(h, i) : undefined}
            className="flex shrink-0 flex-col items-center gap-0.5"
          >
            <span className="text-[10px] text-muted">{h.time}</span>
            {h.condition ? <span className="text-base" aria-hidden>{conditionGlyph(h.condition)}</span> : null}
            <span className="text-xs font-bold text-on-surface">{typeof h.temperature === 'number' ? `${h.temperature}${unit}` : ''}</span>
            {showPrecip && typeof h.precip === 'number' ? <span className="text-[10px] text-primary">💧{h.precip}%</span> : null}
          </button>
        );
      })}
    </div>
  );
});

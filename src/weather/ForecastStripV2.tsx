import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyState } from '../commerce';
import { conditionGlyph, conditionLabel } from './weather-utils';
import type { ForecastStripProps } from './ForecastStrip';

/** Same public contract as {@link ForecastStrip} — a drop-in alternate design. */
export type ForecastStripV2Props = ForecastStripProps;

/**
 * ForecastStrip, redesigned (v2): a **row of day cards**. Each day is a raised
 * mini-card — label, condition glyph, high/low, and a precip chip — that fills
 * primary-tinted when selected. Bolder than v1's compact columns. Same props,
 * token-only.
 */
export const ForecastStripV2 = React.forwardRef<HTMLDivElement, ForecastStripV2Props>(
  function ForecastStripV2({ days, unit = '°', selectedIndex, onSelectDay, variant, emptyLabel = 'No forecast', className, ...rest }, ref) {
    void variant;
    if (days.length === 0) {
      return <EmptyState ref={ref} icon={<span className="text-3xl">🌤️</span>} title={emptyLabel} className={className} />;
    }
    return (
      <div ref={ref} data-xen-forecast-strip="" className={cn('flex gap-2 overflow-x-auto', className)} {...rest}>
        {days.map((d, i) => {
          const selected = selectedIndex === i;
          const interactive = typeof onSelectDay === 'function';
          return (
            <button
              key={`${d.label}-${i}`}
              type="button"
              aria-pressed={selected}
              aria-label={`${d.label}${d.condition ? `, ${conditionLabel(d.condition)}` : ''}`}
              disabled={!interactive}
              onClick={interactive ? () => onSelectDay?.(d, i) : undefined}
              className={cn('flex w-20 shrink-0 flex-col items-center gap-1 rounded-lg p-3 shadow-sm transition-colors', selected ? 'bg-primary/10 ring-2 ring-primary' : 'bg-surface')}
            >
              <span className="text-xs font-semibold text-on-surface">{d.label}</span>
              {d.condition ? <span className="text-2xl" aria-hidden>{conditionGlyph(d.condition)}</span> : null}
              <span className="text-sm font-bold text-on-surface">
                {typeof d.high === 'number' ? `${d.high}${unit}` : ''}
                {typeof d.low === 'number' ? <span className="font-normal text-muted"> {d.low}{unit}</span> : null}
              </span>
              {typeof d.precip === 'number' ? <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] text-primary">💧{d.precip}%</span> : null}
            </button>
          );
        })}
      </div>
    );
  }
);

import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyState } from '../commerce';
import { conditionGlyph, conditionLabel } from './weather-utils';
import type { ForecastStripProps } from './ForecastStrip';

/** Same public contract as {@link ForecastStrip} — a drop-in alternate design. */
export type ForecastStripV3Props = ForecastStripProps;

/**
 * ForecastStrip, redesigned (v3): a **vertical day list**. Each day is a hairline
 * row — label, condition glyph, a precip hint, and the high/low pinned right —
 * stacked for an at-a-glance week. The opposite of v2's card row. Same props,
 * token-only.
 */
export const ForecastStripV3 = React.forwardRef<HTMLDivElement, ForecastStripV3Props>(
  function ForecastStripV3({ days, unit = '°', selectedIndex, onSelectDay, variant, emptyLabel = 'No forecast', className, ...rest }, ref) {
    void variant;
    if (days.length === 0) {
      return <EmptyState ref={ref} icon={<span className="text-3xl">🌤️</span>} title={emptyLabel} className={className} />;
    }
    return (
      <div ref={ref} data-xen-forecast-strip="" className={cn('flex flex-col', className)} {...rest}>
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
              className={cn('flex items-center gap-3 border-b border-border py-2 text-left transition-colors', selected ? 'bg-primary/5' : interactive ? 'hover:bg-neutral-50' : '')}
            >
              <span className="w-10 shrink-0 text-sm font-medium text-on-surface">{d.label}</span>
              {d.condition ? <span className="text-lg" aria-hidden>{conditionGlyph(d.condition)}</span> : null}
              {typeof d.precip === 'number' ? <span className="text-xs text-primary">💧{d.precip}%</span> : null}
              <span className="ml-auto text-sm tabular-nums text-on-surface">
                {typeof d.high === 'number' ? `${d.high}${unit}` : ''}
                {typeof d.low === 'number' ? <span className="text-muted"> / {d.low}{unit}</span> : null}
              </span>
            </button>
          );
        })}
      </div>
    );
  }
);

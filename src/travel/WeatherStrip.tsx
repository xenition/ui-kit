import * as React from 'react';
import { cn } from '../primitives/cn';

/** One day's forecast. */
export interface WeatherDay {
  /** Short day label, e.g. `'Mon'`. */
  day: string;
  /** Condition glyph/emoji, e.g. `'☀️'`. */
  glyph?: string;
  /** High temperature (already in the display unit). */
  high: number;
  /** Low temperature. */
  low?: number;
  /** Spoken condition, e.g. `'Sunny'` (used in the a11y label). */
  condition?: string;
}

export interface WeatherStripProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Days to display, in order. */
  days: readonly WeatherDay[];
  /** Unit suffix appended to temperatures (default `'°'`). */
  unit?: string;
  /** Index of the day to emphasize (e.g. today). */
  highlightIndex?: number;
  /** Horizontal scroll (default `true`); set `false` to wrap in a fixed width. */
  scrollEnabled?: boolean;
}

/**
 * Web parity of the native `WeatherStrip`: a horizontal multi-day forecast strip
 * — one token-styled tile per day with a condition glyph and high/low
 * temperatures. The `highlightIndex` day gets a primary-tinted tile and is
 * announced as "today". Renders an empty hint when there are no days. Token-only
 * colors.
 */
export const WeatherStrip = React.forwardRef<HTMLDivElement, WeatherStripProps>(
  function WeatherStrip(
    { days, unit = '°', highlightIndex, scrollEnabled = true, className, ...rest },
    ref
  ) {
    if (days.length === 0) {
      return (
        <div ref={ref} data-xen-weather-strip="" className={cn('text-sm text-muted', className)} {...rest}>
          No forecast available.
        </div>
      );
    }

    const tiles = days.map((d, i) => {
      const active = i === highlightIndex;
      return (
        <div
          key={`${d.day}-${i}`}
          aria-label={`${d.day}${active ? ' today' : ''}, ${d.condition ? `${d.condition}, ` : ''}high ${d.high}${unit}${
            typeof d.low === 'number' ? `, low ${d.low}${unit}` : ''
          }`}
          className={cn(
            'flex min-w-[64px] flex-col items-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] border px-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
            active ? 'border-primary bg-primary' : 'border-border bg-surface'
          )}
        >
          <span className={cn('text-xs font-semibold', active ? 'text-on-primary' : 'text-muted')}>
            {d.day}
          </span>
          <span aria-hidden="true" className={cn('text-lg', active ? 'text-on-primary' : 'text-on-surface')}>
            {d.glyph ?? '—'}
          </span>
          <div className="flex items-baseline gap-[var(--xen-space-xs)]">
            <span className={cn('text-sm font-bold', active ? 'text-on-primary' : 'text-on-surface')}>
              {d.high}
              {unit}
            </span>
            {typeof d.low === 'number' ? (
              <span className={cn('text-xs', active ? 'text-on-primary' : 'text-muted')}>
                {d.low}
                {unit}
              </span>
            ) : null}
          </div>
        </div>
      );
    });

    return (
      <div
        ref={ref}
        data-xen-weather-strip=""
        className={cn(
          'gap-[var(--xen-space-sm)]',
          scrollEnabled ? 'flex overflow-x-auto' : 'flex flex-wrap',
          className
        )}
        {...rest}
      >
        {tiles}
      </div>
    );
  }
);

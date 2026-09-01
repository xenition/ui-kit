import * as React from 'react';
import { cn } from '../primitives/cn';
import type { WeatherStripProps } from './WeatherStrip';

/** Drop-in for {@link WeatherStripProps} — same props, the V4 "journey" design. */
export type WeatherStripV4Props = WeatherStripProps;

/**
 * WeatherStrip — **V4** "journey" design (web parity of the native V4). The
 * boarding-pass take on a multi-day forecast: a horizontal strip of day tiles
 * where the `highlightIndex` day is lifted onto a brand-gradient fill with
 * near-white ink (the signature V4 touch) and announced as "today", while the
 * other tiles stay clean surface with a hairline edge and muted labels. Condition
 * glyphs and high/low temperatures are preserved. Renders an empty hint when
 * there are no days. Same props/behavior as {@link WeatherStripProps}; all colors
 * from `--xen-*` token classes (no literal colors).
 */
export const WeatherStripV4 = React.forwardRef<HTMLDivElement, WeatherStripV4Props>(
  function WeatherStripV4(
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
            active
              ? 'border-transparent bg-gradient-to-br from-primary-400 to-primary-600'
              : 'border-border bg-surface'
          )}
        >
          <span className={cn('text-xs font-semibold', active ? 'text-primary-50' : 'text-muted')}>
            {d.day}
          </span>
          <span aria-hidden="true" className={cn('text-lg', active ? 'text-primary-50' : 'text-on-surface')}>
            {d.glyph ?? '—'}
          </span>
          <div className="flex items-baseline gap-[var(--xen-space-xs)]">
            <span className={cn('text-sm font-bold', active ? 'text-primary-50' : 'text-on-surface')}>
              {d.high}
              {unit}
            </span>
            {typeof d.low === 'number' ? (
              <span className={cn('text-xs', active ? 'text-primary-100' : 'text-muted')}>
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

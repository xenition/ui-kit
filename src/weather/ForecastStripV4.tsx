import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { conditionGlyph, conditionLabel, type WeatherCondition } from './weather-utils';
import type { ForecastDay, ForecastStripProps } from './ForecastStrip';

/** Drop-in for {@link ForecastStripProps} — same props, a different design. */
export type ForecastStripV4Props = ForecastStripProps;

/**
 * ForecastStrip — **tiled on a brand ground** design (v4), web parity of the
 * native `ForecastStripV4`. A `primary`-colored panel of soft day tiles
 * (horizontal scroll, or full-width rows under `variant='list'`): day label,
 * condition glyph + label, and high/low. The selected day inverts to a solid
 * `on-primary` tile with `primary` text — a filled chip plus a bold label, never
 * color alone. All colors come from `--xen-*` classes, no literals. Renders a
 * muted line when `days` is empty. Same props as {@link ForecastStripProps}.
 */
export const ForecastStripV4 = React.forwardRef<HTMLDivElement, ForecastStripV4Props>(
  function ForecastStripV4(
    { days, unit = '°', selectedIndex, onSelectDay, variant = 'scroll', emptyLabel = 'No forecast available', className, ...rest },
    ref
  ) {
    const ground = 'rounded-[var(--xen-radius-lg)] bg-gradient-to-b from-primary-400 to-primary-700 p-4';
    const isRow = variant === 'list';

    if (days.length === 0) {
      return (
        <div ref={ref} className={cn(ground, className)} {...rest}>
          <p className="text-center text-sm text-primary-100">{emptyLabel}</p>
        </div>
      );
    }

    const renderCell = (day: ForecastDay, index: number): React.ReactElement => {
      const selected = index === selectedIndex;
      const label = conditionLabel(day.condition as WeatherCondition | undefined);
      const glyph = conditionGlyph(day.condition as WeatherCondition | undefined);

      return (
        <button
          key={`${day.label}-${index}`}
          type="button"
          aria-pressed={selected}
          aria-label={`${day.label}, ${label}${day.high != null ? `, high ${day.high}${unit}` : ''}${
            day.low != null ? `, low ${day.low}${unit}` : ''
          }`}
          onClick={onSelectDay ? () => onSelectDay(day, index) : undefined}
          className={cn(
            'flex gap-1 rounded-[var(--xen-radius-md)] px-3 py-3 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-primary',
            isRow ? 'flex-row items-center justify-between' : 'min-w-[68px] flex-col items-center',
            selected ? 'bg-on-primary' : 'bg-primary-500 hover:opacity-90'
          )}
        >
          <span
            className={cn(
              'text-sm',
              isRow && 'flex-1 text-left',
              selected ? 'font-extrabold text-primary' : 'font-semibold text-on-primary'
            )}
          >
            {day.label}
          </span>
          <Icon glyph={glyph} size="lg" aria-label={label} color={selected ? 'primary' : 'onPrimary'} />
          <span className="flex flex-row items-center gap-1">
            <span className={cn('text-sm font-extrabold', selected ? 'text-primary' : 'text-on-primary')}>
              {day.high != null ? `${day.high}${unit}` : '—'}
            </span>
            <span className={cn('text-sm', selected ? 'text-primary' : 'text-primary-100')}>
              {day.low != null ? `${day.low}${unit}` : '—'}
            </span>
          </span>
          {day.precip != null ? (
            <span className={cn('text-xs', selected ? 'text-primary' : 'text-primary-100')}>💧 {day.precip}%</span>
          ) : null}
        </button>
      );
    };

    return (
      <div ref={ref} className={cn(ground, className)} {...rest}>
        <div className={cn('flex gap-2', isRow ? 'flex-col' : 'flex-row overflow-x-auto')}>{days.map(renderCell)}</div>
      </div>
    );
  }
);

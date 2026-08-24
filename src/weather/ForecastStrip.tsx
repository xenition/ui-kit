import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Icon } from '../primitives/Icon';
import { EmptyState } from '../commerce';
import { conditionGlyph, conditionLabel, type WeatherCondition } from './weather-utils';

export interface ForecastDay {
  /** Short day label (e.g. `'Mon'`) or a date string. */
  label: string;
  condition?: WeatherCondition;
  high?: number;
  low?: number;
  /** Chance of precipitation, 0–100. */
  precip?: number;
}

/** `scroll` = horizontal strip; `list` = full-width stacked rows. */
export type ForecastStripVariant = 'scroll' | 'list';

export interface ForecastStripProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The days to render (7-day is the common case, but any length works). */
  days: ForecastDay[];
  /** Unit suffix appended to temperatures. Default `'°'`. */
  unit?: string;
  /** Index of the currently-selected day (controlled highlight). */
  selectedIndex?: number;
  /** Fired with the tapped day + its index. */
  onSelectDay?: (day: ForecastDay, index: number) => void;
  /** Layout. Default `'scroll'`. */
  variant?: ForecastStripVariant;
  /** Message shown when `days` is empty. */
  emptyLabel?: string;
}

/**
 * Multi-day forecast (web parity of the native `ForecastStrip`). Each day is a
 * tappable `<button>` cell showing its label, the condition as a glyph + short
 * text, and high/low temps; an optional precip chance sits underneath.
 * `variant='scroll'` lays the days out in a horizontally-scrolling row; `'list'`
 * stacks full-width rows. The selected day is highlighted with a token tint AND
 * a bold label + border — never color alone. Renders an `EmptyState` when `days`
 * is empty. All colors come from the `--xen-*` tokens via Tailwind classes.
 */
export const ForecastStrip = React.forwardRef<HTMLDivElement, ForecastStripProps>(
  function ForecastStrip(
    {
      days,
      unit = '°',
      selectedIndex,
      onSelectDay,
      variant = 'scroll',
      emptyLabel = 'No forecast available',
      className,
      ...rest
    },
    ref
  ) {
    if (days.length === 0) {
      return (
        <EmptyState
          ref={ref}
          icon={<Icon glyph="🌤️" size="2xl" aria-hidden />}
          title={emptyLabel}
          className={className}
          {...rest}
        />
      );
    }

    const isRow = variant === 'list';

    const renderCell = (day: ForecastDay, index: number): React.ReactElement => {
      const selected = index === selectedIndex;
      const label = conditionLabel(day.condition);
      const glyph = conditionGlyph(day.condition);

      return (
        <button
          key={`${day.label}-${index}`}
          type="button"
          aria-pressed={selected}
          aria-label={`${day.label}, ${label}${
            day.high != null ? `, high ${day.high}${unit}` : ''
          }${day.low != null ? `, low ${day.low}${unit}` : ''}`}
          onClick={onSelectDay ? () => onSelectDay(day, index) : undefined}
          className={cn(
            'flex gap-1 rounded-[var(--xen-radius-md)] px-3 py-2 transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
            isRow ? 'flex-row items-center' : 'min-w-[72px] flex-col items-center',
            selected
              ? 'border border-primary bg-primary-50'
              : 'border border-transparent hover:bg-neutral-100'
          )}
        >
          <span
            className={cn(
              'text-sm',
              isRow && 'flex-1 text-left',
              selected ? 'font-bold text-primary' : 'font-semibold text-on-surface'
            )}
          >
            {day.label}
          </span>
          <Icon glyph={glyph} size="lg" aria-label={label} />
          <span className="flex flex-row items-center gap-1">
            <span className="text-sm font-semibold text-on-surface">
              {day.high != null ? `${day.high}${unit}` : '—'}
            </span>
            <span className="text-sm text-muted">
              {day.low != null ? `${day.low}${unit}` : '—'}
            </span>
          </span>
          {day.precip != null ? (
            <span className="text-xs text-muted">💧 {day.precip}%</span>
          ) : null}
        </button>
      );
    };

    return (
      <Card ref={ref} className={className} {...rest}>
        <div
          className={cn(
            'flex gap-1',
            isRow ? 'flex-col' : 'flex-row overflow-x-auto'
          )}
        >
          {days.map(renderCell)}
        </div>
      </Card>
    );
  }
);

import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Icon } from '../primitives/Icon';
import { EmptyState } from '../commerce';
import { clamp, conditionGlyph, conditionLabel, type WeatherCondition } from './weather-utils';

export interface HourlyPoint {
  /** Hour label (e.g. `'3 PM'` or `'15:00'`). */
  time: string;
  condition?: WeatherCondition;
  temperature?: number;
  /** Chance of precipitation, 0–100. */
  precip?: number;
}

export interface HourlyRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Per-hour points, rendered left→right in a horizontal scroll. */
  hours: HourlyPoint[];
  /** Unit suffix appended to temperatures. Default `'°'`. */
  unit?: string;
  /** Show the precip-chance line under each hour. Default `true`. */
  showPrecip?: boolean;
  /** Fired with the tapped hour + its index. */
  onSelectHour?: (hour: HourlyPoint, index: number) => void;
  /** Message shown when `hours` is empty. */
  emptyLabel?: string;
}

/**
 * Horizontal hour-by-hour timeline (web parity of the native `HourlyRow`): each
 * column shows the time, the condition as a glyph + label, the temperature, and
 * (optionally) precip chance. A horizontally-scrolling row of token-styled
 * columns — the condition is conveyed by glyph and text, never color alone. Each
 * column is a `<button>` when `onSelectHour` is set, otherwise a static cell.
 * Renders an `EmptyState` when `hours` is empty. All colors come from the
 * `--xen-*` tokens via Tailwind classes.
 */
export const HourlyRow = React.forwardRef<HTMLDivElement, HourlyRowProps>(function HourlyRow(
  { hours, unit = '°', showPrecip = true, onSelectHour, emptyLabel = 'No hourly data', className, ...rest },
  ref
) {
  if (hours.length === 0) {
    return (
      <EmptyState
        ref={ref}
        icon={<Icon glyph="🕐" size="2xl" aria-hidden />}
        title={emptyLabel}
        className={className}
        {...rest}
      />
    );
  }

  return (
    <Card ref={ref} className={className} {...rest}>
      <div className="flex flex-row gap-4 overflow-x-auto">
        {hours.map((hour, index) => {
          const label = conditionLabel(hour.condition);
          const glyph = conditionGlyph(hour.condition);
          const Tag = onSelectHour ? 'button' : 'div';
          return (
            <Tag
              key={`${hour.time}-${index}`}
              {...(onSelectHour
                ? { type: 'button' as const, onClick: () => onSelectHour(hour, index) }
                : {})}
              aria-label={`${hour.time}, ${label}${
                hour.temperature != null ? `, ${hour.temperature}${unit}` : ''
              }`}
              className={cn(
                'flex min-w-[56px] flex-col items-center gap-1',
                onSelectHour &&
                  'rounded-[var(--xen-radius-md)] px-1 py-1 hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'
              )}
            >
              <span className="text-xs text-muted">{hour.time}</span>
              <Icon glyph={glyph} size="lg" aria-label={label} />
              <span className="text-base font-bold text-on-surface">
                {hour.temperature != null ? `${hour.temperature}${unit}` : '—'}
              </span>
              {showPrecip && hour.precip != null ? (
                <span className="text-xs text-muted">💧 {clamp(hour.precip, 0, 100)}%</span>
              ) : null}
            </Tag>
          );
        })}
      </div>
    </Card>
  );
});

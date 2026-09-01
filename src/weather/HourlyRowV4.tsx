import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { clamp, conditionGlyph, conditionLabel } from './weather-utils';
import type { HourlyRowProps } from './HourlyRow';

/** Drop-in for {@link HourlyRowProps} — same props, a different design. */
export type HourlyRowV4Props = HourlyRowProps;

/**
 * HourlyRow — **tiled on a brand ground** design (v4), web parity of the native
 * `HourlyRowV4`. A `primary`-colored panel holding a horizontal scroll of soft
 * tiles, one per hour: the time, a condition glyph + label, the temperature, and
 * an optional precip chance. Ground is `primary`, tiles a lighter ramp step, text
 * the contrast-guaranteed `on-primary` — all from `--xen-*` classes, no literal
 * colors; the condition is a glyph AND text. Each tile is a `<button>` when
 * `onSelectHour` is set. Renders a muted line when `hours` is empty. Same props
 * as {@link HourlyRowProps}.
 */
export const HourlyRowV4 = React.forwardRef<HTMLDivElement, HourlyRowV4Props>(function HourlyRowV4(
  { hours, unit = '°', showPrecip = true, onSelectHour, emptyLabel = 'No hourly data', className, ...rest },
  ref
) {
  const ground = 'rounded-[var(--xen-radius-lg)] bg-gradient-to-b from-primary-400 to-primary-700 p-4';

  if (hours.length === 0) {
    return (
      <div ref={ref} className={cn(ground, className)} {...rest}>
        <p className="text-center text-sm text-primary-100">{emptyLabel}</p>
      </div>
    );
  }

  return (
    <div ref={ref} className={cn(ground, className)} {...rest}>
      <div className="flex flex-row gap-3 overflow-x-auto">
        {hours.map((hour, index) => {
          const label = conditionLabel(hour.condition);
          const glyph = conditionGlyph(hour.condition);
          const Tag = onSelectHour ? 'button' : 'div';
          return (
            <Tag
              key={`${hour.time}-${index}`}
              {...(onSelectHour ? { type: 'button' as const, onClick: () => onSelectHour(hour, index) } : {})}
              aria-label={`${hour.time}, ${label}${hour.temperature != null ? `, ${hour.temperature}${unit}` : ''}`}
              className={cn(
                'flex min-w-[60px] flex-col items-center gap-1 rounded-full bg-primary-500 px-2 py-3',
                onSelectHour &&
                  'transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-primary'
              )}
            >
              <span className="text-xs text-primary-100">{hour.time}</span>
              <Icon glyph={glyph} size="lg" aria-label={label} color="onPrimary" />
              <span className="text-base font-extrabold text-on-primary">
                {hour.temperature != null ? `${hour.temperature}${unit}` : '—'}
              </span>
              {showPrecip && hour.precip != null ? (
                <span className="text-xs text-primary-100">💧 {clamp(hour.precip, 0, 100)}%</span>
              ) : null}
            </Tag>
          );
        })}
      </div>
    </div>
  );
});

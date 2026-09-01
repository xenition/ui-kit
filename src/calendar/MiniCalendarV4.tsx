import * as React from 'react';
import { cn } from '../primitives/cn';
import { IconV4 } from '../primitives/IconV4';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import { addMonths, monthGrid, sameDay } from './format';
import { monthTitle, weekdayNames } from './layout-v4';
import type { MiniCalendarProps } from './MiniCalendar';

export interface MiniCalendarV4Props extends MiniCalendarProps {
  /** Locale for the header and the weekday row. Default: the browser's. */
  locale?: string;
  /** Accessible names for the two chevrons. */
  previousLabel?: string;
  nextLabel?: string;
  /** Appended to today's accessible name. Default `'today'`. */
  todayLabel?: string;
  /** Appended to a marked day's accessible name. Default `'has events'`. */
  markedLabel?: string;
}

/**
 * **V4 mini calendar** — the web twin of the native `MiniCalendarV4`, same
 * props as {@link MiniCalendar} plus `locale` and four copy hooks.
 *
 * ## Four changes
 *
 * 1. **The header and weekday row are localized**, where the base used frozen
 *    English arrays.
 * 2. **The month chevrons clear 44 and carry names.**
 * 3. **A marked day says so.** The base drew a dot and nothing else, so the
 *    one piece of information a mini calendar carries was invisible to a
 *    screen reader and to a colour-blind user.
 * 4. **The grid is a real `role="grid"`.**
 */
export const MiniCalendarV4 = React.forwardRef<HTMLDivElement, MiniCalendarV4Props>(
  function MiniCalendarV4(
    {
      month,
      selected,
      today,
      marks = [],
      weekStartsOn = 0,
      variant = 'bordered',
      locale,
      previousLabel,
      nextLabel,
      todayLabel = 'today',
      markedLabel = 'has events',
      onSelectDate,
      onMonthChange,
      className,
      ...rest
    },
    ref
  ) {
    const cells = React.useMemo(() => monthGrid(month, weekStartsOn), [month, weekStartsOn]);
    const headers = React.useMemo(
      () => weekdayNames(weekStartsOn, { locale, width: 'narrow' }),
      [weekStartsOn, locale]
    );
    const title = monthTitle(month, { locale, month: 'long' });
    const longDate = React.useMemo(
      () => new Intl.DateTimeFormat(locale, { weekday: 'long', month: 'long', day: 'numeric' }),
      [locale]
    );
    const isMarked = (date: Date): boolean => marks.some((m) => sameDay(m, date));

    const chevron = (direction: -1 | 1): React.ReactElement => (
      <button
        type="button"
        aria-label={
          direction < 0 ? (previousLabel ?? 'Previous month') : (nextLabel ?? 'Next month')
        }
        onClick={() => onMonthChange?.(addMonths(month, direction))}
        data-xen-v4-chrome="on-surface"
        className={cn(
          'inline-flex w-11 shrink-0 items-center justify-center rounded-full text-on-surface',
          MIN_TAP_CLASS
        )}
      >
        <IconV4 name={direction < 0 ? 'chevron-left' : 'chevron-right'} size="base" />
      </button>
    );

    return (
      <div
        ref={ref}
        role="grid"
        data-xen-mini-calendar={variant}
        className={cn(
          'flex flex-col gap-xs',
          variant === 'bordered' &&
            'rounded-[var(--xen-radius-md)] border border-border bg-card p-sm',
          className
        )}
        {...rest}
      >
        <div className="flex items-center">
          {onMonthChange ? chevron(-1) : null}
          <h3 className="flex-1 text-center text-sm font-semibold text-on-card">{title}</h3>
          {onMonthChange ? chevron(1) : null}
        </div>

        <div role="row" className="grid grid-cols-7">
          {headers.map((w, i) => (
            <div key={i} role="columnheader" aria-label={w} className="text-center text-xs text-muted-text">
              {w}
            </div>
          ))}
        </div>

        {Array.from({ length: cells.length / 7 }).map((_, row) => (
          <div role="row" key={row} className="grid grid-cols-7">
            {cells.slice(row * 7, row * 7 + 7).map((date, col) => {
              if (date == null) return <div role="gridcell" key={col} className={MIN_TAP_CLASS} />;
              const isSelected = selected != null && sameDay(selected, date);
              const isToday = today != null && sameDay(today, date);
              const marked = isMarked(date);

              return (
                <div role="gridcell" key={col}>
                  <button
                    type="button"
                    disabled={!onSelectDate}
                    aria-label={[
                      longDate.format(date),
                      isToday ? todayLabel : null,
                      marked ? markedLabel : null,
                    ]
                      .filter(Boolean)
                      .join(', ')}
                    aria-pressed={isSelected}
                    onClick={() => onSelectDate?.(date)}
                    data-xen-v4-chrome={isSelected ? 'filled-primary' : 'on-surface'}
                    className={cn(
                      'relative flex w-full items-center justify-center rounded-full border-2',
                      MIN_TAP_CLASS,
                      isToday && !isSelected ? 'border-primary' : 'border-transparent',
                      isSelected ? 'bg-primary text-on-primary' : 'text-on-card'
                    )}
                  >
                    <span
                      className={cn(
                        'text-xs [font-variant-numeric:tabular-nums]',
                        (isSelected || isToday) && 'font-bold'
                      )}
                    >
                      {date.getDate()}
                    </span>
                    {marked ? (
                      <span
                        aria-hidden
                        className={cn(
                          'absolute bottom-1 h-1 w-1 rounded-full',
                          isSelected ? 'bg-on-primary' : 'bg-primary'
                        )}
                      />
                    ) : null}
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  }
);

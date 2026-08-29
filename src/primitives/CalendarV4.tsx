import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import type { CalendarProps } from './Calendar';
import { cn } from './cn';
import { PICKER_V4_CSS, useDepth } from './internal/picker-v4';

export type { CalendarProps as CalendarV4Props };

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] as const;
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
] as const;

function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/**
 * **V4 calendar** — the web twin of `CalendarV4`, the same props as
 * {@link Calendar}, a different design line.
 *
 * ## It still looks like a calendar
 *
 * §31 asks for familiar interactions, and a month grid is about as settled a
 * pattern as software has: seven columns, a weekday header, chevrons to page.
 * Nothing here is reinvented. What changes is everything that made the base
 * grid fiddly to actually use.
 *
 * ## The three changes
 *
 * 1. **Day cells you can hit.** The base sizes its day pill at `h-8 w-8` — 32px
 *    — inside a seven-column row. That is well under the 44px floor both
 *    platform guidelines set, and on a calendar it is the difference between
 *    clicking the 14th and clicking the 15th. Every cell here is at least
 *    `--xen-space-2xl` (48px) in both axes with the visible disc just inside
 *    it, so the target is larger than the thing it looks like — which is the
 *    right way round. The chevrons get the same floor.
 * 2. **A selection you cannot miss, in either scheme.** The selected day is a
 *    filled `primary` disc with `on-primary` ink — a pair the compiler
 *    contrast-checks, so it survives a dark page where a tinted outline would
 *    dissolve. Today, when it is not the selection, is ringed in `primary`
 *    rather than the base's `border`, so "today" and "a cell edge" can never be
 *    confused. Hover is a `color-mix` against `--xen-surface`, never
 *    `hover:bg-neutral-100`: the neutral ramp carries the light orientation in
 *    both schemes, so step 100 is a near-white flash on a dark page.
 * 3. **A panel that is a panel.** `--xen-elevation-card` and the `lg` radius,
 *    with the hairline kept. The base's `md` radius and flat fill made the
 *    calendar read as a fieldset rather than a surface you are choosing from.
 *
 * Glass is the one thing asked for rather than assumed: `flatten()` neutralises
 * gradients and elevation for a flat seed and stops there, so elevation is
 * consumed unconditionally and `depth: 'glass'` is checked once. No gradient —
 * §35.11 keeps those for the hero and the one primary action.
 */
export const CalendarV4 = React.forwardRef<HTMLDivElement, CalendarProps>(function CalendarV4(
  { className, month, selected, marks = [], onSelectDate, onMonthChange, ...rest },
  ref
) {
  injectStyleOnce('xen-v4-picker-styles', PICKER_V4_CSS);
  const glass = useDepth() === 'glass';

  const base = month ?? new Date();
  const year = base.getFullYear();
  const monthIndex = base.getMonth();
  const today = new Date();

  const firstWeekday = new Date(year, monthIndex, 1).getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstWeekday; i += 1) cells.push(null);
  for (let d = 1; d <= daysInMonth; d += 1) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const goMonth = (delta: number): void => {
    onMonthChange?.(new Date(year, monthIndex + delta, 1));
  };

  const isMarked = (day: number): boolean =>
    marks.some((m) => sameDay(m, new Date(year, monthIndex, day)));

  const rows = Math.ceil(cells.length / 7);
  const label = `${MONTHS[monthIndex] ?? ''} ${year}`;

  const chevron = (text: string, glyph: string, delta: number): React.ReactElement => (
    <button
      type="button"
      aria-label={text}
      onClick={() => goMonth(delta)}
      data-xen-v4-hover=""
      className={cn(
        'flex items-center justify-center rounded-[var(--xen-radius-full)] text-xl text-on-surface',
        'h-[var(--xen-space-2xl)] w-[var(--xen-space-2xl)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
      )}
    >
      {glyph}
    </button>
  );

  return (
    <div
      ref={ref}
      data-xen-v4-pop="card"
      data-glass={glass ? 'true' : undefined}
      className={cn('p-md text-on-surface', className)}
      {...rest}
    >
      <div className="mb-xs flex items-center justify-between">
        {chevron('Previous month', '‹', -1)}
        <span className="font-heading text-lg font-semibold text-on-surface">{label}</span>
        {chevron('Next month', '›', 1)}
      </div>

      <div role="grid" aria-label={label}>
        <div role="row" className="flex">
          {WEEKDAYS.map((w) => (
            <div
              key={w}
              role="columnheader"
              className="flex flex-1 items-center justify-center py-xs text-xs font-semibold text-muted-text"
            >
              {w}
            </div>
          ))}
        </div>

        {Array.from({ length: rows }).map((_, row) => (
          <div role="row" key={row} className="flex">
            {cells.slice(row * 7, row * 7 + 7).map((day, col) => {
              if (day == null) {
                return (
                  <div
                    role="gridcell"
                    key={col}
                    className="h-[var(--xen-space-2xl)] flex-1"
                  />
                );
              }
              const cellDate = new Date(year, monthIndex, day);
              const isSelected = selected != null && sameDay(selected, cellDate);
              const isToday = sameDay(today, cellDate);
              return (
                <div role="gridcell" key={col} className="h-[var(--xen-space-2xl)] flex-1">
                  <button
                    type="button"
                    aria-label={`${MONTHS[monthIndex] ?? ''} ${day}, ${year}`}
                    aria-pressed={isSelected}
                    aria-current={isToday ? 'date' : undefined}
                    onClick={() => onSelectDate?.(cellDate)}
                    className={cn(
                      'relative flex h-full w-full items-center justify-center',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                      'rounded-[var(--xen-radius-full)]'
                    )}
                  >
                    <span
                      className={cn(
                        'flex items-center justify-center rounded-[var(--xen-radius-full)] text-base',
                        'h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]',
                        'w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] max-w-full',
                        isSelected
                          ? 'bg-primary font-bold text-on-primary'
                          : 'text-on-surface',
                        // Today is ringed in `primary`, not `border` — a cell
                        // edge and "today" must not look the same.
                        isToday && !isSelected && 'border border-primary font-bold'
                      )}
                      data-xen-v4-hover={isSelected ? undefined : ''}
                    >
                      {day}
                    </span>
                    {isMarked(day) ? (
                      <span
                        aria-hidden="true"
                        className={cn(
                          'absolute bottom-0 h-xs w-xs rounded-[var(--xen-radius-full)]',
                          isSelected ? 'bg-on-primary' : 'bg-accent'
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
    </div>
  );
});

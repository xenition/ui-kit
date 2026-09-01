import * as React from 'react';
import { cn } from '../primitives/cn';

/** One day cell in the {@link CalendarStrip}. */
export interface CalendarStripDay {
  /** Stable identity for the day (e.g. an ISO date `'2026-08-31'`). Used as `key` and in callbacks. */
  date: string;
  /** Big date numeral shown in the cell (e.g. `'31'`). */
  label: string;
  /** Short weekday letter/label shown above the numeral (e.g. `'S'`, `'Mon'`). */
  weekday: string;
  /** Task count for the day; renders a soft-primary count badge when > 0. */
  count?: number;
  /** Marks this cell as "today" — draws a primary ring. */
  today?: boolean;
}

export interface CalendarStripProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** The days to render, left→right; typically a single week. */
  days: readonly CalendarStripDay[];
  /** The currently selected `date`; that cell fills solid primary. */
  selectedDate?: string;
  /** Fires with a day's `date` when its cell is chosen. */
  onSelect?: (date: string) => void;
  /** Accessible label for the day group. Defaults to `'Select a day'`. */
  label?: string;
}

/** A single day cell — a radio within the strip's radiogroup. */
function DayCell({
  day,
  selected,
  onSelect,
}: {
  day: CalendarStripDay;
  selected: boolean;
  onSelect?: (date: string) => void;
}): React.ReactElement {
  const count = day.count ?? 0;
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      aria-label={`${day.weekday} ${day.label}${count > 0 ? `, ${count} tasks` : ''}${day.today ? ', today' : ''}`}
      onClick={() => onSelect?.(day.date)}
      disabled={!onSelect}
      className={cn(
        'flex min-h-[64px] min-w-[44px] shrink-0 flex-col items-center justify-center gap-1 rounded-[var(--xen-radius-md)] px-2 py-2 transition-colors',
        'disabled:cursor-default',
        selected
          ? 'bg-primary text-on-primary'
          : cn('bg-surface text-on-surface hover:bg-primary/[0.08]', day.today && 'ring-2 ring-primary')
      )}
    >
      <span className={cn('text-xs font-semibold uppercase', selected ? 'text-on-primary' : 'text-muted-text')}>
        {day.weekday}
      </span>
      <span className="text-xl font-bold leading-none tabular-nums">{day.label}</span>
      {count > 0 ? (
        <span
          aria-hidden
          className={cn(
            'inline-flex min-w-[18px] items-center justify-center rounded-full px-1.5 text-xs font-bold tabular-nums',
            selected ? 'bg-on-primary/[0.24] text-on-primary' : 'bg-primary/[0.14] text-primary-text'
          )}
        >
          {count}
        </span>
      ) : (
        <span aria-hidden className="h-[18px]" />
      )}
    </button>
  );
}

/**
 * CalendarStrip — **V4** "flow" week strip (web parity of the native twin). A
 * horizontally-scrolling row of calm day cells: a weekday letter over a **big
 * date numeral**, with a soft-primary count badge for days that carry tasks.
 * One accent throughout — the **selected** day fills solid primary, **today**
 * wears a primary ring. Cells are ≥44px tap targets and expose a `radiogroup`
 * so a screen reader announces the chosen day. Presentational only. All colors
 * from `--xen-*` token classes — no literals.
 */
export const CalendarStrip = React.forwardRef<HTMLDivElement, CalendarStripProps>(function CalendarStrip(
  { days, selectedDate, onSelect, label = 'Select a day', className, ...rest },
  ref
) {
  const items = Array.isArray(days) ? days : [];
  return (
    <div
      ref={ref}
      role="radiogroup"
      aria-label={label}
      className={cn('flex gap-2 overflow-x-auto rounded-[var(--xen-radius-lg)] bg-card p-2', className)}
      {...rest}
    >
      {items.map((day) => (
        <DayCell
          key={day.date}
          day={day}
          selected={selectedDate === day.date}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
});

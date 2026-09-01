import * as React from 'react';
import { cn } from '../primitives/cn';
import { IconV4 } from '../primitives/IconV4';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import { addDays, dayKeyInTz, monthMatrix, startOfMonth, toDayKey, weekRow } from './datetime';
import { isToday } from './schedule-v4';
import type { BookingCalendarProps, DayAvailability } from './BookingCalendar';
import type { BookingSlot } from './types';

export interface BookingCalendarV4Props extends BookingCalendarProps {
  /**
   * Ring today's cell. Default `true`.
   *
   * The base marked availability and selection and had no way at all to say
   * "today", so a user looking at a month grid had to work out where they were
   * before they could work out where they were going.
   */
  markToday?: boolean;
  /**
   * Accessible names for the two header controls. Defaults are
   * `'Previous month'` / `'Next month'`, and `'Previous week'` / `'Next week'`
   * in the week view — the other half of the fix below: the base said "month"
   * while the week view moved nothing at all.
   */
  previousLabel?: string;
  nextLabel?: string;
  /** Suffix appended to a day's accessible name. Defaults in English. */
  availableLabel?: string;
  unavailableLabel?: string;
  /** Appended to today's accessible name. Default `'today'`. */
  todayLabel?: string;
}

/** The seven weekday columns, as ISO days of one known week (Sun → Sat). */
const WEEKDAY_KEYS = [
  '2023-01-01',
  '2023-01-02',
  '2023-01-03',
  '2023-01-04',
  '2023-01-05',
  '2023-01-06',
  '2023-01-07',
];

function weekdayLabels(weekStartsOn: number, locale?: string): string[] {
  const fmt = new Intl.DateTimeFormat(locale, { weekday: 'short' });
  const labels = WEEKDAY_KEYS.map((k) => fmt.format(new Date(`${k}T12:00:00`)));
  return [...labels.slice(weekStartsOn), ...labels.slice(0, weekStartsOn)];
}

function buildAvailability(
  slots: BookingSlot[] | undefined,
  availability: DayAvailability[] | undefined,
  timezone: string | undefined
): Map<string, number> {
  const map = new Map<string, number>();
  if (availability) {
    for (const a of availability) map.set(a.date, a.count);
    return map;
  }
  for (const slot of slots ?? []) {
    if (slot.spotsLeft <= 0) continue;
    const key = dayKeyInTz(slot.startsAt, timezone);
    map.set(key, (map.get(key) ?? 0) + 1);
  }
  return map;
}

/**
 * **V4 booking calendar** — the web twin of the native `BookingCalendarV4`,
 * same props as {@link BookingCalendar} plus `markToday` and four copy hooks.
 *
 * The roving-tabindex keyboard model is the base's and is kept whole: arrows,
 * Home/End, PageUp/PageDown, Enter/Space, and one tab stop for the grid. It is
 * the best thing about this component and the pass does not touch it.
 *
 * ## Five changes
 *
 * 1. **The week view's chevrons work.** `shiftView()` moved `viewDate` by a
 *    *month* in both views, while the week row was derived from
 *    `selectedDate ?? viewDate` — so in the week view, with a date selected
 *    (the normal case), pressing ‹ or › changed nothing on screen. V4 keeps one
 *    anchor and shifts it by a month or by seven days, and the labels say which.
 * 2. **Every target clears 44.** `h-8 w-8` chevrons and `h-9 w-9` cells were
 *    both under the minimum the rest of the kit holds.
 * 3. **Today is marked** — a ring, plus `today` in the cell's accessible name.
 * 4. **Hover and focus are the kit's tokens.** `hover:bg-neutral-100` is a ramp
 *    step and near-white on a dark page; `ring-primary-300` is not the
 *    `--xen-ring` slot every other V4 control focuses with.
 * 5. **The chevrons are `IconV4`**, not two hand-drawn inline `<svg>` paths
 *    whose stroke width was a literal.
 */
export const BookingCalendarV4 = React.forwardRef<HTMLDivElement, BookingCalendarV4Props>(
  function BookingCalendarV4(
    {
      slots,
      availability,
      selectedDate,
      onSelectDate,
      timezone,
      view = 'month',
      weekStartsOn = 0,
      locale,
      markToday = true,
      previousLabel,
      nextLabel,
      availableLabel = 'available',
      unavailableLabel = 'no availability',
      todayLabel = 'today',
      className,
      ...rest
    },
    ref
  ) {
    const availabilityMap = React.useMemo(
      () => buildAvailability(slots, availability, timezone),
      [slots, availability, timezone]
    );

    /*
      ONE anchor for both views, and it is the thing the chevrons move. The
      base kept `viewDate` (a month) and derived the week from
      `selectedDate ?? viewDate`, which is why the week view's chevrons were
      inert: they moved a value the week row was not reading.
    */
    const [anchor, setAnchor] = React.useState<Date>(() => selectedDate ?? new Date());
    const [focusKey, setFocusKey] = React.useState<string>(() =>
      toDayKey(selectedDate ?? new Date())
    );

    const cellRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map());
    const pendingFocus = React.useRef<string | null>(null);

    React.useEffect(() => {
      if (pendingFocus.current) {
        cellRefs.current.get(pendingFocus.current)?.focus();
        pendingFocus.current = null;
      }
    });

    const weeks =
      view === 'week' ? [weekRow(anchor, weekStartsOn)] : monthMatrix(anchor, weekStartsOn);
    const monthAnchor = view === 'week' ? (weeks[0]?.[0] ?? anchor) : startOfMonth(anchor);

    const labels = weekdayLabels(weekStartsOn, locale);
    const monthLabel = new Intl.DateTimeFormat(locale, {
      month: 'long',
      year: 'numeric',
    }).format(monthAnchor);
    const longDate = new Intl.DateTimeFormat(locale, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    const shift = (direction: number): void =>
      setAnchor((d) =>
        view === 'week'
          ? addDays(d, direction * 7)
          : new Date(d.getFullYear(), d.getMonth() + direction, 1)
      );

    const moveFocus = (from: Date, delta: number): void => {
      const target = addDays(from, delta);
      const key = toDayKey(target);
      setFocusKey(key);
      pendingFocus.current = key;
      if (view === 'month' && target.getMonth() !== monthAnchor.getMonth()) {
        setAnchor(startOfMonth(target));
      }
      if (view === 'week') setAnchor(target);
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, date: Date): void => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          moveFocus(date, -1);
          break;
        case 'ArrowRight':
          e.preventDefault();
          moveFocus(date, 1);
          break;
        case 'ArrowUp':
          e.preventDefault();
          moveFocus(date, -7);
          break;
        case 'ArrowDown':
          e.preventDefault();
          moveFocus(date, 7);
          break;
        case 'Home':
          e.preventDefault();
          moveFocus(date, -((date.getDay() - weekStartsOn + 7) % 7));
          break;
        case 'End':
          e.preventDefault();
          moveFocus(date, 6 - ((date.getDay() - weekStartsOn + 7) % 7));
          break;
        case 'PageUp':
          e.preventDefault();
          shift(-1);
          break;
        case 'PageDown':
          e.preventDefault();
          shift(1);
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          onSelectDate?.(date);
          break;
        default:
          break;
      }
    };

    const selectedKey = selectedDate ? toDayKey(selectedDate) : null;
    // Ensure the roving-tabindex target actually exists in the rendered grid.
    const renderedKeys = new Set(weeks.flat().map(toDayKey));
    const activeKey = renderedKeys.has(focusKey)
      ? focusKey
      : toDayKey(
          weeks[0]?.find((d) => d.getMonth() === monthAnchor.getMonth()) ?? weeks[0]![0]!
        );

    const unit = view === 'week' ? 'week' : 'month';

    const chevron = (direction: -1 | 1): React.ReactElement => (
      <button
        type="button"
        aria-label={
          direction < 0 ? (previousLabel ?? `Previous ${unit}`) : (nextLabel ?? `Next ${unit}`)
        }
        onClick={() => shift(direction)}
        data-xen-v4-chrome="on-surface"
        className={cn(
          'inline-flex w-11 shrink-0 items-center justify-center rounded-full text-on-card',
          MIN_TAP_CLASS
        )}
      >
        <IconV4 name={direction < 0 ? 'chevron-left' : 'chevron-right'} size="lg" />
      </button>
    );

    return (
      <div
        ref={ref}
        data-xen-booking-calendar={view}
        className={cn(
          'inline-flex flex-col gap-sm rounded-[var(--xen-radius-lg)] border border-border bg-card p-md text-on-card shadow-[var(--xen-elevation-card)]',
          className
        )}
        {...rest}
      >
        <div className="flex items-center justify-between gap-md">
          {chevron(-1)}
          <div data-xen-calendar-label="" className="font-heading text-base font-semibold">
            {monthLabel}
          </div>
          {chevron(1)}
        </div>

        <div role="grid" aria-label={`Choose a date — ${monthLabel}`}>
          <div role="row" className="grid grid-cols-7">
            {labels.map((label) => (
              <div
                key={label}
                role="columnheader"
                aria-label={label}
                className="py-xs text-center text-xs font-medium text-muted-text"
              >
                {label}
              </div>
            ))}
          </div>
          {weeks.map((row, wi) => (
            <div role="row" key={wi} className="grid grid-cols-7">
              {row.map((date) => {
                const key = toDayKey(date);
                const inMonth = view === 'week' || date.getMonth() === monthAnchor.getMonth();
                const count = availabilityMap.get(key) ?? 0;
                const hasAvail = count > 0;
                const isSelected = selectedKey === key;
                const today = markToday && isToday(date, timezone);
                const isFocusTarget = activeKey === key;

                const name = [
                  longDate.format(date),
                  today ? todayLabel : null,
                  hasAvail ? availableLabel : unavailableLabel,
                ]
                  .filter(Boolean)
                  .join(', ');

                return (
                  <div role="gridcell" key={key} className="p-0.5">
                    <button
                      ref={(el) => {
                        if (el) cellRefs.current.set(key, el);
                        else cellRefs.current.delete(key);
                      }}
                      type="button"
                      data-xen-calendar-day=""
                      data-available={hasAvail ? 'true' : 'false'}
                      data-outside={inMonth ? 'false' : 'true'}
                      data-today={today ? 'true' : undefined}
                      data-xen-v4-chrome={isSelected ? 'filled-primary' : 'on-surface'}
                      tabIndex={isFocusTarget ? 0 : -1}
                      aria-pressed={isSelected}
                      aria-current={today ? 'date' : undefined}
                      aria-label={name}
                      onClick={() => {
                        setFocusKey(key);
                        onSelectDate?.(date);
                      }}
                      onFocus={() => setFocusKey(key)}
                      onKeyDown={(e) => onKeyDown(e, date)}
                      className={cn(
                        'relative flex w-11 flex-col items-center justify-center rounded-full text-sm [font-variant-numeric:tabular-nums]',
                        MIN_TAP_CLASS,
                        // The ring's width is reserved on every cell, so marking
                        // today never nudges the grid by two pixels.
                        'border-2',
                        today && !isSelected ? 'border-primary' : 'border-transparent',
                        !inMonth && 'text-muted-text opacity-[0.38]',
                        isSelected
                          ? 'bg-primary text-on-primary'
                          : cn('text-on-card', hasAvail && 'font-bold')
                      )}
                    >
                      <span>{date.getDate()}</span>
                      {hasAvail ? (
                        <span
                          data-xen-calendar-dot=""
                          aria-hidden="true"
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
      </div>
    );
  }
);

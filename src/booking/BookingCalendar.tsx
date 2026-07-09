import * as React from 'react';
import { cn } from '../primitives/cn';
import { BookingSlot } from './types';
import {
  addDays,
  dayKeyInTz,
  monthMatrix,
  startOfMonth,
  toDayKey,
  weekRow,
} from './datetime';

export interface DayAvailability {
  /** Civil day, `YYYY-MM-DD`. */
  date: string;
  /** Number of bookable openings that day. */
  count: number;
}

export interface BookingCalendarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Raw slots; availability per day is derived (bucketed in `timezone`). */
  slots?: BookingSlot[];
  /** Pre-summarized availability, as an alternative to `slots`. */
  availability?: DayAvailability[];
  /** Selected day. */
  selectedDate?: Date | null;
  /** Fired with the civil date when a day is chosen. */
  onSelectDate?: (date: Date) => void;
  /** IANA timezone slots are bucketed into (their civil day). */
  timezone?: string;
  /** `month` (6-week grid) or `week` (single row). Default `month`. */
  view?: 'month' | 'week';
  /** 0 = Sunday (default), 1 = Monday. */
  weekStartsOn?: 0 | 1;
  /** Locale for month/weekday labels. */
  locale?: string;
}

const WEEKDAY_KEYS = [
  '2023-01-01', // Sun
  '2023-01-02',
  '2023-01-03',
  '2023-01-04',
  '2023-01-05',
  '2023-01-06',
  '2023-01-07', // Sat
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
 * Month- or week-view date picker that highlights days with availability. Real
 * `<button>` grid cells (roving `tabindex`) with full keyboard support — arrow
 * keys move focus (wrapping across weeks/months), Home/End jump to the week
 * ends, PageUp/PageDown change month, Enter/Space select — inside an ARIA
 * `grid`. Token-only; availability is a dot + `aria-label` suffix, never color
 * alone. Presentational: availability comes in as props (`slots` or a per-day
 * `availability` summary); nothing is fetched.
 */
export const BookingCalendar = React.forwardRef<HTMLDivElement, BookingCalendarProps>(
  function BookingCalendar(
    {
      slots,
      availability,
      selectedDate,
      onSelectDate,
      timezone,
      view = 'month',
      weekStartsOn = 0,
      locale,
      className,
      ...rest
    },
    ref
  ) {
    const availabilityMap = React.useMemo(
      () => buildAvailability(slots, availability, timezone),
      [slots, availability, timezone]
    );

    const anchor = selectedDate ?? new Date();
    const [viewDate, setViewDate] = React.useState<Date>(() => startOfMonth(anchor));
    const [focusKey, setFocusKey] = React.useState<string>(() => toDayKey(anchor));

    const cellRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map());
    const pendingFocus = React.useRef<string | null>(null);

    React.useEffect(() => {
      if (pendingFocus.current) {
        cellRefs.current.get(pendingFocus.current)?.focus();
        pendingFocus.current = null;
      }
    });

    const weeks =
      view === 'week'
        ? [weekRow(selectedDate ?? viewDate, weekStartsOn)]
        : monthMatrix(viewDate, weekStartsOn);

    const labels = weekdayLabels(weekStartsOn, locale);
    const monthLabel = new Intl.DateTimeFormat(locale, {
      month: 'long',
      year: 'numeric',
    }).format(viewDate);
    const longDate = new Intl.DateTimeFormat(locale, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    const shiftView = (months: number): void =>
      setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + months, 1));

    const moveFocus = (from: Date, delta: number): void => {
      const target = addDays(from, delta);
      const key = toDayKey(target);
      setFocusKey(key);
      pendingFocus.current = key;
      if (view === 'month' && target.getMonth() !== viewDate.getMonth()) {
        setViewDate(startOfMonth(target));
      }
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
          shiftView(-1);
          break;
        case 'PageDown':
          e.preventDefault();
          shiftView(1);
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
      : toDayKey(weeks[0]?.find((d) => d.getMonth() === viewDate.getMonth()) ?? weeks[0]![0]!);

    return (
      <div
        ref={ref}
        data-xen-booking-calendar={view}
        className={cn(
          'inline-flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)]',
          className
        )}
        {...rest}
      >
        <div className="flex items-center justify-between gap-[var(--xen-space-md)]">
          <button
            type="button"
            aria-label="Previous month"
            onClick={() => shiftView(-1)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--xen-radius-sm)] text-on-surface hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
          >
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 3L5 8l5 5" />
            </svg>
          </button>
          <div data-xen-calendar-label="" className="font-heading text-sm font-semibold text-on-surface">
            {monthLabel}
          </div>
          <button
            type="button"
            aria-label="Next month"
            onClick={() => shiftView(1)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--xen-radius-sm)] text-on-surface hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
          >
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 3l5 5-5 5" />
            </svg>
          </button>
        </div>

        <div role="grid" aria-label={`Choose a date — ${monthLabel}`}>
          <div role="row" className="grid grid-cols-7">
            {labels.map((label) => (
              <div
                key={label}
                role="columnheader"
                aria-label={label}
                className="py-[var(--xen-space-xs)] text-center text-xs font-medium text-muted"
              >
                {label}
              </div>
            ))}
          </div>
          {weeks.map((row, wi) => (
            <div role="row" key={wi} className="grid grid-cols-7">
              {row.map((date) => {
                const key = toDayKey(date);
                const inMonth = view === 'week' || date.getMonth() === viewDate.getMonth();
                const count = availabilityMap.get(key) ?? 0;
                const hasAvail = count > 0;
                const isSelected = selectedKey === key;
                const isFocusTarget = activeKey === key;
                const ariaSuffix = hasAvail ? ', available' : ', no availability';
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
                      tabIndex={isFocusTarget ? 0 : -1}
                      aria-pressed={isSelected}
                      aria-label={longDate.format(date) + ariaSuffix}
                      onClick={() => {
                        setFocusKey(key);
                        onSelectDate?.(date);
                      }}
                      onFocus={() => setFocusKey(key)}
                      onKeyDown={(e) => onKeyDown(e, date)}
                      className={cn(
                        'relative flex h-9 w-9 flex-col items-center justify-center rounded-[var(--xen-radius-md)] text-sm transition-colors',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
                        !inMonth && 'text-muted',
                        isSelected
                          ? 'bg-primary text-on-primary'
                          : cn(
                              'text-on-surface hover:bg-neutral-100',
                              hasAvail && 'font-semibold'
                            )
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

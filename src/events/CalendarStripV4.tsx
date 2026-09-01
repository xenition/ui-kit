import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import type { CalendarStripProps } from './CalendarStrip';
import { sameDay } from './format';
import { TABULAR_CLASS, dayNumber, monthName, spokenLine, weekdayName } from './internal/event-v4';

export interface CalendarStripV4Props extends CalendarStripProps {
  /** BCP-47 tag for the weekday, month and day-number names. Default: the host's. */
  locale?: string;
  /** The word a marked day carries in its name. Default `'Has events'`. */
  markedLabel?: string;
  /** The day highlighted when the caller passes no `selected`. */
  defaultSelected?: Date;
  /** "Today", for pinning the strip in a test or a server render. */
  today?: Date;
}

const DAY_STATE = stateGroundVars(
  'var(--xen-card)',
  'var(--xen-on-card)'
) as React.CSSProperties;

function buildDates(startDate: Date, count: number): Date[] {
  const n = Math.max(1, Math.floor(count));
  return Array.from({ length: n }, (_, i) => {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    return d;
  });
}

/**
 * **V4 calendar strip** — the web twin of the native `CalendarStripV4`, same
 * props as {@link CalendarStrip} plus `locale`, `markedLabel`,
 * `defaultSelected` and `today`.
 *
 * ## Seven changes
 *
 * 1. **A marked day never loses its dot.** The month label and the has-events
 *    marker shared one slot as an either/or, and `showMonth` is true on the 1st
 *    of any month and on the first pill — so a day with events falling on a
 *    month boundary showed no marker at all. They are two slots now.
 * 2. **The mark is announced.** It was a coloured dot and nothing else; it now
 *    joins the day's name as `markedLabel`.
 * 3. **The strip speaks the host's language.** The weekday and month came from
 *    `format.ts`'s inline `['Sun','Mon',…]` arrays, so the picker was
 *    English-only whatever locale the app ran in. `weekdayName` / `monthName` /
 *    `dayNumber` go through `Intl`, and `locale` steers them.
 * 4. **`today` replaces the bare `new Date()` in render**, so the strip can be
 *    pinned for a test or a server render instead of drifting with the clock.
 * 5. **`defaultSelected` gives the uncontrolled case somewhere to live.** A
 *    consumer that passed only `onSelectDate` got a strip where nothing ever
 *    highlighted, because `selected` is the only thing that draws the fill.
 * 6. **The `tablist` role is gone.** Fourteen day pills are not tabs: nothing
 *    here shows or hides a panel, and the role promised a roving focus the base
 *    never implemented, so a screen reader announced "tab 3 of 14" over a
 *    control that behaved like fourteen ordinary buttons. They are buttons now,
 *    with `aria-pressed` for the chosen day — and the arrow keys, Home and End
 *    still walk the strip, which is a convenience rather than a contract.
 * 7. **Day numbers are tabular**, so a two-digit day does not shift the pill's
 *    centre, and `hover:bg-neutral-50` — a ramp step, near-white on a dark page
 *    — becomes the shared state layer. `font-extrabold` is off the kit's scale.
 */
export const CalendarStripV4 = React.forwardRef<HTMLDivElement, CalendarStripV4Props>(
  function CalendarStripV4(
    {
      startDate,
      days = 14,
      dates,
      selected,
      marks = [],
      onSelectDate,
      locale,
      markedLabel = 'Has events',
      defaultSelected,
      today,
      className,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    const [uncontrolled, setUncontrolled] = React.useState<Date | undefined>(defaultSelected);
    const pillRefs = React.useRef(new Map<number, HTMLButtonElement>());

    // `selected` still wins whenever it is supplied, so a controlled caller is
    // unaffected; `defaultSelected` only fills the hole an uncontrolled one had.
    const activeDate = selected ?? uncontrolled;

    const anchor = startDate ?? today ?? new Date();
    const list = dates && dates.length > 0 ? dates : buildDates(anchor, days);
    const isMarked = (d: Date): boolean => marks.some((m) => sameDay(m, d));

    const choose = (date: Date): void => {
      setUncontrolled(date);
      onSelectDate?.(date);
    };

    const moveFocus = (to: number): void => {
      const next = Math.min(Math.max(0, to), list.length - 1);
      pillRefs.current.get(next)?.focus();
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number): void => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          moveFocus(index - 1);
          break;
        case 'ArrowRight':
          e.preventDefault();
          moveFocus(index + 1);
          break;
        case 'Home':
          e.preventDefault();
          moveFocus(0);
          break;
        case 'End':
          e.preventDefault();
          moveFocus(list.length - 1);
          break;
        default:
          break;
      }
    };

    return (
      <div
        ref={ref}
        className={cn('flex flex-row gap-sm overflow-x-auto px-xs', className)}
        {...rest}
      >
        {list.map((date, i) => {
          const isSelected = activeDate != null && sameDay(activeDate, date);
          const marked = isMarked(date);
          const isToday = today != null && sameDay(today, date);
          const showMonth = i === 0 || date.getDate() === 1;

          return (
            <button
              key={date.toISOString()}
              ref={(el) => {
                if (el) pillRefs.current.set(i, el);
                else pillRefs.current.delete(i);
              }}
              type="button"
              aria-pressed={isSelected}
              aria-current={isToday ? 'date' : undefined}
              aria-label={spokenLine([
                weekdayName(date, locale, 'short'),
                monthName(date, locale, 'long'),
                dayNumber(date, locale),
                marked ? markedLabel : undefined,
              ])}
              onClick={() => choose(date)}
              onKeyDown={(e) => onKeyDown(e, i)}
              data-xen-v4-state=""
              style={DAY_STATE}
              className={cn(
                'flex min-w-[calc(var(--xen-space-2xl)_+_var(--xen-space-sm))] flex-col items-center justify-center',
                'rounded-[var(--xen-radius-md)] border px-sm py-sm',
                MIN_TAP_CLASS,
                isSelected ? 'border-primary bg-primary' : 'border-border bg-card',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
              )}
            >
              <span
                className={cn(
                  'text-xs font-semibold',
                  isSelected ? 'text-on-primary' : 'text-muted-text'
                )}
              >
                {weekdayName(date, locale, 'short')}
              </span>
              <span
                className={cn(
                  'text-lg font-bold',
                  TABULAR_CLASS,
                  isSelected ? 'text-on-primary' : 'text-on-card'
                )}
              >
                {dayNumber(date, locale)}
              </span>
              {/*
                Two slots, not one. The month caption and the has-events marker
                were an either/or, and both are true on the 1st of a month —
                which is precisely the day whose marker mattered.
              */}
              <span
                className={cn(
                  'text-xs',
                  isSelected ? 'text-on-primary' : 'text-muted-text'
                )}
              >
                {showMonth ? monthName(date, locale, 'short') : ' '}
              </span>
              <span aria-hidden="true" className="flex h-xs items-center justify-center">
                {marked ? (
                  <span
                    className={cn(
                      'h-xs w-xs rounded-full',
                      isSelected ? 'bg-on-primary' : 'bg-accent'
                    )}
                  />
                ) : null}
              </span>
            </button>
          );
        })}
      </div>
    );
  }
);

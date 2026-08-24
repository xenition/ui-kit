import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatMoney, type MoneyFormatter } from '../commerce/money';

/** A single day's fare in the price grid. */
export interface PriceDay {
  /** ISO date `YYYY-MM-DD` (used as the key and in the announcement). */
  date: string;
  /** Short day label shown in the cell, e.g. `'Mon 3'`. */
  label: string;
  /** Fare in integer minor units (cents); omit for an unavailable day. */
  cents?: number;
}

export interface PriceCalendarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Days to display, in order. Laid out `columns` per row. */
  days: readonly PriceDay[];
  /** Cells per row (default 7 — a week). */
  columns?: number;
  /** ISO date of the currently selected day. */
  selectedDate?: string;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Override the cents → string formatter. */
  formatMoney?: MoneyFormatter;
  /** Fires with the day when an available cell is pressed. */
  onSelectDay?: (day: PriceDay) => void;
}

/**
 * Web parity of the native `PriceCalendar`: a cheapest-day fare grid — each cell
 * shows a day label and its price, and the lowest-priced available day is
 * flagged (★ glyph + announcement, never color-alone). Unavailable days (no
 * `cents`) are disabled. Selection is controlled via `selectedDate`. Token-only
 * colors.
 */
export const PriceCalendar = React.forwardRef<HTMLDivElement, PriceCalendarProps>(
  function PriceCalendar(
    {
      days,
      columns = 7,
      selectedDate,
      currency = 'USD',
      formatMoney: format = formatMoney,
      onSelectDay,
      className,
      ...rest
    },
    ref
  ) {
    const cheapest = React.useMemo(() => {
      let min = Infinity;
      let key: string | null = null;
      for (const d of days) {
        if (typeof d.cents === 'number' && d.cents < min) {
          min = d.cents;
          key = d.date;
        }
      }
      return key;
    }, [days]);

    const cols = Math.max(1, columns);
    const widthPct = `${100 / cols}%`;

    return (
      <div
        ref={ref}
        data-xen-price-calendar=""
        className={cn('flex flex-wrap', className)}
        {...rest}
      >
        {days.map((day, i) => {
          const available = typeof day.cents === 'number';
          const isSelected = day.date === selectedDate;
          const isCheapest = day.date === cheapest;

          return (
            <div key={day.date || `day-${i}`} style={{ width: widthPct }} className="p-[2px]">
              <button
                type="button"
                aria-label={`${day.date}${
                  available ? `, ${format(day.cents as number, currency)}` : ', unavailable'
                }${isCheapest ? ', cheapest' : ''}`}
                aria-pressed={isSelected}
                aria-disabled={!available}
                disabled={!available}
                onClick={available ? () => onSelectDay?.(day) : undefined}
                className={cn(
                  'flex w-full flex-col items-center gap-[2px] rounded-[var(--xen-radius-sm)] border px-[var(--xen-space-xs)] py-[var(--xen-space-sm)]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
                  isSelected ? 'border-primary bg-primary' : 'border-border bg-surface',
                  available ? 'hover:opacity-90' : 'cursor-not-allowed opacity-50'
                )}
              >
                <span
                  className={cn(
                    'text-xs font-semibold',
                    isSelected ? 'text-on-primary' : 'text-on-surface'
                  )}
                >
                  {isCheapest ? `★ ${day.label}` : day.label}
                </span>
                <span
                  className={cn(
                    'text-xs',
                    isSelected ? 'text-on-primary' : isCheapest ? 'text-success' : 'text-muted'
                  )}
                >
                  {available ? format(day.cents as number, currency) : '—'}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    );
  }
);

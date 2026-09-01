import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatMoney } from '../commerce/money';
import type { PriceCalendarProps } from './PriceCalendar';

/** Drop-in for {@link PriceCalendarProps} — same props, the V4 "journey" design. */
export type PriceCalendarV4Props = PriceCalendarProps;

/**
 * PriceCalendar — **V4** "journey" design (web parity of the native V4). The
 * boarding-pass take on a fare grid: clean `surface` day cells with muted price
 * ink, where the cheapest available day wears a small brand-gradient disc
 * (`from-primary-400 to-primary-700`) with near-white price ink — the signature
 * V4 touch. A currently selected day is ringed in token `primary`. Same
 * props/behavior as {@link PriceCalendarProps}: each cell announces its date,
 * price and cheapest flag via `aria-label` (never color-alone), unavailable days
 * (no `cents`) are disabled, and selection is controlled via `selectedDate`. All
 * colors from `--xen-*` token classes (no literal colors).
 */
export const PriceCalendarV4 = React.forwardRef<HTMLDivElement, PriceCalendarV4Props>(
  function PriceCalendarV4(
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
                  'flex w-full flex-col items-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] border bg-surface px-[var(--xen-space-xs)] py-[var(--xen-space-sm)]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
                  isSelected ? 'border-primary ring-1 ring-primary' : 'border-border',
                  available ? 'hover:opacity-90' : 'cursor-not-allowed opacity-50'
                )}
              >
                <span className="text-xs font-semibold text-on-surface">{day.label}</span>

                {/* Cheapest day: gradient disc with near-white price ink. */}
                {isCheapest ? (
                  <span className="flex items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-700 px-[var(--xen-space-sm)] py-[1px] text-xs font-semibold text-primary-50 shadow-sm">
                    {available ? format(day.cents as number, currency) : '—'}
                  </span>
                ) : (
                  <span className="text-xs text-muted">
                    {available ? format(day.cents as number, currency) : '—'}
                  </span>
                )}
              </button>
            </div>
          );
        })}
      </div>
    );
  }
);

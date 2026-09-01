import * as React from 'react';
import { cn } from '../primitives/cn';
import { type ProgressCalendarProps, type ProgressCalendarDay } from './ProgressCalendar';

export type ProgressCalendarV4Props = ProgressCalendarProps;

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as const;

/**
 * Calm heatmap ramp per completion level. Level 0 uses a neutral track; levels
 * 1–3 ramp up through primary tints. Every entry is a `--xen-*`-bound utility.
 */
const LEVEL_BG = ['bg-neutral-100', 'bg-primary-100', 'bg-primary-300', 'bg-primary-500'] as const;

/**
 * ProgressCalendarV4 — the calm redesign of {@link ProgressCalendar}. Same props,
 * defaults, weekday header, onSelectDay, and empty state. Only the visuals
 * change: completed cells use a soft primary-tint heatmap ramp, text stays
 * on-surface/muted, and today's cell gets a primary ring.
 */
export const ProgressCalendarV4 = React.forwardRef<HTMLDivElement, ProgressCalendarV4Props>(
  function ProgressCalendarV4(
    {
      title,
      days,
      startWeekday = 0,
      tone = 'primary',
      showWeekdays = true,
      onSelectDay,
      emptyLabel = 'No activity this month.',
      className,
      ...rest
    },
    ref
  ) {
    // `tone` is preserved as a prop for parity; the calm redesign uses a single
    // primary ramp regardless of tone.
    void tone;
    const shell = cn(
      'rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-sm p-5',
      'flex flex-col gap-[var(--xen-space-sm)]',
      className
    );

    if (days.length === 0) {
      return (
        <div ref={ref} data-xen-progress-calendar="" aria-label={emptyLabel} className={shell} {...rest}>
          {title ? <span className="text-base font-bold text-on-surface">{title}</span> : null}
          <span className="text-sm text-muted">{emptyLabel}</span>
        </div>
      );
    }

    // Build a flat cell list: leading blanks, then one cell per day.
    const lead = ((startWeekday % 7) + 7) % 7;
    const cells: (ProgressCalendarDay | null)[] = [...Array.from({ length: lead }, () => null), ...days];

    return (
      <div ref={ref} data-xen-progress-calendar="" className={shell} {...rest}>
        {title ? <span className="text-base font-bold text-on-surface">{title}</span> : null}

        {showWeekdays ? (
          <div className="flex">
            {WEEKDAYS.map((w, i) => (
              <div key={i} className="flex flex-1 items-center justify-center">
                <span className="text-xs font-semibold text-muted">{w}</span>
              </div>
            ))}
          </div>
        ) : null}

        <div className="flex flex-wrap">
          {cells.map((cell, i) => {
            if (cell == null) {
              return <div key={`blank-${i}`} className="aspect-square w-[calc(100%/7)] p-0.5" />;
            }
            const level = Math.min(Math.max(cell.level ?? 0, 0), 3) as 0 | 1 | 2 | 3;
            const bg = LEVEL_BG[level];
            const fg = level >= 2 ? 'text-on-surface' : 'text-muted';
            const label = `Day ${cell.day}, ${level === 0 ? 'no activity' : `level ${level}`}${
              cell.today ? ', today' : ''
            }`;

            const inner = (
              <div
                className={cn(
                  'flex h-full w-full items-center justify-center rounded-[var(--xen-radius-sm)] text-xs',
                  bg,
                  fg,
                  cell.today && 'ring-2 ring-primary'
                )}
              >
                {cell.day}
              </div>
            );

            return (
              <div key={`day-${cell.day}-${i}`} className="aspect-square w-[calc(100%/7)] p-0.5">
                {onSelectDay ? (
                  <button
                    type="button"
                    aria-label={label}
                    onClick={() => onSelectDay(cell)}
                    className="h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 rounded-[var(--xen-radius-sm)]"
                  >
                    {inner}
                  </button>
                ) : (
                  <div aria-label={label} className="h-full w-full">
                    {inner}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

import * as React from 'react';
import { cn } from '../primitives/cn';
import { CARD_SHELL, SLOT_BORDER, SLOT_ON, type WellnessSlot } from './_tokens';

export interface ProgressCalendarDay {
  /** Day-of-month, 1–31. */
  day: number;
  /**
   * Completion intensity 0–3 (0 = none, 3 = fully met). Higher levels get a
   * denser accent tint, giving a heatmap-style month view.
   */
  level?: 0 | 1 | 2 | 3;
  /** Mark today's cell with a ring. */
  today?: boolean;
}

export type ProgressCalendarTone = 'primary' | 'accent' | 'success';

const TONE_KEY: Record<ProgressCalendarTone, WellnessSlot> = {
  primary: 'primary',
  accent: 'accent',
  success: 'success',
};

/**
 * Per-level `bg-*` fill class per tone — the web analog of the native
 * `withAlpha(accent, LEVEL_ALPHA[level])` heatmap. Index 0 is unused (level 0
 * uses a neutral track). Every entry is a `--xen-*`-bound utility.
 */
const LEVEL_BG: Record<ProgressCalendarTone, [string, string, string, string]> = {
  primary: ['', 'bg-primary/20', 'bg-primary/50', 'bg-primary'],
  accent: ['', 'bg-accent/20', 'bg-accent/50', 'bg-accent'],
  success: ['', 'bg-success/20', 'bg-success/50', 'bg-success'],
};

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as const;

export interface ProgressCalendarProps {
  /** Month title, e.g. "August". */
  title?: string;
  /**
   * The days to render, in order. `startWeekday` positions the first day
   * (0 = Sunday). Missing days are simply omitted.
   */
  days: ProgressCalendarDay[];
  /** Weekday index (0=Sun…6=Sat) the first day falls on. Default 0. */
  startWeekday?: number;
  /** Accent tone for completed cells. Default `'primary'`. */
  tone?: ProgressCalendarTone;
  /** Show the weekday header row. Default true. */
  showWeekdays?: boolean;
  /** Fires with the tapped day. */
  onSelectDay?: (day: ProgressCalendarDay) => void;
  /** Note shown when `days` is empty. Default "No activity this month.". */
  emptyLabel?: string;
  className?: string;
}

/**
 * A month completion calendar (web parity of the native block): a weekday header
 * and a 7-column grid of day cells tinted by a 0–3 completion `level` (a soft
 * heatmap), with today's cell ringed. Completion is conveyed by fill density
 * plus the a11y label, never color alone; leading blanks come from
 * `startWeekday`. Interactive cells are real `<button>`s. Empty `days` shows a
 * note. Token-only colors.
 */
export const ProgressCalendar = React.forwardRef<HTMLDivElement, ProgressCalendarProps>(
  function ProgressCalendar(
    {
      title,
      days,
      startWeekday = 0,
      tone = 'primary',
      showWeekdays = true,
      onSelectDay,
      emptyLabel = 'No activity this month.',
      className,
    },
    ref
  ) {
    const toneKey = tone in TONE_KEY ? tone : 'primary';
    const slot = TONE_KEY[toneKey];
    const shell = cn(CARD_SHELL, 'flex flex-col gap-[var(--xen-space-sm)] p-[var(--xen-space-lg)]', className);

    if (days.length === 0) {
      return (
        <div ref={ref} data-xen-progress-calendar="" aria-label={emptyLabel} className={shell}>
          {title ? <span className="text-base font-bold text-on-surface">{title}</span> : null}
          <span className="text-sm text-muted">{emptyLabel}</span>
        </div>
      );
    }

    // Build a flat cell list: leading blanks, then one cell per day.
    const lead = ((startWeekday % 7) + 7) % 7;
    const cells: (ProgressCalendarDay | null)[] = [...Array.from({ length: lead }, () => null), ...days];

    return (
      <div ref={ref} data-xen-progress-calendar="" className={shell}>
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
            const filled = level > 0;
            const bg = filled ? LEVEL_BG[toneKey][level] : 'bg-neutral-200';
            const fg = level >= 2 ? SLOT_ON[slot] : 'text-on-surface';
            const label = `Day ${cell.day}, ${level === 0 ? 'no activity' : `level ${level}`}${
              cell.today ? ', today' : ''
            }`;

            const inner = (
              <div
                className={cn(
                  'flex h-full w-full items-center justify-center rounded-[var(--xen-radius-sm)] text-xs',
                  bg,
                  fg,
                  cell.today && cn('border-2', SLOT_BORDER[slot])
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

import * as React from 'react';
import { cn } from '../primitives/cn';
import { Segmented } from '../primitives/Segmented';
import type { CalendarViewMode } from './types';

export interface DateNavigatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The period label to show between the chevrons (e.g. "August 2026"). */
  title: string;
  /** Fires when the previous chevron is tapped. */
  onPrev?: () => void;
  /** Fires when the next chevron is tapped. */
  onNext?: () => void;
  /** Shows a "Today" reset button when provided. */
  onToday?: () => void;
  /** Active view; renders a month/week/day segmented control when set. */
  view?: CalendarViewMode;
  /** Fires when a different view segment is picked. */
  onViewChange?: (view: CalendarViewMode) => void;
  /** Restrict which view segments appear (defaults to all three). */
  views?: CalendarViewMode[];
}

const VIEW_LABEL: Record<CalendarViewMode, string> = {
  month: 'Month',
  week: 'Week',
  day: 'Day',
};

/**
 * The header control strip for any scheduling surface: prev/next chevrons
 * around a period `title`, an optional "Today" reset, and an optional
 * month/week/day `Segmented`. Purely presentational — the host owns the dates
 * and recomputes `title` on each change. Token colors only.
 */
export const DateNavigator = React.forwardRef<HTMLDivElement, DateNavigatorProps>(
  function DateNavigator(
    { title, onPrev, onNext, onToday, view, onViewChange, views = ['month', 'week', 'day'], className, ...rest },
    ref
  ) {
    const chevron = (label: string, symbol: string, onClick?: () => void): React.ReactElement => (
      <button
        type="button"
        aria-label={label}
        disabled={onClick == null}
        onClick={onClick}
        className="flex h-8 w-8 items-center justify-center rounded-[var(--xen-radius-sm)] border border-border text-lg text-on-surface transition-opacity enabled:hover:opacity-70 disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
      >
        {symbol}
      </button>
    );

    return (
      <div
        ref={ref}
        role="toolbar"
        className={cn('flex items-center justify-between gap-2', className)}
        {...rest}
      >
        <div className="flex min-w-0 flex-shrink items-center gap-1">
          {chevron('Previous', '‹', onPrev)}
          {chevron('Next', '›', onNext)}
          <span className="ml-1 truncate text-lg font-bold text-on-surface">{title}</span>
        </div>

        <div className="flex items-center gap-2">
          {onToday ? (
            <button
              type="button"
              aria-label="Go to today"
              onClick={onToday}
              className="rounded-[var(--xen-radius-sm)] border border-border px-2 py-1 text-sm font-semibold text-primary transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
            >
              Today
            </button>
          ) : null}
          {view != null && onViewChange != null ? (
            <Segmented
              value={view}
              onChange={(v) => onViewChange(v as CalendarViewMode)}
              options={views.map((v) => ({ value: v, label: VIEW_LABEL[v] }))}
            />
          ) : null}
        </div>
      </div>
    );
  }
);

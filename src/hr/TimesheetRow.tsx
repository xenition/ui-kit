import * as React from 'react';
import { cn } from '../primitives/cn';
import { StatusPill } from './StatusPill';
import {
  formatHours,
  TIMESHEET_STATUS_META,
  TONE_TEXT_CLASS,
  type TimesheetStatus,
} from './internal';

export type TimesheetRowVariant = 'default' | 'compact';

export interface TimesheetRowProps {
  /** Pre-formatted work date (e.g. "Mon Aug 24"). */
  date: string;
  /** Total hours worked (decimal, e.g. 7.5). */
  hours: number;
  /** Approval state — glyph + word pill. */
  status?: TimesheetStatus;
  /** Clock-in time label. */
  clockIn?: string;
  /** Clock-out time label. */
  clockOut?: string;
  /** Project / task the time is booked to. */
  project?: string;
  /** Overtime hours included in `hours` — flagged by word when > 0. */
  overtimeHours?: number;
  /** Density. */
  variant?: TimesheetRowVariant;
  /** Click handler (open / edit entry). */
  onClick?: () => void;
  className?: string;
}

/**
 * One timesheet entry: date, hours worked (formatted `Hh Mm`), optional clock
 * in/out and project, plus an approval-status pill (glyph + word, never color
 * alone). Overtime is surfaced as a labelled word (`+Xh OT`) rather than only a
 * color. `compact` shows just date + hours + status. When `onClick` is set the
 * row becomes a keyboard-operable `role="button"`. All colors are `--xen-*`
 * token classes — no literals. `forwardRef` to the root `<div>`.
 */
export const TimesheetRow = React.forwardRef<HTMLDivElement, TimesheetRowProps>(function TimesheetRow(
  {
    date,
    hours,
    status,
    clockIn,
    clockOut,
    project,
    overtimeHours = 0,
    variant = 'default',
    onClick,
    className,
  },
  ref
) {
  const compact = variant === 'compact';
  const clock = clockIn && clockOut ? `${clockIn} – ${clockOut}` : (clockIn ?? clockOut);
  const hasOvertime = Number.isFinite(overtimeHours) && overtimeHours > 0;
  const interactive = onClick != null;

  return (
    <div
      ref={ref}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? `Timesheet ${date}, ${formatHours(hours)}` : undefined}
      onClick={interactive ? onClick : undefined}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
      className={cn(
        'flex items-center gap-3 rounded-[var(--xen-radius-md)] border border-border bg-surface px-3 py-2',
        interactive && 'cursor-pointer hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className
      )}
    >
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-on-surface">{date}</p>
        {!compact ? (
          <p className="truncate text-xs text-muted">
            {[clock, project].filter(Boolean).join('  ·  ') || '—'}
          </p>
        ) : null}
      </div>
      <div className="flex flex-col items-end gap-1">
        <span className="text-base font-bold text-on-surface">{formatHours(hours)}</span>
        {hasOvertime ? (
          <span className={cn('text-xs font-semibold', TONE_TEXT_CLASS.warn)}>
            +{formatHours(overtimeHours)} OT
          </span>
        ) : null}
      </div>
      {status ? <StatusPill meta={TIMESHEET_STATUS_META[status]} size="sm" /> : null}
    </div>
  );
});

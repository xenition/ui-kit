import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives';
import { EmptyState } from '../commerce';
import { StatusPill } from './StatusPill';
import { SHIFT_STATUS_META, type ShiftStatus } from './internal';

export interface Shift {
  id: string;
  /** Start time label (e.g. "09:00"). */
  start: string;
  /** End time label (e.g. "17:00"). */
  end: string;
  /** Role / position for the shift. */
  role?: string;
  /** Location / station. */
  location?: string;
  /** Assigned employee name (absent → open shift). */
  assignee?: string;
  /** Scheduling state — glyph + word pill. */
  status?: ShiftStatus;
}

export type ShiftScheduleVariant = 'default' | 'compact';

export interface ShiftScheduleProps {
  /** The day's / week's shifts, in display order. */
  shifts: Shift[];
  /** Header label for the schedule (e.g. "Mon Aug 24"). */
  dateLabel?: string;
  /** Density. */
  variant?: ShiftScheduleVariant;
  /** Fires with the clicked shift. */
  onSelectShift?: (shift: Shift) => void;
  /** Message for the empty state. */
  emptyLabel?: string;
  className?: string;
}

/**
 * A shift roster for a day (or period): a header date and a list of shift rows,
 * each showing time range, role / location, assignee, and a scheduling-status
 * pill (open → warn, confirmed → success — glyph + word, never color alone).
 * Open (unassigned) shifts are tinted and labelled. Renders a token-styled
 * empty state when there are no shifts. Rows with `onSelectShift` are real
 * `<button>`s. All colors are `--xen-*` token classes — no literals. `forwardRef`
 * to the root `<div>`.
 */
export const ShiftSchedule = React.forwardRef<HTMLDivElement, ShiftScheduleProps>(function ShiftSchedule(
  { shifts, dateLabel, variant = 'default', onSelectShift, emptyLabel = 'No shifts scheduled', className },
  ref
) {
  const compact = variant === 'compact';

  if (shifts.length === 0) {
    return (
      <div ref={ref} className={className}>
        {dateLabel ? <p className="mb-3 text-sm font-bold text-on-surface">{dateLabel}</p> : null}
        <EmptyState title={emptyLabel} description="Shifts you add will appear here." />
      </div>
    );
  }

  return (
    <Card ref={ref} className={cn('flex flex-col gap-3', className)}>
      {dateLabel ? <p className="text-sm font-bold text-on-surface">{dateLabel}</p> : null}
      <div className="flex flex-col gap-2">
        {shifts.map((shift) => {
          const meta = SHIFT_STATUS_META[shift.status ?? (shift.assignee ? 'scheduled' : 'open')];
          const isOpen = !shift.assignee;
          const rowClasses = cn(
            'flex w-full items-center gap-3 rounded-[var(--xen-radius-md)] px-3 py-1.5 text-left',
            isOpen ? 'bg-neutral-100' : 'bg-transparent'
          );
          const rowInner = (
            <>
              <div className="w-24 shrink-0">
                <p className="text-sm font-semibold text-on-surface">
                  {shift.start}–{shift.end}
                </p>
                {shift.role ? <p className="truncate text-xs text-muted">{shift.role}</p> : null}
              </div>
              <div className="min-w-0 flex-1">
                <p className={cn('truncate text-sm', isOpen ? 'text-muted' : 'text-on-surface')}>
                  {shift.assignee ?? 'Unassigned'}
                </p>
                {!compact && shift.location ? (
                  <p className="truncate text-xs text-muted">{shift.location}</p>
                ) : null}
              </div>
              <StatusPill meta={meta} size="sm" />
            </>
          );

          return onSelectShift ? (
            <button
              key={shift.id}
              type="button"
              aria-label={`Shift ${shift.start} to ${shift.end}, ${meta.label}`}
              onClick={() => onSelectShift(shift)}
              className={cn(rowClasses, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:brightness-95')}
            >
              {rowInner}
            </button>
          ) : (
            <div key={shift.id} className={rowClasses}>
              {rowInner}
            </div>
          );
        })}
      </div>
    </Card>
  );
});

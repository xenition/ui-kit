import * as React from 'react';
import { cn } from '../primitives/cn';

/** Lifecycle of a scheduled slot. */
export type ScheduleStatus = 'scheduled' | 'live' | 'ended' | 'cancelled';

export interface ScheduleRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Pre-formatted start time, e.g. `10:30`. */
  time: string;
  /** Optional pre-formatted end time; renders a `start–end` range. */
  endTime?: string;
  /** Slot title. */
  title: string;
  /** Room / stage. */
  room?: string;
  /** Track / category label, shown as a colored left rail + caption. */
  track?: string;
  /** Slot status; drives a small status caption (text, not color alone). */
  status?: ScheduleStatus;
}

const STATUS_LABEL: Record<ScheduleStatus, string> = {
  scheduled: '',
  live: 'Live now',
  ended: 'Ended',
  cancelled: 'Cancelled',
};

/** Token text-color class for each status caption. */
const STATUS_TONE: Record<ScheduleStatus, string> = {
  scheduled: 'text-muted',
  live: 'text-success',
  ended: 'text-muted',
  cancelled: 'text-danger',
};

/**
 * A single row of a day schedule — a time gutter, an accent track rail, and the
 * title/room details, with an optional status caption. Designed to stack into a
 * printed-timetable feel. The status is always spelled out in words (never
 * color alone). Passing `onClick` makes the row an accessible button. Colors
 * come from the `--xen-*` tokens; no literal colors.
 */
export const ScheduleRow = React.forwardRef<HTMLDivElement, ScheduleRowProps>(function ScheduleRow(
  { time, endTime, title, room, track, status = 'scheduled', onClick, onKeyDown, className, ...rest },
  ref
) {
  const statusLabel = STATUS_LABEL[status];
  const isCancelled = status === 'cancelled';
  const clickable = typeof onClick === 'function';

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    onKeyDown?.(e);
    if (clickable && (e.key === 'Enter' || e.key === ' ') && !e.defaultPrevented) {
      e.preventDefault();
      (e.currentTarget as HTMLDivElement).click();
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-row items-stretch gap-md py-sm',
        clickable && 'cursor-pointer rounded-md transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      onClick={onClick}
      onKeyDown={clickable ? handleKeyDown : onKeyDown}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      aria-label={clickable ? `${time} ${title}` : undefined}
      {...rest}
    >
      <div className="flex w-16 flex-col gap-0.5">
        <span className="text-sm font-bold text-on-surface">{time}</span>
        {endTime ? <span className="text-xs text-muted">{endTime}</span> : null}
      </div>
      <div className={cn('w-[3px] shrink-0 rounded-full', track ? 'bg-primary' : 'bg-border')} />
      <div className="flex flex-1 flex-col gap-0.5">
        <span className={cn('text-base font-semibold text-on-surface', isCancelled && 'line-through')}>{title}</span>
        <div className="flex flex-row flex-wrap items-center gap-sm">
          {track ? <span className="text-xs font-semibold text-primary">{track}</span> : null}
          {room ? <span className="text-xs text-muted">{room}</span> : null}
          {statusLabel ? <span className={cn('text-xs font-bold', STATUS_TONE[status])}>{statusLabel}</span> : null}
        </div>
      </div>
    </div>
  );
});

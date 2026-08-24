import * as React from 'react';
import { cn } from '../primitives/cn';
import { Progress } from '../primitives';
import { DueDatePill, type DueDateTone } from './DueDatePill';

export interface MilestoneRowProps {
  /** Milestone name. */
  title: string;
  /** Whether the milestone has been reached (done = success). */
  reached?: boolean;
  /** Completion percent toward the milestone (0–100). */
  progress?: number;
  /** Optional target-date label. */
  dateLabel?: string;
  /** Tone for the target-date pill. */
  dateTone?: DueDateTone;
  className?: string;
}

/**
 * A milestone line: a status marker (filled **success** when reached), the title,
 * an optional target {@link DueDatePill}, and an optional {@link Progress} bar.
 * The marker and progress recolor to success once reached. Web parity of the
 * native `MilestoneRow`. No literal colors.
 */
export const MilestoneRow = React.forwardRef<HTMLDivElement, MilestoneRowProps>(function MilestoneRow(
  { title, reached = false, progress, dateLabel, dateTone = 'upcoming', className },
  ref
) {
  const pct = typeof progress === 'number' ? Math.max(0, Math.min(100, progress)) : undefined;

  return (
    <div ref={ref} className={cn('flex items-start gap-2 py-2', className)}>
      <span
        role="img"
        aria-label={reached ? 'Milestone reached' : 'Milestone pending'}
        className={cn(
          'mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold',
          reached ? 'border-success bg-success text-on-success' : 'border-border bg-surface'
        )}
      >
        {reached ? '✓' : ''}
      </span>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-center justify-between gap-2">
          <span
            className={cn(
              'flex-1 text-sm font-semibold',
              reached ? 'text-muted' : 'text-on-surface'
            )}
          >
            {title}
          </span>
          {dateLabel ? <DueDatePill label={dateLabel} tone={dateTone} /> : null}
        </div>
        {pct != null ? <Progress value={pct} tone={reached ? 'success' : 'primary'} size="sm" /> : null}
      </div>
    </div>
  );
});

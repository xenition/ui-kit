import * as React from 'react';
import { cn } from '../primitives/cn';
import { Progress } from '../primitives';
import { DueDatePill } from './DueDatePill';
import type { MilestoneRowProps } from './MilestoneRow';

/** Drop-in for {@link MilestoneRowProps} — same props, the V4 "flow" design. */
export type MilestoneRowV4Props = MilestoneRowProps;

/**
 * MilestoneRow — **V4** "flow" design (web parity of the native V4). The
 * focused-workspace take on a milestone line, laid out on a subtle timeline
 * rail: a status marker (**success** glow when reached, else muted), a legible
 * title, an optional target {@link DueDatePill}, and a **primary** progress
 * hint. Reaching a milestone settles the row into a soft-success glow. Same
 * props/behavior as {@link MilestoneRowProps}; all colors from `--xen-*` token
 * classes (no literals).
 */
export const MilestoneRowV4 = React.forwardRef<HTMLDivElement, MilestoneRowV4Props>(function MilestoneRowV4(
  { title, reached = false, progress, dateLabel, dateTone = 'upcoming', className },
  ref
) {
  const pct = typeof progress === 'number' ? Math.max(0, Math.min(100, progress)) : undefined;

  return (
    <div
      ref={ref}
      className={cn(
        'flex items-start gap-3 rounded-[var(--xen-radius-lg)] p-2 transition-colors',
        reached ? 'bg-success/[0.08]' : 'bg-surface',
        className
      )}
    >
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

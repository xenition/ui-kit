import * as React from 'react';
import { cn } from '../primitives/cn';
import { DueDatePill } from './DueDatePill';
import type { MilestoneRowProps } from './MilestoneRow';

/** Same public contract as {@link MilestoneRow} — a drop-in alternate design. */
export type MilestoneRowV2Props = MilestoneRowProps;

/**
 * MilestoneRow, redesigned (v2): an **elevated milestone card**. A flag/✓ medallion
 * leads the title; a thick progress bar with a percent read-out and a target-date
 * pill follow. Reached milestones tint success. Distinct from v1. Same props,
 * token-only.
 */
export const MilestoneRowV2 = React.forwardRef<HTMLDivElement, MilestoneRowV2Props>(function MilestoneRowV2(
  { title, reached = false, progress, dateLabel, dateTone, className },
  ref
) {
  const pct = typeof progress === 'number' ? Math.max(0, Math.min(100, progress)) : reached ? 100 : 0;
  return (
    <div ref={ref} data-xen-milestone-row="" className={cn('flex flex-col gap-2 rounded-lg bg-surface p-3 shadow-sm', className)}>
      <div className="flex items-center gap-3">
        <span className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-base', reached ? 'bg-success/10 text-success' : 'bg-primary/10')} aria-hidden>{reached ? '✓' : '🏁'}</span>
        <p className={cn('min-w-0 flex-1 truncate text-sm font-semibold text-on-surface', reached && 'text-muted line-through')}>{title}</p>
        {dateLabel ? <DueDatePill label={dateLabel} tone={dateTone} /> : null}
      </div>
      <div className="flex items-center gap-2">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-100" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
          <div className={cn('h-full rounded-full', reached ? 'bg-success' : 'bg-primary')} style={{ width: `${pct}%` }} />
        </div>
        <span className="text-xs font-semibold text-muted">{pct}%</span>
      </div>
    </div>
  );
});

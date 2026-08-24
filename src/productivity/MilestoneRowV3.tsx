import * as React from 'react';
import { cn } from '../primitives/cn';
import { DueDatePill } from './DueDatePill';
import type { MilestoneRowProps } from './MilestoneRow';

/** Same public contract as {@link MilestoneRow} — a drop-in alternate design. */
export type MilestoneRowV3Props = MilestoneRowProps;

/**
 * MilestoneRow, redesigned (v3): a **dense milestone line**. A reached ✓ (or flag),
 * the title with a thin progress underline, and the target-date pill on the right —
 * hairline-bordered for a roadmap list. The opposite of v2's card. Same props,
 * token-only.
 */
export const MilestoneRowV3 = React.forwardRef<HTMLDivElement, MilestoneRowV3Props>(function MilestoneRowV3(
  { title, reached = false, progress, dateLabel, dateTone, className },
  ref
) {
  const pct = typeof progress === 'number' ? Math.max(0, Math.min(100, progress)) : reached ? 100 : 0;
  return (
    <div ref={ref} data-xen-milestone-row="" className={cn('flex items-center gap-2.5 border-b border-border py-2', className)}>
      <span className={cn('text-sm', reached ? 'text-success' : 'text-muted')} aria-hidden>{reached ? '✓' : '🏁'}</span>
      <div className="min-w-0 flex-1">
        <p className={cn('truncate text-sm text-on-surface', reached && 'text-muted line-through')}>{title}</p>
        <div className="mt-1 h-0.5 w-full overflow-hidden rounded-full bg-neutral-100">
          <div className={cn('h-full rounded-full', reached ? 'bg-success' : 'bg-primary')} style={{ width: `${pct}%` }} />
        </div>
      </div>
      {dateLabel ? <DueDatePill label={dateLabel} tone={dateTone} /> : null}
    </div>
  );
});

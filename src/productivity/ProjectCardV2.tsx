import * as React from 'react';
import { cn } from '../primitives/cn';
import { AssigneeGroup } from './AssigneeGroup';
import { DueDatePill } from './DueDatePill';
import type { ProjectCardProps } from './ProjectCard';

/** Same public contract as {@link ProjectCard} — a drop-in alternate design. */
export type ProjectCardV2Props = ProjectCardProps;

/**
 * ProjectCard, redesigned (v2): an **elevated project card**. A bold title/desc, a
 * big percent read-out over a thick progress bar, then assignees, a task-count meta
 * and a due pill on a footer row. Distinct from v1. Same props, token-only.
 */
export const ProjectCardV2 = React.forwardRef<HTMLDivElement, ProjectCardV2Props>(function ProjectCardV2(
  { title, description, progress, taskCount, assignees, dueLabel, dueTone, onClick, className },
  ref
) {
  const interactive = typeof onClick === 'function';
  const pct = typeof progress === 'number' ? Math.max(0, Math.min(100, progress)) : null;

  return (
    <div
      ref={ref}
      data-xen-project-card=""
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={title}
      onClick={interactive ? () => onClick?.() : undefined}
      onKeyDown={interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.(); } } : undefined}
      className={cn('flex flex-col gap-3 rounded-lg bg-surface p-md shadow-md transition-transform', interactive && 'cursor-pointer hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0', className)}
    >
      <div>
        <p className="text-base font-bold text-on-surface">{title}</p>
        {description ? <p className="text-sm text-muted">{description}</p> : null}
      </div>
      {pct !== null ? (
        <div>
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="text-muted">Progress</span>
            <span className="font-bold text-on-surface">{pct}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-100" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
            <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
          </div>
        </div>
      ) : null}
      <div className="flex items-center justify-between gap-2">
        {assignees && assignees.length > 0 ? <AssigneeGroup assignees={assignees} /> : <span />}
        <div className="flex items-center gap-2">
          {typeof taskCount === 'number' ? <span className="text-xs text-muted">{taskCount} tasks</span> : null}
          {dueLabel ? <DueDatePill label={dueLabel} tone={dueTone} /> : null}
        </div>
      </div>
    </div>
  );
});

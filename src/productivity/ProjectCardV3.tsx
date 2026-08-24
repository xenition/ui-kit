import * as React from 'react';
import { cn } from '../primitives/cn';
import { AssigneeGroup } from './AssigneeGroup';
import { DueDatePill } from './DueDatePill';
import type { ProjectCardProps } from './ProjectCard';

/** Same public contract as {@link ProjectCard} — a drop-in alternate design. */
export type ProjectCardV3Props = ProjectCardProps;

/**
 * ProjectCard, redesigned (v3): a **dense project row**. The title over a
 * description·task-count line with a thin progress underline, and assignees + a due
 * pill on the right — hairline-bordered for a projects list. The opposite of v2's
 * card. Same props, token-only.
 */
export const ProjectCardV3 = React.forwardRef<HTMLDivElement, ProjectCardV3Props>(function ProjectCardV3(
  { title, description, progress, taskCount, assignees, dueLabel, dueTone, onClick, className },
  ref
) {
  const interactive = typeof onClick === 'function';
  const pct = typeof progress === 'number' ? Math.max(0, Math.min(100, progress)) : null;
  const sub = [description, typeof taskCount === 'number' ? `${taskCount} tasks` : null].filter((s): s is string => !!s).join(' · ');

  return (
    <div
      ref={ref}
      data-xen-project-card=""
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={title}
      onClick={interactive ? () => onClick?.() : undefined}
      onKeyDown={interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.(); } } : undefined}
      className={cn('flex items-center gap-3 border-b border-border py-3', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className)}
    >
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-on-surface">{title}</p>
        {sub ? <p className="truncate text-xs text-muted">{sub}</p> : null}
        {pct !== null ? (
          <div className="mt-1 h-0.5 w-full overflow-hidden rounded-full bg-neutral-100">
            <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
          </div>
        ) : null}
      </div>
      {assignees && assignees.length > 0 ? <AssigneeGroup assignees={assignees} max={3} /> : null}
      {dueLabel ? <DueDatePill label={dueLabel} tone={dueTone} /> : null}
    </div>
  );
});

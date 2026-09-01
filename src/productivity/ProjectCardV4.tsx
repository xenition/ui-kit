import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card, Progress } from '../primitives';
import { AssigneeGroup } from './AssigneeGroup';
import { DueDatePill } from './DueDatePill';
import type { ProjectCardProps } from './ProjectCard';

/** Drop-in for {@link ProjectCardProps} — same props, the V4 "flow" design. */
export type ProjectCardV4Props = ProjectCardProps;

/**
 * ProjectCard — **V4** "flow" design (web parity of the native V4). The
 * focused-workspace take on a project summary: a clean, softly-elevated
 * {@link Card} with a legible title, one **primary** progress track (which
 * settles into a **soft-success glow** at 100%), an {@link AssigneeGroup},
 * task-count meta, and an optional {@link DueDatePill}. A hairline primary
 * accent edge is the only flourish. Same props/behavior as
 * {@link ProjectCardProps}; all colors from `--xen-*` token classes (no
 * literals).
 */
export const ProjectCardV4 = React.forwardRef<HTMLDivElement, ProjectCardV4Props>(function ProjectCardV4(
  {
    title,
    description,
    progress,
    taskCount,
    assignees = [],
    dueLabel,
    dueTone = 'upcoming',
    onClick,
    className,
  },
  ref
) {
  const pct = typeof progress === 'number' ? Math.max(0, Math.min(100, progress)) : undefined;
  const complete = pct != null && pct >= 100;

  const inner = (
    <Card
      className={cn(
        'flex flex-col gap-3 rounded-[var(--xen-radius-lg)] border-l-[3px] border-l-primary shadow-sm transition-colors',
        complete ? 'bg-success/[0.08]' : 'bg-surface'
      )}
    >
      <div className="flex flex-col gap-1">
        <span className="text-lg font-bold leading-snug text-on-surface">{title}</span>
        {description ? <span className="line-clamp-2 text-sm text-muted">{description}</span> : null}
      </div>

      {pct != null ? (
        <div className="flex flex-col gap-1">
          <Progress value={pct} tone={complete ? 'success' : 'primary'} size="sm" />
          <span className="text-xs text-muted">
            {`${pct}% complete${typeof taskCount === 'number' ? ` · ${taskCount} tasks` : ''}`}
          </span>
        </div>
      ) : null}

      <div className="flex items-center justify-between gap-2">
        <AssigneeGroup assignees={assignees} />
        {dueLabel ? <DueDatePill label={dueLabel} tone={dueTone} /> : null}
      </div>
    </Card>
  );

  if (onClick) {
    return (
      <button
        ref={ref as unknown as React.Ref<HTMLButtonElement>}
        type="button"
        aria-label={title}
        onClick={onClick}
        className={cn('block w-full text-left transition-opacity hover:opacity-90', className)}
      >
        {inner}
      </button>
    );
  }
  return (
    <div ref={ref} className={className}>
      {inner}
    </div>
  );
});

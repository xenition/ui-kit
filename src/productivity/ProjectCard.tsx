import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card, Progress } from '../primitives';
import { AssigneeGroup, type Assignee } from './AssigneeGroup';
import { DueDatePill, type DueDateTone } from './DueDatePill';

export interface ProjectCardProps {
  /** Project name. */
  title: string;
  /** Short description / subtitle. */
  description?: string;
  /** Completion percent 0–100 (guarded/clamped by the bar). */
  progress?: number;
  /** Count of open tasks (rendered as a subtle meta). */
  taskCount?: number;
  /** People on the project. */
  assignees?: Assignee[];
  /** Optional deadline label + tone. */
  dueLabel?: string;
  dueTone?: DueDateTone;
  /** Fires when the card is clicked. */
  onClick?: () => void;
  className?: string;
}

/**
 * A project summary card composed on the primitive {@link Card}: title +
 * description, a {@link Progress} completion bar, and a footer with an
 * {@link AssigneeGroup} and optional {@link DueDatePill}. Progress tone shifts to
 * success at 100%. Web parity of the native `ProjectCard` (`onPress` → `onClick`).
 * No literal colors.
 */
export const ProjectCard = React.forwardRef<HTMLDivElement, ProjectCardProps>(function ProjectCard(
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

  const inner = (
    <Card className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <span className="text-lg font-bold text-on-surface">{title}</span>
        {description ? <span className="line-clamp-2 text-sm text-muted">{description}</span> : null}
      </div>

      {pct != null ? (
        <div className="flex flex-col gap-1">
          <Progress value={pct} tone={pct >= 100 ? 'success' : 'primary'} size="sm" />
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

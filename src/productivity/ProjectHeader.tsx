import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, Icon } from '../primitives';

/** Project delivery status — drives the frosted status pill's glyph + label. */
export type ProjectStatus = 'on-track' | 'at-risk' | 'off-track' | 'done';

export interface ProjectHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Project name — the near-white headline on the gradient. */
  name: string;
  /** Optional one-line description under the name. */
  description?: string;
  /** Completion percentage `0–100`; shown as a near-white progress bar + numeral. */
  progressPct: number;
  /** Done / total task counts, rendered as a frosted stat tile. */
  taskCounts?: { done: number; total: number };
  /** Members on the project — rendered as an overlapping avatar stack (max 5 shown). */
  members?: readonly { name: string; avatarUrl?: string }[];
  /** Localized due-date label, rendered as a frosted stat tile. */
  dueLabel?: string;
  /** Delivery status; rendered as a frosted status pill. */
  status?: ProjectStatus;
  /** Fires on the "Add task" CTA. Hidden when unset. */
  onAddTask?: () => void;
  /** Fires on the settings (gear) action. Hidden when unset. */
  onSettings?: () => void;
}

const STATUS_META: Record<ProjectStatus, { glyph: string; label: string }> = {
  'on-track': { glyph: '🟢', label: 'On track' },
  'at-risk': { glyph: '🟡', label: 'At risk' },
  'off-track': { glyph: '🔴', label: 'Off track' },
  done: { glyph: '✓', label: 'Done' },
};

/**
 * ProjectHeader — the project-detail hero for the productivity **V4 "flow"** line.
 * A brand-gradient panel that opens a project workspace: the near-white project
 * name + description, a near-white progress bar with its numeral, frosted stat
 * tiles (done/total, due), an overlapping member avatar stack, and a frosted
 * status pill. "Add task" (a near-white `bg-on-primary` pill) and a ghost
 * settings button each appear only when their handler is set. Presentational —
 * shaped data + callbacks, nothing fetches. Every color derives from the brand
 * ramp via `--xen-*` token classes and gradient utilities — no literals, light +
 * dark.
 */
export const ProjectHeader = React.forwardRef<HTMLDivElement, ProjectHeaderProps>(
  function ProjectHeader(
    {
      name,
      description,
      progressPct,
      taskCounts,
      members,
      dueLabel,
      status,
      onAddTask,
      onSettings,
      className,
      ...rest
    },
    ref
  ) {
    const pct = Math.max(0, Math.min(100, Math.round(progressPct || 0)));
    const shown = members?.slice(0, 5) ?? [];
    const overflow = (members?.length ?? 0) - shown.length;
    const statusMeta = status ? STATUS_META[status] : null;

    const Tile = ({ label, value }: { label: string; value: string }) => (
      <div className="min-w-0 flex-1 rounded-[var(--xen-radius-md)] border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-md)] py-[var(--xen-space-sm)]">
        <p className="text-xs font-semibold text-primary-100">{label}</p>
        <p className="truncate text-base font-bold text-primary-50">{value}</p>
      </div>
    );

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-[var(--xen-space-lg)] overflow-hidden rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-xl)]',
          className
        )}
        {...rest}
      >
        <div className="flex items-start justify-between gap-[var(--xen-space-md)]">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-[var(--xen-space-sm)]">
              <h2 className="min-w-0 truncate text-2xl font-extrabold tracking-tight text-primary-50">
                {name}
              </h2>
              {statusMeta ? (
                <span className="inline-flex items-center gap-[var(--xen-space-xs)] rounded-full border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-md)] py-[var(--xen-space-xs)]">
                  <Icon glyph={statusMeta.glyph} size="xs" aria-hidden />
                  <span className="text-xs font-bold text-primary-50">{statusMeta.label}</span>
                </span>
              ) : null}
            </div>
            {description ? (
              <p className="mt-[var(--xen-space-xs)] line-clamp-2 text-sm text-primary-100">
                {description}
              </p>
            ) : null}
          </div>
          {onSettings ? (
            <button
              type="button"
              aria-label="Project settings"
              onClick={onSettings}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary-50/30 bg-primary-50/15 text-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
            >
              <Icon glyph="⚙️" size="lg" aria-hidden />
            </button>
          ) : null}
        </div>

        <div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-primary-100">Progress</span>
            <span aria-hidden className="text-sm font-bold text-primary-50">
              {pct}%
            </span>
          </div>
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={pct}
            aria-label={`Progress ${pct}%`}
            className="mt-[var(--xen-space-xs)] h-2 w-full overflow-hidden rounded-full bg-primary-50/15"
          >
            <div className="h-full rounded-full bg-primary-50" style={{ width: `${pct}%` }} />
          </div>
        </div>

        {taskCounts || dueLabel ? (
          <div className="flex gap-[var(--xen-space-sm)]">
            {taskCounts ? (
              <Tile label="Tasks" value={`${taskCounts.done} / ${taskCounts.total}`} />
            ) : null}
            {dueLabel ? <Tile label="Due" value={dueLabel} /> : null}
          </div>
        ) : null}

        {shown.length > 0 || onAddTask ? (
          <div className="flex items-center justify-between gap-[var(--xen-space-md)]">
            {shown.length > 0 ? (
              <div className="flex items-center" aria-label={`${members?.length} members`}>
                {shown.map((m, i) => (
                  <Avatar
                    key={`${m.name}-${i}`}
                    src={m.avatarUrl}
                    name={m.name}
                    alt={m.name}
                    size="sm"
                    className={cn('ring-2 ring-primary-600', i > 0 && '-ml-2')}
                  />
                ))}
                {overflow > 0 ? (
                  <span className="-ml-2 inline-flex h-8 w-8 items-center justify-center rounded-full border border-primary-50/30 bg-primary-50/15 text-xs font-bold text-primary-50 ring-2 ring-primary-600">
                    {`+${overflow}`}
                  </span>
                ) : null}
              </div>
            ) : (
              <span />
            )}
            {onAddTask ? (
              <button
                type="button"
                aria-label="Add task"
                onClick={onAddTask}
                className="inline-flex min-h-[44px] items-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] bg-on-primary px-[var(--xen-space-lg)] text-base font-extrabold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
              >
                <Icon glyph="＋" size="base" color="primary" aria-hidden />
                Add task
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
);

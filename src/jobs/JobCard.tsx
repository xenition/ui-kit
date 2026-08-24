import * as React from 'react';
import { Avatar, Badge, type BadgeTone } from '../primitives';
import { cn } from '../primitives/cn';
import type { EmploymentType, Job } from './types';
import { EMPLOYMENT_LABEL } from './types';
import { SalaryRange } from './SalaryRange';
import { SkillTag } from './SkillTag';
import { ApplyButton, type ApplyButtonProps } from './ApplyButton';
import { formatRelative } from './format';

/** Employment type → primitive `Badge` tone (tokens only). */
const TYPE_TONE: Record<EmploymentType, BadgeTone> = {
  'full-time': 'primary',
  'part-time': 'neutral',
  contract: 'warn',
  remote: 'success',
};

export interface JobCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** The posting to render. */
  job: Job;
  /** Bookmark state; when set, a save toggle is shown. */
  saved?: boolean;
  /** Fired when the save/bookmark toggle is pressed. */
  onSave?: (job: Job) => void;
  /** Apply CTA state; when set (or `onApply` given) the button renders. */
  applyState?: ApplyButtonProps['state'];
  /** Fired when the apply CTA is pressed. */
  onApply?: (job: Job) => void;
  /** Fired to withdraw when `applyState === 'applied'`. */
  onWithdraw?: (job: Job) => void;
  /** Whether the apply CTA shows a spinner. */
  applyLoading?: boolean;
  /** Fired when the card body is pressed (open detail). `onPress` → `onClick`. */
  onClick?: (job: Job) => void;
  /** Render a skeleton placeholder instead of content. */
  loading?: boolean;
  /** Cap the number of skill chips shown; the rest collapse to `+N`. */
  maxSkills?: number;
}

/**
 * A job-posting card — the module's headline component. Variant-rich via the
 * job's `type` (`full-time` / `part-time` / `contract` / `remote`), each mapped
 * to a token `Badge` tone. Composes `Avatar` (company logo), `SalaryRange`,
 * `SkillTag`s, and an `ApplyButton`, plus an optional save/bookmark toggle.
 * Data + callbacks only; supports a `loading` skeleton. All colors are tokens.
 */
export const JobCard = React.forwardRef<HTMLDivElement, JobCardProps>(function JobCard(
  {
    job,
    saved,
    onSave,
    applyState,
    onApply,
    onWithdraw,
    applyLoading,
    onClick,
    loading = false,
    maxSkills = 4,
    className,
    ...rest
  },
  ref
) {
  const surface = cn(
    'flex flex-col gap-md rounded-lg border border-border bg-surface p-lg text-on-surface',
    className
  );

  if (loading) {
    return (
      <div ref={ref} data-xen-job-card="loading" aria-label="Loading job" className={surface} {...rest}>
        <div className="flex items-center gap-md">
          <div className="h-10 w-10 animate-pulse rounded-md bg-neutral-100" />
          <div className="flex flex-1 flex-col gap-xs">
            <div className="h-3.5 w-[70%] animate-pulse rounded-sm bg-neutral-100" />
            <div className="h-3 w-[45%] animate-pulse rounded-sm bg-neutral-100" />
          </div>
        </div>
        <div className="h-3 w-[55%] animate-pulse rounded-sm bg-neutral-100" />
      </div>
    );
  }

  const skills = job.skills ?? [];
  const shown = skills.slice(0, Math.max(0, maxSkills));
  const overflow = skills.length - shown.length;
  const showApply = applyState != null || onApply != null;
  const posted = formatRelative(job.postedAt);

  const interactive = onClick != null;

  return (
    <div
      ref={ref}
      data-xen-job-card=""
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={`${job.title} at ${job.companyName}, ${EMPLOYMENT_LABEL[job.type]}`}
      onClick={interactive ? () => onClick!(job) : undefined}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick!(job);
              }
            }
          : undefined
      }
      className={cn(surface, interactive && 'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary')}
      {...rest}
    >
      {/* Header: logo + title/company + save */}
      <div className="flex items-start gap-md">
        <Avatar src={job.companyLogoUrl} name={job.companyName} size="md" />
        <div className="flex flex-1 flex-col gap-0.5">
          <span className="line-clamp-2 text-base font-semibold text-on-surface">{job.title}</span>
          <span className="truncate text-sm text-muted">
            {job.companyName}
            {job.location ? ` · ${job.location}` : ''}
          </span>
        </div>
        {onSave ? (
          <button
            type="button"
            aria-label={saved ? 'Saved — tap to remove' : 'Save job'}
            aria-pressed={!!saved}
            onClick={(e) => {
              e.stopPropagation();
              onSave(job);
            }}
            className={cn('text-lg leading-none', saved ? 'text-primary' : 'text-muted')}
          >
            {saved ? '★' : '☆'}
          </button>
        ) : null}
      </div>

      {/* Meta row: type badge + posted age */}
      <div className="flex flex-wrap items-center gap-sm">
        <Badge tone={TYPE_TONE[job.type]}>{EMPLOYMENT_LABEL[job.type]}</Badge>
        {posted ? <span className="text-xs text-muted">{posted}</span> : null}
      </div>

      {job.salary ? <SalaryRange salary={job.salary} size="sm" /> : null}

      {shown.length > 0 ? (
        <div className="flex flex-wrap gap-xs">
          {shown.map((s, i) => (
            <SkillTag key={`${s}-${i}`} label={s} />
          ))}
          {overflow > 0 ? (
            <span className="self-start rounded-sm bg-neutral-100 px-sm py-[3px] text-xs text-on-surface">
              {`+${overflow}`}
            </span>
          ) : null}
        </div>
      ) : null}

      {showApply ? (
        <ApplyButton
          state={applyState}
          loading={applyLoading}
          onApply={onApply ? () => onApply(job) : undefined}
          onWithdraw={onWithdraw ? () => onWithdraw(job) : undefined}
          block
        />
      ) : null}
    </div>
  );
});

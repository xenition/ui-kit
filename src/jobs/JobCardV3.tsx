import * as React from 'react';
import { Avatar } from '../primitives';
import { cn } from '../primitives/cn';
import type { EmploymentType } from './types';
import { EMPLOYMENT_LABEL } from './types';
import { SalaryRange } from './SalaryRange';
import { SkillTag } from './SkillTag';
import { ApplyButton } from './ApplyButton';
import { formatRelative } from './format';
import type { JobCardProps } from './JobCard';

/** Drop-in alternate: identical props to {@link JobCardProps}. */
export type JobCardV3Props = JobCardProps;

/** Employment type → a token accent-bar class for the left rail (tokens only). */
const TYPE_ACCENT: Record<EmploymentType, string> = {
  'full-time': 'bg-primary',
  'part-time': 'bg-accent',
  contract: 'bg-warn',
  remote: 'bg-success',
};

/**
 * JobCard — design V3 (web). A minimal, borderless line item: a thin colored
 * accent rail on the left keyed to the employment type, then the title, a single
 * inline `company · location · type · posted` meta line, salary, and a tight
 * skill row. Separation comes from spacing, not a box. Same props as
 * {@link JobCardProps} (drop-in). Token-pure — the accent is a semantic fill.
 */
export const JobCardV3 = React.forwardRef<HTMLDivElement, JobCardV3Props>(function JobCardV3(
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
    maxSkills = 3,
    className,
    ...rest
  },
  ref
) {
  const wrap = cn('flex gap-md py-md', className);

  if (loading) {
    return (
      <div ref={ref} data-xen-job-card="loading" aria-label="Loading job" className={wrap} {...rest}>
        <div className="w-1 shrink-0 rounded-full bg-neutral-100" />
        <div className="flex flex-1 flex-col gap-xs">
          <div className="h-3.5 w-[70%] animate-pulse rounded-sm bg-neutral-100" />
          <div className="h-3 w-[45%] animate-pulse rounded-sm bg-neutral-100" />
        </div>
      </div>
    );
  }

  const skills = job.skills ?? [];
  const shown = skills.slice(0, Math.max(0, maxSkills));
  const overflow = skills.length - shown.length;
  const showApply = applyState != null || onApply != null;
  const posted = formatRelative(job.postedAt);
  const accent = TYPE_ACCENT[job.type] ?? 'bg-primary';
  const meta = [job.companyName, job.location, EMPLOYMENT_LABEL[job.type], posted]
    .filter(Boolean)
    .join(' · ');
  const interactive = onClick != null;

  return (
    <div
      ref={ref}
      data-xen-job-card="v3"
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
      className={cn(
        wrap,
        interactive &&
          'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
      )}
      {...rest}
    >
      <span aria-hidden="true" className={cn('w-1 shrink-0 self-stretch rounded-full', accent)} />
      <div className="flex flex-1 flex-col gap-xs">
        <div className="flex items-start gap-sm">
          <Avatar src={job.companyLogoUrl} name={job.companyName} size="xs" shape="rounded" />
          <span className="line-clamp-2 flex-1 text-base font-semibold text-on-surface">{job.title}</span>
          {onSave ? (
            <button
              type="button"
              aria-label={saved ? 'Saved — tap to remove' : 'Save job'}
              aria-pressed={!!saved}
              onClick={(e) => {
                e.stopPropagation();
                onSave(job);
              }}
              className={cn('text-base leading-none', saved ? 'text-primary' : 'text-muted')}
            >
              {saved ? '★' : '☆'}
            </button>
          ) : null}
        </div>

        {meta ? <span className="truncate text-xs text-muted">{meta}</span> : null}

        {job.salary ? <SalaryRange salary={job.salary} size="sm" /> : null}

        {shown.length > 0 ? (
          <div className="flex flex-wrap items-center gap-xs">
            {shown.map((s, i) => (
              <SkillTag key={`${s}-${i}`} label={s} />
            ))}
            {overflow > 0 ? <span className="text-xs text-muted">{`+${overflow}`}</span> : null}
          </div>
        ) : null}

        {showApply ? (
          <ApplyButton
            state={applyState}
            loading={applyLoading}
            size="sm"
            onApply={onApply ? () => onApply(job) : undefined}
            onWithdraw={onWithdraw ? () => onWithdraw(job) : undefined}
          />
        ) : null}
      </div>
    </div>
  );
});

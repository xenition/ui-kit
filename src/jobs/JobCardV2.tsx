import * as React from 'react';
import { Avatar, Badge, type BadgeTone } from '../primitives';
import { cn } from '../primitives/cn';
import type { EmploymentType } from './types';
import { EMPLOYMENT_LABEL } from './types';
import { SalaryRange } from './SalaryRange';
import { SkillTag } from './SkillTag';
import { ApplyButton } from './ApplyButton';
import { formatRelative } from './format';
import type { JobCardProps } from './JobCard';

/** Drop-in alternate: identical props to {@link JobCardProps}. */
export type JobCardV2Props = JobCardProps;

/** Employment type → primitive `Badge` tone (tokens only). */
const TYPE_TONE: Record<EmploymentType, BadgeTone> = {
  'full-time': 'primary',
  'part-time': 'neutral',
  contract: 'warn',
  remote: 'success',
};

/**
 * JobCard — design V2 (web). An elevated, shadowed card led by a big rounded
 * company-logo tile, a full-width tinted salary rail, and a wrapped skill-chip
 * shelf. Same props as {@link JobCardProps} (drop-in), same token discipline:
 * fills are token tints, depth is the shared shadow scale, the employment type
 * is a `Badge` tone plus its text label. Subtle hover lift / press settle
 * (reduced-motion aware).
 */
export const JobCardV2 = React.forwardRef<HTMLDivElement, JobCardV2Props>(function JobCardV2(
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
    'flex flex-col gap-md rounded-lg border border-border bg-surface p-lg text-on-surface shadow-md',
    className
  );

  if (loading) {
    return (
      <div ref={ref} data-xen-job-card="loading" aria-label="Loading job" className={surface} {...rest}>
        <div className="flex items-center gap-md">
          <div className="h-16 w-16 animate-pulse rounded-md bg-neutral-100" />
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
      data-xen-job-card="v2"
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
        surface,
        interactive &&
          'cursor-pointer transition duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-reduce:transition-none motion-reduce:hover:transform-none'
      )}
      {...rest}
    >
      {/* Header: big logo tile + title/company + save */}
      <div className="flex items-start gap-md">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md bg-primary/10">
          <Avatar src={job.companyLogoUrl} name={job.companyName} size="lg" shape="rounded" />
        </div>
        <div className="flex flex-1 flex-col gap-0.5">
          <span className="line-clamp-2 text-lg font-bold text-on-surface">{job.title}</span>
          <span className="truncate text-sm text-muted">
            {job.companyName}
            {job.location ? ` · ${job.location}` : ''}
          </span>
          <div className="mt-0.5 flex flex-wrap items-center gap-sm">
            <Badge tone={TYPE_TONE[job.type]}>{EMPLOYMENT_LABEL[job.type]}</Badge>
            {posted ? <span className="text-xs text-muted">{posted}</span> : null}
          </div>
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

      {/* Salary rail — a full-width tinted band. */}
      {job.salary ? (
        <div className="flex items-center rounded-md bg-primary/5 px-md py-sm">
          <SalaryRange salary={job.salary} size="md" />
        </div>
      ) : null}

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

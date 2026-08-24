import * as React from 'react';
import { Avatar, Badge, type BadgeTone } from '../primitives';
import { cn } from '../primitives/cn';
import type { EmploymentType, Job } from './types';
import { EMPLOYMENT_LABEL } from './types';
import { SalaryRange } from './SalaryRange';
import { formatRelative } from './format';

const TYPE_TONE: Record<EmploymentType, BadgeTone> = {
  'full-time': 'primary',
  'part-time': 'neutral',
  contract: 'warn',
  remote: 'success',
};

export interface SavedJobRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** The saved job to render. */
  job: Job;
  /** When it was saved (ISO-8601); shown as a relative age. */
  savedAt?: string;
  /** Fired when the row is pressed (open detail). `onPress` → `onClick`. */
  onClick?: (job: Job) => void;
  /** Fired when the bookmark toggle is pressed (unsave). */
  onRemove?: (job: Job) => void;
}

/**
 * A compact row for the "saved jobs" list: company avatar, title, type badge +
 * salary, saved age, and a filled bookmark that removes the job when pressed.
 * Data + callbacks only; tokens only.
 */
export const SavedJobRow = React.forwardRef<HTMLDivElement, SavedJobRowProps>(function SavedJobRow(
  { job, savedAt, onClick, onRemove, className, ...rest },
  ref
) {
  const saved = formatRelative(savedAt);
  const interactive = onClick != null;

  return (
    <div
      ref={ref}
      data-xen-saved-job-row=""
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={`${job.title} at ${job.companyName}`}
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
        'flex items-center gap-md border-b border-border bg-surface px-md py-md',
        interactive && 'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className
      )}
      {...rest}
    >
      <Avatar src={job.companyLogoUrl} name={job.companyName} size="sm" />

      <div className="flex flex-1 flex-col gap-xs">
        <span className="truncate text-sm font-semibold text-on-surface">{job.title}</span>
        <div className="flex flex-wrap items-center gap-sm">
          <Badge tone={TYPE_TONE[job.type]}>{EMPLOYMENT_LABEL[job.type]}</Badge>
          {job.salary ? <SalaryRange salary={job.salary} size="sm" glyph={null} /> : null}
        </div>
        {saved ? <span className="text-xs text-muted">{`Saved ${saved}`}</span> : null}
      </div>

      {onRemove ? (
        <button
          type="button"
          aria-label={`Remove ${job.title} from saved`}
          aria-pressed={true}
          onClick={(e) => {
            e.stopPropagation();
            onRemove(job);
          }}
          className="text-lg leading-none text-primary"
        >
          ★
        </button>
      ) : null}
    </div>
  );
});

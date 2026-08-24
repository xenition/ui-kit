import * as React from 'react';
import { Avatar } from '../primitives';
import { cn } from '../primitives/cn';
import type { ApplicationRowProps } from './ApplicationRow';
import { StatusPipelineV2 } from './StatusPipelineV2';
import { formatRelative } from './format';

/** Drop-in alternate: identical props to {@link ApplicationRowProps}. */
export type ApplicationRowV2Props = ApplicationRowProps;

/**
 * ApplicationRow — design V2 (web). An elevated card that gives the application
 * room: a header of company avatar + job title + applied age, then the full
 * {@link StatusPipelineV2} funnel (big numbered steps with connectors) laid out
 * horizontally. Same props as {@link ApplicationRowProps} (drop-in). Token-pure,
 * with a subtle hover lift / press settle (reduced-motion aware).
 */
export const ApplicationRowV2 = React.forwardRef<HTMLDivElement, ApplicationRowV2Props>(
  function ApplicationRowV2({ application, onClick, accessory, className, ...rest }, ref) {
    const applied = formatRelative(application.appliedAt);
    const interactive = onClick != null;

    return (
      <div
        ref={ref}
        data-xen-application-row="v2"
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={`${application.jobTitle} at ${application.companyName}`}
        onClick={interactive ? () => onClick!(application) : undefined}
        onKeyDown={
          interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClick!(application);
                }
              }
            : undefined
        }
        className={cn(
          'flex flex-col gap-md rounded-lg border border-border bg-surface p-lg text-on-surface shadow-md',
          interactive &&
            'cursor-pointer transition duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-reduce:transition-none motion-reduce:hover:transform-none',
          className
        )}
        {...rest}
      >
        <div className="flex items-center gap-md">
          <Avatar name={application.companyName} size="md" shape="rounded" />
          <div className="flex flex-1 flex-col gap-0.5">
            <span className="truncate text-base font-semibold text-on-surface">
              {application.jobTitle}
            </span>
            <span className="truncate text-xs text-muted">
              {application.companyName}
              {applied ? ` · ${applied}` : ''}
            </span>
          </div>
          {accessory ? <div>{accessory}</div> : null}
        </div>

        <StatusPipelineV2 stage={application.stage} rejected={application.rejected} />
      </div>
    );
  }
);

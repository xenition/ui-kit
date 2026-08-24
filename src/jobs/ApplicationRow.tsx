import * as React from 'react';
import { Avatar } from '../primitives';
import { cn } from '../primitives/cn';
import type { Application } from './types';
import { StatusPipeline } from './StatusPipeline';
import { formatRelative } from './format';

export interface ApplicationRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** The application to render. */
  application: Application;
  /** Fired when the row is pressed (open application detail). `onPress` → `onClick`. */
  onClick?: (application: Application) => void;
  /** Trailing accessory (e.g. a chevron or action button). */
  accessory?: React.ReactNode;
}

/**
 * A single row in the "my applications" list: company avatar, job title,
 * applied age, and a compact {@link StatusPipeline} showing where it sits in the
 * funnel (with rejection called out as text). Data + `onClick` only; tokens only.
 */
export const ApplicationRow = React.forwardRef<HTMLDivElement, ApplicationRowProps>(
  function ApplicationRow({ application, onClick, accessory, className, ...rest }, ref) {
    const applied = formatRelative(application.appliedAt);
    const interactive = onClick != null;

    return (
      <div
        ref={ref}
        data-xen-application-row=""
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
          'flex items-center gap-md border-b border-border bg-surface px-md py-md',
          interactive && 'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          className
        )}
        {...rest}
      >
        <Avatar name={application.companyName} size="sm" />
        <div className="flex flex-1 flex-col gap-xs">
          <div className="flex justify-between gap-sm">
            <span className="flex-1 truncate text-sm font-semibold text-on-surface">
              {application.jobTitle}
            </span>
            {applied ? <span className="text-xs text-muted">{applied}</span> : null}
          </div>
          <span className="truncate text-xs text-muted">{application.companyName}</span>
          <StatusPipeline stage={application.stage} rejected={application.rejected} variant="compact" />
        </div>
        {accessory ? <div>{accessory}</div> : null}
      </div>
    );
  }
);

import * as React from 'react';
import { cn } from '../primitives/cn';
import type { ApplicationRowProps } from './ApplicationRow';
import { formatRelative } from './format';
import { APPLICATION_STAGES, STAGE_LABEL } from './types';

/** Drop-in alternate: identical props to {@link ApplicationRowProps}. */
export type ApplicationRowV3Props = ApplicationRowProps;

/**
 * ApplicationRow — design V3 (web). A dense single line: a colored status dot,
 * the job title, then the stage word and applied age trailing. The stage is
 * carried by the WORD (and a ✕/✓ glyph), never the dot color alone, and the
 * full context lives in the accessible label. Same props as
 * {@link ApplicationRowProps} (drop-in). Token-pure.
 */
export const ApplicationRowV3 = React.forwardRef<HTMLDivElement, ApplicationRowV3Props>(
  function ApplicationRowV3({ application, onClick, accessory, className, ...rest }, ref) {
    const applied = formatRelative(application.appliedAt);
    const interactive = onClick != null;

    // Guarded indexing: an unknown stage still resolves to a real label.
    const idx = Math.max(0, APPLICATION_STAGES.indexOf(application.stage));
    const label = STAGE_LABEL[application.stage] ?? STAGE_LABEL[APPLICATION_STAGES[0]!];
    const rejected = !!application.rejected;
    const hired = application.stage === 'hired';

    const dotClass = rejected ? 'bg-danger' : hired ? 'bg-success' : 'bg-primary';
    const wordClass = rejected ? 'text-danger' : hired ? 'text-success' : 'text-primary';
    const stageWord = rejected ? `✕ ${label}` : hired ? `✓ ${label}` : label;
    const summary = rejected
      ? `${application.jobTitle} at ${application.companyName}, rejected at ${label}, stage ${idx + 1} of ${APPLICATION_STAGES.length}`
      : `${application.jobTitle} at ${application.companyName}, ${label}, stage ${idx + 1} of ${APPLICATION_STAGES.length}`;

    return (
      <div
        ref={ref}
        data-xen-application-row="v3"
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={summary}
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
          'flex items-center gap-sm border-b border-border bg-surface px-md py-sm',
          interactive &&
            'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          className
        )}
        {...rest}
      >
        <span aria-hidden="true" className={cn('h-2 w-2 shrink-0 rounded-full', dotClass)} />
        <span className="flex-1 truncate text-sm font-semibold text-on-surface">
          {application.jobTitle}
        </span>
        <span className={cn('shrink-0 truncate text-xs font-semibold', wordClass)}>{stageWord}</span>
        {applied ? <span className="shrink-0 text-xs text-muted">{applied}</span> : null}
        {accessory ? <div>{accessory}</div> : null}
      </div>
    );
  }
);

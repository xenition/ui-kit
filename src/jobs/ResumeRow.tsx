import * as React from 'react';
import { Badge, Button } from '../primitives';
import { cn } from '../primitives/cn';
import type { Resume } from './types';
import { formatRelative } from './format';

export interface ResumeRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** The résumé file to render. */
  resume: Resume;
  /** Fired when the row is pressed (preview / open). `onPress` → `onClick`. */
  onClick?: (resume: Resume) => void;
  /** Fired when the download affordance is pressed. */
  onDownload?: (resume: Resume) => void;
  /** Fired to make this the default résumé (hidden when already default). */
  onSetDefault?: (resume: Resume) => void;
}

/**
 * A row in the résumé / documents list: a file glyph, the file name, an
 * updated-age + size line, a "Default" badge, and optional download / set-default
 * actions. Data + callbacks only; tokens only.
 */
export const ResumeRow = React.forwardRef<HTMLDivElement, ResumeRowProps>(function ResumeRow(
  { resume, onClick, onDownload, onSetDefault, className, ...rest },
  ref
) {
  const meta = [formatRelative(resume.updatedAt), resume.sizeLabel].filter(Boolean).join(' · ');
  const interactive = onClick != null;

  return (
    <div
      ref={ref}
      data-xen-resume-row=""
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={`${resume.name}${resume.isDefault ? ', default résumé' : ''}`}
      onClick={interactive ? () => onClick!(resume) : undefined}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick!(resume);
              }
            }
          : undefined
      }
      className={cn(
        'flex items-center gap-md rounded-md border border-border bg-surface p-md',
        interactive && 'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className
      )}
      {...rest}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-neutral-100 text-lg">
        <span aria-hidden="true">📄</span>
      </div>

      <div className="flex flex-1 flex-col gap-0.5">
        <div className="flex items-center gap-sm">
          <span className="min-w-0 shrink truncate text-sm font-semibold text-on-surface">
            {resume.name}
          </span>
          {resume.isDefault ? <Badge tone="success">Default</Badge> : null}
        </div>
        {meta ? <span className="text-xs text-muted">{meta}</span> : null}
      </div>

      <div className="flex items-center gap-xs">
        {!resume.isDefault && onSetDefault ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onSetDefault(resume);
            }}
            aria-label={`Set ${resume.name} as default`}
          >
            Set default
          </Button>
        ) : null}
        {onDownload ? (
          <button
            type="button"
            aria-label={`Download ${resume.name}`}
            onClick={(e) => {
              e.stopPropagation();
              onDownload(resume);
            }}
            className="text-lg leading-none text-primary"
          >
            ⬇
          </button>
        ) : null}
      </div>
    </div>
  );
});

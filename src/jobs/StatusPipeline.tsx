import * as React from 'react';
import { Badge, type BadgeTone, Steps } from '../primitives';
import { cn } from '../primitives/cn';
import type { ApplicationStage } from './types';
import { APPLICATION_STAGES, STAGE_LABEL } from './types';

export type StatusPipelineVariant = 'full' | 'compact';

export interface StatusPipelineProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The stage the application currently sits at. */
  stage: ApplicationStage;
  /** When true, the pipeline ended in rejection at `stage`. */
  rejected?: boolean;
  /**
   * `full` (default) renders the primitive `Steps` track with a labeled marker
   * per stage; `compact` renders a single stage `Badge` with an `n / total`
   * position — for dense rows.
   */
  variant?: StatusPipelineVariant;
}

/**
 * Hiring-funnel progress: applied → screening → interview → offer → hired.
 * Built on the primitive `Steps`, so each stage carries a numbered/checked
 * marker AND its text label — stage is never conveyed by color alone (an
 * explicit `aria-label` states "Stage n of m: <label>", and rejection is
 * announced as text, not just a danger hue). Presentational; pass `stage`.
 */
export const StatusPipeline = React.forwardRef<HTMLDivElement, StatusPipelineProps>(
  function StatusPipeline({ stage, rejected = false, variant = 'full', className, ...rest }, ref) {
    // Guard the lookup: an unknown stage resolves to the first step, never -1.
    const idx = Math.max(0, APPLICATION_STAGES.indexOf(stage));
    const total = APPLICATION_STAGES.length;
    const label = STAGE_LABEL[stage] ?? STAGE_LABEL.applied;
    const position = `${idx + 1} of ${total}`;
    const summary = rejected
      ? `Rejected at stage ${position}: ${label}`
      : `Stage ${position}: ${label}`;

    if (variant === 'compact') {
      const tone: BadgeTone = rejected ? 'danger' : stage === 'hired' ? 'success' : 'primary';
      return (
        <div
          ref={ref}
          data-xen-status-pipeline="compact"
          role="text"
          aria-label={summary}
          className={cn('inline-flex items-center gap-sm', className)}
          {...rest}
        >
          <Badge tone={tone}>{rejected ? `${label} · Rejected` : label}</Badge>
          <span className="text-xs text-muted">{position}</span>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        data-xen-status-pipeline="full"
        aria-label={summary}
        className={cn('flex flex-col gap-sm', className)}
        {...rest}
      >
        <Steps steps={APPLICATION_STAGES.map((s) => ({ title: STAGE_LABEL[s] }))} current={idx} />
        {rejected ? (
          <span className="text-xs font-semibold text-danger">{`✕ Rejected at ${label}`}</span>
        ) : null}
      </div>
    );
  }
);

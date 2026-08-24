import * as React from 'react';
import { cn } from '../primitives/cn';
import type { StatusPipelineProps } from './StatusPipeline';
import { APPLICATION_STAGES, STAGE_LABEL } from './types';

/** Drop-in alternate: identical props to {@link StatusPipelineProps}. */
export type StatusPipelineV3Props = StatusPipelineProps;

/**
 * StatusPipeline — design V3 (web). A minimal, dense read-out: the current stage
 * word (with a ✓/✕ glyph so meaning survives without color) and an `n of total`
 * position on one line, above a thin segmented bar that fills to the current
 * stage. Rejection tints the filled segments danger AND is stated as the word,
 * never color alone. `variant` is accepted for parity but ignored. Token-pure.
 */
export const StatusPipelineV3 = React.forwardRef<HTMLDivElement, StatusPipelineV3Props>(
  function StatusPipelineV3({ stage, rejected = false, variant: _variant, className, ...rest }, ref) {
    // Guarded indexing: an unknown stage resolves to the first step, never -1.
    const idx = Math.max(0, APPLICATION_STAGES.indexOf(stage));
    const total = APPLICATION_STAGES.length;
    const label = STAGE_LABEL[stage] ?? STAGE_LABEL[APPLICATION_STAGES[0]!];
    const position = `${idx + 1} of ${total}`;
    const summary = rejected
      ? `Rejected at stage ${position}: ${label}`
      : `Stage ${position}: ${label}`;

    const hired = stage === 'hired';
    const wordClass = rejected ? 'text-danger' : hired ? 'text-success' : 'text-primary';
    const word = rejected ? `✕ ${label} · Rejected` : hired ? `✓ ${label}` : label;

    return (
      <div
        ref={ref}
        data-xen-status-pipeline="v3"
        aria-label={summary}
        className={cn('flex flex-col gap-xs', className)}
        {...rest}
      >
        <div className="flex items-center justify-between gap-sm">
          <span className={cn('flex-1 truncate text-sm font-bold', wordClass)}>{word}</span>
          <span className="text-xs text-muted">{position}</span>
        </div>
        <div className="flex gap-0.5" aria-hidden="true">
          {APPLICATION_STAGES.map((s, i) => {
            const filled = i <= idx;
            const barClass = filled ? (rejected ? 'bg-danger' : 'bg-primary') : 'bg-border';
            return <span key={s} className={cn('h-1.5 flex-1 rounded-full', barClass)} />;
          })}
        </div>
      </div>
    );
  }
);

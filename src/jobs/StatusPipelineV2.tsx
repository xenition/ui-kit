import * as React from 'react';
import { cn } from '../primitives/cn';
import type { StatusPipelineProps } from './StatusPipeline';
import { APPLICATION_STAGES, STAGE_LABEL } from './types';

/** Drop-in alternate: identical props to {@link StatusPipelineProps}. */
export type StatusPipelineV2Props = StatusPipelineProps;

/**
 * StatusPipeline — design V2 (web). A big, celebratory funnel: large numbered
 * circles joined by connector rails, each with its stage word underneath.
 * Completed circles fill primary with a ✓, the current one is ringed, future
 * ones are muted. Rejection is spelled out as text (✕ glyph + danger word),
 * never color alone. `variant` is accepted for drop-in parity but the layout is
 * fixed — this file *is* the design. Token-pure.
 */
export const StatusPipelineV2 = React.forwardRef<HTMLDivElement, StatusPipelineV2Props>(
  function StatusPipelineV2({ stage, rejected = false, variant: _variant, className, ...rest }, ref) {
    // Guarded indexing: an unknown stage resolves to the first step, never -1.
    const idx = Math.max(0, APPLICATION_STAGES.indexOf(stage));
    const total = APPLICATION_STAGES.length;
    const label = STAGE_LABEL[stage] ?? STAGE_LABEL[APPLICATION_STAGES[0]!];
    const position = `${idx + 1} of ${total}`;
    const summary = rejected
      ? `Rejected at stage ${position}: ${label}`
      : `Stage ${position}: ${label}`;

    return (
      <div
        ref={ref}
        data-xen-status-pipeline="v2"
        aria-label={summary}
        className={cn('flex flex-col gap-sm', className)}
        {...rest}
      >
        <div className="flex items-start">
          {APPLICATION_STAGES.map((s, i) => {
            const done = i < idx;
            const current = i === idx;
            const rejectHere = rejected && current;
            const glyph = done ? '✓' : rejectHere ? '✕' : String(i + 1);
            const circleClass = done
              ? 'bg-primary text-on-primary border-transparent'
              : rejectHere
                ? 'bg-danger text-on-danger border-transparent'
                : current
                  ? 'border-primary text-primary'
                  : 'border-border text-muted';
            const leftFilled = i > 0 && i <= idx;
            const rightFilled = i < total - 1 && i < idx;
            return (
              <div key={s} className="flex flex-1 flex-col items-center gap-xs">
                <div className="flex w-full items-center">
                  <span
                    aria-hidden="true"
                    className={cn(
                      'h-0.5 flex-1',
                      i > 0 ? (leftFilled ? 'bg-primary' : 'bg-border') : 'bg-transparent'
                    )}
                  />
                  <span
                    aria-hidden="true"
                    className={cn(
                      'flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-bold',
                      circleClass
                    )}
                  >
                    {glyph}
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      'h-0.5 flex-1',
                      i < total - 1 ? (rightFilled ? 'bg-primary' : 'bg-border') : 'bg-transparent'
                    )}
                  />
                </div>
                <span
                  className={cn(
                    'truncate text-xs',
                    current ? 'font-bold text-on-surface' : done ? 'font-medium text-on-surface' : 'font-medium text-muted'
                  )}
                >
                  {STAGE_LABEL[s]}
                </span>
              </div>
            );
          })}
        </div>
        {rejected ? (
          <span className="text-xs font-bold text-danger">{`✕ Rejected at ${label}`}</span>
        ) : null}
      </div>
    );
  }
);

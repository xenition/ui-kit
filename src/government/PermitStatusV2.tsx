import * as React from 'react';
import { cn } from '../primitives/cn';
import { permitStatus, PERMIT_STAGES, PERMIT_STATUS } from './internal/status';
import type { PermitStatusProps } from './PermitStatus';

/** Same public contract as {@link PermitStatus} — a drop-in alternate design. */
export type PermitStatusV2Props = PermitStatusProps;

/**
 * PermitStatus, redesigned (v2): a **big node stepper**. The permit title/number
 * head a horizontal track of stage nodes (glyph + label) joined by connectors;
 * reached nodes fill primary, and a denial shows a danger end-state. Distinct from
 * v1's linear Steps. Same props, token-only.
 */
export const PermitStatusV2 = React.forwardRef<HTMLDivElement, PermitStatusV2Props>(function PermitStatusV2(
  { status, permitNumber, title, updatedDate, loading = false, className, ...rest },
  ref
) {
  if (loading) {
    return <div ref={ref} data-xen-permit-status="" aria-label="Loading permit status" className={cn('h-28 animate-pulse rounded-lg bg-neutral-100', className)} {...rest} />;
  }
  const denied = status === 'denied';
  const currentStep = denied ? 1 : PERMIT_STATUS[status].step;

  return (
    <div ref={ref} data-xen-permit-status="" className={cn('flex flex-col gap-3 rounded-lg bg-surface p-md shadow-sm', className)} {...rest}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          {title ? <p className="text-base font-bold text-on-surface">{title}</p> : null}
          {permitNumber ? <p className="font-mono text-xs text-muted">{permitNumber}</p> : null}
        </div>
        {updatedDate ? <span className="shrink-0 text-xs text-muted">Updated {updatedDate}</span> : null}
      </div>

      {denied ? (
        <div className="flex items-center gap-2 rounded-md bg-danger/10 px-3 py-2">
          <span aria-hidden>✕</span>
          <span className="text-sm font-semibold text-danger">Denied</span>
        </div>
      ) : (
        <div className="flex items-center">
          {PERMIT_STAGES.map((stage, i) => {
            const meta = permitStatus(stage);
            const reached = i <= currentStep;
            const active = i === currentStep;
            return (
              <React.Fragment key={stage}>
                <div className="flex flex-col items-center gap-1">
                  <span className={cn('flex h-8 w-8 items-center justify-center rounded-full text-sm', active ? 'bg-primary text-on-primary ring-2 ring-primary ring-offset-2' : reached ? 'bg-primary/20 text-primary' : 'bg-neutral-100 text-muted')}>{meta.glyph}</span>
                  <span className={cn('text-[10px]', reached ? 'text-on-surface' : 'text-muted')}>{meta.label}</span>
                </div>
                {i < PERMIT_STAGES.length - 1 ? <span className={cn('mx-1 h-px flex-1', i < currentStep ? 'bg-primary' : 'bg-border')} aria-hidden /> : null}
              </React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
});

import * as React from 'react';
import { cn } from '../primitives/cn';
import { permitStatus, PERMIT_STAGES, PERMIT_STATUS } from './internal/status';
import type { PermitStatusProps } from './PermitStatus';

/** Same public contract as {@link PermitStatus} — a drop-in alternate design. */
export type PermitStatusV3Props = PermitStatusProps;

const TONE_TEXT = { neutral: 'text-muted', warn: 'text-warn', success: 'text-success', danger: 'text-danger', primary: 'text-primary', accent: 'text-accent' } as const;

/**
 * PermitStatus, redesigned (v3): a **compact status line**. The current stage's
 * glyph + label (in its tone) and the permit number sit inline over a tiny
 * progress-dot strip. The opposite of v2's node stepper. Same props, token-only.
 */
export const PermitStatusV3 = React.forwardRef<HTMLDivElement, PermitStatusV3Props>(function PermitStatusV3(
  { status, permitNumber, title, updatedDate, loading = false, className, ...rest },
  ref
) {
  if (loading) {
    return <div ref={ref} data-xen-permit-status="" aria-label="Loading permit status" className={cn('flex items-center gap-3 py-2', className)} {...rest}><div className="h-3 w-2/5 animate-pulse rounded-sm bg-neutral-100" /></div>;
  }
  const meta = permitStatus(status);
  const denied = status === 'denied';
  const currentStep = denied ? 1 : PERMIT_STATUS[status].step;
  const toneText = TONE_TEXT[meta.tone as keyof typeof TONE_TEXT] ?? 'text-on-surface';

  return (
    <div ref={ref} data-xen-permit-status="" className={cn('flex items-center gap-3 border-b border-border py-2.5', className)} {...rest}>
      <span aria-hidden>{meta.glyph}</span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-on-surface">
          {title ?? 'Permit'} · <span className={cn('font-normal', toneText)}>{meta.label}</span>
        </p>
        {(permitNumber || updatedDate) ? <p className="truncate text-xs text-muted">{[permitNumber, updatedDate ? `Updated ${updatedDate}` : null].filter(Boolean).join(' · ')}</p> : null}
      </div>
      {!denied ? (
        <div className="flex gap-1">
          {PERMIT_STAGES.map((s, i) => <span key={s} className={cn('h-1.5 w-1.5 rounded-full', i <= currentStep ? 'bg-primary' : 'bg-neutral-200')} aria-hidden />)}
        </div>
      ) : null}
    </div>
  );
});

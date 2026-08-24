import * as React from 'react';
import { cn } from '../primitives/cn';
import { Steps, type StepItem } from '../primitives/Steps';
import { Icon } from '../primitives/Icon';
import { claimStatus, type ClaimStatus } from './internal/status';

export type { ClaimStatus };

export interface ClaimStatusTrackerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current claim lifecycle status. */
  status: ClaimStatus;
  /** Localized last-updated string (already formatted by the caller). */
  updated?: string;
}

/** Happy-path stages, in order. `denied` branches off `review`. */
const HAPPY_PATH: StepItem[] = [
  { title: 'Filed' },
  { title: 'In review' },
  { title: 'Approved' },
  { title: 'Paid' },
];

/**
 * A stage tracker for a single claim. The happy path (Filed → In review →
 * Approved → Paid) reuses the `Steps` primitive, with `current` derived from the
 * status descriptor (`paid` marks every stage done). A `denied` claim branches
 * off the review stage and renders a distinct `danger`-toned banner conveyed by
 * **glyph + text + color** — never color alone. Token-bound throughout. Web
 * parity of the native `ClaimStatusTracker`.
 */
export const ClaimStatusTracker = React.forwardRef<HTMLDivElement, ClaimStatusTrackerProps>(
  function ClaimStatusTracker({ status, updated, className, ...rest }, ref) {
    const sd = claimStatus(status);

    if (status === 'denied') {
      return (
        <div ref={ref} className={cn('flex flex-col gap-[var(--xen-space-sm)]', className)} {...rest}>
          <div
            aria-label="Claim denied"
            className="flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border border-danger bg-danger/10 px-[var(--xen-space-md)] py-[var(--xen-space-sm)]"
          >
            <Icon glyph={sd.glyph} color="danger" aria-label="Denied" />
            <div className="min-w-0 flex-1">
              <p className="text-base font-bold text-danger">Claim denied</p>
              <p className="text-xs text-muted">Reviewed after filing. Contact your agent to appeal.</p>
            </div>
          </div>
          {updated != null ? <p className="text-xs text-muted">Updated {updated}</p> : null}
        </div>
      );
    }

    // `paid` (step 3) marks the final stage done too → current past the last index.
    const current = status === 'paid' ? HAPPY_PATH.length : sd.step;

    return (
      <div ref={ref} className={cn('flex flex-col gap-[var(--xen-space-sm)]', className)} {...rest}>
        <Steps steps={HAPPY_PATH} current={current} />
        <p aria-label={`Claim status: ${sd.label}`} className="text-center text-xs text-muted">
          <span aria-hidden="true">{sd.glyph}</span> {sd.label}
          {updated != null ? ` · Updated ${updated}` : ''}
        </p>
      </div>
    );
  }
);

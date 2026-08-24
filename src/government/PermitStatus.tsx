import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Steps, type StepItem } from '../primitives/Steps';
import { Icon } from '../primitives/Icon';
import {
  permitStatus,
  PERMIT_STAGES,
  PERMIT_STATUS,
  type PermitStatusValue,
} from './internal/status';

export type { PermitStatusValue };

export interface PermitStatusProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Current permit lifecycle status. */
  status: PermitStatusValue;
  /** Permit / application reference number (e.g. "BLD-2026-0417"). */
  permitNumber?: string;
  /** Human permit title (e.g. "Building permit — 12 Oak St"). */
  title?: string;
  /** Localized date of the most recent status change. */
  updatedDate?: string;
  /** Show a loading placeholder instead of the tracker. */
  loading?: boolean;
}

/** Happy-path stages, in order. `denied` branches off `review`. */
const STAGES: StepItem[] = PERMIT_STAGES.map((stage) => ({ title: PERMIT_STATUS[stage].label }));

/**
 * A permit / license application status tracker. Renders the ordered happy-path
 * stages (submitted → review → approved → issued) via the `Steps` primitive; a
 * `denied` permit branches into a `danger`-toned banner conveyed by **glyph +
 * text + color** (never color alone) and announced with `role="alert"`. Guarded
 * against unknown statuses. Token-bound throughout — no literal colors. Web
 * parity of the native `PermitStatus`.
 */
export const PermitStatus = React.forwardRef<HTMLDivElement, PermitStatusProps>(function PermitStatus(
  { status, permitNumber, title, updatedDate, loading = false, className, ...rest },
  ref
) {
  const sd = permitStatus(status);
  const denied = status === 'denied';
  const current = denied ? 1 : Math.min(sd.step, STAGES.length - 1);

  return (
    <Card ref={ref} className={className} {...rest}>
      {title != null || permitNumber != null ? (
        <div className="mb-[var(--xen-space-md)]">
          {title != null ? (
            <p className="truncate text-base font-bold text-on-surface">{title}</p>
          ) : null}
          {permitNumber != null ? <p className="text-xs text-muted">{permitNumber}</p> : null}
        </div>
      ) : null}

      {loading ? (
        <div
          role="progressbar"
          aria-label="Loading permit status"
          className="h-12 animate-pulse rounded-[var(--xen-radius-md)] bg-neutral-100"
        />
      ) : denied ? (
        <div
          role="alert"
          className="flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border border-danger bg-danger/10 p-[var(--xen-space-md)]"
        >
          <Icon glyph={sd.glyph} color="danger" aria-label="Denied" />
          <div className="min-w-0 flex-1">
            <p className="text-base font-bold text-danger">Permit denied</p>
            <p className="text-xs text-on-surface">Review the notice and re-apply or appeal.</p>
          </div>
        </div>
      ) : (
        <Steps steps={STAGES} current={current} />
      )}

      {updatedDate != null && !loading ? (
        <p className="mt-[var(--xen-space-md)] text-xs text-muted">
          <span aria-hidden="true">{sd.glyph}</span> {sd.label} · updated {updatedDate}
        </p>
      ) : null}
    </Card>
  );
});

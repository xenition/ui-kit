import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, Badge } from '../primitives';
import { DISC_TINT, tintSlot } from './internal/format';
import { requestState, type RequestState } from './internal/status';

export type { RequestState };

/** Kind of service request — drives the leading glyph. */
export type ServiceRequestKind =
  | 'repair'
  | 'connect'
  | 'disconnect'
  | 'transfer'
  | 'inspection'
  | 'meter'
  | 'other';

const KIND_GLYPH: Record<ServiceRequestKind, string> = {
  repair: '🔧',
  connect: '🔌',
  disconnect: '⛔',
  transfer: '📦',
  inspection: '🔍',
  meter: '📟',
  other: '📋',
};

export interface ServiceRequestRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Request reference / ticket number (e.g. "SR-10482"). */
  requestNumber: string;
  /** Short summary (e.g. "Water heater leak"). */
  title: string;
  /** Lifecycle state — conveyed by text + glyph + color. */
  status: RequestState;
  /** Request kind — drives the leading glyph (default `other`). */
  kind?: ServiceRequestKind;
  /** Localized scheduled/updated date. */
  date?: string;
  /** Priority — surfaces an extra "Urgent" tag when `high`. */
  priority?: 'low' | 'normal' | 'high';
  /** Fires on row click (e.g. open request detail); becomes a button when supplied. */
  onClick?: () => void;
}

/**
 * One line in a service-request / work-order list: a tinted kind glyph disc, a
 * title/number stack, an optional date, and a status pill. The state is conveyed
 * redundantly (glyph + label + a color that traces to a semantic token:
 * completed → success, cancelled → neutral) so it is never color-alone; a `high`
 * priority adds an explicit "Urgent" tag rather than relying on color. Becomes a
 * `role="button"` row only when `onClick` is supplied. Web parity of the native
 * `ServiceRequestRow`.
 */
export const ServiceRequestRow = React.forwardRef<HTMLDivElement, ServiceRequestRowProps>(
  function ServiceRequestRow(
    { requestNumber, title, status, kind = 'other', date, priority = 'normal', onClick, className, ...rest },
    ref
  ) {
    const sd = requestState(status);
    const slot = tintSlot(sd.tone);
    const glyph = KIND_GLYPH[kind] ?? KIND_GLYPH.other;
    const interactive = onClick != null;

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
          interactive &&
            'cursor-pointer rounded-[var(--xen-radius-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
          className
        )}
        {...(interactive
          ? {
              role: 'button',
              tabIndex: 0,
              'aria-label': `Request ${requestNumber}, ${title}, ${sd.label}`,
              onClick,
              onKeyDown: (e: React.KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClick?.();
                }
              },
            }
          : {})}
        {...rest}
      >
        <span
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-[var(--xen-radius-md)]',
            DISC_TINT[slot]
          )}
        >
          <Icon glyph={glyph} aria-label={`${kind} request`} />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate text-base font-semibold text-on-surface">{title}</span>
          <div className="flex items-center gap-[var(--xen-space-xs)]">
            <span className="text-xs text-muted">{requestNumber}</span>
            {date != null ? <span className="text-xs text-muted">· {date}</span> : null}
            {priority === 'high' ? (
              <Badge tone="danger" variant="soft" size="sm">! Urgent</Badge>
            ) : null}
          </div>
        </div>
        <Badge tone={sd.tone} variant="soft" size="sm">{`${sd.glyph} ${sd.label}`}</Badge>
      </div>
    );
  }
);

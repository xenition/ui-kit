import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, Badge } from '../primitives';
import { requestState } from './internal/status';
import type { ServiceRequestRowProps, ServiceRequestKind } from './ServiceRequestRow';

/** Drop-in for {@link ServiceRequestRowProps} — same props, a different design. */
export type ServiceRequestRowV4Props = ServiceRequestRowProps;

const KIND_GLYPH: Record<ServiceRequestKind, string> = {
  repair: '🔧',
  connect: '🔌',
  disconnect: '⛔',
  transfer: '📦',
  inspection: '🔍',
  meter: '📟',
  other: '📋',
};

/**
 * ServiceRequestRow — **V4** design. A clean, elevated row: the kind glyph in the
 * signature brand-gradient disc, a title/number stack, an optional date, and a
 * status `Badge`. The lifecycle state stays conveyed redundantly by glyph +
 * label + a color that traces to a semantic slot (completed → success,
 * cancelled → neutral) via `requestState` — never color-alone; a `high` priority
 * adds an explicit "Urgent" tag. Becomes a `role="button"` row only when
 * `onClick` is supplied. Same props/behavior as {@link ServiceRequestRowProps};
 * token-only colors.
 */
export const ServiceRequestRowV4 = React.forwardRef<HTMLDivElement, ServiceRequestRowV4Props>(
  function ServiceRequestRowV4(
    { requestNumber, title, status, kind = 'other', date, priority = 'normal', onClick, className, ...rest },
    ref
  ) {
    const sd = requestState(status);
    const glyph = KIND_GLYPH[kind] ?? KIND_GLYPH.other;
    const interactive = onClick != null;

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-lg p-5',
          interactive &&
            'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
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
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] bg-gradient-to-br from-primary-400 to-primary-700">
          <Icon glyph={glyph} color="onPrimary" aria-label={`${kind} request`} />
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

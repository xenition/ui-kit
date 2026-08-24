import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives';
import { DISC_TINT, TEXT_TINT, tintSlot } from './internal/format';
import { utilityKind, serviceState } from './internal/status';
import type { ServiceStatusProps } from './ServiceStatus';

/** Same public contract as {@link ServiceStatus} — a drop-in alternate design. */
export type ServiceStatusV2Props = ServiceStatusProps;

/**
 * ServiceStatus, redesigned (v2): a **big status banner card**. A state-tinted
 * banner fills the top with a large service-glyph tile and an oversized state
 * headline (glyph + label) beside the utility line and location; the detail and
 * "updated" caption sit in a plain body below. Lifted with a shadow. Distinct at
 * a glance from v1's slim left-rail card and v3's inline chip. Same props; state
 * is glyph + label + a tint that traces to a semantic token (never color alone);
 * token-pure.
 */
export const ServiceStatusV2 = React.forwardRef<HTMLDivElement, ServiceStatusV2Props>(function ServiceStatusV2(
  { kind, state, location, updated, detail, className, ...rest },
  ref
) {
  const kd = utilityKind(kind);
  const sd = serviceState(state);
  const slot = tintSlot(sd.tone);
  const hasBody = detail != null || updated != null;

  return (
    <div
      ref={ref}
      className={cn('overflow-hidden rounded-[var(--xen-radius-lg)] bg-surface text-on-surface shadow-md', className)}
      {...rest}
    >
      {/* Tinted status banner */}
      <div className={cn('flex items-center gap-[var(--xen-space-md)] p-[var(--xen-space-lg)]', DISC_TINT[slot])}>
        <span
          className={cn(
            'flex h-14 w-14 items-center justify-center rounded-[var(--xen-radius-md)]',
            DISC_TINT[slot]
          )}
        >
          <Icon glyph={kd.glyph} size="2xl" aria-label={`${kd.label} service`} />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className={cn('text-xl font-extrabold', TEXT_TINT[slot])}>{`${sd.glyph} ${sd.label}`}</span>
          <span className="truncate text-sm font-semibold text-on-surface">
            {kd.label}
            {location != null ? ` · ${location}` : ''}
          </span>
        </div>
      </div>

      {hasBody ? (
        <div className="flex flex-col gap-[var(--xen-space-xs)] p-[var(--xen-space-lg)]">
          {detail != null ? <p className="text-sm text-on-surface">{detail}</p> : null}
          {updated != null ? <p className="text-xs text-muted">Updated {updated}</p> : null}
        </div>
      ) : null}
    </div>
  );
});

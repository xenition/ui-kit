import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, Badge } from '../primitives';
import { utilityKind, serviceState } from './internal/status';
import type { ServiceStatusProps } from './ServiceStatus';

/** Drop-in for {@link ServiceStatusProps} — same props, a different design. */
export type ServiceStatusV4Props = ServiceStatusProps;

/**
 * ServiceStatus — **V4** design. The clean, trust-first service card: an elevated
 * rounded surface, the utility-kind glyph in a small brand-gradient disc (the
 * signature V4 touch), and the operational `state` carried by a status `Badge`.
 * The state (active → success, outage → danger, maintenance/degraded → warn) is
 * still conveyed by **glyph + label + a color that traces to a semantic token** —
 * never color alone. Purely presentational; same props/behavior as
 * {@link ServiceStatusProps}; token-only colors.
 */
export const ServiceStatusV4 = React.forwardRef<HTMLDivElement, ServiceStatusV4Props>(function ServiceStatusV4(
  { kind, state, location, updated, detail, className, ...rest },
  ref
) {
  const kd = utilityKind(kind);
  const sd = serviceState(state);

  return (
    <div
      ref={ref}
      className={cn(
        'rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-lg p-5',
        className
      )}
      {...rest}
    >
      <div className="flex items-center gap-[var(--xen-space-md)]">
        <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] bg-gradient-to-br from-primary-400 to-primary-700">
          <Icon glyph={kd.glyph} size="xl" color="onPrimary" aria-label={`${kd.label} service`} />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate text-base font-bold text-on-surface">{kd.label}</span>
          {location != null ? <span className="truncate text-xs text-muted">{location}</span> : null}
        </div>
        <Badge tone={sd.tone} variant="soft">{`${sd.glyph} ${sd.label}`}</Badge>
      </div>

      {detail != null ? (
        <p className="mt-[var(--xen-space-md)] text-sm text-on-surface">{detail}</p>
      ) : null}
      {updated != null ? (
        <p className="mt-[var(--xen-space-xs)] text-xs text-muted">Updated {updated}</p>
      ) : null}
    </div>
  );
});

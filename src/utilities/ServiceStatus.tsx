import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card, Icon, Badge } from '../primitives';
import { DISC_TINT, SOLID_TINT, tintSlot } from './internal/format';
import { utilityKind, serviceState, type UtilityKind, type ServiceState } from './internal/status';

export type { UtilityKind, ServiceState };

export interface ServiceStatusProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Utility line — drives the leading glyph and label. */
  kind: UtilityKind;
  /** Operational state — conveyed by text + glyph + color. */
  state: ServiceState;
  /** Service point / address label (e.g. "123 Main St"). */
  location?: string;
  /** Localized "last updated" string. */
  updated?: string;
  /** Supporting detail line (e.g. "Crews on site · ETA 4:00 PM"). */
  detail?: string;
}

/**
 * A status card for one service connection. The `state` (active/outage/
 * maintenance/degraded) is conveyed by **glyph + label + a tint that traces to a
 * semantic token** (active → success, outage → danger) — never color alone. A
 * left rail tinted to the state's tone reinforces it without carrying the signal
 * by itself. Purely presentational; every color traces to a `--xen-*` token. Web
 * parity of the native `ServiceStatus`.
 */
export const ServiceStatus = React.forwardRef<HTMLDivElement, ServiceStatusProps>(function ServiceStatus(
  { kind, state, location, updated, detail, className, ...rest },
  ref
) {
  const kd = utilityKind(kind);
  const sd = serviceState(state);
  const slot = tintSlot(sd.tone);

  return (
    <Card
      ref={ref}
      variant="outlined"
      className={cn('flex items-stretch gap-[var(--xen-space-md)]', className)}
      {...rest}
    >
      <span className={cn('w-1 shrink-0 rounded-full', SOLID_TINT[slot])} aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-[var(--xen-space-md)]">
          <span
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-[var(--xen-radius-md)]',
              DISC_TINT[slot]
            )}
          >
            <Icon glyph={kd.glyph} size="lg" aria-label={`${kd.label} service`} />
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="truncate text-base font-bold text-on-surface">{kd.label}</span>
            {location != null ? <span className="truncate text-xs text-muted">{location}</span> : null}
          </div>
          <Badge tone={sd.tone} variant="soft">{`${sd.glyph} ${sd.label}`}</Badge>
        </div>

        {detail != null ? (
          <p className="mt-[var(--xen-space-sm)] text-sm text-on-surface">{detail}</p>
        ) : null}
        {updated != null ? (
          <p className="mt-[var(--xen-space-xs)] text-xs text-muted">Updated {updated}</p>
        ) : null}
      </div>
    </Card>
  );
});

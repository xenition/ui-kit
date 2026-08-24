import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, Badge } from '../primitives';
import { SOLID_TINT, tintSlot } from './internal/format';
import { utilityKind, serviceState } from './internal/status';
import type { ServiceStatusProps } from './ServiceStatus';

/** Same public contract as {@link ServiceStatus} — a drop-in alternate design. */
export type ServiceStatusV3Props = ServiceStatusProps;

/**
 * ServiceStatus, redesigned (v3): a **compact inline chip line**. A state dot +
 * utility glyph lead, the line label and a soft state badge sit together, and the
 * location / "updated" caption trails muted on the right — a single scannable row
 * with no card. Distinct at a glance from v1's rail card and v2's banner. Same
 * props; state is dot + glyph + label (never color alone); token-pure.
 */
export const ServiceStatusV3 = React.forwardRef<HTMLDivElement, ServiceStatusV3Props>(function ServiceStatusV3(
  { kind, state, location, updated, detail: _detail, className, ...rest },
  ref
) {
  const kd = utilityKind(kind);
  const sd = serviceState(state);
  const slot = tintSlot(sd.tone);
  const trailing = [location, updated != null ? `Updated ${updated}` : undefined]
    .filter((s): s is string => s != null)
    .join(' · ');

  return (
    <div
      ref={ref}
      className={cn('flex items-center gap-[var(--xen-space-sm)] py-[var(--xen-space-xs)]', className)}
      {...rest}
    >
      <span className={cn('h-2 w-2 shrink-0 rounded-full', SOLID_TINT[slot])} aria-hidden="true" />
      <Icon glyph={kd.glyph} size="sm" aria-label={`${kd.label} service`} />
      <span className="text-sm font-semibold text-on-surface">{kd.label}</span>
      <Badge tone={sd.tone} variant="soft" size="sm">{`${sd.glyph} ${sd.label}`}</Badge>
      {trailing !== '' ? (
        <span className="ml-auto min-w-0 shrink truncate text-xs text-muted">{trailing}</span>
      ) : null}
    </div>
  );
});

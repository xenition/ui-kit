import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, type BadgeTone } from '../primitives';
import type { VehicleCardProps, VehicleStatus } from './VehicleCard';

/** Same public contract as {@link VehicleCard} — a drop-in alternate design. */
export type VehicleCardV2Props = VehicleCardProps;

const STATUS: Record<VehicleStatus, { label: string; tone: BadgeTone }> = {
  available: { label: 'Available', tone: 'success' }, 'in-use': { label: 'In use', tone: 'primary' }, maintenance: { label: 'Maintenance', tone: 'warn' }, offline: { label: 'Offline', tone: 'neutral' },
};

/**
 * VehicleCard, redesigned (v2): an **elevated vehicle card**. A big car glyph tile
 * leads the make/model and a year·class·color line, with a plate chip, a status
 * badge, and spec chips. Distinct from v1. Same props, token-only.
 */
export const VehicleCardV2 = React.forwardRef<HTMLDivElement, VehicleCardV2Props>(function VehicleCardV2(
  { name, plate, vehicleClass, color, year, status = 'available', specs, variant, onClick, loading = false, className, ...rest },
  ref
) {
  void variant;
  if (loading) {
    return <div ref={ref} data-xen-vehicle-card="" aria-label="Loading vehicle" className={cn('h-28 animate-pulse rounded-lg bg-neutral-100', className)} {...rest} />;
  }
  const st = STATUS[status];
  const interactive = typeof onClick === 'function';
  const sub = [typeof year === 'number' ? String(year) : null, vehicleClass, color].filter((s): s is string => !!s).join(' · ');

  return (
    <div
      ref={ref}
      data-xen-vehicle-card=""
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={name}
      onClick={interactive ? () => onClick?.() : undefined}
      onKeyDown={interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.(); } } : undefined}
      className={cn('flex flex-col gap-3 rounded-lg bg-surface p-md shadow-sm', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className)}
      {...rest}
    >
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-2xl" aria-hidden>🚗</span>
        <div className="min-w-0 flex-1">
          <p className="text-base font-bold text-on-surface">{name}</p>
          {sub ? <p className="text-xs text-muted">{sub}</p> : null}
        </div>
        <div className="flex flex-col items-end gap-1">
          <Badge tone={st.tone}>{st.label}</Badge>
          {plate ? <span className="rounded-md bg-neutral-100 px-2 py-0.5 font-mono text-xs text-on-surface">{plate}</span> : null}
        </div>
      </div>
      {specs && specs.length > 0 ? (
        <div className="flex flex-wrap gap-1.5">
          {specs.map((s, i) => <span key={i} className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-on-surface">{s.label}: {s.value}</span>)}
        </div>
      ) : null}
    </div>
  );
});

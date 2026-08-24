import * as React from 'react';
import { cn } from '../primitives/cn';
import type { VehicleCardProps, VehicleStatus } from './VehicleCard';

/** Same public contract as {@link VehicleCard} — a drop-in alternate design. */
export type VehicleCardV3Props = VehicleCardProps;

const STATUS_DOT: Record<VehicleStatus, string> = { available: 'bg-success', 'in-use': 'bg-primary', maintenance: 'bg-warn', offline: 'bg-neutral-400' };
const STATUS_LABEL: Record<VehicleStatus, string> = { available: 'Available', 'in-use': 'In use', maintenance: 'Maintenance', offline: 'Offline' };

/**
 * VehicleCard, redesigned (v3): a **dense fleet line**. A car glyph, the make/model
 * over a status·year·class·color subtitle with a status dot, and a plate chip on
 * the right — hairline-bordered for a fleet list. The opposite of v2's card.
 * Status is dot + word, never color alone. Same props, token-only.
 */
export const VehicleCardV3 = React.forwardRef<HTMLDivElement, VehicleCardV3Props>(function VehicleCardV3(
  { name, plate, vehicleClass, color, year, status = 'available', specs, variant, onClick, loading = false, className, ...rest },
  ref
) {
  void variant;
  void specs;
  if (loading) {
    return <div ref={ref} data-xen-vehicle-card="" aria-label="Loading vehicle" className={cn('flex items-center gap-3 border-b border-border py-2.5', className)} {...rest}><div className="h-3 w-2/5 animate-pulse rounded-sm bg-neutral-100" /></div>;
  }
  const interactive = typeof onClick === 'function';
  const sub = [STATUS_LABEL[status], typeof year === 'number' ? String(year) : null, vehicleClass, color].filter((s): s is string => !!s).join(' · ');

  return (
    <div
      ref={ref}
      data-xen-vehicle-card=""
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={name}
      onClick={interactive ? () => onClick?.() : undefined}
      onKeyDown={interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.(); } } : undefined}
      className={cn('flex items-center gap-3 border-b border-border py-2.5', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className)}
      {...rest}
    >
      <span className={cn('inline-block h-2.5 w-2.5 shrink-0 rounded-full', STATUS_DOT[status])} aria-hidden />
      <span className="text-lg" aria-hidden>🚗</span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-on-surface">{name}</p>
        {sub ? <p className="truncate text-xs text-muted">{sub}</p> : null}
      </div>
      {plate ? <span className="rounded-md bg-neutral-100 px-2 py-0.5 font-mono text-xs text-on-surface">{plate}</span> : null}
    </div>
  );
});

import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { CarrierBadge } from './CarrierBadge';
import { DOCK_META, TONE_TEXT, TONE_BORDER, pressableProps, type DockStatus, type CarrierCode } from './internal';

export interface DockSlot {
  /** Stable key. */
  id: string;
  /** Time window label (e.g. `08:00–09:00`). */
  window: string;
  /** Slot status — glyph + word, never color alone. */
  status: DockStatus;
  /** Carrier assigned to the slot. */
  carrier?: CarrierCode;
  /** Carrier / appointment reference. */
  reference?: string;
}

export interface DockScheduleProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Dock door identifier (headline, e.g. `Dock 4`). */
  dock: string;
  /** Scheduled slots for the door, drawn top→bottom. */
  slots?: DockSlot[];
  /** Fires with the pressed slot. */
  onSelectSlot?: (slot: DockSlot) => void;
  /** Loading skeleton. */
  loading?: boolean;
}

/**
 * A dock-door appointment board: a door headline over a list of time-window
 * slots, each with a glyph + word status chip and an optional `CarrierBadge`.
 * Empty (no slots) and loading states are handled. Slots are clickable when
 * `onSelectSlot` is set (button role + label). All colors are theme tokens. Web
 * parity of the native `DockSchedule`.
 */
export const DockSchedule = React.forwardRef<HTMLDivElement, DockScheduleProps>(
  function DockSchedule({ dock, slots, onSelectSlot, loading = false, className, ...rest }, ref) {
    const list = Array.isArray(slots) ? slots : [];

    return (
      <Card ref={ref} variant="outlined" className={cn('flex flex-col gap-[var(--xen-space-sm)]', className)} {...rest}>
        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-on-surface">{dock}</span>
          {!loading ? (
            <span className="text-xs text-muted">{`${list.length} ${list.length === 1 ? 'slot' : 'slots'}`}</span>
          ) : null}
        </div>

        {loading ? (
          <div aria-busy="true" aria-label="Loading dock schedule" className="flex flex-col gap-[var(--xen-space-xs)]">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-10 animate-pulse rounded-[var(--xen-radius-md)] bg-neutral-100" />
            ))}
          </div>
        ) : list.length === 0 ? (
          <div
            aria-label="No slots scheduled"
            className="flex flex-col items-center gap-[var(--xen-space-xs)] py-[var(--xen-space-lg)]"
          >
            <span aria-hidden="true" className="text-xl text-muted">
              🅿
            </span>
            <span className="text-sm text-muted">No slots scheduled</span>
          </div>
        ) : (
          <div className="flex flex-col gap-[var(--xen-space-xs)]">
            {list.map((slot) => {
              const meta = DOCK_META[slot.status] ?? DOCK_META.open;
              const interactive = pressableProps(onSelectSlot ? () => onSelectSlot(slot) : undefined);
              return (
                <div
                  key={slot.id}
                  aria-label={interactive ? `${slot.window}, ${meta.label}` : undefined}
                  className={cn(
                    'flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border-l-[3px] bg-neutral-100 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]',
                    TONE_BORDER[meta.tone],
                    interactive &&
                      'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
                  )}
                  {...interactive}
                >
                  <div className="w-[92px] shrink-0">
                    <span className="text-sm font-semibold text-on-surface">{slot.window}</span>
                    <div className="flex items-center gap-0.5">
                      <span aria-hidden="true" className={cn('text-xs', TONE_TEXT[meta.tone])}>
                        {meta.glyph}
                      </span>
                      <span className={cn('text-xs font-semibold', TONE_TEXT[meta.tone])}>{meta.label}</span>
                    </div>
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
                    {slot.carrier ? <CarrierBadge carrier={slot.carrier} size="sm" /> : null}
                    {slot.reference ? (
                      <span className="truncate text-xs text-muted">{slot.reference}</span>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    );
  }
);

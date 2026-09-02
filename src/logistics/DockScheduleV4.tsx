import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyState } from '../commerce';
import { CarrierBadge } from './CarrierBadge';
import { DOCK_META, TONE_TEXT, TONE_BORDER, pressableProps } from './internal';
import type { DockScheduleProps } from './DockSchedule';

/** Drop-in for {@link DockScheduleProps} — same props, the V4 "dispatch" design. */
export type DockScheduleV4Props = DockScheduleProps;

/**
 * DockSchedule — **V4** "dispatch" design (web parity of the native V4). The
 * confident, operations-desk take on a dock-door appointment board: an elevated
 * rounded card with a soft shadow, a door headline with a slot count, and a list
 * of time-window slots. Each slot is a soft-primary well with a tone-toned
 * leading edge, a **tabular-nums** window, a glyph + word status (never color
 * alone), and an optional `CarrierBadge` + reference. Empty (no slots, via
 * `EmptyState`) and loading states are handled; slots are clickable when
 * `onSelectSlot` is set. Identical props/behavior to {@link DockScheduleProps}.
 * All colors from `--xen-*` token classes (no literals).
 */
export const DockScheduleV4 = React.forwardRef<HTMLDivElement, DockScheduleV4Props>(function DockScheduleV4(
  { dock, slots, onSelectSlot, loading = false, className, ...rest },
  ref
) {
  const list = Array.isArray(slots) ? slots : [];
  const shell = 'rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm';

  return (
    <div
      ref={ref}
      data-xen-dock-schedule=""
      className={cn(shell, 'flex flex-col gap-[var(--xen-space-md)] p-[var(--xen-space-lg)]', className)}
      {...rest}
    >
      <div className="flex items-center justify-between">
        <span className="text-base font-bold text-on-surface">{dock}</span>
        {!loading ? (
          <span className="text-xs tabular-nums text-muted">{`${list.length} ${list.length === 1 ? 'slot' : 'slots'}`}</span>
        ) : null}
      </div>

      {loading ? (
        <div aria-busy="true" aria-label="Loading dock schedule" className="flex flex-col gap-[var(--xen-space-sm)]">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-12 rounded-[var(--xen-radius-md)] bg-neutral-100" />
          ))}
        </div>
      ) : list.length === 0 ? (
        <EmptyState data-xen-dock-empty="" title="No slots scheduled" />
      ) : (
        <div className="flex flex-col gap-[var(--xen-space-sm)]">
          {list.map((slot) => {
            const meta = DOCK_META[slot.status] ?? DOCK_META.open;
            const interactive = pressableProps(onSelectSlot ? () => onSelectSlot(slot) : undefined);
            return (
              <div
                key={slot.id}
                data-xen-dock-slot=""
                aria-label={interactive ? `${slot.window}, ${meta.label}` : undefined}
                className={cn(
                  'flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-md)] border-l-[3px] bg-primary/5 px-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
                  TONE_BORDER[meta.tone],
                  interactive &&
                    'cursor-pointer transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'
                )}
                {...interactive}
              >
                <div className="w-[96px] shrink-0">
                  <span className="block text-sm font-semibold tabular-nums text-on-surface">{slot.window}</span>
                  <span className="mt-0.5 flex items-center gap-0.5">
                    <span aria-hidden="true" className={cn('text-xs', TONE_TEXT[meta.tone])}>
                      {meta.glyph}
                    </span>
                    <span className={cn('text-xs font-semibold', TONE_TEXT[meta.tone])}>{meta.label}</span>
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
                  {slot.carrier ? <CarrierBadge carrier={slot.carrier} size="sm" /> : null}
                  {slot.reference ? <span className="truncate text-xs text-muted">{slot.reference}</span> : null}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
});

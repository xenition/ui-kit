import * as React from 'react';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { SwitchV4 } from '../primitives/SwitchV4';
import { metaLine, type FarmTone } from './internal/farm-v4';
import type { IrrigationRunState, IrrigationScheduleProps } from './IrrigationSchedule';

export interface IrrigationScheduleV4Props extends IrrigationScheduleProps {
  /** Override the run-state names — four English words lived inside the component. */
  stateLabels?: Partial<Record<IrrigationRunState, string>>;
  /** Description under the empty title. */
  emptyDescription?: string;
}

/** Run state → tone and default label. Genuinely a status, so the tones stay. */
const STATE_META: Record<IrrigationRunState, { label: string; tone: FarmTone }> = {
  scheduled: { label: 'Scheduled', tone: 'neutral' },
  running: { label: 'Running', tone: 'primary' },
  done: { label: 'Done', tone: 'success' },
  skipped: { label: 'Skipped', tone: 'warn' },
};

/**
 * **V4 irrigation schedule** — the web twin of the native
 * `IrrigationScheduleV4`, same props as {@link IrrigationSchedule} plus
 * `stateLabels` and `emptyDescription`.
 *
 * ## Four changes
 *
 * 1. **The per-zone toggle is `SwitchV4`.** The base drew its own, so the one
 *    control on this card a user actually operates did not match the switches
 *    anywhere else in the product — different size, different travel, no focus
 *    ring.
 * 2. **A disabled zone dims at M3's 0.38** and carries `aria-disabled`, rather
 *    than only losing colour.
 * 3. **The empty state gets a description**, not just a title, so a schedule
 *    with nothing in it explains itself.
 * 4. **The rows are a real `<ul>`**, and captions take `muted-text`.
 *
 * Still fully controlled: `onToggle` reports, the component stores nothing.
 */
export const IrrigationScheduleV4 = React.forwardRef<HTMLDivElement, IrrigationScheduleV4Props>(
  function IrrigationScheduleV4(
    {
      slots,
      title = 'Irrigation',
      onToggle,
      emptyTitle = 'No runs scheduled',
      emptyDescription = 'Zones you schedule will appear here.',
      stateLabels,
      className,
      ...rest
    },
    ref
  ) {
    const list = Array.isArray(slots) ? slots : [];

    return (
      <CardV4
        ref={ref}
        data-xen-irrigation-schedule=""
        className={cn('flex flex-col gap-sm', className)}
        {...rest}
      >
        <div className="flex items-center gap-sm">
          <IconV4 glyph="💦" size="base" />
          <h3 className="min-w-0 flex-1 text-base font-semibold text-on-card">{title}</h3>
        </div>

        {list.length === 0 ? (
          <div className="flex flex-col gap-xs py-md text-center">
            <p className="text-sm font-semibold text-on-card">{emptyTitle}</p>
            <p className="text-xs text-muted-text">{emptyDescription}</p>
          </div>
        ) : (
          <ul>
            {list.map((slot, i) => {
              const state = slot.state ?? 'scheduled';
              const meta = STATE_META[state];
              const label = stateLabels?.[state] ?? meta.label;
              const enabled = slot.enabled ?? true;
              const caption = metaLine([slot.time, slot.duration]);
              const last = i === list.length - 1;

              return (
                <li
                  key={slot.id}
                  aria-disabled={!enabled || undefined}
                  className={cn(
                    'flex items-center gap-sm py-sm',
                    !last && 'border-b border-border',
                    // A disabled zone keeps its box and loses its ink.
                    !enabled && 'opacity-[0.38]'
                  )}
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-on-card">{slot.zone}</p>
                    {caption ? (
                      <p className="truncate text-xs text-muted-text [font-variant-numeric:tabular-nums]">
                        {caption}
                      </p>
                    ) : null}
                  </div>

                  <BadgeV4 tone={meta.tone} variant="soft" size="sm">
                    {label}
                  </BadgeV4>

                  {onToggle ? (
                    <SwitchV4
                      checked={enabled}
                      onCheckedChange={(next) => onToggle(slot.id, next)}
                      aria-label={slot.zone}
                    />
                  ) : null}
                </li>
              );
            })}
          </ul>
        )}
      </CardV4>
    );
  }
);

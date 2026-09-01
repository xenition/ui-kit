import * as React from 'react';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { ProgressV4 } from '../primitives/ProgressV4';
import { clampPercent, TONE_INK, type FarmTone } from './internal/farm-v4';
import type { EquipmentState, EquipmentStatusProps } from './EquipmentStatus';

export interface EquipmentStatusV4Props extends EquipmentStatusProps {
  /** Override the state names — four English words lived inside the component. */
  stateLabels?: Partial<Record<EquipmentState, string>>;
  /**
   * Below this fuel percentage the meter turns `warn`. Default `20`, which the
   * base hard-coded — and a threshold that is right for a tractor is not right
   * for a generator running a cold store.
   */
  lowFuelThreshold?: number;
}

/** State → tone and default label. Genuinely a status, so the tones stay. */
const STATE_META: Record<EquipmentState, { label: string; tone: FarmTone }> = {
  operational: { label: 'Operational', tone: 'success' },
  idle: { label: 'Idle', tone: 'neutral' },
  maintenance: { label: 'Maintenance', tone: 'warn' },
  offline: { label: 'Offline', tone: 'danger' },
};

/**
 * **V4 equipment status** — the web twin of the native `EquipmentStatusV4`,
 * same props as {@link EquipmentStatus} plus `stateLabels` and
 * `lowFuelThreshold`.
 *
 * ## Four changes
 *
 * 1. **The low-fuel threshold is a prop.** 20% was a constant inside the
 *    component, and it is a fleet decision, not a design-system one.
 * 2. **An interactive card is a `<button>`**, with the shared hover layer.
 * 3. **The state's ink is the contrast-corrected slot** — `*-text` — where the
 *    base put the fill slots directly on text.
 * 4. **The fuel and hours figures are tabular**, so a column of machines lines
 *    up.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
export const EquipmentStatusV4 = React.forwardRef<HTMLDivElement, EquipmentStatusV4Props>(
  function EquipmentStatusV4(
    {
      name,
      type,
      icon = '🚜',
      state = 'operational',
      fuelPct,
      fuelLabel = 'Fuel',
      hours,
      stateLabels,
      lowFuelThreshold = 20,
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    if (!name) return null;

    const meta = STATE_META[state];
    const label = stateLabels?.[state] ?? meta.label;
    const pct = clampPercent(fuelPct);
    const lowFuel = pct != null && pct < lowFuelThreshold;

    const body = (
      <>
        <div className="flex items-center gap-sm">
          <IconV4 glyph={icon} size="xl" />
          <div className="min-w-0 flex-1">
            <p className="truncate font-heading text-base font-bold text-on-card">{name}</p>
            {type != null ? <p className="truncate text-sm text-muted-text">{type}</p> : null}
          </div>
          <BadgeV4 tone={meta.tone} variant="soft" size="sm">
            {label}
          </BadgeV4>
        </div>

        {pct != null ? (
          <div className="mt-md flex flex-col gap-xs">
            <div className="flex justify-between">
              <span className="text-xs text-muted-text">{fuelLabel}</span>
              <span
                className={cn(
                  'text-xs font-semibold [font-variant-numeric:tabular-nums]',
                  lowFuel ? TONE_INK.warn : 'text-on-card'
                )}
              >
                {pct}%
              </span>
            </div>
            <ProgressV4 value={pct} tone={lowFuel ? 'warn' : 'primary'} />
          </div>
        ) : null}

        {hours != null ? (
          <p className="mt-sm flex items-center gap-xs text-xs text-muted-text [font-variant-numeric:tabular-nums]">
            <IconV4 name="clock" size="xs" />
            {hours}
          </p>
        ) : null}
      </>
    );

    if (!onClick) {
      return (
        <CardV4 ref={ref} data-xen-equipment-status="" className={className} {...rest}>
          {body}
        </CardV4>
      );
    }

    return (
      <CardV4 ref={ref} data-xen-equipment-status="" className={cn('p-0', className)} {...rest}>
        <button
          type="button"
          onClick={onClick}
          aria-label={[name, type, label].filter(Boolean).join(', ')}
          data-xen-v4-chrome="on-surface"
          className="flex w-full flex-col rounded-[var(--xen-radius-lg)] p-lg text-left"
        >
          {body}
        </button>
      </CardV4>
    );
  }
);

import * as React from 'react';
import { cn } from '../primitives/cn';
import type { ThermostatDialProps, ThermostatMode } from './ThermostatDial';

/** Same public contract as {@link ThermostatDial} — a drop-in alternate design. */
export type ThermostatDialV3Props = ThermostatDialProps;

const MODE_TEXT: Record<ThermostatMode, string> = { heat: 'text-danger', cool: 'text-primary', auto: 'text-accent', off: 'text-muted' };
const MODE_LABEL: Record<ThermostatMode, string> = { heat: 'Heat', cool: 'Cool', auto: 'Auto', off: 'Off' };

/**
 * ThermostatDial, redesigned (v3): a **compact stepper row**. No dial — a −/+ pair
 * flanks the large setpoint, with the mode + ambient reading beneath, sized for a
 * device list row. The minimal counterpart to v2's dial. Same props (`size` is
 * accepted for parity), token-only.
 */
export const ThermostatDialV3 = React.forwardRef<HTMLDivElement, ThermostatDialV3Props>(
  function ThermostatDialV3(
    { target, ambient, min = 10, max = 30, step = 0.5, mode = 'heat', unit = '°', size, onTargetChange, offline = false, className, style },
    ref
  ) {
    void size;
    const clampedTarget = Math.min(max, Math.max(min, target));
    const accentText = offline ? 'text-muted' : MODE_TEXT[mode];

    const bump = (dir: number): void => {
      if (offline || !onTargetChange) return;
      onTargetChange(Math.min(max, Math.max(min, clampedTarget + dir * step)));
    };
    const btn = 'flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-xl text-on-surface disabled:opacity-50';

    return (
      <div ref={ref} data-xen-thermostat-dial="" aria-label={`Thermostat, ${offline ? 'Offline' : MODE_LABEL[mode]}`} style={style} className={cn('flex items-center justify-between gap-3 border-b border-border py-2.5', offline && 'opacity-60', className)}>
        <div className="min-w-0">
          <p className="text-2xl font-bold text-on-surface">{clampedTarget}{unit}</p>
          <p className={cn('text-xs font-semibold', accentText)}>
            {offline ? 'Offline' : MODE_LABEL[mode]}
            {ambient != null ? <span className="font-normal text-muted"> · Now {ambient}{unit}</span> : null}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" className={btn} disabled={offline} aria-label="Lower target temperature" onClick={() => bump(-1)}>−</button>
          <button type="button" className={btn} disabled={offline} aria-label="Raise target temperature" onClick={() => bump(1)}>+</button>
        </div>
      </div>
    );
  }
);

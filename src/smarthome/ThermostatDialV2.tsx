import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import type { ThermostatDialProps, ThermostatMode } from './ThermostatDial';

/** Same public contract as {@link ThermostatDial} — a drop-in alternate design. */
export type ThermostatDialV2Props = ThermostatDialProps;

const MODE_VAR: Record<ThermostatMode, string> = { heat: 'danger', cool: 'primary', auto: 'accent', off: 'muted' };
const MODE_TEXT: Record<ThermostatMode, string> = { heat: 'text-danger', cool: 'text-primary', auto: 'text-accent', off: 'text-muted' };
const MODE_LABEL: Record<ThermostatMode, string> = { heat: 'Heat', cool: 'Cool', auto: 'Auto', off: 'Off' };

/**
 * ThermostatDial, redesigned (v2): a **bold progress dial**. The setpoint arc
 * sweeps a thick ring (mode-accented) around a large centered temperature with
 * the ambient reading and mode beneath, flanked by big −/+ controls. A punchier
 * dial than v1 — same arc/token approach. Same props, token-only.
 */
export const ThermostatDialV2 = React.forwardRef<HTMLDivElement, ThermostatDialV2Props>(
  function ThermostatDialV2(
    { target, ambient, min = 10, max = 30, step = 0.5, mode = 'heat', unit = '°', size = 200, onTargetChange, offline = false, className, style },
    ref
  ) {
    const clampedTarget = Math.min(max, Math.max(min, target));
    const pct = max > min ? (clampedTarget - min) / (max - min) : 0;
    const thickness = 16;
    const r = (size - thickness) / 2;
    const c = 2 * Math.PI * r;
    const accentVar = offline ? 'var(--xen-muted)' : `var(--xen-${MODE_VAR[mode]})`;
    const accentText = offline ? 'text-muted' : MODE_TEXT[mode];

    const bump = (dir: number): void => {
      if (offline || !onTargetChange) return;
      onTargetChange(Math.min(max, Math.max(min, clampedTarget + dir * step)));
    };

    const btn = 'flex h-11 w-11 items-center justify-center rounded-full bg-neutral-100 text-on-surface disabled:opacity-50';

    return (
      <div ref={ref} data-xen-thermostat-dial="" aria-label={`Thermostat, ${offline ? 'Offline' : MODE_LABEL[mode]}`} style={style} className={cn('flex items-center gap-4', offline && 'opacity-60', className)}>
        <button type="button" className={btn} disabled={offline} aria-label="Lower target temperature" onClick={() => bump(-1)}>
          <Icon glyph="−" color="onSurface" size="xl" />
        </button>

        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`Setpoint ${clampedTarget}${unit}`}>
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--xen-border)" strokeWidth={thickness} />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={accentVar}
              strokeWidth={thickness}
              strokeLinecap="round"
              strokeDasharray={`${c * pct} ${c}`}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-4xl font-bold text-on-surface">{clampedTarget}{unit}</span>
            {ambient != null ? <span className="text-sm text-muted">{`Now ${ambient}${unit}`}</span> : null}
            <span className={cn('mt-0.5 text-xs font-semibold', accentText)}>{offline ? 'Offline' : MODE_LABEL[mode]}</span>
          </div>
        </div>

        <button type="button" className={btn} disabled={offline} aria-label="Raise target temperature" onClick={() => bump(1)}>
          <Icon glyph="+" color="onSurface" size="xl" />
        </button>
      </div>
    );
  }
);

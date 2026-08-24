import * as React from 'react';
import { cn } from '../primitives/cn';
import { Switch } from '../primitives/Switch';
import { Slider } from '../primitives/Slider';
import type { LightControlProps } from './LightControl';

/** Same public contract as {@link LightControl} — a drop-in alternate design. */
export type LightControlV2Props = LightControlProps;

/**
 * LightControl, redesigned (v2): an **elevated lighting panel**. A header pairs
 * the name with the on/off Switch; a large brightness slider shows a big percent
 * read-out, and a warm↔cool color-temperature slider sits below when provided.
 * Distinct from v1. Same props, token-only.
 */
export const LightControlV2 = React.forwardRef<HTMLDivElement, LightControlV2Props>(
  function LightControlV2(
    { name, on = false, brightness = 0, colorTemp, offline = false, onToggle, onBrightnessChange, onColorTempChange, className, style },
    ref
  ) {
    const controlsDisabled = offline || !on;
    return (
      <div ref={ref} data-xen-light-control="" style={style} className={cn('flex flex-col gap-3 rounded-lg bg-surface p-md shadow-sm', offline && 'opacity-60', className)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl" aria-hidden>💡</span>
            <p className="text-sm font-bold text-on-surface">{name}</p>
          </div>
          <Switch checked={on} disabled={offline} aria-label={`Toggle ${name}`} onCheckedChange={(next) => onToggle?.(next)} />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-muted">Brightness</span>
            <span className="text-lg font-bold text-on-surface">{Math.round(brightness)}%</span>
          </div>
          <Slider value={brightness} min={0} max={100} disabled={controlsDisabled} onChange={(v) => onBrightnessChange?.(v)} />
        </div>

        {typeof colorTemp === 'number' ? (
          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-xs text-muted">
              <span>Warm</span>
              <span>Cool</span>
            </div>
            <Slider value={colorTemp} min={0} max={100} disabled={controlsDisabled} onChange={(v) => onColorTempChange?.(v)} />
          </div>
        ) : null}
      </div>
    );
  }
);

import * as React from 'react';
import { cn } from '../primitives/cn';
import { Switch } from '../primitives/Switch';
import { Slider } from '../primitives/Slider';
import type { LightControlProps } from './LightControl';

/** Same public contract as {@link LightControl} — a drop-in alternate design. */
export type LightControlV3Props = LightControlProps;

/**
 * LightControl, redesigned (v3): a **compact light row**. The name + on/off Switch
 * on one line, with an inline brightness slider and a small percent read-out
 * beneath — the color-temperature control is folded away. A dense list row vs.
 * v2's panel. Same props, token-only.
 */
export const LightControlV3 = React.forwardRef<HTMLDivElement, LightControlV3Props>(
  function LightControlV3(
    { name, on = false, brightness = 0, colorTemp, offline = false, onToggle, onBrightnessChange, onColorTempChange, className, style },
    ref
  ) {
    void colorTemp;
    void onColorTempChange;
    const controlsDisabled = offline || !on;
    return (
      <div ref={ref} data-xen-light-control="" style={style} className={cn('flex flex-col gap-1.5 border-b border-border py-2.5', offline && 'opacity-60', className)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span aria-hidden>💡</span>
            <p className="text-sm font-medium text-on-surface">{name}</p>
          </div>
          <Switch checked={on} disabled={offline} aria-label={`Toggle ${name}`} onCheckedChange={(next) => onToggle?.(next)} />
        </div>
        <div className="flex items-center gap-2">
          <div className="min-w-0 flex-1">
            <Slider value={brightness} min={0} max={100} disabled={controlsDisabled} onChange={(v) => onBrightnessChange?.(v)} />
          </div>
          <span className="w-9 shrink-0 text-right text-xs font-semibold text-muted">{Math.round(brightness)}%</span>
        </div>
      </div>
    );
  }
);

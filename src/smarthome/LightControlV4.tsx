import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Icon } from '../primitives/Icon';
import { Switch } from '../primitives/Switch';
import { Slider } from '../primitives/Slider';
import type { LightControlProps } from './LightControl';

/** Drop-in for {@link LightControlProps} — same props, the V4 "ambient" design. */
export type LightControlV4Props = LightControlProps;

/**
 * LightControl — **V4** "ambient" design (web parity of the native V4). The
 * control-panel take on a light: when the bulb is lit the whole card glows — a
 * soft warm-tinted wash (`bg-warn/[0.08]`), a `warn` border, and a glowing bulb
 * disc (`bg-warn/15 border-warn/40`); off/`offline` stay calm `bg-surface`.
 * A big legible brightness {@link Slider} and an optional warm→cool
 * color-temperature row keep the base controls; a text `On`/`Off`/`Offline`
 * label carries the state so it never rests on color alone. Sliders disable when
 * off or `offline`. Guards keep the brightness readout in `[0,100]`. Same
 * props/behavior as {@link LightControlProps}; all colors from `--xen-*` token
 * classes (no literals).
 */
export const LightControlV4 = React.forwardRef<HTMLDivElement, LightControlV4Props>(function LightControlV4(
  { name, on = false, brightness = 0, colorTemp, offline = false, onToggle, onBrightnessChange, onColorTempChange, className, style },
  ref
) {
  const disabled = offline || !on;
  const lit = on && !offline;
  const shownBrightness = Math.round(Math.min(Math.max(brightness, 0), 100));
  const statusLabel = offline ? 'Offline' : on ? 'On' : 'Off';

  return (
    <Card
      ref={ref}
      style={style}
      variant="flat"
      className={cn(
        'border',
        lit ? 'border-warn/50 bg-warn/[0.08] shadow-md' : 'border-border bg-surface shadow-sm',
        offline && 'opacity-70',
        className
      )}
    >
      <div className="flex items-center gap-[var(--xen-space-sm)]">
        {/* Glowing bulb disc — the ambient signature. */}
        <span
          className={cn(
            'flex h-11 w-11 items-center justify-center rounded-[var(--xen-radius-md)] border',
            lit ? 'border-warn/40 bg-warn/15' : 'border-border bg-on-surface/5'
          )}
        >
          <Icon glyph="💡" color={lit ? 'warn' : 'muted'} size="lg" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-bold text-on-surface">{name}</p>
          <p className="text-xs text-muted">{statusLabel}</p>
        </div>
        <Switch checked={on} disabled={offline} onCheckedChange={onToggle} aria-label={`${name} power`} />
      </div>

      <div className="mt-[var(--xen-space-md)] flex flex-col gap-[var(--xen-space-xs)]">
        <div className="flex justify-between">
          <span className="text-xs text-muted">Brightness</span>
          <span className="text-xs font-semibold text-on-surface">{shownBrightness}%</span>
        </div>
        <Slider value={shownBrightness} min={0} max={100} step={1} disabled={disabled} onChange={(v) => onBrightnessChange?.(v)} />
      </div>

      {colorTemp != null ? (
        <div className="mt-[var(--xen-space-md)] flex flex-col gap-[var(--xen-space-xs)]">
          <div className="flex justify-between">
            <span className="text-xs font-semibold text-warn">Warm</span>
            <span className="text-xs font-semibold text-primary">Cool</span>
          </div>
          <Slider
            value={Math.min(Math.max(colorTemp, 0), 100)}
            min={0}
            max={100}
            step={1}
            disabled={disabled}
            onChange={(v) => onColorTempChange?.(v)}
          />
        </div>
      ) : null}
    </Card>
  );
});

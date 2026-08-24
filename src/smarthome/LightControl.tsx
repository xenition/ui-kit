import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Icon } from '../primitives/Icon';
import { Switch } from '../primitives/Switch';
import { Slider } from '../primitives/Slider';

export interface LightControlProps {
  /** Light display name (e.g. "Kitchen Ceiling"). */
  name: string;
  /** Whether the light is on. Controls slider availability. */
  on?: boolean;
  /** Brightness 0–100. */
  brightness?: number;
  /** Color temperature 0–100 (0 = warm, 100 = cool). Omit to hide the row. */
  colorTemp?: number;
  /** Device is unreachable — disables all controls. */
  offline?: boolean;
  /** Fires with the requested on/off value. */
  onToggle?: (next: boolean) => void;
  /** Fires with the new brightness (0–100). */
  onBrightnessChange?: (value: number) => void;
  /** Fires with the new color temperature (0–100). */
  onColorTempChange?: (value: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Light controller — an on/off {@link Switch} over brightness and (optional)
 * color-temperature {@link Slider}s. The tinted bulb glyph uses the `warn` slot
 * when lit and `muted` when dark (a text `On`/`Off`/`Offline` label carries the
 * state so it never rests on color alone). Sliders are disabled when the light is
 * off or `offline`, and a warm→cool hint (token `text-warn` / `text-primary`)
 * sits under the color-temp track. Guards keep the brightness readout in
 * `[0,100]`. No literal colors.
 */
export const LightControl = React.forwardRef<HTMLDivElement, LightControlProps>(function LightControl(
  { name, on = false, brightness = 0, colorTemp, offline = false, onToggle, onBrightnessChange, onColorTempChange, className, style },
  ref
) {
  const disabled = offline || !on;
  const lit = on && !offline;
  const shownBrightness = Math.round(Math.min(Math.max(brightness, 0), 100));
  const statusLabel = offline ? 'Offline' : on ? 'On' : 'Off';

  return (
    <Card ref={ref} style={style} className={cn(lit ? 'shadow-md' : 'shadow-sm', offline && 'opacity-70', className)}>
      <div className="flex items-center gap-[var(--xen-space-sm)]">
        <span
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-[var(--xen-radius-md)] border bg-surface',
            lit ? 'border-warn' : 'border-border'
          )}
        >
          <Icon glyph="💡" color={lit ? 'warn' : 'muted'} size="lg" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-semibold text-on-surface">{name}</p>
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

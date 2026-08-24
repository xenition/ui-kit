import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Icon, type IconColor } from '../primitives/Icon';
import { Switch } from '../primitives/Switch';
import { Badge, type BadgeTone } from '../primitives/Badge';

/** Power/reachability state of a smart-home device. */
export type DeviceState = 'on' | 'off' | 'unavailable';

export interface DeviceTileProps {
  /** Device display name (e.g. "Living Room Lamp"). */
  name: string;
  /** Leading glyph/emoji (e.g. "💡", "🔌"). */
  icon?: string;
  /** Power/reachability state. `unavailable` disables the toggle. */
  state?: DeviceState;
  /** Secondary line under the name (e.g. "72% brightness", "Offline 2m ago"). */
  subtitle?: string;
  /** Fires with the requested on/off value when the toggle is pressed. */
  onToggle?: (next: boolean) => void;
  /** Fires when the tile body (not the switch) is clicked — opens details. */
  onClick?: () => void;
  /** Show a skeleton-style placeholder instead of live content. */
  loading?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/** Per-state presentation: accent slot + a text label so state never relies on color alone. */
const STATE_META: Record<
  DeviceState,
  { accent: IconColor; border: string; label: string; tone: BadgeTone }
> = {
  on: { accent: 'success', border: 'border-success', label: 'On', tone: 'success' },
  off: { accent: 'muted', border: 'border-muted', label: 'Off', tone: 'muted' },
  unavailable: { accent: 'danger', border: 'border-danger', label: 'Offline', tone: 'danger' },
};

/**
 * A single controllable device tile — a tinted glyph, name + status, and an
 * on/off {@link Switch}. `state` drives the accent slot and a text status label
 * (`on`→success, `off`→muted, `unavailable`→danger) so device status is never
 * conveyed by color alone; `unavailable` disables the switch. Optional `onClick`
 * makes the body open a detail view while the switch stays independently
 * clickable (its click is stopped from bubbling). Token-bound throughout — no
 * literal colors.
 */
export const DeviceTile = React.forwardRef<HTMLDivElement, DeviceTileProps>(function DeviceTile(
  { name, icon = '🔌', state = 'off', subtitle, onToggle, onClick, loading = false, className, style },
  ref
) {
  const meta = STATE_META[state];
  const isOn = state === 'on';
  const disabled = state === 'unavailable';

  if (loading) {
    return (
      <Card ref={ref} style={style} className={className} aria-busy="true">
        <div className="flex flex-col gap-[var(--xen-space-sm)]">
          <div className="h-9 w-9 rounded-[var(--xen-radius-md)] bg-neutral-200" />
          <div className="h-3 w-[70%] rounded-[var(--xen-radius-sm)] bg-neutral-200" />
          <div className="h-2.5 w-[40%] rounded-[var(--xen-radius-sm)] bg-neutral-200" />
        </div>
      </Card>
    );
  }

  const interactive = typeof onClick === 'function';

  return (
    <Card
      ref={ref}
      style={style}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? `${name}, ${meta.label}` : undefined}
      onClick={interactive ? onClick : undefined}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
      className={cn(
        isOn ? 'shadow-md' : 'shadow-sm',
        disabled && 'opacity-70',
        interactive && 'cursor-pointer',
        className
      )}
    >
      <div className="flex items-start gap-[var(--xen-space-sm)]">
        <span
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-[var(--xen-radius-md)] border bg-surface',
            meta.border
          )}
        >
          <Icon glyph={icon} color={isOn ? meta.accent : 'muted'} size="lg" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-semibold text-on-surface">{name}</p>
          {subtitle != null ? <p className="truncate text-xs text-muted">{subtitle}</p> : null}
        </div>
      </div>
      <div className="mt-[var(--xen-space-md)] flex items-center justify-between">
        <Badge tone={meta.tone}>{meta.label}</Badge>
        <span
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <Switch checked={isOn} disabled={disabled} onCheckedChange={onToggle} aria-label={`${name} power`} />
        </span>
      </div>
    </Card>
  );
});

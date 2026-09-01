import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { Switch } from '../primitives/Switch';
import { Badge, type BadgeTone } from '../primitives/Badge';
import type { DeviceTileProps, DeviceState } from './DeviceTile';

/** Drop-in for {@link DeviceTileProps} — same props, the V4 "ambient" design. */
export type DeviceTileV4Props = DeviceTileProps;

const STATE_META: Record<DeviceState, { label: string; tone: BadgeTone }> = {
  on: { label: 'On', tone: 'success' },
  off: { label: 'Off', tone: 'muted' },
  unavailable: { label: 'Offline', tone: 'danger' },
};

/**
 * DeviceTile — **V4** "ambient" design (web parity of the native V4). The
 * control-panel take on a device tile: an **active device glows** — when `on`,
 * the tile takes a soft success-tinted wash, a success border, and a glowing icon
 * disc; `off`/`unavailable` stay calm. A soft status pill + the on/off
 * {@link Switch} keep the meaning readable (status never by color alone). Same
 * props/behavior as {@link DeviceTileProps}; all colors from `--xen-*` token
 * classes (no literals). `loading` shows a skeleton.
 */
export const DeviceTileV4 = React.forwardRef<HTMLDivElement, DeviceTileV4Props>(function DeviceTileV4(
  { name, icon = '🔌', state = 'off', subtitle, onToggle, onClick, loading = false, className, style },
  ref
) {
  const meta = STATE_META[state];
  const isOn = state === 'on';
  const disabled = state === 'unavailable';

  const shell = cn(
    'rounded-[var(--xen-radius-lg)] border p-[var(--xen-space-md)]',
    isOn ? 'border-success/50 bg-success/[0.08] shadow-md' : 'border-border bg-surface shadow-sm',
    disabled && 'opacity-70'
  );

  if (loading) {
    return (
      <div ref={ref} style={style} aria-busy="true" className={cn(shell, className)}>
        <div className="flex flex-col gap-[var(--xen-space-sm)]">
          <div className="h-11 w-11 rounded-[var(--xen-radius-md)] bg-on-surface/10" />
          <div className="h-3 w-[70%] rounded-[var(--xen-radius-sm)] bg-on-surface/10" />
          <div className="h-2.5 w-[40%] rounded-[var(--xen-radius-sm)] bg-on-surface/10" />
        </div>
      </div>
    );
  }

  const interactive = typeof onClick === 'function';

  return (
    <div
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
      className={cn(shell, interactive && 'cursor-pointer', className)}
    >
      <div className="flex items-start gap-[var(--xen-space-sm)]">
        {/* Glowing icon disc — the ambient signature. */}
        <span
          className={cn(
            'flex h-11 w-11 items-center justify-center rounded-[var(--xen-radius-md)] border',
            isOn ? 'border-success/40 bg-success/15' : 'border-border bg-on-surface/5'
          )}
        >
          <Icon glyph={icon} color={isOn ? 'success' : 'muted'} size="lg" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-bold text-on-surface">{name}</p>
          {subtitle != null ? <p className="truncate text-xs text-muted">{subtitle}</p> : null}
        </div>
      </div>
      <div className="mt-[var(--xen-space-md)] flex items-center justify-between">
        <Badge tone={meta.tone} variant="soft">
          {meta.label}
        </Badge>
        <span onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
          <Switch checked={isOn} disabled={disabled} onCheckedChange={onToggle} aria-label={`${name} power`} />
        </span>
      </div>
    </div>
  );
});

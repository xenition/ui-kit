import * as React from 'react';
import { cn } from '../primitives/cn';
import { Switch } from '../primitives/Switch';
import type { DeviceTileProps, DeviceState } from './DeviceTile';

/** Same public contract as {@link DeviceTile} — a drop-in alternate design. */
export type DeviceTileV2Props = DeviceTileProps;

const DISC: Record<DeviceState, string> = {
  on: 'bg-primary/15 text-primary',
  off: 'bg-neutral-100 text-muted',
  unavailable: 'bg-neutral-100 text-muted',
};

/**
 * DeviceTile, redesigned (v2): a **big square control tile**. The icon rides in a
 * large state-tinted disc up top, the name + subtitle sit beneath, and the Switch
 * anchors the bottom — an on device tints the whole tile. Distinct from v1's row.
 * Same props, token-only.
 */
export const DeviceTileV2 = React.forwardRef<HTMLDivElement, DeviceTileV2Props>(function DeviceTileV2(
  { name, icon = '🔌', state = 'off', subtitle, onToggle, onClick, loading = false, className, style },
  ref
) {
  const unavailable = state === 'unavailable';
  const on = state === 'on';
  const interactive = typeof onClick === 'function';

  if (loading) {
    return <div ref={ref} data-xen-device-tile="" aria-label="Loading device" style={style} className={cn('h-32 animate-pulse rounded-lg bg-neutral-100', className)} />;
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (interactive && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <div
      ref={ref}
      data-xen-device-tile=""
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={`${name}, ${state}`}
      onClick={interactive ? () => onClick?.() : undefined}
      onKeyDown={interactive ? handleKeyDown : undefined}
      style={style}
      className={cn(
        'flex h-32 flex-col justify-between rounded-lg p-3 shadow-sm transition-colors',
        on ? 'bg-primary/10' : 'bg-surface',
        interactive && 'cursor-pointer',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <span className={cn('flex h-11 w-11 items-center justify-center rounded-full text-xl', DISC[state])}>{icon}</span>
        <span onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
          <Switch
            checked={on}
            disabled={unavailable}
            aria-label={`Toggle ${name}`}
            onCheckedChange={(next) => onToggle?.(next)}
          />
        </span>
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-on-surface">{name}</p>
        {subtitle ? <p className="truncate text-xs text-muted">{subtitle}</p> : null}
      </div>
    </div>
  );
});

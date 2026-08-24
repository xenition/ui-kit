import * as React from 'react';
import { cn } from '../primitives/cn';
import { Switch } from '../primitives/Switch';
import type { DeviceTileProps, DeviceState } from './DeviceTile';

/** Same public contract as {@link DeviceTile} — a drop-in alternate design. */
export type DeviceTileV3Props = DeviceTileProps;

const DOT: Record<DeviceState, string> = { on: 'bg-primary', off: 'bg-neutral-300', unavailable: 'bg-neutral-300' };

/**
 * DeviceTile, redesigned (v3): a **dense device row**. A leading icon with a small
 * state dot, the name + subtitle inline, and the Switch pinned right — hairline-
 * bordered for a long device list. The opposite of v2's square tile. Same props,
 * token-only.
 */
export const DeviceTileV3 = React.forwardRef<HTMLDivElement, DeviceTileV3Props>(function DeviceTileV3(
  { name, icon = '🔌', state = 'off', subtitle, onToggle, onClick, loading = false, className, style },
  ref
) {
  const unavailable = state === 'unavailable';
  const on = state === 'on';
  const interactive = typeof onClick === 'function';

  if (loading) {
    return <div ref={ref} data-xen-device-tile="" aria-label="Loading device" style={style} className={cn('flex items-center gap-3 border-b border-border py-2.5', className)}><div className="h-3 w-2/5 animate-pulse rounded-sm bg-neutral-100" /></div>;
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
      className={cn('flex items-center gap-3 border-b border-border py-2.5', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className)}
    >
      <span className="relative text-lg leading-none">
        {icon}
        <span className={cn('absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full', DOT[state])} aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-on-surface">{name}</p>
        {subtitle ? <p className="truncate text-xs text-muted">{subtitle}</p> : null}
      </div>
      <span onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
        <Switch
          checked={on}
          disabled={unavailable}
          aria-label={`Toggle ${name}`}
          onCheckedChange={(next) => onToggle?.(next)}
        />
      </span>
    </div>
  );
});

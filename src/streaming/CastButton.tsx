import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, type IconSize } from '../primitives';

export type CastButtonVariant = 'icon' | 'labeled';
export type CastButtonSize = 'sm' | 'md' | 'lg';

export interface CastButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'> {
  /** Whether a cast/AirPlay target is currently connected (controlled). */
  connected?: boolean;
  /** Name of the connected device, shown in the `labeled` variant. */
  deviceName?: string;
  /**
   * - `icon`    — a single clickable cast glyph (default).
   * - `labeled` — glyph + "Cast" / device-name text.
   */
  variant?: CastButtonVariant;
  size?: CastButtonSize;
}

const GLYPH_SIZE: Record<CastButtonSize, IconSize> = {
  sm: 'sm',
  md: 'base',
  lg: 'lg',
};

/**
 * A cast / AirPlay toggle (web) — a `<button>` shell that reports clicks via
 * `onClick` and reflects the current `connected` state in its color and
 * accessible label ("Cast to a device" vs. "Casting to <device>. Disconnect").
 * No native cast dependency; wire an app's cast framework to `onClick`.
 * Token-only: the active (connected) tint is `primary`, idle is `on-surface`.
 */
export const CastButton = React.forwardRef<HTMLButtonElement, CastButtonProps>(function CastButton(
  { connected = false, deviceName, variant = 'icon', size = 'md', disabled, className, ...rest },
  ref
) {
  const tint = connected ? 'primary' : 'onSurface';
  const label = connected
    ? `Casting${deviceName ? ` to ${deviceName}` : ''}. Disconnect`
    : 'Cast to a device';

  return (
    <button
      ref={ref}
      type="button"
      data-xen-cast-button=""
      aria-label={label}
      aria-pressed={connected}
      disabled={disabled}
      className={cn(
        'inline-flex items-center gap-[var(--xen-space-xs)] bg-transparent',
        'transition-opacity hover:opacity-70',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        'disabled:pointer-events-none disabled:opacity-40',
        connected ? 'text-primary' : 'text-on-surface',
        className
      )}
      {...rest}
    >
      <Icon glyph={connected ? '📲' : '🔗'} size={GLYPH_SIZE[size]} color={tint} />
      {variant === 'labeled' ? (
        <span className="text-sm font-semibold">
          {connected && deviceName ? deviceName : 'Cast'}
        </span>
      ) : null}
    </button>
  );
});

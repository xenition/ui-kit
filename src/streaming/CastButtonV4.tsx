import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, type IconSize } from '../primitives';
import type { CastButtonProps, CastButtonSize, CastButtonVariant } from './CastButton';

export type { CastButtonSize, CastButtonVariant };

/** Drop-in for {@link CastButtonProps} — same props, the V4 "spotlight" design. */
export type CastButtonV4Props = CastButtonProps;

const GLYPH_SIZE: Record<CastButtonSize, IconSize> = {
  sm: 'sm',
  md: 'base',
  lg: 'lg',
};

/**
 * CastButton — **V4** "spotlight" design (web parity of the native V4). A
 * polished cast control: the glyph (plus a "Cast" / device-name label in the
 * `labeled` variant) sits in a ≥44px rounded tap target that lights up with a
 * soft `bg-primary/10` tint and a `primary` accent when **connected**, staying
 * plain otherwise. Keeps the base's variants (`icon` / `labeled`) and sizes,
 * and reports clicks via `onClick`. The `connected` state is reflected in the
 * color, `aria-pressed`, and accessible label ("Cast to a device" vs. "Casting
 * to <device>. Disconnect"). Token-only colors via `--xen-*` — no literal hex.
 */
export const CastButtonV4 = React.forwardRef<HTMLButtonElement, CastButtonV4Props>(function CastButtonV4(
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
        // ≥44px rounded tap target with 8-pt padding.
        'inline-flex min-h-[44px] items-center justify-center gap-[var(--xen-space-xs)]',
        'rounded-[var(--xen-radius-md)] px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]',
        'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        'disabled:pointer-events-none disabled:opacity-40',
        // V4 spotlight: soft-primary tint + accent when connected, plain otherwise.
        connected ? 'bg-primary/10 text-primary' : 'bg-transparent text-on-surface hover:opacity-70',
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

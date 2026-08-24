import * as React from 'react';
import { cn } from './cn';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarShape = 'circle' | 'rounded' | 'square';
export type AvatarStatus = 'online' | 'away' | 'busy' | 'offline';

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  alt?: string;
  /** Fallback initials source when there's no image. */
  name?: string;
  size?: AvatarSize;
  /** Corner treatment. Defaults to `circle`. */
  shape?: AvatarShape;
  /** Presence indicator dot at the bottom-right. */
  status?: AvatarStatus;
  /** Draw a colored ring (status-colored when a `status` is set). */
  ring?: boolean;
}

const SIZE: Record<AvatarSize, string> = {
  xs: 'h-6 w-6 text-xs',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-lg',
  xl: 'h-[72px] w-[72px] text-xl',
};

/** Box dimensions only (for the positioning wrapper when a status dot is shown). */
const BOX: Record<AvatarSize, string> = {
  xs: 'h-6 w-6',
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-14 w-14',
  xl: 'h-[72px] w-[72px]',
};

const SHAPE: Record<AvatarShape, string> = {
  circle: 'rounded-full',
  rounded: 'rounded-[var(--xen-radius-md)]',
  square: 'rounded-[var(--xen-radius-sm)]',
};

const STATUS_DOT_COLOR: Record<AvatarStatus, string> = {
  online: 'bg-success',
  away: 'bg-warn',
  busy: 'bg-danger',
  offline: 'bg-muted',
};

const STATUS_RING_COLOR: Record<AvatarStatus, string> = {
  online: 'ring-success',
  away: 'ring-warn',
  busy: 'ring-danger',
  offline: 'ring-muted',
};

const DOT_SIZE: Record<AvatarSize, string> = {
  xs: 'h-2 w-2',
  sm: 'h-2.5 w-2.5',
  md: 'h-3 w-3',
  lg: 'h-3.5 w-3.5',
  xl: 'h-4 w-4',
};

function initials(name?: string): string {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((w) => w[0]?.toUpperCase() ?? '').join('') || '?';
}

/**
 * User avatar — image with an initials fallback, bound to the theme tokens. The
 * default (`md`, `circle`, no status, no ring) renders exactly as before; the
 * extended `xs`/`xl` sizes, `shape`, a `status` presence dot, and a `ring` are
 * additive opt-ins mirroring the native `Avatar`. No literal colors.
 */
export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { className, src, alt, name, size = 'md', shape = 'circle', status, ring = false, ...rest },
  ref
) {
  const inner = src ? (
    <img src={src} alt={alt ?? name ?? ''} className="h-full w-full object-cover" />
  ) : (
    <span>{initials(name)}</span>
  );

  // No status: keep the historical single-span structure (a status dot would be
  // clipped by `overflow-hidden`, so it opts into a positioning wrapper below).
  if (!status) {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex shrink-0 items-center justify-center overflow-hidden',
          'bg-primary-50 font-medium text-primary',
          SHAPE[shape],
          SIZE[size],
          ring && 'ring-2 ring-primary',
          className
        )}
        {...rest}
      >
        {inner}
      </span>
    );
  }

  return (
    <span
      ref={ref}
      className={cn('relative inline-flex shrink-0', BOX[size], className)}
      {...rest}
    >
      <span
        className={cn(
          'inline-flex h-full w-full items-center justify-center overflow-hidden',
          'bg-primary-50 font-medium text-primary',
          SHAPE[shape],
          SIZE[size],
          ring && cn('ring-2', STATUS_RING_COLOR[status])
        )}
      >
        {inner}
      </span>
      <span
        aria-hidden
        className={cn(
          'absolute bottom-0 right-0 rounded-full border-2 border-surface',
          DOT_SIZE[size],
          STATUS_DOT_COLOR[status]
        )}
      />
    </span>
  );
});

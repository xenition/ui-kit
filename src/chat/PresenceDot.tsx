import * as React from 'react';
import { cn } from '../primitives/cn';
import { StatusDot } from '../primitives';

/** Presence states a user can be in. */
export type Presence = 'online' | 'away' | 'busy' | 'offline';

export interface PresenceDotProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'> {
  /** Current presence state (default `offline`). */
  status?: Presence;
  /** Dot diameter in px (default 10). */
  size?: number;
  /**
   * Draw a contrasting ring around the dot so it reads when overlaid on an
   * avatar (default true).
   */
  ring?: boolean;
  /**
   * Accessible name. When omitted a sensible default is derived from `status`
   * (e.g. "Online"). Pass an empty string to make it decorative.
   */
  label?: string;
}

/** Maps a presence state to its semantic background token class. */
const TONE_CLASS: Record<Presence, string> = {
  online: 'bg-success',
  away: 'bg-warn',
  busy: 'bg-danger',
  offline: 'bg-muted',
};

const DEFAULT_LABEL: Record<Presence, string> = {
  online: 'Online',
  away: 'Away',
  busy: 'Busy',
  offline: 'Offline',
};

/**
 * Small presence indicator for avatars and headers. Online pulses (reusing the
 * primitive `StatusDot` echo); the other states render a solid token-colored
 * dot. A `ring` in the surface color separates it from a busy avatar. No literal
 * colors — every color traces to a semantic token.
 */
export const PresenceDot = React.forwardRef<HTMLSpanElement, PresenceDotProps>(function PresenceDot(
  { status = 'offline', size = 10, ring = true, label, className, style, ...rest },
  ref
) {
  const a11yLabel = label ?? DEFAULT_LABEL[status];
  const decorative = a11yLabel === '';

  const ringPad = ring ? 2 : 0;
  const outer = size + ringPad * 2;

  return (
    <span
      ref={ref}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : a11yLabel}
      aria-hidden={decorative || undefined}
      className={cn('inline-flex items-center justify-center rounded-full', ring && 'bg-surface', className)}
      style={{ width: outer, height: outer, ...style }}
      {...rest}
    >
      {status === 'online' ? (
        <StatusDot tone="success" pulse />
      ) : (
        <span
          className={cn('rounded-full', TONE_CLASS[status])}
          style={{ width: size, height: size }}
        />
      )}
    </span>
  );
});

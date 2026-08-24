import * as React from 'react';
import { cn } from '../primitives/cn';
import type { IconColor } from '../primitives/Icon';

/** Connection health of the network. */
export type NetworkStatus = 'connected' | 'congested' | 'disconnected';

export type NetworkBadgeSize = 'sm' | 'md';

export interface NetworkBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Chain / network name (e.g. `Ethereum`, `Polygon`, `Arbitrum`). */
  name: string;
  /**
   * Connection health. Drives the health-dot color AND a text label so the
   * status is never conveyed by color alone.
   */
  status?: NetworkStatus;
  /**
   * Accent slot for the identity dot (default `primary`). Independent of
   * `status`, which only colors the health indicator.
   */
  tone?: IconColor;
  /** Leading glyph/emoji for the chain (e.g. `'⟠'`). */
  glyph?: string;
  size?: NetworkBadgeSize;
}

const STATUS_TEXT: Record<NetworkStatus, string> = {
  connected: 'text-success',
  congested: 'text-warn',
  disconnected: 'text-danger',
};

const STATUS_BG: Record<NetworkStatus, string> = {
  connected: 'bg-success',
  congested: 'bg-warn',
  disconnected: 'bg-danger',
};

const STATUS_LABEL: Record<NetworkStatus, string> = {
  connected: 'Connected',
  congested: 'Congested',
  disconnected: 'Offline',
};

const TONE_TEXT: Record<IconColor, string> = {
  onSurface: 'text-on-surface',
  onPrimary: 'text-on-primary',
  primary: 'text-primary',
  muted: 'text-muted',
  success: 'text-success',
  onSuccess: 'text-on-success',
  warn: 'text-warn',
  onWarn: 'text-on-warn',
  danger: 'text-danger',
  onDanger: 'text-on-danger',
};

const TONE_BG: Record<IconColor, string> = {
  onSurface: 'bg-on-surface',
  onPrimary: 'bg-on-primary',
  primary: 'bg-primary',
  muted: 'bg-muted',
  success: 'bg-success',
  onSuccess: 'bg-on-success',
  warn: 'bg-warn',
  onWarn: 'bg-on-warn',
  danger: 'bg-danger',
  onDanger: 'bg-on-danger',
};

/**
 * Compact chain identifier pill — a dot (accented by `tone`) or leading glyph
 * plus the network name, and, when `status` is set, a second health dot with a
 * text label so the connection state is read, not just colored. Token-bound
 * throughout; no literal colors. Web parity of the native `NetworkBadge`.
 */
export const NetworkBadge = React.forwardRef<HTMLSpanElement, NetworkBadgeProps>(
  function NetworkBadge(
    { name, status, tone = 'primary', glyph, size = 'md', className, ...rest },
    ref
  ) {
    const textSize = size === 'sm' ? 'text-xs' : 'text-sm';
    const dot = size === 'sm' ? 'h-1.5 w-1.5' : 'h-2 w-2';
    const statusLabel = status ? STATUS_LABEL[status] : undefined;

    return (
      <span
        ref={ref}
        aria-label={statusLabel ? `${name}, ${statusLabel}` : name}
        className={cn(
          'inline-flex items-center gap-1 self-start rounded-full border border-border bg-neutral-100 px-2 py-0.5',
          className
        )}
        {...rest}
      >
        {glyph != null ? (
          <span aria-hidden="true" className={cn(textSize, TONE_TEXT[tone])}>
            {glyph}
          </span>
        ) : (
          <span aria-hidden="true" className={cn('inline-block rounded-full', dot, TONE_BG[tone])} />
        )}
        <span className={cn('truncate font-semibold text-on-surface', textSize)}>{name}</span>
        {status != null ? (
          <span className="inline-flex items-center gap-1">
            <span
              aria-hidden="true"
              className={cn('inline-block rounded-full', dot, STATUS_BG[status])}
            />
            <span className={cn('text-xs', STATUS_TEXT[status])}>{statusLabel}</span>
          </span>
        ) : null}
      </span>
    );
  }
);

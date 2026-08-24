import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, Badge, Button, Rating } from '../primitives';

/** Presentation density for a {@link DriverCard}. */
export type DriverCardVariant = 'default' | 'compact' | 'assigned';

export interface DriverCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Driver display name. */
  name: string;
  /** Optional driver avatar URL. */
  avatarUrl?: string;
  /** Driver star rating (0–5). */
  rating?: number;
  /** Number of completed trips. */
  tripCount?: number;
  /** Vehicle description, e.g. `'Toyota Prius · White'`. */
  vehicle?: string;
  /** License plate, shown as a token-chip. */
  plate?: string;
  /** ETA to pickup, pre-formatted (e.g. `'4 min'`). */
  etaLabel?: string;
  /** Whether the driver is currently online/available. */
  online?: boolean;
  /** Presentation variant. `assigned` foregrounds the ETA. */
  variant?: DriverCardVariant;
  /** Fires when the message action is pressed. */
  onMessage?: () => void;
  /** Fires when the call action is pressed. */
  onCall?: () => void;
  /** Fires when the whole card is pressed (profile). */
  onClick?: () => void;
  /** Placeholder skeleton while the driver loads. */
  loading?: boolean;
}

/**
 * A driver identity block — avatar, name, star rating, trip count, the assigned
 * vehicle and plate, an online/offline state, and an optional ETA. Availability
 * is conveyed by a text-labelled badge (not color alone). Data +
 * `onMessage`/`onCall`/`onClick` callbacks only; nothing fetches. Colors come
 * from `--xen-*` token classes — no literal colors. When `onClick` is set the
 * card becomes a keyboard-operable `role="button"`; the nested actions are real
 * buttons that stop propagation. `variant="assigned"` highlights the ETA;
 * `variant="compact"` tightens it. Web parity of the native `DriverCard`.
 */
export const DriverCard = React.forwardRef<HTMLDivElement, DriverCardProps>(function DriverCard(
  {
    name,
    avatarUrl,
    rating,
    tripCount,
    vehicle,
    plate,
    etaLabel,
    online,
    variant = 'default',
    onMessage,
    onCall,
    onClick,
    loading = false,
    className,
    ...rest
  },
  ref
) {
  const compact = variant === 'compact';
  const assigned = variant === 'assigned';
  const pad = compact ? 'p-[var(--xen-space-md)]' : 'p-[var(--xen-space-lg)]';

  if (loading) {
    return (
      <div
        ref={ref}
        data-xen-driver-card=""
        aria-busy="true"
        aria-label="Loading driver"
        className={cn(
          'flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface',
          pad,
          className
        )}
        {...rest}
      >
        <div className="h-11 w-11 shrink-0 animate-pulse rounded-full bg-neutral-200" />
        <div className="flex flex-1 flex-col gap-[var(--xen-space-xs)]">
          <div className="h-4 w-1/2 animate-pulse rounded bg-neutral-200" />
          <div className="h-3 w-[70%] animate-pulse rounded bg-neutral-100" />
        </div>
      </div>
    );
  }

  const statusWord = online === undefined ? undefined : online ? 'Online' : 'Offline';
  const a11y = `Driver ${name}${typeof rating === 'number' ? `, rated ${rating} stars` : ''}${
    vehicle ? `, ${vehicle}` : ''
  }${etaLabel ? `, ETA ${etaLabel}` : ''}${statusWord ? `, ${statusWord}` : ''}`;

  const interactive = Boolean(onClick);

  const body = (
    <>
      <div className="flex items-center gap-[var(--xen-space-sm)]">
        <Avatar src={avatarUrl} name={name} size={compact ? 'sm' : 'lg'} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-[var(--xen-space-xs)]">
            <span className="min-w-0 shrink truncate text-base font-bold text-on-surface">{name}</span>
            {statusWord ? <Badge tone={online ? 'success' : 'neutral'}>{statusWord}</Badge> : null}
          </div>
          <div className="flex flex-wrap items-center gap-[var(--xen-space-sm)]">
            {typeof rating === 'number' ? <Rating value={rating} size="sm" showValue /> : null}
            {typeof tripCount === 'number' ? (
              <span className="text-xs text-muted">{tripCount.toLocaleString()} trips</span>
            ) : null}
          </div>
        </div>
        {assigned && etaLabel ? (
          <div className="flex flex-col items-end">
            <span className="text-lg font-bold text-primary">{etaLabel}</span>
            <span className="text-xs text-muted">ETA</span>
          </div>
        ) : null}
      </div>

      {vehicle || plate ? (
        <div className="flex flex-wrap items-center gap-[var(--xen-space-sm)]">
          {vehicle ? (
            <span className="min-w-0 shrink truncate text-sm text-muted">🚗 {vehicle}</span>
          ) : null}
          {plate ? (
            <span className="rounded-[var(--xen-radius-sm)] border border-border bg-neutral-100 px-[var(--xen-space-xs)] py-0.5 text-xs font-bold tracking-widest text-on-surface">
              {plate}
            </span>
          ) : null}
          {!assigned && etaLabel ? (
            <span className="text-xs font-semibold text-primary">· ETA {etaLabel}</span>
          ) : null}
        </div>
      ) : null}

      {onMessage || onCall ? (
        <div className="flex gap-[var(--xen-space-sm)]">
          {onMessage ? (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onMessage();
              }}
              aria-label={`Message ${name}`}
              className="flex-1"
            >
              Message
            </Button>
          ) : null}
          {onCall ? (
            <Button
              variant="secondary"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onCall();
              }}
              aria-label={`Call ${name}`}
              className="flex-1"
            >
              Call
            </Button>
          ) : null}
        </div>
      ) : null}
    </>
  );

  const rootClass = cn(
    'flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface',
    compact && 'gap-[var(--xen-space-sm)]',
    pad,
    interactive && 'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
    className
  );

  if (!interactive) {
    return (
      <div ref={ref} data-xen-driver-card="" aria-label={a11y} className={rootClass} {...rest}>
        {body}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      data-xen-driver-card=""
      role="button"
      tabIndex={0}
      aria-label={a11y}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={rootClass}
      {...rest}
    >
      {body}
    </div>
  );
});

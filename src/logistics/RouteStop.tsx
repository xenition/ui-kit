import * as React from 'react';
import { cn } from '../primitives/cn';
import {
  STOP_META,
  TONE_TEXT,
  TONE_BG,
  TONE_ON_TEXT,
  TONE_BORDER,
  pressableProps,
  type StopStatus,
} from './internal';

export interface RouteStopProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** 1-based stop sequence number shown in the marker. */
  sequence: number;
  /** Address / place name (headline). */
  address: string;
  /** Recipient / customer or note sub-line. */
  recipient?: string;
  /** Stop status — glyph + word, never color alone. */
  status: StopStatus;
  /** Human ETA / window (e.g. `9:00–9:30 AM`). */
  eta?: string;
  /** Number of packages to drop at this stop. */
  packages?: number;
  /** Draws the connector line down to the next stop (false for the last). */
  connected?: boolean;
  /** Makes the stop clickable. */
  onClick?: () => void;
}

/**
 * One stop on a delivery route: a numbered sequence marker joined by a
 * connector rail, the address + recipient, an ETA/window and a package count.
 * The stop status is carried by a glyph + word chip (tone as reinforcement),
 * and the marker fills with the status tone once the stop is completed. All
 * colors are theme tokens. Web parity of the native `RouteStop`.
 */
export const RouteStop = React.forwardRef<HTMLDivElement, RouteStopProps>(function RouteStop(
  { sequence, address, recipient, status, eta, packages, connected = true, onClick, className, ...rest },
  ref
) {
  const meta = STOP_META[status] ?? STOP_META.pending;
  const done = status === 'completed';
  const interactive = pressableProps(onClick);

  return (
    <div
      ref={ref}
      aria-label={interactive ? `Stop ${sequence}, ${address}, ${meta.label}` : undefined}
      className={cn(
        'flex gap-[var(--xen-space-md)]',
        interactive &&
          'cursor-pointer rounded-[var(--xen-radius-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...interactive}
      {...rest}
    >
      <div className="flex flex-col items-center">
        <span
          aria-hidden="true"
          className={cn(
            'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold',
            done
              ? cn(TONE_BG[meta.tone], TONE_ON_TEXT[meta.tone])
              : cn('border-2 bg-transparent', TONE_BORDER[meta.tone], TONE_TEXT[meta.tone])
          )}
        >
          {done ? '✓' : sequence}
        </span>
        {connected ? <span className="mt-0.5 w-0.5 flex-1 bg-border" /> : null}
      </div>

      <div className={cn('flex min-w-0 flex-1 flex-col', connected && 'pb-[var(--xen-space-md)]')}>
        <div className="flex items-center justify-between gap-[var(--xen-space-sm)]">
          <span className="min-w-0 flex-1 truncate text-sm font-semibold text-on-surface">{address}</span>
          {eta ? <span className="text-xs text-muted">{eta}</span> : null}
        </div>
        {recipient ? <span className="truncate text-xs text-muted">{recipient}</span> : null}
        <div className="flex items-center gap-[var(--xen-space-xs)]">
          <span aria-hidden="true" className={cn('text-xs', TONE_TEXT[meta.tone])}>
            {meta.glyph}
          </span>
          <span className={cn('text-xs font-semibold', TONE_TEXT[meta.tone])}>{meta.label}</span>
          {packages != null ? <span className="text-xs text-muted">{`· ${packages} pkg`}</span> : null}
        </div>
      </div>
    </div>
  );
});

import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives/Badge';
import {
  STOP_META,
  TONE_TEXT,
  TONE_BG,
  TONE_ON_TEXT,
  TONE_BORDER,
  pressableProps,
} from './internal';
import type { RouteStopProps } from './RouteStop';

/** V4 layout choices for the "dispatch" design. */
export type RouteStopLayout = 'full' | 'compact';

/** Drop-in for {@link RouteStopProps} — same props, the V4 "dispatch" design. */
export interface RouteStopV4Props extends RouteStopProps {
  /** V4 layout: `full` (card with a numbered marker, default) or `compact` (dense single row). */
  variant?: RouteStopLayout;
}

/**
 * RouteStop — **V4** "dispatch" design (web parity of the native V4). The
 * confident, operations-desk take on a delivery-route stop: an elevated rounded
 * card with a soft shadow, a numbered sequence marker (filled with the status
 * tone once completed), the address + recipient, an ETA/window, a package count,
 * and a labelled glyph + word status badge (never color alone). Clickable when
 * `onClick` is set. Honors the V4 `variant` — `full` (card, default) and
 * `compact` (a dense single row) — identical props/behavior to
 * {@link RouteStopProps}. All colors from `--xen-*` token classes (no literals).
 */
export const RouteStopV4 = React.forwardRef<HTMLDivElement, RouteStopV4Props>(function RouteStopV4(
  { sequence, address, recipient, status, eta, packages, connected, variant = 'full', onClick, className, ...rest },
  ref
) {
  const meta = STOP_META[status] ?? STOP_META.pending;
  const done = status === 'completed';
  const interactive = pressableProps(onClick);
  const shell = 'rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm';
  const a11y = `Stop ${sequence}, ${address}, ${meta.label}`;

  const marker = (size: string, text: string) => (
    <span
      aria-hidden="true"
      className={cn(
        'flex shrink-0 items-center justify-center rounded-full font-bold tabular-nums',
        size,
        text,
        done
          ? cn(TONE_BG[meta.tone], TONE_ON_TEXT[meta.tone])
          : cn('border-2 bg-transparent', TONE_BORDER[meta.tone], TONE_TEXT[meta.tone])
      )}
    >
      {done ? '✓' : sequence}
    </span>
  );

  const statusBadge = (
    <Badge tone={meta.tone} variant="soft" size="sm">
      <span aria-hidden="true">{meta.glyph}</span> {meta.label}
    </Badge>
  );

  // ── compact: dense single row ──
  if (variant === 'compact') {
    return (
      <div
        ref={ref}
        data-xen-route-stop=""
        aria-label={interactive ? a11y : undefined}
        className={cn(
          shell,
          'flex min-h-[44px] items-center gap-[var(--xen-space-sm)] px-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
          interactive &&
            'cursor-pointer transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
          className
        )}
        {...interactive}
        {...rest}
      >
        {marker('h-6 w-6 text-xs', 'text-xs')}
        <span className="min-w-0 flex-1 truncate text-sm font-semibold text-on-surface">{address}</span>
        {eta ? <span className="whitespace-nowrap text-xs tabular-nums text-muted">{eta}</span> : null}
        {statusBadge}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      data-xen-route-stop=""
      aria-label={interactive ? a11y : undefined}
      className={cn(
        shell,
        'flex items-center gap-[var(--xen-space-md)] p-[var(--xen-space-md)]',
        interactive &&
          'cursor-pointer transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...interactive}
      {...rest}
    >
      {marker('h-9 w-9 text-sm', 'text-sm')}

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <div className="flex items-center justify-between gap-[var(--xen-space-sm)]">
          <span className="min-w-0 flex-1 truncate text-base font-semibold text-on-surface">{address}</span>
          {eta ? <span className="whitespace-nowrap text-xs tabular-nums text-muted">{eta}</span> : null}
        </div>
        {recipient ? <span className="truncate text-xs text-muted">{recipient}</span> : null}
        <div className="mt-0.5 flex items-center gap-[var(--xen-space-sm)]">
          {statusBadge}
          {packages != null ? <span className="text-xs text-muted">{`${packages} pkg`}</span> : null}
        </div>
      </div>
    </div>
  );
});

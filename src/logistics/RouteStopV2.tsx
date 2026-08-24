import * as React from 'react';
import { cn } from '../primitives/cn';
import {
  STOP_META,
  TONE_TEXT,
  TONE_BG,
  TONE_ON_TEXT,
  TONE_BORDER,
  TONE_SOFT_BG,
  TONE_SOFT_STRONG_BG,
  pressableProps,
} from './internal';
import type { RouteStopProps } from './RouteStop';

/** Drop-in for {@link RouteStop}: identical props, a distinct design. */
export type RouteStopV2Props = RouteStopProps;

/**
 * RouteStop, alternate design **V2** — a *numbered node card*. Where the classic
 * is a bare rail row, V2 is a shadowed card: a big tone-filled numbered node
 * hangs on the left edge, the address is the headline, the delivery window sits
 * in its own pill, and a status glyph + word chip plus a package count anchor the
 * footer. `connected` still draws a rail down to the next card. Completed fills
 * the node and marks it `✓`; status is always glyph + word (tone reinforces
 * only). Same props. No literal colors.
 */
export const RouteStopV2 = React.forwardRef<HTMLDivElement, RouteStopV2Props>(function RouteStopV2(
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
          'cursor-pointer rounded-[var(--xen-radius-lg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...interactive}
      {...rest}
    >
      <div className="flex flex-col items-center">
        <span
          aria-hidden="true"
          className={cn(
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold',
            done
              ? cn(TONE_BG[meta.tone], TONE_ON_TEXT[meta.tone])
              : cn('border-2', TONE_BORDER[meta.tone], TONE_TEXT[meta.tone], TONE_SOFT_BG[meta.tone])
          )}
        >
          {done ? '✓' : sequence}
        </span>
        {connected ? <span className="mt-[var(--xen-space-xs)] w-0.5 flex-1 bg-border" /> : null}
      </div>

      <div className="flex flex-1 flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] bg-surface p-[var(--xen-space-md)] shadow-sm">
        <div className="flex items-start justify-between gap-[var(--xen-space-sm)]">
          <span className="min-w-0 flex-1 text-base font-bold text-on-surface">{address}</span>
          {eta ? (
            <span className="shrink-0 rounded-full bg-neutral-100 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)] text-xs font-semibold text-on-surface">
              {eta}
            </span>
          ) : null}
        </div>

        {recipient ? <span className="truncate text-xs text-muted">{recipient}</span> : null}

        <div className="flex items-center gap-[var(--xen-space-sm)]">
          <span
            className={cn(
              'inline-flex items-center gap-[var(--xen-space-xs)] rounded-full px-[var(--xen-space-sm)] py-[var(--xen-space-xs)] text-xs font-bold',
              TONE_SOFT_STRONG_BG[meta.tone],
              TONE_TEXT[meta.tone]
            )}
          >
            <span aria-hidden="true">{meta.glyph}</span>
            {meta.label}
          </span>
          {packages != null ? (
            <span className="text-xs text-muted">{`${packages} ${packages === 1 ? 'pkg' : 'pkgs'}`}</span>
          ) : null}
        </div>
      </div>
    </div>
  );
});

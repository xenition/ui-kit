import * as React from 'react';
import { cn } from '../primitives/cn';
import { STOP_META, TONE_TEXT, TONE_BG, TONE_ON_TEXT, TONE_BORDER, pressableProps } from './internal';
import type { RouteStopProps } from './RouteStop';

/** Drop-in for {@link RouteStop}: identical props, a distinct design. */
export type RouteStopV3Props = RouteStopProps;

/**
 * RouteStop, alternate design **V3** — a *dense single line*. A small
 * tone-outlined sequence chip, the address (with a muted status + recipient/pkg
 * meta segment beneath), then the window right-aligned — one compact row with a
 * bottom divider, tuned for a long manifest list. No rail, no card: the inverse
 * of V2's node card. Completed marks the chip `✓`; status stays glyph + word
 * (tone reinforces). Same props. No literal colors.
 */
export const RouteStopV3 = React.forwardRef<HTMLDivElement, RouteStopV3Props>(function RouteStopV3(
  {
    sequence,
    address,
    recipient,
    status,
    eta,
    packages,
    connected: _connected = true,
    onClick,
    className,
    ...rest
  },
  ref
) {
  const meta = STOP_META[status] ?? STOP_META.pending;
  const done = status === 'completed';
  const metaLine = [recipient, packages != null ? `${packages} pkg` : null].filter(Boolean).join('  ·  ');
  const interactive = pressableProps(onClick);

  return (
    <div
      ref={ref}
      aria-label={interactive ? `Stop ${sequence}, ${address}, ${meta.label}` : undefined}
      className={cn(
        'flex items-center gap-[var(--xen-space-sm)] border-b border-border px-[var(--xen-space-xs)] py-[var(--xen-space-sm)]',
        interactive &&
          'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...interactive}
      {...rest}
    >
      <span
        aria-hidden="true"
        className={cn(
          'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold',
          done ? cn(TONE_BG[meta.tone], TONE_ON_TEXT[meta.tone]) : cn('border', TONE_BORDER[meta.tone], TONE_TEXT[meta.tone])
        )}
      >
        {done ? '✓' : sequence}
      </span>

      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm font-semibold text-on-surface">{address}</span>
        <div className="flex items-center gap-[var(--xen-space-xs)]">
          <span aria-hidden="true" className={cn('text-xs', TONE_TEXT[meta.tone])}>
            {meta.glyph}
          </span>
          <span className={cn('text-xs font-semibold', TONE_TEXT[meta.tone])}>{meta.label}</span>
          {metaLine ? <span className="min-w-0 flex-1 truncate text-xs text-muted">{`· ${metaLine}`}</span> : null}
        </div>
      </div>

      {eta ? <span className="text-xs text-muted">{eta}</span> : null}
    </div>
  );
});

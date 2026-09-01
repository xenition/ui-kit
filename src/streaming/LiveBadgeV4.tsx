import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatCount } from './types';
import type { LiveBadgeProps, LiveBadgeVariant } from './LiveBadge';

export type { LiveBadgeVariant };

/** Drop-in for {@link LiveBadgeProps} — same props, the V4 "spotlight" design. */
export type LiveBadgeV4Props = LiveBadgeProps;

/**
 * LiveBadge — **V4** "spotlight" design (web parity of the native V4). A refined
 * LIVE pill: a pulsing-look `danger` dot (a solid core inside a soft-danger halo
 * ring, so live status reads by glyph + color, never color alone) beside a bold
 * "LIVE" label on a soft `bg-danger/10` tint pill. Keeps the base's three
 * variants (`solid` / `outline` / `dot`) and the optional viewer count. Same
 * props/behavior as {@link LiveBadgeProps}; every color resolves from `--xen-*`
 * danger / on-danger / muted tokens — no literal hex. The combined text
 * (label + viewers) is exposed as the element's `aria-label`.
 */
export const LiveBadgeV4 = React.forwardRef<HTMLSpanElement, LiveBadgeV4Props>(function LiveBadgeV4(
  { variant = 'solid', label = 'LIVE', viewers, className, 'aria-label': ariaLabel, ...rest },
  ref
) {
  const solid = variant === 'solid';
  const outline = variant === 'outline';
  const dotOnly = variant === 'dot';

  const countText = viewers != null ? `${formatCount(viewers)} watching` : undefined;
  const a11y = ariaLabel ?? [label, countText].filter(Boolean).join(', ');

  return (
    <span
      ref={ref}
      data-xen-live-badge=""
      aria-label={a11y}
      className={cn(
        'inline-flex items-center self-start gap-[var(--xen-space-xs)] rounded-full',
        !dotOnly && 'px-[var(--xen-space-sm)] py-0.5',
        // V4 spotlight: soft-danger tint pill for solid, outline keeps its border, dot stays chrome-less.
        solid && 'bg-danger/10 text-danger',
        outline && 'border border-danger text-danger',
        dotOnly && 'text-danger',
        className
      )}
      {...rest}
    >
      {/* Pulsing-look live dot: a solid danger core inside a soft-danger halo ring. */}
      <span
        aria-hidden="true"
        className="inline-flex h-3 w-3 items-center justify-center rounded-full bg-danger/20"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-danger" />
      </span>
      <span className="text-xs font-bold tracking-wide">{label.toUpperCase()}</span>
      {countText ? (
        <span className="text-xs font-medium text-muted">{countText}</span>
      ) : null}
    </span>
  );
});

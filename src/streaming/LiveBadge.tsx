import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatCount } from './types';

export type LiveBadgeVariant = 'solid' | 'outline' | 'dot';

export interface LiveBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * - `solid`   — filled `danger` pill with on-danger text (default).
   * - `outline` — `danger` border + text on a transparent surface.
   * - `dot`     — just the dot + label, no pill chrome.
   */
  variant?: LiveBadgeVariant;
  /** Label text (default `'LIVE'`). */
  label?: string;
  /** Optional concurrent viewer count, appended after the label when set. */
  viewers?: number;
}

/**
 * A "LIVE" indicator for streams (web) — a `danger`-toned pill with a leading
 * dot. Three variants (`solid` / `outline` / `dot`) and an optional viewer
 * count. Presentational only; every color resolves from the `--xen-*` danger /
 * on-danger / muted tokens — no literal hex. The combined text (label +
 * viewers) is exposed as the element's `aria-label` for a single announcement.
 */
export const LiveBadge = React.forwardRef<HTMLSpanElement, LiveBadgeProps>(function LiveBadge(
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
        solid && 'bg-danger text-on-danger',
        outline && 'border border-danger text-danger',
        dotOnly && 'text-danger',
        className
      )}
      {...rest}
    >
      <span
        aria-hidden="true"
        className={cn('h-1.5 w-1.5 rounded-full', solid ? 'bg-on-danger' : 'bg-danger')}
      />
      <span className="text-xs font-bold tracking-wide">{label.toUpperCase()}</span>
      {countText ? (
        <span className={cn('text-xs font-medium', solid ? 'text-on-danger' : 'text-muted')}>
          {countText}
        </span>
      ) : null}
    </span>
  );
});

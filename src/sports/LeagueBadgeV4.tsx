import * as React from 'react';
import { cn } from '../primitives/cn';
import type { LeagueBadgeProps, LeagueBadgeSize, LeagueBadgeVariant } from './LeagueBadge';

/** Drop-in for {@link LeagueBadgeProps} — same props, the V4 "broadcast" design. */
export type LeagueBadgeV4Props = LeagueBadgeProps;

const TILE_SIZE: Record<LeagueBadgeSize, string> = {
  sm: 'h-6 w-6 text-xs',
  md: 'h-8 w-8 text-sm',
  lg: 'h-11 w-11 text-base',
};
const LABEL_SIZE: Record<LeagueBadgeSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  const joined = parts.map((w) => w[0]?.toUpperCase() ?? '').join('');
  return joined || '?';
}

/**
 * LeagueBadge — **V4** "broadcast" design (web parity of the native V4). A
 * polished league / competition emblem: the crest glyph (or derived initials)
 * sits in a soft-primary tinted disc beside the name label. `variant` recolors
 * from the single `primary` accent — `solid` fills, `soft` tints, `outline`
 * hairlines. Same props/behavior as {@link LeagueBadgeProps}; all colors resolve
 * from `--xen-*` token classes — no literals. Purely presentational.
 */
export const LeagueBadgeV4 = React.forwardRef<HTMLDivElement, LeagueBadgeV4Props>(
  function LeagueBadgeV4(
    { name, crest, label, size = 'md', variant = 'soft', className, ...rest },
    ref
  ) {
    const text = label === undefined ? name : label;
    const variantKey: LeagueBadgeVariant = variant;
    const solid = variantKey === 'solid';
    const outline = variantKey === 'outline';
    const tileTone = solid
      ? 'bg-primary text-on-primary shadow-sm'
      : outline
        ? 'bg-surface text-primary border border-primary'
        : 'bg-primary/10 text-primary';

    return (
      <div
        ref={ref}
        role="img"
        aria-label={`${name} badge`}
        className={cn('inline-flex items-center gap-2', className)}
        {...rest}
      >
        <span
          aria-hidden="true"
          className={cn(
            'inline-flex items-center justify-center rounded-full font-extrabold leading-none',
            TILE_SIZE[size],
            tileTone
          )}
        >
          {crest ?? initials(name)}
        </span>
        {text ? (
          <span className={cn('truncate font-bold text-on-surface', LABEL_SIZE[size])}>
            {text}
          </span>
        ) : null}
      </div>
    );
  }
);

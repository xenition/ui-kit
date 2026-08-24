import * as React from 'react';
import { cn } from '../primitives/cn';

export type LeagueBadgeSize = 'sm' | 'md' | 'lg';
export type LeagueBadgeVariant = 'solid' | 'soft' | 'outline';

export interface LeagueBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** League / competition name (e.g. `Premier League`). */
  name: string;
  /** Crest glyph or emoji; falls back to derived initials. */
  crest?: string;
  /** Short label shown beside the crest (defaults to `name`). Set `''` to hide. */
  label?: string;
  /** Size scale. Default `md`. */
  size?: LeagueBadgeSize;
  /** Fill treatment. Default `soft`. */
  variant?: LeagueBadgeVariant;
}

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
 * A league / competition crest — a small token-styled emblem (crest glyph or
 * derived initials) with an optional name label. Purely presentational and
 * dependency-free; the crest tile is a styled `div`, never an image fetch.
 * `variant` recolors from the primary slot / ramp tints; all colors resolve
 * from `--xen-*` token classes — no literals.
 */
export const LeagueBadge = React.forwardRef<HTMLDivElement, LeagueBadgeProps>(
  function LeagueBadge(
    { name, crest, label, size = 'md', variant = 'soft', className, ...rest },
    ref
  ) {
    const text = label === undefined ? name : label;
    const solid = variant === 'solid';
    const outline = variant === 'outline';
    const tileTone = solid
      ? 'bg-primary text-on-primary'
      : outline
        ? 'bg-surface text-primary border border-primary'
        : 'bg-primary-100 text-primary';

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
            'inline-flex items-center justify-center rounded-md font-bold leading-none',
            TILE_SIZE[size],
            tileTone
          )}
        >
          {crest ?? initials(name)}
        </span>
        {text ? (
          <span className={cn('truncate font-semibold text-on-surface', LABEL_SIZE[size])}>
            {text}
          </span>
        ) : null}
      </div>
    );
  }
);

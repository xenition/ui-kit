import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives/Badge';
import { PriceTag } from '../commerce/PriceTag';
import type { DestinationCardProps } from './DestinationCard';

/** Drop-in for {@link DestinationCardProps} — same props, the V4 "journey" design. */
export type DestinationCardV4Props = DestinationCardProps;

/**
 * DestinationCard — **V4** "journey" design (web parity of the native V4). The
 * boarding-pass take on a destination tile: a decorative accent→primary
 * "horizon" gradient cover carries the destination name in near-white ink (the
 * signature V4 touch), with the "from" price sitting in a frosted glass tile
 * overlaid on the gradient. The overlaid glyph/emoji and optional badge ribbon
 * are preserved, and the country/tagline sit on the calm surface below. Same
 * props/behavior as {@link DestinationCardProps}; all colors from `--xen-*`
 * token classes (no literal colors). `variant="wide"` fills the container width.
 */
export const DestinationCardV4 = React.forwardRef<HTMLDivElement, DestinationCardV4Props>(
  function DestinationCardV4(
    {
      name,
      country,
      tagline,
      glyph = '🌍',
      fromCents,
      currency = 'USD',
      badge,
      variant = 'default',
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    const wide = variant === 'wide';
    const interactive = typeof onClick === 'function';
    const a11yLabel = `${name}${country ? `, ${country}` : ''}`;

    return (
      <div
        ref={ref}
        data-xen-destination-card=""
        className={cn(
          'overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface shadow-lg',
          wide ? 'w-full' : 'w-[220px]',
          interactive &&
            'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
          className
        )}
        {...rest}
        {...(interactive
          ? {
              role: 'button',
              tabIndex: 0,
              'aria-label': a11yLabel,
              onClick,
              onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClick?.();
                }
              },
            }
          : {})}
      >
        {/* Signature V4 touch: decorative accent→primary "horizon" gradient cover */}
        <div
          className={cn(
            'relative flex flex-col justify-end overflow-hidden bg-gradient-to-br from-accent-400 to-primary-600 p-[var(--xen-space-md)]',
            wide ? 'h-[132px]' : 'h-[148px]'
          )}
        >
          <span aria-hidden="true" className="absolute right-[var(--xen-space-md)] top-[var(--xen-space-sm)] text-3xl leading-none">
            {glyph}
          </span>
          {badge ? (
            <span className="absolute left-[var(--xen-space-sm)] top-[var(--xen-space-sm)]">
              <Badge tone="primary">{badge}</Badge>
            </span>
          ) : null}

          <span className="line-clamp-2 text-lg font-bold text-primary-50">{name}</span>

          {typeof fromCents === 'number' ? (
            <span className="mt-[var(--xen-space-sm)] inline-flex items-baseline gap-[var(--xen-space-xs)] self-start rounded-[var(--xen-radius-md)] border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-sm)] py-[2px]">
              <span className="text-xs text-primary-100">from</span>
              <PriceTag cents={fromCents} currency={currency} size="sm" />
            </span>
          ) : null}
        </div>

        <div className="flex flex-col gap-[var(--xen-space-xs)] p-[var(--xen-space-md)]">
          {country ? <span className="truncate text-xs font-semibold text-muted">{country}</span> : null}
          {tagline ? <span className="line-clamp-2 text-sm text-muted">{tagline}</span> : null}
        </div>
      </div>
    );
  }
);

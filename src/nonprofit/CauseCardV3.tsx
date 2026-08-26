import * as React from 'react';
import { cn } from '../primitives/cn';
import { CampaignProgressV3 } from './CampaignProgressV3';
import type { CauseCardProps } from './CauseCard';

/** Same public contract as {@link CauseCard} — a drop-in alternate design. */
export type CauseCardV3Props = CauseCardProps;

/**
 * CauseCard, redesigned (v3): a **compact list row**. A small square thumbnail,
 * the title over a category·description line, and a thin progress meter beneath —
 * hairline-bordered for a dense causes list. The opposite of v2's cover hero.
 * Same props, token-only.
 * Stays inside its own design line: the meter is {@link CampaignProgressV3}, not
 * the base one, because an app that picks V3 picks it for every surface it sees.
 */
export const CauseCardV3 = React.forwardRef<HTMLDivElement, CauseCardV3Props>(function CauseCardV3(
  { title, description, imageUrl, imageAlt, category, raisedCents, goalCents, currency = 'USD', variant, onClick, loading = false, className, ...rest },
  ref
) {
  void variant;
  const interactive = typeof onClick === 'function';
  const hasGoal = typeof raisedCents === 'number' && typeof goalCents === 'number';

  if (loading) {
    return (
      <div ref={ref} data-xen-cause-card="" aria-label="Loading cause" className={cn('flex items-center gap-3 border-b border-border py-3', className)} {...rest}>
        <div className="h-12 w-12 animate-pulse rounded-md bg-neutral-100" />
        <div className="h-3 w-2/5 animate-pulse rounded-sm bg-neutral-100" />
      </div>
    );
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (interactive && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick?.();
    }
  };
  const sub = [category, description].filter((s): s is string => !!s).join(' · ');

  return (
    <div
      ref={ref}
      data-xen-cause-card=""
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={title}
      onClick={interactive ? () => onClick?.() : undefined}
      onKeyDown={interactive ? handleKeyDown : undefined}
      className={cn(
        'flex items-center gap-3 border-b border-border py-3',
        interactive && 'cursor-pointer transition-colors hover:bg-neutral-50',
        className
      )}
      {...rest}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md bg-neutral-100 text-xl">
        {imageUrl ? <img src={imageUrl} alt={imageAlt ?? title} className="h-full w-full object-cover" /> : '🤝'}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-on-surface">{title}</p>
        {sub ? <p className="truncate text-xs text-muted">{sub}</p> : null}
        {hasGoal ? (
          <div className="mt-1">
            <CampaignProgressV3 raisedCents={raisedCents!} goalCents={goalCents!} currency={currency} hideAmounts />
          </div>
        ) : null}
      </div>
    </div>
  );
});

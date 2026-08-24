import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives/Badge';
import { CampaignProgress } from './CampaignProgress';
import type { CauseCardProps } from './CauseCard';

/** Same public contract as {@link CauseCard} — a drop-in alternate design. */
export type CauseCardV2Props = CauseCardProps;

/**
 * CauseCard, redesigned (v2): a **full-bleed cover hero**. The image fills the
 * card; the category badge floats top-left and the title/description sit on a
 * gradient scrim at the bottom, with a mini progress meter when funding data is
 * present. Elevated, hover-lift. Same props as {@link CauseCard}, token-only.
 */
export const CauseCardV2 = React.forwardRef<HTMLDivElement, CauseCardV2Props>(function CauseCardV2(
  { title, description, imageUrl, imageAlt, category, raisedCents, goalCents, currency = 'USD', variant, onClick, loading = false, className, ...rest },
  ref
) {
  void variant;
  const interactive = typeof onClick === 'function';
  const hasGoal = typeof raisedCents === 'number' && typeof goalCents === 'number';

  if (loading) {
    return (
      <div ref={ref} data-xen-cause-card="" aria-label="Loading cause" className={cn('h-56 animate-pulse rounded-lg bg-neutral-100', className)} {...rest} />
    );
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (interactive && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick?.();
    }
  };

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
        'relative flex h-56 flex-col justify-end overflow-hidden rounded-lg bg-neutral-100 shadow-md transition-transform',
        interactive && 'cursor-pointer hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0',
        className
      )}
      {...rest}
    >
      {imageUrl ? (
        <img src={imageUrl} alt={imageAlt ?? title} className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-4xl">🤝</div>
      )}
      {category ? <div className="absolute left-2 top-2"><Badge tone="primary">{category}</Badge></div> : null}
      <div className="relative bg-gradient-to-t from-neutral-900/75 to-transparent p-3 pt-10">
        <p className="text-base font-bold text-neutral-50">{title}</p>
        {description ? <p className="mt-0.5 line-clamp-2 text-xs text-neutral-200">{description}</p> : null}
        {hasGoal ? (
          <div className="mt-2">
            <CampaignProgress raisedCents={raisedCents!} goalCents={goalCents!} currency={currency} hideAmounts />
          </div>
        ) : null}
      </div>
    </div>
  );
});

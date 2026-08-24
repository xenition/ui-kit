import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, Badge, Button, Rating } from '../primitives';
import { activateOnKey } from './internal';
import type { SellerCardProps } from './SellerCard';

/** Same public contract as {@link SellerCard} — a drop-in alternate design. */
export type SellerCardV2Props = SellerCardProps;

/**
 * SellerCard, redesigned (v2): a **banner profile card**. A primary-tinted cover
 * strip carries a large avatar straddling its edge; name (+ verified badge),
 * rating, and a sales·location meta line center beneath, with a full-width
 * Contact CTA. Elevated. Distinct from v1's compact layout. Same props,
 * token-only.
 */
export const SellerCardV2 = React.forwardRef<HTMLDivElement, SellerCardV2Props>(function SellerCardV2(
  { name, avatarUrl, rating, reviewCount, salesCount, location, verified, actionLabel = 'Contact', onContact, variant, onClick, className, ...rest },
  ref
) {
  void variant;
  const interactive = typeof onClick === 'function';
  const meta = [
    typeof salesCount === 'number' ? `${salesCount.toLocaleString()} sales` : null,
    location,
  ].filter((s): s is string => !!s);

  return (
    <div
      ref={ref}
      data-xen-seller-card=""
      className={cn('overflow-hidden rounded-lg bg-surface text-center shadow-md', className)}
      {...rest}
    >
      <div className="h-14 bg-primary/20" />
      <div className="flex flex-col items-center gap-1 px-md pb-md">
        <div
          role={interactive ? 'button' : undefined}
          tabIndex={interactive ? 0 : undefined}
          aria-label={interactive ? `${name}, open profile` : undefined}
          onClick={onClick}
          onKeyDown={interactive ? activateOnKey : undefined}
          className={cn('-mt-10 flex flex-col items-center gap-1', interactive && 'cursor-pointer')}
        >
          <div className="rounded-full border-4 border-surface">
            <Avatar src={avatarUrl} name={name} size="xl" />
          </div>
          <div className="flex items-center gap-1.5">
            <p className="text-lg font-bold text-on-surface">{name}</p>
            {verified ? <Badge tone="primary">✓ Verified</Badge> : null}
          </div>
        </div>
        {typeof rating === 'number' ? (
          <div className="flex items-center gap-1.5">
            <Rating value={rating} />
            {typeof reviewCount === 'number' ? <span className="text-xs text-muted">({reviewCount})</span> : null}
          </div>
        ) : null}
        {meta.length > 0 ? <p className="text-xs text-muted">{meta.join(' · ')}</p> : null}
        {onContact ? (
          <Button size="md" variant="primary" className="mt-1 w-full" onClick={onContact}>
            {actionLabel}
          </Button>
        ) : null}
      </div>
    </div>
  );
});

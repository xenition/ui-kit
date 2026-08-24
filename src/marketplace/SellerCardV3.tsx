import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, Button, Rating } from '../primitives';
import { activateOnKey } from './internal';
import type { SellerCardProps } from './SellerCard';

/** Same public contract as {@link SellerCard} — a drop-in alternate design. */
export type SellerCardV3Props = SellerCardProps;

/**
 * SellerCard, redesigned (v3): a **compact directory row**. A small avatar, the
 * name (with an inline ✓ when verified) over a rating·sales·location summary, and
 * a quiet Contact button on the trailing edge — hairline-bordered for storefront
 * lists. The opposite of v2's banner card. Same props, token-only.
 */
export const SellerCardV3 = React.forwardRef<HTMLDivElement, SellerCardV3Props>(function SellerCardV3(
  { name, avatarUrl, rating, reviewCount, salesCount, location, verified, actionLabel = 'Contact', onContact, variant, onClick, className, ...rest },
  ref
) {
  void variant;
  void reviewCount;
  const interactive = typeof onClick === 'function';
  const meta = [
    typeof salesCount === 'number' ? `${salesCount.toLocaleString()} sales` : null,
    location,
  ].filter((s): s is string => !!s);

  return (
    <div
      ref={ref}
      data-xen-seller-card=""
      className={cn('flex items-center gap-3 border-b border-border py-2.5', className)}
      {...rest}
    >
      <div
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={interactive ? `${name}, open profile` : undefined}
        onClick={onClick}
        onKeyDown={interactive ? activateOnKey : undefined}
        className={cn('flex min-w-0 flex-1 items-center gap-3', interactive && 'cursor-pointer')}
      >
        <Avatar src={avatarUrl} name={name} size="sm" />
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1 truncate text-sm font-semibold text-on-surface">
            {name}
            {verified ? <span className="text-primary" aria-label="Verified">✓</span> : null}
          </p>
          <div className="flex items-center gap-1.5">
            {typeof rating === 'number' ? <Rating value={rating} size="sm" showValue /> : null}
            {meta.length > 0 ? <span className="truncate text-xs text-muted">{meta.join(' · ')}</span> : null}
          </div>
        </div>
      </div>
      {onContact ? (
        <Button size="sm" variant="outline" onClick={onContact}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
});

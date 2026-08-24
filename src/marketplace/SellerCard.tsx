import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, Badge, Button, Rating } from '../primitives';
import { activateOnKey } from './internal';

export type SellerCardVariant = 'card' | 'inline';

export interface SellerCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Seller display name / shop name. */
  name: string;
  /** Avatar image URL (falls back to initials). */
  avatarUrl?: string;
  /** Average rating (0–5). Renders a `Rating` row when provided. */
  rating?: number;
  /** Number of ratings/reviews backing the average. */
  reviewCount?: number;
  /** Total completed sales; shown in the meta line. */
  salesCount?: number;
  /** Optional location line. */
  location?: string;
  /** Verified/trusted seller flag → a primary badge. */
  verified?: boolean;
  /** Label for the primary action button (default "Contact"). */
  actionLabel?: string;
  /** Fires when the action button is pressed. Omit to hide the button. */
  onContact?: () => void;
  /** Compact inline layout vs. the full card. Default `card`. */
  variant?: SellerCardVariant;
  /**
   * Fires when the identity block is activated (open the seller profile). When
   * set, that block becomes a `role="button"` with keyboard support; the contact
   * button stays outside it so contacting never also navigates.
   */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

/**
 * A seller / shop identity block — avatar, name, an optional verified badge, a
 * star rating with review count, and a sales/location meta line, plus an
 * optional contact action. Presentational: shaped data + callbacks only. The
 * contact `Button` is kept outside the card's press target so contacting never
 * also navigates. Reuses `Avatar`, `Rating`, `Badge`, `Button`; token-only
 * colors via `--xen-*` classes.
 */
export const SellerCard = React.forwardRef<HTMLDivElement, SellerCardProps>(function SellerCard(
  {
    name,
    avatarUrl,
    rating,
    reviewCount,
    salesCount,
    location,
    verified = false,
    actionLabel = 'Contact',
    onContact,
    variant = 'card',
    onClick,
    className,
    ...rest
  },
  ref
) {
  const inline = variant === 'inline';
  const interactive = onClick != null;

  const meta: string[] = [];
  if (typeof salesCount === 'number') meta.push(`${salesCount.toLocaleString()} sales`);
  if (location) meta.push(location);

  const identity = (
    <div className="flex flex-1 items-center gap-[var(--xen-space-md)]">
      <Avatar src={avatarUrl} name={name} size={inline ? 'md' : 'lg'} />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <div className="flex items-center gap-[var(--xen-space-sm)]">
          <span className="min-w-0 truncate text-base font-bold text-on-surface">{name}</span>
          {verified ? <Badge tone="primary">✓ Verified</Badge> : null}
        </div>
        {typeof rating === 'number' ? (
          <div className="flex items-center gap-[var(--xen-space-xs)]">
            <Rating value={rating} size="sm" showValue />
            {typeof reviewCount === 'number' ? (
              <span className="text-xs text-muted">{`(${reviewCount.toLocaleString()})`}</span>
            ) : null}
          </div>
        ) : null}
        {meta.length > 0 ? <span className="truncate text-sm text-muted">{meta.join(' · ')}</span> : null}
      </div>
    </div>
  );

  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)]',
        inline ? 'bg-transparent' : 'border border-border bg-surface p-[var(--xen-space-lg)]',
        className
      )}
      {...rest}
    >
      {interactive ? (
        <div
          role="button"
          tabIndex={0}
          onClick={onClick}
          onKeyDown={activateOnKey}
          aria-label={`${name}${verified ? ', verified seller' : ''}${
            typeof rating === 'number' ? `, rated ${rating} of 5` : ''
          }`}
          className="flex flex-1 cursor-pointer items-center rounded-[var(--xen-radius-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {identity}
        </div>
      ) : (
        identity
      )}
      {onContact ? (
        <Button variant="outline" size="sm" onClick={onContact}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
});

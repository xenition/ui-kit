import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, Button, Icon } from '../primitives';
import { clickableProps } from './internal';

/** Layout density for an {@link AgentCard}. */
export type AgentCardVariant = 'default' | 'compact';

export interface AgentCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Agent's full name. */
  name: string;
  /** Role / title (e.g. "Listing Agent"). */
  title?: string;
  /** Brokerage / agency name. */
  agency?: string;
  /** Avatar image URL; falls back to initials. */
  avatarUrl?: string;
  /** Star rating, 0–5. */
  rating?: number;
  /** Number of reviews backing the rating. */
  reviewCount?: number;
  /** Primary action label (default "Contact"). */
  contactLabel?: string;
  /** Fires when the primary action is pressed. */
  onContact?: () => void;
  /** Density variant. */
  variant?: AgentCardVariant;
}

/**
 * Web parity of the native `AgentCard`: a listing-agent summary — avatar
 * (initials fallback), name/title/agency, an optional star rating with review
 * count, and a contact action. Data + callbacks only; nothing fetches.
 * `variant="compact"` drops the rating row for dense lists. Reuses the shared
 * `Avatar`, `Button`, and `Icon` primitives; all colors come from the `--xen-*`
 * tokens — no literal colors. Pass `onClick` to make the card an activatable
 * button (the contact action stops propagation so it never double-fires).
 */
export const AgentCard = React.forwardRef<HTMLDivElement, AgentCardProps>(
  function AgentCard(
    {
      name,
      title,
      agency,
      avatarUrl,
      rating,
      reviewCount,
      contactLabel = 'Contact',
      onContact,
      variant = 'default',
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    const compact = variant === 'compact';
    const hasRating = typeof rating === 'number';
    const fullStars = hasRating ? Math.round(Math.min(Math.max(rating!, 0), 5)) : 0;
    const meta = [title, agency].filter(Boolean).join(' · ');
    const ratingLabel = hasRating ? `, rated ${rating} of 5` : '';

    return (
      <div
        ref={ref}
        onClick={onClick}
        className={cn(
          'flex items-center gap-3 border border-border bg-surface',
          compact ? 'p-[var(--xen-space-md)]' : 'p-[var(--xen-space-lg)]',
          'rounded-[var(--xen-radius-lg)]',
          onClick && 'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          className
        )}
        {...clickableProps(
          onClick as React.MouseEventHandler | undefined,
          `${name}${meta ? `, ${meta}` : ''}${ratingLabel}`
        )}
        {...rest}
      >
        <Avatar src={avatarUrl} name={name} size={compact ? 'md' : 'lg'} />
        <div className="flex flex-1 flex-col gap-0.5">
          <span className="truncate text-base font-semibold text-on-surface">{name}</span>
          {meta ? <span className="truncate text-sm text-muted">{meta}</span> : null}
          {hasRating && !compact ? (
            <span className="flex items-center gap-1">
              <span className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon key={i} glyph={i < fullStars ? '★' : '☆'} size="sm" color={i < fullStars ? 'warn' : 'muted'} />
                ))}
              </span>
              {typeof reviewCount === 'number' ? (
                <span className="text-xs text-muted">{`(${reviewCount})`}</span>
              ) : null}
            </span>
          ) : null}
        </div>
        {onContact ? (
          <Button
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onContact();
            }}
          >
            {contactLabel}
          </Button>
        ) : null}
      </div>
    );
  }
);

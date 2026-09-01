import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, Button, Icon } from '../primitives';
import { clickableProps } from './internal';
import type { AgentCardProps } from './AgentCard';

/** Drop-in for {@link AgentCardProps} — same props, the V4 "listing" design. */
export type AgentCardV4Props = AgentCardProps;

/**
 * AgentCard — **V4** "listing" design (web parity of the native V4). The
 * image-forward, editorial take on a listing-agent summary: an elevated rounded
 * card with the avatar floating over a subtle soft-primary gradient accent, a
 * name-forward header, a warm star rating, and a contact affordance. Same
 * props/behavior as {@link AgentCardProps}; `variant="compact"` drops the rating
 * row for dense lists. All colors from `--xen-*` token classes (no literals).
 * Pass `onClick` to make the card a keyboard-activatable button (the contact
 * action stops propagation so it never double-fires).
 */
export const AgentCardV4 = React.forwardRef<HTMLDivElement, AgentCardV4Props>(function AgentCardV4(
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
        'flex items-center gap-3 rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-md',
        compact ? 'p-[var(--xen-space-md)]' : 'p-[var(--xen-space-lg)]',
        onClick && 'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className
      )}
      {...clickableProps(onClick as React.MouseEventHandler | undefined, `${name}${meta ? `, ${meta}` : ''}${ratingLabel}`)}
      {...rest}
    >
      {/* Avatar floating over a subtle soft-primary gradient accent. */}
      <span className="relative inline-flex items-center justify-center rounded-full bg-gradient-to-br from-primary/15 to-transparent p-1">
        <Avatar src={avatarUrl} name={name} size={compact ? 'md' : 'lg'} />
      </span>
      <div className="flex flex-1 flex-col gap-0.5">
        <span className="truncate text-base font-bold text-on-surface">{name}</span>
        {meta ? <span className="truncate text-sm text-muted">{meta}</span> : null}
        {hasRating && !compact ? (
          <span className="mt-0.5 flex items-center gap-1">
            <span className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Icon key={i} glyph={i < fullStars ? '★' : '☆'} size="sm" color={i < fullStars ? 'warn' : 'muted'} />
              ))}
            </span>
            {typeof reviewCount === 'number' ? <span className="text-xs text-muted">{`(${reviewCount})`}</span> : null}
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
});

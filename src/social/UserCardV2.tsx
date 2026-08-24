import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import { Icon } from '../primitives/Icon';
import { FollowButton } from './FollowButton';
import { ProfileStats } from './ProfileStats';
import type { UserCardProps } from './UserCard';

/** Drop-in for {@link UserCard} — identical props, a different design. */
export type UserCardV2Props = UserCardProps;

/**
 * UserCard, design V2 — a **banner profile card**: a tinted two-tone cover strip
 * with an **overlapping avatar**, centered identity, bio, {@link ProfileStats},
 * and a prominent follow CTA. The `row` variant renders the same banner idiom,
 * minus bio/stats. Bold, media-forward. Same props as {@link UserCard},
 * token-only.
 */
export const UserCardV2 = React.forwardRef<HTMLDivElement, UserCardV2Props>(function UserCardV2(
  { user, variant = 'row', stats, followState, followLoading, onFollow, onClick, className, ...rest },
  ref
) {
  const isCard = variant === 'card';

  const banner = (
    <div className={cn('relative w-full bg-primary/20', isCard ? 'h-[72px]' : 'h-12')}>
      <div className="absolute inset-y-0 right-0 w-[55%] bg-accent/20" aria-hidden="true" />
    </div>
  );

  const identity = (
    <div className="flex flex-col items-center gap-0.5">
      <div className="flex items-center gap-xs">
        <span className="truncate text-lg font-bold text-on-surface">{user.name}</span>
        {user.verified ? <Icon glyph="✓" size="sm" color="primary" aria-label="Verified" /> : null}
      </div>
      {user.handle ? <span className="truncate text-sm text-muted">@{user.handle}</span> : null}
    </div>
  );

  const inner = (
    <div className="flex flex-col">
      {banner}
      <div
        className={cn(
          'flex flex-col items-center gap-sm px-md pb-md',
          isCard ? '-mt-7' : '-mt-5'
        )}
      >
        <div className="rounded-full border-[3px] border-surface">
          <Avatar src={user.avatarUrl} name={user.name} size={isCard ? 'lg' : 'md'} />
        </div>
        {identity}
        {isCard && user.bio ? (
          <p className="text-center text-sm leading-relaxed text-on-surface">{user.bio}</p>
        ) : null}
        {isCard && stats && stats.length > 0 ? (
          <ProfileStats stats={stats} dividers className="self-stretch" />
        ) : null}
        {followState != null ? (
          <FollowButton
            state={followState}
            loading={followLoading}
            onClick={onFollow}
            size={isCard ? 'md' : 'sm'}
            className="min-w-[120px]"
          />
        ) : null}
      </div>
    </div>
  );

  const classes = cn(
    'overflow-hidden rounded-lg bg-surface shadow-md',
    onClick &&
      'cursor-pointer transition hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:transform-none',
    className
  );

  if (onClick) {
    return (
      <div
        ref={ref}
        role="button"
        tabIndex={0}
        aria-label={user.name}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
        className={classes}
        {...rest}
      >
        {inner}
      </div>
    );
  }
  return (
    <div ref={ref} className={classes} {...rest}>
      {inner}
    </div>
  );
});

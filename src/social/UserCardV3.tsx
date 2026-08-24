import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import { Icon } from '../primitives/Icon';
import { FollowButton } from './FollowButton';
import type { UserCardProps } from './UserCard';

/** Drop-in for {@link UserCard} — identical props, a different design. */
export type UserCardV3Props = UserCardProps;

/**
 * UserCard, design V3 — a **compact follow row**: a small avatar, a tight
 * name/handle stack, and a trailing {@link FollowButton}. The `card` variant
 * adds a single-line bio and an inline stats summary
 * (e.g. `12 Posts · 3.4k Followers`) but stays dense and borderless.
 * Minimal/structural. Same props as {@link UserCard}, token-only.
 */
export const UserCardV3 = React.forwardRef<HTMLDivElement, UserCardV3Props>(function UserCardV3(
  { user, variant = 'row', stats, followState, followLoading, onFollow, onClick, className, ...rest },
  ref
) {
  const isCard = variant === 'card';

  const statsLine =
    isCard && stats && stats.length > 0
      ? stats.map((s) => `${String(s.value)} ${s.label}`).join(' · ')
      : null;

  const inner = (
    <>
      <Avatar src={user.avatarUrl} name={user.name} size="md" className="shrink-0" />
      <div className="flex min-w-0 flex-1 flex-col gap-px">
        <div className="flex flex-wrap items-center gap-xs">
          <span className="truncate text-sm font-bold text-on-surface">{user.name}</span>
          {user.verified ? <Icon glyph="✓" size="sm" color="primary" aria-label="Verified" /> : null}
          {user.handle ? <span className="truncate text-xs text-muted">@{user.handle}</span> : null}
        </div>
        {isCard && user.bio ? (
          <span className="truncate text-xs text-on-surface">{user.bio}</span>
        ) : null}
        {statsLine ? <span className="truncate text-xs text-muted">{statsLine}</span> : null}
      </div>
      {followState != null ? (
        <FollowButton
          state={followState}
          loading={followLoading}
          onClick={onFollow}
          size="sm"
          className="shrink-0"
        />
      ) : null}
    </>
  );

  const classes = cn(
    'flex items-center gap-sm bg-transparent px-sm py-sm',
    onClick && 'cursor-pointer transition-opacity hover:opacity-80',
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

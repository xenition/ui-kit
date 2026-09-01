import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import { Icon } from '../primitives/Icon';
import { FollowButton } from './FollowButton';
import { ProfileStats } from './ProfileStats';
import type { UserCardProps } from './UserCard';

/** Drop-in for {@link UserCardProps} — same props, the V4 "feed" design. */
export type UserCardV4Props = UserCardProps;

/**
 * UserCard — **V4** "feed" design (web parity of the native V4). The clean,
 * airy take on a user block: a larger avatar, a bold name with a primary
 * verified tick, a muted handle, a bio line and {@link ProfileStats} in the
 * `card` variant, plus an inline {@link FollowButton} when a `followState` is
 * given. The `card` variant is an elevated rounded surface with generous
 * whitespace. Same props/behavior as {@link UserCardProps}; all colors from
 * `--xen-*` token classes (no literals). When clickable the root is a
 * keyboard-operable `role="button"` container so the nested follow button
 * stays independently focusable.
 */
export const UserCardV4 = React.forwardRef<HTMLDivElement, UserCardV4Props>(function UserCardV4(
  { user, variant = 'row', stats, followState, followLoading, onFollow, onClick, className, ...rest },
  ref
) {
  const isCard = variant === 'card';

  const identity = (
    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
      <div className="flex items-center gap-xs">
        <span className="truncate text-base font-bold text-on-surface">{user.name}</span>
        {user.verified ? (
          <Icon glyph="✓" size="sm" color="primary" aria-label="Verified" />
        ) : null}
      </div>
      {user.handle ? <span className="truncate text-sm text-muted">@{user.handle}</span> : null}
    </div>
  );

  const follow =
    followState != null ? (
      <FollowButton state={followState} loading={followLoading} onClick={onFollow} />
    ) : null;

  const header = (
    <div className="flex items-center gap-sm">
      <Avatar src={user.avatarUrl} name={user.name} size={isCard ? 'xl' : 'lg'} />
      {identity}
      {follow}
    </div>
  );

  const inner = isCard ? (
    <div className="flex flex-col gap-md">
      {header}
      {user.bio ? <p className="text-sm leading-relaxed text-on-surface">{user.bio}</p> : null}
      {stats && stats.length > 0 ? <ProfileStats stats={stats} /> : null}
    </div>
  ) : (
    header
  );

  const classes = cn(
    'bg-surface p-lg',
    isCard
      ? 'rounded-[var(--xen-radius-lg)] border border-border shadow-sm'
      : 'rounded-[var(--xen-radius-lg)]',
    onClick && 'cursor-pointer transition-opacity hover:opacity-[0.98]',
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

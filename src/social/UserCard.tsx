import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import { Icon } from '../primitives/Icon';
import { FollowButton, type FollowState } from './FollowButton';
import { ProfileStats, type ProfileStat } from './ProfileStats';

export type UserCardVariant = 'row' | 'card';

export interface SocialUser {
  name: string;
  /** @handle without the `@`. */
  handle?: string;
  avatarUrl?: string;
  bio?: string;
  /** Verified check next to the name. */
  verified?: boolean;
}

export interface UserCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  user: SocialUser;
  /**
   * `row` — compact list row (avatar · name/handle · follow button).
   * `card` — full profile card (adds bio + stats). Default `row`.
   */
  variant?: UserCardVariant;
  /** Stats shown in the `card` variant. */
  stats?: ReadonlyArray<ProfileStat>;
  /** Follow relationship; when set a {@link FollowButton} is rendered. */
  followState?: FollowState;
  followLoading?: boolean;
  onFollow?: (state: FollowState) => void;
  /** Clicking the card/row (e.g. open the profile). */
  onClick?: () => void;
}

/**
 * A user identity block in two shapes: a compact `row` for follower lists /
 * search results, and a full `card` with bio + {@link ProfileStats} for
 * profile previews. Includes an inline {@link FollowButton} when a
 * `followState` is given. Web parity of the native `UserCard`; token-only.
 * When clickable the root is a keyboard-operable `role="button"` container so
 * the nested follow button stays independently focusable.
 */
export const UserCard = React.forwardRef<HTMLDivElement, UserCardProps>(function UserCard(
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
      <Avatar src={user.avatarUrl} name={user.name} size={isCard ? 'lg' : 'md'} />
      {identity}
      {follow}
    </div>
  );

  const inner = isCard ? (
    <div className="flex flex-col gap-sm">
      {header}
      {user.bio ? <p className="text-sm leading-relaxed text-on-surface">{user.bio}</p> : null}
      {stats && stats.length > 0 ? <ProfileStats stats={stats} /> : null}
    </div>
  ) : (
    header
  );

  const classes = cn(
    'rounded-lg bg-surface p-md',
    isCard && 'border border-border',
    onClick && 'cursor-pointer transition-opacity hover:opacity-90',
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

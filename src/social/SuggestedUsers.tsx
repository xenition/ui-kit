import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import { FollowButton } from './FollowButton';

/** One suggested account in the "who to follow" row. */
export interface SuggestedUser {
  /** Stable id passed back to `onFollow` / `onPressUser`. */
  id: string;
  /** Display name (shown bold, truncated). */
  name: string;
  /** @handle without the leading `@`. */
  handle?: string;
  /** Avatar image; falls back to initials from `name`. */
  avatarUrl?: string;
  /** Show the primary verified tick after the name. */
  verified?: boolean;
  /** Optional one-line bio shown muted under the handle. */
  bio?: string;
  /** Whether the viewer already follows this user (drives the button state). */
  following?: boolean;
}

export interface SuggestedUsersProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Section header. Defaults to `Who to follow`. */
  title?: string;
  /** The accounts to show as horizontally-scrolling chip cards. */
  users: readonly SuggestedUser[];
  /** Fires with the user's `id` when its Follow/Following button is tapped. */
  onFollow?: (id: string) => void;
  /** Fires with the user's `id` when the chip (avatar/name) is tapped. */
  onPressUser?: (id: string) => void;
  /** Fires when the header "See all" action is tapped. Renders the action when set. */
  onSeeAll?: () => void;
}

/**
 * SuggestedUsers — **V4** "feed" design. A "who to follow" block: a header
 * (`title` + optional "See all") over a horizontally-scrolling row of user chip
 * cards. Each chip is an elevated rounded card with a big avatar, bold name with
 * a primary verified tick, muted handle/bio, and a {@link FollowButton}; the
 * whole chip (min 44px) opens the profile via `onPressUser`. Presentational;
 * token-only colors via `--xen-*` classes. Web parity of the native
 * `SuggestedUsers`. Exposes `role="list"` with `listitem` chips.
 */
export const SuggestedUsers = React.forwardRef<HTMLDivElement, SuggestedUsersProps>(function SuggestedUsers(
  { title = 'Who to follow', users, onFollow, onPressUser, onSeeAll, className, ...rest },
  ref
) {
  return (
    <div ref={ref} className={cn('flex flex-col gap-sm', className)} {...rest}>
      <div className="flex items-center justify-between gap-sm px-md">
        <h3 className="text-base font-extrabold text-on-surface">{title}</h3>
        {onSeeAll ? (
          <button
            type="button"
            onClick={onSeeAll}
            className="rounded-full px-sm py-xs text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
          >
            See all
          </button>
        ) : null}
      </div>

      <ul
        aria-label={title}
        className="flex gap-sm overflow-x-auto px-md pb-xs [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {users.map((user) => {
          const meta = user.bio ?? (user.handle ? `@${user.handle}` : undefined);
          return (
            <li key={user.id} className="shrink-0">
              <div className="flex w-40 flex-col items-center gap-sm rounded-[var(--xen-radius-lg)] border border-border bg-surface p-md shadow-sm">
                <button
                  type="button"
                  aria-label={user.name}
                  onClick={onPressUser ? () => onPressUser(user.id) : undefined}
                  disabled={!onPressUser}
                  className="flex min-h-[44px] flex-col items-center gap-xs rounded-[var(--xen-radius-md)] transition-opacity enabled:hover:opacity-90 disabled:cursor-default"
                >
                  <Avatar src={user.avatarUrl} name={user.name} size="lg" />
                  <div className="flex max-w-full items-center gap-xs">
                    <span className="truncate text-sm font-extrabold text-on-surface">{user.name}</span>
                    {user.verified ? (
                      <span aria-label="Verified" className="shrink-0 text-xs text-primary">
                        ✓
                      </span>
                    ) : null}
                  </div>
                  {meta ? <span className="line-clamp-2 text-center text-xs text-muted">{meta}</span> : null}
                </button>
                <FollowButton
                  state={user.following ? 'following' : 'follow'}
                  size="sm"
                  className="w-full"
                  onClick={onFollow ? () => onFollow(user.id) : undefined}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
});

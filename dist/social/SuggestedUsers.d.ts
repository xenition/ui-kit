import * as React from 'react';
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
export declare const SuggestedUsers: React.ForwardRefExoticComponent<SuggestedUsersProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SuggestedUsers.d.ts.map
import * as React from 'react';
import { type FollowState } from './FollowButton';
import { type ProfileStat } from './ProfileStats';
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
export declare const UserCard: React.ForwardRefExoticComponent<UserCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=UserCard.d.ts.map
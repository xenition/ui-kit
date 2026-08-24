import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
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
export interface UserCardProps {
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
    /** Tapping the card/row (e.g. open the profile). */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A user identity block in two shapes: a compact `row` for follower lists /
 * search results, and a full `card` with bio + {@link ProfileStats} for
 * profile previews. Includes an inline {@link FollowButton} when a
 * `followState` is given. Token-only.
 */
export declare function UserCard({ user, variant, stats, followState, followLoading, onFollow, onPress, style, }: UserCardProps): React.ReactElement;
//# sourceMappingURL=UserCard.d.ts.map
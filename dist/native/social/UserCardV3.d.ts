import * as React from 'react';
import type { UserCardProps } from './UserCard';
/** Drop-in for {@link UserCard} — identical props, a different design. */
export type UserCardV3Props = UserCardProps;
/**
 * UserCard, design V3 — a **compact follow row**: small avatar, a tight
 * name/handle stack, and a trailing {@link FollowButton}. The `card` variant
 * adds a single-line bio and an inline stats summary but stays dense and
 * borderless. Same props as {@link UserCard}, token-only.
 */
export declare function UserCardV3({ user, variant, stats, followState, followLoading, onFollow, onPress, style, }: UserCardV3Props): React.ReactElement;
//# sourceMappingURL=UserCardV3.d.ts.map
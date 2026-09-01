import * as React from 'react';
import type { UserCardProps } from './UserCard';
/** Drop-in for {@link UserCardProps} — same props, the V4 "feed" design. */
export type UserCardV4Props = UserCardProps;
/**
 * UserCard — **V4** "feed" design. The clean, airy take on a user block: a
 * larger avatar, a bold name with a primary verified tick, a muted handle, a
 * bio line and {@link ProfileStats} in the `card` variant, plus an inline
 * {@link FollowButton} when a `followState` is given. The `card` variant is an
 * elevated rounded surface with generous whitespace. Same props/behavior as
 * {@link UserCardProps}; token-only colors via `useXenitionTheme()`. The
 * `appearance` prop is accepted for drop-in parity; the feed line keeps its own
 * clean elevated surface.
 */
export declare function UserCardV4({ user, variant, stats, followState, followLoading, onFollow, onPress, appearance: _appearance, style, }: UserCardV4Props): React.ReactElement;
//# sourceMappingURL=UserCardV4.d.ts.map
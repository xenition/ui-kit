import * as React from 'react';
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
export declare const UserCardV3: React.ForwardRefExoticComponent<UserCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=UserCardV3.d.ts.map
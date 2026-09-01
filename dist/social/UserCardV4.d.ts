import * as React from 'react';
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
export declare const UserCardV4: React.ForwardRefExoticComponent<UserCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=UserCardV4.d.ts.map
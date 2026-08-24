import * as React from 'react';
import type { UserCardProps } from './UserCard';
/** Drop-in for {@link UserCard} — identical props, a different design. */
export type UserCardV2Props = UserCardProps;
/**
 * UserCard, design V2 — a **banner profile card**: a tinted cover strip with an
 * **overlapping avatar**, centered identity, bio, {@link ProfileStats}, and a
 * prominent follow CTA. The `row` variant renders the same banner idiom, minus
 * bio/stats. Same props as {@link UserCard}, token-only.
 */
export declare function UserCardV2({ user, variant, stats, followState, followLoading, onFollow, onPress, style, }: UserCardV2Props): React.ReactElement;
//# sourceMappingURL=UserCardV2.d.ts.map
import * as React from 'react';
import type { FollowButtonProps } from './FollowButton';
/** Drop-in for {@link FollowButtonProps} — same props, the V4 "feed" design. */
export type FollowButtonV4Props = FollowButtonProps;
/**
 * FollowButton — **V4** "feed" design. The clean pill toggle over Follow /
 * Following / Requested: `follow` is a solid-**primary** pill, `following` a
 * soft-primary tint, `requested` a muted state — one accent, big ≥44px tap
 * target, fully rounded. Stateless: the parent owns `state` and flips it in
 * `onPress`. Same props/behavior as {@link FollowButtonProps}; token-only via
 * the primitive `Button`. `accessibilityState.selected` marks the connected/
 * pending states.
 */
export declare function FollowButtonV4({ state, size, loading, disabled, onPress, labels, style, }: FollowButtonV4Props): React.ReactElement;
//# sourceMappingURL=FollowButtonV4.d.ts.map
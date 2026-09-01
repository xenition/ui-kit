import * as React from 'react';
import type { FollowButtonProps } from './FollowButton';
/** Drop-in for {@link FollowButtonProps} — same props, the V4 "feed" design. */
export type FollowButtonV4Props = FollowButtonProps;
/**
 * FollowButton — **V4** "feed" design (web parity of the native V4). The clean
 * pill toggle over Follow / Following / Requested: `follow` is a solid-**primary**
 * pill, `following` a soft-primary tint, `requested` a muted state — one accent,
 * big ≥44px tap target, fully rounded. Stateless: the parent owns `state` and
 * flips it in `onClick`. Same props/behavior as {@link FollowButtonProps}; all
 * colors from `--xen-*` token classes (no literals). `aria-pressed` marks the
 * connected/pending states.
 */
export declare const FollowButtonV4: React.ForwardRefExoticComponent<FollowButtonProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=FollowButtonV4.d.ts.map
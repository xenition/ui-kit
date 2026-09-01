import * as React from 'react';
import type { ChannelCardProps } from './ChannelCard';
/** Drop-in for {@link ChannelCardProps} — same props, the V4 "spotlight" design. */
export type ChannelCardV4Props = ChannelCardProps;
/**
 * ChannelCard — **V4** "spotlight" design (web parity of the native V4). A rounded,
 * elevated live/creator card: the avatar sits inside a subtle brand-gradient glow
 * ring (the V4 signature — gradient reserved for the cover glow), with the name,
 * category, and — when `channel.live` — a `LiveBadge` plus a `formatCount` viewer
 * label. `onFollowToggle(next)` renders a **primary** follow `Button` (the one
 * accent, secondary once following) that stops propagation. `onClick(channel)`
 * opens the card, rendered as a `role="button"` `Card` with Enter/Space support
 * and a ≥44px tap target. Composes `Card` / `Avatar` / `Button`. Same
 * props/behavior as {@link ChannelCardProps}; all colors from `--xen-*` token
 * classes (no literal hex).
 */
export declare const ChannelCardV4: React.ForwardRefExoticComponent<ChannelCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ChannelCardV4.d.ts.map
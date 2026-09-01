import * as React from 'react';
import type { ChannelCardProps } from './ChannelCard';
/** Drop-in for {@link ChannelCardProps} — same props, the V4 "spotlight" design. */
export type ChannelCardV4Props = ChannelCardProps;
/**
 * ChannelCard — **V4** "spotlight" design. A rounded, elevated live/creator card:
 * the avatar sits inside a subtle brand-gradient glow ring (the V4 signature —
 * gradient reserved for the cover glow), with the name, category, and — when
 * `channel.live` — a `LiveBadge` plus a `formatCount` viewer label.
 * `onFollowToggle(next)` renders a **primary** follow `Button` (the one accent,
 * secondary once following). `onPress(channel)` opens the card with a ≥44px tap
 * target. Composes `Card` / `Avatar` / `Button`. Same props/behavior as
 * {@link ChannelCardProps}; token-only colors via `useXenitionTheme()`.
 */
export declare function ChannelCardV4({ channel, following, variant, onPress, onFollowToggle, style, }: ChannelCardV4Props): React.ReactElement;
//# sourceMappingURL=ChannelCardV4.d.ts.map
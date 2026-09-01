import * as React from 'react';
import type { PodcastCardProps } from './PodcastCard';
/** Drop-in for {@link PodcastCardProps} — same props, the V4 "spotlight" design. */
export type PodcastCardV4Props = PodcastCardProps;
/**
 * PodcastCard — **V4** "spotlight" design. The artwork-forward show card: the
 * cover sits on a subtle brand-gradient **glow** backdrop (`spotlightGlow`) — the
 * signature immersive touch of this line — with title, publisher · episode-count,
 * and (in `featured`) a description plus a `primary` subscribe button.
 * `onPress(podcast)` opens the show. Same props/behavior as
 * {@link PodcastCardProps}; token-only colors via `useXenitionTheme()`. Composes
 * `Card` / `Button`.
 */
export declare function PodcastCardV4({ podcast, subscribed, variant, onPress, onSubscribeToggle, style, }: PodcastCardV4Props): React.ReactElement;
//# sourceMappingURL=PodcastCardV4.d.ts.map
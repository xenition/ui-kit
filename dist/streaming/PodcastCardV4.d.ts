import * as React from 'react';
import type { PodcastCardProps } from './PodcastCard';
/** Drop-in for {@link PodcastCardProps} — same props, the V4 "spotlight" design. */
export type PodcastCardV4Props = PodcastCardProps;
/**
 * PodcastCard — **V4** "spotlight" design (web parity of the native V4). The
 * artwork-forward show card: the cover sits on a subtle brand-gradient **glow**
 * backdrop (`from-accent-400 to-primary-600`) — the signature immersive touch of
 * this line — with title, publisher · episode-count, and (in `featured`) a
 * description plus a `primary` subscribe button. `onClick(podcast)` opens the
 * show (rendered as a `role="button"` `Card` with Enter/Space support). Same
 * props/behavior as {@link PodcastCardProps}; all colors from `--xen-*` token
 * classes + gradient utilities (no literal hex). Composes `Card` / `Button`.
 */
export declare const PodcastCardV4: React.ForwardRefExoticComponent<PodcastCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PodcastCardV4.d.ts.map
import * as React from 'react';
import type { VideoEmbedProps } from './VideoEmbed';
/** Drop-in for {@link VideoEmbedProps} — same props, the V4 "showcase" design. */
export type VideoEmbedV4Props = VideoEmbedProps;
/**
 * VideoEmbed — **V4** "showcase" design (web parity of the native V4). A rounded,
 * elevated 16:9 media frame: an `<iframe>` embed (or a `<video>` element for a
 * file `src`/`native`) inside a soft-bordered, shadowed surface, with a refined
 * circular play affordance over embeds. The correct aspect ratio, `poster`,
 * accessible `title`, and iframe/video auto-detection are all preserved from the
 * base; only the skin changes. NOT a brand-gradient surface. Same props/behavior
 * as {@link VideoEmbedProps}; every color is a `--xen-*` token (`bg-surface`,
 * `bg-primary`, `text-on-primary`) — no literals.
 */
export declare const VideoEmbedV4: React.ForwardRefExoticComponent<VideoEmbedProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=VideoEmbedV4.d.ts.map
import * as React from 'react';
import type { VideoEmbedProps } from './VideoEmbed';
/** Drop-in for {@link VideoEmbedProps} — same props, the V4 "showcase" design. */
export type VideoEmbedV4Props = VideoEmbedProps;
/**
 * VideoEmbed — **V4** "showcase" design (native mirror of the web V4). A rounded,
 * elevated 16:9 media frame: a `poster` thumbnail under a refined circular play
 * affordance, seated in a soft-bordered card with a subtle shadow. React Native
 * has no `<iframe>`/`<video>`, so `url`/`title` are preserved for a host player
 * and `onPress` is the hook to launch playback (real inline playback needs
 * `expo-av`, out of scope). The correct 16:9 aspect ratio is kept. NOT a
 * brand-gradient surface. Same props/behavior as {@link VideoEmbedProps};
 * token-only colors via `useXenitionTheme()`, dark-mode safe.
 */
export declare function VideoEmbedV4({ url: _url, title, poster, onPress, style, }: VideoEmbedV4Props): React.ReactElement;
//# sourceMappingURL=VideoEmbedV4.d.ts.map
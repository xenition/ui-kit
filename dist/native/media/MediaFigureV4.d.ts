import * as React from 'react';
import type { MediaFigureProps } from './MediaFigure';
export interface MediaFigureV4Props extends MediaFigureProps {
    /**
     * Accessible name for the press target when the item carries neither `alt`
     * nor `caption`. Default `'Open media'` — which the base hard-coded.
     */
    openLabel?: string;
    /**
     * Announced after the name for a video item. Default `'video'`, so a screen
     * reader user learns that pressing this opens a clip rather than a picture.
     */
    videoLabel?: string;
}
/**
 * **V4 media figure** — same props as {@link MediaFigure} plus `openLabel` and
 * `videoLabel`.
 *
 * ## Four changes
 *
 * 1. **A video is a video.** The base rendered `<Image source={{ uri:
 *    item.url }} />` for every item, so a `kind: 'video'` item rendered its
 *    `.mp4` URL as an image — a broken tile. It now shows the `poster` with a
 *    play badge, and says so to a screen reader. See `internal/media-v4`.
 * 2. **The placeholder ground is `colors.muted`**, not
 *    `tokens.ramps.neutral[100]`: the ramps carry the light orientation in both
 *    schemes, so the base's ground was a pale rectangle on a dark page.
 * 3. **Press is a state layer**, not `opacity: 0.85` — which fades the
 *    content, the signal M3 spends 0.38 on to mean *disabled*.
 * 4. **The caption is `TextV4` at `mutedText`.** The base hand-wrote
 *    `lineHeight: 20` — a literal, on the one element in this component whose
 *    job is to be read.
 */
export declare function MediaFigureV4({ item, reserveAspect, onActivate, openLabel, videoLabel, style, }: MediaFigureV4Props): React.ReactElement;
//# sourceMappingURL=MediaFigureV4.d.ts.map
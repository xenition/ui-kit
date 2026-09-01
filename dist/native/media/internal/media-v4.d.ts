/**
 * The pieces the **V4 media line** (native) shares: the placeholder ground, the
 * poster-or-image decision, and the play affordance.
 *
 * Why this file exists is the module's headline defect. `MediaItem` has carried
 * `kind: 'image' | 'video'` and `poster` since it was written, the **web** twin
 * honours both, and all three native components rendered
 * `<Image source={{ uri: item.url }} />` unconditionally — so a video item
 * rendered its `.mp4` URL as an image, which is a broken tile on every native
 * screen in the kit. That is a parity break and a bug, not a style gap.
 *
 * The kit ships no video player and must not: a dependency on
 * `expo-av`/`react-native-video` is the host's decision, not a design system's.
 * The honest native answer is therefore the **poster**, an unmistakable play
 * affordance over it, and the press handed to the caller — which is what a
 * gallery tile wants anyway, because a grid of autoplaying video is not a
 * gallery.
 *
 * Nothing here is exported from the package.
 */
import * as React from 'react';
import type { MediaItem } from '../../../media/types';
/** The badge's smallest and largest useful diameters, off the spacing scale. */
export declare function playDiameter(box: number, min: number, max: number): number;
/**
 * The still a video item should show.
 *
 * `poster` when there is one. When there is not, **nothing** — deliberately:
 * handing an `.mp4` URL to `<Image>` is what produced the broken tile, and a
 * placeholder that admits it has no still is better than one that looks broken.
 */
export declare function posterUri(item: MediaItem): string | undefined;
/** Is this item a video? Kept as a function so the check reads the same everywhere. */
export declare function isVideo(item: MediaItem): boolean;
export interface MediaSurfaceV4Props {
    item: MediaItem;
    /**
     * Aspect ratio for the box, or `undefined` to let the parent size it. When
     * the item carries `width`/`height` the caller passes their quotient, which
     * is what reserves the space and stops the layout jumping on load.
     */
    aspectRatio?: number;
    /** `true` when a parent `Pressable` already owns the accessibility. */
    inButton?: boolean;
    /** Diameter bounds for the play badge, in points. */
    playBounds?: {
        min: number;
        max: number;
    };
    /** Box radius. Defaults to `radius.md`. */
    radius?: number;
}
/**
 * The media box: the still (or the honest empty ground), and — for a video —
 * a play badge over it.
 *
 * The placeholder is `colors.muted`, not `tokens.ramps.neutral[100]`. The
 * ramps carry the light orientation in both schemes, so the base's placeholder
 * was a pale rectangle on a dark page; this is the same fix `ProductCardV4`
 * settled for its media slot.
 */
export declare function MediaSurfaceV4({ item, aspectRatio, inButton, playBounds, radius, }: MediaSurfaceV4Props): React.ReactElement;
//# sourceMappingURL=media-v4.d.ts.map
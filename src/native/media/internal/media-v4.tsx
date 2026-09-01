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
import { Image, View } from 'react-native';
import { useXenitionTheme } from '../../theme';
import { IconV4 } from '../../primitives/IconV4';
import { withAlpha } from '../../primitives/internal/color';
import type { MediaItem } from '../../../media/types';

/**
 * How much of the tile the play badge fills. A *ratio*, because the badge sits
 * on a box whose size the caller decides — a fixed 48pt disc is right on one
 * tile and lost on a full-bleed lightbox.
 */
const PLAY_RATIO = 0.22;

/** The badge's smallest and largest useful diameters, off the spacing scale. */
export function playDiameter(box: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, Math.round(box * PLAY_RATIO)));
}

/** How solid the scrim behind a play badge sits. Dark in both schemes. */
const PLAY_SCRIM = 0.55;

/**
 * The still a video item should show.
 *
 * `poster` when there is one. When there is not, **nothing** — deliberately:
 * handing an `.mp4` URL to `<Image>` is what produced the broken tile, and a
 * placeholder that admits it has no still is better than one that looks broken.
 */
export function posterUri(item: MediaItem): string | undefined {
  if (item.kind === 'video') return item.poster;
  return item.url;
}

/** Is this item a video? Kept as a function so the check reads the same everywhere. */
export function isVideo(item: MediaItem): boolean {
  return item.kind === 'video';
}

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
  playBounds?: { min: number; max: number };
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
export function MediaSurfaceV4({
  item,
  aspectRatio,
  inButton = false,
  playBounds,
  radius,
}: MediaSurfaceV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const uri = posterUri(item);
  const video = isVideo(item);

  const bounds = playBounds ?? { min: tokens.spacing.xl, max: tokens.spacing['2xl'] * 2 };
  const [box, setBox] = React.useState(0);
  const badge = playDiameter(box, bounds.min, bounds.max);

  return (
    <View
      onLayout={(e) => setBox(Math.min(e.nativeEvent.layout.width, e.nativeEvent.layout.height))}
      style={{
        width: '100%',
        aspectRatio,
        overflow: 'hidden',
        borderRadius: radius ?? tokens.radius.md,
        backgroundColor: colors.muted,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {uri ? (
        <Image
          source={{ uri }}
          // When wrapped in a Pressable, that button owns accessibility.
          accessible={!inButton}
          accessibilityLabel={inButton ? undefined : (item.alt ?? item.caption ?? '')}
          resizeMode="cover"
          style={{ width: '100%', height: '100%' }}
        />
      ) : null}

      {video ? (
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            width: badge,
            height: badge,
            borderRadius: tokens.radius.full,
            alignItems: 'center',
            justifyContent: 'center',
            // The scrim is built from the shadow colour, which does not invert
            // with the scheme — a play badge has to stay dark over a bright
            // still in dark mode too.
            backgroundColor: withAlpha(colors.onSurface, PLAY_SCRIM),
          }}
        >
          <IconV4 glyph="▶" size="lg" style={{ color: colors.surface }} />
        </View>
      ) : null}
    </View>
  );
}

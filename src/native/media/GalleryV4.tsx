import * as React from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { pressFill } from '../primitives/internal/state-v4';
import { MediaSurfaceV4, isVideo } from './internal/media-v4';
import type { GalleryProps } from './Gallery';

export interface GalleryV4Props extends GalleryProps {
  /**
   * Copy for the empty state. Default `'No media yet.'`.
   *
   * The base rendered a `FlatList` with no `ListEmptyComponent`, so an album
   * with nothing in it was a silent blank region — §4.5's "never a blank
   * bordered box", in its most literal form.
   */
  emptyMessage?: string;
  /** Announced after a video tile's name. Default `'video'`. */
  videoLabel?: string;
  /**
   * Build a tile's accessible name when the item carries neither `alt` nor
   * `caption`. Default `'Open item 3 of 12'` — the base said `'Open item 3'`,
   * which tells a screen-reader user nothing about how far through they are.
   */
  formatItemLabel?: (position: number, total: number) => string;
}

/**
 * **V4 gallery** — same props as {@link Gallery} plus `emptyMessage`,
 * `videoLabel` and `formatItemLabel`.
 *
 * ## Four changes
 *
 * 1. **Video tiles show their poster and a play badge.** The base handed every
 *    item's `url` to `<Image>`, so a clip rendered as a broken tile.
 * 2. **An empty album says so.**
 * 3. **Press is a state layer**, not `opacity: 0.85` on the tile's content.
 * 4. **The tile's name carries its position** in the album.
 *
 * `masonry` still keeps each item's intrinsic ratio and `grid` still squares
 * them — that decision is the base's and it is right.
 */
export function GalleryV4({
  items,
  columns = 3,
  variant = 'grid',
  onOpen,
  emptyMessage = 'No media yet.',
  videoLabel = 'video',
  formatItemLabel,
  style,
  scrollEnabled,
}: GalleryV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { tokens } = theme;
  const masonry = variant === 'masonry';
  const gap = tokens.spacing.md;
  const total = items?.length ?? 0;
  const label = formatItemLabel ?? ((n: number, of: number) => `Open item ${n} of ${of}`);

  return (
    <FlatList
      data={items}
      // `key` forces a fresh list when the column count changes (RN requirement).
      key={`cols-${columns}`}
      numColumns={columns}
      scrollEnabled={scrollEnabled}
      keyExtractor={(_, index) => String(index)}
      columnWrapperStyle={{ gap }}
      contentContainerStyle={[{ gap }, style]}
      ListEmptyComponent={
        <View accessibilityRole="summary" style={{ padding: tokens.spacing.lg }}>
          <TextV4 size="sm" tone="mutedText" align="center">
            {emptyMessage}
          </TextV4>
        </View>
      }
      renderItem={({ item, index }) => {
        const ratio = masonry && item.width && item.height ? item.width / item.height : 1;
        const tile = (
          <MediaSurfaceV4 item={item} aspectRatio={ratio} inButton={Boolean(onOpen)} />
        );
        const name = [
          item.alt ?? item.caption ?? label(index + 1, total),
          isVideo(item) ? videoLabel : null,
        ]
          .filter(Boolean)
          .join(', ');

        return (
          <View style={{ flex: 1 }}>
            {onOpen ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={name}
                onPress={() => onOpen(index)}
                style={({ pressed }) => ({
                  borderRadius: tokens.radius.md,
                  backgroundColor: pressed ? pressFill(theme) : 'transparent',
                })}
              >
                {tile}
              </Pressable>
            ) : (
              tile
            )}
          </View>
        );
      }}
    />
  );
}

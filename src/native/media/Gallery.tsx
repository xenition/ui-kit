import * as React from 'react';
import { FlatList, Image, Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { MediaItem } from '../../media/types';

export interface GalleryProps {
  /** Media items to lay out. */
  items: MediaItem[];
  /** Column count (default 3). */
  columns?: 2 | 3 | 4;
  /** `grid` (uniform square tiles) or `masonry` (natural aspect ratios). Default `grid`. */
  variant?: 'grid' | 'masonry';
  /** Fired with the item index when a tile is activated. */
  onOpen?: (index: number) => void;
  /** Container style override. */
  style?: StyleProp<ViewStyle>;
  /** Passed through to the underlying FlatList (e.g. `scrollEnabled`). */
  scrollEnabled?: boolean;
}

function Tile({
  item,
  masonry,
  radius,
  bg,
  interactive,
}: {
  item: MediaItem;
  masonry: boolean;
  radius: number;
  bg: string;
  /** When true a `Pressable` parent owns accessibility, so the image opts out. */
  interactive: boolean;
}): React.ReactElement {
  // On native, aspect ratio comes from `width`/`height` (RN supports the
  // `aspectRatio` style); grid tiles are square, masonry keeps intrinsic ratio.
  const ratio =
    masonry && item.width && item.height ? item.width / item.height : 1;
  return (
    <View
      style={{
        width: '100%',
        aspectRatio: ratio,
        overflow: 'hidden',
        borderRadius: radius,
        backgroundColor: bg,
      }}
    >
      <Image
        source={{ uri: item.url }}
        accessible={!interactive}
        accessibilityLabel={interactive ? undefined : item.alt ?? item.caption ?? ''}
        resizeMode="cover"
        style={{ width: '100%', height: '100%' }}
      />
    </View>
  );
}

/**
 * Responsive media grid — the native mirror of the web `Gallery`. Backed by a
 * `FlatList` with `numColumns` (windowing gives the lazy loading the web gets
 * from `loading="lazy"`); `grid` renders uniform square tiles, `masonry` keeps
 * each item's intrinsic aspect ratio (from `width`/`height`). When `onOpen` is
 * provided each tile is a `Pressable` `button` that reports its index (wire it
 * to a `Lightbox`). Token-only — radii and tile background trace to theme
 * tokens.
 */
export function Gallery({
  items,
  columns = 3,
  variant = 'grid',
  onOpen,
  style,
  scrollEnabled,
}: GalleryProps): React.ReactElement {
  const { tokens } = useXenitionTheme();
  const masonry = variant === 'masonry';
  const gap = tokens.spacing.md;

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
      renderItem={({ item, index }) => {
        const tile = (
          <Tile
            item={item}
            masonry={masonry}
            radius={tokens.radius.md}
            bg={tokens.ramps.neutral[100]}
            interactive={Boolean(onOpen)}
          />
        );
        return (
          <View style={{ flex: 1 }}>
            {onOpen ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={item.alt ?? item.caption ?? `Open item ${index + 1}`}
                onPress={() => onOpen(index)}
                style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
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

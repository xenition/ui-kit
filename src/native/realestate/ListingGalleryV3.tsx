import * as React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { useXenitionTheme, EmptyState } from '../primitives';
import type { ListingGalleryProps } from './ListingGallery';

/** Drop-in alternate of {@link ListingGalleryProps} — identical prop contract. */
export type ListingGalleryV3Props = ListingGalleryProps;

/**
 * ListingGallery — design variant **V3**: a **2-column photo grid**. Where V1 is
 * a single swipe-paged frame, V3 lays every photo out as a tappable tile in two
 * columns (a contact-sheet view); tapping a tile selects it and reports the
 * index (uncontrolled, or drive it with `index`). The selected tile is ringed in
 * the primary color. Same props as {@link ListingGalleryProps}; empty renders
 * the shared `EmptyState`. `height` sets the total grid height cap via tile
 * aspect ratio. Token-only.
 */
export function ListingGalleryV3({
  images,
  height = 220,
  index,
  onIndexChange,
  emptyLabel = 'No photos yet',
  style,
}: ListingGalleryV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const [internal, setInternal] = React.useState(0);
  const active = Math.min(index ?? internal, Math.max(images.length - 1, 0));

  if (images.length === 0) {
    return <EmptyState title={emptyLabel} description="Photos will appear here once uploaded." style={style} />;
  }

  const select = (i: number): void => {
    setInternal(i);
    onIndexChange?.(i);
  };

  return (
    <View
      accessibilityRole="none"
      accessibilityLabel={`Listing gallery, ${images.length} photos`}
      style={[{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, style]}
    >
      {images.map((uri, i) => (
        <Pressable
          key={`${uri}-${i}`}
          testID={`xen-re-gallery-v3-tile-${i}`}
          accessibilityRole="button"
          accessibilityState={{ selected: i === active }}
          accessibilityLabel={`Photo ${i + 1} of ${images.length}`}
          onPress={() => select(i)}
          style={{
            width: '48%',
            aspectRatio: 3 / 2,
            maxHeight: height,
            borderRadius: tokens.radius.md,
            overflow: 'hidden',
            backgroundColor: colors.border,
            borderWidth: 2,
            borderColor: i === active ? colors.primary : 'transparent',
          }}
        >
          <Image source={{ uri }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
          <View
            style={{
              position: 'absolute',
              top: tokens.spacing.xs,
              left: tokens.spacing.xs,
              backgroundColor: colors.surface,
              borderRadius: tokens.radius.full,
              paddingVertical: 1,
              paddingHorizontal: tokens.spacing.xs,
            }}
          >
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
              {i + 1}
            </Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
}

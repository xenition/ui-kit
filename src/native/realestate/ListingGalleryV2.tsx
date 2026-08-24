import * as React from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { useXenitionTheme, EmptyState } from '../primitives';
import type { ListingGalleryProps } from './ListingGallery';

/** Drop-in alternate of {@link ListingGalleryProps} — identical prop contract. */
export type ListingGalleryV2Props = ListingGalleryProps;

/**
 * ListingGallery — design variant **V2**: a large **hero photo above a
 * thumbnail strip**. Where V1 is a swipe-paged carousel with a dot indicator,
 * V2 shows one hero and a horizontal row of tappable thumbnails below it;
 * tapping a thumbnail selects that photo (uncontrolled, or drive it with
 * `index`). Same props as {@link ListingGalleryProps}; empty renders the shared
 * `EmptyState`. Token-only.
 */
export function ListingGalleryV2({
  images,
  height = 220,
  index,
  onIndexChange,
  emptyLabel = 'No photos yet',
  style,
}: ListingGalleryV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const [internal, setInternal] = React.useState(0);
  const active = Math.min(index ?? internal, Math.max(images.length - 1, 0));

  if (images.length === 0) {
    return <EmptyState title={emptyLabel} description="Photos will appear here once uploaded." style={style} />;
  }

  const select = (i: number): void => {
    if (i === active) return;
    setInternal(i);
    onIndexChange?.(i);
  };

  const hero = images[active] ?? images[0]!;

  return (
    <View style={[{ gap: tokens.spacing.sm }, style]}>
      <View
        accessibilityRole="image"
        accessibilityLabel={`Listing photo ${active + 1} of ${images.length}`}
        style={{ borderRadius: tokens.radius.lg, overflow: 'hidden', backgroundColor: colors.border }}
      >
        <Image source={{ uri: hero }} style={{ height, width: '100%' }} resizeMode="cover" />
        <View
          style={{
            position: 'absolute',
            top: tokens.spacing.sm,
            right: tokens.spacing.sm,
            backgroundColor: colors.surface,
            borderRadius: tokens.radius.full,
            borderWidth: 1,
            borderColor: colors.border,
            paddingVertical: 2,
            paddingHorizontal: tokens.spacing.sm,
          }}
        >
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
            {`${active + 1} / ${images.length}`}
          </Text>
        </View>
      </View>

      <ScrollView
        testID="xen-re-gallery-v2-strip"
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: tokens.spacing.sm }}
      >
        {images.map((uri, i) => (
          <Pressable
            key={`${uri}-${i}`}
            accessibilityRole="button"
            accessibilityState={{ selected: i === active }}
            accessibilityLabel={`Show photo ${i + 1}`}
            onPress={() => select(i)}
            style={{
              width: 72,
              height: 54,
              borderRadius: tokens.radius.md,
              overflow: 'hidden',
              borderWidth: 2,
              borderColor: i === active ? colors.primary : colors.border,
            }}
          >
            <Image source={{ uri }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

import * as React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import { useXenitionTheme, EmptyState } from '../primitives';
import { listingScrim, listingInk } from './internal/listing';
import { GradientSurface } from './internal/GradientSurface';
import type { ListingGalleryProps } from './ListingGallery';

/** Drop-in for {@link ListingGalleryProps} — same props, the V4 "listing" design. */
export type ListingGalleryV4Props = ListingGalleryProps;

/**
 * ListingGallery — **V4** "listing" design. The image-forward, editorial take on
 * a listing gallery: a big rounded hero photo (a horizontally paged `ScrollView`)
 * with a bottom gradient scrim, a near-white "n / total" counter overlaid on the
 * scrim, and a rounded thumbnail strip that also drives the active index. The
 * active page is derived from the scroll offset (works uncontrolled, or drive it
 * with `index`). Data only: URIs in, an `onIndexChange` callback out; nothing
 * fetches. On an empty `images` array it renders the shared `EmptyState`.
 * Token-only colors via `useXenitionTheme()` (+ the listing scrim helpers).
 */
export function ListingGalleryV4({
  images,
  height = 220,
  index,
  onIndexChange,
  emptyLabel = 'No photos yet',
  style,
}: ListingGalleryV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const [internal, setInternal] = React.useState(0);
  const scrollRef = React.useRef<ScrollView>(null);
  const widthRef = React.useRef(0);
  const active = index ?? internal;

  if (images.length === 0) {
    return <EmptyState title={emptyLabel} description="Photos will appear here once uploaded." style={style} />;
  }

  const go = (next: number): void => {
    const clamped = Math.min(Math.max(next, 0), images.length - 1);
    if (widthRef.current > 0) {
      scrollRef.current?.scrollTo({ x: clamped * widthRef.current, animated: true });
    }
    if (clamped !== active) {
      setInternal(clamped);
      onIndexChange?.(clamped);
    }
  };

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>): void => {
    const { contentOffset, layoutMeasurement } = e.nativeEvent;
    const pageWidth = layoutMeasurement.width || 1;
    widthRef.current = layoutMeasurement.width;
    const next = Math.min(Math.max(Math.round(contentOffset.x / pageWidth), 0), images.length - 1);
    if (next !== active) {
      setInternal(next);
      onIndexChange?.(next);
    }
  };

  const current = Math.min(active, images.length - 1);

  return (
    <View style={[{ gap: tokens.spacing.sm }, style]}>
      {/* Big rounded hero photo with a bottom gradient scrim. */}
      <View
        accessibilityRole="adjustable"
        accessibilityLabel={`Listing photo ${current + 1} of ${images.length}`}
        style={{
          borderRadius: tokens.radius.lg,
          overflow: 'hidden',
          backgroundColor: colors.border,
          shadowColor: colors.onSurface,
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          elevation: 3,
        }}
      >
        <ScrollView
          ref={scrollRef}
          testID="xen-re-gallery-scroll"
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          onLayout={(e) => {
            widthRef.current = e.nativeEvent.layout.width;
          }}
          scrollEventThrottle={16}
          style={{ height }}
        >
          {images.map((uri, i) => (
            <Image
              key={`${uri}-${i}`}
              source={{ uri }}
              style={{ height, aspectRatio: 3 / 2 }}
              resizeMode="cover"
              accessibilityLabel={`Photo ${i + 1}`}
            />
          ))}
        </ScrollView>

        {/* Bottom gradient scrim for legible near-white overlays. */}
        <GradientSurface
          colors={listingScrim(tokens.ramps)}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: height / 2 }}
        />

        {/* Near-white counter on the scrim. */}
        <View style={{ position: 'absolute', bottom: tokens.spacing.sm, left: tokens.spacing.md }}>
          <Text style={{ color: listingInk(tokens.ramps), fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
            {`${current + 1} / ${images.length}`}
          </Text>
        </View>
      </View>

      {/* Rounded thumbnail strip. */}
      {images.length > 1 ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: tokens.spacing.sm }}>
          {images.map((uri, i) => (
            <Pressable
              key={`thumb-${uri}-${i}`}
              accessibilityRole="button"
              accessibilityLabel={`Go to photo ${i + 1}`}
              onPress={() => go(i)}
              style={{
                width: 80,
                height: 56,
                borderRadius: tokens.radius.md,
                overflow: 'hidden',
                borderWidth: i === current ? 2 : 1,
                borderColor: i === current ? colors.primary : colors.border,
                opacity: i === current ? 1 : 0.7,
              }}
            >
              <Image source={{ uri }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
            </Pressable>
          ))}
        </ScrollView>
      ) : null}
    </View>
  );
}

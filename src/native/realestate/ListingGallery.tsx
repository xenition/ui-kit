import * as React from 'react';
import {
  Image,
  ScrollView,
  Text,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme, EmptyState } from '../primitives';

export interface ListingGalleryProps {
  /** Ordered photo URIs. Empty renders a token-styled empty state. */
  images: string[];
  /** Frame height in px (default 220). */
  height?: number;
  /** Controlled active index; falls back to internal state when omitted. */
  index?: number;
  /** Fires with the new page index after a swipe. */
  onIndexChange?: (index: number) => void;
  /** Empty-state headline. */
  emptyLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Horizontally paged photo carousel for a listing — a token-styled `ScrollView`
 * with a "n / total" counter and a dot indicator. The active page is derived
 * from the scroll offset (works uncontrolled, or drive it with `index`). Data
 * only: URIs in, an `onIndexChange` callback out; nothing fetches. On an empty
 * `images` array it renders the shared `EmptyState`. Token-only colors.
 */
export function ListingGallery({
  images,
  height = 220,
  index,
  onIndexChange,
  emptyLabel = 'No photos yet',
  style,
}: ListingGalleryProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const [internal, setInternal] = React.useState(0);
  const active = index ?? internal;

  if (images.length === 0) {
    return <EmptyState title={emptyLabel} description="Photos will appear here once uploaded." style={style} />;
  }

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>): void => {
    const { contentOffset, layoutMeasurement } = e.nativeEvent;
    const pageWidth = layoutMeasurement.width || 1;
    const next = Math.min(Math.max(Math.round(contentOffset.x / pageWidth), 0), images.length - 1);
    if (next !== active) {
      setInternal(next);
      onIndexChange?.(next);
    }
  };

  const current = Math.min(active, images.length - 1);

  return (
    <View
      accessibilityRole="adjustable"
      accessibilityLabel={`Listing photo ${current + 1} of ${images.length}`}
      style={[{ borderRadius: tokens.radius.lg, overflow: 'hidden', backgroundColor: colors.border }, style]}
    >
      <ScrollView
        testID="xen-re-gallery-scroll"
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
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

      {/* Counter chip. */}
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
          {`${current + 1} / ${images.length}`}
        </Text>
      </View>

      {/* Dot indicator. */}
      <View
        style={{
          position: 'absolute',
          bottom: tokens.spacing.sm,
          left: 0,
          right: 0,
          flexDirection: 'row',
          justifyContent: 'center',
          gap: tokens.spacing.xs,
        }}
      >
        {images.map((_, i) => (
          <View
            key={i}
            style={{
              width: tokens.spacing.xs,
              height: tokens.spacing.xs,
              borderRadius: tokens.radius.full,
              backgroundColor: i === current ? colors.onPrimary : colors.muted,
            }}
          />
        ))}
      </View>
    </View>
  );
}

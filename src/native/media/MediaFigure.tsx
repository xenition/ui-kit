import * as React from 'react';
import { Image, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { MediaItem } from '../../media/types';

export interface MediaFigureProps {
  /** The media item to render. */
  item: MediaItem;
  /** Reserve the item's aspect ratio from `width`/`height` (default true). */
  reserveAspect?: boolean;
  /** Press handler on the media (e.g. open a lightbox). */
  onActivate?: () => void;
  /** Container style override. */
  style?: StyleProp<ViewStyle>;
}

/**
 * A single media item with its caption — the native mirror of the web
 * `MediaFigure`. An `Image` inside an aspect-ratio box (from `width`/`height`,
 * via the RN `aspectRatio` style, so no layout jump) plus a caption. When
 * `onActivate` is provided the media is a `Pressable` `button`. Token-only.
 */
export function MediaFigure({
  item,
  reserveAspect = true,
  onActivate,
  style,
}: MediaFigureProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const ratio =
    reserveAspect && item.width && item.height ? item.width / item.height : undefined;

  const media = (
    <View
      style={{
        width: '100%',
        aspectRatio: ratio,
        overflow: 'hidden',
        borderRadius: tokens.radius.md,
        backgroundColor: tokens.ramps.neutral[100],
      }}
    >
      <Image
        source={{ uri: item.url }}
        // When wrapped in a Pressable, that button owns accessibility.
        accessible={!onActivate}
        accessibilityLabel={onActivate ? undefined : item.alt ?? item.caption ?? ''}
        resizeMode="cover"
        style={{ width: '100%', height: '100%' }}
      />
    </View>
  );

  return (
    <View style={[{ gap: tokens.spacing.sm }, style]}>
      {onActivate ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={item.alt ?? item.caption ?? 'Open media'}
          onPress={onActivate}
          style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
        >
          {media}
        </Pressable>
      ) : (
        media
      )}
      {item.caption ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, lineHeight: 20 }}>
          {item.caption}
        </Text>
      ) : null}
    </View>
  );
}

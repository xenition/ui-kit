import * as React from 'react';
import {
  Animated,
  Image,
  Pressable,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge } from '../primitives/Badge';
import { withAlpha } from '../primitives/internal/color';
import { shadow } from '../primitives/internal/elevation';
import { usePressScale, useEnter } from '../primitives/internal/motion';
import type { AlbumCardProps } from './AlbumCard';

/** Drop-in alternate of {@link AlbumCardProps} — identical prop contract. */
export type AlbumCardV2Props = AlbumCardProps;

/** Cover height for the full-bleed hero. */
const COVER_HEIGHT = 200;

/**
 * AlbumCard — design variant **V2**: a **full-bleed cover** tile. The cover photo
 * fills the whole card and the title, photo-count and date sit over a bottom
 * gradient-style scrim, so the image is the card rather than a thumbnail beside
 * text. A private album still shows a labelled `Badge`, floated top-right over
 * the cover. Same props as {@link AlbumCardProps}; token-only scrim from the
 * neutral ramp, guarded, with a loading skeleton.
 */
export function AlbumCardV2({
  title,
  photoCount,
  dateText,
  coverUrl,
  isPrivate = false,
  loading = false,
  onPress,
  countLabel = 'photos',
  style,
}: AlbumCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
  const enter = useEnter({ translateY: 8 });

  const containerStyle: StyleProp<ViewStyle> = [
    {
      height: COVER_HEIGHT,
      overflow: 'hidden',
      borderRadius: tokens.radius.lg,
      backgroundColor: tokens.ramps.neutral[100],
      ...shadow('md', tokens),
    },
    style,
  ];

  if (loading) {
    return (
      <View
        accessibilityLabel="Loading album"
        style={[
          {
            height: COVER_HEIGHT,
            borderRadius: tokens.radius.lg,
            backgroundColor: tokens.ramps.neutral[200],
          },
          style,
        ]}
      />
    );
  }

  const metaBits: string[] = [];
  if (typeof photoCount === 'number') metaBits.push(`${photoCount} ${countLabel}`);
  if (dateText) metaBits.push(dateText);

  const scrim = withAlpha(tokens.ramps.neutral[900], 0.55);

  const inner = (
    <>
      {coverUrl ? (
        <Image
          source={{ uri: coverUrl }}
          accessible={!onPress}
          accessibilityLabel={onPress ? undefined : title}
          resizeMode="cover"
          style={{ width: '100%', height: '100%' }}
        />
      ) : null}

      {isPrivate ? (
        <View style={{ position: 'absolute', top: tokens.spacing.sm, right: tokens.spacing.sm }}>
          <Badge tone="warn" variant="soft" size="sm">
            Private
          </Badge>
        </View>
      ) : null}

      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: scrim,
          paddingHorizontal: tokens.spacing.md,
          paddingVertical: tokens.spacing.sm,
          gap: 2,
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            color: tokens.ramps.neutral[50],
            fontSize: tokens.typography.scale.lg,
            fontWeight: '700',
          }}
        >
          {title}
        </Text>
        {metaBits.length > 0 ? (
          <Text
            numberOfLines={1}
            style={{ color: tokens.ramps.neutral[200], fontSize: tokens.typography.scale.sm }}
          >
            {metaBits.join(' · ')}
          </Text>
        ) : null}
      </View>
    </>
  );

  if (onPress) {
    return (
      <Animated.View style={{ transform: [...enter.transform, { scale: press.scale }], opacity: enter.opacity }}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${title}${
            typeof photoCount === 'number' ? `, ${photoCount} ${countLabel}` : ''
          }${isPrivate ? ', private' : ''}`}
          onPress={onPress}
          onPressIn={press.onPressIn}
          onPressOut={press.onPressOut}
          style={containerStyle}
        >
          {inner}
        </Pressable>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={[{ opacity: enter.opacity, transform: enter.transform }, containerStyle]}>
      {inner}
    </Animated.View>
  );
}

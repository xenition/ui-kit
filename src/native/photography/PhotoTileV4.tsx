import * as React from 'react';
import { Image, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives/Icon';
import { withAlpha } from '../primitives/internal/color';
import type { PhotoTileProps, PhotoTileRatio } from './PhotoTile';

/** Drop-in for {@link PhotoTileProps} — same props, the V4 "studio" design. */
export type PhotoTileV4Props = PhotoTileProps;

const RATIO_VALUE: Record<PhotoTileRatio, number> = {
  square: 1,
  portrait: 3 / 4,
  landscape: 4 / 3,
};

/**
 * PhotoTile — **V4** "studio" design. The matted, image-forward take on a photo
 * tile: an elevated card whose photo floats inside a thin neutral **mat** ring,
 * honoring all three `ratio` presets — `square`, `portrait` (3/4), and
 * `landscape` (4/3). `selected` and `favorite` are shown by a glyph + token
 * color (never color alone), the `caption` reads as a small soft-primary chip,
 * and `loading` draws a token skeleton. Identical props/behavior to
 * {@link PhotoTileProps}; `onPress` makes the whole tile a button. Token-only
 * colors via `useXenitionTheme()`.
 */
export function PhotoTileV4({
  url,
  alt,
  caption,
  ratio = 'square',
  selected = false,
  favorite = false,
  loading = false,
  onPress,
  style,
}: PhotoTileV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const aspect = RATIO_VALUE[ratio];

  const containerStyle: StyleProp<ViewStyle> = [
    {
      borderRadius: tokens.radius.lg,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
      padding: tokens.spacing.sm,
      shadowColor: colors.onSurface,
      shadowOpacity: 0.08,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
      elevation: 3,
    },
    style,
  ];

  if (loading) {
    return (
      <View accessibilityLabel="Loading photo" style={containerStyle}>
        <View
          style={{
            width: '100%',
            aspectRatio: aspect,
            borderRadius: tokens.radius.md,
            backgroundColor: tokens.ramps.neutral[200],
          }}
        />
      </View>
    );
  }

  // The matted photo: the image floats inside a thin inset mat ring on a neutral ground.
  const media = (
    <View
      style={{
        width: '100%',
        aspectRatio: aspect,
        borderRadius: tokens.radius.md,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: tokens.ramps.neutral[100],
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {url ? (
        <Image
          source={{ uri: url }}
          accessible={!onPress}
          accessibilityLabel={onPress ? undefined : alt ?? caption ?? ''}
          resizeMode="cover"
          style={{ width: '100%', height: '100%' }}
        />
      ) : (
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale['2xl'] }}>
          🖼
        </Text>
      )}

      {favorite ? (
        <View
          style={{
            position: 'absolute',
            top: tokens.spacing.xs,
            right: tokens.spacing.xs,
            backgroundColor: withAlpha(colors.primary, 0.1),
            borderRadius: tokens.radius.full,
            paddingHorizontal: tokens.spacing.xs,
            paddingVertical: 2,
          }}
        >
          <Icon glyph="★" size="sm" color="primary" accessibilityLabel="Favourite" />
        </View>
      ) : null}

      {selected ? (
        <View
          style={{
            position: 'absolute',
            top: tokens.spacing.xs,
            left: tokens.spacing.xs,
            backgroundColor: colors.accent,
            borderRadius: tokens.radius.full,
            width: 22,
            height: 22,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon glyph="✓" size="sm" color="onAccent" accessibilityLabel="Selected" />
        </View>
      ) : null}
    </View>
  );

  const chip = caption ? (
    <View style={{ paddingTop: tokens.spacing.md }}>
      <View
        style={{
          alignSelf: 'flex-start',
          maxWidth: '100%',
          paddingHorizontal: tokens.spacing.sm,
          paddingVertical: 2,
          borderRadius: tokens.radius.full,
          backgroundColor: withAlpha(colors.primary, 0.1),
        }}
      >
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}
        >
          {caption}
        </Text>
      </View>
    </View>
  ) : null;

  const inner = (
    <>
      {media}
      {chip}
    </>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={alt ?? caption ?? 'Photo'}
        accessibilityState={{ selected }}
        onPress={onPress}
        style={({ pressed }) => [containerStyle, { opacity: pressed ? 0.9 : 1 }]}
      >
        {inner}
      </Pressable>
    );
  }

  return <View style={containerStyle}>{inner}</View>;
}

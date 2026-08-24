import * as React from 'react';
import { Image, Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives/Icon';
import { withAlpha } from '../primitives/internal/color';
import type { PhotoTileProps, PhotoTileRatio } from './PhotoTile';

/** Drop-in alternate of {@link PhotoTileProps} — identical prop contract. */
export type PhotoTileV3Props = PhotoTileProps;

const RATIO_VALUE: Record<PhotoTileRatio, number> = {
  square: 1,
  portrait: 3 / 4,
  landscape: 4 / 3,
};

/**
 * PhotoTile — design variant **V3**: a **compact thumbnail**. A small square-ish
 * chip with a tight radius and no caption chrome — selection is a slim accent
 * ring plus a tiny corner check, favourite a tiny star dot. Made for dense strips
 * and pickers where many thumbs share a row. Selection/favourite keep a glyph +
 * a11y state, never colour alone. Same props as {@link PhotoTileProps}; token-only.
 */
export function PhotoTileV3({
  url,
  alt,
  caption,
  ratio = 'square',
  selected = false,
  favorite = false,
  loading = false,
  onPress,
  style,
}: PhotoTileV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const aspect = RATIO_VALUE[ratio];

  const frameStyle: StyleProp<ViewStyle> = {
    width: '100%',
    aspectRatio: aspect,
    borderRadius: tokens.radius.sm,
    overflow: 'hidden',
    backgroundColor: tokens.ramps.neutral[100],
    borderWidth: selected ? 2 : 0,
    borderColor: selected ? colors.accent : 'transparent',
  };

  if (loading) {
    return (
      <View
        accessibilityLabel="Loading photo"
        style={[{ ...frameStyle, backgroundColor: tokens.ramps.neutral[200] }, style]}
      />
    );
  }

  const chipBg = withAlpha(tokens.ramps.neutral[900], 0.45);

  const content = (
    <View style={[frameStyle, style]}>
      {url ? (
        <Image
          source={{ uri: url }}
          accessible={!onPress}
          accessibilityLabel={onPress ? undefined : alt ?? caption ?? ''}
          resizeMode="cover"
          style={{ width: '100%', height: '100%' }}
        />
      ) : null}

      {favorite ? (
        <View
          style={{
            position: 'absolute',
            top: 2,
            left: 2,
            backgroundColor: chipBg,
            borderRadius: tokens.radius.full,
            paddingHorizontal: 3,
          }}
        >
          <Icon glyph="★" size="xs" color="accent" accessibilityLabel="Favourited" />
        </View>
      ) : null}

      {selected ? (
        <View
          style={{
            position: 'absolute',
            top: 2,
            right: 2,
            width: 16,
            height: 16,
            borderRadius: tokens.radius.full,
            backgroundColor: colors.accent,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon glyph="✓" size="xs" color="onAccent" accessibilityLabel="Selected" />
        </View>
      ) : null}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={alt ?? caption ?? 'Photo'}
        accessibilityState={{ selected }}
        onPress={onPress}
        style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
      >
        {content}
      </Pressable>
    );
  }

  return content;
}

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
import { Icon } from '../primitives/Icon';
import { withAlpha } from '../primitives/internal/color';
import { usePressScale } from '../primitives/internal/motion';
import type { PhotoTileProps, PhotoTileRatio } from './PhotoTile';

/** Drop-in alternate of {@link PhotoTileProps} — identical prop contract. */
export type PhotoTileV2Props = PhotoTileProps;

const RATIO_VALUE: Record<PhotoTileRatio, number> = {
  square: 1,
  portrait: 3 / 4,
  landscape: 4 / 3,
};

/**
 * PhotoTile — design variant **V2**: a **large, selection-first tile**. A thick
 * accent ring wraps the whole tile when selected and a big circular check floats
 * top-left; a pill-backed favourite star floats top-right; a stronger caption
 * scrim anchors the foot. Built for cull / proofing sheets where selection and
 * favouriting are the primary gestures. Selection and favourite carry a glyph +
 * a11y state, never colour alone. Same props as {@link PhotoTileProps}; token-only.
 */
export function PhotoTileV2({
  url,
  alt,
  caption,
  ratio = 'square',
  selected = false,
  favorite = false,
  loading = false,
  onPress,
  style,
}: PhotoTileV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
  const aspect = RATIO_VALUE[ratio];

  const frameStyle: StyleProp<ViewStyle> = {
    width: '100%',
    aspectRatio: aspect,
    borderRadius: tokens.radius.lg,
    overflow: 'hidden',
    backgroundColor: tokens.ramps.neutral[100],
    borderWidth: selected ? 3 : 1,
    borderColor: selected ? colors.accent : colors.border,
  };

  if (loading) {
    return (
      <View
        accessibilityLabel="Loading photo"
        style={[{ ...frameStyle, borderWidth: 0, backgroundColor: tokens.ramps.neutral[200] }, style]}
      />
    );
  }

  const scrim = withAlpha(tokens.ramps.neutral[900], 0.5);
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

      {selected ? (
        <View
          style={{
            position: 'absolute',
            top: tokens.spacing.sm,
            left: tokens.spacing.sm,
            width: 30,
            height: 30,
            borderRadius: tokens.radius.full,
            backgroundColor: colors.accent,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon glyph="✓" size="base" color="onAccent" accessibilityLabel="Selected" />
        </View>
      ) : null}

      <View
        style={{
          position: 'absolute',
          top: tokens.spacing.sm,
          right: tokens.spacing.sm,
          width: 30,
          height: 30,
          borderRadius: tokens.radius.full,
          backgroundColor: chipBg,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon
          glyph={favorite ? '★' : '☆'}
          size="base"
          color={favorite ? 'accent' : 'onAccent'}
          accessibilityLabel={favorite ? 'Favourited' : 'Not favourited'}
        />
      </View>

      {caption ? (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: scrim,
            paddingHorizontal: tokens.spacing.md,
            paddingVertical: tokens.spacing.sm,
          }}
        >
          <Text
            numberOfLines={1}
            style={{ color: tokens.ramps.neutral[50], fontSize: tokens.typography.scale.sm, fontWeight: '600' }}
          >
            {caption}
          </Text>
        </View>
      ) : null}
    </View>
  );

  if (onPress) {
    return (
      <Animated.View style={{ transform: [{ scale: press.scale }] }}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={alt ?? caption ?? 'Photo'}
          accessibilityState={{ selected }}
          onPress={onPress}
          onPressIn={press.onPressIn}
          onPressOut={press.onPressOut}
        >
          {content}
        </Pressable>
      </Animated.View>
    );
  }

  return content;
}

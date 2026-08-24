import * as React from 'react';
import {
  Image,
  Pressable,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives/Icon';

/** Aspect-ratio presets for a photo tile. */
export type PhotoTileRatio = 'square' | 'portrait' | 'landscape';

const RATIO_VALUE: Record<PhotoTileRatio, number> = {
  square: 1,
  portrait: 3 / 4,
  landscape: 4 / 3,
};

export interface PhotoTileProps {
  /** Photo source URL. When absent a token-tinted placeholder is drawn. */
  url?: string;
  /** Accessible description of the photo. */
  alt?: string;
  /** Caption overlaid at the foot of the tile. */
  caption?: string;
  /** Aspect ratio preset (default `square`). */
  ratio?: PhotoTileRatio;
  /** Selected state — draws a token accent ring + check affordance. */
  selected?: boolean;
  /** Favourited state — shows a star marker (labelled, not color-alone). */
  favorite?: boolean;
  /** Loading placeholder — token-only skeleton, no image. */
  loading?: boolean;
  /** Press handler (e.g. open or toggle selection). */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/** Token-derived translucent tint (no literal hex). */
function withAlpha(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * A single photo tile — the atomic unit of a grid or selection sheet. Draws the
 * image inside an aspect-ratio box (`square`/`portrait`/`landscape`), an
 * optional overlaid `caption`, a `favorite` star marker, and a `selected` ring
 * with a check badge. Selection/favourite states carry a glyph + accessibility
 * state, never color alone. `onPress` makes it a `button`; token-only colors.
 */
export function PhotoTile({
  url,
  alt,
  caption,
  ratio = 'square',
  selected = false,
  favorite = false,
  loading = false,
  onPress,
  style,
}: PhotoTileProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const aspect = RATIO_VALUE[ratio];

  const frameStyle: StyleProp<ViewStyle> = {
    width: '100%',
    aspectRatio: aspect,
    borderRadius: tokens.radius.md,
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
            top: tokens.spacing.xs,
            right: tokens.spacing.xs,
            backgroundColor: withAlpha(colors.onSurface, 0.5),
            borderRadius: tokens.radius.full,
            paddingHorizontal: tokens.spacing.xs,
            paddingVertical: 2,
          }}
        >
          <Icon glyph="★" size="sm" color="onAccent" accessibilityLabel="Favourite" />
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

      {caption ? (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: withAlpha(colors.onSurface, 0.45),
            paddingHorizontal: tokens.spacing.sm,
            paddingVertical: tokens.spacing.xs,
          }}
        >
          <Text
            numberOfLines={1}
            style={{ color: colors.onAccent, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}
          >
            {caption}
          </Text>
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

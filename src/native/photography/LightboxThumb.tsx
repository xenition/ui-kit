import * as React from 'react';
import {
  Image,
  Pressable,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme } from '../theme';

/** Size presets for the thumbnail. */
export type LightboxThumbSize = 'sm' | 'md';

const THUMB_PX: Record<LightboxThumbSize, number> = {
  sm: 48,
  md: 64,
};

export interface LightboxThumbProps {
  /** Thumbnail source URL. When absent a token-tinted placeholder is drawn. */
  url?: string;
  /** Accessible description of the photo. */
  alt?: string;
  /** Marks this thumb as the active frame (accent ring + a11y `selected`). */
  active?: boolean;
  /** Size preset (default `md`). */
  size?: LightboxThumbSize;
  /** Position for the accessibility label (1-based). */
  index?: number;
  /** Press handler (jump the lightbox to this frame). */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A filmstrip thumbnail for a lightbox — a small square image with a token
 * accent ring when `active`. Reports its selection through the accessibility
 * `selected` state (not color alone) and exposes a `button` when pressable.
 * Meant to be laid out in a horizontal scroll strip under a `Lightbox`.
 * Token-only colors.
 */
export function LightboxThumb({
  url,
  alt,
  active = false,
  size = 'md',
  index,
  onPress,
  style,
}: LightboxThumbProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const px = THUMB_PX[size];

  const frame = (
    <View
      style={[
        {
          width: px,
          height: px,
          borderRadius: tokens.radius.sm,
          overflow: 'hidden',
          backgroundColor: tokens.ramps.neutral[100],
          borderWidth: active ? 2 : 1,
          borderColor: active ? colors.accent : colors.border,
          opacity: active ? 1 : 0.7,
        },
        style,
      ]}
    >
      {url ? (
        <Image
          source={{ uri: url }}
          accessible={!onPress}
          accessibilityLabel={onPress ? undefined : alt ?? ''}
          resizeMode="cover"
          style={{ width: '100%', height: '100%' }}
        />
      ) : null}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={alt ?? (typeof index === 'number' ? `Photo ${index}` : 'Photo')}
        accessibilityState={{ selected: active }}
        onPress={onPress}
        style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
      >
        {frame}
      </Pressable>
    );
  }

  return frame;
}

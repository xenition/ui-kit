import * as React from 'react';
import { Image, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { LightboxThumbProps } from './LightboxThumb';

/** Drop-in for {@link LightboxThumbProps} — same props, the V4 "studio" design. */
export type LightboxThumbV4Props = LightboxThumbProps;

/** Studio mat sizes — both stay ≥44px so a pressable thumb is a valid tap target. */
const THUMB_PX: Record<NonNullable<LightboxThumbProps['size']>, number> = {
  sm: 56,
  md: 80,
};

/**
 * LightboxThumb — **V4** "studio" design (native parity of the web V4). A
 * **matted** filmstrip thumbnail — the photo sits inside a thin inset mat ring
 * (`borderWidth: 1`, `border` token) over a `neutral[100]` ground, with **no
 * gradient** (the studio line reserves gradient for the gallery hero). When
 * `active`, the mat ring turns `primary` and a small `✓` glyph badge appears, so
 * selection is never carried by color alone; it is also reported via the
 * accessibility `selected` state. Both `sm` (56px) and `md` (80px) sizes are
 * honored and stay ≥44px so a pressable thumb is a valid tap target. Exposes a
 * `button` with an accessible label when `onPress` is set. Identical
 * props/behavior to {@link LightboxThumbProps}; token-only colors via
 * `useXenitionTheme()`, no literals.
 */
export function LightboxThumbV4({
  url,
  alt,
  active = false,
  size = 'md',
  index,
  onPress,
  style,
}: LightboxThumbV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const px = THUMB_PX[size];

  const frame = (
    <View
      style={[
        {
          width: px,
          height: px,
          borderRadius: tokens.radius.md,
          overflow: 'hidden',
          backgroundColor: tokens.ramps.neutral[100],
          borderWidth: active ? 2 : 1,
          borderColor: active ? colors.primary : colors.border,
          opacity: active ? 1 : 0.8,
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
      {/* Selection glyph badge — token color, not color alone. */}
      {active ? (
        <View
          style={{
            position: 'absolute',
            top: 4,
            right: 4,
            width: 16,
            height: 16,
            borderRadius: tokens.radius.full,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.primary,
          }}
        >
          <Text allowFontScaling={false} style={{ color: colors.onPrimary, fontSize: 10, fontWeight: '700' }}>
            ✓
          </Text>
        </View>
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

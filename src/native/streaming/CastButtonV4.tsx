import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Icon, useXenitionTheme } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { CastButtonProps, CastButtonSize, CastButtonVariant } from './CastButton';

export type { CastButtonSize, CastButtonVariant };

/** Drop-in for {@link CastButtonProps} — same props, the V4 "spotlight" design. */
export type CastButtonV4Props = CastButtonProps;

const GLYPH_SIZE: Record<CastButtonSize, 'sm' | 'base' | 'lg'> = {
  sm: 'sm',
  md: 'base',
  lg: 'lg',
};

/**
 * CastButton — **V4** "spotlight" design. A polished cast control: the glyph
 * (plus a "Cast" / device-name label in the `labeled` variant) sits in a ≥44px
 * rounded tap target that lights up with a soft `withAlpha(primary, 0.12)` tint
 * and a `primary` accent when **connected**, staying plain otherwise. Keeps the
 * base's variants (`icon` / `labeled`) and sizes, and reports taps via
 * `onPress`. The `connected` state is reflected in the color, accessibility
 * state, and accessible label ("Cast to a device" vs. "Casting to <device>.
 * Disconnect"). Token-only colors via `useXenitionTheme()` + `withAlpha` — no
 * literal hex.
 */
export function CastButtonV4({
  connected = false,
  deviceName,
  variant = 'icon',
  size = 'md',
  onPress,
  disabled = false,
  style,
}: CastButtonV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const tint = connected ? 'primary' : 'onSurface';
  const label = connected
    ? `Casting${deviceName ? ` to ${deviceName}` : ''}. Disconnect`
    : 'Cast to a device';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected: connected, disabled }}
      disabled={disabled || !onPress}
      onPress={onPress}
      hitSlop={8}
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          // ≥44px rounded tap target with 8-pt padding.
          minHeight: 44,
          gap: tokens.spacing.xs,
          borderRadius: tokens.radius.md,
          paddingHorizontal: tokens.spacing.sm,
          paddingVertical: tokens.spacing.xs,
          // V4 spotlight: soft-primary tint + accent when connected, plain otherwise.
          backgroundColor: connected ? withAlpha(colors.primary, 0.12) : 'transparent',
          opacity: disabled ? 0.4 : pressed ? 0.6 : 1,
        },
        style,
      ]}
    >
      <Icon glyph={connected ? '📲' : '🔗'} size={GLYPH_SIZE[size]} color={tint} />
      {variant === 'labeled' ? (
        <Text
          style={{
            color: colors[tint],
            fontSize: tokens.typography.scale.sm,
            fontWeight: '600',
          }}
        >
          {connected && deviceName ? deviceName : 'Cast'}
        </Text>
      ) : (
        <View />
      )}
    </Pressable>
  );
}

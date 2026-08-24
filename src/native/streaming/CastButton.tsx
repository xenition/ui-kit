import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { Icon, useXenitionTheme } from '../primitives';

export type CastButtonVariant = 'icon' | 'labeled';
export type CastButtonSize = 'sm' | 'md' | 'lg';

export interface CastButtonProps {
  /** Whether a cast/AirPlay target is currently connected (controlled). */
  connected?: boolean;
  /** Name of the connected device, shown in the `labeled` variant. */
  deviceName?: string;
  /**
   * - `icon`    — a single tappable cast glyph (default).
   * - `labeled` — glyph + "Cast" / device-name text.
   */
  variant?: CastButtonVariant;
  size?: CastButtonSize;
  /** Fires when the button is tapped (open the device picker / disconnect). */
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const GLYPH_SIZE: Record<CastButtonSize, 'sm' | 'base' | 'lg'> = {
  sm: 'sm',
  md: 'base',
  lg: 'lg',
};

/**
 * A cast / AirPlay toggle — a UI shell that reports taps via `onPress` and
 * reflects the current `connected` state in its color and accessible label
 * ("Cast to a device" vs. "Casting to <device>. Disconnect"). No native cast
 * dependency; wire an app's cast framework to `onPress`. Token-only: the active
 * (connected) tint is `primary`, idle is `onSurface`.
 */
export function CastButton({
  connected = false,
  deviceName,
  variant = 'icon',
  size = 'md',
  onPress,
  disabled = false,
  style,
}: CastButtonProps): React.ReactElement {
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
          gap: tokens.spacing.xs,
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

import * as React from 'react';
import {
  Pressable,
  Text,
  View,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useXenitionTheme } from '../theme';

export type FloatButtonPlacement = 'bottom-right' | 'bottom-left' | 'bottom-center';

export interface FloatButtonProps extends Omit<PressableProps, 'children' | 'style'> {
  /** Fires on press. */
  onPress?: PressableProps['onPress'];
  /** Leading glyph/icon node (e.g. an `<Icon glyph="+" />`). */
  icon?: React.ReactNode;
  /** Optional text — when present the FAB expands into a pill. */
  label?: string;
  /** Where the FAB anchors over its parent (default `bottom-right`). */
  placement?: FloatButtonPlacement;
  disabled?: boolean;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Floating action button — a circular (or pill, when `label` is set) primary
 * affordance anchored to a screen corner. Background is the `primary` token,
 * content the `onPrimary` token, with a token-derived shadow (the darkest
 * neutral ramp step as `shadowColor`). Absolutely positioned by `placement`;
 * override via `style`. No literal colors.
 */
export function FloatButton({
  onPress,
  icon,
  label,
  placement = 'bottom-right',
  disabled = false,
  accessibilityLabel,
  style,
  ...rest
}: FloatButtonProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  // Lift the FAB above the home indicator by adding the bottom safe-area inset
  // to its anchor offset. Needs a `SafeAreaProvider` above it (Expo default).
  const insets = useSafeAreaInsets();

  const anchor: ViewStyle =
    placement === 'bottom-left'
      ? { left: tokens.spacing.lg }
      : placement === 'bottom-center'
        ? { alignSelf: 'center', left: 0, right: 0 }
        : { right: tokens.spacing.lg };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        {
          position: 'absolute',
          bottom: tokens.spacing.xl + insets.bottom,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: placement === 'bottom-center' ? 'center' : undefined,
          gap: label ? tokens.spacing.xs : 0,
          minHeight: 56,
          minWidth: 56,
          height: label ? 56 : undefined,
          width: label ? undefined : 56,
          paddingHorizontal: label ? tokens.spacing.lg : 0,
          borderRadius: tokens.radius.full,
          backgroundColor: colors.primary,
          shadowColor: tokens.ramps.neutral[950],
          shadowOpacity: 0.3,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 4 },
          elevation: 6,
          opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
        },
        anchor,
        style,
      ]}
      {...rest}
    >
      {icon != null ? <View>{icon}</View> : null}
      {label ? (
        <Text style={{ color: colors.onPrimary, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
          {label}
        </Text>
      ) : null}
    </Pressable>
  );
}

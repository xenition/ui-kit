import * as React from 'react';
import {
  ActivityIndicator,
  Pressable,
  Text,
  View,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme } from '../theme';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<PressableProps, 'children' | 'style'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Fires on press (RN equivalent of the web `onClick`). */
  onPress?: PressableProps['onPress'];
  disabled?: boolean;
  /** Show a spinner and block presses. */
  loading?: boolean;
  /** Container style override. */
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

const SIZE_TOKENS: Record<
  ButtonSize,
  { paddingKey: 'sm' | 'md' | 'lg'; textKey: 'sm' | 'base' | 'lg' }
> = {
  sm: { paddingKey: 'sm', textKey: 'sm' },
  md: { paddingKey: 'md', textKey: 'base' },
  lg: { paddingKey: 'lg', textKey: 'lg' },
};

/**
 * Themed button — the native mirror of the web `Button`. Same
 * `variant`/`size`/`disabled` contract; `onPress` replaces the web `onClick`
 * and a `loading` flag renders a spinner. All colors/radii come from the
 * compiled theme tokens via `useXenitionTheme()` — no literal colors.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  onPress,
  disabled = false,
  loading = false,
  style,
  children,
  ...rest
}: ButtonProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const { paddingKey, textKey } = SIZE_TOKENS[size];

  const isDisabled = disabled || loading;

  const bg: Record<ButtonVariant, string> = {
    primary: colors.primary,
    secondary: 'transparent',
    ghost: 'transparent',
  };
  const fg: Record<ButtonVariant, string> = {
    primary: colors.onPrimary,
    secondary: colors.primary,
    ghost: colors.onSurface,
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: tokens.radius.md,
          paddingVertical: tokens.spacing[paddingKey],
          paddingHorizontal: tokens.spacing[paddingKey] * 1.6,
          backgroundColor: bg[variant],
          borderWidth: variant === 'secondary' ? 1 : 0,
          borderColor: variant === 'secondary' ? colors.primary : 'transparent',
          opacity: isDisabled ? 0.5 : pressed ? 0.85 : 1,
        },
        style,
      ]}
      {...rest}
    >
      {loading ? (
        <View style={{ marginRight: tokens.spacing.xs }}>
          <ActivityIndicator size="small" color={fg[variant]} />
        </View>
      ) : null}
      {typeof children === 'string' ? (
        <Text
          style={{
            color: fg[variant],
            fontSize: tokens.typography.scale[textKey],
            fontWeight: '600',
          }}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

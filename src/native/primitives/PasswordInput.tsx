import * as React from 'react';
import {
  Pressable,
  Text,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme } from '../theme';

export interface PasswordInputProps
  extends Omit<TextInputProps, 'style' | 'editable' | 'secureTextEntry' | 'value' | 'onChangeText'> {
  /** Controlled secret text. */
  value?: string;
  /** Fires with the new secret text. */
  onChangeText?: (text: string) => void;
  /** Optional field label rendered above the input. */
  label?: string;
  placeholder?: string;
  /** Renders the danger border state. */
  invalid?: boolean;
  disabled?: boolean;
  accessibilityLabel?: string;
  /** Wrapper style override. */
  containerStyle?: StyleProp<ViewStyle>;
}

/**
 * Password field — a token-bound `TextInput` with `secureTextEntry` and a
 * show/hide toggle that flips the masking. Background, border, radius, and text
 * come from `useXenitionTheme()`; `invalid` swaps the border to `danger` and the
 * placeholder uses `muted`. No literal colors.
 */
export function PasswordInput({
  value = '',
  onChangeText,
  label,
  placeholder = 'Password',
  invalid = false,
  disabled = false,
  accessibilityLabel = 'Password',
  containerStyle,
  ...rest
}: PasswordInputProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const [visible, setVisible] = React.useState(false);

  return (
    <View style={[{ gap: tokens.spacing.xs }, containerStyle]}>
      {label ? (
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>
          {label}
        </Text>
      ) : null}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: invalid ? colors.danger : colors.border,
          borderRadius: tokens.radius.sm,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.md,
          opacity: disabled ? 0.5 : 1,
        }}
      >
        <TextInput
          editable={!disabled}
          accessibilityLabel={accessibilityLabel}
          accessibilityState={{ disabled }}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.muted}
          secureTextEntry={!visible}
          autoCapitalize="none"
          autoCorrect={false}
          style={{
            flex: 1,
            color: colors.onSurface,
            fontSize: tokens.typography.scale.base,
            padding: 0,
          }}
          {...rest}
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={visible ? 'Hide password' : 'Show password'}
          accessibilityState={{ selected: visible }}
          disabled={disabled}
          onPress={() => setVisible((v) => !v)}
          hitSlop={8}
          style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
        >
          <Text
            style={{
              color: visible ? colors.primary : colors.muted,
              fontSize: tokens.typography.scale.sm,
              fontWeight: '600',
            }}
          >
            {visible ? 'Hide' : 'Show'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

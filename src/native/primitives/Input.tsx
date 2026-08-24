import * as React from 'react';
import {
  Text,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme } from '../theme';

export interface InputProps extends TextInputProps {
  /** Renders the danger border state (mirrors the web `invalid`). */
  invalid?: boolean;
  /**
   * Optional field label rendered above the input. Native-only additive prop
   * (web composes labels externally); optional, so parity is preserved.
   */
  label?: string;
  /** Wrapper style override. */
  containerStyle?: StyleProp<ViewStyle>;
}

/**
 * Themed text input — the native mirror of the web `Input`. Token-bound
 * background/border/text; `invalid` swaps the border to the danger token. No
 * literal colors; placeholder uses the `muted` token.
 */
export function Input({
  invalid = false,
  label,
  containerStyle,
  style,
  editable = true,
  ...rest
}: InputProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  return (
    <View style={[{ gap: tokens.spacing.xs }, containerStyle]}>
      {label ? (
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>
          {label}
        </Text>
      ) : null}
      <TextInput
        editable={editable}
        accessibilityState={{ disabled: !editable }}
        placeholderTextColor={colors.muted}
        style={[
          {
            width: '100%',
            color: colors.onSurface,
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: invalid ? colors.danger : colors.border,
            borderRadius: tokens.radius.sm,
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.md,
            fontSize: tokens.typography.scale.base,
            opacity: editable ? 1 : 0.5,
          },
          style,
        ]}
        {...rest}
      />
    </View>
  );
}

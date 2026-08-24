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

export interface SearchInputProps
  extends Omit<TextInputProps, 'style' | 'editable' | 'value' | 'onChangeText'> {
  /** Controlled query text. */
  value?: string;
  /** Fires with the new query text. */
  onChangeText?: (text: string) => void;
  /** Fires when the clear (✕) affordance is pressed. */
  onClear?: () => void;
  placeholder?: string;
  /** Renders the danger border state. */
  invalid?: boolean;
  disabled?: boolean;
  accessibilityLabel?: string;
  /** Wrapper style override. */
  containerStyle?: StyleProp<ViewStyle>;
}

/**
 * Search field — a token-bound `TextInput` with a leading search glyph and a
 * trailing clear (✕) button that appears once there is text. Colors, border,
 * radius, and spacing all come from `useXenitionTheme()`; `invalid` swaps the
 * border to the `danger` token and the placeholder uses `muted`. No literal
 * colors.
 */
export function SearchInput({
  value = '',
  onChangeText,
  onClear,
  placeholder = 'Search…',
  invalid = false,
  disabled = false,
  accessibilityLabel = 'Search',
  containerStyle,
  ...rest
}: SearchInputProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const clear = (): void => {
    onChangeText?.('');
    onClear?.();
  };

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: invalid ? colors.danger : colors.border,
          borderRadius: tokens.radius.full,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.md,
          opacity: disabled ? 0.5 : 1,
        },
        containerStyle,
      ]}
    >
      <Text
        accessibilityElementsHidden
        importantForAccessibility="no"
        style={{ color: colors.muted, fontSize: tokens.typography.scale.base }}
      >
        ⌕
      </Text>
      <TextInput
        editable={!disabled}
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ disabled }}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        returnKeyType="search"
        style={{
          flex: 1,
          color: colors.onSurface,
          fontSize: tokens.typography.scale.base,
          padding: 0,
        }}
        {...rest}
      />
      {value.length > 0 ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Clear search"
          disabled={disabled}
          onPress={clear}
          hitSlop={8}
          style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
        >
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base }}>✕</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

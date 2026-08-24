import * as React from 'react';
import { Text, TextInput, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface PhoneInputProps {
  /** Controlled raw digits (no punctuation), e.g. `"5551234567"`. */
  value?: string;
  /** Fires with the raw digit string (mask is presentation-only). */
  onChangeText?: (digits: string) => void;
  /** Dialing prefix shown in the leading badge. */
  countryCode?: string;
  placeholder?: string;
  /** Renders the danger border state. */
  invalid?: boolean;
  disabled?: boolean;
  accessibilityLabel?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

/** Strip to digits, cap at 10, format as `(NNN) NNN-NNNN` progressively. */
function formatUsPhone(digits: string): string {
  const d = digits.replace(/\D/g, '').slice(0, 10);
  if (d.length === 0) return '';
  if (d.length <= 3) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

/**
 * Phone field — a token-bound `TextInput` that displays a progressive
 * `(NNN) NNN-NNNN` mask while reporting only the raw digits through
 * `onChangeText`, with a leading country-code badge. Border flips to `danger`
 * when `invalid`; uses the `phone-pad` keyboard. No literal colors.
 */
export function PhoneInput({
  value = '',
  onChangeText,
  countryCode = '+1',
  placeholder = '(555) 123-4567',
  invalid = false,
  disabled = false,
  accessibilityLabel = 'Phone number',
  containerStyle,
}: PhoneInputProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const handle = (text: string): void => {
    onChangeText?.(text.replace(/\D/g, '').slice(0, 10));
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
          borderRadius: tokens.radius.sm,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.md,
          opacity: disabled ? 0.5 : 1,
        },
        containerStyle,
      ]}
    >
      <View
        style={{
          paddingRight: tokens.spacing.sm,
          borderRightWidth: 1,
          borderRightColor: colors.border,
        }}
      >
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base }}>
          {countryCode}
        </Text>
      </View>
      <TextInput
        editable={!disabled}
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ disabled }}
        value={formatUsPhone(value)}
        onChangeText={handle}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        keyboardType="phone-pad"
        textContentType="telephoneNumber"
        style={{
          flex: 1,
          color: colors.onSurface,
          fontSize: tokens.typography.scale.base,
          padding: 0,
        }}
      />
    </View>
  );
}
